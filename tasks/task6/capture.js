const PiCamera = require('pi-camera');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const myCamera = new PiCamera({
  mode: 'video',
  output: `${ __dirname }/video.h264`,
  width: 450,
  height: 300,
  timeout: 20000, // Record for 5 seconds
  nopreview: false,
});
 
myCamera.record()
  .then((result) => {
    // Your video was captured
    
var inFilename = "video.h264";
var outFilename = "video.mp4";

ffmpeg(inFilename)
  .outputOptions("-c:v", "copy") // this will copy the data instead or reencode it
  .save(outFilename);
  console.log("Video has been recorded .....");
  })
  .catch((error) => {
     console.log(error);
  });