import request from "../utils/request";

export const articleList = (data) => {
  return request("/admin/articles", "get",data);
};


export const articleListById = (id) => {
  return request(`/admin/articles/${id}`, "get");
};


export const userList = (data) => {
  return request(`/users/${data.pageNum}/${data.pageSize}`, "get", data);
};


export const userById = (id) => {
  return request(`/users/${id}`, "get");
};

export const searchUsers = (params) => {
  return request('/users', 'get', {
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    name: params.name,
    // 其他可能的过滤参数
  });
};
