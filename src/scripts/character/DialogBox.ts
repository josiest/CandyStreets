import IActivatableWidget from '../ui/ActivatableWidget'
import UIScene from '../scenes/UIScene'
import { NPCData } from '../../data/NPCData'

type DialogEvent = () => void;

export default class DialogBox extends Phaser.GameObjects.Container
                               implements IActivatableWidget {
    boxHorizontalPadding: number = 100;
    boxTopPadding: number = 20;
    boxBottomPadding: number = 100;
    boxRectRadius: number = 20;
    boxHeight: number = 200;
    boxBackgroundColor: number = 0x1a1a1a;

    textSize: number = 25;
    boxTextColor: number = 0xffffff;
    boxTextTopPadding: number = 60;
    boxTextHorizontalPadding: number = 40;

    nameLeftPadding: number = 50;
    nameRectRadius: number = 10;
    nameBoxHeight: number = 50;
    nameBoxWidth: number = 400;
    nameBackgroundColor: number = 0xff4dd2;

    actionTextPadding: number = 50;
    actionTextColor: number = 0xffffff;

    nameTextColor: number = 0x1a1a1a;
    nameTextHorizontalPadding: number = 20;
    nameTextVerticalPadding: number = 11;

    graphics: Phaser.GameObjects.Graphics;
    isActive: boolean;

    boxRect: Phaser.Geom.Rectangle;
    dialogText: Phaser.GameObjects.Text;

    nameRect: Phaser.Geom.Rectangle;
    nameText: Phaser.GameObjects.Text;

    cancelText: Phaser.GameObjects.Text;
    continueText: Phaser.GameObjects.Text;

    handleCancel: DialogEvent;
    handleContinue: DialogEvent;
    onDeactivated: DialogEvent;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'DialogBox';

        this.setSize(scene.scale.width, scene.scale.height);
        this.boxRect = this.computeBoxRect();
        this.nameRect = this.computeNameRect();
        this.graphics = this.scene.add.graphics().setDepth(1);
        this.redraw();

        this.buildTextElements();
    }

    setNameText(characterName: string) {
        this.nameText.setText(characterName);
        return this;
    }
    setDialogText(dialogText: string) {
        this.dialogText.setText(dialogText);
        return this;
    }
    onCancel(callback: DialogEvent) {
        this.handleCancel = callback;
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-ESC', event => {
                if (this.isActive) {
                    this.handleCancel();
                }
            });
        }
        return this;
    }
    onContinue(callback: DialogEvent) {
        this.handleContinue = callback;
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-E', event => {
                if (this.isActive) {
                    this.handleContinue();
                }
            });
        }
        return this;
    }

    buildTextElements() {
        this.nameText = this.scene.add.text(
            this.nameRect.x + this.nameTextHorizontalPadding,
            this.nameRect.y + this.nameTextVerticalPadding,
            "Character Name",
            { fontSize: `${this.textSize}px`,
              color: `#${this.nameTextColor.toString(16)}` }
        )
        .setDepth(20);

        const dialogTextWidth = this.boxRect.width
                              - 2*this.boxTextHorizontalPadding;

        this.dialogText = this.scene.add.text(
            this.boxRect.x + this.boxTextHorizontalPadding,
            this.boxRect.y + this.boxTextTopPadding,
            "Lorem ipsum dolor sit amet",
            { fontSize: `${this.textSize}px`,
              color: `#${this.boxTextColor.toString(16)}`,
              wordWrap: { width: dialogTextWidth, useAdvancedWrap: true } }
        )
        .setDepth(20);

        const actionTextY = this.scene.scale.height - this.actionTextPadding
                          - this.textSize;
        this.cancelText = this.scene.add.text(
            this.actionTextPadding, actionTextY,
            'esc to cancel',
            { fontSize: `${this.textSize}px`,
              color: `#${this.actionTextColor.toString(16)}` }
        )
        .setDepth(20);

        this.continueText = this.scene.add.text(
            this.scene.scale.width - this.actionTextPadding, actionTextY,
            'e to continue',
            { fontSize: `${this.textSize}px`,
              color: `#${this.actionTextColor.toString(16)}` }
        )
        .setDepth(20);

        const continueX = this.continueText.x
                        - this.continueText.getBounds().width;
        this.continueText.setPosition(continueX, this.continueText.y);
        return this;
    }

    activate() {
        this.isActive = true;
        this.graphics.setVisible(true)
        return this.redraw();
    }
    deactivate() {
        this.isActive = false;
        this.graphics.clear();
        this.nameText.setVisible(false);
        this.dialogText.setVisible(false);
        this.cancelText.setVisible(false);
        this.continueText.setVisible(false);

        if (this.onDeactivated) {
            this.onDeactivated();
        }
    }

    computeBoxRect() {
        const width = this.scene.scale.width - 2*this.boxHorizontalPadding;
        const y = this.scene.scale.height - this.boxBottomPadding
                - this.boxHeight;

        return new Phaser.Geom.Rectangle(this.boxHorizontalPadding, y,
                                         width, this.boxHeight);
    }
    computeNameRect() {
        const x = this.boxHorizontalPadding + this.nameLeftPadding;
        const y = this.scene.scale.height - this.boxBottomPadding
                - this.boxHeight - this.boxTopPadding;
        const width = this.nameBoxWidth + 2*this.nameTextHorizontalPadding;
        return new Phaser.Geom.Rectangle(x, y, width, this.nameBoxHeight);
    }

    redraw() {
        this.graphics.clear()
            .fillStyle(this.boxBackgroundColor, 1)
            .fillRoundedRect(this.boxRect.x, this.boxRect.y,
                             this.boxRect.width, this.boxRect.height)

            .fillStyle(this.nameBackgroundColor, 1)
            .fillRoundedRect(this.nameRect.x, this.nameRect.y,
                             this.nameRect.width, this.nameRect.height,
                             this.nameRectRadius);

        return this;
    }

}
