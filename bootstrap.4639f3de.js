webpackJsonp([1],{103:function(n,e,t){"use strict";t.d(e,"c",function(){return r}),t.d(e,"a",function(){return i}),t.d(e,"e",function(){return a}),t.d(e,"d",function(){return s}),t.d(e,"b",function(){return c});var o={BLACK:"#000",GRAY_DARK:"#999",GRAY:"#666",GRAY_LIGHT:"#ccc",WHITE:"#fff"},r={background:o.BLACK,border:o.GRAY_DARK},i={background:"rgb(50,50,200)",border:"rgba(50,50,200,.8)"},a={background:"hsl(0, 65%, 50%)",border:"hsl(0, 65%, 25%)"},s={background:o.GRAY,border:o.GRAY_DARK},c={background:"rgb(50,200, 50)",border:"rgba(50,200,50,.8)"}},104:function(n,e,t){"use strict";var o=t(161);t.d(e,"b",function(){return o.a});var r=t(160);t.d(e,"a",function(){return r.a})},150:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t(69),r=(t.n(o),t(426)),i=(t.n(r),t(158));t.i(o.bootstrap)(document,[i.a],{strictDi:!0})},154:function(n,e,t){"use strict";var o=t(155);t.d(e,"a",function(){return o.a})},155:function(n,e,t){"use strict";function o(n){return r(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://unpkg.com/"+n.toLowerCase()+"/"+i);case 3:return e.abrupt("return",e.sent.json());case 6:e.prev=6,e.t0=e.catch(0),console.error("fetchPackageInfosAsync",e.t0);case 9:case"end":return e.stop()}},e,this,[[0,6]])}))}e.a=o;var r=this&&this.__awaiter||function(n,e,t,o){return new(t||(t=Promise))(function(r,i){function a(n){try{c(o.next(n))}catch(n){i(n)}}function s(n){try{c(o.throw(n))}catch(n){i(n)}}function c(n){n.done?r(n.value):new t(function(e){e(n.value)}).then(a,s)}c((o=o.apply(n,e||[])).next())})},i="package.json"},156:function(n,e,t){"use strict";var o=t(157);t.d(e,"a",function(){return o.a});var r=t(103);t.d(e,"b",function(){return r.a}),t.d(e,"c",function(){return r.b}),t.d(e,"d",function(){return r.c}),t.d(e,"e",function(){return r.d})},157:function(n,e,t){"use strict";function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var r=t(148);t.n(r);t.d(e,"a",function(){return i});var i=function n(){o(this,n),this.nodes=new r.DataSet,this.edges=new r.DataSet}},158:function(n,e,t){"use strict";function o(){"ngInject";this.searchTerm=""}function r(n,e){"ngInject";console.log("RootController");var o=e.get("$state"),r=e.get("SearchService"),i=[{layout:{hierarchical:{enabled:!1}}},{layout:{hierarchical:{direction:"UD"}}},{layout:{hierarchical:{direction:"RL"}}},{layout:{hierarchical:{direction:"DU"}}},{layout:{hierarchical:{direction:"LR"}}}];this.SearchService=r,this._layoutIndex=0,this.networkOptions=i[this._layoutIndex],this.toggleLayout=function(){this._layoutIndex=i.indexOf(this.networkOptions)+1,this._layoutIndex>=i.length&&(this._layoutIndex=0),this.networkOptions=i[this._layoutIndex]},n.$watch("rootCtrl.SearchService.searchTerm",function(n,e){t.i(l.a)(n)||t.i(u.a)(n,e)||(console.log("watch",n,e),o.go("root.search",{moduleName:n}))})}function i(n,e){"ngInject";console.log("resolveModuleName"),n.get("SearchService").searchTerm=e.moduleName}function a(n){"ngInject";var e=n.get("$stateProvider"),o=n.get("$urlRouterProvider");t.i(d.a)(m,function(n,t){return e.state(t,n)}),o.otherwise(m.root.url),o.otherwise("/search/express"),o.deferIntercept()}function s(n){"ngInject";var e=n.get("$rootScope"),t=n.get("$state"),o=n.get("$urlRouter");e.$on("$locationChangeSuccess",function(n,e,r){n.preventDefault(),console.log("$locationChangeSuccess",t.current,e,r),t.is(m["root.search"])||o.sync()}),o.listen()}function c(n){"ngInject";n.get("$rootScope").$state=n.get("$state")}var u=t(143),l=t(142),d=t(418),h=t(69),f=(t.n(h),t(152)),p=(t.n(f),t(349)),g=t.n(p),A=t(159),b=t(427),v=(t.n(b),t(428));t.n(v);c.$inject=["$injector"],s.$inject=["$injector"],a.$inject=["$injector"],i.$inject=["$injector","$stateParams"],r.$inject=["$scope","$injector"];var m={root:{controller:"RootController",controllerAs:"rootCtrl",template:g.a,url:"/"},"root.search":{resolve:{resolveModuleName:i},url:"search/:moduleName"}};e.a=t.i(h.module)("nso",[A.a,"ui.router"]).controller("RootController",r).config(a).service("SearchService",o).run(c).run(s).name},159:function(n,e,t){"use strict";function o(){"ngInject";function n(n,e,o){var a=new s.a(e[0]);o.$observe("moduleName",function(n,o){t.i(i.a)(n)||t.i(r.a)(n,o)||(console.log("new moduleName",n),a=new s.a(e[0]),a.drawDependenciesFrom(n))}),o.$observe("nodeScale",function(n,e){t.i(i.a)(n)||t.i(r.a)(n,e)}),n.$watch(o.networkOptions,function(n,e){t.i(i.a)(n)||t.i(r.a)(n,e)||(console.log("networkOptions",a.network,n),a.setNetworkOptions(n))}),n.$on("$destroy",a.destroy)}return{link:n,restrict:"E"}}var r=t(143),i=t(142),a=t(69),s=(t.n(a),t(104));e.a=t.i(a.module)("npm-graph",[]).directive("nsoGraph",o).name},160:function(n,e,t){"use strict";function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var r=t(148),i=(t.n(r),t(154)),a=t(156),s=t(104);t.d(e,"a",function(){return l});var c=function(){function n(n,e){var t=[],o=!0,r=!1,i=void 0;try{for(var a,s=n[Symbol.iterator]();!(o=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);o=!0);}catch(n){r=!0,i=n}finally{try{!o&&s.return&&s.return()}finally{if(r)throw i}}return t}return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return n(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),l=function(){function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new a.a,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s.b;o(this,n),this.labelStore=t,this.data=c,this.networkOptions=u,this.getScale=function(n){return n._dependencyCount+n._dependentCount},this.onNetworkStabilized=function(n){console.log("stabilized"),i.network.fit()},this.network=new r.Network(e,this.data,this.networkOptions),this.network.on("stabilized",this.onNetworkStabilized)}return u(n,[{key:"setNetworkOptions",value:function(n){this.network.setOptions(Object.assign(this.networkOptions,n))}},{key:"drawDependenciesFrom",value:function(n){var e=arguments,t=this,o={_dependencyCount:0,_dependentCount:0,_depth:0,color:a.b,id:0,label:n,mass:1};this.data.nodes.add(o),this.dependencyFetching(o).then(function(){var n;(n=console).log.apply(n,["Alllllllllllllllllllll doooooooooooooooone !"].concat(Array.prototype.slice.call(e))),t.network.fit()})}},{key:"destroy",value:function(){this.clear(),this.data=null,this.network.destroy(),this.network=null}},{key:"dependencyFetching",value:function(n){var e=this,o=n._depth+1;return Promise.resolve(n).then(function(n){return t.i(i.a)(n.label)}).then(function(n){if(!e.data)throw new Error("Cancel Everything Dude ! STOP !");return n}).then(function(t){return e._describeNewData(t.dependencies).then(function(t){var r=t.nodes,i=t.edges;return r=r.map(function(n){return n._depth=o,n._dependentCount=0,n._dependencyCount=0,n.color=a.b,n}),e.data.nodes.add(r),e.data.edges.add(i.map(function(t){var o=e.data.nodes.get(t.to);n._dependencyCount++,o._dependentCount++;var r=e.getScale(n);n.mass=1+r,n.value=r;var i=e.getScale(o);return o.mass=1+i,o.value=i,e.data.nodes.update(n),e.data.nodes.update(o),t.from=n.id,t})),r})}).then(function(n){return Promise.all(n.map(function(n){var t=n.id;return e.dependencyFetching(e.data.nodes.get(t))}))}).then(function(){e.data.nodes.update({color:0===n.id?a.c:a.d,id:n.id})}).catch(function(t){return console.warn("fetching fail\n",t),e.data.nodes.update({color:a.e,id:n.id}),{}})}},{key:"_describeNewData",value:function(n){var e=this;return Promise.resolve().then(function(){return Object.entries(n).reduce(function(n,t){var o=c(t,1),r=o[0],i=e.labelStore.indexOf(r);return i<0&&(i=e.labelStore.push(r),n.nodes.push({id:i,label:r})),n.edges.push({arrows:"to",to:i}),n},{edges:[],nodes:[]})})}},{key:"clear",value:function(){this.labelStore=[],this.data.nodes.clear(),this.data.edges.clear()}}]),n}()},161:function(n,e,t){"use strict";var o=t(103);t.d(e,"a",function(){return r});var r={edges:{arrows:{from:{enabled:!1,scaleFactor:0},to:{enabled:!0,scaleFactor:.5}},color:{inherit:"from"},smooth:{enabled:!0,forceDirection:"none",roundness:1,type:"continuous"},width:1.1},interaction:{hideEdgesOnDrag:!0,tooltipDelay:200},nodes:{color:Object.assign({},o.c,{highlight:o.e}),font:{color:o.c.background,face:"Roboto"},scaling:{customScalingFunction:function(n,e,t,o){return o/e},max:50,min:10},shape:"dot",size:10},physics:{barnesHut:{springLength:10},solver:"barnesHut"}}},346:function(n,exports,e){exports=n.exports=e(96)(!0),exports.push([n.i,"body,html{margin:0;padding:0;font-family:Arial,sans-serif;height:100%}body{touch-action:none;-ms-touch-action:none;overflow:hidden;background-color:#f5f5f5}.wf-active,.wf-active input{font-family:Roboto,Arial,sans-serif}","",{version:3,sources:["/home/travis/build/gregoryruiz/nso/src/base.scss"],names:[],mappings:"AAAA,UACE,SACA,UACA,6BACA,WAAY,CACb,KAGC,kBACA,sBACA,gBACA,wBAAiC,CAClC,4BAIG,mCAAuC,CACxC",file:"base.scss",sourcesContent:["html, body {\n  margin: 0;\n  padding: 0;\n  font-family: Arial,sans-serif;\n  height: 100%;\n}\n\nbody {\n  touch-action: none;\n  -ms-touch-action: none;\n  overflow: hidden;\n  background-color: hsl(0, 0%, 96%);\n}\n\n.wf-active {\n  &, input{\n    font-family: 'Roboto', Arial,sans-serif;;\n  }\n}"],sourceRoot:""}])},347:function(n,exports,e){exports=n.exports=e(96)(!0),exports.push([n.i,".nso-app{position:absolute;top:0;right:0;bottom:0;left:0}","",{version:3,sources:["/home/travis/build/gregoryruiz/nso/src/nso/nso-app.scss"],names:[],mappings:"AAAA,SACE,kBACA,MACA,QACA,SACA,MAAO,CACR",file:"nso-app.scss",sourcesContent:[".nso-app {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}"],sourceRoot:""}])},348:function(n,exports,e){exports=n.exports=e(96)(!0),exports.push([n.i,".omnibox{position:absolute;top:0;left:0;z-index:10;margin:1rem}.searchbox{background-color:#fff;border-radius:0 0 2px 2px;box-shadow:0 2px 4px rgba(0,0,0,.2);box-sizing:border-box;-moz-box-sizing:border-box;height:42px;outline:none;max-width:90%;min-width:300px;vertical-align:top}.searchbox input{display:block;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-appearance:none;-webkit-rtl-ordering:logical;-webkit-user-select:text;user-select:text;border:none;padding:0 10px;outline:none;font-size:15px;line-height:20px;font-weight:300}","",{version:3,sources:["/home/travis/build/gregoryruiz/nso/src/nso/omnibox.scss"],names:[],mappings:"AAAA,SACE,kBACA,MACA,OACA,WACA,WAAY,CACb,WAGC,sBACA,0BACA,oCACA,sBACA,2BACA,YACA,aACA,cACA,gBACA,kBAAmB,CAVrB,iBAaI,cAEA,kBACA,OACA,MACA,WACA,YAEA,wBACA,6BACA,yBACA,iBAEA,YACA,eACA,aACA,eACA,iBACA,eAAgB,CACjB",file:"omnibox.scss",sourcesContent:[".omnibox {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  margin: 1rem;\n}\n\n.searchbox{\n  background-color: #fff;\n  border-radius: 0 0 2px 2px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n  box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  height: 42px;\n  outline: none;\n  max-width: 90%;\n  min-width: 300px;\n  vertical-align: top;\n  \n  input {\n    display: block;\n\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n\n    -webkit-appearance: none;\n    -webkit-rtl-ordering: logical;\n    -webkit-user-select: text;\n    user-select: text;\n\n    border: none;\n    padding: 0px 10px;\n    outline: none;\n    font-size: 15px;\n    line-height: 20px;\n    font-weight: 300;\n  }\n}"],sourceRoot:""}])},349:function(n,exports){n.exports="<div class=nso-app> <div class=omnibox> <div class=searchbox> <input type=search ng-model=rootCtrl.SearchService.searchTerm ng-model-options=\"{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }\"> </div> </div> <nso-graph module-name=\"{{ rootCtrl.SearchService.searchTerm }}\" node-scale=\"{{ rootCtrl.scale }}\" network-options=rootCtrl.networkOptions> </nso-graph> <div class=app-bottom-content-anchor hidden> <ul> <li> <button ng-click=rootCtrl.toggleLayout()>Toggle layout</button> </li> </ul> </div> </div>"},426:function(n,exports,e){var t=e(346);"string"==typeof t&&(t=[[n.i,t,""]]);e(102)(t,{});t.locals&&(n.exports=t.locals)},427:function(n,exports,e){var t=e(347);"string"==typeof t&&(t=[[n.i,t,""]]);e(102)(t,{});t.locals&&(n.exports=t.locals)},428:function(n,exports,e){var t=e(348);"string"==typeof t&&(t=[[n.i,t,""]]);e(102)(t,{});t.locals&&(n.exports=t.locals)},429:function(n,exports,e){e(151),n.exports=e(150)}},[429]);