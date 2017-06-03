//

import "./base.scss";

const webfontScriptEl = document.createElement("script");
webfontScriptEl.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
webfontScriptEl.type = "text/javascript";
webfontScriptEl.async = true;

const fistScriptEl = document.getElementsByTagName("script")[0];
try {
  (fistScriptEl.parentNode as Node).insertBefore(webfontScriptEl, fistScriptEl);
} catch (e) {
  console.error(e);
}
