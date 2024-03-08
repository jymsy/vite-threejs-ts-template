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

export default class PointerControl {
  euler = new Euler(0, 0, 0, "YXZ");
  enabled = false;
  element;
  group;

  constructor(world: World) {
    // const geometry = new BoxGeometry(1, 1, 1);
    // const material = new MeshLambertMaterial({
    //   color: 0xff0000,
    // });
    // const box = new Mesh(geometry, material);
    // box.position.set(-25, -8, 10);
    this.group = new Group();
    // const axesHelper = new AxesHelper(150);
    // group.add(axesHelper);
    this.group.position.set(-30, -8, 10);
    this.group.add(world.camera);
    world.camera.position.set(-5, 2, 1);
    world.scene.add(this.group);

    this.element = document.getElementById("lock");
    this.element?.addEventListener("click", () => {
      document.body.requestPointerLock();
    });

    document.addEventListener("mousemove", (event) => {
      if (!this.enabled) {
        return;
      }
      const { movementX, movementY } = event;

      this.euler.y -= movementX * 0.002;
      this.euler.z -= movementY * 0.002;
      this.euler.z = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, this.euler.z)
      );

      this.group.setRotationFromEuler(this.euler);
      // this.quaternion.setFromEuler(this.euler);
    });

    document.addEventListener("pointerlockchange", () => {
      if (document.pointerLockElement) {
        this.enabled = true;
      } else {
        this.enabled = false;
      }
    });
  }

  render = (position: Vector3) => {
    this.group.position.copy(position);
  };
}
