$(function(){
    $.get("/loadTotal", function(result){
        if(result.success) {
            $("#general").find(".js-payed").text(result.data.buzAmount.today);
            $("#general").find(".js-noPayed").text(result.data.noPayAmount.today);
            $("#general").find(".js-allPayed").text((parseFloat(result.data.buzAmount.today) + parseFloat(result.data.noPayAmount.today)).toFixed(2));
            $("#general").find(".js-card").text(result.data.storedAmount.today);
        }
    })
    $.get("/getOrderList", function(result){
        var noonTotal = 0;
        var nightTotal = 0;


        $.each(result.data.items||[], function(idx,item){
            if(item.tradeStatusName !=="已退款" && item.tradeStatusName !=="已作废") {
                if(item.serverCreateTime.split(" ")[1].split(":")[0] < 16) {
                    noonTotal += item.custShouldPay;
                } else {
                    nightTotal += item.custShouldPay;
                }
            }
        })
        $("#general").find(".js-noonTotal").text(noonTotal.toFixed(2));
        $("#general").find(".js-nightTotal").text(nightTotal.toFixed(2));
    })

    $.get("/loadPeriodTotal?type=lastWeek&r="+ Math.random(), function(result){
        $("#general").find(".js-lastWeek").text(result.lastWeek);
        $("#general").find(".js-thisWeek").text(result.thisWeek);
        $("#general").find(".js-thisMonth").text(result.thisMonth);
    })

    $.get("/getAvgPersonToday", function(result){
        $("#general").find(".js-avgPerson").text(result.data.customerUnitPrice);
    })

})