var loading = '<div class="loading-outer"><div class="loading"></div></div>';
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.router', 'ngCookies', 'ngTouch', 'ui.bootstrap', 'ngGrid', 'angularQFileUpload', 'LocalStorageModule', 'ngFileUpload']);
app.config(['$stateProvider', '$urlRouterProvider', '$provide', function($stateProvider, $urlRouterProvider, $provide) {
    $stateProvider.
    state('home', {
        url: '/home',
        templateUrl: 'pages/common/home.html',
        controller: 'HomeController'
    }).
    state('home.partnerStoragePublish', {
        url: '^/partner/storage/publish',
        templateUrl: 'pages/partner/storage/publish.html',
        controller: 'PartnerStoragePublishController'
    }).
    state('home.partnerStorageWarehouse', {
        url: '^/partner/storage/warehouse',
        templateUrl: 'pages/partner/storage/warehouse.html',
        controller: 'PartnerStorageWarehouseController'
    }).
    state('home.partnerStorageOrder', {
        url: '^/partner/storage/order',
        templateUrl: 'pages/partner/storage/order.html',
        controller: 'PartnerStorageOrderController'
    }).
    state('home.partnerStorageBill', {
        url: '^/partner/storage/bill',
        templateUrl: 'pages/partner/storage/bill.html',
        controller: 'PartnerStorageBillController'
    }).
    state('home.partnerUserCertificated', {
        url: '^/partner/user/certificated',
        templateUrl: 'pages/partner/user/certificated.html',
        controller: 'PartnerUserCertificatedController'
    }).
    state('home.partnerUserPassword', {
        url: '^/partner/user/password',
        templateUrl: 'pages/partner/user/password.html',
        controller: 'PartnerUserPasswordController'
    }).
    state('login', {
        url: '/login',
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController'
    }).
    state('password', {
        url: '/password',
        templateUrl: 'pages/login/password.html',
        controller: 'PasswordController'
    }).
    state('agreement', {
        url: '/agreement',
        templateUrl: 'pages/common/agreement.html'
    }).
    state('agreement.register', {
        url: '/register',
        templateUrl: 'pages/agreement/register.html'
    }).
    state('agreement.submission', {
        url: '/submission',
        templateUrl: 'pages/agreement/submission.html'
    }).
    state('fill', {
        url: '/fill',
        templateUrl: 'pages/common/fill.html',
        controller: 'FillController'
    }).
    state('fill.register', {
        url: '^/register',
        templateUrl: 'pages/register/register.html',
        controller: 'RegisterController'
    }).
    state('fill.submission', {
        url: '^/submission',
        templateUrl: 'pages/register/submission.html',
        controller: 'SubmissionController'
    }).
    state('fill.audit', {
        url: '^/audit/:auditStatus',
        templateUrl: 'pages/register/audit.html',
        controller: 'AuditController'
    })
    $urlRouterProvider.otherwise('/login');
    $provide.value('loading', '<div class="loading-outer"><div class="loading"></div></div>');
    $provide.value('dateOptions', {
        formatDay: 'dd',
        formatMonth: 'MM',
        formatYear: 'yyyy',
        formatDayHeader: 'EEE',
        formatDayTitle: 'yyyy年MM月',
        formatMonthTitle: 'yyyy年',
        datepickerMode: 'day',
        minMode: 'day',
        maxMode: 'year',
        showWeeks: false,
        startingDay: 1,
        yearRange: 20
    });
    $provide.value('modalHintsInstance', null);
    $provide.value('rootUrl', 'http://116.62.26.218:8090/mockjs/2');
}]);
app.run(['$rootScope', '$window', '$location', '$log', '$cookies', function($rootScope, $window, $location, $log, $cookies) {
    var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
    var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);

    var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
    var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

    function locationChangeStart(event) {}

    function locationChangeSuccess(event) {}

    function routeChangeStart(event) {}

    function routeChangeSuccess(event) {}
}]);
'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "\u4e0a\u5348",
      "\u4e0b\u5348"
    ],
    "DAY": [
      "\u661f\u671f\u65e5",
      "\u661f\u671f\u4e00",
      "\u661f\u671f\u4e8c",
      "\u661f\u671f\u4e09",
      "\u661f\u671f\u56db",
      "\u661f\u671f\u4e94",
      "\u661f\u671f\u516d"
    ],
    "ERANAMES": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "ERAS": [
      "\u516c\u5143\u524d",
      "\u516c\u5143"
    ],
    "FIRSTDAYOFWEEK": 6,
    "MONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "SHORTDAY": [
      "\u5468\u65e5",
      "\u5468\u4e00",
      "\u5468\u4e8c",
      "\u5468\u4e09",
      "\u5468\u56db",
      "\u5468\u4e94",
      "\u5468\u516d"
    ],
    "SHORTMONTH": [
      "1\u6708",
      "2\u6708",
      "3\u6708",
      "4\u6708",
      "5\u6708",
      "6\u6708",
      "7\u6708",
      "8\u6708",
      "9\u6708",
      "10\u6708",
      "11\u6708",
      "12\u6708"
    ],
    "STANDALONEMONTH": [
      "\u4e00\u6708",
      "\u4e8c\u6708",
      "\u4e09\u6708",
      "\u56db\u6708",
      "\u4e94\u6708",
      "\u516d\u6708",
      "\u4e03\u6708",
      "\u516b\u6708",
      "\u4e5d\u6708",
      "\u5341\u6708",
      "\u5341\u4e00\u6708",
      "\u5341\u4e8c\u6708"
    ],
    "WEEKENDRANGE": [
      5,
      6
    ],
    "fullDate": "y\u5e74M\u6708d\u65e5EEEE",
    "longDate": "y\u5e74M\u6708d\u65e5",
    "medium": "y\u5e74M\u6708d\u65e5 ah:mm:ss",
    "mediumDate": "y\u5e74M\u6708d\u65e5",
    "mediumTime": "ah:mm:ss",
    "short": "y/M/d ah:mm",
    "shortDate": "y/M/d",
    "shortTime": "ah:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u00a5",
    "DECIMAL_SEP": ".",
    "GROUP_SEP": ",",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-\u00a4",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
      }
    ]
  },
  "id": "zh-cn",
  "localeID": "zh_CN",
  "pluralCat": function(n, opt_precision) {  return PLURAL_CATEGORY.OTHER;}
});
}]);
