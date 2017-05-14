// Bad ISP

class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  public setup() {
    this.rootNode = this.settings.rootNode;
    this.animationModule.setup();
  }

  public traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName("body"),
  animationModule() {
    // Most of the time, we won't need to animate when traversing.
  },
  // ...
});
