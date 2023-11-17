import UIScene from '../scenes/UIScene'

type DialogEvent = () => void;

export default class DialogBox extends Phaser.GameObjects.Container {
    boxHorizontalPadding: number = 100;
    boxTopPadding: number = 20;
    boxBottomPadding: number = 50;
    boxRectRadius: number = 20;
    boxHeight: number = 200;
    boxBackgroundColor: number = 0x1a1a1a;
    boxTextColor: number = 0xffffff;

    nameLeftPadding: number = 50;
    nameRectRadius: number = 10;
    nameBoxHeight: number = 50;
    nameBoxWidth: number = 400;
    nameBackgroundColor: number = 0xff4dd2;

    nameTextColor: number = 0x1a1a1a;
    nameTextSize: number = 20;
    nameTextHorizontalPadding: number = 10;
    nameTextVerticalPadding: number = 5;

    graphics: Phaser.GameObjects.Graphics;
    boxRect: Phaser.Geom.Rectangle;
    nameRect: Phaser.Geom.Rectangle;

    onDeactivated: DialogEvent;
    constructor(scene: Phaser.Scene) {
        super(scene);
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-ESC', event => {
                this.deactivate();
            });
        }
        this.setSize(scene.scale.width, scene.scale.height);
        this.boxRect = this.computeBoxRect();
        this.nameRect = this.computeNameRect();
        this.graphics = this.scene.add.graphics().setDepth(1);
        this.redraw();
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

    isActive() {
        return this.graphics.visible;
    }
    activate() {
        this.graphics.setVisible(true)
        return this.redraw();
    }
    deactivate() {
        this.graphics.clear();
        UIScene.popContent(this.scene);

        if (this.onDeactivated) {
            this.onDeactivated();
        }
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
