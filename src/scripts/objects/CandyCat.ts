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
        scene.input.keyboard.addKeys("W,A,S,D");
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(time, deltaTime) {
        super.update(time, deltaTime);
        const { left, right, up, down } = this.cursors;

        // Map input to acceleration
        this.setAcceleration(0, 0);
        let acceleration = Phaser.Math.Vector2.ZERO.clone();
        if (left.isDown) {
            acceleration.x = -1;
        }
        else if (right.isDown) {
            acceleration.x = 1;
        }
        if (up.isDown) {
            acceleration.y = -1;
        }
        else if (down.isDown) {
            acceleration.y = 1;
        }
        acceleration.normalize().scale(this.accelerationConstant);
        this.setAcceleration(acceleration.x, acceleration.y);
        if (!this.body) {
            return;
        }
        // Stop if currently moving below min speed and no input
        const isKeyDown = left.isDown || right.isDown || up.isDown || down.isDown;
        if (this.body.velocity.lengthSq() < this.minSpeed * this.minSpeed && !isKeyDown) {
            this.setVelocity(0, 0);
        }
        // Slow down if currently moving at all and no input
        if (this.body.velocity.lengthSq() > 0 && !isKeyDown) {
            let friction = this.body.velocity.clone();
            friction.negate().scale(this.frictionConstant);
            this.setAcceleration(friction.x, friction.y);
        }
        // Otherwise don't go faster than max speed
        let velocity = this.body.velocity.clone();
        velocity.limit(this.maxSpeed);
        this.setVelocity(velocity.x, velocity.y);
    }
}
