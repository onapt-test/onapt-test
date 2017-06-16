angular.module("app")
  .controller("desctiptStandartCtrl", ($scope, $rootScope, $state, $translate, $server)=>{
    $scope.getWheel =()=> {
      $server.getWheel({},(err,data)=> {
        $scope.$apply(()=>{ 
          if(!err){
            $scope.wheel = data.data.wheel
            console.log($scope.wheel);
          }
        })
      })
    }
    $scope.getWheel();
  })

  .controller("desctiptMyCtrl", ($scope, $rootScope, $state, $translate, $server)=>{
    $scope.user = {
      product: [],
      descript: []
    }
    $scope.check = {};
    $scope.deleteAll=()=> {
      $scope.user.product = [];
      $scope.user.descript = [];
    }
    $scope.getMyDescription=()=> {
      $server.getMyDescription({}, (err,data)=> {
        $scope.$apply(()=>{
          if(!err){
            $scope.myDescript = data.data;
            // console.log($scope.myDescript);
          }
        })
      })
    }
    $scope.getMyDescription();
    $scope.addProd=()=> {
      $scope.user.product.push("");
      $scope.check.prodbutton=true;
    }
    $scope.deleteProd=(index)=> {
      $scope.user.product.splice(index,1);
      $scope.check.prodbutton=false;
    }
    $scope.addDescr=()=> {
      $scope.user.descript.push("");
    }
    $scope.deleteDescr=(index)=> {
      $scope.user.descript.splice(index,1);
    }
    $scope.editDescription=()=> {
      $server.editDescription ($scope.user, (err, data)=> {
        $scope.$apply(()=>{
          if(!err){
            $scope.check.prodbutton=false;
            $scope.user = {};
            $scope.getMyDescription();
            $scope.deleteAll();
          } else {
            console.log('err');
          }
        })
      })
    }
    $scope.deleteSet=(index)=> {
      $server.deleteMyDescription ({id: $scope.myDescript[index].idCollection}, (err,data)=> {
        if(!err) {
          $scope.getMyDescription();
        }
      })
    }
  })