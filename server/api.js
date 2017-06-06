module.exports = (db)=>{
  return (method,data,callback)=>{
    var usersCollection = db.collection('users');
    var standartDescriptCollection = db.collection('standartDescriptions');
    var userDescriptCollection = db.collection('userDescriptions');
    var testCollection = db.collection('test');
    generateToken = ()=>{
      var str=""
      var alp="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789"
      for(var i=0;i<20;i++){
        c= alp[Math.floor(Math.random()*alp.length)]
        str+=c
      }
      return str;
    }
    generateId = (callback)=>{
      var rand = 1000 - 0.5 + Math.random() * (9999 - 1000 + 1)
      rand = Math.round(rand);

      usersCollection.findOne({
        userId: rand
      }, (err,data)=>{
        if(!data) {
          callback(rand);
        } else {
          generateId();
        }
      })
    }
    api = {
      login: (data, callback)=>{
        user = usersCollection.findOne({
          login: data.login
          // password: data.password
        }, (err,data2)=>{
          console.log(err,data2);
          if(!data2) {
            callback({err: "user not exist", code: 2}, null)
          } else {
            // callback(null, {message: "login ok!"})
            usersCollection.findOne({
              login: data.login,
              password: data.password
            }, (err,data3)=>{
              if(!data3){
                callback({err: "invalid password", code: 3}, null)
              } else {
                callback(null, {message: "login ok",token:data3.token})
              }
            })
          }
        })

      },
      register: (data,callback)=> {
        if(data) {
          usersCollection.findOne({
            login: data.login
          }, (err,data2)=>{
            if(data2) {
              callback({err: 'user already exist', code: 1}, null)
            } else {
              generateId((userId)=> {
                data.userId = userId;
                data.token = generateToken();
                usersCollection.insert(data);
                callback(null, {message: "register ok", token: data.token, userId: data.userId});
              })
            }
          })
        }
      },
      getStandartDescription: (data, callback)=> {
        standartDescriptCollection.findOne({}, (err,data2)=>{
          if(data2) {
            callback(null,{data: data2})
          }
        })
      },
      getMyDescription: (data,callback)=> {
        console.log(data);
        if(data) {
          usersCollection.findOne({
            token: data.clientToken
          }, (err,data2)=>{
            console.log(err,data2)
            if(data2) {
              userDescriptCollection.findOne({
                userId: data2.userId
              }, (err,data3)=> {
                if(data3) {
                  callback(null, data3)
                } else {
                  callback({message: "нет своего набора"}, null)
                }
              })
            }
          })
        }
      },
      editDescription: (data,callback)=> {
        testCollection.update({test1: "test1"},{$set:{val4: 4}}, (err,data)=>{
          console.log(data)
        })
      }



    }
    if(!api[method]) {
      
      callback({err: "Method not exist"})
      
    } else {
      api[method](data, callback)
    }
    
  }
}