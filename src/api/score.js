import request from '@/utils/request'

export function getScoreListApi() {
  return request({
    url:'/score/list'
  })
}