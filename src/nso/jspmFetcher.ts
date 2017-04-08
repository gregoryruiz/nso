import * as _ from "lodash";

const PACKAGE_FILE_NAME = "package.json";

export interface IJspmPackageInfo {
  name: string;
  repository?: string;
  license?: string;
  homepage?: string;
  author?: string;
  contributors?: string[];
  dependencies?: any;
  devDependencies?: any;
  description?: string;
  version?: string;
}

export async function getPackageInfosAsync(packageName: string): Promise<IJspmPackageInfo> {
  try {
    return await System.import(`npm:${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

export default function jspmFetcher({label: moduleName}): Promise<IJspmPackageInfo> {
  return System.import(`npm:${moduleName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
}
