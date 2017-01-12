
var DISCOUNTLIMIT = 8; // 小于固定桌数有优惠
function calcuDiscount(orderCount){
    if(orderCount < DISCOUNTLIMIT &&  orderCount>0) {
        return  (50*(8-orderCount)/(8*orderCount)).toFixed(2);
    } else {
        return 0;
    }
}

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

        //主流程
       document.body.innerHTML ="" 
       var DATE =  new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();

        $.post('/mind/tradeManage/queryList', "nameOrMobile=&orderDateType=1&startDate="+ DATE +"&endDate="+ DATE +"&cmIds=810006136&commercialIds=810006136&multipleCheck-check-all=on&multipleCheck-item=-20&multipleCheck-item=-15&multipleCheck-item=-2&multipleCheck-item=-3&multipleCheck-item=-4&multipleCheck-item=-1&multipleCheck-item=-7&multipleCheck-item=-6&multipleCheck-item=-5&multipleCheck-item=567304&payType=-20%2C-15%2C-2%2C-3%2C-4%2C-1%2C-7%2C-6%2C-5%2C567304&deliveryType=4&deliveryType=1&deliveryType=2&deliveryType=3&sourceChild=&tradeStatus=&currentPage=1&pageSize=100&sort=2" ,function(result) {

           var orderList = result.data.items;

           var totalDiscount = 0;
           var text = ["日期:" + result.data.startDate.split(" ")[0] + "<br/>"];
           text.push("<table class='striped'><thead><tr>" +
               "<th>桌号</th>" +
               "<th>订单优惠</th>" +
               "<th>下单时间</th>" +
               "<th>订单号</th>" +
               "</tr></thead><tbody>")
           $.each(orderList || [], function (idx, item) {
               var timeParse = item.serverCreateTime.split(" ")[1].replace(/:/g, "");
               if (timeParse <= "140000" && timeParse >= "110000" && item.tableInfo && item.tradeStatusName !== "已退款" && item.tradeStatusName !== "已作废") {
                   text.push("<tr><td><span class=" + (item.tradePayStatusName === "已支付" ? "green-text" : "red-text") + ">" + item.tableInfo + "(" + item.tradePayStatusName + ")" + "</span></td><td>" + countPromotion(item.serverCreateTime, orderList) + "</td><td>" + item.serverCreateTime + "</td><td>" + item.tradeNo + "</tr>");
                   totalDiscount += parseFloat(countPromotion(item.serverCreateTime, orderList));
               }
           })
           text.push("</tbody></table>")

           text.push("<p style='color:red;font-size:16px;'>新总优惠额为:" + totalDiscount.toFixed(2) + "</p>");

           document.write(text.join(""));
       })




