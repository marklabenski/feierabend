define([//'scripts/feierabend/audio.js',
		'vendor/jquery/jquery-2.1.4.min.js',
	], function(){

	var createCountDown = function countDown(time, totoltime){
        return {
        	start: function(){
        		$(document).ready(function(){


		 	// var time = 0;
			// var totoltime = 15;

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
				
					time = time + 0.1 ;
						

				if (time == totoltime) {
					clearInterval(timer);
					var winText = new PIXI.Text("Game Over", {font: "20px Arial", fill: "red"});

				}

			}, 100);
		})
        	}
        };
		

	};
    
    return createCountDown;


	





});
