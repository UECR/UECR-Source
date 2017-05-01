(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Games', games);
    
    function games() {
        var gameList = [
            {
                id: 1,
                name: 'Forza Motorsport 6',
                platforms: [2]
            },
            {
                id: 2,
                name: 'Project Cars',
                platforms: [1, 2]
            },
            {
                id: 3,
                name: 'Forza Motorsport 7',
                platforms: [1, 2]
            }
        ];

        function Game(data) {
            this.id = data.id;
            this.name = data.name;
            this.platforms = [];
            this.refs = {
                platforms: data.platforms
            };
        }

        function Games() {
            this.list = [];
            gameList.forEach(function (game) {
                this.list.push(new Game(game));
            }, this);
        }

        Games.prototype.getId = function (id) {
            return this.list.find(function (game) {
                return game.id === id;
            });
        };

        Games.prototype.getForplatform = function (platformId) {
            return this.list.filter(function (game) {
                return game.platforms.find(function (platform) {
                    return platform === platformId;
                }) != undefined;
            });
        };

        return new Games();
    }
})();