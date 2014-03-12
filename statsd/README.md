We nee to run the container exposing the udp 8115 port where statsd will receive 
the data. But also statsd needs to send data to carbon/graphite. In case graphite 
is in another running container, This conection would be done internally 
(link between 2 containers).

So first we run our graphite image with the name graphite:

    docker run -name graphite -p 80:80 slok/graphite

After this imagine that we use `endpoint` name for the linking, so, out statsd 
running container will create this env vars 
(depends on the other linked image, in this case we have 4 ports exposed):


    ENDPOINT_PORT=tcp://172.17.0.2:80
    ENDPOINT_PORT_80_TCP=tcp://172.17.0.2:80
    ENDPOINT_PORT_80_TCP_ADDR=172.17.0.2
    ENDPOINT_PORT_80_TCP_PORT=80
    ENDPOINT_PORT_80_TCP_PROTO=tcp
    ENDPOINT_PORT_2003_TCP=tcp://172.17.0.2:2003
    ENDPOINT_PORT_2003_TCP_ADDR=172.17.0.2
    ENDPOINT_PORT_2003_TCP_PORT=2003
    ENDPOINT_PORT_2003_TCP_PROTO=tcp
    ENDPOINT_PORT_2004_TCP=tcp://172.17.0.2:2004
    ENDPOINT_PORT_2004_TCP_ADDR=172.17.0.2
    ENDPOINT_PORT_2004_TCP_PORT=2004
    ENDPOINT_PORT_2004_TCP_PROTO=tcp
    ENDPOINT_PORT_7002_TCP=tcp://172.17.0.2:7002
    ENDPOINT_PORT_7002_TCP_ADDR=172.17.0.2
    ENDPOINT_PORT_7002_TCP_PORT=7002
    ENDPOINT_PORT_7002_TCP_PROTO=tcp


So as we know that the port and host are in these env vars...
So in statsd configuration (`statsd_config.js`) for example would be something like this:

    {
      graphitePort: parseInt(process.env.ENDPOINT_PORT_2003_TCP_PORT) || 2003
    , graphiteHost: process.env.ENDPOINT_PORT_2003_TCP_ADDR || "graphite.sharestack.org"
    , port: 8125
    , backends: [ "./backends/graphite" ]
    }

with this configuration we can build and run the container

Build the image:

    docker build -t slok/statsd .

Run the container:

    docker run   -p 8125:8125/udp -link graphite:endpoint slok/statsd