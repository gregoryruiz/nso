//

import * as angular from "angular";

import "./base.scss";
import NsoModule from "./nso/nso.module";

angular.bootstrap(document, [NsoModule], {strictDi: true});
