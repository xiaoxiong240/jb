app.controller('SubmissionController',['$scope', 'dateOptions', '$qupload', '$http', 'rootUrl', 'locals', 'hints', 'loading', '$location', function($scope, dateOptions, $qupload, $http, rootUrl, locals, hints, loading, $location) {
	$scope.submissionButton = '提交审核';
	$scope.dateOptions = dateOptions;
	$scope.dt = {from: {date: '', opened: false}, to: {date: '', opened: false}};
	$scope.openOther = function(el, $event) {
		$scope.dateFocusStatus = true;
		$event.preventDefault();
    	$event.stopPropagation();
		el.opened = true;
	}
	$scope.today = new Date();
	$scope.open = function (el) {
		$scope.dateFocusStatus = true;
		el.opened = true;
	}
	$scope.register = function() {
		if ($scope.submissionButton === loading) {
			return;
		}
		$scope.submissionData.startDate = dateToString($scope.dt.from.date);
		$scope.submissionData.endDate = dateToString($scope.dt.to.date);
		$scope.submissionButton = loading;
		$http.post(rootUrl + '/submission', $scope.submissionData, {
			header: {
				token: locals.get('token')
			}
		}).success(function(data) {
			$scope.submissionButton = '提交审核';
			if (data.code === '00000') {
				$location.url('/audit/underway');
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
			$scope.submissionButton = '提交审核';
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		});
	}
	var dateToString = function(date) {
		var fromYear = date.getFullYear() + "";
		var fromMonth = date.getMonth() + 1 + "";
		var fromDate = date.getDate() + "";
		if(fromMonth.length === 1){
			fromMonth = "0" + fromMonth;
		}
		if(fromDate.length === 1){
			fromDate = "0" + fromDate;
		}
		return fromYear + fromMonth  + fromDate;
	}
	$scope.submissionData = {
		companyName: '',
		creditCode: '',
		legalRepresentative: '',
		startDate: '',
		endDate: '',
		bankName: '',
		bankAccount: '',
		frequentContact: '',
		contactTelephone: '',
		businessLicense: ''
	}

	var start = function () {
		var key = hex_md5(locals.get('telephone') + (new Date()).getTime() + '0');
		var upload = $qupload.upload({
			key: '',
			file: $scope.selectImage,
			token: $scope.uptoken
		});
		upload.then(function (response) {
			$scope.submissionData.businessLicense = key;
		}, function (response) {
			hints.show('rgba(221, 2, 2, .8)', 'sm', '图片上传失败', 2000);
			getUptoken();
		}, function (evt) {
		});
	};
	var getUptoken = function() {
		$http.get(rootUrl + '/getUptoken', {
			header: {
				token: locals.get('token')
			}
		}).success(function(data) {
			if (data.code === '00000') {
				$scope.uptoken = data.data.uptoken;
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
			hints.show('rgba(221, 2, 2, .8)', 'sm', '网络异常', 2000);
			return;
		})
	}
	getUptoken();
	$scope.onFileSelect = function (files) {
		if (files.length === 0) {
			return;
		}
		if (!$scope.uptoken) {
			getUptoken();
			return;
		}
		$scope.selectImage = files[0];
		start();
	};
}]);
