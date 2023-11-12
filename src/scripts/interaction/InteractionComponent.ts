import Player from '../objects/Player'
type PlayerInteractionEvent = (player: Player) => void;
type PlayerExitEvent = () => void;

export default class InteractionComponent extends Phaser.GameObjects.Zone {
    isOverlappingPlayer: boolean = false;

    onPlayerEnterOverlap: PlayerInteractionEvent;
    onPlayerLeaveOverlap: PlayerExitEvent;

    constructor(scene: Phaser.Scene,
                x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);
        scene.physics.add.existing(this, false);
    }

    handleOverlap(player: Player) {
        if (!this.isOverlappingPlayer) {
            this.onPlayerEnterOverlap(player);
        }
        this.isOverlappingPlayer = true;
    }

    update(time, deltaTime) {
        const body = <Phaser.Physics.Arcade.Body> this.body;
        if (!body) {
            return;
        }
        if (this.isOverlappingPlayer && !body.embedded) {
            this.onPlayerLeaveOverlap();
            this.isOverlappingPlayer = false;
        }
    }
}
