var express = require('express');
var router = express.Router();
var request = require('request');
//var sqlConfig = require('./password.json').sqlConfig;
var mysql  = require('mysql');



require('events').EventEmitter.prototype._maxListeners = 100;

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bussiness', function(req, res, next) {
  res.render('bussiness', { title: '今日营业状况' });
});
router.get('/chart', function(req, res, next) {
    res.render('chart', { title: '图表' });
});
router.get('/schedule', function(req, res, next) {
    res.render('schedule');
});
router.get('/forDisplay', function(req, res, next) {
    res.render('forDisplay', { title: '实验运行效果' });
});

router.get('/dishType/submit', function(req, res, next) {
    var dishName = req.query.name;
    var remarks = req.query.remarks;

    var connection = mysql.createConnection(sqlConfig);
    connection.connect();
    connection.query('INSERT INTO dish_types (name, remarks) VALUES ("'+ dishName+'" , "'+remarks +'");', function (error, results, fields) {
        if (error) {
            var errMsg = "";

            switch (error.code){
                case "ER_DUP_ENTRY":
                    errMsg = "重复名称"
                    break;
                default:
                    errMsg = "未知错误"
            }

            res.json({res:false, errMsg: errMsg});
        } else {
            res.json({ret: true});
        }
        // connected!

    });
    connection.end();

});
router.get('/dishType/query', function(req, res, next) {
    var connection = mysql.createConnection(sqlConfig);
    connection.connect();
    connection.query('select * from dish_types', function (error, results, fields) {
        if (error) throw error;
        if(results) {
            console.log(JSON.stringify(results));
        }
        // connected!
        res.json(results);
    });
    connection.end();
});

var loginJar = request.jar(); //用于登录的jar

/* GET users listing. */
router.get('/getOrderList', function(req, res, next) {

    var DATE =  new Date().getFullYear() + "-" + ((new Date().getMonth()+1)<10? ("0"+(new Date().getMonth()+1)) : new Date().getMonth()+1) + "-" + (new Date().getDate()<10? ("0"+new Date().getDate()):new Date().getDate());

    var options = {
        uri: 'http://b.keruyun.com/mind/tradeManage/queryList',
        method: 'post',
        encoding:'utf8',
        jar: loginJar,
        form: {
            nameOrMobile:"",
            orderDateType:1,
            startDate: req.query.fromDate||DATE,
            endDate:req.query.toDate||DATE,
            cmIds:810006136,
            commercialIds:810006136,
            sourceChild:"",
            tradeStatus:"",
            currentPage:1,
            pageSize:1000,
            sort:2
        }
    };

    request(options,  function (error, response, body) {
        if(response.headers['content-type'] === 'text/html;charset=UTF-8'){
            var optionNew = {
                uri: 'http://sso.keruyun.com/cas/login?loginId=7364&service=http://b.keruyun.com/cas',
                jar: loginJar,
                method: 'get'
            }
            request(optionNew).pipe(res);
       } else {
           res.json(JSON.parse(body));
       }
    })
});

router.post('/doLogin', function(req, res, next) {
  request.post({
    uri:'http://sso.keruyun.com/cas/login?loginId=7364&service=http://b.keruyun.com/cas',
    headers: {
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "Origin": "http://sso.keruyun.com",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Referer": "http://sso.keruyun.com/cas/login?service=http://b.keruyun.com/cas",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6"
    },
    form : req.body,
    jar: loginJar
  }).on("response",function(response){
      if(response.statusCode === 302){
          res.redirect(req.headers.origin+'/bussiness');
      } else {
          res.end();
      }
  })
})
router.get('/captcha.jpg', function(req, res, next) {
  request.get(
      {
        'uri': "http://sso.keruyun.com/cas/captcha.jpg?"+Math.random(),
        'jar': loginJar
      }, function(err, rep, body){

  }).pipe(res);
})

router.get('/loadTotal', function(req, res, next) {
  request.get(
      {
        'uri': "http://b.keruyun.com/mind/report/homePage/loadOrderCounts",
        'jar': loginJar
      }).pipe(res);
})
router.get('/getAvgPersonToday', function(req, res, next) {
    request.get(
        {
            'uri': "http://b.keruyun.com/mind/report/homePage/loadSalesCountChart",
            'jar': loginJar
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
            'uri': "http://b.keruyun.com/mind/report/collection/query?startDate="+ STARTDATE +"&endDate="+ ENDDATE +"&shopIds=810006136&shopName=%2525E6%2525A4%252592%2525E5%2525A1%252598&tabType=1&queryType=2&dateType=2&startTime=00%3A00&endTime=23%3A59",
            'jar': loginJar
        }, function(err, httpResponse, body){
            if(body && body.indexOf("script") < 0) {
                resolve(JSON.parse(body)  && JSON.parse(body).shopActaualAmount)
            } else {
                resolve("error")
            }
    })
}


module.exports = router;
