const request = (method, url, pramas) => {
  return new Promise((resovle, reject) => {
    let basUrl = ''
    wx.request({
      url: basUrl + url,
      method: method,
      data: pramas ? pramas : '',
      success: (res) => {
        resovle(res.data)
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