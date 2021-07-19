(function () {
  var companyId = 'LZSJR7';

  if (window.klaviyoModulesObject) {
    console.warn('Cannot load klaviyo.js multiple times for the same site. Skipping account "' + companyId + '". Active account is "' + window.klaviyoModulesObject.companyId + '"');
    return;
  };

  window._learnq = window._learnq || [];
  window.__klKey = window.__klKey || companyId;
  window._learnq.push(['account', companyId]);

  Object.defineProperty(window, 'klaviyoModulesObject', {
    value: { companyId: companyId, loadTime: new Date() },
    enumerable: false,
  });

  var loadedAssets = {};
  function addScript(asset) {
    if (loadedAssets[asset]) return;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = asset;
    document.head.appendChild(s);
    loadedAssets[asset] = true;
  }
  function addCSS(asset) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = asset;
    document.head.appendChild(link);
  }

  var manifest = {'static': {'js': ['https://static.klaviyo.com/onsite/js/fender_analytics.8378dd2d5f92ce34c051.js', 'https://static.klaviyo.com/onsite/js/sharedUtils.ff79bf923e79d7911102.js', 'https://static.klaviyo.com/onsite/js/static.c59bf6413a33deb9c1a3.js']}};
  for (var key in manifest) {
    if (manifest.hasOwnProperty(key)) {
      var onsiteModule = manifest[key];
      for (var i = 0; i < onsiteModule.js.length; i += 1) {
        addScript(onsiteModule.js[i]);
      }
      if (onsiteModule.css) {
        addCSS(onsiteModule.css);
      }
    }
  }
})();
