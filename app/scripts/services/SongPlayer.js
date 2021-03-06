(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
//        @desc Buzz object audio file
//        @type {Object}
        var currentBuzzObject = null;
//        @function setSong
//        @desc Stops currently playing song and loads new audio file as currentBuzzObject
//        @param {Object} song
        var setSong = function(song) {
          if (currentBuzzObject) {
              stopSong();
          }
          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
              });
          });
          SongPlayer.currentSong = song;
        };
//        @function playSong
//        @desc plays song and changes play/pause icon
//        @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
//        @function stopSong
//        @desc stops the song
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
//        @function getSongIndex
//        @desc returns the index of the currently playing song
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
//        @desc sets current song object when page loads
//        @type {Object}
        SongPlayer.currentSong = null;
//        @desc current playback time of currently playing song
//        @type {Number}
        SongPlayer.currentTime = null;
        SongPlayer.volume = 50;
//        @functin SongPlayer.play(song)
//        @desc plays song if not already playing and plays from where a song left off
//        @params {Object} song
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
          } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
          }
        };
//        @function SongPlayer.pause(song)
//        @desc pauses song if its playing
//        @param {Object} song
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
//        @function SongPlayer.previous
//        @desc switches to previous song, stops song if its the first in album
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
//          @function SongPlayer.next
//          @desc skips to next song, stops the music if its the last song
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex++;
            if (currentSongIndex > Object.keys(currentAlbum).length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume)
            }
        };
        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
