(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Tracks', tracks);

    function tracks() {
        var trackList = [
            {
                id: 1,
                name: 'Brands Hatch'
            },
            {
                id: 2,
                name: 'Bernese Alps'
            },
            {
                id: 3,
                name: 'Circuit de Catalunya'
            },
            {
                id: 4,
                name: 'Circuit de Spa Francorchamps'
            },
            {
                id: 5,
                name: 'Daytona International Speedway'
            },
            {
                id: 6,
                name: 'Indianapolis Motor Speedway'
            },
            {
                id: 7,
                name: 'Le Mans Circuit de la Sarthe'
            },
            {
                id: 8,
                name: 'Lime Rock Park'
            },
            {
                id: 9,
                name: 'Long Beach'
            },
            {
                id: 10,
                name: 'Mazda Raceway Laguna Seca'
            },
            {
                id: 11,
                name: 'Mount Panorama Circuit (Bathurst)'
            },
            {
                id: 12,
                name: 'Nürburgring'
            },
            {
                id: 13,
                name: 'Prague'
            },
            {
                id: 14,
                name: 'Rio'
            },
            {
                id: 15,
                name: 'Road America'
            },
            {
                id: 16,
                name: 'Road Atlanta'
            },
            {
                id: 17,
                name: 'Sebring International Raceway'
            },
            {
                id: 18,
                name: 'Silverstone'
            },
            {
                id: 19,
                name: 'Test Track'
            },
            {
                id: 20,
                name: 'Top Gear'
            },
            {
                id: 21,
                name: 'Yas Marina'
            }
        ];

        function Track(data) {
            this.id = data.id;
            this.name = data.name;
        }

        function Tracks() {
            this.list = [];
            trackList.forEach(function (track) {
                this.list.push(new Track(track));
            }, this);
        }

        Tracks.prototype.getId = function (id) {
            return this.list.find(function (track) {
                return track.id === id;
            });
        };

        return new Tracks();
    }
})();