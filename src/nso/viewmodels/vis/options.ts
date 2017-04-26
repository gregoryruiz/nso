//

import {
  NODE_DEFAULT_COLOR,
  NODE_SELECTED_COLOR,
} from "nso/models";

export const DEFAULT_GRAPH_OPTIONS: vis.Options = {

  edges: {
    arrows: {
      from: {
        enabled: false,
        scaleFactor: 0,
      },
      to: {
        enabled: true,
        scaleFactor: .5,
      },
    },
    color: {
      inherit: "from",
    },
    smooth: {
      enabled: true,
      forceDirection: "none",
      roundness: 1,
      type: "continuous",
    },
    width: 1.1,
  },

  interaction: {
    hideEdgesOnDrag: true,
    tooltipDelay: 200,
  },

  nodes: {
    color: Object.assign({},
      NODE_DEFAULT_COLOR,
      { highlight: NODE_SELECTED_COLOR },
    ),
    font: {
      color: NODE_DEFAULT_COLOR.background,
      face: "Roboto",
    },
    scaling: {
      customScalingFunction: (min, max, total, value) => value / max,
      max: 50,
      min: 10,
    },
    shape: "dot",
    size: 10,
  },

  physics: {
    barnesHut: {
      springLength: 10,
    },
    // maxVelocity: 58,
    solver: "barnesHut",
  },
};
