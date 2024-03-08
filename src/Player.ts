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
import World from "./World";

export default class Player {
  control;
  model;
  clock = new Clock();
  moveVelocity = new Vector3();
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;

  constructor(world: World) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({
      color: 0xff0000,
    });
    this.model = new Mesh(geometry, material);
    this.model.position.set(-25, -8, 10);

    world.scene.add(this.model);

    this.control = world.control;

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
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

    this.moveVelocity.applyEuler(new Euler(0, this.control.euler.y, 0));

    this.model.position.add(this.moveVelocity.normalize().setLength(distance));

    this.model.rotation.y = this.control.euler.y;
  };
}
