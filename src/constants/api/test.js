// 测试
export const CARDS = '/admin/cards'
// 登录
export const LOGIN = '/th-auth-biz/auth-login/userLogin'
// 获取资料
export const COMPANY = '/th-auth-biz/login/getCompanyOne'
// 用户注册发送短信验证码接口
export const SEND = '/th-auth-biz/auth-login/registerSendSms'
// 用户注册接口
export const REGISTER = '/th-auth-biz/auth-login/registerUser'
// 用户忘记密码 设置
export const RESETPW = '/th-auth-biz/auth-login/resetLoginPsw'
// 用户忘记密码发送验证码
export const RESETCODE = '/th-auth-biz/auth-login/resetSendSMS'

// ======产品板块=====
// 获取所有可用产品信息
export const PRODUCT = '/th-auth-biz/auth-login/getProductList'
// 文件上传
export const UPLOAD = '/th-auth-biz/login/fileUpload'
// 企业认证填写资料
export const COMPANYAUTH = '/th-auth-biz/login/userSetCompany'
// 创建试用订单
export const CREATTEST = '/th-auth-biz/user-order/createProductPriceTest'
// 试用展示最基本的产品对应规格
export const TESTPRO = '/th-auth-biz/product/getProductPriceTest'
// 创建订单前查询改产品有哪些规格
export const TESTPRILIST = '/th-auth-biz/product/getProductPriceList'
// 查询自己的所有订单
export const ORDERLIST = '/th-auth-biz/user-order/getMyOrderList'
// 用户注销接口
export const LOGINOUT = '/th-auth-biz/auth-login/loginOut'
// 我的订单展示现在正在使用的订单详情
export const PROUSE = '/th-auth-biz/product/getProductPriceUse'
// 再次提交资料
export const RESETCOM = '/th-auth-biz/login/resetCompany'
// 资讯分页
export const NOTICES = '/th-auth-biz/tyteen-notice/selectNotices'
// 私有化部署咨询信息填写
export const SETMES = '/th-auth-biz/auth-login/setProductMessage'
// 填写发票信息
export const BILL = '/th-auth-biz/order-bill/setBill'
// 工作区跳转,获取token
export const JUMPTYTEEN = '/th-auth-biz/login/jumpTyteen'
// 资讯详情
export const NOTICEONE = '/th-auth-biz/tyteen-notice/getNoticeOne'
// 创建正常订单
export const PRODUCTORDER = '/th-auth-biz/user-order/createProductOrder'
// 生成支付二维码
export const ORDERCODE = '/th-auth-biz/user-order/createOrderCode'
// 查询自己当前订单是否支付成功
export const ORDERSTATUS = '/th-auth-biz/user-order/getMyOrderStatus'
// 银行卡支付
export const BANKPAY = '/th-auth-biz/user-order/bankPay'
// 通过订单id查询订单
export const GETORDERONE = '/th-auth-biz/user-order/getOrderOne'

// 取消订单请求
export const DELORDER = '/th-auth-biz/user-order/delOrder'

// 升级订单预请求
export const UPORDER = '/th-auth-biz/user-order/upgradeOrder'

// 升级订单确认下单
export const UPORDERCONFIRM = '/th-auth-biz/user-order/upgradeOrderConfirm'
// 续费订单预请求
export const DELAYORDER = '/th-auth-biz/user-order/delayOrder'
// 统计tab
export const ADDTABLE = '/th-auth-biz/auth-login/addTable'
// 真实IP统计
export const ADDREALIP = '/th-auth-biz/auth-login/addRealIp'
