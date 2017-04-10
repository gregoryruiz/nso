import * as vis from "vis";

import { Node } from "./nso.model.node";

/**
 * nso.model.Data
 */
export class Data implements vis.Data {
  public nodes?: vis.DataSet<Node>;
  public edges?: vis.DataSet<vis.Edge>;

  constructor() {
    this.nodes = new vis.DataSet<Node>();
    this.edges = new vis.DataSet<vis.Edge>();
  }
}
