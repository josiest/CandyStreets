import Player from '../objects/Player'
type PlayerInteractionEvent = (player: Player) => void;
type InteractionEvent = () => void;

export default class InteractionComponent extends Phaser.GameObjects.Zone {
    gameObject: Phaser.GameObjects.GameObject;

    isOverlappingPlayer: boolean = false;
    promptText: Phaser.GameObjects.Text;

    onPlayerEnterOverlap: PlayerInteractionEvent;
    onPlayerLeaveOverlap: InteractionEvent;
    onPlayerInteracted: InteractionEvent;

    constructor(gameObject: Phaser.GameObjects.GameObject,
                x: number, y: number, width: number, height: number) {
        super(gameObject.scene, x, y, width, height);
        this.gameObject = gameObject;
        this.scene.physics.add.existing(this, false);

        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-E', event => {
                if (this.isOverlappingPlayer && this.onPlayerInteracted) {
                    this.onPlayerInteracted();
                }
            });
        }
    }

    dialog(interactionPrompt: string) {
         this.promptText = this.scene
            .add.text((this.scene.scale.width / 2) - 100,
                      this.scene.scale.height - 100,
                      `e ${interactionPrompt}`,
                      { color: '#0', fontSize: 30 })
            .setVisible(false);
        return this;
    }

    showText() {
        if (this.isOverlappingPlayer) {
            this.promptText.setVisible(true);
        }
    }
    hideText() {
        this.promptText.setVisible(false);
    }

    handleOverlap(player: Player) {
        if (!this.isOverlappingPlayer) {
            if (this.onPlayerEnterOverlap) {
                this.onPlayerEnterOverlap(player);
            }
            this.promptText.setVisible(true);
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
            this.promptText.setVisible(false);
            this.isOverlappingPlayer = false;
        }
    }
}
