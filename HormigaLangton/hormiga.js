var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var longitud=680;
var tam=100;
var escala=longitud/tam;
var random;
var generacion=0;
var numero_blancos=0;
var numero_negros=0;
var numero_hormigas=0;
var intervalo;
var log;
var array;
var array2;
var x;
var y;
var coordenadas;
var hormigas;
var hormigas2;
var direccion;
var direccion2;
//Direcciones:
//0->norte, 1->este, 2->sur, 3->oeste

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

array=Create2DArray(tam);
array2=Create2DArray(tam);
hormigas=Create2DArray(tam);
hormigas2=Create2DArray(tam);
coordenadas=Create2DArray(tam);
direccion=Create2DArray(tam);
direccion2=Create2DArray(tam);

function evaluar(i,j){
	var estado=array2[i][j];
	if(hormigas2[i][j]==1){
		// console.log(direccion2[i][j]);
		hormigas[i][j]=0;
		//Blanco
		if(estado==1){
			array[i][j]=0;
			ctx.fillStyle="#000000";//Negro
			ctx.fillRect(0+(j*(escala)),0+(i*(escala)),escala,escala);
			ctx.stroke();
			if(direccion2[i][j]==0){
				hormigas[i][j-1]=1;
				direccion[i][j-1]=3;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j-1)*(escala)),0+(i*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==1){
				hormigas[i-1][j]=1;
				direccion[i-1][j]=0;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j)*(escala)),0+((i-1)*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==2){
				hormigas[i][j+1]=1;
				direccion[i][j+1]=1;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j+1)*(escala)),0+((i)*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==3){
				hormigas[i+1][j]=1;
				direccion[i+1][j]=2;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j)*(escala)),0+((i+1)*(escala)),escala,escala);
				ctx.stroke();
			}else{
				console.log("No soy nadie");
			}
		}else{//Negro
			array[i][j]=1;
			ctx.fillStyle="#ffffff";//Blanco
			ctx.fillRect(0+(j*(escala)),0+(i*(escala)),escala,escala);
			ctx.stroke();
			if(direccion2[i][j]==0){
				hormigas[i][j+1]=1;
				direccion[i][j+1]=1;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j+1)*(escala)),0+(i*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==1){
				hormigas[i+1][j]=1;
				direccion[i+1][j]=2;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j)*(escala)),0+((i+1)*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==2){
				hormigas[i][j-1]=1;
				direccion[i][j-1]=3;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j-1)*(escala)),0+((i)*(escala)),escala,escala);
				ctx.stroke();
			}else if(direccion2[i][j]==3){
				hormigas[i-1][j]=1;
				direccion[i-1][j]=0;
				ctx.fillStyle="#ff0000";//Rojo
				ctx.fillRect(0+((j)*(escala)),0+((i-1)*(escala)),escala,escala);
				ctx.stroke();
			}else{
				console.log("No soy nadie");
			}
		}
	}
	
}

function copiar(arr){
	var aux=Create2DArray(tam);
	for(var i=0; i<tam;i++){
		for(var j=0;j<tam;j++){
			aux[i][j]=arr[i][j];
		}
	}
	return aux;
}

function iniciar(){
	for (var i = 0; i < tam; i++) {
		for(var j=0;j<tam;j++){
			// random=Math.floor((Math.random() * 2) + 0);
			array[i][j]=0;
			array2[i][j]=0;
			hormigas[i][j]=0;
			hormigas2[i][j]=0;
			//Color negro
			ctx.fillStyle="#000000";
			numero_negros++;
			// if (random==1) {
			// 	ctx.fillStyle="#66ff66";
			// 	numero_vivos++;
			// }else{
			// 	ctx.fillStyle="#FF0000";
			// 	numero_muertos++;
			// }
			x=0+j*escala;
			y=0+i*escala;
			coordenadas[i][j]=x+","+y+","+(x+escala)+","+(y+escala);
			ctx.fillRect(x,y,escala,escala);
			ctx.stroke();
		}
		// console.log("Ya hice: "+i);
	}
}

iniciar();

console.log(numero_negros+","+generacion);
log=numero_negros+","+generacion+"\n";

function ejecutar(){
	generacion++;
	for(var i=0; i<tam;i++){
		for(var j=0;j<tam;j++){
			evaluar(i,j);
		}
	}
	console.log(numero_negros+","+generacion);
	document.getElementById('generacion').innerHTML ="Generación: "+generacion;
	log+=numero_negros+","+generacion+"\n";
	array2=copiar(array);
	hormigas2=copiar(hormigas);
	direccion2=copiar(direccion);
}

function continuar(){
	intervalo=setInterval(ejecutar, 100);
}

function pausa(){
	clearInterval(intervalo);
}
function siguiente(){
	ejecutar();
}

function obtenerCoordenadas(i,j){
	var texto=coordenadas[i][j];
	return texto.split(",");
}

function clickCanvas(event){
	x=event.offsetX;
	y=event.offsetY;
	// console.log(x + "," +y);
	for(var i=0;i<tam;i++){
		for(var j=0;j<tam;j++){
			var arr=obtenerCoordenadas(i,j);
			if(x >= arr[0] && x <= arr[2] && y >= arr[1] && y <= arr[3]){
				console.log("Soy:"+i+","+j);
				random=Math.floor((Math.random() * 4) + 0);
				// console.log(random);
				hormigas[i][j]=1;
				hormigas2[i][j]=1;
				direccion[i][j]=random;
				direccion2[i][j]=random;
				x=0+j*escala;
				y=0+i*escala;
				ctx.fillStyle="#ff0000";
				ctx.fillRect(x,y,escala,escala);
				ctx.stroke();
				break;
			}
		}
	}
}
