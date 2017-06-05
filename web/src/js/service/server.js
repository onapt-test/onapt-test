angular.module("app")
  .factory('$server', ($state, $rootScope)=>{
    var api = {}
    var methods = [
      'register',
      'login',
      'getStandartDescription',
      'editDescription',
    ]
    var addMethod = (methodName)=>{
      api[methodName] = (data, callback)=>{
        var domain = "localhost:8000"
        // $rootScope.api = domain = "vk.com"
        
        // data.cookies = {
        //   sessionId: localStorage.token
        // }
        data.token = localStorage.token
        var request = $.ajax({
          url: 'http://'+domain+'/call/'+methodName,
          method: 'POST',
          contentType: "application/json;charset=utf-8",
          headers: {
            'sessionidcors': localStorage.token
          },
          data: JSON.stringify(data),
          dataType: 'json'
        })
        request.done((data)=>{
          if(data.err && data.err.message == "Invalid session"){
            delete localStorage.token
            $state.go('main')
          };
          callback(data.err, data.data)
        })

        request.fail((xhr)=>{
          callback(xhr.responseJSON)
        })
      }
    }

    for(var method in methods) {
      addMethod(methods[method])
    }
    return api;
  })
