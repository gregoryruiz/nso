export const COLOR = {
  WHITE: "#fff",
  GRAY_LIGHT: "#ccc",
  GRAY_DARK: "#999",
  BLACK: "#000",
};

export const NODE_DEFAULT_COLOR = {
  border: COLOR.GRAY_DARK,
  background: COLOR.BLACK,
};

export const NODE_LOADING_COLOR = {
  border: "rgba(50,50,200,.8)",
  background: "rgb(50,50,200)",
};

export const NODE_SELECTED_COLOR = {
  border: "hsl(0, 65%, 25%)",
  background: "hsl(0, 65%, 50%)",
};

export const NODE_FAIL_COLOR = {
  border: "#999",
  background: "#666",
};

export const NODE_ROOT_COLOR = {
  border: "rgba(50,200,50,.8)",
  background: "rgb(50,200, 50)",
};

export default {

  nodes: {
    shape: "dot",
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
      min: 10,
      max: 50,
    },
    size: 10,
  },

  edges: {
    arrows: {
      to: {
        enabled: true,
        scaleFactor: .5,
      },
    },
    width: 1.1,
    color: {
      inherit: "from",
    },
    smooth: {
      type: "continuous",
      forceDirection: "none",
    },
  },

  physics: {
    barnesHut: {
     springLength: 10,
    },
    // maxVelocity: 58,
    solver: "barnesHut",
  },

  interaction: {
    tooltipDelay: 200,
    hideEdgesOnDrag: true,
  },
};

