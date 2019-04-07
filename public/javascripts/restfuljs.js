var reqdata = {};

//做新增 button 的處理...
$("#plus").on("click", function() {
  var datetodo = $("#datetodo").val();

  reqdata = { momsg: $("#MsgTB").val(), date: datetodo };
  //把資料送給後端做處理。
  //這裡寫post ... url:'./restful/todo'
  $.ajax({
    url: "/restful/todo",
    type: "post",
    data: reqdata
  }).done(function(result) {
    alert("ok!");
    $("#itemset").html(result);
    daysTodo();
  });
});

//做搜尋 button 的處理...
$("#search").on("click", function() {
  reqdata = { momsg: $("#MsgTB").val() };
  //把資料送給後端做處理。
  //這裡寫get ... url:'./restful/todo/fasdfkmkmkoika'
  $.ajax({
    url: "/restful/todo/" + reqdata.momsg,
    type: "get"
  }).done(function(result) {
    $("#itemset").html(result);
    daysTodo();
  });
});

function daysTodo() {
  var rx = document.getElementsByClassName("record");
  for (let i = 0; i < rx.length; i++) {
    var da = rx[i].id.replace("record", "date");
    // console.log(rx[i].getElementsByClassName(da)[0].textContent);
    let days = calDaysTodo(rx[i].getElementsByClassName(da)[0].textContent);
    if (days > 0) {
      rx[i].getElementsByClassName("dstodo")[0].innerHTML =
        "In " + days + " days";
    } else if (days < 0) {
      rx[i].getElementsByClassName("dstodo")[0].innerHTML =
        "Expired " + Math.abs(days) + " days ago";
    } else {
      rx[i].getElementsByClassName("dstodo")[0].innerHTML =
        "It today. Just do it!";
    }
  }
}

function calDaysTodo(date) {
  var nowdate = new Date();
  nowdateD = nowdate.getDate();
  nowdateM = nowdate.getMonth() + 1;
  nowdateY = nowdate.getFullYear();

  if (date == nowdateY + "-" + nowdateM + "-" + nowdateD) {
    return 0;
  } else {
    var dateS, date1, date2, difDays;
    dateS = date.split("-");
    date1 = new Date(dateS[1] + "-" + dateS[2] + "-" + dateS[0]);
    date2 = new Date(+nowdateM + "-" + nowdateD + "-" + nowdateY);
    difDays = parseInt((date1 - date2) / 1000 / 60 / 60 / 24);
    return difDays;
  }
}

window.onbeforeunload = daysTodo;
