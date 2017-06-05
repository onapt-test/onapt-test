angular.module("app")
  .controller("cabinetController", ($scope, $rootScope, $state, $translate, $server)=>{
    $rootScope.lang = "ru"
    $rootScope.translate = $scope.translate = $translate
    $scope.setLang = (lang)=>{
      $rootScope.lang = lang
    }

    $scope.server = ()=> {
    	$scope.user = "user"
   		$server.login($scope.user, (err,data)=>{
            $scope.$apply(()=>{
              if(!err) {
                $state.go("cabinet")
              }
              else
              	console.log("bad req")
            })
            
          })
    }

    $scope.login = ()=> {
      $server.login({user: "orion", pass: "lol"}, (err,data)=>{
        $scope.$apply(()=>{
          if(!err) {
            $state.go("cabinet")
          }
          else
            console.log("bad req")
        })
        
      })
    }




     $scope.phones = [{
        name: 'Nokia Lumia 630',
        year: 2014,
        price: 200,
        company: {
            name: 'Nokia',
            country: 'Финляндия'
        }
    },{
        name: 'Samsung Galaxy S 4',
        year: 2014,
        price: 400,
        company: {
            name: 'Samsung',
            country: 'Республика Корея'
        }
    },{
        name: 'Mi 5',
        year: 2015,
        price: 300,
        company: {
            name: 'Xiaomi',
            country: 'Китай'
        }
    }]

  })