app.controller('PasswordController',['$scope', 'hints', '$timeout', '$location', '$http', 'rootUrl', function($scope, hints, $timeout, $location, $http, rootUrl) {
	$scope.passwordButton = '重置密码';
	$scope.captchaButton = '获取验证码';
	$scope.checkTelephone = function() {
		$scope.checkTelephoneStatus = false;
		if($scope.passwordForm.telephone.$error.required) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不能为空', 2000);
			return;
		}
		if($scope.passwordForm.telephone.$error.pattern) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号格式不正确', 2000);
			return;
		}
		$http.post(rootUrl + '/registered', {
			telephone: $scope.passwordData.telephone
		}).success(function(data){
			if (data.code === '00000') {
				if (!data.data.registered) {
					hints.show('rgba(221, 2, 2, .8)', 'sm', '该手机号未注册', 2000);
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
	$scope.getCaptcha = function() {
		if (!$scope.checkTelephoneStatus) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不正确或者未注册', 2000);
			return;
		}
		$scope.captchaStatus = true;
		timer();
		$http.post(rootUrl + '/message', {
			telephone: $scope.passwordData.telephone,
			type: '2'
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
	$scope.password = function() {
		if ($scope.passwordButton === loading) {
			return;
		}
		if (!$scope.checkTelephoneStatus) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '手机号不正确或者未注册', 2000);
			return;
		}
		if ($scope.passwordForm.captcha.$invalid) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '验证码不正确', 2000);
			return;
		}
		if ($scope.passwordForm.password.$invalid) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '密码要求字母或者数字的组合，最少不低于6位', 2000);
			return;
		}
		if ($scope.passwordData.repassword !== $scope.passwordData.password) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '两次密码不一致', 2000);
			return;
		}
		$scope.passwordButton = loading;
		$http.post(rootUrl + '/password', {
			telephone: $scope.passwordData.telephone,
			captcha: $scope.passwordData.captcha,
			password: $scope.passwordData.password
		}).success(function(data) {
			$scope.passwordButton = '重置密码';
			if (data.code === '00000') {
				hints.show('rgba(255, 151, 19, .8)', 'sm', '密码设置成功,请登录', 2000);
				$location.url('/login');
				return;
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
				return;
			}
		}).error(function(data) {
			$scope.passwordButton = '重置密码';
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		});
	}
	$scope.$on("$destroy", function() {
		if (timeout) {
			$timeout.cancel(timeout);
		}
	})
}]);
