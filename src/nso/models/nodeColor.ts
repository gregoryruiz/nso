//

/**
 * nso.model.NodeColor
 */
export interface NodeColor {
  border: string;
  background: string;
}

const COLOR = {
  BLACK: "#000",
  GRAY_DARK: "#999",
  // tslint:disable-next-line:object-literal-sort-keys
  GRAY: "#666",
  GRAY_LIGHT: "#ccc",
  WHITE: "#fff",
};

export const NODE_DEFAULT_COLOR: NodeColor = {
  background: COLOR.BLACK,
  border: COLOR.GRAY_DARK,
};

export const NODE_LOADING_COLOR: NodeColor = {
  background: "rgb(50,50,200)",
  border: "rgba(50,50,200,.8)",
};

export const NODE_SELECTED_COLOR: NodeColor = {
  background: "hsl(0, 65%, 50%)",
  border: "hsl(0, 65%, 25%)",
};

export const NODE_FAIL_COLOR: NodeColor = {
  background: COLOR.GRAY,
  border: COLOR.GRAY_DARK,
};

export const NODE_ROOT_COLOR: NodeColor = {
  background: "rgb(50,200, 50)",
  border: "rgba(50,200,50,.8)",
};
