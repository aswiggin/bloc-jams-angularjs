(function() {
    function SongPlayer() {
        var SongPlayer = {};
//        @desc sets current song object when page loads
//        @type {Object}
        var currentSong = null;
//        @desc Buzz object audio file
//        @type {Object}
        var currentBuzzObject = null;
//        @function setSong
//        @desc Stops currently playing song and loads new audio file as currentBuzzObject
//        @param {Object} song
        var setSong = function(song) {
          if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });
          currentSong = song;
        };
//        @function playSong
//        @desc plays song and changes play/pause icon
//        @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
//        @functin SongPlayer.play(song)
//        @desc plays song if not already playing and plays from where a song left off
//        @params {Object} song
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
          } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
          }
        };
//        @function SongPlayer.pause(song)
//        @desc pauses song if its playing
//        @param {Object} song
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
