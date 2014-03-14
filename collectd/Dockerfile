FROM ubuntu:12.04
MAINTAINER Xabier Larrakoetxea <slok69@gmail.com>

# Update the system
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list


# -- Process with compilation ------------------------------------
# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    flex \
    bison \
    automake \
    make \
    build-essential \
    automake \
    libtool \
    pkg-config

RUN apt-get install -y libgcrypt11-dev libgtk2.0-dev


RUN cd /usr/src && git clone git://github.com/collectd/collectd.git
RUN cd /usr/src/collectd && ./build.sh && ./configure --enable-statsd && make all install

ADD ./collectd.conf /opt/collectd/etc/collectd.conf

CMD ["/opt/collectd/sbin/collectd", "-f"]

# -- Process without compilation ------------------------------------
#RUN apt-get update && apt-get install -y collectd
#
#ADD ./collectd.conf /etc/collectd/collectd.conf
#
#CMD ["/usr/sbin/collectd", "-f"]