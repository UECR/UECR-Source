(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('ChampionshipCtrl', controller);
    
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

        vm.onCalendarClick = onCalendarClick;
        vm.onDriverClick = onDriverClick;

        function onCalendarClick() {
            $location.path($location.path() + '/races');
        }

        function onDriverClick(entrant) {
            $location.path('/drivers/' + entrant.entrant.id);
        }
    }
})();