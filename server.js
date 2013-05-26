// Requires node.js and connect. 

var util = require('util'),
    exec = require('child_process').exec,
    child;

var c1 = 0;
var c2 = 0;
var num = 0;
getCams();

var connect = require('../node/node_modules/connect');
var app = connect();
//var io = require('../node/node_modules/socket.io').listen(app);

app
  .use(connect.static(__dirname +'/ui'))
  .use(connect.bodyParser())
  .use(function(req, res) {
   parseAction(req.body.action, res);
   // res.end(parseAction(req.body.action));
})
.listen(8080);


//io.sockets.on('connection', function (socket) {
//  socket.emit('news', { hello: 'world' });
//  socket.on('my other event', function (data) {
//    console.log(data);
//  });
//});

function parseAction(arg, res){
  switch (arg) {
    case "modeshoot":
      shootMode(c1, 1);	
      res.end("modeshoot");
      //shootMode(c2, todo[1]);	
    break;

    case "modeview":
      shootMode(c1, 0);	
      res.end("View Mode");
      //shootMode(c2, todo[1]);	
    break;

    case "shoot":
      shoot(c1, res);
      //shoot(c2);
      num++;
    break;

    case "focus":
      focus(c1);
      res.end("focus");
    break;

    default:
      res.end("end");
      console.log("other response." + arg); 
    break;
  }
}



//**************** cam code

function getCams(){
	console.log("Getting cameras...");
	//run = "ptpcam -l | grep Canon | cut -d/  -f2 | awk '{print $1}'";
	run = "lsusb | grep Canon | awk '{print $4}' | cut -d: -f1";
	//run = "";

  child = exec(run,  function (error, stdout, stderr) {


	//	re = /...\/(...)\s/g;


		re = /[0-9]{3}/g;
		//res = re.find(stdout);
		res = re.exec(stdout);
		console.log(stdout);

		console.log("parsed...");
		console.log(res[0]);

		c1 = res[0];
			
	//	res = stdout.match(re[0]); 
		
		
	//	console.log("regex output:");		
	//	console.log(res[0]);		
		// test for to make sure the cams are connected
//		if(!res[1] || !res[0]){
//			console.log("cameras not connected");
//			return 0;
//		}

//	ex = /\/(...)/;
//		c1 = ex.exec(res[0])[1];
//		c2 = ex.exec(res[1])[1];
//	c1 = res[1];
			c2 = 'werp';

		console.log("Cameras found! : " + c1 + ", " + c2);


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
    
    var pth = regex.exec(stdout)[0];
    console.log(pth);
    var pnum = num - 1;
    var pathsI = "images/" + pnum + "." + pth;
    res.end(pathsI);

	});
}

