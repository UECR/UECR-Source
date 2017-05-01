(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Leaderboards', leaderboards);
    
    function leaderboards() {
        function Entrant(entrant) {
            this.entrant = entrant;
            this.position = 0;
            this.positions = [];
            this.races = 0;
            this.podiums = 0;
            this.wins = 0;
            this.points = 0;
        }

        Entrant.prototype.addResult = function (position, points) {
            this.races++;
            this.positions.push(position);
            if (position < 4) {
                this.podiums++;
                if (position === 1) {
                    this.wins++;
                }
            }
            this.points += points;
        };

        function Leaderboard() {
            this.entrantMap = new Map();
            this.entrants = [];
        }

        Leaderboard.prototype.sort = function () {
            this.entrantMap.forEach(function (entrant) {
                this.entrants.push(entrant);
            }, this);
            this.entrants.sort(function (a, b) {
                if (a.points === b.points) {
                    return a.entrant.name < b.entrant.name ? -1 : 1;
                }
                return a.points > b.points ? -1 : 1;
            });
            this.entrants.forEach(function (entrant, index) {
                entrant.position = index + 1;
            });
        };

        Leaderboard.prototype.getEntrant = function (id) {
            return this.entrantMap.get(id);
        };

        Leaderboard.prototype.addEntrant = function (entrant) {
            if (!this.entrantMap.has(entrant.id)) {
                this.entrantMap.set(entrant.id, new Entrant(entrant));
            }
        };

        function create() {
            return new Leaderboard();
        }

        return {
            create: create
        };
    }
})();