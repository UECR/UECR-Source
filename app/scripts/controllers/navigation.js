(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('Navigation', controller);
    
    /*@ngInject*/
    function controller($location) {
        /*jshint validthis: true */
        var vm = this;

        vm.active = function (path) {
            return $location.path() == path;
        };
    }
})();