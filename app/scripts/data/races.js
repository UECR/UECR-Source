(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Races', races);

    function races() {
        var raceList = [
            {
                id: 1,
                date: '15/01/2017',
                championship: 1,
                track: 1,
                results: [
                    1,
                    2
                ]
            },
            {
                id: 2,
                date: '22/01/2017',
                championship: 1,
                track: 2,
                results: [
                    2,
                    1
                ]
            },
            {
                id: 3,
                date: '29/01/2017',
                championship: 1,
                track: 3,
                results: [
                    1,
                    2
                ]
            },
            {
                id: 4,
                date: '05/02/2017',
                championship: 1,
                track: 4,
                results: [
                    2,
                    1
                ]
            },
            {
                id: 5,
                date: '12/02/2017',
                championship: 1,
                track: 5,
                results: [
                    1,
                    2
                ]
            },
            {
                id: 6,
                date: '04/02/2017',
                championship: 2,
                track: 6,
                results: [
                    2,
                    1
                ]
            },
            {
                id: 7,
                date: '11/02/2017',
                championship: 2,
                track: 7,
                results: [
                    2,
                    1
                ]
            },
            {
                id: 8,
                date: '18/02/2017',
                championship: 2,
                track: 8,
                results: [
                    
                ]
            },
            {
                id: 9,
                date: '25/02/2017',
                championship: 2,
                track: 9,
                results: [
                    
                ]
            },
            {
                id: 10,
                date: '04/03/2017',
                championship: 2,
                track: 10,
                results: [
                    
                ]
            }
        ];

        function Race(data) {
            this.id = data.id;
            this.date = data.date;
            this.laps = data.laps;
            this.completed = data.completed;
            this.results = [];
            this.refs = {
                championship: data.championship,
                track: data.track,
                results: data.results
            };
        }

        function Races() {
            this.list = [];
            raceList.forEach(function (race) {
                this.list.push(new Race(race));
            }, this);
        }

        Races.prototype.getId = function (id) {
            return this.list.find(function (race) {
                return race.id === this;
            }, id);
        };

        Races.prototype.getForChampionship = function (championship) {
            return this.list.filter(function (race) {
                return race.championship === championship;
            });
        };

        return new Races();
    }
})();