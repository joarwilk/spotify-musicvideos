chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.method) {
        case 'getView':
            if (request.file) {
                $.ajax({
                    url: chrome.extension.getURL('views/' + file + '.html'),
                    dataType: 'html',
                    success: sendResponse
                });
            }
        break;
        case 'getScript':
            if (request.file) {
                $.ajax({
                    url: chrome.extension.getURL('js/' + file + '.js'),
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