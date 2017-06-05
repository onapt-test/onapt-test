angular.module("app")
  .controller("mainController", ($scope, $rootScope, $state, $translate, $server)=>{
    $rootScope.lang = "ru"
    $rootScope.translate = $scope.translate = $translate
    $scope.setLang = (lang)=>{
      $rootScope.lang = lang
    }
    $scope.user = {}
    $scope.register = ()=> {
      if (!$scope.user.login || !$scope.user.password) {
        $scope.user.error = "Заполните все поля";
      } else {
        $scope.user.error = "";
      	$server.register({login: $scope.user.login, password: $scope.user.password}, (err,data)=>{
          $scope.$apply(()=>{
            if(!err) {
              localStorage.clientToken = data.token
              $scope.user.error = "";
              $scope.user.successful = "Регистрация прошла успешно";
              $state.go('cabinet');
            }
            else if (err.err.code == 1) {
              $scope.user.successfu = "";
              $scope.user.error = "Пользователь существует";
            }
          })
        })
      }
    }
    $scope.login = ()=> {
      if (!$scope.user.login || !$scope.user.password) {
        $scope.user.error = "Заполните все поля";
      } else {
        $scope.user.error = "";
        $server.login ({login: $scope.user.login, password: $scope.user.password}, (err,data)=> {
          $scope.$apply(()=>{
            if (!err) {
              localStorage.clientToken = data.token
              $state.go("cabinet");
            }
            else if (err.err.code == 2) {
              console.log(2);
              $scope.user.successfu = "";
              $scope.user.error = "Неверный логин";
            }
            else if (err.err.code == 3) {
              console.log(3);
              $scope.user.successfu = "";
              $scope.user.error = "Неверный пароль";
            }
          })
        })
      }
    }
  })