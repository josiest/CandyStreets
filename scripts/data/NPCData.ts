import { ItemId, AssetKey } from './ItemData'
export type NPCId = string;

export interface TraderPurchase {
  item: ItemId,
  price: integer
}

export interface TraderSale {
  item: ItemId,
  price: integer
  // stock: integer // do we want limited stock?
}

export interface NPCData { // note: 'CharacterData' is reserved by node
  id: NPCId,
  name: string,
  image?: AssetKey, // not sure we need this when using Tiled, but gives us some extra flexibility
  buys?: Array<TraderPurchase>,
  sells?: Array<TraderSale>,
  introDialog: string | Array<string>,
  returnDialog: string | Array<string>,
  farewellDialog: string | Array<string>
}

// (presumably we'll place the character visually in-editor, so no need for placement data here?
let sampleCharacter : NPCData = {
  id: "pinkBeard", // id to look this entry up when opening a trade menu / interaction / etc
  name: "Pink Beard", // shows up for interaction label? or during dialog?
  image: "pinkbeard", // could be used for programatically adding a character?
  buys: [
    {
      item: "batSucker",
      price: 4
    }
  ],
  sells: [
    {
      item: "candyCorn",
      price: 6,
      //stock: 4 // do we want them to have a limited stock? we could set it here
    }
  ],
  introDialog: [ // things to say when interacting (quest-completion would come first, quest-assignment would come second?)
    "Avast, landlubber!",
    "Come to trade, have ye?",
  ],
  returnDialog: "Are ye ready for some spooooky savings???",
  // things to say after closing trade window (if this character trades)
  farewellDialog: "If ye see Davey Jones, kick 'im in the shin fer me!"
}
