var c=document.getElementById("myCanvas");
var longitud=680;
var tam=1000;
var escala=longitud/tam;
var ctx=c.getContext("2d");
var random;
for (var i = 0; i < tam; i++) {
	for(var j=0;j<tam;j++){
		random=Math.floor((Math.random() * 2) + 0);
		if (random==1) {
			ctx.fillStyle="#66ff66";
		}else{
			ctx.fillStyle="#FF0000";
		}
		ctx.fillRect(200+(j*(escala)),0+(i*(escala)),escala,escala);
		ctx.stroke();
	}
	// console.log("Ya hice: "+i);
}