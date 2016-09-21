var earthquakesApp = angular.module('earthquakesApp', ['ui.bootstrap']);

function mainController($scope, $http, $modal) {
    $scope.formData = {};

    $scope.earthquakes = [];

    // When landing on page, get all earthquakes and show them
    $http.get('/api/all')
        .success(function(data) {
            var parsed = data["features"];
            for (var i = 0; i < parsed.length; i++) {
                var newEarthquake = { 
                                        "place": parsed[i]["properties"]["place"] + "\n",
                                        "magnitude": parsed[i]["properties"]["mag"] + "\n"
                                    };
                $scope.earthquakes.push(newEarthquake);
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.between = function(prop, val) {
        return function(item) {
            return item[prop] >= val && item[prop] < val + 1;
        }
    };

    $scope.lastWord = function(item) {
        placeArray = item["place"].split(",");
        return placeArray[placeArray.length - 1];
    };

    $scope.firstWord = function(item) {
        placeArray = item["place"].split(",");
        return placeArray[0];
    };

    // MODAL WINDOW
    $scope.open = function(earthquake) {
        var modalInstance = $modal.open({
            controller: "mainController",
            templateUrl: 'myModalContent.html',
            resolve: {
                earthquake: function() {
                    return earthquake;
                }
            }
        });
    };

}

earthquakesApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});