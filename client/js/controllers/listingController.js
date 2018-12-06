angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the flowers, then bind it to the scope */
    Listings.getFlowers().then(function(response) {
      $scope.listings = response.data;
          console.log($scope.listings);
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    //for a selected flower, returns it's sightings
    Listings.getSightings().then(function(response) {
      $scope.sightings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    $scope.detailedInfo = undefined;

    $scope.addSighting = function(name, person, location, sighted) {
      var newSight = {
        "name": name,
        "person": person,
        "location": location,
        "sighted": sighted
      }

      $scope.sightings.push(newSight);

      Listings.addSighting(newSight);


	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
    };

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
       console.log($scope.listings[index]._id);

       Listings.delete($scope.listings[index]._id);

      console.log($scope.listings[index]._id);


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
