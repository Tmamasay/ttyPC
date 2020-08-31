<template>
  <div class="ttOrderCont">
    <div class="ttOrderDet">
      <div class="ttOrtit">
        <p class="O1"><span />订单信息</p>
        <p class="O2"><span>公司名称：{{ orderInfo.user.companyName }}</span><span>购买年限：{{ orderInfo.order.years }}</span></p>
        <p class="O2"><span>订购版本：{{ orderInfo.user.productName }}</span><span>到期时间：{{ formatDate(orderInfo.order.endTime) }}</span></p>
        <p class="O2"><span>使用人数：{{ orderInfo.productPrice.peopleNum }}人</span><span>支付金额：¥{{ orderInfo.order.price }}</span></p>
        <p class="O2"><span>预计容量：{{ orderInfo.order.capacity }}T</span><span>支付方式：微信支付</span></p>
        <p class="O4"><span class="Bt1" style="display:none">立即续费</span><span class="Bt1" style="display:none">升级人数</span><span class="Bt2" style="display:none" @click="goRecord">订单记录</span><span class="Bt2" style="display:none">申请发票</span></p>
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
    onAdd() {
      this.$router.push({ name: 'CreateTest' })
    },
    onEdit(item, index) {
      this.$router.push({ name: 'EditTest', params: { id: item.id }})
    },
    async getProductPriceUse() {
      try {
        const data = await testHttpInteractor.getProductPriceUse()
        this.orderInfo = data
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

