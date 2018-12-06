angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = undefined;
    //user inputted flowerName
    $scope.flowerName = "Oak violet";
    // SQL call to get list of flowers
    Listings.getFlowers().then(function(response) {
      $scope.listings = response.data;
          console.log($scope.listings);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    //SQL call to get sighting info for a flower
    Listings.getSightings($scope.flowerName).then(function(response) {
      $scope.sightings = response.data;
      console.log($scope.sightings);
      console.log("test");
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.addSighting = function(name, person, location, sighted) {
      //Creates new object
      var newSighting = {
        "name": name,
        "person": person,
        "location": location,
        "sighted": sighted
      }
      //Calls SQL to Insert into DB
      $scope.sightings.push(newSighting);
      Listings.insertSighting(newSighting);
    };
    $scope.editFlower = function(name, species, comname) {
      //Creates new object
      var newFlower = {
        "genus": genus,
        "SPECIES": species,
        "COMNAME": comname
      }
      //Calls SQL to Insert into DB
      $scope.sightings.push(newSighting);
      Listings.updateFlower(newSighting);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
