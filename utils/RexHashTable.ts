import RexLinkedList from "./RexLinkedList";
import RexLogger from "./RexLogger";

export default class RexHashTable<ItemType> {
  lists: { [key: number]: RexLinkedList<ItemType> };
  maxListSize: number;

  constructor(maxListSize: number) {
    this.lists = {};
    this.maxListSize = maxListSize || 100000;
  }

  hashKey(key: string): number {
    let str = key;
    if (typeof key === "number") {
      str = key;
    }
    if (typeof str !== "string") {
      throw Error("BAD TYPE DETECTED");
    }
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i: number = 0; i < str.length; i++) {
      hash = (hash << 5) - hash;
      hash += str.charCodeAt(i);
      hash &= hash;
    }
    return Math.abs(hash % this.maxListSize);
  }

  getListWithKey(key: string): RexLinkedList<ItemType> | null {
    const list: RexLinkedList<ItemType> = this.lists[this.hashKey(key)];
    if (
      typeof list !== "undefined" &&
      list.constructor.name === "RexLinkedList"
    ) {
      return list;
    }
    return null;
  }

  getItemValueWithKey(key: string): ItemType | null {
    const list: RexLinkedList<ItemType> = this.lists[this.hashKey(key)];
    if (
      typeof list !== "undefined" &&
      list.constructor.name === "RexLinkedList"
    ) {
      return list.findValueWithKey(key);
    }
    return null;
  }

  setItemWithKey(key: string, value: ItemType): void {
    if (typeof key === "undefined") {
      Error("Cannot insert with undefined key!");
    }

    const hash = this.hashKey(key);
    let list: RexLinkedList<ItemType> | null = this.getListWithKey(key);
    if (list === null) {
      list = new RexLinkedList<ItemType>();
      this.lists[hash] = list;
    }
    list.addValueWithKey(key, value);
  }

  removeItemWithKey(key: string): boolean {
    if (typeof key === "undefined") {
      Error("Cannot insert with undefined key!");
    }

    RexLogger.verbose(`Removing element with key ${key}`);
    const list: RexLinkedList<ItemType> | null = this.getListWithKey(key);
    if (list === null) {
      RexLogger.debug(`No item with ${key} was found`);
      return false;
    }

    list.removeValueWithKey(key);
    RexLogger.verbose(`Element with key ${key} has been removed`);

    if (list.numberOfItems === 0) {
      delete this.lists[this.hashKey(key)];
      return true;
    }
    return false;
  }

  toArray(): ItemType[] {
    let results: Array<any> = [];

    Object.values(this.lists).forEach((item: RexLinkedList<ItemType>) => {
      results = [...results, ...item.toArray()];
    });
    return results;
  }

  toJSON() {
    let results = {};

    Object.values(this.lists).forEach((item: RexLinkedList<ItemType>) => {
      results = { ...results, ...item.toJSON() };
    });
    return results;
  }
}
