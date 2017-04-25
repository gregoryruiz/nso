//

import { IComponentOptions } from "angular";

import template from "./omnibox.html";
import "./omnibox.scss";

//

export const OmniboxComponentName: string =
  "nsoOmnibox";

export const OmniboxComponentOptions: IComponentOptions = {
  template,
  transclude: true,
};
