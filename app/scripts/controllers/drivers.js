(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('DriversCtrl', controller);
    
    /*@ngInject*/
    function controller($location, Drivers) {
        /*jshint validthis: true */
        var vm = this;

        vm.list = Drivers.list;

        vm.onClick = onClick;

        function onClick(driver) {
            $location.path('/drivers/' + driver.id);
        }
    }
})();