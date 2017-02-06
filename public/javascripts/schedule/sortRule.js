/**
 * 排序规则1 等待时间n分钟 优先权+n  大于10分钟 额外加20  大于20分钟 额外再加30
 * 排序规则2 这道菜如果所属订单一个菜没上 并且在订单中优先级中最高的菜是这个道菜 优先级+10
 * 排序规则3 用户催菜规则 订单被催
 *
 */

var STRUCTURE = require("./baseStruct.js").initStructure;
var _ = require("lodash");

var dishArrangedList = [];
var dishMakedList = [];
var dishUnarrangeList = [];
var allDishList = [];
var orderDataCache = [];
var ruleNameList = ["waitTimeRule","noneDishMake"];
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
       }  else {
           dish.priortyCalInfo.noneDishMake = 0;
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
    var NOW = new Date("2017-01-04 13:38:18").getTime();
    dishUnarrangeList = [];

    allDishes.map(function(dish){
        if(dish.status === "NEW") {
            dishUnarrangeList.push(dish);
        }
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
    orderDataCache = _.cloneDeep(orderData);
    return orderData;
}

function sortDishes(){
    updateCommonDishProp(allDishList);

    //规则开始
    waitTimeRule(dishUnarrangeList);
    noneDishMakeRule(dishUnarrangeList);
    //规则结束

    _computeFinalPriory(dishUnarrangeList); //计算最终优先级

    dishUnarrangeList = _.sortBy(dishUnarrangeList, function(item) {
        return -item.finalPriority;
    })

    return _.cloneDeep(dishUnarrangeList);
}

function arrangeDish(chefList){
    var ONCEARRANGE = 5; //一次分配的数量
    var chefArrangeList = [];
    var arrangeList = dishUnarrangeList.slice(0, ONCEARRANGE); //本次分配的菜品


    arrangeList.map(function(dish){
        dish.status = "ARRANGED";
        chefArrangeList.push({
            dish: dish,
            chefId: _arrangeChef(dish.dishName, chefList)
        })
    })

    return {
        "chefArrangeList": _.cloneDeep(chefArrangeList),
        "newDishList": _.cloneDeep(dishUnarrangeList)
    }

}

/**
 * TODO 分配厨师
 * @private
 */
function _arrangeChef(dishName, chefList){
    var CHEFLISTLONGEST = 5; //厨师队列超长阈值
    var chefId = "";
    var findChef = false;

    //如果厨师队列有这道菜,加到当前厨师队列中
    chefList.map(function(chef, idx){
        if(_.findIndex(chef.makingList, ["dishName", dishName]) > -1){
            findChef = true;
            chefId = idx
            return true;
        }
    })

    return findChef? chefId : parseInt(Math.random()*3, 10);
}

function _computeFinalPriory(allDishList){
    allDishList.map(function(dish){
        dish.finalPriority = 0;
        ruleNameList.map(function(ruleName){
            dish.finalPriority += dish.priortyCalInfo[ruleName];
        })
    })
}
//查找order
function _getOrder(tableInfo){
    var findOrder;
    orderDataCache.map(function(order){
        if (order.tableInfo === tableInfo){
            findOrder = _.cloneDeep(order);
        }
    })

    return findOrder;
}

//查找订单中的最高优先级产品
function _getDefaultPriortyHigher(orderInfo){
    //TODO 查找该订单中的最高优先级菜品

    return orderInfo.dishList[0].dishName;
}
module.exports = {
    updateCommonOrderProp: updateCommonOrderProp,
    sortDishes: sortDishes,
    arrangeDish: arrangeDish,

}