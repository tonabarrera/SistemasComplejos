import matplotlib.pyplot as plt
import matplotlib.animation as animation
from sys import argv
from matplotlib import style

fig = plt.figure('Historial de unos')
fig.suptitle("Historial de unos")
grafica = fig.add_subplot(1, 1, 1)

def animacion(i):
	info = open(argv[1], "r").read()
	lineas = info.split("\n")
	xs = []
	ys = []
	total=0
	generacion=len(lineas)
	for linea in lineas:
		if len(linea) > 1:
			y,x = linea.split(",")
			xs.append(int(x))
			ys.append(int(y))
			total+=int(y)
	# print(ys)
	grafica.clear()
	promedio=total/generacion
	grafica.set_xlabel("Generación: "+str(generacion-1)+"\nPromedio: "+str(promedio)+"\nDensidad: "+str(promedio/1000000))
	grafica.set_ylabel('Cantidad de unos')
	grafica.plot(xs, ys)

ani=animation.FuncAnimation(fig, animacion, interval=1000)

plt.show()