<template>
  <div class="ttyInvo">
    <el-form
      ref="invoForm"
      :model="invoForm"
      :rules="setNewRules"
      label-position="right"
      label-width="150px"
    >
      <el-form-item label="企业名称：">
        <el-input v-model="company" :readonly="true" autocomplete="off" placeholder="请输入企业名称" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="billTitle" label="发票抬头：">
        <el-input v-model="invoForm.billTitle" autocomplete="off" placeholder="请输入发票抬头" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="billCode" label="纳税人识别号：">
        <el-input v-model="invoForm.billCode" autocomplete="off" placeholder="请输入纳税人识别号" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="registerPhone" label="注册电话：">
        <el-input v-model="invoForm.registerPhone" autocomplete="off" placeholder="请输入注册电话" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="bankName" label="开户银行：">
        <el-input v-model="invoForm.bankName" autocomplete="off" placeholder="请输入开户银行" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="sendPhone" label="收货电话：">
        <el-input v-model="invoForm.sendPhone" autocomplete="off" placeholder="请输入收货电话" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="sendAddress" label="收货地址：">
        <el-input v-model="invoForm.sendAddress" autocomplete="off" placeholder="请输入收货地址" style="width: 75%;" />
      </el-form-item>
      <el-form-item prop="registerAddress" label="注册地址：">
        <el-input v-model="invoForm.registerAddress" autocomplete="off" placeholder="请输入注册地址" style="width: 75%;" />
      </el-form-item>
      <div class="showPrice">
        <p>发票内容：<span class="Pr1">软件服务费</span> </p>
        <p>开票金额：<span class="Pr2">¥{{ money }}</span> </p>
      </div>
      <p class="makeSrue" @click="findSubmit('invoForm')">确 定</p>

    </el-form>

  </div>

</template>

<script>
import TestHttpInteractor from '@/core/interactors/common-interactor'
export default {
  name: 'Invoice',
  props: {
    info: {
      type: Object
    }
  },
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
    return {
      company: '111',
      money: '',
      invoForm: {
        bankCode: '',
        bankName: '',
        billCode: '',
        billTitle: '',
        id: '',
        registerAddress: '',
        registerPhone: '',
        sendAddress: '',
        sendPhone: ''
      },
      setNewRules: {
        billTitle: [
          { required: true, message: '请输入发票抬头', trigger: 'blur' }
        ],
        billCode: [
          { required: true, message: '请输入纳税人识别号', trigger: 'blur' }
        ],
        registerPhone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        bankName: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        sendPhone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        sendAddress: [
          { required: true, message: '请输入收货地址', trigger: 'blur' }
        ],
        registerAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.company = this.info.user.companyName
    this.invoForm.id = this.info.order.id
    this.money = this.info.order.price
  },
  beforeDestroy() {

  },
  methods: {
    findSubmit() {
      this.$refs.invoForm.validate(valid => {
        if (valid) {
          const _param = {
            data: this.invoForm
          }
          TestHttpInteractor.setBill(_param).then(res => {
            if (data) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 3 * 1000
              })
            }
          })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.ttyInvo{
  width: 100%;
  .makeSrue{
   width: 116px;
height: 40px;
background: #0E4D90;
border-radius: 5px;
   margin: 0 auto;
text-align: center;
font-size: 16px;
font-family: PingFang SC;
font-weight: 500;
color: #F2F2F2;
line-height: 40px;
cursor: pointer;

 }
 .showPrice{
   cursor: pointer;
   display: flex;
   justify-content: space-around;
   p{
     margin-top: -5px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #606266;
    line-height: 10px;
    font-weight: 700;
    margin-bottom: 15px;
      .Pr1{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color:#646464;
    line-height: 30px;
   }
   .Pr2{

font-size: 18px;
font-family: PingFang SC;
font-weight: 500;
color: #FE5547;
line-height: 30px;

   }

   }

 }
}

</style>
