// Requires node.js and connect. 

var util = require('util'),
    exec = require('child_process').exec,
    child;

var zlevel = 0;
var c1 = 0;
var c2 = 0;
var num = 0;
//getCams();

var connect = require('../node/node_modules/connect');
var app = connect();
//var io = require('../node/node_modules/socket.io').listen(app);

app
  .use(connect.static(__dirname +'/ui'))
  .use(connect.bodyParser())
  .use(function(req, res) {
     parseAction(req.body.action, req.body.cam, res);
   // res.end(parseAction(req.body.action));
})
.listen(8080);


function parseAction(arg, cam, res){
  switch (arg) {
    case "modeshoot":
      shootMode(cam, 1);	
      res.end("modeshoot");
      //shootMode(c2, todo[1]);	
    break;

    case "modeview":
      shootMode(cam, 0);	
      res.end("View Mode");
      //shootMode(c2, todo[1]);	
    break;

    case "shoot":
      shoot(cam, res);
      num++;
    break;

    case "focus":
      focus(cam);
      res.end("focus");
    break;

    case "zoomin":
      if(zlevel < 7){ 
        zlevel++;
        zoomin(cam);
        res.end("zoomin");
      }
    break;

    case "zoomout":
      if(zlevel > -1){ 
        zlevel--;
        zoomout(cam);
        res.end("zoomout");
      }
    break;

    case "getcams":
        getCams(res);
    break;

    default:
      res.end("end");
      console.log("other response." + arg); 
    break;
  }
}



//**************** cam code

function getCams(req){
	console.log("Getting cameras...");
  run = "ptpcam -l | grep Canon | cut -d/  -f2 | awk '{print $1}'";
//	run = "lsusb | grep Canon | awk '{print $4}' | cut -d: -f1";
	//run = "";

  var child = exec(run,  function (error, stdout, stderr) {

    //console.log(stdout);
		re = /[0-9]{3}/g;
	  res = stdout.match(re); 

		console.log("regex output:");		
		console.log(res[0]);		
// test for to make sure the cams are connected
		if(!res[1] || !res[0]){
			console.log("cameras not connected");
			return 0;
		}

    c1 = res[0];
    c2 = res[1];

		console.log("Cameras found! : " + c1 + ", " + c2);

    req.end('["' + c1 + '", "' + c2 + '"]');

	});
}

function zoomin(cam){

	var arg = "ptpcam --dev=" + cam + " --chdk='lua set_zoom(" + zlevel + ")'";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
}


function zoomout(cam){

	var arg = "ptpcam --dev=" + cam + " --chdk='lua set_zoom(" + zlevel + ")'";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
}

function shootMode(cam, mode){
	console.log("Shoot mode...");
	// turn on camera mode
	var arg = "ptpcam --dev=" + cam + " --chdk='mode " + mode + "'";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
//	console.log(c1);
//	console.log(c2);
}


function focus(cam){
	console.log("Focusing...");
	// turn on camera mode
	var arg = "ptpcam --dev=" + cam + " --chdk=\"luar loadfile('A/CHDK/SCRIPTS/focus.lua')()\"";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
}

function shoot(cam, res){
	console.log("shooting...");
	var arg = "./start.sh " + cam + " " + num;	
  var bang = exec(arg,  function (error, stdout, stderr) {
    var regex = /IMG[^$]*$/;
    console.log(stdout); 
    var pth = regex.exec(stdout)[0];
    console.log(pth);
    var pnum = num - 1;
    var pathsI = "images/" + pnum + "." + pth;
    res.end(pathsI);

	});
}

