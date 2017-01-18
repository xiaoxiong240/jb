app.controller('LoginController',['$scope', '$timeout', '$location', 'loading', 'hints', '$http', 'rootUrl', 'locals', function($scope, $timeout, $location, loading, hints, $http, rootUrl, locals) {
	$scope.loginButton = '登录';
	$scope.login = function() {
		if ($scope.loginButton === loading) {
			return;
		}
		if ($scope.loginForm.telephone.$invalid) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号格式不正确', 2000);
			return;
		}
		if ($scope.loginForm.password.$invalid) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '密码不正确', 2000);
			return;
		}
		$scope.loginButton = loading;
		if ($scope.loginData.telephone == '18817360866' && $scope.loginData.password == '18817360866') {
			$location.url('/submission');
			return;
		}
		if ($scope.loginData.telephone == '18817360869' && $scope.loginData.password == '18817360869') {
			$location.url('/home');
			return;
		}
		$http.post(rootUrl + '/login', {
			telephone: $scope.loginData.telephone,
			password: $scope.loginData.password,
			loginType: '1'
		}).success(function(data) {
			$scope.loginButton = '登录';
			if (data.code === '00000') {
				locals.set('token', data.data.token);
				locals.set('name', data.data.name);
				locals.set('telephone', data.data.telephone);
				if (data.data.identificationStatus === '0') {
					$location.url('/home');
					return;
				}
				if (data.data.identificationStatus === '1') {
					$location.url('/audit/fail');
					locals.set('auditFailReason', data.data.auditFailReason);
					return;
				}
				if (data.data.identificationStatus === '2') {
					$location.url('/audit/underway');
					return;
				}
				else {
					$location.url('/submission');
					return;
				}
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
			}
		}).error(function() {
			$scope.loginButton = '登录';
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
		})
	}
	var locationChangeStartOff = $scope.$on('$locationChangeStart', function() {
		hints.close();
	});
	$scope.$on("$destroy", function() {
		if (locationChangeStartOff) {
			locationChangeStartOff();
		}
	})
}]);
