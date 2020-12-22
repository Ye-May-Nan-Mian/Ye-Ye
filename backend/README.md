## How To Start

May be you need install Django with the help of [this article](https://www.howtoing.com/how-to-build-a-modern-web-application-to-manage-customer-information-with-django-and-react-on-ubuntu-18-04)

Then you can run script `python ./manage.py runserver 127.0.0.1:34215` or double click **start.bat** to run backend. 
## Problems You May Encounter

```
                 'django.contrib.admin',
                 'django.contrib.auth',
                 'django.contrib.contenttypes',
                 'django.contrib.sessions',
                 'django.contrib.messages',
                 'django.contrib.staticfiles',
can not find module of hidden import:
                 'django.contrib.sessions.middleware.SessionMiddleware',
                 'django.contrib.auth.middleware.AuthenticationMiddleware',
                 'django.contrib.messages.middleware.MessageMiddleware',
                 'django.db.backends.__pycache__.base',
                 'pkg_resources.py2_warn',
                 'pkg_resources.markers',
                 'PyQt5.sip',
                 'sqlalchemy.sql.functions.func',
                 'skimage.feature._orb_descriptor_positions',
                 'django.db.backends.oracle.compiler',
```

package it:

```
pyinstaller manage.spec
```
