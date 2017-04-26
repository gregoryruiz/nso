import { INodeDatum } from "nso/models";

export interface ILinkDatum {
  source: d3.HierarchyNode<INodeDatum>;

  target: d3.HierarchyNode<INodeDatum>;
}
