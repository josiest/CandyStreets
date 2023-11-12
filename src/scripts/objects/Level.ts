import { Tilemaps } from "phaser";

export default class Level extends Phaser.GameObjects.Container {
    map: Phaser.Tilemaps.Tilemap
    baseLayer: Phaser.Tilemaps.TilemapLayer | null

    constructor(scene:Phaser.Scene) {
        super(scene);
        const map = scene.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('temp-tiles_extruded', 'tiles')

        this.map = map;
        
        if (tileset === null) {
            throw new Error("failed to load tileset for level tilemap")
        } else {
            this.baseLayer = map.createLayer("Base", tileset, 0, 0)
        }

        if (this.baseLayer === null) {
            throw new Error("failed to create base layer from tilemap")
        } else {
            this.add(this.baseLayer)
            this.baseLayer.scale = 0.25
        }

        scene.add.existing(this)
    }
}