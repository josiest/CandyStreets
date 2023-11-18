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

    handleCancel: MenuEvent;
    handleConfirm: MenuEvent;
    onDeactivated: MenuEvent;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'TradeMenu';

        this.setSize(scene.scale.width, scene.scale.height);
        this.graphics = this.scene.add.graphics().setDepth(1);

        const width = this.scene.scale.width - 2*this.padding;
        const height = this.scene.scale.height - 2*this.padding;

        this.rect = new Phaser.Geom.Rectangle(
            this.padding, this.padding, width, height);

        this.redraw();
    }
    onCancel(callback: MenuEvent) {
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
    onConfirm(callback: MenuEvent) {
        this.handleConfirm = callback;
        if (this.scene.input.keyboard) {
            this.scene.input.keyboard.on('keyup-ENTER', event => {
                if (this.isActive) {
                    this.handleConfirm();
                }
            });
        }
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

        if (this.onDeactivated) {
            this.onDeactivated();
        }
    }
    redraw() {
        if (!this.isActive) {
            return;
        }
        this.graphics.clear()
            .fillStyle(this.backgroundColor, 1)
            .fillRoundedRect(this.rect.x, this.rect.y,
                             this.rect.width, this.rect.height);
        return this;
    }
}
