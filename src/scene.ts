import GUI from "lil-gui";
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
} from "three";
import { init as initRapier } from "@dimforge/rapier3d-compat";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import * as animations from "./helpers/animations";
import { toggleFullScreen } from "./helpers/fullscreen";
import { resizeRendererToDisplaySize } from "./helpers/responsiveness";
import "./style.css";

import World from "./World";

const init = async () => {
  const width = window.innerWidth; //宽度
  const height = window.innerHeight; //高度

  const renderer = new WebGLRenderer();
  renderer.setSize(width, height);

  await initRapier();
  const world = new World(width / height);

  // new OrbitControls(world.camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  function render() {
    world.render();
    renderer.render(world.scene, world.camera); //执行渲染操作}
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
};

init();
