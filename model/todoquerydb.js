var MongoClient = require("mongodb").MongoClient;
// 目前只針對message做搜尋
module.exports.QueryGet = function(data, callback) {
  MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    var db = client.db("todo_db");
    if (err) throw err;
    db.collection("Todolist", function(err, collection) {
      // 有則搜尋，沒有則返回全部
      if (data.message)
        // 這裡的find用到正則表達式，參照:http://www.runoob.com/mongodb/mongodb-regular-expression.html
        collection
          .find({ message: { $regex: ".*" + data.message + ".*" } })
          .toArray(function(err, items) {
            if (err) throw err;
            callback(items);
          });
      else
        collection.find({}).toArray(function(err, items) {
          if (err) throw err;
          callback(items);
        });
    });
  });
};
