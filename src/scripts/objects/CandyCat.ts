export default class CandyCat extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene, x, y) {
        super(scene, x, y, 'candy-cat')
        scene.add.existing(this)
        this.cursors = scene.input.keyboard.createCursorKeys()
    }
    
    update(time, deltaTime) {
        super.update(time, deltaTime);
        const { left, right, up, down } = this.cursors;

        if (left.isDown) {
            console.log('LEFT');
        }
        else if (right.isDown) {
            console.log('RIGHT');
        }
        if (up.isDown) {
            console.log('UP');
        }
        else if (down.isDown) {
            console.log('DOWN');
        }
    }
}
