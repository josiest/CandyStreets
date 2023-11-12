import Character from '../character/Character'

export default class CharacterSystem extends Phaser.GameObjects.GameObject {
    characters: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, player: Phaser.GameObjects.GameObject) {
        super(scene, 'CharacterSystem');
        this.characters = scene.add.group();
        scene.physics.add.collider(player, this.characters);
    }

    add(scene: Phaser.Scene, characterId: string,
        x: number, y: number) {

        this.characters.add(new Character(
            scene, characterId, x, y
        ));
    }
}
