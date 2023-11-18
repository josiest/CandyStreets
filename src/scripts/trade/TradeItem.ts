import { ItemId, ItemData } from '../../data/ItemData'

export default class TradeItem extends Phaser.GameObjects.Container {

    textColor: number = 0xffffff;
    textSize: number = 30;

    iconSize: number = 64;
    nameLeftPadding: number = 20;

    itemData: ItemData; // TODO: change to actual item data
    price: number = 1;

    icon: Phaser.GameObjects.Image;
    text: Phaser.GameObjects.Text;

    static new(scene: Phaser.Scene, itemId: ItemId,
               x: number, y: number) {
        return new TradeItem(scene, itemId, x, y);
    }

    constructor(scene: Phaser.Scene, itemId: ItemId,
                x: number = 0, y: number = 0) {
        super(scene, x, y);
        this.type = 'TradeItem';
        this.scene.add.existing(this);

        const preloadScene = this.scene.scene.get('preload-scene');
        this.itemData = preloadScene.cache.json.get(`data-${itemId}`);
        this.icon = this.scene.add.image(0, 0, `img-${itemId}`)
                        .setSize(this.iconSize, this.iconSize)
                        .setDisplaySize(this.iconSize, this.iconSize);

        this.add(this.icon);
        console.log(`added image: img-${itemId}`);

        this.text = this.scene.add.text(
            this.nameLeftPadding + (this.iconSize/2.0),
            -this.textSize/2.0,
            `${this.itemData.name}: ${this.price}`,
            { color: `#${this.textColor.toString(16)}`,
              fontSize: `${this.textSize}px` }
        )
        .setDepth(20);

        this.add(this.text);
    }
    setItem(itemId: ItemId) {
        const preloadScene = this.scene.scene.get('preload-scene');
        this.itemData = preloadScene.cache.json.get(`data-${itemId}`);
        this.text.setText(`${this.itemData.name}: ${this.price}`);
        return this;
    }
    setPrice(price: number) {
        this.price = price;
        this.text.setText(`${this.itemData.name}: ${this.price}`);
        return this;
    }
}
