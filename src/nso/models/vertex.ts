//

import {
  ILinkDatum,
  INodeDatum,
} from "nso/models";

export interface IVertex {
  nodes?: INodeDatum[];
  edges?: ILinkDatum[];
}
