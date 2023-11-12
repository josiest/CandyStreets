export default class Character extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene,
                characterId: string, x: number, y: number) {
        super(scene, x, y, characterId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
    }
}
