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

export function updateStudentApi(data) {
  return request({
    url:'/student/update',
    method:'put',
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
    url:`geo/city/?pname=${params}`,
  })
}
// 获取县
export function getCountyApi(params,par) {
  return request({
    url:`/geo/county/?pname=${params}&cname=${par}`,
  })
}

export function delStudentApi(id) {
  return request({
    url:`/student/delete/?id=${id}`,
    method:'delete',
  })
}

export function getOneStudentApi(id) {
  return request({
    url:`/student/one/?id=${id}`
  })
}
