import * as Phaser from 'phaser'
import IActivatableWidget from './ActivatableWidget'

type ButtonEvent = () => void;

export default class Button extends Phaser.GameObjects.Container
                            implements IActivatableWidget {

    horizontalPadding: number = 30;
    verticalPadding: number = 20;

    textSize: number = 30;
    textColor: number = 0x0;

    buttonColor: number = 0xff4dd2;
    buttonWidth: number = 200;
    buttonRounding: number = 10;

    isActive: boolean;
    boxRect: Phaser.Geom.Rectangle;

    graphics: Phaser.GameObjects.Graphics;
    buttonText: Phaser.GameObjects.Text;

    delegateClick: ButtonEvent;
    delegateHover: ButtonEvent;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.type = 'Button';
        this.scene.add.existing(this);

        this.graphics = this.scene.add.graphics().setDepth(1);
        this.buttonText = this.scene.add.text(
            this.horizontalPadding, this.verticalPadding,
            'Button Text',
            { fontSize: `${this.textSize}px`,
              color: `#${this.textColor.toString(16)}` }
        )
        .setDepth(20);
        this.add(this.buttonText);

        this.boxRect = new Phaser.Geom.Rectangle(
            this.x, this.y,
            this.buttonWidth, this.textSize + 2*this.verticalPadding
        );
        this.redraw();
    }
    setText(text: string) {
        this.buttonText.setText(text);
        return this;
    }
    setPosition(x: number, y: number) {
        super.setPosition(x, y);
        if (this.boxRect) {
            this.boxRect.setPosition(x, y);
        }
        if (this.graphics) {
            this.redraw();
        }
        return this;
    }
    setWidth(width: number) {
        this.boxRect.setSize(width, this.boxRect.height);
        this.redraw();
        return this;
    }

    activate() {
        this.isActive = true;
        this.redraw();
    }
    deactivate() {
        this.isActive = false;
        this.graphics.clear();
        this.buttonText.setVisible(false);
    }

    redraw() {
        this.graphics.clear()
            .fillStyle(this.buttonColor, 1)
            .fillRoundedRect(this.boxRect.x, this.boxRect.y,
                             this.boxRect.width, this.boxRect.height);
        return this;
    }
}
