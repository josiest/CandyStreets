import * as Phaser from 'phaser'
import InteractionComponent from '../interaction/InteractionComponent'
import Player from '../objects/Player'

import UIScene from '../scenes/UIScene'
import TradeMenu from '../trade/TradeMenu'
import DialogBox from './DialogBox'

import { NPCData } from '../data/NPCData'

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

        this.interaction.onPlayerInteracted = () => {
            this.handleTalkToPlayer(true);
        }

        const spriteSize = 256;
        this.setSize(spriteSize, spriteSize)
            .setDisplaySize(spriteSize, spriteSize);
    }

    handleTalkToPlayer(isReturn: boolean) {
        let dialogBox = <DialogBox> UIScene.pushContent(
            this.scene, DialogBox);

        const dialogText = isReturn ? this.npcData.returnDialog
                                    : this.npcData.farewellDialog;

        dialogBox.setNameText(this.npcData.name)
                 .setDialogText(dialogText)
                 .onCancel(() => this.handleDialogCancel(dialogBox))
                 .onFinish(() => this.handleDialogFinish(dialogBox));
    }

    handleDialogCancel(dialogBox: DialogBox) {
        if (dialogBox.dialogLines == this.npcData.farewellDialog) {
            UIScene.popContent(this.scene, dialogBox);
        }
        else {
            dialogBox.setDialogText(this.npcData.farewellDialog);
        }
    }
    handleDialogFinish(dialogBox: DialogBox) {
        UIScene.popContent(this.scene, dialogBox);
        if (dialogBox.dialogText.text == this.npcData.farewellDialog) {
            return;
        }
        let tradeMenu = <TradeMenu> UIScene.pushContent(
            this.scene, TradeMenu
        );
        tradeMenu.setItemsBought(this.npcData.buys!)
                 .onCancel(() => this.handleTradeCancel(tradeMenu));
    }
    handleTradeCancel(tradeMenu: TradeMenu) {
        UIScene.popContent(this.scene, tradeMenu);
        this.handleTalkToPlayer(false);
    }
}
