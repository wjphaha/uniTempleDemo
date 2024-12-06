import BASE_URL from "../../en";

const request = (url, method, data) => {
  const headers = {};
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: headers,
      success: (res) => {
        if (res.statusCode !== 200) {
          uni.$u.toast(res.data.message);
          return reject(res);
        }
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
