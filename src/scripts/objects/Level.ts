import { Tilemaps } from "phaser";

export default class Level extends Phaser.GameObjects.Container {
    map: Phaser.Tilemaps.Tilemap
    baseLayer: Phaser.Tilemaps.TilemapLayer | null
    objectsLayer: Phaser.GameObjects.Container

    constructor(scene:Phaser.Scene) {
        super(scene);
        const map = scene.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('temp-tiles_extruded', 'tiles')
        const objectsLayerData = map.getObjectLayer("Objects")

        this.map = map;
        this.objectsLayer = new Phaser.GameObjects.Container(scene)
        
        if (tileset === null) {
            throw new Error("failed to load tileset for level tilemap")
        } else {
            this.baseLayer = map.createLayer("Base", tileset, 0, 0)
        }

        if (this.baseLayer === null) {
            throw new Error("failed to create base layer from tilemap")
        } else {
            this.add(this.baseLayer)
        }

        if (objectsLayerData === null) {
            console.warn("no objects layer detected -- is this intentional?")
        } else {
            objectsLayerData.objects.forEach((tiledObject, index) => {
                const imageId = tiledObject.gid
                const x = tiledObject.x
                const y = tiledObject.y
                
                if (imageId === undefined) {
                    console.log("skipping object with undefined gid")
                    return
                }
                if (x === undefined || y === undefined) {
                    console.warn("WARNING: x and/or y position for tile object is undefined. ignoring it")
                    return
                }
                
                // x/y positioning might get weird if we scale -- need to keep an eye on this
                const sprite = new Phaser.GameObjects.Sprite(scene, x, y, `img-tile-${imageId}`)
                this.objectsLayer.add(sprite)
                sprite.x = x
                sprite.y = y
                if (tiledObject.width !== undefined) {
                    sprite.scaleX = tiledObject.width / sprite.width
                }
                if (tiledObject.height !== undefined) {
                    sprite.scaleY = tiledObject.height / sprite.height
                }
            })
        }
        
        this.add(this.objectsLayer)

        scene.add.existing(this)
        window["levelContainer"] = this
    }
}
