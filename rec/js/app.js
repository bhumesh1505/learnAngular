//code.iamkate.com
function Queue()
{
	var a=[],b=0;
	this.getLength=function()
	{
		return a.length-b
	};
	this.isEmpty=function()
	{return 0==a.length};
	this.enqueue=function(b){a.push(b)};
	this.dequeue=function()
	{
		if(0!=a.length)
		{
			var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c
		}
	};
	this.peek=function()
	{
		return 0<a.length?a[b]:void 0
	}
};
URL = window.URL || window.webkitURL;

var gumStream;            //stream from getUserMedia()
var rec;              //Recorder.js object
var queue = new Queue();
//var myVar2 = setInterval(startRecording, 3000);

  var myVar2 = setInterval(startRecording, 2000);
  var index = 0;
  var count = 2000;

  var myVar3 = setInterval(c, 100);  
  function c(val){
      document.getElementById("countDown").innerHTML = count/100;

      count = count - 100;
  }

  function downloadSkip()
  {
    var x = document.getElementsByClassName("skip");
    /*var p;
    for(p=0;p<x.length;p++)
    {
      x[p].click();
    }*/
    x[0].click();
  }
  
  function downloadStart()
  {

    var x = document.getElementsByClassName("start");
    var p;
    for(p=0;p<x.length;p++)
    {
      x[p].click();
    }
  }

  function downloadCapture()
  {
    var x = document.getElementsByClassName("capture");
    var p;
    for(p=0;p<x.length;p++)
    {
      x[p].click();
    }
  }
  
  function startRecording() {

    var input;              //MediaStreamAudioSourceNode we'll be recording
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record

    var  msg = ['START','SKIP','CAPTURE'];
    index = Math.floor(Math.random() * 10) % 3 ;
    queue.enqueue(index);

    /*var index = i % 3;
    i++;
    if(i > 100000)
    {
      i = 0;
    }*/

    document.getElementById("msg").style.visibility = "visible";
    document.getElementById("countDown").style.visibility = "visible";

    document.getElementById("msg").innerHTML = msg[index];

    var constraints = { audio: true, video:false }

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {   
    /*
      create an audio context after getUserMedia is called
      sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
      the sampleRate defaults to the one set in your OS for your playback device

    */
    audioContext = new AudioContext();

    //update the format 
    document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

    /*  assign to gumStream for later use  */
    gumStream = stream;
    
    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);

    /* 
      Create the Recorder object and configure to record mono sound (1 channel)
      Recording 2 channels  will double the file size
    */
    rec = new Recorder(input,{numChannels:1})

    //start the recording process
    count = 2000;
    rec.record()

  });

  var myVar = setInterval(stopRecording, 2000);
}

function pauseRecording(){
  if (rec.recording){
    //pause
    rec.stop();
    pauseButton.innerHTML="Resume";
  }else{
    //resume
    rec.record()
    pauseButton.innerHTML="Pause";
  }
}

function stopRecording() {

  //var myVar2 = setInterval(startRecording, 1000);
  console.log("stopButton clicked");

  /*//disable the stop button, enable the record too allow for new recordings
  stopButton.disabled = true;
  recordButton.disabled = false;
  pauseButton.disabled = true;

  //reset button just in case the recording is stopped while paused
  pauseButton.innerHTML="Pause";
  */
  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);
  //gumStream = "";
}

function createDownloadLink(blob) {
  
 
  var url = URL.createObjectURL(blob);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');

  var filename = "";
  var i = queue.dequeue();

  if(i == 0)
  {
    filename = "START";
    link.class = "start";
  }
  else if(i == 1)
  {
    filename = "SKIP";
    link.class = "skip";
  }
  else
  {
    filename = "CAPTURE";
    link.class = "capture";
  }
  //name of .wav file to use during upload and download (without extendion)
  filename += new Date().toISOString();

  //add controls to the <audio> element
  au.controls = true;
  au.src = url;

  //save to disk link
  link.href = url;
  link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
  link.innerHTML = "Save to disk";

  //add the new audio element to li
  li.appendChild(au);
  
  //add the filename to the li
  li.appendChild(document.createTextNode(filename+".wav "))

  //add the save to disk link to li
  li.appendChild(link);
  
/*  //upload link
  var upload = document.createElement('a');
  upload.href="#";
  upload.innerHTML = "Upload";
  upload.addEventListener("click", function(event){
      var xhr=new XMLHttpRequest();
      xhr.onload=function(e) {
          if(this.readyState === 4) {
              console.log("Server returned: ",e.target.responseText);
          }
      };
      var fd=new FormData();
      fd.append("audio_data",blob, filename);
      xhr.open("POST","upload.php",true);
      xhr.send(fd);
  })
  li.appendChild(document.createTextNode (" "))//add a space in between
  li.appendChild(upload)//add the upload link to li
*/
  //add the li element to the ol
  recordingsList.appendChild(li);
}

