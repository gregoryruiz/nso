/* tslint:disable:max-classes-per-file */

// Good OCP

class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = "ajaxAdapter";
  }

  public request(url) {
    // request and return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = "nodeAdapter";
  }

  public request(url) {
    // request and return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  public fetch(url) {
    return this.adapter.request(url)
      .then((response) => {
        // transform response and return
      });
  }
}
