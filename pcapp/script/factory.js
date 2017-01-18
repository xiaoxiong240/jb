app.factory('hints', ['$modal', '$timeout', 'modalHintsInstance', function($modal, $timeout, modalHintsInstance){
	var show = function(color, size, message, showTimeout) {
		if (modalHintsInstance) {
			modalHintsInstance.close();
		}
        modalHintsInstance = $modal.open({
            templateUrl: 'pages/modal/hints.html',
            controller: 'HintsController',
            backdrop: true,
			size: size,
			backdropClass: 'modal-hints',
            resolve: {
                hintsType: function() {
                    return {color: color, message: message};
                }
            }
        });
        if(showTimeout){
        	$timeout(function() {
				modalHintsInstance.close();
			}, showTimeout);
        }
    }
	var close = function() {
		if (modalHintsInstance) {
			modalHintsInstance.close();
		}
	}
	return {show: show, close: close};
}]);
app.factory('locals', ['$window', function($window) {
	return {
		set: function(key,value) {
			$window.localStorage[key]=value;
		},
		get: function(key,value) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key,value) {
			$window.localStorage[key]=JSON.stringify(value);
		},
		getObject: function(key,value) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		clear: function() {
			$window.localStorage.clear();
		}
	}
}]);
app.factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var onProgress = function(reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
        };
    };
    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();


        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);


        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL
    };
});
