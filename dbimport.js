var datasets=require('./recordset.js');  //先載入原本的資料集, 建立mogodb資料庫
var modelCreate=require('./todofirstdb.js'); //引入建立資籵庫的操作         
 
modelCreate.InsertNew(datasets,function(res){
    console.log(res); //res 是回應的新增筆數
});