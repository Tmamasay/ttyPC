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
        <el-input v-model="company" autocomplete="off" placeholder="请输入企业名称" style="width: 75%;" />
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
      <el-button class="makeSrue" type="primary" size="medium" @click.native="findSubmit('authForm')">确 定</el-button>
    </el-form>

  </div>

</template>

<script>
export default {
  name: 'Invoice',
  data() {
    return {
      company: '111',
      invoForm: {
        bankCode: '银行账号',
        bankName: '开户银行',
        billCode: '识别号',
        billTitle: '抬头',
        id: '订单主键',
        registerAddress: '注册地址',
        registerPhone: '注册电话',
        sendAddress: '收货地址',
        sendPhone: '收货电话'
      },
      setNewRules: {
        billTitle: [
          { required: true, message: '请输入发票抬头', trigger: 'blur' }
        ],
        billCode: [
          { required: true, message: '请输入纳税人识别号', trigger: 'blur' }
        ],
        registerPhone: [
          { required: true, message: '请输入注册电话', trigger: 'change' }
        ],
        bankName: [
          { required: true, message: '请输入开户银行', trigger: 'change' }
        ],
        sendPhone: [
          { required: true, message: '请输入收货电话', trigger: 'blur' }
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

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
 .makeSrue{
   margin-left: 45%;
 }
</style>
