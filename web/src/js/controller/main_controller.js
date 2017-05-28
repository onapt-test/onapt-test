angular.module("app")
  .controller("mainController", ($scope, $rootScope, $state, $translate)=>{
    $rootScope.lang = "ru"
    $rootScope.translate = $scope.translate = $translate
    $scope.setLang = (lang)=>{
      $rootScope.lang = lang
    }
    $scope.user = {}
    $scope.register = ()=> {
    	$server.register($scope.user, (err,data)=>{
            $scope.$apply(()=>{
              if(!err) {
                $state.go("cabinet")
              }
              else
              	console.log("bad req");
            })
          })
    }
  })