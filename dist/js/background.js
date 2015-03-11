chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(request)
    switch (request.method) {
        case 'getView':
            if (request.file) {
                $.ajax({
                    url: chrome.extension.getURL('views/' + request.file + '.html'),
                    dataType: 'html',
                    success: sendResponse
                });
            }
        break;
        case 'getScript':
            if (request.file) {
                $.ajax({
                    url: chrome.extension.getURL('js/' + request.file + '.js'),
                    dataType: 'text',
                    success: sendResponse
                });
            }
        break;
        case 'event':
            console.info('Recieved event', request)
        break;
        default:
            console.error('Invalid method')
        break

    }
})

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {

    console.info("Recieved external message", request)
      chrome.tabs.sendMessage(sender.tab.id, {
        method: 'event',
        title: request.title,
        args: request.args
      }, function(response) {
        console.log("Response:", response);
      });
  });

var main = chrome.extension.getURL('js/vendor/spotify.js')
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return { redirectUrl: main };
    },
    {
        urls: [
            "https://play.spotify.edgekey.net/apps/player/*/main.js"
        ],
        types: ["script"]
    },
    ["blocking"]
);

/*
var nowPlaying = chrome.extension.getURL('js/vendor/now_playing.js')
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return { redirectUrl: nowPlaying };
    },
    {
        urls: [
            "https://play.spotify.edgekey.net/apps/now-playing-recs/ * /kindling.js"
        ],
        types: ["script"]
    },
    ["blocking"]
);
*/