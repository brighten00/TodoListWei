var express = require('express');
var app = express();
// var dataset=require('./recordset.js'); //要有資料來做頁面呈現, 所以直接匯入!
var todoRouter= require('./routes/todo');
var bodyParser = require( 'body-parser' );
 
//set view engine
app.set("view engine","jade")
//set view directory
app.set("views",__dirname+"/MyViews")　// 樣版所在位置

// configure app to use bodyParser()
// this will let us get the data from Request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
 
app.use('/restful', todoRouter);
 
app.use('/restful',express.static(__dirname+'/public')); //一些必要的javascript, css皆放入此!!
app.listen(3000,function(){
    console.log('Ready...for 3000');
});