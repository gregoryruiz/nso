//

import {
  BugInfos,
  PeopleInfos,
  RepositoryInfos,
} from "nso/models";

export interface PackageInfos {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: BugInfos | string;
  license?: string;
  author?: PeopleInfos | string;
  contributors?: PeopleInfos[] | string[];
  repository?: RepositoryInfos | string;
  dependencies?: {};
  devDependencies?: {};
}
