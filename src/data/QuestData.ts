import { ItemId } from './ItemData'
import { NPCId } from './NPCData'

export type QuestId = string;

export interface ItemTransfer {
  item: ItemId,
  count: integer
}

export interface QuestData {
  id: QuestId,
  name: string,
  description: string,
  getFrom: NPCId,
  takeTo: NPCId,
  intro: string,
  outro: string,
  // afterQuests?: Array<QuestId>, // you could require other quests to be done first?
  // pickUp?: Array<ItemTransfer>, // you could receive something at the start of the quest?
  deliver: Array<ItemTransfer>,
  reward: Array<ItemTransfer>,
}

let questSample : QuestData = {
  id: "xMarksTheSpot",
  name: "X Marks the Spot",
  description: "Find Pink Beard's Treasure!",
  getFrom: "pinkBeard", // character id
  takeTo: "pinkBeard", // character id
  intro: "Yarrr! I've got a treasure map for ye!\nIf ye find it, bring it back fer a hearty reward!",
  outro: "Well blow me down! That's me buried treasure!\nThanks fer bringin' it back! Here's a batsucker, on the house!",

  // stretch goal: quests unlock other quests
  // afterQuests:
  
  // stretch goal: you could receive something at the start of the quest
  // pickUp: [
  //   {
  //     item: "treasureMap",
  //     count: 1
  //   }
  // ],

  // what to deliver to finish the quest
  deliver: [
    {
      item: "treasure",
      count: 1
    }
  ],

  // what you get when you finish the quest
  reward: [
    {
      item: "batSucker",
      count: 1
    }
  ]
}
