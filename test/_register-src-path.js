//

const { resolve } = require("path")

const { addPath } = require("app-module-path");

//

// Add the "out-tsc/src" in the npm resolve path
// Following the current "tsconfig.json" it's now possible to
// require from the "src" folder.
addPath(resolve(__dirname, "../out-tsc/src"));

var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function(){
  // console.log('Module#require', ...arguments)
  const [name] = arguments
  if (name === 'angular') {
    originalRequire.apply(this, ['angular/angular'])
    console.log(window.angular)
    global.angular = window.angular;
    return window.angular;
  }
  //do your thing here
  return originalRequire.apply(this, arguments);
};
