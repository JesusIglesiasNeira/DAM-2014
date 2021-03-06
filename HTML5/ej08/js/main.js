﻿$(document).ready(function(){
    "use strict";


        var canvas = document.getElementById("canvas1");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect (10, 10, 55, 50);
            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect (30, 30, 550, 50);
        }

        canvas = document.getElementById("canvas2");
        if (canvas.getContext) {
            var ctx2 = canvas.getContext("2d");
            ctx2.strokeRect(50,50,50,50);
            ctx2.fillRect(25,25,100,100);
            ctx2.clearRect(45,45,60,60);
        }
        canvas = document.getElementById("canvas3");
        if (canvas.getContext) {
            var ctx3 = canvas.getContext("2d");
            ctx3.beginPath();
            ctx3.moveTo(25,25); // Punto inicial para dibujar
            ctx3.lineTo(105,25);
            ctx3.lineTo(25,105);
            ctx3.closePath();
            ctx3.stroke();
        }

        canvas = document.getElementById("canvas4");
        if (canvas.getContext) {
            var ctx4 = canvas.getContext("2d");

            for(var i=0;i<4;i++){
                for(var j=0;j<3;j++){
                    ctx4.beginPath();
                    var x              = 25+j*50;       // coordenada x
                    var y              = 25+i*50;       // coordenada y
                    var radius         = 20;            // radio del arco
                    var startAngle     = 0;             // punto inicial del círculo
                    var endAngle       = Math.PI+(Math.PI*j)/2; // punto final
                    var anticlockwise  = i%2==0 ? false : true;
                    ctx4.arc(x,y,radius,startAngle,endAngle, anticlockwise);
                    if (i>1) ctx4.fill();
                    else ctx4.stroke();
                }
            }
        }

        canvas = document.getElementById("canvas5");
            if (canvas.getContext) {
                var ctx5 = canvas.getContext("2d");

                for (var k=0;k<6;k++){
                    for (var l=0;l<6;l++){
                        ctx5.fillStyle = 'rgb(' + Math.floor(255-42.5*k) + ',' + Math.floor(255-42.5*l) + ',0)';
                            ctx5.fillRect(l*25,k*25,25,25);
                    }
                }
            }

        canvas = document.getElementById("canvas6");
            if (canvas.getContext) {
                var ctx6 = canvas.getContext("2d");
                var gradient = ctx6.createLinearGradient(0, 0, 0, canvas.height);
                gradient = ctx6.createRadialGradient(canvas.width/2,
                                        canvas.height/2,
                                        0,
                                        canvas.width/2,
                                        canvas.height/2,
                                        150);
                    gradient.addColorStop(0, '#fff');
                    gradient.addColorStop(1, '#000');
                    ctx6.fillStyle = gradient;
                    ctx6.fillRect(0, 0, canvas.width, canvas.height);
            }


        canvas = document.getElementById("canvas7");
        if (canvas.getContext) {
            var ctx7 = canvas.getContext("2d");

            ctx7.globalAlpha = 0.2;
            // Dibujar círculos semitransparentes
            for (var m=0;m<7;m++){
                ctx7.beginPath();
                ctx7.arc(75,75,10+10*m,0,Math.PI*2,true);
                ctx7.fill();
            }
            ctx7.translate(100, 20);

            var radians = 45 * Math.PI / 180;
            ctx7.rotate(radians);
            for (var n=0;n<7;n++){
                ctx7.beginPath();
                ctx7.arc(75,75,10+10*n,0,Math.PI*2,true);
                ctx7.fill();
            }

        }

});
