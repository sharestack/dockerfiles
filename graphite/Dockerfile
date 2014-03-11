FROM ubuntu:12.04
MAINTAINER Xabier Larrakoetxea <slok69@gmail.com>

# Update the system
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update

# Install dependencies

RUN apt-get update && apt-get install -y \
    python \
    python-dev \
    python-pip \
    memcached \
    libcairo2-dev \
    build-essential \
    sqlite3 \
    python-cairo \
    nginx-full \
    supervisor 

# Install graphite
RUN pip install \
    python-memcached \
    django-tagging \
    txamqp \
    https://github.com/graphite-project/ceres/tarball/master \
    whisper \
    carbon \
    graphite-web \
    uwsgi


# Config files
ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD ./uwsgi.ini /opt/graphite/webapp/uwsgi.ini 
ADD ./wsgi.py /opt/graphite/webapp/graphite/wsgi.py

RUN mv /opt/graphite/conf/carbon.conf.example /opt/graphite/conf/carbon.conf
RUN mv /opt/graphite/conf/storage-schemas.conf.example /opt/graphite/conf/storage-schemas.conf

# Carbon
EXPOSE 2003
EXPOSE 2004
EXPOSE 7002

# Nginx
EXPOSE 80

CMD ["supervisord"]