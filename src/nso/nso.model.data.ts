//

import { DataSet } from "vis";

import { Node } from "nso/nso.model.node";

/**
 * nso.model.Data
 */
export class Data implements vis.Data {
  public nodes?: vis.DataSet<Node>;
  public edges?: vis.DataSet<vis.Edge>;

  constructor() {
    this.nodes = new DataSet<Node>();
    this.edges = new DataSet<vis.Edge>();
  }
}
