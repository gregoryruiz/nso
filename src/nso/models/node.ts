//

export interface INode {
  id?: number;
  label?: string;
}

export interface IEdge {
  id?: number;
  from?: number;
  to?: number;
}

export interface IData {
  nodes?: INode[];
  edges?: IEdge[];
}
