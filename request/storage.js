const namespace ='wx'

/**获取命名空间的数据
 * @param {*} key
 * @returns {any} 
 */
const getStorage =(key)=>{
return wx.getStorageSync(namespace)||{}
}
/**获取本地存储的数据
 * @param {*} key
 * @returns {any} 
 */
const get=(key)=>{
return getStorage()[key]
}
/**
 * 设置本地存储的数据
 * @param {*} key 
 * @param {*} value 
 */
const set=(key,value)=>{
  let storage =getStorage()
  // console.log(storage);
  storage[key] =value
 wx.setStorageSync(namespace,storage)
}

/**
 * 删除本地存储的某一项数据
 * @param {*} key 
 */
const remove=(key)=>{
  let storage = getStorage()
  delete storage[key]
   wx.removeStorageSync(namespace,storage)

}
/**
 * 清空本地存储的数据
 */
const clear =()=>{
   wx.clearStorageSync()

}

export default {
  get,
  getStorage,
  set,
  remove,
  clear
}