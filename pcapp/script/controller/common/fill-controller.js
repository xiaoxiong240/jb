app.controller('FillController', ['$scope', '$state', '$location', function($scope, $state, $location) {
	$scope.status = $state.current.name.split('.')[1];
	var locationChangeStartOff = $scope.$on('$locationChangeStart', function() {
		$scope.status = $location.path().split('/')[1];
	});
	$scope.$on("$destroy", function() {
		if (locationChangeStartOff) {
			locationChangeStartOff();
		}
	})
}]);
