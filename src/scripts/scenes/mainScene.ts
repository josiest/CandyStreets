import Player from '../objects/Player'
import Character from '../character/Character'

export default class MainScene extends Phaser.Scene {
    player: Player;

    // TODO: Move to manager
    characters: Phaser.GameObjects.Group;

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        this.player = new Player(this, sceneWidth / 2, sceneHeight / 2)

        // TODO: Move to manager
        this.characters = this.add.group();
        this.characters.add(
            new Character(this, 'candy-lama', sceneWidth / 4, sceneHeight / 5));
        this.characters.add(
            new Character(this, 'candy-pirate', 3 * sceneWidth / 4, sceneHeight / 5));

        this.physics.add.collider(this.player, this.characters);
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
    }
}
