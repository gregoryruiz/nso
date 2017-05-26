//

import {
  ILinkDatum,
  INodeDatum,
} from "nso/models/d3";

export interface IVertex {
  edges: ILinkDatum[];
  nodes: INodeDatum[];
}
