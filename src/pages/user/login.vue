<template>
  <div class="login-container" :style="{backgroundImage:'url('+bgImg+')'}">

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <el-row>
        <el-col :span="10">
          <div class="login-text-warpper">
            <div class="imgLogo">
              <img src="@/assets/logo.png" alt srcset>
            </div>
            <div class="imgLeft">
              <img src="@/assets/leftIm.png" alt="" srcset="">
            </div>
            <!-- <p class="login-text-author">—— {{ textName }}</p> -->
          </div>
        </el-col>
        <el-col :span="14">
          <div class="login-form-warpper">
            <h3 class="login-form-title">欢迎使用</h3>
            <div class="loginWeap">
              <p :class="{'L1':1,'active':active===1}" @click="checkItem(1)">企业登录</p>
              <p :class="{'L2':1,'active':active===2 }" @click="checkItem(2)">个人登录</p>
            </div>
            <el-form-item prop="username" class="ele-form-item">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入手机号"
                name="username"
                type="text"
                auto-complete="on"
                @blur="getCompany"
              />
            </el-form-item>
            <el-form-item v-if="active===2" prop="company" class="ele-form-item">
              <span class="svg-container">
                <svg-icon icon-class="icon" />
              </span>
              <el-select v-model="loginForm.company" placeholder="请选择" style="width:400px">
                <el-option
                  v-for="item in companies"
                  :key="item.id"
                  :label="item.company"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item prop="password" class="ele-form-item">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                auto-complete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin('loginForm')"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-button
              type="primary"
              style="width:100%;line-height: 20px;margin-top: 20px;font-size:17px"
              @click.native.prevent="handleLogin('loginForm')"
            >登 陆</el-button>
            <p v-if="active===1" class="login-form-forgetL" @click="visible = true">忘记密码？</p>
            <p v-if="active===1" class="login-form-forgetP" @click="goregist">立即注册</p>
            <p class="login-bottom-text" @click="goHome">泰霆云高效的智能办公平台</p>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog title="找回密码" :visible.sync="visible" :close-on-click-modal="false" width="445px">
      <el-form ref="forgetForm" size="medium" :model="forgetForm" :rules="setNewRules">
        <el-form-item prop="phone">
          <el-input
            v-model="forgetForm.phone"
            maxlength="11"
            autocomplete="off"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item prop="newPw">
          <el-input
            v-model="forgetForm.newPw"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item prop="newPw1">
          <el-input
            v-model="forgetForm.newPw1"
            type="password"
            autocomplete="off"
            placeholder="确认新密码"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="forgetForm.code"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="medium" :disabled="!canClick" @click.native="findSubmit('forgetForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import login_bg from '@/assets/login/login_bg.png'
import login_img from '@/assets/login/login_cover.png'
import { ttyMD5 } from '@/utils/index'
import { getUserInfo } from '@/core/services/cache'
import TestHttpInteractor from '@/core/interactors/common-interactor'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
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
      if (value.length < 1) {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      console.log(value)
      if (value.length < 1) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forgetForm.newPw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      active: 1,
      companies: [],
      info: getUserInfo(),
      bgImg: login_bg,
      loginImg: login_img,
      loginForm: {
        username: '',
        password: '',
        company: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        company: [
          { required: true, message: '请选择所属企业', trigger: 'change' }
        ]
      },
      setNewRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        // code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        newPw: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPw1: [{ required: true, trigger: 'blur', validator: validatePass1 }]
      },
      forgetForm: {
        phone: '',
        newPw: '',
        newPw1: '',
        code: ''
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
    // this.getCompanies()
    console.log('============版本号：V2.0.10=============>')
  },
  mounted() {
    if (this.info) {
      this.$router.push({ name: 'Home' })
      return
    }
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
    const _this = this
    document.onkeydown = function(e) {
      e = e || window.event
      if (+e.keyCode === 13) {
        _this.handleLogin('loginForm')
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    },
    getCompany() {
      if (+this.active === 2) {
        this.getCompanies()
      }
    },
    checkItem(e) {
      this.active = e
    },
    async getCompanies() {
      const _params = {
        content: {
          phoneNumber: this.loginForm.username
        }
      }
      const data = await TestHttpInteractor.getCompanies(_params)
      this.companies = data
      // console.log(data)
    },
    goregist() {
      this.$router.push({ name: 'Register' })
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
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          if (this.forgetForm.newPw !== this.forgetForm.newPw1) {
            this.$message({
              message: '两次输入的密码不一致',
              type: 'error',
              duration: 3 * 1000
            })
            return false
          }
          if (this.forgetForm.code.length !== 6) {
            this.$message({
              message: '请输入6位数验证码',
              type: 'error',
              duration: 3 * 1000
            })
            return false
          }
          const data = {
            param: {
              checkCode: this.forgetForm.code,
              phone: this.forgetForm.phone,
              password: ttyMD5(this.forgetForm.newPw)

            }
          }
          TestHttpInteractor.resetLoginPsw(data).then(res => {
            if (res) {
              this.$message({
                message: '密码重置成功',
                type: 'success',
                duration: 3 * 1000
              })
              this.loginForm.password = ''
              this.claerForgetForm() // 清楚表单
              this.visible = false
            }
          })
        }
      })
    },
    getCode() {
      if (!this.loginForm.username) {
        this.$message({
          message: '请输入账号',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }
      this.$refs.forgetForm.validate(valid => {
        if (valid) {
          this.canClick = true
          // debugger
          const _params = {
            data: this.forgetForm.phone

          }

          TestHttpInteractor.resetSendSMS(_params).then(res => {
            debugger
            if (res) {
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
    forgetPwd() {
      this.forgetDialogFormVisible = true
      this.forgetForm = {
        phone: '',
        newPw: '',
        newPw1: '',
        code: ''
      }
      this.canClick = false
      this.content = '发送验证码'
      this.totalTime = 120
      window.clearInterval(this.clock)
    },
    claerForgetForm() {
      this.forgetForm.phone = ''
      this.forgetForm.code = ''
      this.forgetForm.newPwd = ''
      this.forgetForm.newPassworld = ''
      this.content = '重新发送验证码'
      this.totalTime = 60
      this.canClick = false
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin(loginForm) {
      debugger
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/userLogin', this.loginForm)
            .then(res => {
              console.log(res)
              console.log(res.accessToken)

              if (res.accessToken) {
                window.location.href = `http://www.tyteenyun.com/ttbuild/#/workbench/approvalProcess?accessToken=${res.accessToken}`
                console.log('0000000')
              }
              if (res.user && res.user.id) {
                this.$router.push({ name: 'Home' })
              }
              // this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loginForm.password = ''
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
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
      /*.login-text-eng {
        font-size: 28px;
        font-weight: bold;
        position: relative;
        margin-top: 0;
        padding-bottom: 15px;
        margin-bottom: 40px;
      }*/
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
    .login-form-warpper {
      width: 400px;
      margin-top:200px ;
      margin-left: 180px;
      .loginWeap{
        margin-top:-20px ;
          display: flex;
          justify-content: space-around;
          align-items: center;
          cursor: pointer;
          .L1{
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2E2E2E;
          // line-height: 55px;
          padding-bottom: 6px;

          }
          .L2{
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #2E2E2E;
            line-height: 55px;
            padding-bottom: 5px;

          }
          .active{
            border-bottom: 2px solid rgba($color: #2A77DC, $alpha: 1.0);

         color: #2A78DC;
          }

        }
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
      .login-form-forgetL {
        color:#646464;
        float: left;
        cursor: pointer;
        margin-top: 10px;
        font-size: 14px;
      }
      .login-form-forgetP {
        color: #2A78DC;
        float: right;
        cursor: pointer;
        margin-top: 10px;
        font-size: 14px;
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
      color: #2A78DC;
      line-height: 36px;
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
