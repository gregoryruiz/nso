//

import {
  IBugInfos,
  IPeopleInfos,
  IRepositoryInfos,
} from "nso/models/npm";

export interface IPackageInfos {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: IBugInfos | string;
  license?: string;
  author?: IPeopleInfos | string;
  contributors?: IPeopleInfos[] | string[];
  repository?: IRepositoryInfos | string;
  dependencies?: {};
  devDependencies?: {};
}
