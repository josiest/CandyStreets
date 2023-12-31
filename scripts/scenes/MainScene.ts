import * as Phaser from 'phaser'
import Player from '../objects/Player'
import CharacterSystem from '../character/CharacterSystem'
import Level from '../objects/Level'

import UIScene from './UIScene'
import DialogBox from '../character/DialogBox'
import { NPCData } from '../data/NPCData'

export default class MainScene extends Phaser.Scene {
    level:Level;
    player: Player;
    characterSystem: CharacterSystem;

    constructor() {
        super({ key: 'main-scene' });
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

        level.processObjects(this.characterSystem);
        level.prepCollision(this.player);

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
        camera.setBounds(0, 0, worldWidth, worldHeight);
        camera.zoom = 0.62;

        this.jumpPlayerToPosition(level.playerStartPosition.x,
                                  level.playerStartPosition.y);
        camera.startFollow(this.player, true, 0.075, 0.075);


        let preloadScene = this.scene.get('preload-scene');
        let mom: NPCData = preloadScene.cache.json.get('data-candy-mom');

        let momDialog = <DialogBox> UIScene.pushContent(this, DialogBox);
        momDialog.setNameText(mom.name);
        momDialog.setDialogText(mom.introDialog);

        let music = this.sound.add('candy-music').play({loop: true });
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
        this.characterSystem.update(time, deltaTime);
    }

    jumpPlayerToPosition(x, y, snapCamera = true) {
        this.player.setX(x);
        this.player.setY(y);

        if (snapCamera) {
            this.cameras.main.centerOn(x,y);
        }
    }
}
