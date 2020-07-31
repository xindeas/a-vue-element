import axios from 'axios'
import qs from 'qs'

export function get (url, params) {
  axios({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'get',
    url: process.env.VUE_APP_BASE_URL + url,
    data: qs.stringify(params)
  })
}

export function post (url, params) {
  console.log('VUE_APP_BASE_URL', process.env)
  console.log('VUE_APP_BASE_URL', process.env.VUE_APP_BASE_URL)
  axios({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'post',
    url: process.env.VUE_APP_BASE_URL + url,
    data: qs.stringify(params)
  })
}
