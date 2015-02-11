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