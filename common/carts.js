import getcode from '../request/api'
import storage from '../request/storage'
async function getQrcode(event) {
  // 获取到子组件传递过来的条形码
  let result = event.detail.qrcode
  // 如果所扫描的商品条形码不存在或者出错时则不往下执行
  if (!result) return;
  let res = await getcode({
    qcode: result
  })
  // 判断如果通过条形码获取到商品信息，跳转到购物车
  if (res.result && res.result.length > 0) {
    // 调用addCart
    this.addCart(res.result[0])
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  }
}
// 将获取到的商品数据存储到本地
function addCart(data) {
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
      carts.forEach(item => {
        if (item._id == data._id) {
          item.num += 1
        }
      })
      console.log(carts);
      storage.set('carts', carts)
    }
  } else {
    data.num = 1;
    arr.push(data)
    storage.set('carts', arr)
  }
}
/**
 * 要添加的商品信息在所有信息里存在为true不在false
 * @param {*} data 
 * @param {*} carts 
 */
function addproduction(data, carts) {
  let datastatus = false
  carts.forEach(item => {
    if (item._id == data._id) datastatus = true
  })
  return datastatus
}
export default {
  getQrcode,
  addCart,
  addproduction
}