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
        default:
            console.error('Invalid method')
        break

    }

    console.log(request)
})

console.log(chrome)
var host = chrome.extension.getURL('js/vendor/spotify.js')
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log (details)
        return {redirectUrl: host};
    },
    {
        urls: [
            "https://play.spotify.edgekey.net/apps/player/*/main.js"
        ],
        types: ["script"]
    },
    ["blocking"]
);