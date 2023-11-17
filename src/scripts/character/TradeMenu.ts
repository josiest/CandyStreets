import IActivatableWidget from '../ui/ActivatableWidget'
import UIScene from '../scenes/UIScene'

type MenuEvent = () => void;

export default class TradeMenu extends Phaser.GameObjects.Container
                               implements IActivatableWidget {
    padding: number = 100;
    backgroundColor: number = 0x1a1a1a;
    rectRadius: number = 20;

    isActive: boolean;
    graphics: Phaser.GameObjects.Graphics;
    rect: Phaser.Geom.Rectangle;

    onDeactivated: MenuEvent;
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.setSize(scene.scale.width, scene.scale.height);
        this.graphics = this.scene.add.graphics().setDepth(1);

        const width = this.scene.scale.width - 2*this.padding;
        const height = this.scene.scale.height - 2*this.padding;

        this.rect = new Phaser.Geom.Rectangle(
            this.padding, this.padding, width, height);

        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-ESC', event => {
                this.deactivate();
            });
        }

        this.redraw();
    }

    activate() {
        this.isActive = true;
        this.graphics.setVisible(true)
        return this.redraw();
    }
    deactivate() {
        this.isActive = false;
        this.graphics.clear();
        UIScene.popContent(this.scene, this);

        if (this.onDeactivated) {
            this.onDeactivated();
        }
    }
    redraw() {
        this.graphics.clear()
            .fillStyle(this.backgroundColor, 1)
            .fillRoundedRect(this.rect.x, this.rect.y,
                             this.rect.width, this.rect.height);
        return this;
    }
}
