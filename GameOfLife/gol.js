var c=document.getElementById("myCanvas");
var longitud=630;
var tam=50;
var escala=longitud/tam;
var ctx=c.getContext("2d");
for (var i = 0; i < tam; i++) {
	for(var j=0;j<tam;j++){
		ctx.rect(200+(j*(escala)),0+(i*(escala)),escala,escala);
		ctx.stroke();
	}
	console.log("Ya hice: "+i);
}