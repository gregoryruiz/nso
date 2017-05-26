//

import {
  INodeDatum,
} from "nso/models/d3";

export interface ILinkDatum {
  source: d3.HierarchyNode<INodeDatum>;

  target: d3.HierarchyNode<INodeDatum>;
}
