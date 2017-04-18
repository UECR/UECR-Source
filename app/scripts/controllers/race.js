(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('RaceCtrl', controller);
    
    /*@ngInject*/
    function controller($routeParams, $location, Championships, Races, Drivers) {
        /*jshint validthis: true */
        var vm = this;

        var cid = parseInt($routeParams.cid, 10);
        var rid = parseInt($routeParams.rid, 10);
        if (isNaN(cid) || isNaN(rid) || cid < 1 || rid < 1) {
            $location.path('/');
        }

        vm.championship = Championships.getId(cid);
        if (vm.championship === undefined || vm.championship.races.length < rid) {
            $location.path('/');
        }

        vm.race = vm.championship.races[rid - 1];

        vm.onDriverClick = onDriverClick;

        function onDriverClick(driver) {
            $location.path('/drivers/' + driver.id);
        }
    }
})();