angular.module("app")
  .controller("cabinetCtrl", ($scope, $rootScope, $state, $translate, $server)=>{
    $rootScope.lang = "ru"
    $rootScope.translate = $scope.translate = $translate
    $scope.setLang = (lang)=>{
      $rootScope.lang = lang
    }
        $scope.panel ={};
    $scope.valt = {};
    $scope.val =[];
    var v = $scope.val;
    $scope.show =1 ;
    // $scope.panel.product = localStorage.product
    // $scope.$watch("panel.product", (val)=>{
    //     localStorage.product = val
    // })

    $scope.panel.people ="Ткаченко Оксана";
    $scope.panel.product = "Вино" ;
    $scope.panel.proizvod = "ООО «ПТК «ШАБО»";
    $scope.panel.god = 2014;
    $scope.panel.name = "Вино ординарное выдержанное столовое специального типа сухое красное «Каберне-Мерло Гранд Резерв Шабо»";
    $scope.panel.sortv = "Каберне Совиньон, Мерло";
    $scope.panel.metod = "Флейвора";
    $scope.panel.eval = 7;
    v.vish = "5";
    v.gran = "4";
    v.smor = "6";
    v.ej = "5";
    v.sliv = "4";
    v.konf = "3";
    v.saf = "2";
    v.black = "3";
    v.izum = "2";
    v.slivki = "3";
    v.kor = "1";
    v.vanil = "2";
    v.vkus =  "6";
    v.poslevkus = "6";
    v.vpech = "1";
    

    $scope.gouck = ()=> {

        // console.log($scope.panel.people);
        // console.log(0);
    }

// GRAFIK-start//////////////////////////////////////////////////////////////////
    $scope.drawGrafik = ()=> {
        $scope.grafik = [];
        var g = $scope.grafik;
        g.g ="1";

        $scope.labelsRadar =["Вишня", "Гранат", "Смородина", "Ежевика", "Слива", "Конфитюр", "Сафьян", "Черный шоколад", "Изюм", "Сливки", "Корица", "Стручковая ваниль"];
        $scope.dataRadar = [
        [v.vish, v.gran, v.smor, v.ej, v.sliv, v.konf, v.saf, v.black, v.izum, v.slivki, v.kor, v.vanil],
        [0,8]
        ];

        $scope.labelsChart =["Вишня", "Гранат", "Смородина", "Ежевика", "Слива", "Конфитюр", "Сафьян", "Черный шоколад", "Изюм", "Сливки", "Корица", "Стручковая ваниль"];
        $scope.dataChart = [
        [v.vish, v.gran, v.smor, v.ej, v.sliv, v.konf, v.saf, v.black, v.izum, v.slivki, v.kor, v.vanil],
        [0]
        ];

        $scope.labelsArea =["Вишня", "Гранат", "Смородина", "Ежевика", "Слива", "Конфитюр", "Сафьян", "Черный шоколад", "Изюм", "Сливки", "Корица", "Стручковая ваниль"];
        $scope.dataArea = [v.vish, v.gran, v.smor, v.ej, v.sliv, v.konf, v.saf, v.black, v.izum, v.slivki, v.kor, v.vanil];
    }
    $scope.drawGrafik();
//GRAFIK-end/////////////////////////////////////////////////////////////////

//RANDOM-start/////////////////////////////////////////////////////////////////
     $scope.random = ()=> {
        var rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
        $scope.rand = Math.round(rand);
    }
//RANDOM-end/////////////////////////////////////////////////////////////////


//RELOAD-start/////////////////////////////////////////////////////////////////
    $scope.reload =()=> {
        location.reload()
    }
//RELOAD-end/////////////////////////////////////////////////////////////////
    // $scope.count = 0 ;
    // var count = $scope.count;
    // $scope.nTimes = (n)=>{ 
    //     // console.log(count);
    // var arr = []; 
    // for(var i=0;i<n;i++)arr.push(i); 
    // return arr; 

    // }



  })


