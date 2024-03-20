import {
  AmbientLight,
  AxesHelper,
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
  model;
  clock = new Clock();
  moveVelocity = new Vector3();
  moveFoward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  world;

  constructor(scene: Scene, world: World) {
    this.world = world;
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({
      color: 0xff0000,
    });
    this.model = new Mesh(geometry, material);
    this.model.position.set(-30, -8, 10);

    const axesHelper = new AxesHelper(150);
    this.model.add(axesHelper);

    scene.add(this.model);

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.moveFoward = true;
        break;
      case "s":
        this.moveBackward = true;
        break;
      case "a":
        this.moveLeft = true;
        break;
      case "d":
        this.moveRight = true;
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.moveFoward = false;
        break;
      case "s":
        this.moveBackward = false;
        break;
      case "a":
        this.moveLeft = false;
        break;
      case "d":
        this.moveRight = false;
    }
  };

  render = () => {
    const delta = this.clock.getDelta();
    const distance = delta * 10;

    this.moveVelocity.z = Number(this.moveFoward) - Number(this.moveBackward);
    this.moveVelocity.x = Number(this.moveLeft) - Number(this.moveRight);
    this.moveVelocity.setLength(distance);
    // this.moveVelocity.applyEuler(new Euler(0, this.world.control.euler.y, 0));
    // this.model.position.add(this.moveVelocity.setLength(distance));
    this.model.translateX(this.moveVelocity.x);
    this.model.translateY(this.moveVelocity.y);
    this.model.translateZ(this.moveVelocity.z);
    this.model.rotation.y = this.world.control.euler.y;
  };
}
