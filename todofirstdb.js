var MongoClient = require("mongodb").MongoClient;

module.exports.InsertNew = function(data, callback) {
  MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    function(err, client) {
      var db = client.db("todo_db");
      if (err) throw err;
      //Write databse Insert/Update/Query code here..

      db.collection("Todolist", function(err, collection) {
        if (err) throw err;
        //把資料集加入mongodb, 可以是一筆或多筆
        collection.insertMany(data, function(err, r) {
          callback(); //計算新增的筆數
          console.log("i did");
        });
      });
    }
  );
};
