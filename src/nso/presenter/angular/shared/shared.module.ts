//

import { module as ngModule } from "angular";

import {
  DependencyWheelComponentName,
  DependencyWheelComponentOptions,
} from "./dependencyWheel/dependencyWheel.component";
import {
  OmniboxComponentName,
  OmniboxComponentOptions,
} from "./omnibox/omnibox.component";

//

export const SharedModule: string = ngModule(module.id, [])
  .component(OmniboxComponentName, OmniboxComponentOptions)
  .component(DependencyWheelComponentName, DependencyWheelComponentOptions)
  .name;
