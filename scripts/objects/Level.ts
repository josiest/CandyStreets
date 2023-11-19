import * as Phaser from 'phaser';
import { Tilemaps } from "phaser";
import CharacterSystem from "../character/CharacterSystem";
import Player from "./Player";

export default class Level extends Phaser.GameObjects.Container {
    map: Phaser.Tilemaps.Tilemap // parsed map data
    mapJSON: any // workaround for Phaser not fully parsing Tiled data
    baseLayer: Phaser.Tilemaps.TilemapLayer | null
    collisionLayer: Phaser.Tilemaps.TilemapLayer | null
    objectsLayer: Phaser.GameObjects.Container
    playerStartPosition: {x:number, y:number}

    constructor(scene:Phaser.Scene) {
        // NOTE: Apparently Phaser doesn't fully parse the Tiled data,
        // effectively losing a large chunk of features from Tiled, 
        // particularly custom properties & collision data
        // (at least for tilesets comprised of individual images).
        //
        // To work around this, we can still at least access the JSON of the file itself
        // via game.cache.tilemap.get(assetKey).

        super(scene);
        const mapKey = 'tilemap';
        
        this.map = scene.make.tilemap({key: mapKey});
        this.mapJSON = scene.game.cache.tilemap.get(mapKey).data;
        this.objectsLayer = new Phaser.GameObjects.Container(scene);

        const tileset = this.map.addTilesetImage('temp-tiles_extruded', 'tiles');
        
        if (tileset === null) {
            throw new Error("failed to load tileset for level tilemap");
        } else {
            this.baseLayer = this.map.createLayer("Base", tileset, 0, 0);
            this.collisionLayer = this.map.createLayer("Collision", tileset, 0, 0);
        }

        if (this.baseLayer === null) {
            throw new Error("failed to create base layer from tilemap -- is there a layer named \"Base\"?");
        } else {
            this.add(this.baseLayer);
        }

        this.add(this.objectsLayer);

        if (this.collisionLayer === null) {
            throw new Error("failed to create collision layer from tilemap -- is there a layer named \"Collision\"?");
        } else {
            this.add(this.collisionLayer);
            this.collisionLayer.setVisible(false);
        }
        
        scene.add.existing(this);
    }

    processObjects(characterSystem:CharacterSystem) {
        const objectsLayerData = this.map.getObjectLayer("Objects");
        if (objectsLayerData === null) {
            console.warn("no objects layer detected in Tiled map -- is this intentional?");
        } else {
            objectsLayerData.objects.forEach((tiledObject, index) => {
                const imageId = tiledObject.gid;
                const x = tiledObject.x;
                const y = tiledObject.y;
                const objectName = tiledObject.name;
                let npcId = this.getCustomString(tiledObject, "npcId");

                if (x === undefined || y === undefined) {
                    console.warn("WARNING: x and/or y position for tile object is undefined. skipping this one");
                    return;
                }

                if (objectName === "PlayerStart") {
                    this.playerStartPosition = {x,y};
                    return;
                }

                if (imageId === undefined) {
                    console.log("skipping object with undefined gid");
                    return;
                }
                
                if (npcId !== null) {
                    const npc = characterSystem.add(this.scene, npcId, x, y);
                    // note: character system is currently handling instantiation of character
                    // with sprite & image ID, colliders, etc
                    // this.objectsLayer.add(npc); // characterSystem has its own display group
                    this.transformSpriteToMatch(npc, tiledObject);
                } else {
                    const sprite = new Phaser.GameObjects.Sprite(this.scene, x, y, `img-tile-${imageId}`);
                    this.objectsLayer.add(sprite);
                    this.transformSpriteToMatch(sprite, tiledObject);
                }
            });
        }
    }

    prepCollision(player:Player):void {
        if (this.collisionLayer == null) {
            throw new Error("can't prep collision -- there's no collision layer");
        }
        this.collisionLayer.setCollisionByProperty({ collidable: true });
        this.scene.physics.add.collider(player, this.collisionLayer);
        // const debugGraphics = this.scene.add.graphics();
        // this.map.renderDebug(debugGraphics, {tileColor: 0x00FF00});
    }

    transformSpriteToMatch(sprite: Phaser.GameObjects.Sprite, tiledObject:Phaser.Types.Tilemaps.TiledObject): void {
        sprite.x = tiledObject.x!;
        sprite.y = tiledObject.y!;
        if (tiledObject.width !== undefined) {
            sprite.scaleX = tiledObject.width / sprite.width;
        }
        if (tiledObject.height !== undefined) {
            sprite.scaleY = tiledObject.height / sprite.height;
        }
        if (tiledObject.rotation !== undefined) {
            sprite.rotation = tiledObject.rotation;
        }
    }

    getCustomString(tiledObject:Phaser.Types.Tilemaps.TiledObject, propName:string): string | null {
        // note: Phaser doesn't seem to be registering custom properties for multi-image tilesets.
        // (It's also transforming Tiled data into a very different shape from Tiled's JSON,
        // e.g. by making each separate image into as its own "tileset")
        //
        // In order to get around the missing data, we can still look at the original JSON object,
        // which Phaser has cached after loading.
        //
        // For now, we're storing the cached JSON object under this.mapJSON.
        console.log(this.map);

        // Looking at the Tiled JSON object:
        console.log(this.mapJSON);
        const sourceTileset = this.mapJSON.tilesets.find((tilesetDef)=>{
            return (tilesetDef.firstgid <= tiledObject.gid! &&
            tilesetDef.firstgid + tilesetDef.tilecount > tiledObject.gid!);
        });
        if (sourceTileset === undefined) {
            throw new Error(`unable to find tileset for object "${tiledObject.name}" (id: ${tiledObject.id})`);
        } else {
            // console.log('found tileset:', sourceTileset);
        }

        const tileDefinition = sourceTileset.tiles.find((tileEntry)=>{
            return tileEntry.id + sourceTileset.firstgid == tiledObject.gid!;
        });

        if (tileDefinition == undefined) {
            throw new Error(`did't find the tile (gid: ${tiledObject.gid}) in the tileset we expected to (named "${sourceTileset.name}") -- yikes!`);
        } else {
            // console.log('found tile definition:', tileDefinition);
        }

        if (tileDefinition.properties == null) {
            console.log('tile has no properties listed', tileDefinition);
            return null;
        }

        let prop = tileDefinition.properties.find((prop)=>prop.name === propName);
        if (prop === undefined) {
            console.log(`tiledObject does not have property named ${propName}`, tiledObject);
            return null;
        }

        if (prop.value === undefined) {
            console.warn(`tiledObject has no value for property named ${propName} -- probably want to check on that!`, tiledObject);
            return null;
        }

        // console.log(`YAY found property ${propName} in tiledObject`, tiledObject, prop.value);

        return prop.value as string;

        // (saving a bit of code from trying to work directly with Phaser)
        // if (tiledObject.properties === undefined) {
        //     // in the demo, they use:
        //     // const tile = this.map.getTileAt(pointerTileX, pointerTileY);
        //     // this.propertiesText.setText(`Properties: ${JSON.stringify(tile.properties)}`);
        //     // but currently, there are no properties for this tile
        //     console.log('tiledObject does not have properties', tiledObject);
        //     return null;
        // }
        // a full list of places I've checked:
        // - tile.properties
        // - map.tilesets[index].tileProperties // presumably keyed by tile gid, but I've only seen it empty
        // - map.tilesets[index].getTileProperties(tileIndex)
        // - map.tilesets[index].tileData // presumably keyed by tile gid, but I've only seen it empty
        // - map.tilesets[index].getTileData(tileIndex)
        // - imageCollections[index].properties // presumably keyed by tile gid, but I've only seen it empty
        // It's possible that this lack of support only extends to multi-image tilesets though.
        //
        // console.log(tiledObject.properties);
    }
}
