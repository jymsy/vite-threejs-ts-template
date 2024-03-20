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
  Group,
} from "three";

export default class PointerControl {
  camera;
  enabled = false;
  euler = new Euler(0, 0, 0, "YXZ");
  group = new Group();

  constructor(aspect: number, scene: Scene) {
    this.group.position.set(-30, -8, 10);

    this.camera = new PerspectiveCamera(50, aspect, 1, 3000);
    this.camera.lookAt(0, 0, 10);

    // const axesHelper = new AxesHelper(150);
    // this.group.add(axesHelper);

    this.group.add(this.camera);
    this.camera.position.set(-3, 2, -6);
    scene.add(this.group);

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
    const { movementX, movementY } = event;
    this.euler.y -= movementX * 0.01;
    this.euler.x += movementY * 0.01;

    this.group.rotation.copy(this.euler);
  };

  render(position: Vector3) {
    this.group.position.copy(position);
  }
}
