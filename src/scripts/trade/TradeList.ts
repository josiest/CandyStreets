import { TraderPurchase, TraderSale } from '../../data/NPCData'
type TraderExchange = TraderPurchase | TraderSale;

export default class TradeList<ExchangeType extends TraderExchange>
               extends Phaser.GameObjects.Container {

    innerPadding: number = 20;
    textColor: number = 0xffffff;
    textSize: number = 30;

    rect: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene, rect: Phaser.Geom.Rectangle) {
        super(scene, rect.x, rect.y);
        this.scene.add.existing(this);

        this.type = `TradeList`;
        this.rect = rect;
        this.setDepth(10);
    }
    setItems(items: Array<ExchangeType>) {
        this.removeAll(true);

        const itemX = 0;
        let itemY = 0;
        items.forEach(exchange => {
            let text = this.scene.add.text(
                itemX, itemY, `${exchange.item}: ${exchange.price}`,
                { color: `#${this.textColor.toString(16)}`,
                  fontSize: `${this.textSize}px` });

            text.setDepth(20);
            itemY += this.textSize + this.innerPadding;

            this.add(text);
        });
    }
}
