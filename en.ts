let BASE_URL: string;

// 开发环境
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:88'
} else {
  // 生产环境
  BASE_URL = 'https://api.github.com'
}

export default BASE_URL;