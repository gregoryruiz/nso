//

import { IComponentOptions } from "angular";

import { DependencyNetworkController } from "./dependencyNetwork.controller";

import template from "./dependencyNetwork.html";
import "./dependencyNetwork.scss";

//

export const DependencyNetworkComponentName =
  "nsoDependencyNetwork";

export const DependencyNetworkComponentOptions: IComponentOptions = {
  bindings: {
    $transition$: "<",
    pkg: "<",
    vertex: "<",
  },
  controller: DependencyNetworkController,
  template,
  transclude: true,
};
