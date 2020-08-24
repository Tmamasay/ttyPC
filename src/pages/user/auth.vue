<template>
  <div class="ttOrderCont">
    <div class="ttOrderDet">
      <div class="ttOrtit">
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
    </div>
    <Footer />
  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
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
    this.getTestList({ page: 1, count: 10 })
  },
  methods: {
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
                message: '企业认证成功~',
                type: 'success',
                duration: 3 * 1000
              })
              setTimeout(() => {
                this.$router.push({ name: 'Price' })
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

