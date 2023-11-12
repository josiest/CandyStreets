import InteractionComponent from '../interaction/InteractionComponent'
import Player from '../objects/Player'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    static interactionPadding: number = 100;
    interaction: InteractionComponent;

    constructor(scene: Phaser.Scene,
                characterId: string, x: number, y: number) {
        super(scene, x, y, characterId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();

        this.interaction = new InteractionComponent(
            scene,
            x, y,
            this.displayWidth + Character.interactionPadding,
            this.displayHeight + Character.interactionPadding
        );
        this.interaction.onPlayerEnterOverlap = (player: Player) => {
            console.log(`overlap ${characterId}!`);
        };
        this.interaction.onPlayerLeaveOverlap = () => {
            console.log('end overlap');
        };
    }
}
