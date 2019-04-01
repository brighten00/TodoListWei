var MongoClient = require("mongodb").MongoClient;
module.exports.QueryGet = function(data, callback) {
  var userdata = {};
  MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    var db = client.db("todouser");

    if (err) throw err;
    db.collection("userdata", function(err, collection) {
      // if (data) {
      collection.findOne({ user_name: "user" }, function(err, result) {
        if (err) throw err;
        // console.log(result);
        userdata = result;
        console.log(userdata);
        callback(userdata);
        // 在裡面使用return會出現undefined
        // return userdata;
      });
      // }
    });
  });
  // 原本是想用retrun的方式讓值傳到外面的，但實際上因為執行順序或速度的差異，不管如何都會是空值先出去
  // return userdata;
};
