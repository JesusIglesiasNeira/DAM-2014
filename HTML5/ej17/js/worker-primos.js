this.addEventListener('message', function(e) {
    var num = parseInt(e.data.num);
    var primo = true;
    if (num && num == 1){
        postMessage(num);
    }
    else if(num && num == 2){
        postMessage(1);
        postMessage(2);
    }
    else{
        postMessage(1);
        for (var n=2; n<=num; n++){
            primo = true;
            for (var i=2; i<n; i++){
                if ((n%i)== 0){
                    primo = false;
                }
            }
            if (primo){postMessage(n);}
        }
    }

}, false);