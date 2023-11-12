import Character from '../character/Character'

export default class CharacterSystem extends Phaser.GameObjects.GameObject {
    characters: Phaser.GameObjects.Group;
    interactionBounds: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, player: Phaser.GameObjects.GameObject) {
        super(scene, 'CharacterSystem');
        this.characters = scene.add.group();
        this.interactionBounds = scene.add.group();
        scene.physics.add.collider(player, this.characters);
        scene.physics.add.overlap(
            player, this.interactionBounds,
            (obj1, obj2) => {
                console.log("overlap!");
            });
    }

    add(scene: Phaser.Scene, characterId: string,
        x: number, y: number) {

        let character = new Character(
            scene, characterId, x, y
        );
        this.characters.add(character);
        this.interactionBounds.add(character.interactionBounds);
    }
}
