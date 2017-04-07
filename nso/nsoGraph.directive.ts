import angular from "angular";
import _ from "lodash";
import NSOGraph from "./NSOGraph";

export default angular
  .module("npm-graph", [])
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
  return {
    restrict: "E",
    link: nsoGraphDirectiveLink,
  };

  function nsoGraphDirectiveLink(scope, iElement, iAttrs) {
    let graph = new NSOGraph(iElement[0]);

    iAttrs.$observe("moduleName", function(newValue, oldValue){
      if (_.isEmpty(newValue) || _.isEqual(newValue)) {
        return;
      }

      graph = new NSOGraph(iElement[0]);
      graph.drawDependenciesFrom(newValue);

    });

    iAttrs.$observe("nodeScale", function(newValue, oldValue) {
      if (_.isEmpty(newValue) || _.isEqual(newValue, oldValue)) {
        return;
      }
      // graph.setNetworkOptions();
      // console.log('Scale with', graph.network, newValue)
    });

    scope.$watch(iAttrs["networkOptions"], function(newValue, oldValue) {
      if (_.isEmpty(newValue) || _.isEqual(newValue, oldValue)) {
        return;
      }
      console.log("networkOptions", graph.network, newValue);
      graph.setNetworkOptions(newValue);
    });

    scope.$on("$destroy", graph.destroy);
  }
}
