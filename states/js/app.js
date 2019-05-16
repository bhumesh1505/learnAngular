var routerApp = angular.module('routerApp', ['ui.router']);
function action()
{
    document.getElementByClasses("alink").click();
}
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'    //String URL path to template file OR Function, returns URL path string
        })

        .state('contacts', {
            url: '/contacts',
            //template:'<h1>MY contacts</h1>'     // String HTML content, or function that returns an HTML string
            templateProvider: function ($timeout) {
                return $timeout(function () {
                  return '<h1>visibled after 1 seconds</h1>'
                }, 0);
            }
        })/*
        .state('contacts', {
            url: "/contacts",
            params: {
                param1: null
            },
            templateUrl: 'views/contacts.html'
        })*/
        .state('controller', {
            url:'/controller',
            template: '<h1>{{title}}</h1>',
            controller: function($scope){
              $scope.title = 'My controller';
            }
        })
        ;

});