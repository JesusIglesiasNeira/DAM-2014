
//---Inicia la ejecucion de la aplicacion tan pronto como el doc sea completamente cargado--------------
function iniciar(){
	//----maximo tamaño de la barra de progreso-------
	maximo= 600;
	//----Referencias a objetos del reproductor--------
	medio= document.getElementById('medio');
	reproducir= document.getElementById('reproducir');
	barra = document.getElementById('barra');
	progreso= document.getElementById('progreso');
	
	//----Eventos para detectar pulsacion en play y avance con la barra-----
	reproducir.addEventListener('click', presionar, false);
	barra.addEventListener('click', mover, false);
}	

function presionar(){
	if(!medio.paused && !medio.ended){
	   medio.pause();
	   reproducir.innerHTML='Reproducir';
	   window.clearInterval(bucle);
	}
	else{
	   medio.play();
	   reproducir.innerHTML='Pausa';
	   bucle= setInterval(estado,1000);
	}
}



function estado(){
//---Función ejecutada cada segundo mientras se reproduce -----
	if (!medio.ended){
	   var total= parseInt(medio.currentTime*maximo/medio.duration);
	   progreso.style.width= total+'px';
	}
	else{
	   progreso.style.width= '0px';
	   reproducir.innerHTML= 'Reproducir';
	   window.clearInterval(bucle);
	}	
}


function mover(e){ 
	//e indica la posicion del raton(indicada por el listener)
	if (!medio.paused && !medio.ended){
	   var ratonX=e.pageX-barra.offsetLeft;
	   var nuevoTiempo= ratonX*medio.duration/maximo;
	   medio.currentTime= nuevoTiempo;
	   progreso.style.width= ratonX+'px';
	}
}

window.addEventListener('load', iniciar, false);