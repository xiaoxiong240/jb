app.controller('RegisterController',['$scope', 'loading', '$timeout', '$location', 'hints', '$http', 'rootUrl', 'locals', function($scope, loading, $timeout, $location, hints, $http, rootUrl, locals) {
	$scope.captchaButton = '获取验证码';
	$scope.registerButton = '立即注册';
	$scope.checkTelephone = function() {
		$scope.checkTelephoneStatus = false;
		if($scope.registerForm.telephone.$error.required) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不能为空', 2000);
			return;
		}
		if($scope.registerForm.telephone.$error.pattern) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号格式不正确', 2000);
			return;
		}
		$http.post(rootUrl + '/registered', {
			telephone: $scope.registerData.telephone
		}).success(function(data){
			if (data.code === '00000') {
				if (data.data.registered) {
					hints.show('rgba(221, 2, 2, .8)', 'sm', '该手机号已注册', 2000);
					return;
				}
				$scope.checkTelephoneStatus = true;
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
				return;
			}
		}).error(function(data) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		});
	}
	$scope.register = function() {
		if ($scope.registerButton === loading) {
			return;
		}
		if (!$scope.checkTelephoneStatus) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不正确或者已注册', 2000);
			return;
		}
		if ($scope.registerForm.invalid) {
			return;
		}
		$http.post(rootUrl + '/register', {
			telephone: $scope.registerData.telephone,
			password: $scope.registerData.password,
			captcha: $scope.registerData.captcha
		}).success(function(data) {
			$scope.registerButton = '立即注册';
			if (data.code === '00000') {
				locals.set('token', data.data.token);
				locals.set('name', data.data.name);
				locals.set('telephone', data.data.telephone);
				$location.url('/submission');
				return;
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
			}
		}).error(function() {
			$scope.registerButton = '立即注册';
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
		})
	}
	$scope.getCaptcha = function() {
		if (!$scope.checkTelephoneStatus) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不正确或者已注册', 2000);
			return;
		}
		$scope.captchaStatus = true;
		timer();
		$http.post(rootUrl + '/message', {
			telephone: $scope.registerData.telephone,
			type: '1'
		}).success(function(data) {
			if (data.code === '00000') {
				return;
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
				return;
			}
		}).error(function(data) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		});
	}
	var time = 60;
	var timeout;
	var timer = function() {
		$scope.captchaButton = time + '秒后重发';
		if (time == 0) {
			time = 60;
			$scope.captchaStatus = false;
			$scope.captchaButton = '获取验证码';
		} else {
			timeout = $timeout(function() {
				time --;
				timer();
			}, 1000);
		}
	}
	$scope.$on("$destroy", function() {
		if (timeout) {
			$timeout.cancel(timeout);
		}
	})
}]);
