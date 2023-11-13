import Player from '../objects/Player'
type PlayerInteractionEvent = (player: Player) => void;
type InteractionEvent = () => void;

export default class InteractionComponent extends Phaser.GameObjects.Zone {
    isOverlappingPlayer: boolean = false;
    promptText: Phaser.GameObjects.Text;

    onPlayerEnterOverlap: PlayerInteractionEvent;
    onPlayerLeaveOverlap: InteractionEvent;
    onPlayerInteracted: InteractionEvent;

    constructor(scene: Phaser.Scene, interactionPrompt: string,
                x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);

        this.promptText = scene.add.text((scene.scale.width / 2) - 100,
                                         scene.scale.height - 100,
                                         `e ${interactionPrompt}`,
                                         { color: '#0', fontSize: 30 })
                               .setVisible(false);

        if (scene.input.keyboard) {
            scene.input.keyboard.on('keyup-E', event => {
                if (this.isOverlappingPlayer && this.onPlayerInteracted) {
                    this.onPlayerInteracted();
                }
            });
        }

        scene.physics.add.existing(this, false);
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
