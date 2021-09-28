var MoviesApp = angular.module("MoviesApp", ['ngRoute', 'MovieService', 'ngDialog']);

MoviesApp.config(['$routeProvider',
function($routeProvider) {
    $routeProvider
    .when("/Movies", {
        templateUrl: "Views/MoviesList.html",
        controller: 'MoviesController'
    }).
     when("/AddMovie", {
         templateUrl: "Views/AddMovie.html",
         controller: 'MoviesController'
     }).
     when("/EditMovie", {
         templateUrl: "Views/EditMovie.html",
         controller: 'MoviesController'
         }).
    otherwise({
        redirectTo: '/Movies'
    });
}]);
MoviesApp.controller("MoviesController", function ($scope, MovieApi, ngDialog,$http)
{
    //$scope.searchList = [];
    // $scope.SelectedMovie = null;
   //$scope.locationURL='http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK';
    getMovies();
    function getMovies() {
        MovieApi.getMovies().success(function (movies)
        {
            $scope.movies = movies;
        })
        .error(function (error) {
            $scope.Status = "error";
        })
    }
        
    $scope.selectMovie = function (movie)
    {
        //alert(movie.Name);
        $scope.movie = movie;
        console.log(movie);
        ngDialog.open({
            template: '<table ng-app="MoviesApp" class="table table-striped"><thead><tr> <th>Title</th> <th>Year</th><th>Director</th><th>Rating</th><th>&nbsp;</th></tr>' +
        '</thead><tbody><tr><td><input ng-model="movie.Name" class="form-control"/> </td> <td><input ng-model="movie.Year" class="form-control" /> </td>' +
        '<td><input ng-model="movie.Director" class="form-control" /></td><td><input ng-model="movie.Rating" class="form-control" /> </td><td>' +
        '<button type="button" ng-click="closeThisDialog(\'button\')" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span></button></td></tr></tbody></table>',
            plain: true,
            scope: $scope
        });
    }

    $scope.removeMovie = function (movie)
    {
        var index = $scope.movies.indexOf(movie);
       // console.log(movie);
        //console.log(index);
        $scope.movies.splice(index,1);
    }

    $scope.addMovie = function (movie)
    {
        $scope.movie = null;
        
        //alert($scope.movie.Name);
        ngDialog.open({
            template : '<table class="table table-striped"><thead><tr> <th>Title</th> <th>Year</th><th>Director</th><th>Rating</th><th>&nbsp;</th></tr>' + 
                '</thead><tbody><tr><td><input ng-model="movie.Name" class="form-control"/> </td> <td><input ng-model="movie.Year" class="form-control" /> </td>'+
                '<td><input ng-model="movie.Director" class="form-control" /></td><td><input ng-model="movie.Rating" class="form-control" /> </td><td>'+
                '<button ng-click="addOk(movie)" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button></td></tr></tbody></table>'
                ,//'Views/AddMovie.html',
            plain: true,          
            scope: $scope
        })
       
      
    }

    $scope.addOk = function (movie)
    {
        $scope.movie = movie;

        var newMovie = {                              
                Name: $scope.movie.Name,
                Year: $scope.movie.Year, 
                Director: $scope.movie.Director,
                Rating: $scope.movie.Rating                  
            };
        $scope.movies.push(newMovie);

        this.closeThisDialog();
    }
});

//MoviesApp.directrive('autoCompleteDirectrive', function($http){
    
//    return {
//        restrict: 'A',
//        scope : {
//            url:'@'
//        },
//        link: function(scope, elm, attrs)
//        {
//            elm.autocomplete
//                ({
//                    source: function(request,response)
//                    {
//                        $http({ method: 'jsonp', url: scope.url, params: { q:request.term }}).success(function(data)
//                        {
//                            response(data);
//                        })
//                    },
//                    minLength:1
//                })
//        }
//    }

//});