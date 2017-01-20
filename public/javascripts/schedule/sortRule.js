var STRUCTURE = require("./baseStruct.js").initStructure;
var _ = require("lodash");

var dishArrangedList = [];
var dishMakedList = [];
var dishUnarrangeList = [];
var allDishList = [];
var ruleNameList = ["waitTimeRule" ];
/**
 * 等待时间n分钟 优先权+n  大于10分钟 额外加20  大于20分钟 额外再加30
 * @param dishItem
 * @returns {number}
 */
function waitTimeRule(unarrangeDishes){
    unarrangeDishes.map(function(dish){
        var minuteSpent = dish.waitTime;
        dish.priortyCalInfo.waitTimeRule = minuteSpent + (minuteSpent>10? 20: 0) + (minuteSpent>20? 30 : 0);

    })
}

/**
 * 这道菜如果所属订单一个菜没上 并且在订单中优先级中最高的菜是这个道菜 优先级+10
 * @param unarrangeDishes
 */
function noneDishMakeRule(unarrangeDishes){
    unarrangeDishes.map(function(dish){
       var thisOrder =  _getOrder(dish.tableInfo);
       if(thisOrder.noneMaked === true && _getDefaultPriortyHigher(thisOrder)=== dish.dishName){
           dish.priortyCalInfo.noneDishMake = 10;
       }
    })
}

/**
 * 用户催菜规则
 * @param unarrangeDishes
 */
function toHurryRule(unarrangeDishes) {
    unarrangeDishes.map(function(dish){
        dish.priortyCalInfo.toHurryRule = dish.beHurry;
    })
}

function updateCommonDishProp(allDishes){
    //var NOW = new Date().getTime();
    var NOW = new Date("2017-01-04 13:38:18").getTime();
    allDishes.map(function(dish){
        dish.waitTime = parseInt((NOW - new Date(dish.createTime).getTime())/60000);
    })
}
function updateCommonOrderProp(data){  //处理每个订单中的菜list 每项菜和tableInfo绑定生成uniqueId
    var orderData = [];
    data.map(function(value, idx){
        var order = orderData[idx] = _.cloneDeep(STRUCTURE.orderProp);
        order.createtime = value.createtime;
        order.tableInfo = value.tableInfo;

        value.dishList.map(function(value, idx){
            var dish =  order.dishList[idx] =  _.cloneDeep(STRUCTURE.dishProp);

            dish.uniqueID =  order.tableInfo +"|"+value.dishName;
            dish.createTime = order.createtime;
            dish.tableInfo = order.tableInfo;
            dish.dishName = value.dishName;
            dish.dishCode = value.dishCode;

            if(dish.dishName !=="米饭"){
                allDishList.push(_.cloneDeep(dish));
            }
        })
    })
    return orderData;
}
function sortDishes(){
    updateCommonDishProp(allDishList);
    waitTimeRule(allDishList);

    _computeFinalPriory(allDishList)
    return allDishList;
}

function _computeFinalPriory(allDishList){
    allDishList.map(function(dish){
        ruleNameList.map(function(ruleName){
            dish.finalPriority += dish.priortyCalInfo[ruleName];
        })
    })
}
//查找order
function _getOrder(tableInfo){

    return  "order";
}

//查找订单中的最高优先级产品
function _getDefaultPriortyHigher(orderInfo){
    return "dishName"
}
module.exports = {
    updateCommonOrderProp: updateCommonOrderProp,
    sortDishes: sortDishes
}