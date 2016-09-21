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
                                        "location": parsed[i]["properties"]["place"] + "\n",
                                        "magnitude": parsed[i]["properties"]["mag"] + "\n",
                                        "time": new Date(parsed[i]["properties"]["time"]).toUTCString() + "\n",
                                        "latitude": parsed[i]["geometry"]["coordinates"][0] + "\n",
                                        "longitude": parsed[i]["geometry"]["coordinates"][1] + "\n",
                                        "depth": parsed[i]["geometry"]["coordinates"][2] + "km\n"
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
        placeArray = item["location"].split(",");
        return placeArray[placeArray.length - 1];
    };

    $scope.firstWord = function(item) {
        placeArray = item["location"].split(",");
        return placeArray[0];
    };

    // MODAL WINDOW
    $scope.open = function(earthquake) {
        var modalInstance = $modal.open({
            controller: "ModalInstanceCtrl",
            templateUrl: 'myModalContent.html',
            resolve: {
                earthquake: function() {
                    return earthquake;
                }
            }
        });
    };

}

earthquakesApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, earthquake)
{
    $scope.earthquake = earthquake;

});

earthquakesApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});