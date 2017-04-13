//

import { module } from "angular";
import "angular-ui-router";
import {
  each,
  isEmpty,
  isEqual,
} from "lodash-es";

import { NsoD3GraphDirective } from "nso/nso-d3-graph.component";
import nsoIndexHTMLTemplate from "nso/nso.module.html";
import NsoGraphDirective from "nso/nsoGraph.directive";

import "nso/nso-app.scss";
import "nso/omnibox.scss";

const STATES = {
  "root": {
    controller: "RootController",
    controllerAs: "rootCtrl",
    template: nsoIndexHTMLTemplate,
    url: "/",
  },
  "root.d3": {
    resolve: {
      resolveModuleName,
    },
    url: "d3/:moduleName",
  },
  "root.vis": {
    resolve: {
      resolveModuleName,
    },
    url: "vis/:moduleName",
  },
};

export default module("nso", [
    NsoGraphDirective,
    "ui.router",
  ])
  .controller("RootController", RootController)
  .config(nsoConfig)
  .service("SearchService", SearchService)
  .directive("nsoD3Graph", NsoD3GraphDirective)
  .run(exposeToRootScopeRun)
  .run(urlReloadingRun)
  .name;

function SearchService() {
  "ngInject";
  this.searchTerm = "";
}

function RootController($scope: ng.IScope, $injector: ng.auto.IInjectorService) {
  "ngInject";
  console.log("RootController");
  const $state = $injector.get<ng.ui.IStateService>("$state");
  const SearchService = $injector.get("SearchService");
  const LAYOUTS = [
    { layout: { hierarchical: { enabled: false } } },
    { layout: { hierarchical: { direction: "UD" } } },
    { layout: { hierarchical: { direction: "RL" } } },
    { layout: { hierarchical: { direction: "DU" } } },
    { layout: { hierarchical: { direction: "LR" } } },
  ];

  this.SearchService = SearchService;
  this._layoutIndex = 0;
  this.networkOptions = LAYOUTS[this._layoutIndex];

  this.toggleLayout = function(){
    this._layoutIndex = LAYOUTS.indexOf(this.networkOptions) + 1;
    if (this._layoutIndex >= LAYOUTS.length) {
      this._layoutIndex = 0;
    }
    this.networkOptions = LAYOUTS[this._layoutIndex];
  };

  $scope.$watch("rootCtrl.SearchService.searchTerm", (newValue, oldValue) => {
    if (isEmpty(newValue) || isEqual(newValue, oldValue)) {
      return;
    }
    console.log("watch", newValue, oldValue);
    $state.go("root.search", { moduleName: newValue});
  });
}

function resolveModuleName($injector: ng.auto.IInjectorService, $stateParams: ng.ui.IStateParamsService) {
  "ngInject";
  console.log("resolveModuleName");
  // WARN: $stateParams must be in the arguments here
  const SearchService = $injector.get<any>("SearchService");
  SearchService.searchTerm = $stateParams.moduleName;
}

function nsoConfig($injector: ng.auto.IInjectorService) {
  "ngInject";
  // Injection
  const $stateProvider = $injector.get<ng.ui.IStateProvider>("$stateProvider");
  const $urlRouterProvider = $injector.get<ng.ui.IUrlRouterProvider>("$urlRouterProvider");

  each(STATES, (stateConfig, stateName) => $stateProvider.state(stateName, stateConfig));

  $urlRouterProvider.otherwise(STATES.root.url);
  $urlRouterProvider.otherwise("/vis/express");

  // Change URL without reloading state
  // From https://stackoverflow.com/questions/23585065/angularjs-ui-router-change-url-without-reloading-state
  $urlRouterProvider.deferIntercept();
}

function urlReloadingRun($injector: ng.auto.IInjectorService) {
  "ngInject";
  const $rootScope = $injector.get<ng.IRootScopeService>("$rootScope");
  const $state = $injector.get<ng.ui.IStateService>("$state");
  const $urlRouter = $injector.get<ng.ui.IUrlRouterService>("$urlRouter");

  // Change URL without reloading state
  // From https://stackoverflow.com/questions/23585065/angularjs-ui-router-change-url-without-reloading-state
  $rootScope.$on("$locationChangeSuccess", (e, newUrl, oldUrl) => {
    // Prevent $urlRouter's default handler from firing
    e.preventDefault();

    /**
     * provide conditions on when to
     * sync change in $location.path() with state reload.
     * I use $location and $state as examples, but
     * You can do any logic
     * before syncing OR stop syncing all together.
     */

    console.log("$locationChangeSuccess", $state.current, newUrl, oldUrl);

    if ($state.is(STATES["root.search"])) {
      return;
    }

    $urlRouter.sync();
  });

  // Configures $urlRouter's listener *after* your custom listener
  $urlRouter.listen();
}

function exposeToRootScopeRun($injector: ng.auto.IInjectorService) {
  "ngInject";
  const $rootScope = $injector.get("$rootScope");
  $rootScope.$state = $injector.get("$state");
}
