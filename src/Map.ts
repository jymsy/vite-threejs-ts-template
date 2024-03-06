import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Scene, Vector3 } from "three";

const loadMap = (scene: Scene) => {
  const loader = new GLTFLoader();
  loader.load("gltf/cs_office_with_real_light.glb", (gltf) => {
    console.log(gltf);
    // gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
  });
};

export default loadMap;
