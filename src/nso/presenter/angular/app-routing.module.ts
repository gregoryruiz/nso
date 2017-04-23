//

import {module as ngModule} from "angular";
import AngularUiRouterModule, { StateProvider, Trace, UrlRouter } from "angular-ui-router";

//

export const AppRoutingModule = ngModule(String(module.id), [
  AngularUiRouterModule,
])
  .config(stateProviderConfig)
  .config(urlRouterProviderConfig)
  .name;

//

function stateProviderConfig($stateProvider: StateProvider) {
  "ngInject";

  $stateProvider.state({
    component: "nsoExplore",
    name: "explore",
    url: "/explore",
  });
}

function urlRouterProviderConfig($urlRouterProvider: UrlRouter) {
  "ngInject";

  $urlRouterProvider.otherwise("/explore/express");
}
