
var util = require('util'),
    exec = require('child_process').exec,
    child;

var c1 = 0;
var c2 = 0;
var num = 0;
getCams();


var connect = require('../node/node_modules/connect');
var app = connect();

app
  .use(connect.static(__dirname +'/ui'))
  .use(connect.bodyParser())
  .use(function(req, res) {
    res.end();
    parseAction(req.body.action);
    
})
.listen(8080);


function parseAction(arg){
  console.log(arg); 
	if(arg == "modeshoot"){
		shootMode(c1, 1);	
//		shootMode(c2, todo[1]);	
	}

	if(arg == "modeview"){
		shootMode(c1, 0);	
//		shootMode(c2, todo[1]);	
	}
	
	if(arg == "shoot"){
		shoot(c1);
//		shoot(c2);
		num++;
	}

  if(arg == "focus"){
    focus(c1);
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
	arg = "ptpcam --dev=" + cam + " --chdk='mode " + mode + "'";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
	console.log(c1);
	console.log(c2);
}


function focus(cam){
	console.log("Focusing...");
	// turn on camera mode
	arg = "ptpcam --dev=" + cam + " --chdk=\"luar loadfile('A/CHDK/SCRIPTS/jonfocus.lua')()\"";	
	
  go = exec(arg,  function (error, stdout, stderr) {
			console.log(stdout);
	});
}

function shoot(cam){
	console.log("shooting...");
	//arg = "ptpcam --dev=" + cam + " --chdk=luar loadfile('A/CHDK/SCRIPTS/scan.lua')()";	
	//arg = "ptpcam --dev=" + cam + " --chdk=lua shoot(0)";	
	//arg = "./shootSave.sh " + cam + " " + num;	
	arg = "./start.sh " + cam + " " + num;	
  bang = exec(arg,  function (error, stdout, stderr) {
		console.log(stdout);
//	getPath(cam, 0);					

	});
}
