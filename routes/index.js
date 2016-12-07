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
        'uri': "http://sso.keruyun.com/cas/captcha.jpg",
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


module.exports = router;
