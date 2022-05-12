import request from '@/utils/request'

// 数据初始化
export function initApi() {
  return request({
    url:'/init/data',
  })
}

export function getListApi() {
  return request({
    url: '/student/list',
  })
}

export function addStudentApi(data) {
  return request({
    url:'/student/add',
    method:'post',
    data
  })
}

// 获取省
export function getProvinceApi() {
  return request({
    url:'/geo/province'
  })
}
// 获取市
export function getCityApi(params) {
  return request({
    url:'/geo/city',
    params
  })
}
// 获取县
export function getCountyApi(params) {
  return request({
    url:'/geo/county',
    params
  })
}

export function delStudentApi(id) {
  return request({
    url:'/student/delete/'+ id,
    method:'delete',
  })
}
