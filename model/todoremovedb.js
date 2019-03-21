var MongoClient = require("mongodb").MongoClient;
// 對資料做刪除
module.exports.RemoveSave = function(data, callback) {
  MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    var db = client.db("todo_db");
    if (err) throw err;
    //Write databse Insert/Update/Query code here..
    db.collection("Todolist", function(err, collection) {
      // https://docs.mongodb.com/manual/reference/method/db.collection.remove/
      collection.remove({ id: data.id }, { w: 1 }, function(err, result) {
        if (err) throw err;
        callback("Document Removed Successfully!");
      });
    });
  });
};
