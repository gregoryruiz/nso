//

import { IComponentOptions } from "angular";

import { DependencyWheelController } from "./dependencyWheel.controller";

import template from "./dependencyWheel.html";
import "./dependencyWheel.scss";

//

export const DependencyWheelComponentName =
  "nsoDependencyWheel";

export const DependencyWheelComponentOptions: IComponentOptions = {
  bindings: {
    vertex: "<",
  },
  controller: DependencyWheelController,
  template,
  transclude: true,
};
