angular.module("app", ['ui.router', 'ngTouch', 'chart.js'])
	.run(['$state', '$rootScope',  ($state, $rootScope )=>{

	}])
	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider','$httpProvider',
	  ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) =>{

      
	    $locationProvider.html5Mode(true)
	    $urlRouterProvider.when('','/')
	    $urlRouterProvider.otherwise("/404/");
	    $stateProvider
	      .state('404', {
          url:'/404/',
          templateUrl: "/html/404.html"
		    })
	      .state('main', {
	        url:'/',
	        templateUrl: "/html/index.html",
	        controller: "mainController"
        })
	      .state('cabinet', {
	        url:'/cabinet/',
	        templateUrl: "/html/cabinet.html",
	        controller: "cabinetController"
        })
	       .state('cabinet.degust', {
	        url:'degust/',
	        templateUrl: "/html/degust.html"
        })
	       .state('cabinet.degust.fleivor', {
	        url:'fleivor/',
	        templateUrl: "/html/fleivor.html"
        })
	       .state('cabinet.degust.grafik', {
	        url:'grafik/',
	        templateUrl: "/html/grafik.html"
        })
	        .state('cabinet.desctipt', {
	        url:'desctipt/',
	        templateUrl: "/html/descript.html"
        })
	        .state('cabinet.desctipt.my', {
	        url:'desctipt/my',
	        templateUrl: "/html/descript-my.html",
	         controller: "desctiptMyController"
        })
	        .state('cabinet.desctipt.standart', {
	        url:'desctipt/standart',
	        templateUrl: "/html/descript-standart.html",
	        controller: "desctiptStandartController"
        })
	  }
	])
