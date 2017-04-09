//

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
  let response: Response;

  try {
    response = await fetch(`https://unpkg.com/${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}`);
  } catch (error) {
    console.log("Error: ", error.message);
  }

  return response.json();
}

export default function jspmFetcher({label: moduleName}): Promise<IJspmPackageInfo> {
  return System.import(`npm:${moduleName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
}
