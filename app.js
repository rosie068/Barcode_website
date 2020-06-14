var app = angular.module('app', []);

app.constant('_', window._).run(function ($rootScope) {
    $rootScope._ = window._;
})

app.controller('main', function(){

})