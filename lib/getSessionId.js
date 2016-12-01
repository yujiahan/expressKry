/**
 * 客如云登录逻辑
 * 1 登录http://sso.keruyun.com/cas/login?service=http://b.keruyun.com/cas 获取临时sessionId
 * 2 用改sessionId访问图片http://sso.keruyun.com/cas/captcha.jpg 通过破解接口获取capta
 * 3 拼接登录数据 example:
 *   lt:LT-10975-iXsEqZtwm7HOeU4qHRF2huMgQ3gEZB-sso.keruyun.com
 execution:e3s2
 _eventId:submit
 locale:zh_CN
 loginId:7364
 username:dianzhang
 password:123456abc
 captcha:mdg7
 * 4 提交数据到 http://sso.keruyun.com/cas/login?service=http://b.keruyun.com/cas
 * 5 处理返回值location http://b.keruyun.com/mind/cas?ticket=ST-11516-efvec2beUtsgBIrbNk5v-sso.keruyun.com 并访问
 * 6 处理返回值responseHeader Set-Cookie: JSESSIONID=2C2729501E67E7712DD39B0E07C97074
 *
 */
var SessionId;

function getSessionId(){
    return SessionId;
}

exports.getSessionId  = getSessionId;