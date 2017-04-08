export interface INsoColor {
  border: string;
  background: string;
}

export const COLOR = {
  BLACK: "#000",
  GRAY_DARK: "#999",
  GRAY_LIGHT: "#ccc",
  WHITE: "#fff",
};

export const NODE_DEFAULT_COLOR: INsoColor = {
  background: COLOR.BLACK,
  border: COLOR.GRAY_DARK,
};

export const NODE_LOADING_COLOR: INsoColor = {
  background: "rgb(50,50,200)",
  border: "rgba(50,50,200,.8)",
};

export const NODE_SELECTED_COLOR: INsoColor = {
  background: "hsl(0, 65%, 50%)",
  border: "hsl(0, 65%, 25%)",
};

export const NODE_FAIL_COLOR: INsoColor = {
  background: "#666",
  border: "#999",
};

export const NODE_ROOT_COLOR: INsoColor = {
  background: "rgb(50,200, 50)",
  border: "rgba(50,200,50,.8)",
};

const NSO_OPTIONS: vis.Options = {

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
      {highlight: NODE_SELECTED_COLOR},
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

export default NSO_OPTIONS;
