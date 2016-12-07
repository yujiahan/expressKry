$(function(){
    $.get("/loadTotal", function(result){
        if(result.orderCounts) {
            $("#general").find(".js-payed").text(result.orderCounts[0].totalSum);
            $("#general").find(".js-noPayed").text(result.orderCounts[2].totalSum);
            $("#general").find(".js-allPayed").text((parseFloat(result.orderCounts[0].totalSum) + parseFloat(result.orderCounts[2].totalSum)).toFixed(2));
            $("#general").find(".js-card").text(result.orderCounts[1].totalSum);
        }
    })

})