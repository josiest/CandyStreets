import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    minSpeed: number = 80.0;
    maxSpeed: number = 300.0;
    accelerationConstant: number = 800.0;
    frictionConstant: number = 5.5;

    //maxSpeed: number = 600.0;
    //accelerationConstant: number = 2100.0;
    //frictionConstant: number = 12;
    
    constructor(scene, x, y) {
        super(scene, x, y, 'candy-pc');
        scene.add.existing(this);

        // Setup Physics
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // Setup Input
        scene.input.keyboard.addKeys("W,A,S,D");
        this.cursors = scene.input.keyboard.createCursorKeys();

        const spriteSize = 256;
        this.setSize(spriteSize, spriteSize)
            .setDisplaySize(spriteSize, spriteSize);
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
        const isKeyDown = left.isDown || right.isDown
                         || up.isDown || down.isDown;

        if (this.body.velocity.lengthSq() < this.minSpeed * this.minSpeed
                && !isKeyDown) {

            this.setVelocity(0, 0);
        }
        // Slow down if currently moving and input isn't going along with the motion (per axis)
        if (this.body.velocity.lengthSq() > 0) {
            let friction = this.body.velocity.clone();
            friction.negate().scale(this.frictionConstant);
            if (Math.sign(this.body.velocity.x) != Math.sign(acceleration.x)) {
                this.setAccelerationX(acceleration.x + friction.x);
            }
            if (Math.sign(this.body.velocity.y) != Math.sign(acceleration.y)) {
                this.setAccelerationY(acceleration.y + friction.y);
            }
        }
        // Otherwise don't go faster than max speed
        let velocity = this.body.velocity.clone();
        velocity.limit(this.maxSpeed);
        this.setVelocity(velocity.x, velocity.y);
    }
}
