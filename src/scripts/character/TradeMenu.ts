type MenuEvent = () => void;

export default class TradeMenu extends Phaser.GameObjects.GameObject {
    padding: number = 100;
    backgroundColor: number = 0x1a1a1a;
    rectRadius: number = 20;

    graphics: Phaser.GameObjects.Graphics;
    rect: Phaser.Geom.Rectangle;

    onDeactivated: MenuEvent;

    static withParent(gameObject: Phaser.GameObjects.GameObject) {
        return new TradeMenu(gameObject);
    }

    constructor(gameObject: Phaser.GameObjects.GameObject) {
        super(gameObject.scene, 'TradeMenu');
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
    }

    isActive() {
        return this.graphics.visible;
    }
    activate() {
        this.graphics.setVisible(true)
        return this.redraw();
    }
    deactivate() {
        this.graphics.setVisible(false);
        if (this.onDeactivated) {
            this.onDeactivated();
        }
        return this;
    }
    redraw() {
        this.graphics.clear()
            .fillStyle(this.backgroundColor, 1)
            .fillRoundedRect(this.rect.x, this.rect.y,
                             this.rect.width, this.rect.height);
        return this;
    }
}
