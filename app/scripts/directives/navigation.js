(function () {
    'use strict';

    angular
        .module('uecr')
        .directive('navigation', directive);

    function directive() {
        return {
            restrict: 'E',
            scope: {
                appName: '@'
            },
            controller: controller,
            controllerAs: 'navigate',
            templateUrl: 'views/navigation.html'
        };
    }
    /*@ngInject*/
    function controller($location, $scope, $document) {
        /*jshint validthis: true */
        var vm = this;

        vm.appName = $scope.appName;
        vm.isCollapsed = true;
        vm.toggle = toggleCollapsed;

        vm.links = [
            {
                name: 'Home',
                path: '#/'
            },
            {
                name: 'Championships',
                path: '#/championships'
            },
            {
                name: 'Drivers',
                path: '#/drivers'
            },
            {
                name: 'Hall of Fame',
                path: '#/hall-of-fame'
            },
            {
                name: 'About',
                path: '#/about'
            }
        ];

        update();

        $scope.$on('$locationChangeSuccess', update);
        $document.on('click touchend', function (event) {
            if (!$(event.target).closest('#nav-container').length) {
                $scope.$apply(function () {
                    vm.isCollapsed = true;
                });
            }
        });
        function update() {
            var path = $location.path();
            angular.forEach(vm.links, function (link) {
                link.active = link.path === '#/' + path.split('/', 2)[1] ? true : false;
            });
        }

        function toggleCollapsed(event) {
            vm.isCollapsed = !vm.isCollapsed;
            event.stopPropagation();
        }
    }
})();