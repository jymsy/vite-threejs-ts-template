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
  LineBasicMaterial,
  BufferAttribute,
  LineSegments,
  BufferGeometry,
} from "three";
import { World as PhysicsWorld } from "@dimforge/rapier3d-compat";
import initSky from "./Sky";
import loadMap from "./Map";
import PointerControl from "./PointerControl";
import Player from "./Player";

// for debug
let debugLines: LineSegments | null = null;

const debugRapier = (scene: Scene, world: PhysicsWorld) => {
  if (!debugLines) {
    let material = new LineBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
    });
    let geometry = new BufferGeometry();
    debugLines = new LineSegments(geometry, material);
    scene.add(debugLines);
  }

  const { vertices, colors } = world.debugRender();
  debugLines.geometry.setAttribute(
    "position",
    new BufferAttribute(vertices, 3)
  );
  debugLines.geometry.setAttribute("color", new BufferAttribute(colors, 4));
};

export default class World {
  scene;
  camera;
  control;
  player;
  physicsWorld;

  constructor(aspect: number) {
    this.scene = new Scene();
    this.physicsWorld = new PhysicsWorld({ x: 0.0, y: -9.81, z: 0.0 });

    // 平行光
    const directionalLight = new DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(180, 200, 150);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    // directionalLight.target = mesh;
    this.scene.add(directionalLight);

    // 实例化一个透视投影相机对象
    this.camera = new PerspectiveCamera(50, aspect, 1, 3000);
    this.camera.position.set(-30, -8, 10);
    this.camera.lookAt(30, -8, 10);

    // this.camera = new PerspectiveCamera(50, aspect, 1, 3000);
    // this.camera.position.set(-30, -8, 10);
    // this.camera.lookAt(30, -8, 10);

    // 环境光 漫反射
    const ambient = new AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    // const dirLightHelper = new DirectionalLightHelper(
    //   directionalLight,
    //   5,
    //   0xff0000
    // );
    // this.scene.add(dirLightHelper);

    const axesHelper = new AxesHelper(150);
    this.scene.add(axesHelper);

    initSky(this.scene);
    loadMap(this.scene, this.physicsWorld);

    this.control = new PointerControl(this);

    this.player = new Player(this);
  }

  render = () => {
    this.physicsWorld.step();
    // debugRapier(this.scene, this.physicsWorld);
    this.player.render();
    this.control.render(this.player.model.position);
  };
}
