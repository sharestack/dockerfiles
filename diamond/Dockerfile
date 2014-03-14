FROM ubuntu:12.04
MAINTAINER Xabier Larrakoetxea <slok69@gmail.com>

# Update the system
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list


RUN apt-get update && apt-get install -y \
    python2.7 \
    python2.7-dev \
    python-pip \
    build-essential \
    git

RUN pip install configobj psutil statsd boto pysnmp
RUN pip install git+https://github.com/BrightcoveOS/Diamond.git

RUN mkdir /var/log/diamond
ADD ./diamond-conf /etc/diamond

CMD ["/usr/local/bin/diamond", "-f"]