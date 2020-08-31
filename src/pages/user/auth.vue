<template>
  <div class="ttOrderCont">
    <div class="ttOrderDet">
      <div v-if="+authInfo.user.companyStatus!==2" class="ttShowIcon">
        <div class="ttyStep">
          <div :class="{'step':1}" :style="{backgroundImage:'url('+stepBg1+')'}">
            <div>
              <img src="@/assets/step1.png" alt="" srcset="">
            </div>
          </div>
          <p class="activeTit activeAuth">1.企业认证</p>
        </div>
        <p :class="{ 'line':1,'checkAuth':+authInfo.user.companyStatus===1||+authInfo.user.companyStatus===3}" />
        <div class="ttyStep">
          <div :class="{'step':1,'authBg':+authInfo.user.companyStatus!==1}" :style="{backgroundImage:'url('+stepBg2+')'}">
            <div>
              <img src="@/assets/step2.png" alt="" srcset="">
            </div>
          </div>
          <p :class="{'activeTit':1, 'activeAuth':+authInfo.user.companyStatus===1||+authInfo.user.companyStatus===3}">2.认证审核</p>
        </div>
        <p :class="{'line':1,'checkAuth':+authInfo.user.companyStatus===3}" />
        <div class="ttyStep">
          <div :class="{'step':1,'authBg':+authInfo.user.companyStatus!==3}" :style="{backgroundImage:'url('+stepBg3+')'}">
            <div>
              <img src="@/assets/step3.png" alt="" srcset="">
            </div>

          </div>
          <p :class="{'activeTit':1,'activeAuth':+authInfo.user.companyStatus===3}">3.审核结果</p>
        </div>
      </div>
      <div v-if="+authInfo.user.companyStatus===0" class="ttOrtit">
        <el-form
          ref="authForm"
          :model="authForm"
          :rules="setNewRules"
          label-position="right"
          label-width="400px"
        >
          <!-- <h3 class="login-form-title">企业认证</h3> -->
          <el-form-item prop="companyName" label="公司名称：">
            <el-input
              v-model="authForm.companyName"
              autocomplete="off"
              placeholder="请输入公司名称"
              style="width: 50%;"
            />
          </el-form-item>
          <el-form-item label="统一社会信用代码/注册号/组织机构代码：" prop="companyCode">
            <el-input
              v-model="authForm.companyCode"
              autocomplete="off"
              placeholder="请输入"
              style="width: 50%;"
            />
          </el-form-item>
          <el-form-item label="注册地址：" prop="address">
            <el-input
              v-model="authForm.address"
              autocomplete="off"
              placeholder="请输入注册地址"
              style="width: 50%;"
            />
          </el-form-item>
          <el-form-item label="注册日期：" prop="companyTime">
            <el-date-picker v-model="authForm.companyTime" type="date" placeholder="请选择" style="width: 50%;" />
          </el-form-item>
          <el-form-item label="经营期限制：" prop="limitTime">
            <el-date-picker v-model="authForm.limitTime" type="date" placeholder="请选择" style="width: 50%;" />
          </el-form-item>
          <el-form-item label="上传营业执照：" prop="company_img" class="ttyUpload">
            <div>
              <el-upload
                list-type="picture-card"
                action
                :http-request="uploadFile"
                :limit="1"
                :on-change="handlePreview"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus" />
                <div slot="tip" class="el-upload__tip">
                  提示：
                  清晰的图片可以让您更快通过审核
                  推荐上传扫描文件，拍照尽量降低反光
                  请确保营业执照图片所有信息清晰可见，内容真实有效，无任何修改
                  文件大小不超过8M，支持格式JPG，JPEG,PNG,PDF
                </div>
              </el-upload>
            </div>
          </el-form-item>
          <el-button class="makeSrue" type="primary" size="medium" @click.native="findSubmit('authForm')">确 定</el-button>
        </el-form>
      </div>
      <div v-if="+authInfo.user.companyStatus===1" class="checkAuthing">
        <div class="checkAuImg">
          <img src="@/assets/checkAu.png" alt="" srcset="">
        </div>
        <p class="C1">您的企业认证资料已经提交</p>
        <p class="C2">正在审核中...</p>
      </div>
      <div v-if="+authInfo.user.companyStatus===3" class="checkAuthing">
        <div class="checkFailImg">
          <img src="@/assets/fail.png" alt="" srcset="">
        </div>
        <p class="C1">您的企业认证资料未通过</p>
        <p class="C2">{{ authInfo.user.reason||'企业信息有误' }}</p>
        <p class="C3" @click="recertification">再次认证</p>
      </div>
      <div v-if="+authInfo.user.companyStatus===2" class="showTrue">
        <p class="O1"><span />企业认证</p>
        <p class="O2"><span>公司名称：{{ authInfo.company.companyName }}</span></p>
        <p class="O2"><span>统一社会信用代码/注册号/组织机构代码：{{ authInfo.company.companyName }}</span></p>
        <p class="O2"><span>公司注册地址：{{ authInfo.company.address }}</span></p>
        <p class="O2"><span>注册日期：{{ formatDate(authInfo.company.createTime) }}</span></p>
        <p class="O2"><span>经营期限至：{{ formatDate(authInfo.company.limitTime) }}</span></p>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import step_bg from '@/assets/stepBg.png'
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { setUserInfo, getUserInfo } from '@/core/services/cache'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      authInfo: getUserInfo(),
      stepBg1: step_bg,
      stepBg2: +getUserInfo().user.companyStatus === 1 || +getUserInfo().user.companyStatus === 3 ? step_bg : '',
      stepBg3: +getUserInfo().user.companyStatus === 3 ? step_bg : '',
      authForm: {
        address: '', // 地址
        companyCode: '', // 信用代码
        companyName: '', // 公司名字
        companyTime: '', // 注册日期
        company_img: '', // 营业执照
        limitTime: ''// 经营限期
      },
      uploadData: null,
      setNewRules: { // 修改表单验证
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: '请输入社会统一信用代码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入注册地址', trigger: 'change' }
        ],
        companyTime: [
          { required: true, message: '请输入注册日期', trigger: 'change' }
        ],
        limitTime: [
          { required: true, message: '请输入经营到期时间', trigger: 'blur' }
        ],
        company_img: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ]
      }

    }
  },
  async created() {
    this.getCompany()
  },
  mounted() {
    this.getCompany()
  },
  methods: {
    recertification() {
      testHttpInteractor.resetCompany().then(info => {
        location.reload()
      })
    },
    // 时间戳转换
    formatDate(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    getCompany() {
      testHttpInteractor.getCompanyOne().then(info => {
        setUserInfo(info)
        this.authInfo = info
        this.stepBg2 = +this.authInfo.user.companyStatus === 1 || +this.authInfo.user.companyStatus === 3 ? step_bg : ''
        this.stepBg3 = +this.authInfo.user.companyStatus === 3 ? step_bg : ''
      }).catch(error => {
        console.log(error)
      })
    },

    // 找回密码提交
    findSubmit() {
      this.$refs.authForm.validate(valid => {
        if (valid) {
          this.authForm.companyTime = new Date(this.authForm.companyTime).toLocaleDateString().replace(/\//g, '-')
          this.authForm.limitTime = new Date(this.authForm.limitTime).toLocaleDateString().replace(/\//g, '-')
          const data = {
            param: this.authForm
          }
          testHttpInteractor.userSetCompany(data).then(res => {
            if (res) {
              this.$message({
                message: '企业认证提交审核成功~',
                type: 'success',
                duration: 3 * 1000
              })
              setTimeout(() => {
                this.getCompany()
              }, 1000)
            }
          })
        }
      })
    },
    handleSuccess(response) {
      console.log(response)
      console.log('888888888888')
    },
    uploadFile(e) {
      testHttpInteractor.fileUpload(this.uploadData).then(res => {
        if (res) {
          console.log(res)
          this.authForm.company_img = res
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.status)
        }
      })
    },
    // 获取上传文件信息
    handlePreview(file) {
      const _this = this
      var formData = new FormData()
      formData.append('file', file.raw)
      _this.uploadData = formData
    },
    onAdd() {
      this.$router.push({ name: 'CreateTest' })
    },
    onEdit(item, index) {
      this.$router.push({ name: 'EditTest', params: { id: item.id }})
    },
    async getTestList(query) {
      try {
        this.query = Object.assign({}, this.query, query)
        const { data, total } = await testHttpInteractor.getTestList(
          this.query
        )
        this.listTotal = total
        if (this.query.page === 1) {
          this.list = data
        } else {
          this.list = [...this.list, ...data]
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.ttOrderCont{
  width: 100%;
.ttOrderDet{
  width:1350px;
  // height:376px;
  margin: 50px auto;
  background:rgba(255,255,255,1);
  border:1px solid rgba(211,211,211,1);
  border-radius:10px;
  .ttShowIcon{
     margin-top:20px;
      margin-left: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    .authBg{
      background:rgba(205,205,205,1);
    }
    .ttyStep{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    .step{
       margin: 0px!important;
      padding: 0px !important;
      width: 52px;
      height: 52px;
      border-radius:50%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      div{
        width: 25px;
        height: 26px;
        overflow: hidden;
        img{
          widows: 100%;
          height: 100%;
        }

      }
    }
    .activeTit{
          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
         color:rgba(45,45,45,1);
        }
        .activeAuth{
         color:rgba(23,105,191,1);
        }
  }

    .line{

      width:80px;
      height:2px;
      margin-top: -18px;
      background:rgba(205,205,205,1);
    }
    .checkAuth{
      background:rgba(99,163,230,1);
    }
  }
  .showTrue{
     cursor: pointer;
    margin: 50px 100px;
    .O1{
     font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(45,45,45,1);
      margin-bottom: 20px;
      span{
        display: inline-block;
        width:4px;
        height:23px;
        background:rgba(13,77,143,1);
        border-radius:2px;
        vertical-align:middle;
        margin-right:10px ;
        margin-top: -2px;
      }
    }
    .O2{
      width: 300px;
      margin: 0 auto;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(45,45,45,1);
      line-height:45px;

      span{
        margin-left: 10px;
        width: 500px;
        display: inline-block;
        // margin-right: 205px;
      }
    }

  }
  .checkAuthing{
    text-align: center;
    padding-top: 50px;
    padding-bottom: 150px;
    .checkFailImg{
      width: 145px;
      height: 109px;
      overflow: hidden;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }

    }
    .checkAuImg{
      width: 216px;
      height: 159px;
      overflow: hidden;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }

    }
    .C1{
      font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(46,46,46,1);
    }
    .C2{
      font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
    }
    .C3{
      width:116px;
      height:40px;
      background:rgba(13,77,143,1);
      border-radius:5px;
      font-size:16px;
font-family:PingFang SC;
font-weight:500;
color:rgba(241,241,241,1);
line-height:40px;
margin: 0 auto;
    }
  }
  .ttOrtit{
    cursor: pointer;
    margin: 50px 100px;
    .makeSrue{
      margin-left: 390px;;
      // display: flex;
      // justify-content: flex-start;

    }

  }
}

}
</style>

