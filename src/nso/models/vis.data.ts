//

import { DataSet } from "vis";

import { IVisNode } from "nso/models";

/**
 * nso.model.Data
 */
export class Data implements vis.Data {
  public nodes?: vis.DataSet<IVisNode>;
  public edges?: vis.DataSet<vis.Edge>;

  constructor() {
    this.nodes = new DataSet<IVisNode>();
    this.edges = new DataSet<vis.Edge>();
  }
}
