const request = (method, url, pramas) => {
  return new Promise((resovle, reject) => {
    let basUrl = 'http://weixin.itying.com/'
    // 开启loading
wx.showLoading({
  title: '加载中',
})
    wx.request({
      url: basUrl + url,
      method: method,
      data: pramas ? pramas : '',
      
      success: (res) => {
        resovle(res.data)
        // 关闭loading
      wx.hideLoading()
      },
      fail: (err) => {

        reject(err)
      }
      
    })

  })
   
}

let http = {
  get: (url, pramas) => request("GET", url, pramas),
  post: (url, pramas) => request("POST", url, pramas)
}


export default http