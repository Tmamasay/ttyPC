import { Request } from '@/core/services/http/request'
import { CARDS, ADDTABLE, ADDREALIP, DELAYORDER, DELORDER, UPORDER, UPORDERCONFIRM, GETORDERONE, BANKPAY, ORDERSTATUS, ORDERCODE, PRODUCTORDER, NOTICEONE, BILL, JUMPTYTEEN, SETMES, NOTICES, PROUSE, RESETCOM, ORDERLIST, LOGINOUT, CREATTEST, TESTPRILIST, TESTPRO, COMPANYAUTH, UPLOAD, PRODUCT, RESETCODE, LOGIN, COMPANY, SEND, REGISTER, RESETPW } from '@/constants/api/test'

class TestHttpInteractor {
  service
  constructor(service) {
    this.service = service
  }
  // 获取公司
  async getCompanies(data) {
    try {
      const optons = { url: `http://47.114.91.11:10001/auth/oauth/companies`, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 个人登录
  async oauthLogin(data) {
    try {
      const optons = { url: `http://47.114.91.11:10001/auth/oauth/login`, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 工作区跳转,获取token
  async jumpTyteen(data) {
    try {
      const optons = { url: JUMPTYTEEN, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 通过订单id查询订单
  async getOrderOne(data) {
    try {
      const optons = { url: GETORDERONE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 升级订单预请求
  async upgradeOrder(data) {
    try {
      const optons = { url: UPORDER, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 升级订单queren
  async upgradeOrderConfirm(data) {
    try {
      const optons = { url: UPORDERCONFIRM, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 取消订单请求
  async delOrder(data) {
    try {
      const optons = { url: DELORDER, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 创建正常订单
  async createProductOrder(data) {
    try {
      const optons = { url: PRODUCTORDER, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 生成支付二维码
  async createOrderCode(data) {
    try {
      const optons = { url: ORDERCODE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 资讯详情
  async getNoticeOne(data) {
    try {
      const optons = { url: NOTICEONE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 私有化部署咨询信息填写
  async setProductMessage(data) {
    try {
      const optons = { url: SETMES, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 登录
  async userLogin(data) {
    try {
      const optons = { url: LOGIN, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 获取当前登录者企业资料
  async getCompanyOne(data) {
    try {
      const optons = { url: COMPANY, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 用户注册发送短信验证码接口
  async registerSendSms(data) {
    try {
      const optons = { url: SEND, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 用户注册
  async registerUser(data) {
    try {
      const optons = { url: REGISTER, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 用户注册发送短信验证码接口
  async resetSendSMS(data) {
    try {
      const optons = { url: RESETCODE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 用户忘记密码 设置
  async resetLoginPsw(data) {
    try {
      const optons = { url: RESETPW, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 企业认证上传
  async fileUpload(data) {
    try {
      const optons = { url: UPLOAD, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 企业认证填写资料
  async userSetCompany(data) {
    try {
      const optons = { url: COMPANYAUTH, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 获取所有可用产品信息
  async getProductList(data) {
    try {
      const optons = { url: PRODUCT, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 创建订单前查询改产品有哪些规格
  async getProductPriceList(data) {
    try {
      const optons = { url: TESTPRILIST, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 试用展示最基本的产品对应规格
  async getProductPriceTest(data) {
    try {
      const optons = { url: TESTPRO, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 统计Tab
  async addTable(data) {
    try {
      const optons = { url: ADDTABLE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 真实IP统计
  async addRealIp(data) {
    try {
      const optons = { url: ADDREALIP, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 续费订单预请求
  async delayOrder(data) {
    try {
      const optons = { url: DELAYORDER, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 创建试用订单
  async createProductPriceTest(data) {
    try {
      const optons = { url: CREATTEST, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 查询自己的所有订单
  async getMyOrderList(data) {
    try {
      const optons = { url: ORDERLIST, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 查询自己当前订单是否支付成功
  async getMyOrderStatus(data) {
    try {
      const optons = { url: ORDERSTATUS, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 银行卡支付
  async bankPay(data) {
    try {
      const optons = { url: BANKPAY, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 我的订单展示现在正在使用的订单详情
  async getProductPriceUse(data) {
    try {
      const optons = { url: PROUSE, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  // 再次提交资料
  async resetCompany(data) {
    try {
      const optons = { url: RESETCOM, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 填写发票信息
  async setBill(data) {
    try {
      const optons = { url: BILL, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 用户注销接口
  async loginOut(data) {
    try {
      const optons = { url: LOGINOUT, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  // 资讯分页
  async selectNotices(data) {
    try {
      const optons = { url: NOTICES, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }

  async getTest(params) {
    try {
      const options = { url: CARDS, params }
      return await this.service.get(options)
    } catch (error) {
      throw error
    }
  }

  async createTest(data) {
    try {
      const optons = { url: CARDS, data }
      return await this.service.post(optons)
    } catch (error) {
      throw error
    }
  }
  async deleteTest(id) {
    try {
      const options = { url: `${CARDS}/${id}` }
      return await this.service.delete(options)
    } catch (error) {
      throw error
    }
  }
  async updateTest(data, id) {
    try {
      const optons = { url: `${CARDS}/${id}`, data }
      return await this.service.put(optons)
    } catch (error) {
      throw error
    }
  }
}

const testHttpInteractor = new TestHttpInteractor(Request.getInstance())
export default testHttpInteractor
