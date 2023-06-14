// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'cir'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async handleQrcode() {
      //  获取扫描到的条形码
      let {
        result
      } = await this.scanCodePromise()
      // 如果所扫描的商品条形码不存在或者出错时则不往下执行
      if (!result) return
      // 将获取到的商品条形码传递给父组件
      this.triggerEvent('getQrcode', {
        qrcode: result
      })
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
    }
  }
})