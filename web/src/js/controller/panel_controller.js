angular.module("app")
  .controller("panelCtrl", ($scope, $rootScope, $state, $translate, $server)=>{
    $scope.getActiveTasting=()=>{
      $server.getActiveTasting ({}, (err,data)=> {
        $scope.$apply(()=>{
          if(!err) {
            console.log(data)
            $scope.session = data.data
            console.log($scope.session)
          }
        })
      })
    }
    $scope.getActiveTasting()
    $scope.entry=(id,passw)=>{
      $server.entrySession ({testId: id,pass: passw }, (err,data)=>{
        if(!err) {
          console.log("nice");
        } else {
          console.log("bad");
        }

      })
      
    }
  })