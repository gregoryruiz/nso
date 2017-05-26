//

import {
  Node,
} from "vis";

import {
  INodeColor,
} from "nso/models/vis";

export interface INodeDatum extends Node {
  _depth?: number;
  _dependencyCount?: number;
  _dependentCount?: number;
  mass?: number;
  color?: INodeColor;
  value?: number;
}
