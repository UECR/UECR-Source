(function () {
    'use strict';

    angular
        .module('uecr', [
            'ngAnimate',
            'ngRoute',
            'ngTouch',
            'ui.bootstrap'
        ])
        .config(config)
        .run(run);

    /*@ngInject*/
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'Home'
            })
            .when('/championships', {
                templateUrl: 'views/championships.html',
                controller: 'ChampionshipsCtrl',
                controllerAs: 'Championships'
            })
            .when('/championships/:cid', {
                templateUrl: 'views/championship.html',
                controller: 'ChampionshipCtrl',
                controllerAs: 'Championship'
            })
            .when('/championships/:cid/races', {
                templateUrl: 'views/races.html',
                controller: 'RacesCtrl',
                controllerAs: 'Races'
            })
            .when('/championships/:cid/races/:rid', {
                templateUrl: 'views/race.html',
                controller: 'RaceCtrl',
                controllerAs: 'Race'
            })
            .when('/drivers', {
                templateUrl: 'views/drivers.html',
                controller: 'DriversCtrl',
                controllerAs: 'Drivers'
            })
            .when('/drivers/:did', {
                templateUrl: 'views/driver.html',
                controller: 'DriverCtrl',
                controllerAs: 'Driver'
            })
            .when('/hall-of-fame', {
                templateUrl: 'views/hall-of-fame.html',
                controller: 'HofCtrl',
                controllerAs: 'Hof'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    /*@ngInject*/
    function run(DataHelper) {
        DataHelper.load();
    }
})();