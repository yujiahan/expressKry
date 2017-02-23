var dishStatusMap = {
    "NEW" : "未分配",
    "ARRANGED": "已分配",
    "ALLOCATED": "已经配菜",
    "MAKING": "制作中",
    "MAKED": "完成",
    "CANCELED": "被取消"
};

var dishProp  = {
    "status" : "NEW",
    "dishName" : "",
    "dishCode" : "",
    "uniqueID" : "",
    "createTime": "", //生成时间
    "tableInfo": "", //桌号
    "beHurry": 0, //用户加急程度
    "defaultPriority": 1, //每个菜默认的优先级
    "finalPriority": 1, //最终优先级
    "priortyCalInfo":{}, //优先级计算缓存信息
    "waitTime": 0, //用户已等待时长 单位:分钟
    "waitTimeTilllastDone" : 0, //距离上一个菜完成时间
    "chefList" : ['zhou','luo'], //优先分配厨师序列
    "arrangedChef" :""//当前所属厨师
}

var orderProp  = {
    "createTime": "", //生成时间
    "totalWaitTime": 0,
    "tableInfo" : "", //桌号
    "dishList" : [],
    "allArranged":  false,
    "allMaked":  false,
    "noneMaked":  true, //一道菜都没上
    "makedRate":  0, //完成占比
}

module.exports = {
    initStructure : {
        dishProp : dishProp,
        orderProp: orderProp
    }
}