import java.util.concurrent.ThreadLocalRandom;
import java.io.PrintWriter;
import java.util.Arrays;
public class Gol{
	int regla1, regla2, regla3, regla4;
	int tam;
	int proba;
	int numero_vivos;
	int numero_muertos;
	int generacion=0;
	short array[][];
	short array2[][];
	static PrintWriter pw;
	public Gol(){
		regla1=2; regla2=3; regla3=3; regla4=3;
		tam=1000;
		proba=50;
		numero_vivos=0;
		numero_muertos=0;
		generacion=0;
		array=new short[tam][tam];
		array2=new short[tam][tam];
	}
	public void rellenarArray(){
		for(int i=0;i<tam;i++){
			for(int j=0;j<tam;j++){
				int random=ThreadLocalRandom.current().nextInt(0, 2);
				array[i][j]=(short)random;
				if(random==1){
					numero_vivos++;
				}else{
					numero_muertos++;
				}
			}
		}
	}
	public void copiarArrays(){
		for(int i=0;i<tam;i++){
			for(int j=0;j<tam;j++){
				int random=ThreadLocalRandom.current().nextInt(0, 2);
				array2[i][j]=array[i][j];
			}
		}
	}
	public void evaluar(int i, int j){
		//Comparo con array2 y modifico en array
		short estado=array2[i][j];
		short vecindad[]=new short[8];
		short cantidad_vivos=0;
		short cantidad_muertos=0;
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
		for(int k=0;k<8;k++){
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
			}
		}else{
			if ((cantidad_vivos >= regla3) && (cantidad_vivos <= regla4)){
				array[i][j]=1;
				numero_vivos++;
				numero_muertos--;
			}
		}
	}
	public static void main(String[] args){
		Gol gol=new Gol();
		gol.rellenarArray();
		try{
			pw=new PrintWriter("historico_java.txt","UTF-8");
		}catch(Exception e){}
		pw.println(gol.numero_vivos+","+gol.generacion);
		pw.flush();
		while(true){
			gol.copiarArrays();
			System.out.println(""+gol.generacion);
			gol.generacion++;
			for(int i=0;i<gol.tam;i++){
				for(int j=0;j<gol.tam;j++){
					gol.evaluar(i,j);
				}
			}
			pw.println(gol.numero_vivos+","+gol.generacion);
			pw.flush();
		}
	}
}