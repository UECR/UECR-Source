(function () {
    'use strict';

    angular
        .module('uecr')
        .factory('DataHelper', helper);
    
    /*@ngInject*/
    function helper(Platforms, Games, Tracks, Points, Drivers, Teams, Races, Championships, Leaderboards) {
        var tools = {
            load: load/*,
            Platforms: {
                get: getPlatform
            },
            Games: {
                get: getGame,                
                forPlatform: getGamesForPlatform
            },
            Tracks: {
                get: getTrack,
                forGame: getTracksForGame
            },
            Points: {
                get: getPointSystem
            },
            Drivers: {
                get: getDriver,
                forChampionship: getDriversForChampionship
            },
            Teams: {
                get: getTeam,
                forChampionship: getTeamsForChampionship
            },
            Races: {
                get: getRace,
                forChampionship: getRacesForChampionship
            },
            Championships: {
                get: getChampionship,
                forDriver: getChampionshipsForDriver,
                forTeam: getChampionshipsForTeam
            },
            ChampionshipTeams: {
                get: getChampionshipTeam
            }*/
        };

        return tools;

        function load() {
            loadPlatformsForGames();
            loadRaces();
            loadChampionships();
            
        }

        function loadPlatformsForGames() {
            Games.list.forEach(function (game) {
                game.refs.platforms.forEach(function (platform) {
                    game.platforms.push(Platforms.getId(platform));
                });
            });
        }

        function loadRaces() {
            Races.list.forEach(function (race) {
                race.championship = Championships.getId(race.refs.championship);
                race.championship.races.push(race);
                race.track = Tracks.getId(race.refs.track);
                race.refs.results.forEach(function (result) {
                    race.results.push(Drivers.getId(result));
                });
            });
        }

        function loadChampionships() {
            Championships.list.forEach(function (championship) {
                championship.game = Games.getId(championship.refs.game);
                championship.points = Points.getId(championship.refs.points);
                championship.races.forEach(function (race, index) {
                    race.number = index + 1;
                });
                championship.driverLeaderboard = Leaderboards.create();
                championship.teamLeaderboard = Leaderboards.create();
                loadChampionshipEntrants(championship);
                loadChampionshipRaces(championship);
            });
        }

        function loadChampionshipEntrants(championship) {
            championship.refs.entrants.forEach(function (entrant) {
                var model = {
                    driver: Drivers.getId(entrant.driver)
                };
                model.driver.championships.push(championship);
                championship.driverLeaderboard.addEntrant(model.driver);
                if (entrant.team) {
                    model.team = Teams.getId(entrant.team);
                    championship.teamLeaderboard.addEntrant(model.team);
                }
                championship.entrants.push(model);
            });
        }

        function loadChampionshipRaces(championship) {
            championship.races.forEach(function (race) {
                for (var position = 1; position <= race.results.length; position++) {
                    var entrant = championship.getEntrant(race.results[position - 1].id);
                    var points = championship.points.forPosition(position);
                    var driverEntrant = championship.driverLeaderboard.getEntrant(entrant.driver.id);
                    driverEntrant.addResult(position, points);
                    if (entrant.team) {
                        var teamEntrant = championship.teamLeaderboard.getEntrant(entrant.team.id);
                        teamEntrant.addResult(position, points);
                    }
                }
            });
            championship.driverLeaderboard.sort();
            championship.teamLeaderboard.sort();
        }

            /*Games.list.forEach(function (game) {
                game.platforms = [];
                game.refs.platforms.forEach(function (platform) {
                    game.platforms.push(tools.Platforms.get(platform));
                });
            });
            Races.list.forEach(function (race) {
                race.championship = tools.Championships.get(race.refs.championship);
                race.track = tools.Tracks.get(race.refs.track);
                race.results = [];
                race.refs.results.forEach(function (driver, index) {
                    race.results.push({
                        position: index + 1,
                        driver: tools.Drivers.get(driver)
                    });
                });
            });
            Championships.list.forEach(function (championship) {
                championship.drivers = [];
                championship.refs.drivers.forEach(function (driver) {
                    championship.drivers.push(tools.Drivers.get(driver));
                });
                championship.teams = [];
                championship.refs.teams.forEach(function (team) {
                    var model = {
                        team: tools.Teams.get(team),
                        drivers: []
                    };
                    team.drivers.forEach(function (driver) {
                        model.drivers.push(tools.Drivers.get(driver));
                    });
                    championship.teams.push(model);
                });
                championship.driverLeaderboard = [];
                championship.teamLeaderboard = [];
                championship.drivers.forEach(function (driver) {
                    championship.driverLeaderboard.push({
                        driver: driver,
                        points: 0
                    });
                });
                championship.teams.forEach(function (team) {
                    championship.teamLeaderboard.push({
                        team: team,
                        points: 0
                    });
                });
                tools.Races.forChampionship(championship.id).forEach(function (race) {
                    race.results.forEach(function (result) {
                        var points = Points.forPosition(result.position); // TODO
                        championship.driverLeaderboard.find(function (driver) {
                            return driver.driver.id == result.driver.id;
                        }).points += points;
                        var team = championship.teamLeaderboard.find(function (team) {
                            return team.drivers.find(function (driver) {
                                return driver.id == result.driver.id;
                            }) != undefined;
                        });
                        if (team != undefined) {
                            team.points += points;
                        }
                    });
                });
            });
            Drivers.list.forEach(function (driver) {
                driver.championships = tools.Championships.forDriver(driver.id);
                
            });
        }*/

        /*function getPlatform(id) {
            return Platforms.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getGame(id) {
            return Games.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getGamesForPlatform(id) {
            return Games.list.filter(function (element) {
                return element.platforms.find(function (platform) {
                    return platform == this;
                }, this) != undefined;
            }, id);
        }

        function getTrack(id) {
            return Tracks.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getTracksForGame(id) {
            return Tracks.list.filter(function (element) {
                return element.game == this;
            }, id);
        }

        function getPointSystem(id) {
            return Points.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getDriver(id) {
            return Drivers.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getDriversForChampionship(id) {
            return Drivers.list.filter(function (element) {
                return element.championships.find(function (championship) {
                    return championship == this;
                }, this) != undefined;
            }, id);
        }

        function getTeam(id) {
            return Teams.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getTeamsForChampionship(id) {
            var championshipTeams = ChampionshipTeams.list.filter(function (element) {
                return element.championship == this;
            }, id);
            var teams = [];
            championshipTeams.forEach(function(element) {
                teams.push(this.get(element.team));
            }, this);
            return teams;
        }

        function getRace(id) {
            return Races.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getRacesForChampionship(id) {
            return Races.list.filter(function (element) {
                return element.championship == this;
            }, id);
        }

        function getChampionship(id) {
            return Championships.list.find(function (element) {
                return element.id == this;
            }, id);
        }

        function getChampionshipsForDriver(id) {
            return Championships.list.filter(function (element) {
                return element.drivers.find(function (driver) {
                    return driver.id == this;
                }, this) != undefined;
            }, id);
        }

        function getChampionshipsForTeam(id) {
            return Championships.list.filter(function (element) {
                return element.drivers.find(function (driver) {
                    return driver == this;
                }, this) != undefined;
            }, id);
        }

        function getChampionshipTeam(id) {
            return ChampionshipTeams.list.find(function (element) {
                return element.id == this;
            }, id);
        }*/
    }
})();