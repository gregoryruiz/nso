//

import {
  StateService,
  Transition,
} from "@uirouter/angularjs";
import { test } from "ava";
import { stub } from "sinon";

import { ExploreController } from "./explore.controller";

//

test("on $onInit set the searchTerm to binded pkg params", async (t) => {
  // given
  const $state = {} as StateService;
  const $ctrl = new ExploreController($state);
  $ctrl.$transition$ = {
    params: stub().returns({ pkg: "foo" }),
  } as any as Transition;

  // when
  $ctrl.$onInit();

  // then
  t.is($ctrl.searchTerm, "foo");
});

test("on uiOnParamsChanged set the searchTerm to binded pkg params", async (t) => {
  // given
  const $state = {} as StateService;
  const $ctrl = new ExploreController($state);

  // when
  $ctrl.uiOnParamsChanged({ pkg: "bar" });

  // then
  t.is($ctrl.searchTerm, "bar");
});

test("on onSearchTermChange set go to pkg state", async (t) => {
  // given
  const $state = {
    go: stub(),
  } as any as StateService;
  const $ctrl = new ExploreController($state);

  // when
  $ctrl.onSearchTermChange("bar");

  // then
  t.true(($state.go as sinon.SinonStub).calledOnce);
  t.true(($state.go as sinon.SinonStub).calledWith(".", { pkg: "bar" }));
});
