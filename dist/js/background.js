chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.cmd == "read_file") {
        $.ajax({
            url: chrome.extension.getURL("views/tab.html"),
            dataType: "html",
            success: sendResponse
        });
    }

    if(request.cmd == "read_script") {
        $.ajax({
            url: chrome.extension.getURL("js/youtube.js"),
            dataType: "text",
            success: sendResponse
        });
    }

    console.log(request)
})