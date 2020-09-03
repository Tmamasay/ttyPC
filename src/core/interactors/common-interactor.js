import { Request } from '@/core/services/http/request'
import { CARDS, NOTICES, PROUSE, RESETCOM, ORDERLIST, LOGINOUT, CREATTEST, TESTPRILIST, TESTPRO, COMPANYAUTH, UPLOAD, PRODUCT, RESETCODE, LOGIN, COMPANY, SEND, REGISTER, RESETPW } from '@/constants/api/test'

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
