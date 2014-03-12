Build the image:

    docker build -t slok/statsd .

Run the container exposing the 80 port where nginx is serving the graphite dashboard:

    docker run -name graphite -p 80:80 slok/graphite

This also exposes other ports. For example 2003 where carbon is listening for information
for example to connect there statsD