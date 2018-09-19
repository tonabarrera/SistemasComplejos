from tkinter import *
from numpy import random
from time import sleep
# import matplotlib.pyplot as plt

master = Tk()
master.title("Game of Life")

numero_vivos=0
numero_muertos=0
generacion=0

continuar=True

canvas = Canvas(master, width=1280, height=800, scrollregion=(0,0,1500,1200))
label_vivos=Label(master, font='Helvetica 10')
label_muertos=Label(master, font='Helvetica 10')

# hbar=Scrollbar(master,orient=VERTICAL)
# hbar.pack(side=RIGHT,fill=Y)
# hbar.config(command=canvas.yview)

def pausa():
	print("Cambie valor")
	global continuar
	continuar=not continuar
	if continuar:
		boton_pausa.configure(text="Pausar")
	else:
		boton_pausa.configure(text="Continuar")

def actualizarLabels():
	label_vivos.configure(text="Número de vivos: "+str(numero_vivos))
	label_muertos.configure(text="Número de muertos: "+str(numero_muertos))

def cambiar(event):
	print("Me estas presionando")
	obj=event.widget.find_closest(event.x, event.y)
	tag=int(canvas.gettags(obj)[0])
	global numero_vivos
	global numero_muertos
	print(tag)
	if tag==1:#Si esta vivo entonces lo matamos
		canvas.itemconfig(obj, fill="#ff0000",tags='0')
		print("Aumentaron muertos")
		numero_vivos-=1
		numero_muertos+=1
		actualizarLabels()
	else:#Si esta muerto entonces vive
		canvas.itemconfig(obj, fill="#000fff000",tags='1')
		print("Aumentaron vivos")
		numero_vivos+=1
		numero_muertos-=1
		actualizarLabels()

array=[[0] * 1000 for i in range(1000)]
valores=[[0] * 1000 for i in range(1000)]

for i in range(3):
	for j in range(3):
		valores[i][j]=random.choice([0,1], 1, p=[.5,.5])[0]
		array[i][j]=canvas.create_rectangle(200+(j*65), 50+(i*65), 200+65+(j*65), 50+65+(i*65))
		if valores[i][j]==1:
			canvas.itemconfigure(array[i][j], fill='#000fff000', width=0, tags=str(valores[i][j]))#Verde
			numero_vivos+=1
		else:
			canvas.itemconfigure(array[i][j], fill='#ff0000', width=0, tags=str(valores[i][j]))#Rojo
			numero_muertos+=1
		canvas.tag_bind(array[i][j], '<Button-1>', cambiar)
		# array[i][j].bind('<Button-1>', cambiar)


label_vivos.configure(text="Número de vivos: "+str(numero_vivos))
label_vivos.place(x=20, y=40)
label_muertos.configure(text="Número de muertos: "+str(numero_muertos))
label_muertos.place(x=20, y=60)
boton_pausa=Button(master,text="Pausar",command=pausa)
boton_pausa.place(x=30, y=100)

info = open("historico_unos.txt", "w")

info.write(str(numero_vivos)+","+str(generacion)+"\n")
info.flush()


# canvas.config(xscrollcommand=hbar.set)
# canvas.pack(side=LEFT,expand=True,fill=BOTH)
canvas.pack()
# master.mainloop()

while True:
	master.update_idletasks()
	master.update()
	# sleep(4)
	if continuar:

		print("Estoy corriendo")
	else:
		print("Estoy en pausa")




