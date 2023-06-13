// pages/shopping/shopping.js
import getcode from '../../request/api'
import storage from '../../request/storage'
Page({
  // 点击按钮扫描条形码
  async handleQrcode() {
    //  获取扫描到的条形码
    let {
      result
    } = await this.scanCodePromise()
    // 如果所扫描的商品条形码不存在或者出错时则不往下执行
    if (!result) return

    let res = await getcode({
      qcode: result
    })
    // console.log(res);

    // 判断如果通过条形码获取到商品信息，跳转到购物车
    if (res.result && res.result.length > 0) {
      // 调用addCart
      this.addCart(res.result[0])
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    }
  },
  // 将获取到的商品数据存储到本地
  addCart(data) {
    // 如果添加的商品不存在，不往下执行
    console.log(data);
    if (!data) return
    // 初始化一个数组，用来保存本地添加的商品信息
    let arr = []
    // 存之前先获取本地存吃的所有商品信息
    let carts = storage.get('carts')
    // 先判断本地有没有商品信息
    if (carts && carts.length > 0) {
      // 当前要在本地添加的商品信息是否在本地存在
      let status = this.addproduction(data, carts)
      if (!status) {
        data.num = 1
        carts.push(data)
        storage.set('carts', carts)
      } else {
carts.forEach(item=>{
  if (item._id ==data._id) {
   item.num +=1
  }
})
console.log(carts);
storage.set('carts',carts)
      }
    } else {
      data.num = 1;
      arr.push(data)
      storage.set('carts', arr)
    }
  },
  /**
   * 要添加的商品信息在所有信息里存在为true不在false
   * @param {*} data 
   * @param {*} carts 
   */
  addproduction(data, carts) {
    let datastatus = false
    carts.forEach(item=>{
      if (item._id==data._id) datastatus=true
    })
    return datastatus
  },
  // 将扫码方法进行promise
  scanCodePromise() {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        success: (res) => {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    storage.set('carts')
    // console.log('123=>',storage.get('carts'));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})