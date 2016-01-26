define(["vendor/howler/howler.min.js"], function (howler) {
  var bgMusic = new howler.Howl({
    urls: ['audio/background-music.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.4,
    onend: function () {
      //console.log('Finished!');
    }
  });
    
  var bgMusicFast = new howler.Howl({
    urls: ['audio/background-music-fast.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5,
    onend: function () {
      //console.log('Finished!');
    }
  });
    
  var bgMusicSlow = new howler.Howl({
    urls: ['audio/background-music-slow.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5,
    onend: function () {
      //console.log('Finished!');
    }
  });
    
    
  var currentMusic = null;
  return function playMusic(musicString) {
    var music = { backgroundMusic: bgMusic, backgroundMusicFast: bgMusicFast };
    if(music.hasOwnProperty(musicString)) {
        if(currentMusic !== null)
        {
            currentMusic.stop();
        }
        
      var musicToPlay = music[musicString];
      musicToPlay.play();
      currentMusic = musicToPlay;
      return musicToPlay;
    }
  };
});
