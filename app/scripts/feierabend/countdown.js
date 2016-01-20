define(['scripts/feierabend/audio.js',
		'vendor/jquery/jquery-2.1.4.min.js',		
		'vendor/pixijs/pixi.min',

], function(playAudio){

	var timer = null;

	return function countDown(time, totoltime, game, elapsedCb){
        var createCountDown = {

        	destroy: function(){
        		clearInterval(timer);
        	},

        	start: function(){
        		
					timer = setInterval(function(){

							var i = (time/totoltime)*100; // 0-1

							$("#processbar .finish").css("width", (100-i) + "%");

							if(i >= 0 && i <= 40){//green
								$("#processbar .finish").css({"background-color":"#8ac320",
									"box-shadow":"inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #79aa1e , 0 7px 0 #628c14"});
							}

							if(i > 40){//orange
								$("#processbar .finish").css({"background-color": "#ff9800",
									"box-shadow":"inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #f49100 , 0 7px 0 #e78a00"});
							}

							if(i > 80){//red
								$("#processbar .finish").css({"background-color":"#fb2c00",
									"box-shadow":"inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #f22a00 , 0 7px 0 #e12801"});
							}							
                            
							if(!game.isGamePaused()){
								time = time + 1 ;
								if( i > 80 ){
									playAudio("countDownBeep");
								} 								                                                
							}

							if (time == totoltime+1) {
								clearInterval(timer);
								elapsedCb();
							}

						}, 1000);
					
				}
        };	
        return Object.create(createCountDown);
	};		
	
});
