function convertURIToImageData(URI, rect) {
  return new Promise(function(resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        image = new Image();
        image.addEventListener('load', function() {
              canvas.width = image.width;
              canvas.height = image.height;
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
              console.log({
                x:rect.left,
                y:rect.top,
                w:rect.right-rect.left,
                h:rect.bottom-rect.top
              })
              resolve(context.getImageData(rect.left, rect.top, rect.right-rect.left, rect.bottom-rect.top));
        }, false);
        image.src = URI;
  });
}

function extractArticle(tabId, dataUrl, rect){
  convertURIToImageData(dataUrl, rect).then(function(imageData) {        
        var data = new Array()
        for(x in imageData.data){
          data[x]=imageData.data[x]
        }
        chrome.tabs.sendMessage(tabId, { 
          action: "saveImage", 
          tabId: tabId,
          imageData:data, 
          width:imageData.width, 
          height:imageData.height
        });
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    let match = tab.url.match(/https:\/\/twitter.com\/(#!\/)?(\w*)\/status\/(\d*)/i);  
    if( match ){     
      chrome.tabs.sendMessage(tabId, {action: "findArticle", tabId:tabId}, function(response) {
        var rect = response.rect;
        console.log(rect)
        chrome.tabs.captureVisibleTab(null,{format:"png"}, function(dataUrl){
          extractArticle(tabId, dataUrl, rect);
        });        
      });  
    } 
  });
});
