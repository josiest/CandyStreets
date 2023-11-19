import * as Phaser from 'phaser'

// Heads up: preloading the Object Layer images used by Tiled is kinda messy! (below)
//
// Each image needs to be preloaded and given a key for later lookup,
// but the file that lists the image filepaths ALSO needs to be preloaded.
// In theory we should preload the image files dynamically after the tmj is preloaded,
// but I still need to investigate how to get into that part of Phaser's load/preload
// behavior or how to best work around it.
//
// Possible workarounds:
// - use fetch in the preload scene?
// - add a console command to stuff the relevant tmj data into a js module?
//
// For the moment, the pertinent bits for the image file loading & generating keys
// are just copy-pasted in below.
// 
// (It's brittle, but for now this works and I don't want to hold up other dev.)

const firstImageGID = 1 // from "LooseImages" tileset's "firstgid" val in test-map-embedded.tmj
const placedImages = [
  // copy-pasted from /tiled/LooseImages.tsj, just to simplify the preload process
  {
   "id":0,
   "image":"img/candy-house-1.png",
   "imageheight":429,
   "imagewidth":513
  }, 
  {
   "id":1,
   "image":"img/candy-house-1.png",
   "imageheight":362,
   "imagewidth":505
  }, 
  {
   "id":2,
   "image":"img/candy-house-1.png",
   "imageheight":548,
   "imagewidth":678
  }, 
  {
   "id":3,
   "image":"characters/textures/candy-lama.png",
   "imageheight":128,
   "imagewidth":128
  }, 
  {
   "id":4,
   "image":"characters/textures/candy-pirate.png",
   "imageheight":128,
   "imagewidth":128
  }, 
  {
   "id":5,
   "image":"characters/textures/candy-cat.png",
   "imageheight":128,
   "imagewidth":128
  }
]

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' })
  }

  preload() {
    this.loadCharacters();
    this.loadItems();

    this.load.image("tiles", "assets/tileset_extruded.png");
    this.load.tilemapTiledJSON("tilemap", "assets/test-map-embedded.tmj")

    const firstgid = 1
    placedImages.forEach((entry) => {
      this.load.image(`img-tile-${entry.id + firstImageGID}`, `assets/${entry.image}`)
    })
  }

  loadCharacters() {
    this.load.image('candy-pc', 'assets/temp/candy-pc.png');
    this.load.json('data-candy-mom',
                   'assets/characters/candy-mom.json');

    this.load.image('candy-cat',
                    'assets/characters/textures/candy-cat.png');
    this.load.json('data-candy-cat',
                   'assets/characters/candy-cat.json');

    this.load.image('candy-lama',
                    'assets/characters/textures/candy-lama.png');
    this.load.json('data-candy-lama',
                   'assets/characters/candy-lama.json');

    this.load.image('candy-pirate',
                    'assets/characters/textures/candy-pirate.png');
    this.load.json('data-candy-pirate',
                   'assets/characters/candy-pirate.json');

  }

  loadItems() {
      this.load.image('img-bat-sucker',
                      'assets/candy/textures/bat-sucker.png');
      this.load.json('data-bat-sucker',
                     'assets/candy/bat-sucker.json');

      this.load.image('img-candy-apple',
                      'assets/candy/textures/candy-apple.png');
      this.load.json('data-candy-apple',
                     'assets/candy/candy-apple.json');

      this.load.image('img-candy-corn',
                      'assets/candy/textures/candy-corn.png');
      this.load.json('data-candy-corn',
                     'assets/candy/candy-corn.json');

      this.load.image('img-chocolate-bar',
                      'assets/candy/textures/chocolate-bar.png');
      this.load.json('data-chocolate-bar',
                     'assets/candy/chocolate-bar.json');
  }

  create() {
    this.scene.start('main-scene')

    /**
     * This is how you would dynamically import the MainScene class (with code splitting),
     * add the MainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'MainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "MainScene" */ './MainScene').then(MainScene => {
    //     this.scene.add('MainScene', MainScene.default, true)
    //   })
    // else console.log('The MainScene class will not even be loaded by the browser')
  }
}
