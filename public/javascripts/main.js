$(function(){
    var finalDistribute = [];
    var TIMEZONE = [
        {
            "start": "11:00:00",
            "end": "11:19:59"
        },
        {
            "start": "11:20:00",
            "end": "11:39:59"
        },
        {
            "start": "11:40:00",
            "end": "11:59:59"
        },
        {
            "start": "11:40:00",
            "end": "11:59:59"
        },
        {
            "start": "12:00:00",
            "end": "12:19:59"
        },
        {
            "start": "12:20:00",
            "end": "12:39:59"
        },
        {
            "start": "12:40:00",
            "end": "12:59:59"
        },
        {
            "start": "13:00:00",
            "end": "13:19:59"
        },
        {
            "start": "13:20:00",
            "end": "13:39:59"
        },
        {
            "start": "13:40:00",
            "end": "13:59:59"
        },


    ]

    //生成优惠分布数组
    for(var i = 0; i < TIMEZONE.length; i++){
        finalDistribute.push({
            count:0,
            discount:""
        })
    }
   $("#getOrderList").click(function(){
       $.get("/getOrderList?sessionId="+ $(":input#sessionId").val() + "&date="+ $("#date").val(), function(result){

           /*$("#result").val(
               finalDistribute
           );*/
           debugger;

           var orderList = JSON.parse(result).data.items;
           countTotalOrderNum(orderList);
           console.log(finalDistribute);
       })
    })




    /**
     * 计算金额核心优惠
     **/
    var DISCOUNTLIMIT = 8; // 小于固定桌数有优惠
    function calcuDiscount(orderCount){
        if(orderCount < DISCOUNTLIMIT) {
            return  (50*(8-orderCount)/(8*orderCount)).toFixed(2);
        } else {
            return 0;
        }
    }

    /**
     * 统计时段内的订单数
     * @param timeZone
     */
    function countTotalOrderNum(data){
        $.each(data||[], function(idx, item){
            var timezone = getTimezoneNum(item.serverCreateTime);
            finalDistribute[timezone]&&finalDistribute[timezone].count++;
        })
    }

    /**
     * 计算所处时区编码
     */
    function getTimezoneNum(createTime){
        var timezone;
        $.each(TIMEZONE, function(idx, item){
            var timeParse =  createTime.split(" ")[1].replace(/:/g, "");
            if(timeParse < item.end.replace(/:/g, "") && timeParse >= item.start.replace(/:/g, "")){
                timezone = idx;
                return true;
            }
        })

        return timezone;
    }
})