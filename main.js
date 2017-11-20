let changeBreakorSession = document.querySelectorAll('.changeCounter');
let breakLength = Number(document.querySelector('#breakLength span').innerText);
let sessionLength = Number(document.querySelector('#sessionLength span').innerText);
let isRendering = false;
var lengthInMilliSec;
let timerRunning = false;

function changeLength(){
	if (isRendering === false){
		if (this.className.split(' ')[1] === "break"){
			this.value === "-" ? (breakLength !== 1 ? breakLength -= 1 : null) : breakLength += 1;
			document.querySelector('#breakLength span').innerText = breakLength;
		}
		else if (this.className.split(' ')[1] === "session"){
			this.value === "-" ? (sessionLength !== 1 ? sessionLength -= 1 : null) : sessionLength += 1;
			
				document.querySelector('#sessionLength span').innerText = sessionLength;
			if (timerRunning === false){
				document.querySelector('#timer p').innerText = `${sessionLength}:00`;
			}
		}
	}
}
changeBreakorSession.forEach(function(e1){
	e1.addEventListener("click",changeLength);
});

var x = function(length,type){
	var newTime = new Date().getTime() + length;	
	var y = setInterval(function(){
	
		isRendering = true;
		timerRunning = true;
		var distance = newTime - new Date().getTime();
		var mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		mins < 0 ? mins = 0 : null;
		var seconds = Math.ceil((distance % (1000 * 60)) / 1000);
		document.querySelector("#timer p").innerHTML = `${mins}:${seconds}`;

		var pauseBtn = document.querySelectorAll('#buttonControls button')[1];
		pauseBtn.addEventListener("click",function(){
			
			isRendering = false;
			timerRunning = true;
			clearInterval(y);
		});

		//Play Alarm tone if timer reaches 0
		if (Math.floor(distance/1000) < 0){
			document.querySelector('audio').play();
			clearInterval(y);
			//Run break timer if session timer finishes
			if (type === "session"){
				x(breakLength * 60000,"break");
				document.querySelector("#timer h3").innerHTML = "Break!";
			}else{
				//Run new session timer again (if break gets over)
				x(sessionLength * 60000,"session");
				document.querySelector("#timer h3").innerHTML = "Session";
			}
		}
	},1000);
}

var startBtn = document.querySelector('#buttonControls button');
startBtn.addEventListener("click",function(){
	//Calculating starting timer length in milliseconds
	lengthInMilliSec = (Number((document.querySelector('#timer p').innerHTML).split(':')[0]) * 60000) + (Number((document.querySelector('#timer p').innerHTML).split(':')[1]) * 1000);
	x(lengthInMilliSec,"session");
});

//Reset Button reloads page
var resetBtn = document.querySelectorAll('#buttonControls button')[2];
resetBtn.addEventListener("click",function(){
	location.reload();
});