//

import AngularUiRouterModule, {
  StateProvider,
  UrlRouter,
} from "@uirouter/angularjs";
import { module as ngModule } from "angular";

//

export const AppRoutingModule: string = ngModule(module.id, [
  AngularUiRouterModule,
])
  .config(stateProviderConfig)
  .config(urlRouterProviderConfig)
  .name;

//

function stateProviderConfig($stateProvider: StateProvider): void {
  "ngInject";

  $stateProvider.state({
    component: "nsoExplore",
    name: "explore",
    url: "/explore",
  });
}

function urlRouterProviderConfig($urlRouterProvider: UrlRouter): void {
  "ngInject";

  $urlRouterProvider.otherwise("/explore/express");
}
