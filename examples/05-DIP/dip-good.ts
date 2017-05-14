/* tslint:disable:max-classes-per-file */

// Good DIP

class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  public requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }

  public requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ["WS"];
  }

  public requestItem(item) {
    // ...
  }
}

// By constructing our dependencies externally and injecting them, we can easily
// substitute our request module for a fancy new one that uses WebSockets.
const inventoryTracker = new InventoryTracker(["apples", "bananas"], new InventoryRequesterV2());
inventoryTracker.requestItems();
