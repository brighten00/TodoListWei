var MongoClient = require("mongodb").MongoClient;
// 只對message做修改
module.exports.UpdateSave = function(data, callback) {
  MongoClient.connect("mongodb://localhost:27017/tododb", function(
    err,
    client
  ) {
    var db = client.db("todo_db");
    if (err) throw err;
    // 可以參照:https://docs.mongodb.com/manual/reference/method/db.collection.findAndModify/
    // 但是跟這裡的寫法有差，或是參照這裡https://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html
    db.collection("Todolist").findAndModify(
      { id: data.id },
      [],
      { $set: { message: data.message } },
      { new: true },
      function(err, doc) {
        if (err) throw err;
      }
    );
    callback(data);
  });
};
