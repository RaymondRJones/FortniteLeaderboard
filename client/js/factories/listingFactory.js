angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getFlowers: function() {
      return $http.get('/api/flowers');
    },
    getSightings: function(flowerName) {
      return $http.get('/api/sightings/' + flowerName);
    },
    insertSighting: function(sighting) {
      return $http.post('/api/sightings', sighting);
    },
  	updateFlower: function(flower) {
  	  return $http.post('/api/flower', flower);
      },

     delete: function(id) {
       /**TODO
          return result of HTTP delete method
         */

       return $http.post('http://localhost:8080/api/listings', id );

       /*
    Listings.findById(id, function(err,listing){
      if(err) throw err;

      listing.remove(function(err){
        if (err) throw err;
      });
    });
    return $http.post('http://localhost:8080/api/listings', listing);
    */
  }
};

  return methods;
});
