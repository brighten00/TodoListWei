var reqdata = {};

//做列表items button 的處理....
// $('#itemset button').click(function(){
$("#itemset").on("click", "button", function() {
  // gets the id of a clicked button
  var obj = $(this).attr("id");
  var itemid = "";
  // 檢測obj中是否含該字串
  if (/pencil/.test(obj)) {
    itemid = obj.replace(/pencil/gi, "");
    var spancs = "#itemset span." + obj; //這筆按鈕的span 尋找方式字串。
    var spandat = "#itemset span." + ("date" + itemid);
    var getmsg = $(spancs).text(); //取得所選的這筆資料。
    var getdat = $(spandat).text();

    $("#myModal")
      .find($("#message-text"))
      .val(getmsg); //把資料送給對話框裡的textbox
    reqdata = { moid: itemid, momsg: getmsg, datetodo: getdat }; //把id記錄下來。
  }

  if (/remove/.test(obj)) {
    //刪除...
    itemid = obj.replace(/remove/gi, "");
    reqdata = { moid: itemid };
    //移除單一資料，直接做!!
    //這裡寫delete ... url:'./restful/todo/1'
    $.ajax({
      url: "/restful/todo/" + reqdata.moid,
      type: "DELETE"
    }).done(function(resp) {
      var oneset = "div#record" + reqdata.moid;
      $(oneset).remove();
      alert(resp);
    });
  }
});

//做修改 儲存 button 的處理...
$("#myModal #saveitem").on("click", function() {
  var postdata = $("#myModal")
    .find($("#message-text"))
    .val();
  if (postdata !== "") {
    reqdata.momsg = postdata; //原先的資料會更改成這個...

    //把資料送給後端做處理。
    //這裡寫put ... url:'./restful/todo/1'
    $.ajax({
      url: "/restful/todo/" + reqdata.moid,
      type: "PUT",
      data: reqdata
    }).done(function(result) {
      var oneset = "#itemset div#record" + reqdata.moid;
      $(oneset).html(result); //更新完後，將結果覆蓋原本的div#+id
      daysTodo(); //這裡要再一次執行js讓日期後面的差距天數的功能能夠執行
    });

    //將dialog隱藏
    $("#myModal").modal("hide");
  } else {
    alert("Please enter the thing you need to do!");
  }
});
