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
   "image":"pirate-house.png",
   "imageheight":429,
   "imagewidth":513
  }, 
  {
   "id":1,
   "image":"spider-house.png",
   "imageheight":362,
   "imagewidth":505
  }, 
  {
   "id":2,
   "image":"spooky-house.png",
   "imageheight":548,
   "imagewidth":678
  }, 
  {
   "id":3,
   "image":"candy-lama.png",
   "imageheight":128,
   "imagewidth":128
  }, 
  {
   "id":4,
   "image":"candy-pirate.png",
   "imageheight":128,
   "imagewidth":128
  }, 
  {
   "id":5,
   "image":"candy-cat.png",
   "imageheight":128,
   "imagewidth":128
  }
]

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('candy-cat',
                    'assets/temp/candy-cat.png');

    this.load.image('candy-lama',
                    'assets/temp/candy-lama.png');

    this.load.image('candy-pirate',
                    'assets/temp/candy-pirate.png');

    this.load.image("tiles", "assets/tileset_extruded.png");
    this.load.tilemapTiledJSON("tilemap", "assets/test-map-embedded.tmj")

    const firstgid = 1
    placedImages.forEach((entry) => {
      this.load.image(`img-tile-${entry.id + firstImageGID}`, `assets/${entry.image}`)
    })
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
