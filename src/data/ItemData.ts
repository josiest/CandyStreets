export type ItemId = string;
export type AssetKey = string;

export interface ItemData {
  id: ItemId,
  image: AssetKey,
  description: string
}

let itemSample : ItemData = {
  id: "batSucker",
  image: "batSucker", // should match an asset key that we've preloaded
  description: "Hard candy on a stick. Blackberry flavored. Yum!",
}
