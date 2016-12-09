$(function(){
    $.get("/loadTotal", function(result){
        if(result.orderCounts) {
            $("#general").find(".js-payed").text(result.orderCounts[0].totalSum);
            $("#general").find(".js-noPayed").text(result.orderCounts[2].totalSum);
            $("#general").find(".js-allPayed").text((parseFloat(result.orderCounts[0].totalSum) + parseFloat(result.orderCounts[2].totalSum)).toFixed(2));
            $("#general").find(".js-card").text(result.orderCounts[1].totalSum);
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

})