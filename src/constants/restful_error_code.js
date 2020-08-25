const RESTFUL_ERROR_CODE_MAP = {
  11032: '短信一分钟内发送的太频繁',
  11037: '一个企业只能试用一次!',
  401: '表示用户没有权限',
  403: '表示用户得到授权（与401错误相对），但是访问是被禁止的',
  404: '用户发出的请求针对的是不存在的记录',
  406: '用户请求的格式不可得',
  410: '用户请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误'
}

export default RESTFUL_ERROR_CODE_MAP
