define(["vendor/howler/howler.min.js"], function (howler) {
  var bgMusic = new howler.Howl({
    urls: ['scripts/feierabend/Snake2.wav'],
    autoplay: false,
    loop: true,
    volume: 0.5,
    onend: function () {
      //console.log('Finished!');
    }
  });

  return function playMusic(musicString) {
    var music = { backgroundMusic: bgMusic };
    if(music.hasOwnProperty(musicString)) {

      musicToPlay = music[musicString];
      musicToPlay.play();
      return musicToPlay;
    }
  };
});
