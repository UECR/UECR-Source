(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('Championships', championships);

    function championships() {
        var championshipList = [
            {
                id: 1,
                name: 'V8 Supercars',
                game: 1,
                points: 1,
                entrants: [
                    {
                        driver: 1,
                        team: 1
                    },
                    {
                        driver: 2,
                        team: 2
                    }
                ]
            },
            {
                id: 2,
                name: 'GTE Speciale',
                game: 1,
                points: 1,
                entrants: [
                    {
                        driver: 1,
                        team: 1
                    },
                    {
                        driver: 2,
                        team: 2
                    }
                ]
            }
        ];

        function Championship(data) {
            this.id = data.id;
            this.name = data.name;
            this.entrants = [];
            this.races = [];
            this.refs = {
                game: data.game,
                points: data.points,
                entrants: data.entrants
            };
        }

        Championship.prototype.getEntrant = function (id) {
            return this.entrants.find(function (entrant) {
                return entrant.driver.id === id;
            });
        };

        /*Championship.prototype.getDriverLeaderboard = function () {
            if (!this.cache.driverLeaderboard) {
                this.cache.driverLeaderboard = [];
                var drivers = this.getDriversWithTeam();
                drivers.forEach(function (model) {
                    this.cache.driverLeaderboard.push(new DriverLeaderboardEntry(this, model.driver));
                }, this);                
                var races = this.getRaces();
                races.forEach(function (race) {
                    if (race.completed) {
                        race.results.forEach(function (result, index) {
                            var entry = this.cache.driverLeaderboard.find(function (entry) {
                                return entry.driver.id == result;
                            });
                            entry.addResult(index + 1);
                        }, this);
                    }
                }, this);
                this.cache.driverLeaderboard.sort(function (a, b) {
                    if (a.points === b.points) {
                        return a.driver.name < b.driver.name ? -1 : 1;
                    }
                    return a.points > b.points ? -1 : 1;
                });
                for (var index = 0; index < this.cache.driverLeaderboard.length; index++) {
                    this.cache.driverLeaderboard[index].position = index + 1;
                }
            }
            return this.cache.driverLeaderboard;
        };

        Championship.prototype.getLeaderboardEntryForDriver = function (driver) {
            var leaderboard = this.getDriverLeaderboard();
            return leaderboard.find(function (entry) {
                return entry.driver.id == driver;
            });
        };*/

        Championship.prototype.getState = function () {
            return 'Active';
        };

        function Championships() {
            this.list = [];
            championshipList.forEach(function (championship) {
                this.list.push(new Championship(championship));
            }, this);
        }

        Championships.prototype.getId = function (id) {
            return this.list.find(function (championship) {
                return championship.id === id;
            });
        };

        Championships.prototype.getForDriver = function (id) {
            return this.list.filter(function (championship) {
                var drivers = championship.getDriversWithTeam();
                return drivers.find(function (model) {
                    return model.driver.id === id;
                }) != undefined;
            });
        };

        function DriverLeaderboardEntry(championship, driver) {
            this.championship = championship;
            this.driver = driver;
            this.points = 0;
            this.position = 0;
            this.results = [];
        }

        DriverLeaderboardEntry.prototype.addResult = function (position) {
            this.points += this.championship.getPointSystem().forPosition(position);
            this.results.push(position);
        };

        return new Championships();

        /*function LeaderboardEntry(driver) {
            this.driver = driver;
            this.points = 0;
        }

        function Championship(championship) {
            this.id = championship.id;
            this.name = championship.name;
            this.game = championship.game;
            this.races = [];
            Races.getForChampionship(this.id).forEach(function (race) {
                this.races.push(race);
            }, this);
            championship.drivers.forEach(function (driver) {
                Drivers.getId(driver).championships.push(this);
            }, this);
            this.leaderboard = [];
            Drivers.getForChampionship(this.id).forEach(function (driver) {
                this.leaderboard.push(new LeaderboardEntry(driver));
            }, this);
            this.races.forEach(function (race) {
                if (race.completed) {
                    for (var racePosition = 0; racePosition < race.results.length; racePosition++) {
                        var leaderboardPosition = this.getDriverPosition(race.results[racePosition]);
                        var leaderboardEntry = this.leaderboard[leaderboardPosition];
                        leaderboardEntry.points += Points.forPosition(racePosition);
                    }
                }
            }, this);
            this.leaderboard.sort(function (a, b) {
                if (a.points === b.points) {
                    return a.driver.name < b.driver.name ? -1 : 1;
                }
                return a.points > b.points ? -1 : 1;
            });
        }

        Championship.prototype.getDriverPosition = function (driver) {
            for (var position = 0; position < this.leaderboard.length; position++) {
                if (this.leaderboard[position].driver.id == driver) {
                    return position;
                }
            }
        };

        Championship.prototype.getDriverPoints = function (driver) {
            return this.leaderboard[this.getDriverPosition(driver)].points;
        };

        Championship.prototype.getState = function () {
            var today = new Date();
            if (ukDate(this.races[0].date) > today) {
                return 'Not Started';
            }
            if (ukDate(this.races[this.races.length - 1].date) < today) {
                return 'Completed';
            }
            return 'In Progress';
        };

        function ukDate(date) {
            var parts = date.split('/');
            return new Date(parts[2], parts[1]-1, parts[0]);
        }

        Championship.prototype.getStartDate = function () {
            return this.races[0].date;
        };

        Championship.prototype.getGame = function () {
            return Games.getId(this.game);
        };

        function Championships() {
            this.list = [];
            championshipList.forEach(function (championship) {
                this.list.push(new Championship(championship));
            }, this);
        }

        Championships.prototype.getId = function (id) {
            return this.list.find(function (championship) {
                return championship.id == this;
            }, id);
        };

        Championships.prototype.getName = function (name) {
            return this.list.find(function (championship) {
                return championship.name == this;
            }, name);
        };

        return new Championships();*/
    }
})();