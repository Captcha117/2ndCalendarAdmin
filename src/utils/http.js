import request from "@/utils/request";

export function get(url, params) {
  return request({
    url,
    method: "get",
    params,
  }).then((response) => response.data);
}

export function post(url, data) {
  return request({
    url,
    method: "post",
    data: data || {},
  }).then((response) => response.data);
}
