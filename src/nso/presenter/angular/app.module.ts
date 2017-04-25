//

import { module as ngModule } from "angular";

import { AppRoutingModule } from "./app-routing.module";
import {
  AppComponentName,
  AppComponentOptions,
} from "./app.component";
import { CoreModule } from "./core/core.module";
import { ExploreModule } from "./explore/explore.module";
import { SharedModule } from "./shared/shared.module";

//

export const AppModule: string = ngModule(String(module.id), [
  // Local modules
  AppRoutingModule,
  CoreModule,
  SharedModule,

  // Routes
  ExploreModule,
])
  .component(AppComponentName, AppComponentOptions)
  .name;
