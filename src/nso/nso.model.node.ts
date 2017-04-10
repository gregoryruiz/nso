//

import { NodeColor } from "nso/nso.model.nodeColor";

/**
 * nso.model.Node
 */
export interface Node extends vis.Node {
    _depth?: number;
    _dependencyCount?: number;
    _dependentCount?: number;
    mass?: number;
    color?: NodeColor;
    value?: number;
}
