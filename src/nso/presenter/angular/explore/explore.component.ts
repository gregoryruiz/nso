//

import { IComponentOptions } from "angular";

import template from "./explore.component.html";
import { ExploreController } from "./explore.controller";

import "./explore.component.scss";

//

export const ExploreComponent: IComponentOptions = {
  bindings: {
    $transition$: "<",
  },
  controller: ExploreController,
  template,
};
