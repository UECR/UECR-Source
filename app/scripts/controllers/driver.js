(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('DriverCtrl', controller);
    
    /*@ngInject*/
    function controller($routeParams, $location, Drivers) {
        /*jshint validthis: true */
        var vm = this;

        var did = parseInt($routeParams.did, 10);
        if (isNaN(did) || did < 1) {
            $location.path('/');
        }

        vm.driver = Drivers.getId(did);
        if (vm.driver === undefined) {
            $location.path('/');
        }

        vm.stats = {
            races: 0,            
            podiums: 0,
            wins: 0,
            points: 0
        };

        vm.championships = [];

        vm.driver.championships.forEach(function (championship) {
            var entry = championship.driverLeaderboard.getEntrant(vm.driver.id);
            vm.championships.push({
                id: championship.id,
                name: championship.name,
                position: entry.position,
                points: entry.points,
                state: championship.getState()
            });
            vm.stats.races += entry.races;
            vm.stats.podiums += entry.podiums;
            vm.stats.wins += entry.wins;
            vm.stats.points += entry.points;
        });

        vm.onClick = onClick;

        function onClick(championship) {
            $location.path('/championships/' + championship.id);
        }
    }
})();