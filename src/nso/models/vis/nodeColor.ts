//

export interface INodeColor {
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

export const NODE_DEFAULT_COLOR: INodeColor = {
  background: COLOR.BLACK,
  border: COLOR.GRAY_DARK,
};

export const NODE_LOADING_COLOR: INodeColor = {
  background: "rgb(50,50,200)",
  border: "rgba(50,50,200,.8)",
};

export const NODE_SELECTED_COLOR: INodeColor = {
  background: "hsl(0, 65%, 50%)",
  border: "hsl(0, 65%, 25%)",
};

export const NODE_FAIL_COLOR: INodeColor = {
  background: COLOR.GRAY,
  border: COLOR.GRAY_DARK,
};

export const NODE_ROOT_COLOR: INodeColor = {
  background: "rgb(50,200, 50)",
  border: "rgba(50,200,50,.8)",
};
