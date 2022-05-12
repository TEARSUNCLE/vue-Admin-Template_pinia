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
