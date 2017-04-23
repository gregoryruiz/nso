//

import { module as ngModule } from "angular";
import AngularUiRouterModule, { StateProvider, Transition, UrlRouter } from "angular-ui-router";

import { IExploreRoutingParams } from "./explore-routing.interface";

//

const mockedVertex = {
  nodes: [
    {
      key: "foo",
    },
  ],
  edges: [
    {

    },
  ],
};

export const ExploreRoutingModule = ngModule(String(module.id), [
  AngularUiRouterModule,
])
  .config(stateProviderConfig)
  .config(urlRouterProviderConfig)
  .name;

//

function stateProviderConfig($stateProvider: StateProvider) {
  "ngInject";

  const vertexResolver = (
    // TODO(@douglasduteil): inject a vertex getter
    $transition$: Transition,
  ) => {
    "ngInject";
    const params: IExploreRoutingParams = $transition$.params();

    // TODO(@douglasduteil): get params.pkg vertex
    console.warn(`TODO: get ${params.pkg} vertex`);
    return mockedVertex;
  };

  $stateProvider.state({
    abstract: true,
    name: "explore.pkg",
    params: {
      pkg: {
        dynamic: true,
        value: "1",
      },
    },
    url: "/:pkg",
  });

  $stateProvider.state({
    component: "nsoHierarchicalEdgeBundling",
    name: "explore.pkg.dependencyGraph",
    resolve: {
      vertex: vertexResolver,
    },
    url: "/dependency-graph",
  });
}

function urlRouterProviderConfig($urlRouterProvider: UrlRouter) {
  "ngInject";

  $urlRouterProvider.when("/explore/{pkg}", "/explore/{pkg}/dependency-graph");
}
