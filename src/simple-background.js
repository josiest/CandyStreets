class Example extends Phaser.Scene
{
    preload()
    {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
    }

    create()
    {
        this.add.image(0, 0, 'background'.setOrigin(0);
    }
}

const config = {
    type = Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height 1200
        }
    }
    scene: Example
};

const game = new Phaser.Game(config);
