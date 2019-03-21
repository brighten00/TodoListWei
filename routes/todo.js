var express = require("express");
var router = express.Router();

// load mongodb-CURL
var modelCreate = require("../model/todocreatedb.js");
var modelUpdate = require("../model/todoupdatedb.js");
var modelRemove = require("../model/todoremovedb.js");
var modelQuery = require("../model/todoquerydb.js");

// middleware that is specific to this router
router.use(function(req, res, next) {
  console.log("Now the server is working.");
  next(); // make sure we go to the next routes and don't stop here
});

// READ ALL & FORM (/restful/todo)
router.get("/todo", function(req, res) {
  //mongodb find all.....
  modelQuery.QueryGet({}, function(record) {
    if (req.xhr) res.render("recordTP", { layout: false, itemlist: record });
    else res.render("restfulTP", { itemlist: record });
  });
});

// CREATE (/restful/todo)
router.post("/todo", function(req, res) {
  // ...
  var dataset = [{ date: req.body.date, message: req.body.momsg }];
  modelCreate.InsertNew(dataset, function(msg) {
    return res.redirect("/restful/todo");
  });

  //res.send("you push a request to create");
});

// READ (/restful/todo/:id)
// 這邊要注意的：這裡的id是網址列後的搜尋字串
// 在用 req.params是根據路由給的參數名稱, 與req.body的不同處!
// 如果你怕會搞混, 請修改!
router.get("/todo/:id", function(req, res) {
  // mongodb find one or all...
  var dataset = { message: req.params.id };
  modelQuery.QueryGet(dataset, function(record) {
    if (req.xhr) res.render("recordTP", { layout: false, itemlist: record });
    else res.render("restfulTP", { itemlist: record });
  });
  //res.send("you push a request to read one");
});

// UPDATE ((/restful/todo/:id))
router.put("/todo/:id", function(req, res) {
  // ...
  var dataset = {
    id: parseInt(req.params.id),
    message: req.body.momsg,
    date: req.body.datetodo
  };

  modelUpdate.UpdateSave(dataset, function(record) {
    res.render("oneTP", {
      layout: false,
      oneid: record.id,
      onemsg: record.message,
      onedate: record.date
    });
  });
  //res.send("you push a request to put! " + req.body.moid+req.body.momsg);
});

// DELETE (/restful/todo/:id)
router.delete("/todo/:id", function(req, res) {
  // ...
  var dataset = { id: parseInt(req.params.id) };
  modelRemove.RemoveSave(dataset, function(msg) {
    res.send(msg);
  });
});

module.exports = router;
