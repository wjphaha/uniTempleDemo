<<<<<<< HEAD
let BASE_URL: string;

// 开发环境
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:88'
} else {
  // 生产环境
  BASE_URL = 'https://api.github.com'
}

=======
let BASE_URL: string;

// 开发环境
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:88'
} else {
  // 生产环境
  BASE_URL = 'https://api.github.com'
}

>>>>>>> 405d537a72fcfb1161951f70db07492a980a941c
export default BASE_URL;