(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Teams', teams);
    
    /*@ngInject*/
    function teams() {
        var teamList = [
            {
                id: 1,
                name: 'Team1'
            },
            {
                id: 2,
                name: 'Team2'
            }
        ];

        function Team(data) {
            this.id = data.id;
            this.name = data.name;
        }

        function Teams() {
            this.list = [];
            teamList.forEach(function (team) {
                this.list.push(new Team(team));
            }, this);
        }

        Teams.prototype.getId = function (id) {
            return this.list.find(function (team) {
                return team.id === id;
            });
        };

        return new Teams();
    }
})();