import InteractionComponent from '../interaction/InteractionComponent'
import TradeMenu from './TradeMenu'
import Player from '../objects/Player'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    static interactionPadding: number = 100;
    tradeMenu: TradeMenu;
    interaction: InteractionComponent;

    constructor(scene: Phaser.Scene,
                characterId: string, x: number, y: number) {
        super(scene, x, y, characterId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();

        this.tradeMenu = TradeMenu.withParent(this);

        this.interaction = new InteractionComponent(
                this, x, y,
                this.displayWidth + Character.interactionPadding,
                this.displayHeight + Character.interactionPadding)
            .dialog("to talk");

        this.interaction.onPlayerInteracted = () => {
            this.tradeMenu.activate();
            this.interaction.hideText();
        };

        this.tradeMenu.onDeactivated = () => {
            this.interaction.showText();
        };
    }
}
