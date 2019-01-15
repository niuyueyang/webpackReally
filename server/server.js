
let request = require('request');
let url= "http://sop.ydtcloud.com/sop/manager/manageCorps.json";

request({
  method:"POST",
  url:url,
  headers:{
    "content-type":"application/json;charset=utf-8"
  },
  body:{
    n: 50,
    operId: "U1000002",
    s: 0,
    token: "rdpdsBgioZ4ysg8dcY-gtCpWyrqK6HVMnMPoeARMlJCFdCS9:U1000002"
  },
  json:true      //这个针对body是不是支持json

},(error,response,body)=>{
  console.log(JSON.stringify(body.datas));


})

