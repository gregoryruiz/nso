import _ from "lodash";

const PACKAGE_FILE_NAME = "package.json";

export interface JspmPackageInfo {
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

export async function getPackageInfosAsync(packageName: string): Promise<JspmPackageInfo> {
  try {
    return await System.import(`npm:${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
  } catch (error) {
    console.log("Error: ", error.message);
  }
  // System
  //   .import(`npm:${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}!`)
  //   .then((res) => {
  //     return JSON.parse(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return null;
  //   });
}

export default function jspmFetcher({label: moduleName}): Promise<JspmPackageInfo> {
  return System.import(`npm:${moduleName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
}
