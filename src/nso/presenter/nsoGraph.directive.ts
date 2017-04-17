//

import { module } from "angular";
import {
  isEmpty,
  isEqual,
} from "lodash-es";

import { Graph } from "nso/viewmodels/vis";

export default module("npm-graph", [])
  .directive("nsoGraph", nsoGraphDirective)
  .name;

/**
 * @ngdoc directive
 * @name nsoGraph
 * @restrict E
 *
 * @param {string} moduleName The name of the module you want to graph
 * @param {string} nodeScale The key used to scale the nodes
 */
function nsoGraphDirective() {
  "ngInject";

  return {
    link: nsoGraphDirectiveLink,
    restrict: "E",
  };

  function nsoGraphDirectiveLink(scope, iElement, iAttrs) {
    let graph = new Graph(iElement[0]);

    iAttrs.$observe("moduleName", (newValue, oldValue) => {
      if (isEmpty(newValue) || isEqual(newValue, oldValue)) {
        return;
      }

      console.log("new moduleName", newValue);

      graph = new Graph(iElement[0]);
      graph.drawDependenciesFrom(newValue);

    });

    iAttrs.$observe("nodeScale", (newValue, oldValue) => {
      if (isEmpty(newValue) || isEqual(newValue, oldValue)) {
        return;
      }
      // graph.setNetworkOptions();
      // console.log('Scale with', graph.network, newValue)
    });

    scope.$watch(iAttrs["networkOptions"], (newValue, oldValue) => {
      if (isEmpty(newValue) || isEqual(newValue, oldValue)) {
        return;
      }
      console.log("networkOptions", graph.network, newValue);
      graph.setNetworkOptions(newValue);
    });

    scope.$on("$destroy", graph.destroy);
  }
}
