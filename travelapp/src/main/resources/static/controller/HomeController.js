travelApp.controller("homeController",function(NgMap,baseFactory,$location,$rootScope,$scope){
	alert("home controller");
	alert($location.path());
	if($location.path() == "/dashboard"){
	   $rootScope.$$childHead.buttonEnable = false;
	}
	  var vm = this;
	  
	  vm.types = "['establishment']";
	    vm.message = 'You can not hide. :)';
	   
	    vm.placeChanged = function() {
	    	alert("place changed");
	    	alert(vm.address);
	       vm.place = this.getPlace();
	        alert(vm.place);
	        console.log('location', vm.place.geometry.location);
	        vm.map.setCenter(vm.place.geometry.location);
	       getNearestLocations(vm.place.geometry.location,vm.place.name);
	    	 //getNearestLocations("Chennai","Chennai");  
	    }
	    NgMap.getMap().then(function(map) {
		      vm.map = map;
		    });
	    
	    vm.callbackFunc = function(param) {
	    	if(vm.map.getCenter() != undefined){
	      console.log('I know where '+ param +' are. ' + vm.message);
	      console.log('You are at' + vm.map.getCenter());
	    }};
	    
	   function getNearestLocations(location, place){
		   /*var trimPlace = place.replace(/ /g,'');
		   location = "40.71,-74.00";
		   alert("nearest locations"); */
		   
		  baseFactory.getNearByLocations(location, place).then(function (result,status) {
			  alert("Working inside vcontroller");
			  $scope.filteredPlaces = result.data.response.groups[0].items;
			  $scope.filteredPlacesCount  = result.data.response.totalResults;
			    
          }, function (error) {
              alert("error"+error.message);
          }); }
	   
	   
	   
	   $scope.buildCategoryIcon = function (icon) {

	        return icon.prefix + '44' + icon.suffix;
	    };

	    $scope.buildVenueThumbnail = function (photo) {

	        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
	    };
	  
	   //baseFactory.getDishes().query();
	  
})