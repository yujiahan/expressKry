var express = require('express');
var router = express.Router();
var request = require('request');



/* GET users listing. */
router.get('/', function(req, res, next) {

  var DATE =  new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
  var options = {
    uri: 'http://b.keruyun.com/mind/tradeManage/queryList?pageSize=100&startDate='+
          (req.query.date||DATE) +'&endDate='+ (req.query.date||DATE),
    method: 'GET',
    encoding:'utf8',
    jar: 'true',
    headers: {
      'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
      'Origin': 'b.keruyun.com',
      'Pragma':'no-cache',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Upgrade-Insecure-Requests':1,
      'Referer': 'http://b.keruyun.com/mind/tradeManage/listView',
      'Content-Type': 'application/json; charset=utf-8',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent':'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.7) Gecko/20100726 CentOS/3.6-3.el5.centos Firefox/3.6.7'
    }
  };


  request(options).pipe(res);
});



module.exports = router;
