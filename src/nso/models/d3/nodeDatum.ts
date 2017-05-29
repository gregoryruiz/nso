//

import {
  INodeColor,
  IRawData,
} from "nso/models/d3";

export interface INodeDatum extends IRawData, INodeColor {
  key: string;
  children: INodeDatum[];
  parent: INodeDatum;
}
