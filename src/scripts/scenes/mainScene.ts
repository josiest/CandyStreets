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
        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        this.level = new Level(this);

        this.player = new Player(this, sceneWidth / 2, sceneHeight / 2);

        this.characterSystem = new CharacterSystem(this, this.player);
        this.characterSystem.add(this, 'candy-lama',
                                 sceneWidth / 4, sceneHeight / 5);
        this.characterSystem.add(this, 'candy-pirate',
                                 3 * sceneWidth / 4, sceneHeight / 5);

        this.cameras.main.setBounds(0, 0, 
                                    this.level.map.widthInPixels, this.level.map.heightInPixels);
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
        this.characterSystem.update(time, deltaTime);
    }
}
