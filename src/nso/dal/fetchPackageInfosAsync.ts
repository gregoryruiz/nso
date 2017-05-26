//

import "isomorphic-fetch";

import {
  IPackageInfos,
} from "nso/models/npm";

const PACKAGE_FILE_NAME = "package.json";

export async function fetchPackageInfosAsync(packageName: string): Promise<IPackageInfos> {
  try {
    return (await fetch(`https://unpkg.com/${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}`)).json();
  } catch (e) {
    console.error("fetchPackageInfosAsync", e);
  }
}
