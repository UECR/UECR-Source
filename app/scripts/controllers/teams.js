(function () {
    'use strict';

    angular
        .module('uecr')
        .controller('TeamsCtrl', controller);
    
    /*@ngInject*/
    function controller($location, Teams) {
        /*jshint validthis: true */
        var vm = this;

        vm.list = Teams.list;

        vm.onClick = onClick;

        function onClick(team) {
            //$location.path('/teams/' + team.id);
        }
    }
})();