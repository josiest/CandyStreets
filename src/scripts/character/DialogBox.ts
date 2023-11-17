import UIScene from '../scenes/UIScene'

type DialogEvent = () => void;

export default class DialogBox extends Phaser.GameObjects.Container {
    boxHorizontalPadding: number = 100;
    boxTopPadding: number = 20;
    boxBottomPadding: number = 50;
    boxRectRadius: number = 20;
    boxHeight: number = 200;
    boxBackgroundColor: number = 0x1a1a1a;
    boxTextColor: number = 0xfffffff;

    nameLeftPadding: number = 50;
    nameRectRadius: number = 20;
    nameBoxHeight: number = 100;
    nameBackgroundColor: number = 0xff80df;
    nameTextColor: number = 0x1a1a1a;
    nameTextHorizontalPadding: number = 10;

    graphics: Phaser.GameObjects.Graphics;
    rect: Phaser.Geom.Rectangle;

    onDeactivated: DialogEvent;
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.setSize(scene.scale.width, scene.scale.height);
        this.graphics = this.scene.add.graphics().setDepth(1);

        const width = this.scene.scale.width - 2*this.boxHorizontalPadding;
        const y = this.scene.scale.height - this.boxBottomPadding
                                          - this.boxHeight;

        this.rect = new Phaser.Geom.Rectangle(this.boxHorizontalPadding, y,
                                              width, this.boxHeight);

        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-ESC', event => {
                this.deactivate();
            });
        }

        this.redraw();
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
            .fillRoundedRect(this.rect.x, this.rect.y,
                             this.rect.width, this.rect.height);
        return this;
    }

}