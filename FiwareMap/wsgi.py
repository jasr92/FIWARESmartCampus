"""
WSGI config for FiwareMap project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

#NEW ----
import sys
import os

#NEW ---- path a donde esta el manage.py de nuestro proyecto Django
sys.path.append('/var/www/html/Pruebas_Alojamiento/Mapa/')

#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'FiwareMap.settings')
#NEW ---- referencia (en python) desde el path anterior al fichero settings.py
#os.environ['DJANGO_SETTINGS_MODULE']='settings'
os.environ['DJANGO_SETTINGS_MODULE'] = "FiwareMap.settings"

#prevenimos UnicodeEncodeError
os.environ.setdefault("LANG", "en_US.UTF-8")
os.environ.setdefault("LC_ALL", "en_US.UTF-8")

#NEW ---- activamos nuestro virtualenv
activate_this = '/var/www/html/Pruebas_Alojamiento/Mapa/venv/bin/activate_this.py'
#execfile(activate_this, dict(__file__=activate_this))
exec(open(activate_this).read(), dict(__file__=activate_this))


from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()