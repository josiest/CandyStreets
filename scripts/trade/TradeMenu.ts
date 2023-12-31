import * as Phaser from 'phaser'
import IActivatableWidget from '../ui/ActivatableWidget'
import UIScene from '../scenes/UIScene'

import { TraderPurchase, TraderSale } from '../data/NPCData'
import TradeList from './TradeList'
import Button from '../ui/Button'

type MenuEvent = () => void;

export default class TradeMenu extends Phaser.GameObjects.Container
                               implements IActivatableWidget {
    padding: number = 100;
    innerPadding: number = 100;

    backgroundColor: number = 0x1a1a1a;
    rectRadius: number = 20;

    textSize: number = 30;
    textColor: number = 0xffffff;
    actionTextPadding: number = 30;

    tradeButtonWidth: number = 300;
    tradeRightPadding: number = 100;
    tradeBottomOffset: number = 20;

    tradeInnerHorizontalPadding: number = 20;
    tradeInnerVerticalPadding: number = 10;

    handleCancel: MenuEvent;
    handleConfirm: MenuEvent;
    onDeactivated: MenuEvent;

    isActive: boolean;
    rect: Phaser.Geom.Rectangle;

    graphics: Phaser.GameObjects.Graphics;
    cancelText: Phaser.GameObjects.Text;
    itemsBought: TradeList<TraderPurchase>;
    itemsSold: Array<Phaser.GameObjects.Text>;

    tradeButton: Button;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'TradeMenu';

        this.setSize(scene.scale.width, scene.scale.height);
        this.graphics = this.scene.add.graphics().setDepth(1);

        this.cancelText = this.scene.add.text(
            this.actionTextPadding,
            scene.scale.height - this.actionTextPadding
                               - this.textSize,
            'esc to cancel',
            { color: `#${this.textColor.toString(16)}`,
              fontSize: `${this.textSize}px` });

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

        const tradeX = this.rect.x + this.rect.width
                     - this.tradeButtonWidth - this.tradeRightPadding;
        const tradeY = this.rect.y + this.rect.height
                     - this.tradeBottomOffset;
        this.tradeButton = new Button(this.scene)
            .setText('Trade Sweets!')
            .setPosition(tradeX, tradeY)
            .setWidth(this.tradeButtonWidth);

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

        this.tradeButton.activate();
        return this.redraw();
    }
    deactivate() {
        this.isActive = false;
        this.graphics.clear();
        this.cancelText.destroy();
        this.itemsBought.removeAll(true);
        this.resetItemsSold();

        this.tradeButton.deactivate();

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
