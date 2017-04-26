//

import { module as ngModule } from "angular";

import {
  DependencyNetworkComponentName,
  DependencyNetworkComponentOptions,
} from "./dependencyNetwork/dependencyNetwork.component";
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
  .component(DependencyNetworkComponentName, DependencyNetworkComponentOptions)
  .component(DependencyWheelComponentName, DependencyWheelComponentOptions)
  .name;
