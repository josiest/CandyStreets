import Player from '../objects/Player'
import Character from '../character/Character'
import InteractionComponent from '../interaction/InteractionComponent'

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
                let player = <Player> obj1;
                let bounds = <InteractionComponent> obj2;
                if (player && bounds) {
                    bounds.handleOverlap(player);
                }
                else {
                    console.log("failed to cast correctly on overlap!");
                }
            });
    }

    add(scene: Phaser.Scene, characterId: string,
        x: number, y: number) {

        let character = new Character(
            scene, characterId, x, y
        );
        this.characters.add(character);
        this.interactionBounds.add(character.interaction);
        return character;
    }

    update(time, deltaTime) {
        this.interactionBounds.children.each(obj => {
            let bounds = <InteractionComponent> obj;
            if (bounds) {
                bounds.update(time, deltaTime);
            }
            return true;
        });
    }
}
