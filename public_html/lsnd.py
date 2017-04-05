#/usr/lib/python2.7
from os.path import isdir, exists
from os import makedirs,mkdir, getcwd, system
dr = ""
def chkdir(dirloc):
	ex = False
	if (isdir(dirloc)):
		ex = True
	return  ex

def ctd(varn):
	dl = '/var/www/html/' + varn
	return chkdir(dl)

def gprj():
	wd = getcwd()
	dc = False
	fn = wd.split('/')
	fn.reverse()
	dr = fn[0]
	if (ctd(fn[0])):
		system('cp -a ./* /var/www/html/'+fn[0])
		system('cp -a ./* /media/timothy/7cba55aa-cfe1-4a1e-b1ee-c43e32e1b07e/home/timothy/NetBeansProjects/Crumbits/public_html/')
	else:
		mkdir('/var/www/html/'+fn[0])
		system('cp -a ./* /var/www/html/'+fn[0])
	return 'Copied' 

print str(ctd(dr))
print gprj()