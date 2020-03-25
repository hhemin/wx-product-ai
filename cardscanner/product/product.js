let md5 = require('../md5.js')
let app_id = '输入你申请的app_id'
let app_key = '输入你申请的app_key'
let url = 'https://api.ai.qq.com/fcgi-bin/image/image_tag'

let request = (base64Img, callback) => {
  console.log(base64Img)
  let params = {
    app_id: app_id,
    time_stamp: Number(parseInt(new Date().getTime() / 1000).toString()),
    nonce_str: Math.random().toString(36).substr(2),
    // app_key: app_key,
    image:base64Img,
  }
  params['sign'] = _genRequestSign(params)
  console.log(params)
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      // 请求成功
      console.log(res);
      wx.hideLoading();
    },
    fail: function (res) {
      console.log(res);
      if (callback.fail)
        callback.fail()
    }
  })
}
// 签名结果
let _genRequestSign = (params) => {
  // 1. 对请求参数按字典升序排序
  params = _sortObject(params)
  // 2. 拼接键值对，value部分进行URL编码
  let paramStr = ''
  let keys = Object.keys(params)
  for (let idx in keys) {
    let key = keys[idx]
    paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
  }
  // 3. 拼接key
  paramStr += 'app_key=' + app_key
  // 4. md5
  return md5.hexMD5(paramStr).toUpperCase()
}

let _sortObject = (obj) => {
  var keys = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = obj[keys[i]]
  }
  return newObj
}

module.exports = {
  request: request
}