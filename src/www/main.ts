//

import {
  bootstrap,
  IAngularBootstrapConfig,
} from "angular";

import { AppModule } from "nso/presenter/angular";

const angularBootstrapConfig: IAngularBootstrapConfig = {
  strictDi: true,
};

bootstrap(document, [AppModule], angularBootstrapConfig);
