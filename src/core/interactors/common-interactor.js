import { Request } from '@/core/services/http/request'
import { CARDS, LOGIN, COMPANY, SEND, REGISTER, RESETPW } from '@/constants/api/test'

class TestHttpInteractor {
  service
  constructor(service) {
    this.service = service
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
  // 用户注册发送短信验证码接口
  async registerUser(data) {
    try {
      const optons = { url: REGISTER, data }
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
