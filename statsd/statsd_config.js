{
  graphitePort: parseInt(process.env.ENDPOINT_PORT_2003_TCP_PORT) || 2003
, graphiteHost: process.env.ENDPOINT_PORT_2003_TCP_ADDR || "graphite.sharestack.org"
, port: 8125
, backends: [ "./backends/graphite" ]
}