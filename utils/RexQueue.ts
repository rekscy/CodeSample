// Utilise le mode FIFO

export default class RexQueue<ParentInstanceType, ItemType> {
  queue: Array<ItemType>;
  defaultTimeOut: number;
  timeBetweenEachTick: number;
  timer: any;
  parentInstance: ParentInstanceType;
  onTickHandler: (
    parentInstance: ParentInstanceType,
    nextItem: ItemType
  ) => Promise<void>;

  onFinishAllTicksHandler: (
    parentInstance: ParentInstanceType
  ) => Promise<void>;

  constructor(
    parentInstance: ParentInstanceType,
    options: {
      defaultTimeOut?: number;
      timeBetweenEachTick?: number;
      onTickHandler?: (
        parentInstance: ParentInstanceType,
        nextItem: ItemType
      ) => Promise<void>;
      onFinishAllTicksHandler?: (
        parentInstance: ParentInstanceType
      ) => Promise<void>;
    }
  ) {
    this.queue = [];
    this.timer = 0;
    this.defaultTimeOut = options.defaultTimeOut || 50;
    this.timeBetweenEachTick = options.timeBetweenEachTick || 0;
    this.parentInstance = parentInstance;
    this.onTickHandler = this.abstractHandler;
    this.onFinishAllTicksHandler = this.abstractHandler;
    // Callbacks
    if (options.onTickHandler) {
      this.onTickHandler = options.onTickHandler;
    }
    if (options.onFinishAllTicksHandler) {
      this.onFinishAllTicksHandler = options.onFinishAllTicksHandler;
    }
  }

  // eslint-disable-next-line no-empty-function,class-methods-use-this
  async abstractHandler() {}

  addHighPriorityElement(item: ItemType) {
    this.queue.unshift(item);
  }

  addLowPriorityElement(item: ItemType) {
    this.queue.push(item);
  }

  startCountDown() {
    if (this.queue.length !== 0) {
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        return this.processNextTick();
      }, this.defaultTimeOut);
    }
  }

  async processNextTick(): Promise<any> {
    const nextItem = this.queue.shift();
    if (!this.onTickHandler) {
      return Error("Tick not implemented");
    }
    if (nextItem) {
      await this.onTickHandler(this.parentInstance, nextItem);
    }
    if (this.queue.length > 0) {
      if (this.timeBetweenEachTick > 0) {
        setTimeout(() => {
          return this.processNextTick();
        }, this.timeBetweenEachTick);
      } else {
        return this.processNextTick();
      }
    } else if (this.onFinishAllTicksHandler) {
      await this.onFinishAllTicksHandler(this.parentInstance);
    }
    return true;
  }
}
