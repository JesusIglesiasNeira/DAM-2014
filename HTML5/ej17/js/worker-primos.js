this.addEventListener('message', function(e) {
    var num = parseInt(e.data.num);

    //rec(num);

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
                if ((n%i)=== 0){
                    primo = false;
                }
            }
            if (primo){postMessage(n);}
        }
    }

}, false);

//Modo función recursiva nº debe ser menor de 20000
/*var nums =[];
    var rec = function(num){
        if (num>3){
            rec(num-1);
            var esprimo=true;
            for (var i=0; i<=nums.length-1; i++){
                if (num%nums[i]===0){
                    esprimo=false;
                }
            }
            nums.push(num);
            if (esprimo){
                postMessage(num);
            }
        }
        else if (num===3){
            postMessage(1);
            postMessage(2);
            postMessage(3);
            nums.push(2);
            nums.push(3);
        }else if (num===2){
            postMessage(1);
            postMessage(2);
        }else if (num===1){
            postMessage(1);
        }
    };*/

