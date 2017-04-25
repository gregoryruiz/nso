//

import { module as ngModule } from "angular";

import { AppRoutingModule } from "./app-routing.module";
import {
  AppComponentName,
  AppComponentOptions,
} from "./app.component";
import { ExploreModule } from "./explore/explore.module";
import { SharedModule } from "./shared/shared.module";

//

export const AppModule: string = ngModule(String(module.id), [
  // Local modules
  AppRoutingModule,
  SharedModule,

  // Routes
  ExploreModule,
])
  .component(AppComponentName, AppComponentOptions)
  .name;
