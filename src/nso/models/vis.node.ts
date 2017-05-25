//

import { NodeColor } from "nso/models";

/**
 * nso.model.Node
 */
export interface IVisNode extends vis.Node {
  _depth?: number;
  _dependencyCount?: number;
  _dependentCount?: number;
  mass?: number;
  color?: NodeColor;
  value?: number;
}
