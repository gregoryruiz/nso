//

import { module as ngModule } from "angular";

import { ExploreRoutingModule } from "./explore-routing.module";
import { ExploreComponent } from "./explore.component";

export const ExploreModule = ngModule(String(module.id), [
  ExploreRoutingModule,
])
  .component("nsoExplore", ExploreComponent)
  .name;
