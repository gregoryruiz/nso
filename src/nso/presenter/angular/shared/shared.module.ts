//

import { module as ngModule } from "angular";

import { HierarchicalEdgeBundlingComponent } from "./hierarchical-edge-bundling/hierarchical-edge-bundling.component";
import { OmniboxComponent } from "./omnibox/omnibox.component";

//

export const SharedModule = ngModule(String(module.id), [])
  .component("nsoOmnibox", OmniboxComponent)
  .component("nsoHierarchicalEdgeBundling", HierarchicalEdgeBundlingComponent)
  .name;
