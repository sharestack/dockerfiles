#This is the wsgi target that lives under the webapp subdirectory
import os, sys

os.environ['DJANGO_SETTINGS_MODULE'] = 'graphite.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
