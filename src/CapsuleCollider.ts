import { World, RigidBodyDesc, ColliderDesc } from "@dimforge/rapier3d-compat";

class CapsuleCollider {
  controller;
  collider;
  body;

  constructor(world: World) {
    let characterDesc = RigidBodyDesc.kinematicPositionBased().setTranslation(
      -25,
      -8,
      10
    );
    this.body = world.createRigidBody(characterDesc);
    let characterColliderDesc = ColliderDesc.capsule(0.4, 0.2);
    this.collider = world.createCollider(characterColliderDesc, this.body);
    this.controller = world.createCharacterController(0.01);
    this.controller.enableAutostep(0.3, 0.2, true);
    this.controller.enableSnapToGround(0.3);
  }
}

export default CapsuleCollider;
