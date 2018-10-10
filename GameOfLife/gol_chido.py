from tkinter import *
from numpy import random, where, matrix, zeros, copy
from time import sleep
from sys import argv
from tkinter.colorchooser import *

reglas=[2,3,3,3]
tam=int(argv[2])

master = Tk()
master.title("Game of Life")

numero_vivos=0
numero_muertos=0
generacion=0

color_vivo="#000fff000"
color_muerto="#ff0000"

continuar=False

canvas = Canvas(master, width=1280, height=800, scrollregion=(0,0,1500,1200))
label_vivos=Label(master, font='Helvetica 10')
label_muertos=Label(master, font='Helvetica 10')
label_generacion=Label(master, font='Helvetica 10')
input_reglas=Entry(master)
input_reglas.insert(8,"2,3,3,3")

# hbar=Scrollbar(master,orient=VERTICAL)
# hbar.pack(side=RIGHT,fill=Y)
# hbar.config(command=canvas.yview)

def pausa():
	global continuar
	continuar=not continuar
	if continuar:
		boton_pausa.configure(text="Pausar")
	else:
		boton_pausa.configure(text="Continuar")

def actualizarLabels():
	label_vivos.configure(text="Número de vivos: "+str(numero_vivos))
	label_muertos.configure(text="Número de muertos: "+str(numero_muertos))
	label_generacion.configure(text="Generación: "+str(generacion))

def cambiar(event):
	print("Me estas presionando: ")
	obj=event.widget.find_closest(event.x, event.y)
	x,y=where(array == obj)
	tag=valores[x[0]][y[0]]
	global numero_vivos
	global numero_muertos
	if tag==1:#Si esta vivo entonces lo matamos
		canvas.itemconfig(obj, fill=color_muerto)
		valores[x[0]][y[0]]=0
		print("Aumentaron muertos")
		numero_vivos-=1
		numero_muertos+=1
		actualizarLabels()
	else:#Si esta muerto entonces vive
		canvas.itemconfig(obj, fill=color_vivo)
		valores[x[0]][y[0]]=1
		print("Aumentaron vivos")
		numero_vivos+=1
		numero_muertos-=1
		actualizarLabels()

def cambiar_color_vivo():
	color=askcolor()
	global color_vivo
	color_vivo=color[1]
	label_color_vivos.configure(bg=color_vivo)
	actualizarColor()
def cambiar_color_muerto():
	color=askcolor()
	global color_muerto
	color_muerto=color[1]
	label_color_muertos.configure(bg=color_muerto)
	actualizarColor()
def actualizarColor():
	for i in range(tam):
		for j in range(tam):
			if valores[i][j]==1:
				canvas.itemconfigure(array[i][j], fill=color_vivo)
			else:
				canvas.itemconfigure(array[i][j], fill=color_muerto)


def evaluar(i,j):
	global numero_vivos
	global numero_muertos
	global valores
	vecindad=[]
	estado=valores2[i][j]
	if i==0:
		vecindad.append(valores2[tam-1][j])#superior
		vecindad.append(valores2[i+1][j])#inferior
		if j==0:
			vecindad.append(valores2[tam-1][tam-1])#superior izquierdo
			vecindad.append(valores2[tam-1][j+1])#superior derecho
			vecindad.append(valores2[i][tam-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[i+1][tam-1])#inferior izquierdo
			vecindad.append(valores2[i+1][j+1])#inferior derecho
		elif j==tam-1:
			vecindad.append(valores2[tam-1][j-1])#superior izquierdo
			vecindad.append(valores2[tam-1][0])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][0])#derecho
			vecindad.append(valores2[i+1][j-1])#inferior izquierdo
			vecindad.append(valores2[i+1][0])#inferior derecho
		else:
			vecindad.append(valores2[tam-1][j-1])#superior izquierdo
			vecindad.append(valores2[tam-1][j+1])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[i+1][j-1])#inferior izquierdo
			vecindad.append(valores2[i+1][j+1])#inferior derecho
	elif i==tam-1:
		vecindad.append(valores2[i-1][j])#superior
		vecindad.append(valores2[0][j])#inferior
		if j==0:
			vecindad.append(valores2[i-1][tam-1])#superior izquierdo
			vecindad.append(valores2[i-1][j+1])#superior derecho
			vecindad.append(valores2[i][tam-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[0][tam-1])#inferior izquierdo
			vecindad.append(valores2[0][j+1])#inferior derecho
		elif j==tam-1:
			vecindad.append(valores2[i-1][j-1])#superior izquierdo
			vecindad.append(valores2[i-1][0])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][0])#derecho
			vecindad.append(valores2[0][j-1])#inferior izquierdo
			vecindad.append(valores2[0][0])#inferior derecho
		else:
			vecindad.append(valores2[i-1][j-1])#superior izquierdo
			vecindad.append(valores2[i-1][j+1])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[0][j-1])#inferior izquierdo
			vecindad.append(valores2[0][j+1])#inferior derecho
	else:
		vecindad.append(valores2[i-1][j])#superior
		vecindad.append(valores2[i+1][j])#inferior
		if j==0:
			vecindad.append(valores2[i-1][tam-1])#superior izquierdo
			vecindad.append(valores2[i-1][j+1])#superior derecho
			vecindad.append(valores2[i][tam-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[i+1][tam-1])#inferior izquierdo
			vecindad.append(valores2[i+1][j+1])#inferior derecho
		elif j==tam-1:
			vecindad.append(valores2[i-1][j-1])#superior izquierdo
			vecindad.append(valores2[i-1][0])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][0])#derecho
			vecindad.append(valores2[i+1][j-1])#inferior izquierdo
			vecindad.append(valores2[i+1][0])#inferior derecho
		else:
			vecindad.append(valores2[i-1][j-1])#superior izquierdo
			vecindad.append(valores2[i-1][j+1])#superior derecho
			vecindad.append(valores2[i][j-1])#izquierdo
			vecindad.append(valores2[i][j+1])#derecho
			vecindad.append(valores2[i+1][j-1])#inferior izquierdo
			vecindad.append(valores2[i+1][j+1])#inferior derecho
	cantidad_vivos=vecindad.count(1)
	cantidad_muertos=vecindad.count(0)
	# print("Soy:"+str(i)+str(j))
	# print("Vivos vecindad: "+str(cantidad_vivos))
	# print("Muertos vecindad: "+str(cantidad_muertos))
	if estado==1:#Esta vivo
		# print("Esta vivo")
		if cantidad_vivos not in range(reglas[0],reglas[1]+1):
			canvas.itemconfigure(array[i][j], fill=color_muerto)
			valores[i][j]=0
			numero_vivos-=1
			numero_muertos+=1
	else:#Esta muerto
		# print("Esta muerto")
		if cantidad_vivos in range(reglas[2],reglas[3]+1):#Revive
			# print("Revive")
			canvas.itemconfigure(array[i][j], fill=color_vivo)
			valores[i][j]=1
			numero_vivos+=1
			numero_muertos-=1

# array_python=[[0] * tam for i in range(tam)]
array=zeros(shape=(tam, tam), dtype=int)
# valores=[[0] * tam for i in range(tam)]
valores=random.choice([0,1], size=(tam,tam), p=[1-int(argv[1])/100,int(argv[1])/100])

valores2=copy(valores)

for i in range(tam):
	for j in range(tam):
		array[i][j]=canvas.create_rectangle(200+(j*(650/tam)), 50+(i*(650/tam)), 200+(650/tam)+(j*(650/tam)), 50+(650/tam)+(i*(650/tam)))
		if valores[i][j]==1:
			canvas.itemconfigure(array[i][j], fill=color_vivo, width=0)#Verde
			numero_vivos+=1
		else:
			canvas.itemconfigure(array[i][j], fill=color_muerto, width=0)#Rojo
			numero_muertos+=1
		canvas.tag_bind(array[i][j], '<Button-1>', cambiar)

label_vivos.configure(text="Número de vivos: "+str(numero_vivos))
label_vivos.place(x=20, y=40)
label_muertos.configure(text="Número de muertos: "+str(numero_muertos))
label_muertos.place(x=20, y=60)
label_generacion.configure(text="Generación: "+str(generacion))
label_generacion.place(x=20, y=80)
input_reglas.configure(width=10)
input_reglas.place(x=20,y=120)

boton_pausa=Button(master,text="Empezar",command=pausa)
boton_pausa.place(x=30, y=200)

boton_color_vivo=Button(master,text="Color vivo",command=cambiar_color_vivo)
boton_color_muerto=Button(master,text="Color muerto",command=cambiar_color_muerto)
label_color_vivos=Label(master,width=2,bg=color_vivo)
label_color_muertos=Label(master,width=2,bg=color_muerto)
boton_color_vivo.place(x=20,y=400)
label_color_vivos.place(x=150,y=400)
boton_color_muerto.place(x=20,y=430)
label_color_muertos.place(x=150,y=435)

info = open("historico_unos.txt", "w")
info.write(str(numero_vivos)+","+str(generacion)+"\n")
info.flush()

# canvas.config(xscrollcommand=hbar.set)
# canvas.pack(side=LEFT,expand=True,fill=BOTH)
canvas.pack()
# master.mainloop()
por_modificar=list()

while True:
	master.update_idletasks()
	master.update()
	# sleep(.1)
	if continuar:
		reglas = list(map(int, input_reglas.get().split(",")))
		generacion+=1
		for i in range(tam):
			for j in range(tam):
				evaluar(i,j)
		actualizarLabels()
		info.write(str(numero_vivos)+","+str(generacion)+"\n")
		info.flush()
		valores2=copy(valores)
	else:
		pass
