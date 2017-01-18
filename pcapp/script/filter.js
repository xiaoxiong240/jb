// 向上取整
app.filter('roundUpFilter', function() {
    return function(number) {
        if(angular.isNumber(number)) {
            return Math.ceil(number);
        } else {
            return '';
        }
    }
});
