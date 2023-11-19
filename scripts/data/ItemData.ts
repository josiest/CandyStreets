export type ItemId = string;
export type AssetKey = string;

export interface ItemData {
  id: ItemId,
  name: string,
  description?: string
}

let itemSample : ItemData = {
  id: "bat-sucker",
  name: "Bat Sucker",
  description: "Hard candy on a stick. Blackberry flavored. Yum!",
}
