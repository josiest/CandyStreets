import { ItemId } from '../../data/ItemData'

export default class TradeItem extends Phaser.GameObjects.Container {

    textColor: number = 0xffffff;
    textSize: number = 30;

    itemData: ItemId; // TODO: change to actual item data
    price: number = 1;

    text: Phaser.GameObjects.Text;

    static new(scene: Phaser.Scene, x: number, y: number) {
        return new TradeItem(scene, x, y);
    }

    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0) {
        super(scene, x, y);
        this.type = 'TradeItem';
        this.scene.add.existing(this);

        this.text = this.scene.add.text(
            0, 0, 'Item Text',
            { color: `#${this.textColor.toString(16)}`,
              fontSize: `${this.textSize}px` }
        )
        .setDepth(20);
        this.add(this.text);
    }
    setItem(itemId: ItemId) {
        this.itemData = itemId;
        this.text.setText(`${this.itemData}: ${this.price}`);
        return this;
    }
    setPrice(price: number) {
        this.price = price;
        this.text.setText(`${this.itemData}: ${this.price}`);
        return this;
    }
}
