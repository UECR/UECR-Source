(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('ChampionshipsCtrl', controller);
    
    /*@ngInject*/
    function controller($location, Championships) {
        /*jshint validthis: true */
        var vm = this;

        vm.list = Championships.list;

        vm.onClick = onClick;

        function onClick(championship) {
            $location.path('/championships/' + championship.id);
        }
    }
})();