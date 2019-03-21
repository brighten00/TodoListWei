var MongoClient = require("mongodb").MongoClient;

module.exports.InsertNew = function(data, callback) {
  MongoClient.connect("mongodb://localhost:27017", function(err, client) {
    if (err) throw err;
    var db = client.db("todo_db");
    db.collection("Todolist", function(err, collection) {
      if (err) throw err;

      //找id最大值的那一筆, 之後id繼續往上加...
      // 這裡的查找語法有些複雜，可以參照以下網址:
      // https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
      // http://mongodbcanred.blogspot.com/2015/01/mongodb_12.html
      //只回傳id這一項
      //descending order
      collection
        .find({}, { id: 1 })
        .sort({ id: -1 })
        .limit(1)
        .toArray(function(err, items) {
          if (err) throw err;

          var dataset = []; //定義一個新的資料集dataset
          var current = 0;
          if (items.length > 0) {
            current = items[0].id + 1;
          }

          //把傳進來的data，變成一個新的dataset，給insertMany
          // map來對每個元素做處理
          data.map(function(obj) {
            dataset.push({
              id: current++,
              message: obj.message,
              tododate: obj.date
            });
          });

          //把資料集加入mongodb, 可以是一筆或多筆，原作者用insertMany，其實資料只有一筆，可以用inserOne就好了
          collection.insertMany(dataset, function(err, r) {
            callback(r.insertedCount); //計算新增的筆數
          });
        });
    });
  });
};
