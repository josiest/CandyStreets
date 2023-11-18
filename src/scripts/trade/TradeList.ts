import { TraderPurchase, TraderSale } from '../../data/NPCData'
type TraderExchange = TraderPurchase | TraderSale;

export default class TradeList<ExchangeType extends TraderExchange>
               extends Phaser.GameObjects.Container {

    innerPadding: number = 20;
    textColor: number = 0xffffff;
    textSize: number = 30;

    rect: Phaser.Geom.Rectangle;
    children: Array<Phaser.GameObjects.Text>;

    constructor(scene: Phaser.Scene, rect: Phaser.Geom.Rectangle) {
        super(scene);
        this.type = `TradeList`;
        this.rect = rect;
        this.children = new Array<Phaser.GameObjects.Text>();
    }
    setItems(items: Array<ExchangeType>) {
        this.clearChildren();

        const itemX = this.rect.x;
        let itemY = this.rect.y;
        items.forEach(exchange => {
            let text = this.scene.add.text(
                itemX, itemY, `${exchange.item}: ${exchange.price}`,
                { color: `#${this.textColor.toString(16)}`,
                  fontSize: `${this.textSize}px` });

            text.setDepth(20);
            itemY += this.textSize + this.innerPadding;

            this.children.push(text);
        });
    }
    clearChildren() {
        this.children.forEach(item => item.destroy());
        this.children = new Array<Phaser.GameObjects.Text>();
    }
}
