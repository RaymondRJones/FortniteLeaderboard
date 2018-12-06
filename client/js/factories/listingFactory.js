angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getFlowers: function() {
      return $http.get('/api/flowers');
    },
    getSightings: function() {
      return $http.get('/api/sightings/');
    },

	create: function(listing) {
	  return $http.post('http://localhost:8080/api/listings', listing);
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
