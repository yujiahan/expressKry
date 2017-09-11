function login(){
    $.post("/dologin", $('form').serialize()).error(function(){
        window.location = location.href;
    });
}
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
    function distributeInit(){
        finalDistribute = [];

        for(var i = 0; i < TIMEZONE.length; i++){
            finalDistribute.push({
                count:0,
                discount:""
            })
        }
    }

   $("#getOrderList").click(function(){
       $("#loading").show();

       $.get("/getOrderList?fromDate="+ $("#date").val() + "&toDate=" + $("#date").val(), function(result,status,xhr){
           $("#loading").hide();
           distributeInit(); //初始化数组
           if(!result || xhr.getResponseHeader("Content-Type") == "text/html;charset=UTF-8"){

               $("#result").html($(result).find("#credential").html());
               $("#result").find("#username").val("xxxxx");
               $("#result").find("#loginId").val("xxxxx");
               $("#result").find("#password").val("xxxxx");
               return;
           }

           var orderList = result.data.items;
           countTotalOrderNum(orderList);

           $.each(finalDistribute, function(idx, item){
               item.discount = calcuDiscount(item.count);
           })
           var totalDiscount = 0;
           var text = ["日期:"+ result.data.startDate.split(" ")[0]+"<br/>"];
           text.push("<table class='striped'><thead><tr>" +
                     "<th>桌号</th>" +
                     "<th>订单优惠</th>" +
                     "<th>下单时间</th>" +
                     "<th>订单号</th>" +
                     "</tr></thead><tbody>")
           $.each(orderList||[], function(idx, item){
               var timeParse =  item.serverCreateTime.split(" ")[1].replace(/:/g, "");
               if(timeParse <= "140000" && timeParse >= "110000" && item.tableInfo&& item.tradeStatusName !=="已退款" && item.tradeStatusName !=="已作废"){
                   text.push("<tr><td><span class="+ (item.tradePayStatusName==="已支付"? "green-text":"red-text")+">" + item.tableInfo + "("+ item.tradePayStatusName +")"+"</span></td><td>"+ countPromotion(item.serverCreateTime, orderList)+ "</td><td>"+ item.serverCreateTime + "</td><td>"+ item.tradeNo +"</tr>");
                   totalDiscount += parseFloat(countPromotion(item.serverCreateTime, orderList));
               }
           })
           text.push("</tbody></table>")

           text.push("<p style='color:red;font-size:16px;'>新总优惠额为:" + totalDiscount.toFixed(2) + "</p>");

           $("#result").html(text.join(""));
           var oldText = ["========================"];

           var totalOldDiscount = 0;

           $.each(finalDistribute, function (idx, item) {
               oldText.push("<p>时间段:" + TIMEZONE[idx].start + "~" + TIMEZONE[idx].end + "订单数量:" +
                   item.count + "优惠金额:" + item.discount + "</p>");
               totalOldDiscount += item.count * item.discount;
           })
           oldText.push("<p style='color:red;font-size:16px;'>旧总优惠额为:" + totalOldDiscount.toFixed(2) + "</p>");

           $("#result").append(oldText.join(""));

/*           var orderRank = [];


            $.each(orderList, function(idx, item){
                var timeZone = getTimezoneNum(item.serverCreateTime);
                if(timeZone !== null && finalDistribute[timeZone].discount) {
                    orderRank.push({
                        serverCreateTime : item.serverCreateTime,
                        discount: finalDistribute[timeZone].discount,
                        discountRate: (100*finalDistribute[timeZone].discount/ (item.custShouldPay)).toFixed(3)
                    })
                }

            })

           var rankingHtml = [];
           $.each(orderRank, function(idx, item){
               rankingHtml.push ("<p>下单时间:"+ item.serverCreateTime +"优惠金额:" +
                   item.discount + "优惠率:"+ item.discountRate + "</p>")
           })

           $("#result").append(rankingHtml.join(""));*/
       })
    })




    /**
     * 计算金额核心优惠
     **/
    var DISCOUNTLIMIT = 8; // 小于固定桌数有优惠
    function calcuDiscount(orderCount){
        if(orderCount < DISCOUNTLIMIT &&  orderCount>0) {
            return  (50*(8-orderCount)/(8*orderCount)).toFixed(2);
        } else {
            return 0;
        }
    }

    /**
     *
     */
    function countPromotion(orderDate, orderList){
        var count = 0;
        var orderMs =  new Date(orderDate.replace(/-/g, "/")).getTime();

        $.each(orderList ||[], function(idx, item){
            var compareMs = new Date(item.serverCreateTime.replace(/-/g, "/")).getTime();
            if(item.tableInfo && item.tradeStatusName !=="已退款" && item.tradeStatusName !=="已作废" && Math.abs(compareMs - orderMs)<= 10*60*1000){
                count ++;
            }
        })
        return calcuDiscount(count);
    }
    /**
     * 统计时段内的订单数
     * @param timeZone
     */
    function countTotalOrderNum(data){
        $.each(data||[], function(idx, item){
            if(item.tradeStatusName !=="已退款" && item.tradeStatusName !=="已作废"){
                var timezone = getTimezoneNum(item.serverCreateTime);
                finalDistribute[timezone]&&finalDistribute[timezone].count++;
            }
        })
    }

    /**
     * 计算所处时区编码
     */
    function getTimezoneNum(createTime){
        var timezone = null;
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
