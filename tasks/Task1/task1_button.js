var Thingy = require('/home/pi/Nordic-Thingy52-Nodejs/index');
const Hs100Api =  require('/home/pi/hs100-api/node_modules/hs100-api');

var led_color = 1;
console.log('Button and LED!');

const client = new Hs100Api.Client();
const lightplug = client.getPlug({host: '192.168.230.203'});


var powerState=true ;


function onButtonChange(state) {
    console.log('Button: ' + state);

    if (state == 'Pressed')
    {
       lightplug.setPowerState(powerState);
       powerState=!powerState;
    }
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error);
    thingy.on('buttonNotif', onButtonChange);
    thingy.button_enable(function(error) {
      console.log('Button enabled! ' + error);
    });
  });
}

Thingy.discover(onDiscover);