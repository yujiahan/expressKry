$(function(){
   $("#getOrderList").click(function(){
       $.get("/getOrderList?sessionId="+ $(":input#sessionId").val() + "&date="+ $("#date").val(), function(result){
           $("#result").val(result);
       })
    })
})