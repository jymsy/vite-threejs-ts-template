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

export default class PointerControl {
  camera;
  enabled = false;
  euler = new Euler(0, 0, 0, "YXZ");

  constructor(aspect: number) {
    this.camera = new PerspectiveCamera(50, aspect, 1, 3000);
    this.camera.position.set(-30, -8, 10);
    this.camera.lookAt(30, -8, 10);

    document.addEventListener("mousemove", this.onMouseMove);

    const button = document.getElementById("lock");
    button?.addEventListener("click", () => {
      document.body.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
      if (document.pointerLockElement) {
        this.enabled = true;
      } else {
        this.enabled = false;
      }
    });
  }

  onMouseMove = (event: MouseEvent) => {
    if (!this.enabled) {
      return;
    }
    // console.log(event);
    const { movementX, movementY } = event;
    this.euler.y -= movementX * 0.01;
    this.euler.x -= movementY * 0.01;

    this.camera.rotation.copy(this.euler);
  };
}
