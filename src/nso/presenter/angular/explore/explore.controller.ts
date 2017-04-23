//

import { Ng1Controller, StateService, Transition } from "angular-ui-router";

import { IExploreRoutingParams } from "./explore-routing.interface";

//

export class ExploreController implements Ng1Controller {

  public searchTerm: string;

  // From component binding
  public $transition$: Transition;

  constructor(
    private $state: StateService,
  ) {
    "ngInject";
  }

  //

  public onSearchTermChange(newTerm) {
    // When the user change the input in the view
    this.$state.go(".", { pkg: newTerm });
  }

  //
  public $onInit() {
    // When Angular initiate the component
    const params: IExploreRoutingParams = this.$transition$.params();
    this.searchTerm = params.pkg;
  }

  public uiOnParamsChanged(newParams: IExploreRoutingParams) {
    // When the url change
    this.searchTerm = newParams.pkg;
  }

  public uiCanExit() {
    // Always allowed the router to exit this view
    return true;
  }

}
