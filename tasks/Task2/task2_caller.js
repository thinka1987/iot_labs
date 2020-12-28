const axios = require('axios')
var Thingy = require('/home/pi/Nordic-Thingy52-Nodejs/index');


var led_color = 1;
console.log('Button and LED!');




var powerState=true ;


function onButtonChange(state) {
    console.log('Button: ' + state);

    if (state == 'Pressed')
    {
      
      axios.get('https://maker.ifttt.com/trigger/HS100/with/key/dN0q7tqdbVjeEoOKeDFY6g').then(resp=>{

      console.log(resp.data);
      });

        console.log('Button');
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