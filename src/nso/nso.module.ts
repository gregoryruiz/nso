import * as angular from "angular";
import "angular-ui-router";
import * as _ from "lodash";
import nsoIndexHTMLTemplate from "./nso.module.html";
import NsoGraphDirective from "./nsoGraph.directive";

import "./nso-app.scss";
import "./omnibox.scss";

const STATES = {
  "root": {
    controller: "RootController",
    controllerAs: "rootCtrl",
    template: nsoIndexHTMLTemplate,
    url: "/",
  },
  "root.search": {
    resolve: {
      resolveModuleName,
    },
    url: "search/:moduleName",
  },
};

export default angular
  .module("nso", [
    NsoGraphDirective,
    "ui.router",
  ])
  .controller("RootController", RootController)
  .config(nsoConfig)
  .service("SearchService", SearchService)
  .run(exposeToRootScopeRun)
  .run(urlReloadingRun)
  .name;

function SearchService() {
  this.searchTerm = "";
}

function RootController($scope, $injector) {
  console.log("RootController");
  const $state = $injector.get("$state");
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
    if (_.isEmpty(newValue) || _.isEqual(newValue, oldValue)) {
      return;
    }
    $state.go("root.search", { moduleName: newValue});
  });
}

function resolveModuleName($injector, $stateParams) {
  console.log("resolveModuleName");
  // WARN: $stateParams must be in the arguments here
  const SearchService = $injector.get("SearchService");
  SearchService.searchTerm = $stateParams.moduleName;
}

function nsoConfig($injector) {
  // Injection
  const $stateProvider = $injector.get("$stateProvider");
  const $urlRouterProvider = $injector.get("$urlRouterProvider");

  _.each(STATES, (stateConfig, stateName) => $stateProvider.state(stateName, stateConfig));

  $urlRouterProvider.otherwise(STATES.root.url);
  $urlRouterProvider.otherwise("/search/express");

  // Change URL without reloading state
  // From https://stackoverflow.com/questions/23585065/angularjs-ui-router-change-url-without-reloading-state
  $urlRouterProvider.deferIntercept();
}

function urlReloadingRun($injector) {
  const $rootScope = $injector.get("$rootScope");
  const $state = $injector.get("$state");
  const $urlRouter = $injector.get("$urlRouter");

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

function exposeToRootScopeRun($injector) {
  const $rootScope = $injector.get("$rootScope");
  $rootScope.$state = $injector.get("$state");
}
