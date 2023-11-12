export default class Character extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, characterId, x, y) {
        super(scene, x, y, characterId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
