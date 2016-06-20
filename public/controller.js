var app = angular.module("app",[]);

app.controller("contactlist",function($scope, $http){
	var refresh = function(){
	$http.get("/contactlist").success(function(list){
		$scope.data = list;
	});
	};
	refresh();

	$scope.add = function(){
		$http.post('/contactlist' , $scope.record).success(function(list){
			refresh();
			$scope.record = "";
		});
	}

	$scope.del = function(index){
		$http.delete('/contactlist/' + index).success(function(data){
			refresh();
		});
	}

	$scope.edit = function(index){
		$http.get('/contactlist/' + index).success(function(data){
			$scope.record = data;
		});	
	}

	$scope.update = function(){
		console.log($scope.record._id);
		$http.put('/contactlist/' + $scope.record._id , $scope.record).success(function(data){
			refresh();
			$scope.record = "";
		});
	}
});