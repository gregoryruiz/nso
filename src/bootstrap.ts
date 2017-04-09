//

import * as angular from "angular";
import NsoModule from "./nso/nso.module";

import "./base.scss";

angular.bootstrap(document, [NsoModule], {strictDi: true});
