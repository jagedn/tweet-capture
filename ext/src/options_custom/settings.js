window.addEvent("domready", function () {    
    new FancySettings.initWithManifest(function (settings) {        
        if( typeof Storage.get_option("store.settings.tofile")  === 'undefined' ){
            Storage.set_option("store.settings.tofile",false)
            settings.manifest.tofile.element.checked = false
        }
        if( typeof Storage.get_option("store.settings.totweet")  === 'undefined' ){
            Storage.set_option("store.settings.totweet",true)
            settings.manifest.totweet.element.checked = true
        }
    });
});
