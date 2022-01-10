// 系统环境变量配置
const config = {
  development: {
    // env: 'dev',
    // hostname: '/api',
    // hostname: 'http://cloud.elianzhixiao.com/gateway',
    hostname: 'https://temp.elianzhixiao.com/gateway'
  },
  test: {
    env: 'test',
    hostname: 'https://temp.elianzhixiao.com/gateway'
  },
  production: {
    env: 'prod',
    hostname: 'http://cloud.elianzhixiao.com/gateway'
  }
}
export default config[process.env.NODE_ENV || 'development']
