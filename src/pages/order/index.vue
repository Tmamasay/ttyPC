<template>
  <div class="ttOrderCont">
    <div v-if="orderInfo" class="ttOrderDet">
      <div class="ttOrtit">
        <p class="O1"><span />订单信息</p>
        <p class="O2"><span>公司名称：{{ orderInfo.user.companyName }}</span><span>购买年限：{{ orderInfo.order.years }}</span></p>
        <p class="O2"><span>订购版本：{{ orderInfo.order.productName }}</span><span>到期时间：{{ formatDate(orderInfo.order.endTime) }}</span></p>
        <p class="O2"><span>使用人数：{{ orderInfo.productPrice.peopleNum }}人</span><span>支付金额：¥{{ (orderInfo.order.price/100).toFixed(2) }}</span></p>
        <p class="O2"><span>预计容量：{{ orderInfo.order.capacity }}</span><span>支付方式：{{ +orderInfo.order.payType===0?'支付宝支付':+orderInfo.order.payType===1?'支付宝':+orderInfo.order.payType===2?'银行卡支付':+orderInfo.order.payType===3?'试用':'未知' }}</span></p>
        <p class="O4"><span class="Bt1" @click="goRenew">立即续费</span><span class="Bt1" @click="goUP">升级人数</span><span class="Bt2" @click="goRecord">订单记录</span><span v-if="+orderInfo.order.payType!==3" class="Bt2" @click="getInvoice">申请发票</span></p>
      </div>
    </div>
    <Footer />
    <el-dialog
      title="申请发票"
      :visible.sync="isShowInvoice"
      width="30%"
      center
    >
      <div>
        <Invoice :info="orderInfo" />
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import Invoice from '@/components/invoice'

export default {
  name: 'Order',
  components: {
    Footer,
    Invoice
  },
  data() {
    return {
      isShowInvoice: false,
      orderInfo: null,
      list: [],
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.getProductPriceUse()
  },
  methods: {
    goUP() {
      this.$router.push({ name: 'Upgrade', params: { orderId: this.orderInfo.order.id }})
    },
    goRenew() {
      this.$router.push({ name: 'Fill', params: { orderId: this.orderInfo.order.id }})
    },
    getInvoice() {
      this.isShowInvoice = true
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
    goRecord() {
      this.$router.push({ name: 'Record' })
    },

    async getProductPriceUse() {
      try {
        const data = await testHttpInteractor.getProductPriceUse().then(res => {
          if (res) {
            this.orderInfo = res
          } else {
            this.$router.push({ name: 'Record' })
          }
        })

        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.ttOrderCont{
  width: 100%;
.ttOrderDet{
  width:1350px;
  height:376px;
  margin: 50px auto;
  background:rgba(255,255,255,1);
  border:1px solid rgba(211,211,211,1);
  border-radius:10px;
  .ttOrtit{
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
    .O4{
      margin-top: 30px;
    .Bt1{
      cursor: pointer;
      display: inline-block;
      width:100px;
      height:32px;
      background:rgba(13,77,143,1);
      border-radius:5px;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(241,241,241,1);
      line-height:32px;
      text-align: center;
      margin-right: 20px;
    }
     .Bt2{
       cursor: pointer;
       text-align: center;
      display: inline-block;
      width:100px;
      height:32px;
      background:rgba(241,241,241,1);
      border:1px solid rgba(227,227,227,1);
      border-radius:5px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(45,45,45,1);
      line-height:32px;
      margin-right: 20px;
    }
    }

  }
}

}
</style>

