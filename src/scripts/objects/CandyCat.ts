export default class CandyCat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'candy-cat')
        scene.add.existing(this)
    }
}
