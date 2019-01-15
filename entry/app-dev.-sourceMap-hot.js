import './../css/base.css';
import './../css/common.css';
import './../less/index.less';
import './../scss/index.scss';
class Index{
  ajax(){
    $.ajax({
      method:'post',
      url:"/sop/manager/manageCorps.json",
      data:JSON.stringify({
        n: 50,
        operId: "U1000002",
        s: 0,
        token: "rdpdsBgioZ4ysg8dcY-gtCpWyrqK6HVMnMPoeARMlJCFdCS9:U1000002"
      }),
      contentType: "application/json; charset=utf-8",
      async:false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      dataType: 'json',
      success:function (data) {
        console.log(data)
      },
      error:function (err) {
        console.log(err)
      }
    })
  }
  api(){
    $.ajax({
      method:'post',
      url:"/api",
      data:JSON.stringify({
        page:1
      }),
      contentType: "application/json; charset=utf-8",
      async:false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      dataType: 'json',
      success:function (data) {
        console.log(data)
      },
      error:function (err) {
        console.log(err)
      }
    })
  }
  test(){
    const [first,...others]=[1,2,3,4,5];
    if(module.hot){
      module.hot.accept()
    }
    console.log(first);
  }
  ul(){
    $("#ul").empty();
    $("#ul").append('<li>22</li>')
  }
}
var index=new Index();
index.test();
index.ul();

