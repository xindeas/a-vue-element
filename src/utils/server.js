import axios from 'axios'

const baseUrl = process.env.VUE_APP_BASE_URL.endsWith('/') ? process.env.VUE_APP_BASE_URL.slice(0, process.env.VUE_APP_BASE_URL.length - 1) : process.env.VUE_APP_BASE_URL

export function get (url, params) {
  url = url.startsWith('/') ? url : '/' + url
  return axios({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    method: 'get',
    url: baseUrl + url,
    params: params
  })
}

export function post (url, params) {
  url = url.startsWith('/') ? url : '/' + url
  return axios({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    method: 'post',
    url: baseUrl + url,
    data: params
  })
}
