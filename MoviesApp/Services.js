/// <reference path="D:\Visual Studio Projects\Movies Task\MoviesApp\MoviesApp\Scripts/angular.js" />
var MovieService = angular.module("MovieService", []);

MovieService.factory('MovieApi', function ($http) {
    var urlBase = 'http://localhost:50737/api';
    var MovieApi = {};
    MovieApi.getMovies = function () {
        return $http.get(urlBase + '/Movies')
    };
    return MovieApi;
});