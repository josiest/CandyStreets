class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');
    }

    create ()
    {
        this.add.image(400, 300, 'sky');
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        width: 800,
        height: 600,
    },
    scene: Example,
};

const game = new Phaser.Game(config);
