
var myChart = echarts.init(document.getElementById('main'));
var chartType = window.location.search.indexOf("week") > -1 ? "LASTWEEK": "TODAY";
var DISCOUNTLIMIT = 8; // 小于固定桌数有优惠
function calcuDiscount(orderCount){
    if(orderCount < DISCOUNTLIMIT &&  orderCount>0) {
        return  (50*(8-orderCount)/(8*orderCount)).toFixed(2);
    } else {
        return 0;
    }
}

/**
 * 计算新版优惠金额
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
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

$.get("getOrderList?fromDate="+ getQueryString("fromDate") + "&toDate=" + getQueryString("toDate") , function(result){
    var orderList = result.data.items;
    var chartData  = [[],[]];

    $.each(orderList||[], function(idx, item){
        var timeParse =  item.serverCreateTime.split(" ")[1].replace(/:/g, "");
        if(timeParse <= "140000" && timeParse >= "110000" && item.tableInfo&& item.tradeStatusName !=="已退款" && item.tradeStatusName !=="已作废" ){
           if(chartType==="LASTWEEK") {
                chartData.push(["2016-12-28 " + item.serverCreateTime.split(" ")[1],
                countPromotion(item.serverCreateTime, orderList),
                (countPromotion(item.serverCreateTime, orderList)/(parseFloat(item.custShouldPay) + parseFloat(countPromotion(item.serverCreateTime, orderList)))).toFixed(2),
                (countPromotion(item.serverCreateTime, orderList)/(parseFloat(item.custShouldPay) + parseFloat(countPromotion(item.serverCreateTime, orderList)))).toFixed(2),
                "orderList"]);
           }else {
               chartData.push([item.serverCreateTime,
                   countPromotion(item.serverCreateTime, orderList),
                   (countPromotion(item.serverCreateTime, orderList)/(parseFloat(item.custShouldPay) + parseFloat(countPromotion(item.serverCreateTime, orderList)))).toFixed(2),
                   (countPromotion(item.serverCreateTime, orderList)/(parseFloat(item.custShouldPay) + parseFloat(countPromotion(item.serverCreateTime, orderList)))).toFixed(2),
                   "orderList"]);

           }


        }
    })

    var option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            offset: 0,
            color: '#f7f8fa'
        }, {
            offset: 1,
            color: '#cdd0d5'
        }]),
        title: {
            text: chartType ==="LASTWEEK"? "一周优惠金额分布("+getQueryString("fromDate") +"~"+getQueryString("toDate") +")" :
                    (location.search.replace("?date=", "") || new Date().getFullYear() +"-"+ (new Date().getMonth()+1) +"-"+ (new Date().getDate())) + ' 优惠金额分布',
            textStyle: {
                fontSize: 28
            }
        },
        xAxis: {
            name:"下单时间",
            type: "time",
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            splitNumber:18,
            axisTick:{
                inside:true
            }
        },
        yAxis: {
            name:"优惠金额",
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true
        },
        series: [{
            name: 'orderList',
            data: chartData,
            type: chartType ==="LASTWEEK"? "scatter" : "line",
            symbolSize: function (data) {
                return 7;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        }]
    };
    if(chartType ==="LASTWEEK") {
        option.xAxis.axisLabel = {
            formatter:  function(value){
                var axisDate = new Date(value);

                return axisDate.getHours() + ":" + (axisDate.getMinutes()<10? ("0"+ axisDate.getMinutes()) :axisDate.getMinutes());
            }
        }
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})



