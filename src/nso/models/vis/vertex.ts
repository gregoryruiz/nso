//

import {
  Data,
  DataSet,
  Edge,
} from "vis";

import {
  INodeDatum,
} from "nso/models/vis";

export class Vertex implements Data {
  public nodes?: DataSet<INodeDatum>;
  public edges?: DataSet<Edge>;

  constructor() {
    this.nodes = new DataSet<INodeDatum>();
    this.edges = new DataSet<Edge>();
  }
}
