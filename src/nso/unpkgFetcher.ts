//

const PACKAGE_FILE_NAME = "package.json";

export interface IPackageInfo {
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

export async function getPackageInfosAsync(packageName: string): Promise<IPackageInfo> {
  let response: Response;

  try {
    response = await fetch(`https://unpkg.com/${packageName.toLowerCase()}/${PACKAGE_FILE_NAME}`);
  } catch (e) {
    console.error("getPackageInfosAsync", e);
  }

  return response.json();
}
