//

import { module as ngModule } from "angular";

import { ExploreRoutingModule } from "./explore-routing.module";
import {
  ExploreComponentName,
  ExploreComponentOptions,
} from "./explore.component";

export const ExploreModule: string = ngModule(module.id, [
  ExploreRoutingModule,
])
  .component(ExploreComponentName, ExploreComponentOptions)
  .name;
