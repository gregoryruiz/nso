//

import {
  IAugmentedJQuery,
  IController,
  IOnChangesObject,
} from "angular";

export class DependencyNetworkController implements IController {
public $onChanges(onChangesObj: IOnChangesObject) {
    console.log("DependencyNetworkController $onChanges", onChangesObj);
  }
}
