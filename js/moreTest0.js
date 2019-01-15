import jsTree from "./moreModule";
class pesron{
  console(){
    console.log(jsTree.sum(5,6));
  }
  btnClick(){
    var app=document.querySelector("#app");
    app.addEventListener('click',function () {
      console.log(app);
    })
  }
}
var obj=new pesron();
obj.console();
obj.btnClick();
