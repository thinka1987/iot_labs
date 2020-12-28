const express = require('express');
const http = require('http');
const Hs100Api =  require('/home/pi/hs100-api/node_modules/hs100-api');
var cors = require('cors');
const app = express();
app.use(cors());

const client = new Hs100Api.Client();
const lightplug = client.getPlug({host: '192.168.230.203'});

const hostname = 'localhost';
const port = 3002;
var powerState=true ;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Sesnor data');
  console.log('Request resevec !')
  lightplug.g
  lightplug.setPowerState(powerState);
  powerState=!powerState;

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});