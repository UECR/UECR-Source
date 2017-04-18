(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Points', points);
    
    function points() {
        var systemList = [
            {
                id: 1,
                points: [
                    25,
                    18,
                    15,
                    12,
                    10,
                    8,
                    6,
                    4,
                    2,
                    1
                ]
            }
        ];

        function PointSystem(data) {
            this.id = data.id;
            this.points = data.points;
        }

        PointSystem.prototype.forPosition = function (position) {
            if (position < 1 || position > this.points.length) {
                return 0;
            }
            return this.points[position - 1];
        };

        function PointSystems() {
            this.list = [];
            systemList.forEach(function (system) {
                this.list.push(new PointSystem(system));
            }, this);
        }

        PointSystems.prototype.getId = function (id) {
            return this.list.find(function (system) {
                return system.id === id;
            });
        };

        return new PointSystems();
    }        
})();