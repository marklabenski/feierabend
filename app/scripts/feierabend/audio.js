define(["vendor/howler/howler.min.js"], function (howler) {
    

  var footstep = new howler.Howl({

        urls:['audio/footstep.mp3'],    
        volume: 1.5,
        loop: false,
  });


  var drinkCoffee = new howler.Howl({

    urls:['audio/drink.mp3'],
    volume:1.5,
    loop: false,
  });


  var workOnNotebook = new howler.Howl({
    urls:['audio/sigh&typing.mp3'],
    volume:1.5,
    loop:false,

  });

  var workOnPaper = new howler.Howl({
    urls:['audio/workOnPaper2.mp3'],
    volume:1.5,
    loop:false,
  });

  var boss = new howler.Howl({
    urls:['audio/boss1.mp3'],
    volume:1.5,
    loop:false,
  });

  var stoss = new howler.Howl({
    urls:['audio/stoss&schrei.mp3'],
    volume:1.5,
    loop:false,
  });

  var workmateM1 = new howler.Howl({
    urls:['audio/workmateM1.mp3'],
      volume: 1.5,
      loop:false,
  });
    
    var workmateM2 = new howler.Howl({
    urls:['audio/workmateM2.mp3'],
      volume: 1.5,
      loop:false,
  });
    
    var workmateM3 = new howler.Howl({
    urls:['audio/workmateM3.mp3'],
      volume: 1.5,
      loop:false,
  });
      
   var workmateW1 = new howler.Howl({
    urls:['audio/workmateW1.mp3'],
      volume: 1.5,
      loop:false,
  });
    
    var workmateW2 = new howler.Howl({
    urls:['audio/workmateW2.mp3'],
      volume: 1.5,
      loop:false,
  }); 
    
    var workmateW3 = new howler.Howl({
    urls:['audio/workmateW3.mp3'],
      volume: 1.5,
      loop:false,
  }); 

  var countDownBeep = new howler.Howl({
    urls:['audio/beepCD.mp3'],
    volume:0.6,
    loop:false,    
  });

  var win = new howler.Howl({
    urls:['audio/win.mp3'],
    volume:0.6,
    loop:false,
  });
    
    

  return function playAudio(audioString) {
    var audios = { footstep: footstep, drinkCoffee: drinkCoffee, boss: boss, stoss:stoss, 
      workOnNotebook:workOnNotebook, workOnPaper:workOnPaper, countDownBeep: countDownBeep, win: win,
      workmateM1: workmateM1, workmateM2: workmateM2, workmateM3: workmateM3, 
      workmateW1: workmateW1, workmateW2: workmateW2, workmateW3: workmateW3};

    if(audios.hasOwnProperty(audioString)) {
      var audioToPlay = audios[audioString];
      audioToPlay.play();
      return audioToPlay;
    }
  };
    


    
    
    
});
