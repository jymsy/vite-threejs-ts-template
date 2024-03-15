import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Scene, Vector3, Mesh, Quaternion } from "three";
import { ColliderDesc, World, RigidBodyDesc } from "@dimforge/rapier3d-compat";

const loadMap = (scene: Scene, world: World) => {
  const loader = new GLTFLoader();
  loader.load("gltf/cs_office_with_real_light.glb", (gltf) => {
    console.log(gltf.scene);
    const map = gltf.scene;
    const scale = map.children[0].children[0].scale;
    gltf.scene.traverse((node) => {
      if (node.type === "Mesh") {
        createTrimesh(node as Mesh, scale, map.children[0].quaternion, world);
      }
    });
    scene.add(gltf.scene);
  });
};

const createTrimesh = (
  mesh: Mesh,
  scale: Vector3,
  quaternion: Quaternion,
  world: World
) => {
  let bodyDesc = RigidBodyDesc.fixed().setRotation({
    w: quaternion.w,
    x: quaternion.x,
    y: quaternion.y,
    z: quaternion.z,
  });
  let body = world.createRigidBody(bodyDesc);

  const position = mesh.geometry.attributes.position;
  const vertices = new Float32Array(position.count * 3);
  for (let i = 0; i < position.count; i++) {
    vertices[i * 3] = position.getX(i) * scale.x;
    vertices[i * 3 + 1] = position.getY(i) * scale.y;
    vertices[i * 3 + 2] = position.getZ(i) * scale.z;
  }
  const indices = new Uint32Array(mesh.geometry.index!.array);
  const colliderDesc = ColliderDesc.trimesh(vertices, indices);
  world.createCollider(colliderDesc, body);
};

export default loadMap;
