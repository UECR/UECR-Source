(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Platforms', platforms);
    
    function platforms() {
        var platformList = [
            {
                id: 1,
                name: 'PC'
            },
            {
                id: 2,
                name: 'Xbox One'
            },
            {
                id: 3,
                name: 'PS4'
            }
        ];

        function Platform(data) {
            this.id = data.id;
            this.name = data.name;
        }

        function Platforms() {
            this.list = [];
            platformList.forEach(function (platform) {
                this.list.push(new Platform(platform));
            }, this);
        }

        Platforms.prototype.getId = function (id) {
            return this.list.find(function (platform) {
                return platform.id === id;
            });
        };

        return new Platforms();
    }
})();