   chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: ["http://vr.dcinside.com/vr/*"]},
        ["blocking"]);
		