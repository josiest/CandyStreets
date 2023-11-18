import IActivatableWidget from '../ui/ActivatableWidget'
import UIScene from '../scenes/UIScene'

import { TraderPurchase, TraderSale } from '../../data/NPCData'
import TradeList from '../trade/TradeList'

type MenuEvent = () => void;

export default class TradeMenu extends Phaser.GameObjects.Container
                               implements IActivatableWidget {
    padding: number = 100;
    innerPadding: number = 100;

    backgroundColor: number = 0x1a1a1a;
    rectRadius: number = 20;

    textSize: number = 30;

    handleCancel: MenuEvent;
    handleConfirm: MenuEvent;
    onDeactivated: MenuEvent;

    isActive: boolean;
    rect: Phaser.Geom.Rectangle;

    graphics: Phaser.GameObjects.Graphics;
    itemsBought: TradeList<TraderPurchase>;
    itemsSold: Array<Phaser.GameObjects.Text>;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'TradeMenu';

        this.setSize(scene.scale.width, scene.scale.height);
        this.graphics = this.scene.add.graphics().setDepth(1);

        const width = this.scene.scale.width - 2*this.padding;
        const height = this.scene.scale.height - 2*this.padding;

        this.rect = new Phaser.Geom.Rectangle(
            this.padding, this.padding, width, height
        );

        const buysRect = new Phaser.Geom.Rectangle(
            this.rect.x + this.innerPadding,
            this.rect.y + this.innerPadding, width/2, height
        );
        this.itemsBought = new TradeList<TraderPurchase>(
            this.scene, buysRect
        );

        const sellsRect = new Phaser.Geom.Rectangle(
            buysRect.x + buysRect.width, buysRect.y,
            width/2, height
        );
        this.itemsSold = new Array<Phaser.GameObjects.Text>();

        this.redraw();
    }
    setItemsBought(items: Array<TraderPurchase>) {
        this.itemsBought.setItems(items);
        return this;
    }
    setItemsSold(itemsSold: Array<TraderPurchase>) {
        return this;
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

    resetItemsSold() {
        this.itemsSold.forEach(item => item.destroy());
        this.itemsSold = new Array<Phaser.GameObjects.Text>;
    }
    activate() {
        this.isActive = true;
        this.graphics.setVisible(true)
        return this.redraw();
    }
    deactivate() {
        this.isActive = false;
        this.graphics.clear();
        this.itemsBought.removeAll(true);
        this.resetItemsSold();

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
