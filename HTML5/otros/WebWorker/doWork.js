this.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'start':
            this.postMessage('WORKER STARTED: '+data.msg);
            break;
        case 'stop':
            this.postMessage('WORKER STOPPED: '+data.msg+'. (buttons will no longer work)');
            this.close(); // Terminates the worker.
            break;
        default:
            this.postMessage('Unknown command: '+data.msg);
    };
}, false);


