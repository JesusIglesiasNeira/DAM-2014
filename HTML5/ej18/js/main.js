(function(){
    "use strict";
   window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    function onError(e) {
        console.log('Error', e);
    }

    var descargar= function(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'img/imagen.jpeg', true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(e){
            window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
                fs.root.getFile('img/imagen.jpeg', {create: true}, function(fileEntry) {
                    fileEntry.createWriter(function(writer) {
                        writer.onwrite = function(e) { console.log('write');};
                        writer.onerror = function(e) { console.log('error'); };
                        var bb = new BlobBuilder();
                        bb.append(xhr.response);
                        writer.write(bb.getBlob('img/imagen.jpeg'));
                    }, onError);
                }, onError);
            }, onError);
        };

        xhr.send();
    };



        $(document).on('click','#descarga',descargar);
})();
