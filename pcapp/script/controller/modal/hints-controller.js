app.controller('HintsController',['$scope', '$modalInstance', 'hintsType', function($scope, $modalInstance, hintsType) {
    $scope.message = hintsType.message;
	$scope.myStyle = {"background-color": hintsType.color};
    $scope.cancel = function() {
        $modalInstance.close();
    }
}]);
