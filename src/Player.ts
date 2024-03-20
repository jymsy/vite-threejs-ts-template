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

export default class Player {
  model;
  clock = new Clock();
  moveVelocity = new Vector3();

  constructor(scene: Scene) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshLambertMaterial({
      color: 0xff0000,
    });
    this.model = new Mesh(geometry, material);
    this.model.position.set(-20, -10, 10);

    scene.add(this.model);

    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'w':
        this.moveVelocity.z = 1;
    }
  };

  onKeyUp = (event: KeyboardEvent) => {};

  render = () => {
    const delta = this.clock.getDelta();

    this.model.
  };
}
