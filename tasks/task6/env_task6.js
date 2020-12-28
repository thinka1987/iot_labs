
var mysql = require('mysql');
var moment= require('moment');
var Thingy = require('/home/pi/Nordic-Thingy52-Nodejs/index');
const Hs100Api =  require('/home/pi/hs100-api/node_modules/hs100-api');
var enabled;
const PiCamera = require('pi-camera');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

console.log('Reading Thingy environment sensors!');
const client = new Hs100Api.Client();
const lightplug = client.getPlug({host: '192.168.230.203'});
lightplug.g
lightplug.setPowerState(false);
var powerState=false ;



function onTemperatureData(temperature) {
             if (temperature >= 24){
                lightplug.g
                lightplug.setPowerState(true);
                if(powerState == false){
                const myCamera = new PiCamera({
                    mode: 'video',
                    output: `${ __dirname }/video.h264`,
                    width: 450,
                    height: 300,
                    timeout: 10000, // Record for 5 seconds
                    nopreview: temperature,
                  });
                   
                  myCamera.record()
                    .then((result) => {
                      // Your video was captured
                      
                  var inFilename = "video.h264";
                  var outFilename = "/var/www/html/video.mp4";
                  
                  ffmpeg(inFilename)
                    .outputOptions("-c:v", "copy") // this will copy the data instead or reencode it
                    .save(outFilename);
                    console.log("Video has been recorded .....");
                    })
                    .catch((error) => {
                       console.log(error);
                    });
                    powerState=true;
             }
            }
             else{
                powerState=false;
                lightplug.g
                lightplug.setPowerState(false);

             }
    console.log('Temperature sensor: ' + temperature);
}


function onButtonChange(state) {
    if (state == 'Pressed') {
        if (enabled) {
            enabled = false;
            this.temperature_disable(function(error) {
                console.log('Temperature sensor stopped! ' + ((error) ? error : ''));
            });
            
        }
        else {
            enabled = true;
            this.temperature_enable(function(error) {
                console.log('Temperature sensor started! ' + ((error) ? error : ''));
            });
          
        }
    }
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error ? error : '');

    thingy.on('temperatureNotif', onTemperatureData);
   

   thingy.temperature_interval_set(1000, function(error) {
        if (error) {
            console.log('Temperature sensor configure! ' + error);
        }
    });


    enabled = true;

    thingy.temperature_enable(function(error) {
        console.log('Temperature sensor started! ' + ((error) ? error : ''));
    });

  });
}

Thingy.discover(onDiscover);
