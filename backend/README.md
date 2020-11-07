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
