// Good ISP

class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  public setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  public setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  public traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  options: {
    animationModule() {
      // ...
    },
  },
  rootNode: document.getElementsByTagName("body"),
});
