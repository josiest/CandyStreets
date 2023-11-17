import Player from '../objects/Player'
type PlayerInteractionEvent = (player: Player) => void;
type InteractionEvent = () => void;

export default class InteractionComponent extends Phaser.GameObjects.Zone {
    gameObject: Phaser.GameObjects.GameObject;

    isOverlappingPlayer: boolean = false;
    promptText: string;

    onPlayerEnterOverlap: PlayerInteractionEvent;
    onPlayerLeaveOverlap: InteractionEvent;
    onPlayerInteracted: InteractionEvent;

    constructor(gameObject: Phaser.GameObjects.GameObject,
                x: number, y: number, width: number, height: number) {
        super(gameObject.scene, x, y, width, height);
        this.gameObject = gameObject;
        this.scene.physics.add.existing(this, false);

        let uiScene = this.scene.scene.get('ui-scene');
        uiScene.events.on('hud-interacted', event => {
            if (this.isOverlappingPlayer && this.onPlayerInteracted) {
                this.onPlayerInteracted();
            }
        });
    }

    dialog(interactionPrompt: string) {
        this.promptText = interactionPrompt;
        return this;
    }

    showText() {
        this.scene.events.emit('show-prompt', `e ${this.promptText}`);
    }
    hideText() {
        this.scene.events.emit('hide-prompt');
    }
    handleOverlap(player: Player) {
        if (!this.isOverlappingPlayer) {
            if (this.onPlayerEnterOverlap) {
                this.onPlayerEnterOverlap(player);
            }
            this.showText();
        }
        this.isOverlappingPlayer = true;
    }

    update(time, deltaTime) {
        const body = <Phaser.Physics.Arcade.Body> this.body;
        if (!body) {
            return;
        }
        if (this.isOverlappingPlayer && !body.embedded) {
            if (this.onPlayerLeaveOverlap) {
                this.onPlayerLeaveOverlap();
            }
            this.hideText();
            this.isOverlappingPlayer = false;
        }
    }
}
