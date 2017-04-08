//

const WebFontConfig = {
  google: {
    families: ["Roboto"],
  },
};

const webfontScriptEl = document.createElement("script");
webfontScriptEl.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
webfontScriptEl.type = "text/javascript";
webfontScriptEl.async = true;

const fistScriptEl = document.getElementsByTagName("script")[0];
fistScriptEl.parentNode.insertBefore(webfontScriptEl, fistScriptEl);
