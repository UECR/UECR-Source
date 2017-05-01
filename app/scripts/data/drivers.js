(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Drivers', drivers);

    function drivers() {
        var driverList = [
            {
                id: 1,
                name: 'Forza Raivo',
                number: '23'
            },
            {
                id: 2,
                name: 'MrCableswitch',
                number: '44'
            }
        ];

        function Driver(data) {
            this.id = data.id;
            this.name = data.name;
            this.number = data.number;
            this.championships = [];
        }

        function Drivers() {
            this.list = [];
            driverList.forEach(function(driver) {
                this.list.push(new Driver(driver));
            }, this);
        }

        Drivers.prototype.getId = function (id) {
            return this.list.find(function (driver) {
                return driver.id === id;
            });
        };

        Drivers.prototype.getForChampionship = function (id) {
            return this.list.filter(function (driver) {
                return driver.championships.find(function (championship) {
                    return championship.id === id;
                }) != undefined;
            });
        };

        return new Drivers();
    }
})();