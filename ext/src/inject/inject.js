
function findArticle(){
      var article = document.querySelector('[role="article"]:first-child');  
      var rect = article.getBoundingClientRect();
      return {top:Number(rect.top), right:Number(rect.right), bottom: Number(rect.bottom), left: Number(rect.left)};
}

function saveImage(msg){
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");  
      var imageData = new ImageData(Uint8ClampedArray.from(msg.imageData), msg.width, msg.height)
      c.width=msg.width;
      c.height=msg.height;
      ctx.putImageData(imageData,0,0);
      c.toBlob(function(blob){
            let match = document.location.href.match(/https:\/\/twitter.com\/(#!\/)?(\w*)\/status\/(\d*)/i);             
            if( msg.tofile ){
                  saveAs(blob, match[match.length-1]+".png");
            }
            if( msg.totweet){
                  document.querySelector("[href='/compose/tweet'").click()
                  let interval = setInterval(function(){
                        let editor = document.querySelector("[role='textbox']")
                        console.log(editor)
                        if( editor ){
                              clearInterval(interval);
                              editor.blur()                        
                              let data = [new ClipboardItem({ "image/png": blob })];
                              document.querySelector("[class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']").click()
                              navigator.clipboard.write(data).then(function() {
                                    document.execCommand("paste")
                                    if( msg.writemsg ){
                                          navigator.clipboard.writeText(msg.writemsg).then(function(){
                                                document.execCommand("paste")
                                          })
                                    }
                              },function(){                              
                                    console.log("error")
                              });
                        }
                  },100)
            }
      },"image/png");
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
      try{
            switch( msg.action){
                  case 'findArticle':
                        var rect = findArticle();                  
                              sendResponse({rect:rect, tabId:msg.tabId});                  
                  break                  
                  case 'saveImage':
                        saveImage(msg)
            }      
      }catch(e){
            console.log(e)
      }      
});