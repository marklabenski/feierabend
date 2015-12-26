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

  var officeAtmosphere = new howler.Howl({
    urls:['audio/officeAtmosphere.mp3'],
    volume:1,
    loop:true,

  });




  
    
    

  return function playAudio(audioString) {
    var audios = { footstep: footstep, drinkCoffee: drinkCoffee, boss: boss, stoss:stoss, 
      workOnNotebook:workOnNotebook, workOnPaper:workOnPaper};

    if(audios.hasOwnProperty(audioString)) {

      audioToPlay = audios[audioString];
      audioToPlay.play();
      return audioToPlay;
    }
  };
    


    
    
    
});