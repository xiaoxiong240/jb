app.controller('AuditController', ['$scope', '$state', 'locals', '$http', '$location', 'rootUrl', 'hints', function($scope, $state, locals, $http, $location, rootUrl, hints) {
	$scope.auditStatus = $state.params.auditStatus;
	$scope.auditFailButton = '修改资料&nbsp;重新提交审核';
	if ($scope.auditStatus === 'fail') {
		$scope.auditDesc = locals.get('auditFailReason');
	}
	$scope.resubmission = function() {
		if ($scope.auditFailButton === loading) {
			return;
		}
		$scope.auditFailButton = loading;
		$http.get(rootUrl + '/resubmission', {
			header: {
				token: locals.get('token')
			}
		}).success(function(data) {
			$scope.auditFailButton = '修改资料&nbsp;重新提交审核';
			if (data.code === '00000') {
				$location.url('/submission');
				return;
			} else if (data.code === '00001') {
				locals.clear();
				hints.show('rgba(221, 2, 2, .8)', 'sm', '身份失效，请重新登录', 2000);
				$location.url('/login');
				return;
			} else {
				hints.show('rgba(221, 2, 2, .8)', 'sm', data.message, 2000);
				return;
			}
		}).error(function(data) {
			$scope.auditFailButton = '修改资料&nbsp;重新提交审核';
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		});
	}
}]);
