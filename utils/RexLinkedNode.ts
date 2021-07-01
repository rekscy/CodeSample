export default class RexLinkedNode<NodeType> {
  key: string;
  value: NodeType;
  nextNode: RexLinkedNode<NodeType> | null;
  previousNode: RexLinkedNode<NodeType> | null;

  constructor(
    key: string,
    value: NodeType,
    previousNode: RexLinkedNode<NodeType> | null
  ) {
    this.key = key;
    this.value = value;
    this.previousNode = previousNode;
    this.nextNode = null;
  }

  hasPreviousNode() {
    return this.previousNode !== null;
  }

  hasNextNode() {
    return this.nextNode !== null;
  }

  toJSON(
    callback?: (
      item: any
    ) => {
      key: string;
      value: any;
    }
  ) {
    let { value }: { value: any } = this;
    if (callback) {
      value = callback(value);
    }
    return {
      key: this.key,
      value
    };
  }
}
