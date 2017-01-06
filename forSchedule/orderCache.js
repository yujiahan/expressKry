/**
 *   抓取到的订单存储
 *
 **/

var orderCache = [];

function clean(){
    orderCache = [];
}

function dataProcess(data){
    return data;
}

function save (data) {
    orderCache.push(dataProcess(data));
}


exports.clean = clean;
exports.save = save;