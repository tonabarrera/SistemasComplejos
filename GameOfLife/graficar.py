import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import style

fig = plt.figure('Historial de unos')
fig.suptitle("Historial de unos")
grafica = fig.add_subplot(1, 1, 1)

def animacion(i):
	info = open("historico_unos.txt", "r").read()
	lineas = info.split("\n")
	xs = []
	ys = []
	for linea in lineas:
		if len(linea) > 1:
			y,x = linea.split(",")
			xs.append(int(x))
			ys.append(int(y))
	print(ys)
	grafica.clear()
	grafica.set_xlabel('Generacion')
	grafica.set_ylabel('Cantidad de unos')
	grafica.plot(xs, ys)

ani=animation.FuncAnimation(fig, animacion, interval=1000)

plt.show()