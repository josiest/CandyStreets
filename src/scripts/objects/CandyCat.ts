export default class CandyCat extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    minSpeed: number = 80.0;
    maxSpeed: number = 300.0;
    accelerationConstant: number = 800.0;
    frictionConstant: number = 2.5;

    constructor(scene, x, y) {
        super(scene, x, y, 'candy-cat');
        scene.add.existing(this);

        // Setup Physics
        scene.physics.add.existing(this);

        // Setup Input
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(time, deltaTime) {
        super.update(time, deltaTime);
        const { left, right, up, down } = this.cursors;

        this.setAcceleration(0, 0);
        if (left.isDown) {
            this.setAccelerationX(-this.accelerationConstant);
        }
        else if (right.isDown) {
            this.setAccelerationX(this.accelerationConstant);
        }
        if (up.isDown) {
            this.setAccelerationY(-this.accelerationConstant);
        }
        else if (down.isDown) {
            this.setAccelerationY(this.accelerationConstant);
        }
        if (!this.body) {
            return;
        }
        const isKeyDown = left.isDown || right.isDown || up.isDown || down.isDown;
        if (this.body.velocity.lengthSq() < this.minSpeed * this.minSpeed && !isKeyDown) {
            this.setVelocity(0, 0);
        }

        if (this.body.velocity.lengthSq() > 0 && !isKeyDown) {
            let friction = this.body.velocity.clone();
            friction.negate().scale(this.frictionConstant);
            this.setAcceleration(friction.x, friction.y);
        }

        const velocity = this.body.velocity.limit(this.maxSpeed);
        this.setVelocity(velocity.x, velocity.y);
    }
}
