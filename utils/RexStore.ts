import Utils from "./RexUtils";

const storeValues: { [k: string]: any } = {
  webSocket: null
};

const RexStore = {
  store: storeValues,
  getStore() {
    return RexStore.store;
  },

  addNewKey(key: string, value: any) {
    RexStore.store[Utils.hashString(key)] = value;
    return RexStore;
  },

  getKey(key: string) {
    return RexStore.store[Utils.hashString(key)];
  },

  updateKeyWithNewValue(key: string, value: any) {
    RexStore.store[Utils.hashString(key)] = value;
    return RexStore;
  },

  deleteKey(key: string) {
    delete RexStore.store[Utils.hashString(key)];
    return RexStore;
  }
};

export default RexStore;
