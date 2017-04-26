import {
  ILinkDatum,
  INodeDatum,
} from "nso/models";

export interface IVertex {
  edges: ILinkDatum[];
  nodes: INodeDatum[];
}
