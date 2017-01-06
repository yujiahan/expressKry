/*
$(function(){
    var orderTpl = Hogan.compile(
    "    {{#orderData}}                          "+
    "        <div class='grid-item'>             "+
    "           <p>创建时间:{{createtime}}</p>       "+
    "           <p>桌号:{{tableInfo}}</p>          "+
    "           <p>菜列表</p>                       "+
    "       {{#dishList}}                        "+
    "           <p>{{dishName}}</p>              "+
    "       {{/dishList}}                        "+
    "       </div>                               "+
    "   {{/orderData}}                           "
    );
    var orderData = [
        {
            dishList:[
                {"type":0,"dishCode":"0050040","dishName":"钵仔四季豆","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":29.00,"quantity":1.00,"unitName":"份","amount":29.0000,"childNode":[]},
                {"type":0,"dishCode":"0020060","dishName":"农家小炒肉","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},],
            createtime: "2017-01-04 13:36:18",
            tableInfo: "A2/隔断",
            tradeStatusName: "已确认"
        },
        {
            dishList:[
                {"type":0,"dishCode":"0020110","dishName":"海皇粉丝煲","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":48.00,"quantity":1.00,"unitName":"份","amount":48.0000,"childNode":[]},
                {"type":0,"dishCode":"0020220","dishName":"土匪猪肝","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":34.00,"quantity":1.00,"unitName":"份","amount":34.0000,"childNode":[]},
                {"type":0,"dishCode":"0020400","dishName":"农家炒土鸡","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":56.00,"quantity":1.00,"unitName":"份","amount":56.0000,"childNode":[]},
                {"type":0,"dishCode":"0020230","dishName":"板栗猪蹄","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
                {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
                {"type":0,"dishCode":"0020010","dishName":"外婆鱼","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]}
            ],
            createtime: "2017-01-04 13:26:18",
            tableInfo: "A1/隔断",
            tradeStatusName: "已确认"
        },
        {
            dishList:[{"type":0,"dishCode":"0020010","dishName":"外婆鱼","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]},{"type":0,"dishCode":"0020110","dishName":"海皇粉丝煲","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":48.00,"quantity":1.00,"unitName":"份","amount":48.0000,"childNode":[]},{"type":0,"dishCode":"0020310","dishName":"馋嘴跳跳蛙","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":98.00,"quantity":1.00,"unitName":"份","amount":98.0000,"childNode":[]},{"type":0,"dishCode":"0020040","dishName":"压锅焖牛腩","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":69.00,"quantity":1.00,"unitName":"份","amount":69.0000,"childNode":[]},{"type":0,"dishCode":"0020510","dishName":"小炒鸡腿菇","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},{"type":0,"dishCode":"0020420","dishName":"长豆角茄子","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":28.00,"quantity":1.00,"unitName":"份","amount":28.0000,"childNode":[]},{"type":0,"dishCode":"0020060","dishName":"农家小炒肉","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},{"type":0,"dishCode":"0050010","dishName":"白灼芥兰","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":28.00,"quantity":1.00,"unitName":"份","amount":28.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]}],
            createtime: "2017-01-04 13:10:42",
            tableInfo: "C6/包间",
            tradeStatusName: "已确认"
        }
    ]

    $("#order").html(orderTpl.render({orderData:orderData}));


})*/
var orderData = [
    {
        dishList:[
            {"type":0,"dishCode":"0050040","dishName":"钵仔四季豆","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":29.00,"quantity":1.00,"unitName":"份","amount":29.0000,"childNode":[]},
            {"type":0,"dishCode":"0020060","dishName":"农家小炒肉","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},],
        createtime: "2017-01-04 13:36:18",
        tableInfo: "A2/隔断",
        tradeStatusName: "已确认"
    },
    {
        dishList:[
            {"type":0,"dishCode":"0020110","dishName":"海皇粉丝煲","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":48.00,"quantity":1.00,"unitName":"份","amount":48.0000,"childNode":[]},
            {"type":0,"dishCode":"0020220","dishName":"土匪猪肝","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":34.00,"quantity":1.00,"unitName":"份","amount":34.0000,"childNode":[]},
            {"type":0,"dishCode":"0020400","dishName":"农家炒土鸡","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":56.00,"quantity":1.00,"unitName":"份","amount":56.0000,"childNode":[]},
            {"type":0,"dishCode":"0020230","dishName":"板栗猪蹄","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
            {"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},
            {"type":0,"dishCode":"0020010","dishName":"外婆鱼","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]}
        ],
        createtime: "2017-01-04 13:26:18",
        tableInfo: "A1/隔断",
        tradeStatusName: "已确认"
    },
    {
        dishList:[{"type":0,"dishCode":"0020010","dishName":"外婆鱼","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":68.00,"quantity":1.00,"unitName":"份","amount":68.0000,"childNode":[]},{"type":0,"dishCode":"0020110","dishName":"海皇粉丝煲","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":48.00,"quantity":1.00,"unitName":"份","amount":48.0000,"childNode":[]},{"type":0,"dishCode":"0020310","dishName":"馋嘴跳跳蛙","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":98.00,"quantity":1.00,"unitName":"份","amount":98.0000,"childNode":[]},{"type":0,"dishCode":"0020040","dishName":"压锅焖牛腩","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":69.00,"quantity":1.00,"unitName":"份","amount":69.0000,"childNode":[]},{"type":0,"dishCode":"0020510","dishName":"小炒鸡腿菇","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},{"type":0,"dishCode":"0020420","dishName":"长豆角茄子","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":28.00,"quantity":1.00,"unitName":"份","amount":28.0000,"childNode":[]},{"type":0,"dishCode":"0020060","dishName":"农家小炒肉","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":39.00,"quantity":1.00,"unitName":"份","amount":39.0000,"childNode":[]},{"type":0,"dishCode":"0050010","dishName":"白灼芥兰","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":28.00,"quantity":1.00,"unitName":"份","amount":28.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]},{"type":0,"dishCode":"0060010","dishName":"米饭","dishMemo":null,"dishCookingWay":null,"dishCookingWayName":null,"dishProperty":null,"dishPropertyName":null,"price":2.00,"quantity":1.00,"unitName":"份","amount":2.0000,"childNode":[]}],
        createtime: "2017-01-04 13:10:42",
        tableInfo: "C6/包间",
        tradeStatusName: "已确认"
    }
]
var orderList = new Vue({
    el: '#order',
    data: {
        orderData: processOrginData(orderData)
    },
    methods: {
        dishMaking: function(dish, order){
            if(!dish.arranged){
                dish.arranged = true;
                message.$emit("dishToChef", {dish:dish, chefId: 1})
            }
        }
    },
    computed: {
        allRanged : function(order){
            return function(order){
                var arrangedCount = 0;

                (order.dishList||[]).map(function(value){
                    if(value.arranged) {
                        arrangedCount ++;
                    }
                })
                order.allArranged = (arrangedCount === (order.dishList||[]).length);
                return  arrangedCount === (order.dishList||[]).length;
            }

        },
        allMaked : function(order){
            return function(order){
                var makedCount = 0;

                (order.dishList||[]).map(function(value){
                    if(value.maked) {
                        makedCount ++;
                    }
                })
                order.allMaked = ( makedCount === (order.dishList||[]).length);

                return   makedCount === (order.dishList||[]).length;
            }

        }
    }
})
var chefList = new Vue({
    el: "#chef",
    data: {
        chefList: [
            {
                name:"周",
                makingList:[],
                completeList:[]
            },
            {
                name:"罗",
                makingList:[],
                completeList:[]
            },
            {
                name:"某",
                makingList:[],
                completeList:[]
            }]
    }
})


var message = new Vue();

message.$on('dishToChef', function (param) {
    chefList.chefList[param.chefId].makingList.push(param.dish)
    joinDish(chefList.chefList[param.chefId].makingList);

})

function processOrginData(data){
    var orderData = [];
    data.map(function(value, idx){
        var order = orderData[idx] = {};
        order.createtime = value.createtime;
        order.tableInfo = value.tableInfo;
        order.dishList = [];
        order.allArranged = false;
        order.allMaked = false;

        value.dishList.map(function(value, idx){
            order.dishList[idx]= {};
            order.dishList[idx].dishName = value.dishName;
            order.dishList[idx].dishCode = value.dishCode;
            order.dishList[idx].arranged = false;
            order.dishList[idx].maked = false;
            order.dishList[idx].isFirst = false;
        })
    })
    return orderData;
}
/**
 * 合并当前厨师同类项
 * @param makingList
 */
function joinDish(makingList){
    var hasDish = {};

    makingList.map(function(dish){
        if(!hasDish[dish.dishName]){
            hasDish[dish.dishName] = {
                count: 1
            };
            dish.isFirst = true;
        } else {
            hasDish[dish.dishName].count ++;
        }
    })

    makingList.map(function(dish, idx){
        if(dish.isFirst){
            dish.count = hasDish[dish.dishName].count;
        }
    })
}

setTimeout(function(){
    orderList.orderData.push({createtime:"xxxx"})
}, 1000)

setTimeout(function(){
    var container = document.querySelector('#order');
    var msnry = new Masonry( container,{ "itemSelector": ".grid-item","gutter":20, "columnWidth": 200 } );
    msnry.layout();

},2000)