import Player from '../objects/Player'
import CharacterSystem from '../character/CharacterSystem'
import Level from '../objects/Level'

export default class MainScene extends Phaser.Scene {
    level:Level;
    player: Player;
    characterSystem: CharacterSystem;

    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        const level = new Level(this);
        const camera = this.cameras.main;
        const sceneWidth = camera.width;
        const sceneHeight = camera.height;
        const worldWidth = level.map.widthInPixels;
        const worldHeight = level.map.heightInPixels;

        this.level = level;
        this.player = new Player(this, sceneWidth / 2, sceneHeight / 2);

        this.characterSystem = new CharacterSystem(this, this.player);
        this.characterSystem.add(this, 'candy-lama',
                                 sceneWidth / 4, sceneHeight / 5);
        this.characterSystem.add(this, 'candy-pirate',
                                 3 * sceneWidth / 4, sceneHeight / 5);

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        camera.setBounds(0, 0, worldWidth, worldHeight);
        camera.startFollow(this.player, true, 0.075, 0.075);
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
        this.characterSystem.update(time, deltaTime);
    }
}
