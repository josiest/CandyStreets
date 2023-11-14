type NPCId = string;

interface TraderPurchase {
  item: ItemId,
  price: integer
}

interface TraderSale {
  item: ItemId,
  price: integer
  // stock: integer // do we want limited stock?
}

interface NPCData { // note: 'CharacterData' is reserved by node
  id: NPCId,
  name: string,
  image: AssetKey, // not sure we need this when using Tiled, but gives us some extra flexibility
  buys?: Array<TraderPurchase>,
  sells?: Array<TraderSale>,
  greetings: Array<string>,
  farewells: Array<string>
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
  greetings: [ // things to say when interacting (quest-completion would come first, quest-assignment would come second?)
    "Avast, landlubber!",
    "Come to trade, have ye?",
    "Are ye ready for some spooooky savings???"
  ],
  farewells: [ // things to say after closing trade window (if this character trades)
    "If ye see Davey Jones, kick 'im in the shin fer me!",
  ]
}