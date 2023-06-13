import http from './http'
function getcode(params){
  return http.get('api/getProduct',params)
}
export default getcode