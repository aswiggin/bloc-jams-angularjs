(function() {
    function AlbumViewCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumViewCtrl', ['Fixtures', AlbumViewCtrl]);
})();
