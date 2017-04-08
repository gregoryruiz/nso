export interface NSOColor {
  border: string;
  background: string;
}

export const COLOR = {
  WHITE: "#fff",
  GRAY_LIGHT: "#ccc",
  GRAY_DARK: "#999",
  BLACK: "#000",
};

export const NODE_DEFAULT_COLOR: NSOColor = {
  border: COLOR.GRAY_DARK,
  background: COLOR.BLACK,
};

export const NODE_LOADING_COLOR: NSOColor = {
  border: "rgba(50,50,200,.8)",
  background: "rgb(50,50,200)",
};

export const NODE_SELECTED_COLOR: NSOColor = {
  border: "hsl(0, 65%, 25%)",
  background: "hsl(0, 65%, 50%)",
};

export const NODE_FAIL_COLOR: NSOColor = {
  border: "#999",
  background: "#666",
};

export const NODE_ROOT_COLOR: NSOColor = {
  border: "rgba(50,200,50,.8)",
  background: "rgb(50,200, 50)",
};

const NSOOptions: vis.Options = {

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
      from: {
        enabled: false,
        scaleFactor: 0,
      },
    },
    width: 1.1,
    color: {
      inherit: "from",
    },
    smooth: {
      enabled: true,
      type: "continuous",
      forceDirection: "none",
      roundness: 1,
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

export default NSOOptions;
