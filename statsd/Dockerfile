FROM ubuntu:12.04
MAINTAINER Xabier Larrakoetxea <slok69@gmail.com>

# Update the system
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y

# Install dependencies
RUN apt-get -y install nodejs git

# Install statsd
RUN git clone https://github.com/etsy/statsd.git /var/lib/statsd

# Set up config files
ADD ./statsd_config.js /var/lib/statsd/config.js

# Entry port (UDP) 8125
EXPOSE 8125/udp
# Admin port 8126
EXPOSE 8126

CMD ["/usr/bin/node", "/var/lib/statsd/stats.js", "/var/lib/statsd/config.js"]