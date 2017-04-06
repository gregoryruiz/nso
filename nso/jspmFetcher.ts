//

import _ from 'lodash';

const PACKAGE_FILE_NAME = 'package.json';

export default function jspmFetcher({label: moduleName}) {
  return System.import(`npm:${moduleName.toLowerCase()}/${PACKAGE_FILE_NAME}!`);
}


