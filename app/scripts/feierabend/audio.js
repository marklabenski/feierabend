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
    
    

  return function playAudio(audioString) {
    var audios = { footstep: footstep, drinkCoffee: drinkCoffee };
    if(music.hasOwnProperty(audioString)) {

      audioToPlay = audios[audioString];
      audioToPlay.play();
      return audioToPlay;
    }
  };
    


    
    
    
});