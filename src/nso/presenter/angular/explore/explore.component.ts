//

import { IComponentOptions } from "angular";

import { ExploreController } from "./explore.controller";

import template from "./explore.html";
import "./explore.scss";

//

export const ExploreComponentName: string =
  "nsoExplore";

export const ExploreComponentOptions: IComponentOptions = {
  bindings: {
    $transition$: "<",
  },
  controller: ExploreController,
  template,
};
