/**
 * Created by chuxiaojiang on 10.12.15.
 */

define(['scripts/feierabend/audio.js'], 

	function () {

	$(document).ready(function(){

		var time = 0;
		var totoltime = 15;

		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src','beep.mp3');


		var timer = setInterval(function(){
			var i = (time/totoltime)*100; // 0-1
			$("#processbar .finish").css("width", (100-i) + "%");

			if(i>40){

				$("#processbar .finish").css({"background-color": "#ff9800", 
					"box-shadow":"inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #f49100 , 0 7px 0 #e78a00"});
				
			}

			if(i>80){
				$("#processbar .finish").css({"background-color":"#fb2c00", 
					"box-shadow":"inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #f22a00 , 0 7px 0 #e12801"});
			}
			

			// if ( ){
				
			// 	audioElement.load;
			// 	audioElement.play();
			// }


			time = time + 0.1 ;		

			if (time == totoltime) {
				clearInterval(timer);					
			}

		}, 100);
	})


		
		
	var tTime = 15;
	var countD = setInterval(function(){

		tTime = tTime -1;

		var countdown = document.getElementById('span');
		countdown.innerHTML = tTime;
				
		if(tTime == 0){
			alert("Game Over");
			clearInterval(countD);
		}

	}, 1000); 

};