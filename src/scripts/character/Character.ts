export default class Character extends Phaser.Physics.Arcade.Sprite {
    static interactionPadding: number = 100;
    interactionBounds: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene,
                characterId: string, x: number, y: number) {
        super(scene, x, y, characterId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();

        this.interactionBounds = scene.add.rectangle(
            x, y,
            this.displayWidth + Character.interactionPadding,
            this.displayHeight + Character.interactionPadding
        );
        scene.physics.add.existing(this.interactionBounds);
        this.interactionBounds.setStrokeStyle(1, 0xeb4034);
        this.interactionBounds.setDepth(-1);
    }
}
