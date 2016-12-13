var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/bussiness', function(req, res, next) {
  res.render('bussiness', { title: '今日营业状况' });
});

router.post('/doLogin', function(req, res, next) {
  request.post({
    uri:'http://sso.keruyun.com/cas/login?service=http://b.keruyun.com/cas',
    headers: {
      "Connection": "keep-alive",
      "Content-Length": 167,
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
      "Origin": "http://sso.keruyun.com",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Referer": "http://sso.keruyun.com/cas/login?service=http://b.keruyun.com/cas",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6"
    },
    form : req.body,
    jar: true,
  }).pipe(res);
})
router.get('/captcha.jpg', function(req, res, next) {
  request.get(
      {
        'uri': "http://sso.keruyun.com/cas/captcha.jpg?"+Math.random(),
        'jar': true
      }, function(err, rep, body){

  }).pipe(res);
})

router.get('/loadTotal', function(req, res, next) {
  request.get(
      {
        'uri': "http://b.keruyun.com/mind/report/homePage/loadOrderCounts",
        'jar': true
      }).pipe(res);
})

router.get('/loadPeriodTotal', function(req, res, next) {
    var thisWeekPromise  = new Promise(function(resolve, reject) {
        _queryPeriodData("thisWeek",resolve, reject);
    })
    var lastWeekPromise  = new Promise(function(resolve, reject) {
        _queryPeriodData("lastWeek",resolve, reject);
    })

    var thisMonthPromis  = new Promise(function(resolve, reject) {
        _queryPeriodData("thisMonth",resolve, reject);
    })

    Promise.all([thisWeekPromise, lastWeekPromise, thisMonthPromis]).then(function(data){
        res.send({
            thisWeek : data[0],
            lastWeek: data[1],
            thisMonth: data[2]
        })
    })
})
function _queryPeriodData(type, resolve, reject){
    var ENDDATE;
    var STARTDATE ;

    if(type === "thisWeek") {
        var week = new Date().getDay() === 0? 7 :  new Date().getDay()
        var weekStart = new Date(new Date().getTime() - 24*3600*1000* (week-1));
        STARTDATE = weekStart.getFullYear() + "-" + (weekStart.getMonth()+1) + "-" + weekStart.getDate();
        ENDDATE = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
    } else if(type === "lastWeek"){
        var week = new Date().getDay() === 0? 7 :  new Date().getDay();
        var weekStart = new Date(new Date().getTime() - 24*3600*1000* (week + 6));
        var weekEnd = new Date(new Date().getTime() - 24*3600*1000*7);
        STARTDATE = weekStart.getFullYear() + "-" + (weekStart.getMonth()+1) + "-" + weekStart.getDate();
        ENDDATE = weekEnd.getFullYear() + "-" + (weekEnd.getMonth()+1) + "-" + weekEnd.getDate();
    } else if(type === "thisMonth"){
        STARTDATE = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-01";
        ENDDATE = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
    }

    request.get(
        {
            'uri': "http://b.keruyun.com/mind/report/bizCondition/loadDataChart?startDate="+ STARTDATE +"&endDate="+ ENDDATE +"&cmIds=810006136&shopIdentys=810006136",
            'jar': true
        }, function(err, httpResponse, body){
            if(body && body.indexOf("script") < 0) {
                resolve(JSON.parse(body) && JSON.parse(body).sumDataInfo && JSON.parse(body).sumDataInfo.receivableSum)
            } else {
                resolve("error")
            }
    })
}


module.exports = router;
