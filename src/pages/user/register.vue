<template>
  <div class="login-container" :style="{backgroundImage:'url('+bgImg+')'}">

    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="setNewRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <el-row>
        <el-col :span="8">
          <div class="login-text-warpper">
            <div class="imgLogo">
              <img src="@/assets/logo.png" alt srcset>
            </div>
            <div class="imgLeft">
              <img src="@/assets/leftIm.png" alt="" srcset="">
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="login-form-warpperR">
            <h3 class="login-form-title">用户注册</h3>
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                autocomplete="off"
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item prop="companyName">
              <el-input
                v-model="registerForm.companyName"
                autocomplete="off"
                placeholder="请输入公司名称"
              />
            </el-form-item>
            <el-form-item prop="position">
              <el-input
                v-model="registerForm.position"
                autocomplete="off"
                placeholder="请输入职位"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                autocomplete="off"
                placeholder="请输入登录密码"
              />
            </el-form-item>
            <el-form-item prop="passwordTwo">
              <el-input
                v-model="registerForm.passwordTwo"
                type="password"
                autocomplete="off"
                placeholder="确认新密码"
              />
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                autocomplete="off"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="registerForm.code"
                maxlength="6"
                autocomplete="off"
                placeholder="请填写验证码"
                style="width:260px;"
              />
              <el-button
                :disabled="canClick"
                size="medium"
                style="float:right;display:inline;"
                @click="getCode"
              >{{ content }}</el-button>
            </el-form-item>
            <el-button
              type="primary"
              style="width:100%;line-height: 20px;"
              class="reBtn"
              :disabled="!canClick"
              @click.native="findSubmit('registerForm')"
            >确 定</el-button>
            <!-- <el-button type="primary" size="medium" :disabled="!canClick" @click.native="findSubmit('registerForm')">确 定</el-button> -->
            <p class="login-form-forgetL" @ @click="visible = true">注册即表示同意泰霆云 <span @click="agreeXy">《使用协议》</span></p>
            <p class="login-form-forgetP" @click="goLogin">登录</p>
            <p class="login-bottom-text" @click="goHome">泰霆云高效的智能办公平台</p>

          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import login_bg from '@/assets/login/login_bg.png'
import login_img from '@/assets/login/login_cover.png'
import TestHttpInteractor from '@/core/interactors/common-interactor'
import { getUserInfo } from '@/core/services/cache'
import { ttyMD5 } from '@/utils/index'

export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      const ss = reg.test(value)
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else if (!ss) {
        callback(new Error('手机号码格式错误'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      const regPw = /^[0-9]*$/
      if (value.length < 1) {
        callback(new Error('请输入密码！'))
      } else if (value.length < 8) {
        callback(new Error('密码不能低于8位！'))
      } else if (value.length > 16) {
        callback(new Error('密码不能高于16位！'))
      } else if (regPw.test(value)) {
        callback(new Error('密码不能是纯数字哦！'))
      } else {
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      console.log(value)
      if (value.length < 1) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      info: getUserInfo(),
      bgImg: login_bg,
      loginImg: login_img,
      setNewRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        passwordTwo: [{ required: true, trigger: 'blur', validator: validatePass1 }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }]
        // code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      registerForm: {
        username: '', // 用户名
        companyName: '', // 公司名称
        position: '', // 职位
        password: '', // 密码
        passwordTwo: '', // 确认密码
        phone: '', // 手机号
        code: ''// 验证码
      },
      visible: false, // 找回密码
      flag: false, // 找回密码
      passwordType: 'password',
      capsTooltip: false,
      redirect: undefined,
      canClick: false, // 添加canClick,
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 120, // 记录具体倒计时时间
      clock: null,
      resetCont: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    console.log('============版本号：V2.0.10=============>')
  },
  mounted() {
    if (this.info) {
      this.$router.push({ name: 'Home' })
      return
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    },
    agreeXy() {
      const routeData = this.$router.resolve({ path: '/user/agreement' })
      window.open(routeData.href, '_blank')
      // this.$router.push({ name: 'Agreement' })
    },
    goLogin() {
      this.$router.push({ name: 'Login' })
    },
    countDown() {
      if (!this.canClick) return // 改动的是这两行代码
      // this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(this.clock)
          this.content = '重新发送验证码'
          this.totalTime = 120
          this.canClick = false // 这里重新开启
        }
      }, 1000)
    },
    // 找回密码提交
    findSubmit() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (this.registerForm.code.length !== 6) {
            this.$message({
              message: '请输入6位数验证码',
              type: 'error',
              duration: 3 * 1000
            })
            return false
          }
          const data = {
            param: {
              checkCode: this.registerForm.code,
              companyName: this.registerForm.companyName,
              name: this.registerForm.username,
              password: ttyMD5(this.registerForm.password),
              phone: this.registerForm.phone,
              position: this.registerForm.position
            }
          }
          TestHttpInteractor.registerUser(data).then(res => {
            if (res) {
              this.$message({
                message: '注册成功，即将跳转登录~',
                type: 'success',
                duration: 3 * 1000
              })
              setTimeout(() => {
                this.$router.push({ name: 'Login' })
                this.claerForgetForm() // 清楚表单
                this.visible = false
              }, 1000)
            }
          })
        }
      })
    },
    getCode() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.canClick = true
          const _params = {
            data: this.registerForm.phone

          }
          TestHttpInteractor.registerSendSms(_params).then(res => {
            console.log(res)
            console.log('---------------------k')
            if (res) {
              //   this.resetCont = res.data
              this.$message({
                message: '验证码发送成功',
                type: 'success',
                duration: 2 * 1000
              })
              this.countDown()
            } else {
              this.canClick = false
            }
          })
        }
      })
    },
    //     forgetPwd() {
    //       if (!this.loginForm.username) {
    //         this.$message({
    //           message: '请输入用户名',
    //           type: 'warning',
    //           duration: 3 * 1000
    //         })
    //         return false
    //       }
    //       this.forgetDialogFormVisible = true
    //       this.forgetForm = {
    //         phone: '',
    //         newPw: '',
    //         newPw1: '',
    //         code: ''
    //       }
    //       this.canClick = false
    //       this.content = '发送验证码'
    //       this.totalTime = 120
    //       window.clearInterval(this.clock)
    //     },
    claerForgetForm() {
      this.registerForm.username = '' // 用户名
      this.registerForm.companyName = '' // 公司名称
      this.registerForm.position = '' // 职位
      this.registerForm.password = '' // 密码
      this.registerForm.passwordTwo = '' // 确认密码
      this.registerForm.phone = '' // 手机号
      this.registerForm.code = ''// 验证码
      this.content = '重新发送验证码'
      this.totalTime = 60
      this.canClick = false
    }
    //     checkCapslock({ shiftKey, key } = {}) {
    //       if (key && key.length === 1) {
    //         if (
    //           (shiftKey && key >= 'a' && key <= 'z') ||
    //           (!shiftKey && key >= 'A' && key <= 'Z')
    //         ) {
    //           this.capsTooltip = true
    //         } else {
    //           this.capsTooltip = false
    //         }
    //       }
    //       if (key === 'CapsLock' && this.capsTooltip === true) {
    //         this.capsTooltip = false
    //       }
    //     },
    //     showPwd() {
    //       if (this.passwordType === 'password') {
    //         this.passwordType = ''
    //       } else {
    //         this.passwordType = 'password'
    //       }
    //       this.$nextTick(() => {
    //         this.$refs.password.focus()
    //       })
    //     },
    //     handleLogin(loginForm) {
    //       this.$refs[loginForm].validate(valid => {
    //         if (valid) {
    //           this.loading = true
    //           this.$store
    //             .dispatch('user/login', this.loginForm)
    //             .then(res => {
    //               if (res.data.code === '403') {
    //                 this.loading = false
    //                 this.$message.error(res.data.error_description)
    //               } else {
    //                 this.$router.push({ path: this.redirect || '/' })
    //                 this.loading = false
    //               }
    //             })
    //             .catch(() => {
    //               this.loginForm.password = ''
    //               this.loading = false
    //             })
    //         } else {
    //           return false
    //         }
    //       })
    //     }
  }
}
</script>

<style lang="scss">
$bg: #fff;
$cursor: #000;
$dark_gray: #889aa4;
$light_gray: #000;
.el-button{
    background-color: #0E4E90!important;
        border-color: #0E4E90!important;
            color: #FFF!important;
}
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  .login-form {
    position: absolute;
    width: 1320px;
    height: 790px;
    // height: 494px;
    /*background-image: url("@/assets/logim/login_cover.png");*/
    left: 50%;
    top: 50%;
    border-radius: 5px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    .login-text-warpper {
      margin: 50px 40px 0 40px;
      color: #000;
      .imgLogo{
            width: 127px;
            height: 38px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
      }
      .imgLeft{
        width: 476px;
        height: 343px;
        overflow: hidden;
        margin-top: 150px;
        margin-left: 77px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .login-text-eng::before {
        content: "";
        position: absolute;
        border-bottom: 2px solid #ddd;
        width: 32px;
        bottom: 0;
        left: 0;
      }
      .login-text-des {
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 40px;
        line-height: 30px;
        text-align: justify;
        font-weight: bold;
        letter-spacing: 1px;
      }
      .login-text-author {
        text-align: right;
        font-size: 20px;
      }
    }
    .login-form-warpperR {
       width: 420px;
      margin-top:80px ;
      margin-left: 300px;
      .login-form-title {
        font-size: 20px;
        color: #333333;
        position: relative;
        padding-left: 12px;
        margin: 0 0 50px;
      }
      .login-form-title::before {
        content: "";
        position: absolute;
        left: 0;
        background: #0E4E90;
        width: 5px;
        height: 20px;
        top: 1px;
        border-radius: 2px;
      }
      .reBtn{
        width: 100%;
        height: 44px;
background: #0E4E90;
border-radius: 5px;
font-size: 14px;
font-family: PingFang SC;
font-weight: 500;
color: #FFFBFB;
line-height: 44px;
      }
      .login-form-forgetL {
        cursor: pointer;
         float: left;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #646464;
        margin-top: 10px;
      span{
        color: #2A78DC;
      }
      }
      .login-bottom-text {
        cursor: pointer;
        margin-bottom: 0;
        margin-top: 90px;
        font-size: 14px;
        text-align: center;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #2A78DC !important;
      line-height: 36px;
      }
      .login-form-forgetP {
        color: #0E4E90;
        float: right;
        cursor: pointer;
        margin-top: 10px;
        font-size: 12px;
      }
      .login-bottom-text {
        cursor: pointer;
        margin-bottom: 0;
        margin-top: 90px;
        font-size: 14px;
        text-align: center;
        color: #b8b8b8;
      }
      .ele-form-item {
        border-bottom: 1px solid #dbdbdb;
        background: transparent;
        input {
          background: transparent;
          border: 0px !important;
          -webkit-appearance: none;
          border-radius: 0px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
        .el-input__inner {
          padding: 12px 5px 12px 40px;
        }
        .show-pwd {
          position: absolute;
          right: 10px;
          font-size: 16px;
          color: $dark_gray;
          cursor: pointer;
          user-select: none;
          top: 50%;
          transform: translate(0, -50%);
        }
        .svg-container {
          position: absolute;
          left: 0px;
          z-index: 99;
          width: 40px;
          text-align: center;
          color: #c7c7c7;
          top: 50%;
          transform: translate(-10%, -50%);
        }
      }
    }
  }
}
</style>
