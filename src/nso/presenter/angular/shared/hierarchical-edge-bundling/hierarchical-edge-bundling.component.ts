//

import template from "./hierarchical-edge-bundling.component.html";
import { HierarchicalEdgeBundlingController } from "./hierarchical-edge-bundling.controller";

import "./hierarchical-edge-bundling.component.scss";

//

export const HierarchicalEdgeBundlingComponent = {
  bindings: {
    vertex: "<",
  },
  controller: HierarchicalEdgeBundlingController,
  template,
  transclude: true,
};
