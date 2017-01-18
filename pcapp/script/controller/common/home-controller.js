app.controller('HomeController',['$scope', 'locals', '$location', function($scope, locals, $location) {
	$scope.name = locals.get('name');
	$scope.siders = [{
		name: '仓储中心',
		status: true,
		menus: [{
			name: '发布新仓库',
			url: '/partner/storage/publish'
		}, {
			name: '我的仓库',
			url: '/partner/storage/warehouse'
		}, {
			name: '我的订单',
			url: '/partner/storage/order'
		}, {
			name: '我的账单',
			url: '/partner/storage/bill'
		}]
	}, {
		name: '账号管理',
		status: true,
		menus: [{
			name: '认证资料',
			url: '/partner/user/certificated'
		}, {
			name: '修改密码',
			url: '/partner/user/password'
		}]
	}]
	$scope.exit = function() {
		locals.clear();
		$location.url('/login');
	}
	$scope.toPage = function(url) {
		$location.url(url);
	}
	$scope.siderStatus = $location.path();
	var locationChangeStartOff = $scope.$on('$locationChangeStart', function() {
		$scope.siderStatus = $location.path();
	});
	$scope.$on("$destroy", function() {
		if (locationChangeStartOff) {
			locationChangeStartOff();
		}
	})
}]);
