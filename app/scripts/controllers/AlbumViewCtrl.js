(function() {
    function AlbumViewCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumViewCtrl', ['Fixtures', 'SongPlayer', AlbumViewCtrl]);
})();
