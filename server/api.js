module.exports = (db)=>{
  return (method,data,callback)=>{
    var usersCollection = db.collection('users');
    var standartDescriptCollection = db.collection('standartDescriptions');
    var userDescriptCollection = db.collection('userDescriptions');
    var tastingCollection = db.collection('tasting');
    var activeTastingCollection = db.collection('activeTasting');
    var wheelCollection = db.collection('wheel');
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
      var rand = 10000 - 0.5 + Math.random() * (99999 - 10000 + 1)
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
    generateIdCollection = (callback)=>{
      var rand = 10000 - 0.5 + Math.random() * (99999 - 10000 + 1)
      rand = Math.round(rand);
      userDescriptCollection.findOne({
        collectionId: rand
      }, (err,data)=>{
        if(!data) {
          callback(rand);
        } else {
          generateIdCollection();
        }
      })
    }
    generateIdTasting = (callback)=>{
      var rand = 10000 - 0.5 + Math.random() * (99999 - 10000 + 1)
      rand = Math.round(rand);
      activeTastingCollection.findOne({
        testId: rand
      },(err,data)=>{
        if(!data) {
          callback(rand);
        }
        else {
          generateIdTasting();
        }
      })
    }
    api = {
      login: (data, callback)=>{
        usersCollection.findOne({
          login: data.login
          // password: data.password
        }, (err,data2)=>{
          // console.log(err,data2);
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
      register: (data,callback)=>{
        if(data) {
          usersCollection.findOne({
            login: data.login
          }, (err,data2)=>{
            if(data2) {
              callback({err: 'user already exist', code: 1}, null)
            } else {
              generateId((userId)=>{
                data.userId = userId;
                data.token = generateToken();
                usersCollection.insert(data);
                callback(null, {message: "register ok", token: data.token, userId: data.userId});
              })
            }
          })
        }
      },
      getWheel: (data, callback)=>{
        wheelCollection.findOne({}, (err,data2)=>{
          if(data2) {
            callback(null,{data: data2})
          }
        })
      },
      getMyDescription: (data,callback)=>{
        if(data) {
          usersCollection.findOne({
            token: data.token
          }, (err,data2)=>{
            if (data2) {
              userDescriptCollection.find({
                userId: data2.userId
              }, (err,data3)=>{
                if(data3){
                  callback(null,{message:"find collection", data: data3})
                } else {
                  callback({message:"not found"}, null)
                }
              })
            }
          })
        }
      },
      editDescription: (data,callback)=>{
        if(data.token) {
          usersCollection.findOne({
            token: data.token
          }, (err,data2)=>{
            generateIdCollection((id)=>{
              idCollection = id;
              userDescriptCollection.insert({
                idCollection: idCollection,
                userId: data2.userId,
                product: data.product,
                descript: data.descript
              })
              callback(null, {message: "editDescription ok"});
             })
          })
        }
      },
      deleteMyDescription: (data,callback)=>{
        if(data) {
          userDescriptCollection.remove({
            idCollection: data.id
          }, (err,data2)=>{
            if(data2){
              callback(null, {message: "successful delete"});
            } else {
              callback({message: "error"}, null)
            }
          })
        }
      },
      getActiveTasting: (data,callback)=>{
        console.log(data)
        activeTastingCollection.find({},(err,data2)=>{
          if(data2){
            for(var i =0; i<data2.length; i++){
              data2[i].pass = null;
              data2[i].descriptions = null;
            }
            callback(null, {data: data2});
            console.log(data2);
          } else {
            callback({message: "server error"}, null);
          }
        })
      },
      entrySession: (data, callback)=>{
        console.log(data)
        activeTastingCollection.findOne({
          pass: data.pass,
          testId: data.testId
        },(err,data2)=>{
          // console.log(err,data2)
          if(data2){
            callback(null,{message: "successful"})
          } else {
            callback({message:"error"}, null)
          }
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