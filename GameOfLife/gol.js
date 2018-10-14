var c=document.getElementById("myCanvas");
var longitud=680;
var tam=1000;
var escala=longitud/tam;
var ctx=c.getContext("2d");
var random;
var regla1=2;
var regla2=3;
var regla3=3;
var regla4=3;
var generacion=0;
var numero_vivos=0;
var numero_muertos=0;
var vecindad=new Array(8);
var intervalo;
var log;

//Función para descargar

function descargar(){
	var fileContents = log;
	var fileName = "log.txt";
	var pp = document.createElement('a');
	pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
	pp.setAttribute('download', fileName);
	pp.click();
}

function Create2DArray(rows) {
	var arr = new Array(rows);
	for (var i=0;i<rows;i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}
var array=Create2DArray(tam);
var array2=Create2DArray(tam);

function evaluar(i,j){
	var estado=array2[i][j];
	var cantidad_vivos=0;
	var cantidad_muertos=0;
	if (i==0){
		vecindad[0]=array2[tam-1][j];//superior
		vecindad[1]=array2[i+1][j];//inferior
		if (j==0){
			vecindad[2]=array2[tam-1][tam-1];//superior izquierdo
			vecindad[3]=array2[tam-1][j+1];//superior derecho
			vecindad[4]=array2[i][tam-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[i+1][tam-1];//inferior izquierdo
			vecindad[7]=array2[i+1][j+1];//inferior derecho
		}
		else if (j==tam-1){
			vecindad[2]=array2[tam-1][j-1];//superior izquierdo
			vecindad[3]=array2[tam-1][0];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][0];//derecho
			vecindad[6]=array2[i+1][j-1];//inferior izquierdo
			vecindad[7]=array2[i+1][0];//inferior derecho
		}
		else{
			vecindad[2]=array2[tam-1][j-1];//superior izquierdo
			vecindad[3]=array2[tam-1][j+1];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[i+1][j-1];//inferior izquierdo
			vecindad[7]=array2[i+1][j+1];//inferior derecho
		}
	}
	else if (i==tam-1){
		vecindad[0]=array2[i-1][j];//superior
		vecindad[1]=array2[0][j];//inferior
		if (j==0){
			vecindad[2]=array2[i-1][tam-1];//superior izquierdo
			vecindad[3]=array2[i-1][j+1];//superior derecho
			vecindad[4]=array2[i][tam-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[0][tam-1];//inferior izquierdo
			vecindad[7]=array2[0][j+1];//inferior derecho
		}
		else if (j==tam-1){
			vecindad[2]=array2[i-1][j-1];//superior izquierdo
			vecindad[3]=array2[i-1][0];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][0];//derecho
			vecindad[6]=array2[0][j-1];//inferior izquierdo
			vecindad[7]=array2[0][0];//inferior derecho
		}
		else{
			vecindad[2]=array2[i-1][j-1];//superior izquierdo
			vecindad[3]=array2[i-1][j+1];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[0][j-1];//inferior izquierdo
			vecindad[7]=array2[0][j+1];//inferior derecho
		}
	}
	else{
		vecindad[0]=array2[i-1][j];//superior
		vecindad[1]=array2[i+1][j];//inferior
		if (j==0){
			vecindad[2]=array2[i-1][tam-1];//superior izquierdo
			vecindad[3]=array2[i-1][j+1];//superior derecho
			vecindad[4]=array2[i][tam-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[i+1][tam-1];//inferior izquierdo
			vecindad[7]=array2[i+1][j+1];//inferior derecho
		}
		else if (j==tam-1){
			vecindad[2]=array2[i-1][j-1];//superior izquierdo
			vecindad[3]=array2[i-1][0];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][0];//derecho
			vecindad[6]=array2[i+1][j-1];//inferior izquierdo
			vecindad[7]=array2[i+1][0];//inferior derecho
		}
		else{
			vecindad[2]=array2[i-1][j-1];//superior izquierdo
			vecindad[3]=array2[i-1][j+1];//superior derecho
			vecindad[4]=array2[i][j-1];//izquierdo
			vecindad[5]=array2[i][j+1];//derecho
			vecindad[6]=array2[i+1][j-1];//inferior izquierdo
			vecindad[7]=array2[i+1][j+1];//inferior derecho
		}
	}
	for(var k=0;k<8;k++){
		if(vecindad[k]==1){
			cantidad_vivos++;
		}else{
			cantidad_muertos++;
		}
	}
	if(estado==1){
		if (!((cantidad_vivos >= regla1) && (cantidad_vivos <= regla2))){
			array[i][j]=0;
			numero_vivos--;
			numero_muertos++;
			ctx.fillStyle="#FF0000";
			ctx.fillRect(0+(j*(escala)),0+(i*(escala)),escala,escala);
		}
	}else{
		if ((cantidad_vivos >= regla3) && (cantidad_vivos <= regla4)){
			array[i][j]=1;
			numero_vivos++;
			numero_muertos--;
			ctx.fillStyle="#66ff66";
			ctx.fillRect(0+(j*(escala)),0+(i*(escala)),escala,escala);
		}
	}
	ctx.stroke();
}

function copiar(array){
	var aux=Create2DArray(tam);
	for(var i=0; i<tam;i++){
		for(var j=0;j<tam;j++){
			aux[i][j]=array[i][j];
		}
	}
	return aux;
}

for (var i = 0; i < tam; i++) {
	for(var j=0;j<tam;j++){
		random=Math.floor((Math.random() * 2) + 0);
		array[i][j]=random;
		array2[i][j]=random;
		if (random==1) {
			ctx.fillStyle="#66ff66";
			numero_vivos++;
		}else{
			ctx.fillStyle="#FF0000";
			numero_muertos++;
		}
		ctx.fillRect(0+(j*(escala)),0+(i*(escala)),escala,escala);
		ctx.stroke();
	}
	// console.log("Ya hice: "+i);
}

console.log(numero_vivos+","+generacion);
log=numero_vivos+","+generacion+"\n";

// document.getElementById('link').href = makeTextFile(generacion);

function ejecutar(){
	generacion++;
	for(var i=0; i<tam;i++){
		for(var j=0;j<tam;j++){
			evaluar(i,j);
		}
	}
	console.log(numero_vivos+","+generacion);
	document.getElementById('generacion').innerHTML ="Generación: "+generacion;
	log+=numero_vivos+","+generacion+"\n";
	// document.getElementById('link').href = makeTextFile(generacion);
	array2=copiar(array);
}

function continuar(){
	intervalo=setInterval(ejecutar, 500);
}

function pausa(){
	clearInterval(intervalo);
}
function siguiente(){
	ejecutar();
}
