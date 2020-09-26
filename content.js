var reloadAndKillJS = function() {
    document.documentElement.innerHTML = 'Reloading Page...';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', window.location.href, true);

    xhr.onerror = function() {
        document.documentElement.innerHTML = 'Error getting Page';
    }

    xhr.onload = function() {
        var page = document.implementation.createHTMLDocument("");
        page.documentElement.innerHTML = this.responseText;

        var newPage = document.importNode(page.documentElement, true);

        if(conf.removeScript)
            $('script',newPage).remove();
        var scriptURL=conf.injectScript;
        var i=0,len=scriptURL.length;
        var scriptLoader=function(){
            if(i<len){
                var script=document.createElement('script');
                script.src=conf.injectScript[i];
                script.onload=scriptLoader;
                document.body.appendChild(script);
                ++i;
            }
        }
        document.documentElement.innerHTML=newPage.innerHTML;
        delete page;
        if(conf.addScript)
            scriptLoader();

        // Do your thing here
    }

    xhr.send();
}

!function(){
    var wheCapture=false;
    for(var i=0,len=conf.match.length;i<len;++i){
        if(window.location.href.match(conf.match[i])){
            wheCapture=true;
            break;
        }
    }
    if(wheCapture) {
        window.stop();
        reloadAndKillJS();
    }
}();
