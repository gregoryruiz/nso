//

import {
  IRawData,
} from "nso/models/d3";

export interface IHierarchicalNode extends IRawData {
  children: IHierarchicalNode[];
  parent: IHierarchicalNode;
  key: string;
}
