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
//
// JT: seems like we can use the 'filecomplete' event to solve this issue!
// https://labs.phaser.io/edit.html?src=src/loader/loader%20events/file%20complete%20event.js&v=3.70.0

const firstImageGID = 1 // from "LooseImages" tileset's "firstgid" val in test-map-embedded.tmj
const placedImages = [
  // copy-pasted from /tiled/LooseImages.tsj, just to simplify the preload process
  {
   "id":0,
   "image":"img/candy-house-1.png",
   "imageheight":1200,
   "imagewidth":1200
  }, 
  {
   "id":1,
   "image":"img/candy-house-2.png",
   "imageheight":1200,
   "imagewidth":1200
  }, 
  {
   "id":2,
   "image":"img/candy-house-3.png",
   "imageheight":1200,
   "imagewidth":1200
  }, 
  {
   "id":3,
   "image":"characters/textures/candy-lama.png",
   "imageheight":800,
   "imagewidth":800
  }, 
  {
   "id":4,
   "image":"characters/textures/candy-pirate.png",
   "imageheight":800,
   "imagewidth":800
  }, 
  {
   "id":5,
   "image":"characters/textures/candy-cat.png",
   "imageheight":800,
   "imagewidth":800
  }
]

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' })
  }

  preload() {
    this.loadCharacters();
    this.loadItems();

    this.load.audio('candy-music', 'assets/candy-music.mp3');
    this.load.image("tiles", "assets/maps/tileset_extruded.png");
    this.load.image("candy-ground", "assets/maps/candy-ground.png");
    this.load.image("candy-ground-extruded",
                    "assets/maps/candy-ground-extruded.png");

    this.load.tilemapTiledJSON("tilemap", "assets/maps/test-map-embedded.tmj")

    const firstgid = 1
    placedImages.forEach((entry) => {
      this.load.image(`img-tile-${entry.id + firstImageGID}`, `assets/${entry.image}`)
    })
  }

  loadCharacters() {
    this.load.image('candy-pc', 'assets/characters/textures/candy-pc.png');
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
  }
}
