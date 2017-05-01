(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('RacesCtrl', controller);
    
    /*@ngInject*/
    function controller($routeParams, $location, Championships) {
        /*jshint validthis: true */
        var vm = this;

        var cid = parseInt($routeParams.cid, 10);
        if (isNaN(cid) || cid < 1) {
            $location.path('/');
        }

        vm.championship = Championships.getId(cid);
        if (vm.championship === undefined) {
            $location.path('/');
        }

        vm.onRaceClick = onRaceClick;

        function onRaceClick(race) {
            $location.path($location.path() + '/' + race.number);
        }
    }
})();