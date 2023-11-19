import * as Phaser from 'phaser'
import { TraderPurchase, TraderSale } from '../data/NPCData'
import TradeItem from './TradeItem'

type TraderExchange = TraderPurchase | TraderSale;

export default class TradeList<ExchangeType extends TraderExchange>
               extends Phaser.GameObjects.Container {

    iconSize: number = 64;
    innerPadding: number = 20;
    textColor: number = 0xffffff;
    textSize: number = 30;

    rect: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene, rect: Phaser.Geom.Rectangle) {
        super(scene, rect.x, rect.y);
        this.type = `TradeList`;
        this.scene.add.existing(this);

        this.rect = rect;
        this.setDepth(10);
    }
    setItems(items: Array<ExchangeType>) {
        this.removeAll(true);

        const itemX = 0;
        let itemY = 0;
        items.forEach(exchange => {
            this.add(TradeItem.new(this.scene, exchange.item, itemX, itemY)
                              .setPrice(exchange.price));

            itemY += this.iconSize + this.innerPadding;
        });
    }
}
