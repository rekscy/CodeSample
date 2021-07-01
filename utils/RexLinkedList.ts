import RexLinkedNode from "./RexLinkedNode";

export default class RexLinkedList<NodeType> {
  rootNodeElement: RexLinkedNode<NodeType> | null;
  lasNodeElement: RexLinkedNode<NodeType> | null;
  numberOfItems: number;
  constructor() {
    this.rootNodeElement = null;
    this.lasNodeElement = null;
    this.numberOfItems = 0;
  }

  addValueWithKey(key: string, value: NodeType | RexLinkedNode<NodeType>) {
    let newNode;
    if (value instanceof RexLinkedNode) {
      newNode = value;
    } else {
      newNode = new RexLinkedNode<NodeType>(key, value, this.lasNodeElement);
    }

    this.numberOfItems += 1;

    if (this.rootNodeElement === null) {
      this.rootNodeElement = newNode;
      this.lasNodeElement = newNode;
    } else {
      if (this.lasNodeElement !== null) {
        this.lasNodeElement.nextNode = newNode;
      }
      this.lasNodeElement = newNode;
    }
    return newNode;
  }

  removeValueWithKey(key: string) {
    const elementToRemove: RexLinkedNode<
      NodeType
    > | null = this.findNodeWithKey(key);

    if (elementToRemove === null) {
      return null;
    }

    if (elementToRemove.hasPreviousNode() && elementToRemove.hasNextNode()) {
      if (
        elementToRemove.previousNode !== null &&
        elementToRemove.nextNode !== null
      ) {
        elementToRemove.previousNode.nextNode = elementToRemove.nextNode;
        elementToRemove.nextNode.previousNode = elementToRemove.previousNode;
        this.numberOfItems -= 1;
      }
    } else {
      // Suppression du dernier élément
      if (this.numberOfItems === 1) {
        this.rootNodeElement = null;
        this.lasNodeElement = null;
        this.numberOfItems -= 1;
        return;
      }
      // Premier element
      if (!elementToRemove.hasPreviousNode() && elementToRemove.nextNode) {
        this.rootNodeElement = elementToRemove.nextNode;
        elementToRemove.nextNode.previousNode = null;
        this.numberOfItems -= 1;
        return;
      }
      // Dernier element
      if (!elementToRemove.hasNextNode() && elementToRemove.previousNode) {
        this.lasNodeElement = elementToRemove.previousNode;
        elementToRemove.previousNode.nextNode = null;
        this.numberOfItems -= 1;
        return;
      }
    }
    return null;
  }

  findValueWithKey(key: string) {
    if (this.rootNodeElement === null) {
      return null;
    }
    let currentNode: RexLinkedNode<NodeType> | null = this.rootNodeElement;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  findNodeWithKey(key: string) {
    if (this.rootNodeElement === null) {
      return null;
    }
    let currentNode: RexLinkedNode<NodeType> | null = this.rootNodeElement;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  printList() {
    let currentNode: RexLinkedNode<NodeType> | null = this.rootNodeElement;
    console.log("LIST");
    while (currentNode !== null) {
      console.log(currentNode.key);
      currentNode = currentNode.nextNode;
    }
  }

  toArray(): Array<NodeType> {
    const results = [];
    let currentNode: RexLinkedNode<NodeType> | null = this.rootNodeElement;
    while (currentNode !== null) {
      results.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
    return results;
  }

  toJSON() {
    const results: { [k: string]: any } = {};
    let currentNode: RexLinkedNode<NodeType> | null = this.rootNodeElement;
    while (currentNode !== null) {
      const data = currentNode.toJSON();
      results[data.key] = data.value;
      currentNode = currentNode.nextNode;
    }
    return results;
  }
}
