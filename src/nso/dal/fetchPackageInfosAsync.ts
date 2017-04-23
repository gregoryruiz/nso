//

import "isomorphic-fetch";

import { PackageInfos } from "nso/models";

const PACKAGE_FILE_NAME = "package.json";

export async function fetchPackageInfosAsync(packageName: string): Promise<PackageInfos> {
  try {
    return (await fetch(`https://unpkg.com/${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}`)).json();
  } catch (e) {
    console.error("fetchPackageInfosAsync", e);
  }
}
