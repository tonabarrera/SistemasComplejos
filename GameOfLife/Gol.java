import java.util.concurrent.ThreadLocalRandom;
import java.io.PrintWriter;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JButton;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import java.awt.event.ActionEvent;
import java.awt.event.WindowEvent;
import java.awt.Color;
// import javax.swing.BorderFactory;
// import javax.swing.border.Border;
public class Gol{
	int regla1, regla2, regla3, regla4;
	int tam;
	int proba;
	int numero_vivos;
	int numero_muertos;
	int generacion=0;
	short array[][];
	short array2[][];
	JLabel label_generacion;
	JFrame frame;
	JLabel botones[][];
	int tam_frame;
	static PrintWriter pw;
	public Gol(){
		regla1=2; regla2=3; regla3=3; regla4=3;
		tam=200;
		proba=50;
		numero_vivos=0;
		numero_muertos=0;
		generacion=0;
		array=new short[tam][tam];
		array2=new short[tam][tam];
		frame=new JFrame("Juego de la vida");
		tam_frame=1200;
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setBounds(0, 0, tam_frame, 650);
		label_generacion=new JLabel("Generación: "+generacion);
		label_generacion.setBounds(20, 0, 150, 30);
		frame.add(label_generacion);
		botones=new JLabel[tam][tam];
	}
	public void rellenarArray(){
		for(int i=0;i<tam;i++){
			for(int j=0;j<tam;j++){
				botones[i][j]=new JLabel("");
				botones[i][j].setBounds(150+(j*(650/tam)),20+(i*(650/tam)),650/tam,650/tam);
				// botones[i][j].setBounds(100+(j*(650/tam)), 20+(i*(650/tam)), 100+(650/tam)+(j*(650/tam)), 20+(650/tam)+(i*(650/tam)));
				int random=ThreadLocalRandom.current().nextInt(0, 2);
				array[i][j]=(short)random;
				if(random==1){
					numero_vivos++;
					botones[i][j].setBackground(Color.green);
					botones[i][j].setOpaque(true);
				}else{
					numero_muertos++;
					botones[i][j].setBackground(Color.red);
					botones[i][j].setOpaque(true);
				}
				frame.add(botones[i][j]);
			}
		}
		JLabel label=new JLabel("");
		label.setBounds(0,0,0,0);
		frame.add(label);
		frame.pack();
		frame.setVisible(true);
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
		boolean continuar=false;
		while(true){
			if(continuar){
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
			}else{

			}
			
		}
	}
}