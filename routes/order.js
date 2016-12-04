var express = require('express');
var http = require('http');
var router = express.Router();
var iconv = require('iconv-lite');    //解决编码转换模块
var BufferHelper = require('bufferhelper');
var request = require('request');
var SESSIONID = "8C66C245D008282423E6B356CC5D424D";
var DATE =  new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();


/* GET users listing. */
router.get('/', function(req, res, next) {
  SESSIONID = req.query.sessionId||SESSIONID;

  var options = {
    uri: 'http://b.keruyun.com/mind/tradeManage/queryList?pageSize=100&startDate='+
          (req.query.date||DATE) +'&endDate='+ (req.query.date||DATE),
    method: 'GET',
    encoding:'utf8',
    jar: 'true',
    headers: {
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
      'Cookie':"JSESSIONID="+ SESSIONID+"; crw_uid=9928bda9c294a3968797c6a38ccac5; cid=bid_7364; crw_bid=045135bbcb99ada2; crw_cid=045135bbcb99ada2; c_version=6; Hm_lvt_887cf26826dd888eebe2769131c9969d=1480841052; Hm_lpvt_887cf26826dd888eebe2769131c9969d=1480841052",
      'Origin': 'b.keruyun.com',
      'Pragma':'no-cache',
      'Accept': '*/*',
      'Upgrade-Insecure-Requests':1,
      'Referer': 'http://b.keruyun.com/mind/tradeManage/listView',
      'Content-Type': "application/json; charset=utf-8",
      'Content-Length': "0",
      'Connection': 'keep-alive',
      'Cache-Control': "no-cache",
      'X-Requested-With': "XMLHttpRequest",
      'User-Agent':"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
    }
  };

  function callback(error, response,body){

      console.log(response.headers);

  }


  request(options,callback).pipe(res);
/*
  var thisRes = res;

  var options = {
    host: 'b.keruyun.com',
    path: '/mind/tradeManage/queryList?pageSize=100&startDate='+ (req.query.date||DATE) +'&endDate='+ (req.query.date||DATE),
    method: 'GET',
    headers: {
      'Accept':  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
      'Cookie':"JSESSIONID="+ (req.query.sessionId||SESSIONID)+";",
      'Host': 'b.keruyun.com',
      'Pragma':'no-cache',
      'Upgrade-Insecure-Requests':1,
      'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    }
  };
  console.log(JSON.stringify(options));
  console.log(options.headers);
  var req = http.request(options, function(res){
    console.log('STATUS:' + res.statusCode);
    console.log('HEADERS:' + JSON.stringify(res.headers));
    if(res.statusCode=="302"){
      var redirectOption = {
        host:"sso.keruyun.com",
        path:"/cas/login?service=http://b.keruyun.com/mind/cas",
        headers: {
          //'Cookie': options.headers.Cookie+res.headers['set-cookie'][0],
        }
      }
      console.log(redirectOption);

      http.get(redirectOption, function(SecondRes){
        console.log('STATUS:' + SecondRes.statusCode);
        console.log('HEADERS:' + JSON.stringify(SecondRes.headers));
      })
    }

    res.setEncoding('utf8');
    res.on('data',function(chunk){
      //console.log('BODY' + chunk);
      thisRes.write(chunk);
    }).on('end', function(){
      thisRes.end();
    })
  });
/!*  for(key in req.agent) {
    if (typeof req.agent[key] !== "function") {
      console.log(key + ":" + req.agent[key]);
    }
  }*!/
  //console.log("rrrrrrrrreeeeeeeeeeeeqqqqqqqqqq:"+ JSON.stringify(req.agent));
  req.on('error', function(e) {
    console.log('problem with request: ${e.message}');
  });

  // write data to request body
  //req.write(postData);
  req.end();
*/

});



module.exports = router;
