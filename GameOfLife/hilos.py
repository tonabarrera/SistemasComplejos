import threading
def worker(contador):
	"""funcion que realiza el trabajo en el thread"""
	print ('Soy un hilo'+str(contador))
	return
threads = list()
for i in range(3):
	t = threading.Thread(target=worker, args=(i,))
	threads.append(t)
	t.start()
print ("Termine")