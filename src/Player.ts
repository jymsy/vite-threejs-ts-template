import {
  AmbientLight,
  AxesHelper,
  Group,
  BoxGeometry,
  Clock,
  GridHelper,
  LoadingManager,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  WebGLRenderer,
  MeshBasicMaterial,
  DirectionalLight,
  DirectionalLightHelper,
  SphereGeometry,
  Vector3,
  Matrix4,
  CubeTextureLoader,
  Euler,
} from "three";
import { RigidBodyDesc, ColliderDesc } from "@dimforge/rapier3d-compat";
import World from "./World";
import CapsuleCollider from "./CapsuleCollider";

export default class Player {
  control;
  model;
  clock = new Clock();
  moveVelocity = new Vector3();
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  collider;

  constructor(world: World) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({
      color: 0xff0000,
    });
    this.model = new Mesh(geometry, material);
    // this.model.position.set(-25, -8, 10);

    world.scene.add(this.model);

    this.control = world.control;

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);

    // let rigidBodyDesc = RigidBodyDesc.dynamic().setTranslation(-25, -8, 10);
    // let rigidBody = world.physicsWorld.createRigidBody(rigidBodyDesc);

    // let example1 = ColliderDesc.ball(0.5);
    // this.collider = world.physicsWorld.createCollider(example1, rigidBody);

    this.collider = new CapsuleCollider(world.physicsWorld);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.control.enabled) {
      return;
    }
    switch (event.key) {
      case "w":
        this.moveForward = true;
        break;
      case "s":
        this.moveBackward = true;
        break;
      case "a":
        this.moveLeft = true;
        break;
      case "d":
        this.moveRight = true;
        break;
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    if (!this.control.enabled) {
      return;
    }
    switch (event.key) {
      case "w":
        this.moveForward = false;
        break;
      case "s":
        this.moveBackward = false;
        break;
      case "a":
        this.moveLeft = false;
        break;
      case "d":
        this.moveRight = false;
        break;
    }
  };

  render = () => {
    const delta = this.clock.getDelta();
    const distance = delta * 10;

    this.moveVelocity.x = Number(this.moveForward) - Number(this.moveBackward);
    this.moveVelocity.z = Number(this.moveRight) - Number(this.moveLeft);
    this.moveVelocity.y -= 9.8 * distance * 0.01;
    this.moveVelocity.applyEuler(new Euler(0, this.control.euler.y, 0));

    this.collider.controller.computeColliderMovement(
      this.collider.collider, // The collider we would like to move.
      this.moveVelocity.setLength(distance) // The movement we would like to apply if there wasn’t any obstacle.
    );
    const movement = this.collider.controller.computedMovement();
    let newPos = this.collider.body.translation();
    newPos.x += movement.x;
    newPos.y += movement.y;
    newPos.z += movement.z;
    this.collider.body.setNextKinematicTranslation(newPos);

    // const position = this.collider.translation();
    this.model.position.set(newPos.x, newPos.y, newPos.z);

    // this.model.position.add(this.moveVelocity.setLength(distance));

    this.model.rotation.y = this.control.euler.y;
  };
}
