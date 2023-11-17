import InteractionComponent from '../interaction/InteractionComponent'
import Player from '../objects/Player'

import UIScene from '../scenes/UIScene'
import TradeMenu from './TradeMenu'
import DialogBox from './DialogBox'

import { NPCData } from '../../data/NPCData'

export default class Character extends Phaser.Physics.Arcade.Sprite {
    static interactionPadding: number = 100;
    interaction: InteractionComponent;
    npcData: NPCData; 

    constructor(scene: Phaser.Scene,
                characterId: string, x: number, y: number) {
        super(scene, x, y, characterId);

        const preloadScene = this.scene.scene.get("preload-scene");
        this.npcData = preloadScene.cache.json.get(`data-${characterId}`);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();

        this.interaction = new InteractionComponent(
                this, x, y,
                this.displayWidth + Character.interactionPadding,
                this.displayHeight + Character.interactionPadding)
            .dialog("to talk");

        this.interaction.onPlayerInteracted = () => this.onTalkToPlayer();
    }

    onTalkToPlayer() {
        let dialogBox = <DialogBox> UIScene.pushContent(
            this.scene, DialogBox);

        dialogBox.setNameText(this.npcData.name)
                 .setDialogText(this.npcData.returnDialog)
                 .onCancel(() => this.handleCancel(dialogBox))
                 .onContinue(() => this.handleContinue(dialogBox));
    }

    handleCancel(dialogBox: DialogBox) {
        if (dialogBox.dialogText.text == this.npcData.farewellDialog) {
            dialogBox.deactivate();
        }
        else {
            dialogBox.dialogText.setText(this.npcData.farewellDialog);
        }
    }
    handleContinue(dialogBox: DialogBox) {
        if (dialogBox.dialogText.text == this.npcData.farewellDialog) {
            dialogBox.deactivate();
        }
    }
}
