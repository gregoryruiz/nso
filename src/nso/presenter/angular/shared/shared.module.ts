//

import { module as ngModule } from "angular";

import { HierarchicalEdgeBundlingComponent } from "./hierarchicalEdgeBundling/hierarchicalEdgeBundling.component";
import { OmniboxComponent } from "./omnibox/omnibox.component";

//

export const SharedModule = ngModule(String(module.id), [])
  .component("nsoOmnibox", OmniboxComponent)
  .component("nsoHierarchicalEdgeBundling", HierarchicalEdgeBundlingComponent)
  .name;
