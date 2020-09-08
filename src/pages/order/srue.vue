<template>
  <div class="ttOrderCont">
    <div class="ttyNav">
      <div class="navImg">
        <img src="@/assets/heng.png" alt="" srcset="">
      </div>
      <p class="navTit"><span>价格</span>><span>订单填写</span>><span>确认订单</span></p>
    </div>
    <div class="ttOrderDet">
      <div v-if="userInfo.company&&orderInfo.productVO.priceList.length" class="ttOrtit">
        <!-- <p class="O1"><span />订单信息</p> -->
        <p class="O2"><span>公司名称：{{ userInfo.company.companyName }}</span></p>
        <p class="O2"><span>订购版本：{{ orderInfo.productVO.productName }}</span></p>
        <p class="O2"><span>使用人数：{{ orderInfo.productVO.priceList[0].peopleNum }}</span> </p>
        <p class="O2">
          <span>预计容量：{{ orderInfo.productVO.priceList[0].capacity }}</span>
        </p>
        <p class="O2">
          <span>预计容量：{{ orderInfo.productVO.priceList[0].years }}</span>
        </p>
      </div>

    </div>
    <div class="payContSt">
      <p class="payQ">支付方式</p>
      <div class="payStyle">
        <div class="paySt" @click="checkPayOne(0)">
          <img src="@/assets/o4.png" alt="" srcset="" width="36" height="36">
          <p class="P1">支付宝支付</p>
          <div v-if="+checkPay===0" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
        <div class="paySt" @click="checkPayOne(1)">
          <img src="@/assets/o2.png" alt="" srcset="" width="41" height="36">
          <p class="P1">微信支付</p>
          <div v-if="+checkPay===1" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
        <div class="paySt" @click="checkPayOne(2)">
          <img src="@/assets/o1.png" alt="" srcset="" width="36" height="36">
          <p class="P1">对公转账</p>
          <div v-if="+checkPay===2" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
      </div>
    </div>
    <div class="payCont">
      <p class="P1">订单金额：<span>￥{{ toNum(orderInfo.price) ||'0' }}</span></p>
      <p class="P2">支付完成后可申请发票，购买后到期日为{{ getDQTime( orderInfo.productVO.priceList[0].years) }}</p>
      <p class="goDill" @click="goBill">确认订单</p>
    </div>
    <Footer />
    <el-dialog
      title=""
      :visible.sync="WXdialogVisible"
      width="320px"
      top="260px"
      :close-on-click-modal="false"
    >
      <p class="wxTit">请使用微信扫码付款</p>
      <div class="wxQr">
        <img :src="wxQrcode" alt="" srcset="">
      </div>
      <div class="wxPay">
        <div class="backBtn" @click="goBack">返回</div>
      </div>
    </el-dialog>
    <el-dialog
      title="对公转账"
      :visible.sync="BankdialogVisible"
      width="450px"
      top="260px"
      center
      :close-on-click-modal="false"
    >
      <!-- <p class="wxTit">对公转账</p> -->
      <div class="Bank">
        <p class="B1">企业名称：<span class="B2">泰霆科技（重庆）有限公司</span></p>
        <p class="B1">银行账号：<span class="B2">110022884066885</span></p>
        <p class="B1">开户行：<span class="B2">中国银行江北嘴支行</span></p>
        <p class="B1">转账备注：<span class="B2">泰霆saas订单</span><span class="B3">*打款时请备注</span></p>
        <p class="B1">交易流水：<span class="B2"><input v-model="payCode" type="text" placeholder="请转账成功后填写交易流水号"></span></p>
      </div>
      <div class="wxPay2">
        <div class="backBtn" @click="bankSUb">提交</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { getUserInfo } from '@/core/services/cache'
import QRCode from 'qrcode'
export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      payCode: '',
      wxQrcode: '',
      WXdialogVisible: false,
      BankdialogVisible: false,
      userInfo: getUserInfo(),
      testInfo: {},
      checkPay: 0,
      orderInfo: null,
      interval: null
    }
  },
  beforeRouteLeave(to, form, next) {
    // alert(1)
    clearInterval(this.interval)
    next()
  },
  async created() {
    // this.getTestList()
  },
  mounted() {
    this.getOrderOne()
    // console.log(getUserOrder())
    this.interval = setInterval(() => {
      this.checkPayStatus()
    }, 3000)
    // alert(this.$route.params.isTry)
  },
  methods: {
    async getOrderOne() {
      await testHttpInteractor.getOrderOne({
        data: {
          orderId: this.$route.params.orderId
        }
      }).then(res => {
        if (res) {
          this.orderInfo = res
        }
      })
    },
    async bankSUb() {
      await testHttpInteractor.bankPay({
        data: {
          orderId: this.orderInfo.orderId,
          payCode: this.payCode
        }
      }).then(res => {
        if (res) {
          this.$message({
            message: '确认订单提交成功，等待管理员审核~',
            type: 'success',
            duration: 2 * 1000
          })
          this.BankdialogVisible = false
          setTimeout(() => {
            this.$router.push({ name: 'Home' })
          }, 2000)
        }
      })
    },
    async checkPayStatus() {
      await testHttpInteractor.getMyOrderStatus({
        data: {
          orderId: this.orderInfo.orderId
        }
      }).then(res => {
        if (res) {
          clearInterval(this.interval)
          this.$message({
            message: '支付成功，即将跳转订单详情~',
            type: 'success',
            duration: 2 * 1000
          })
          setTimeout(() => {
            this.$router.push({ name: 'Order' })
          }, 1000)
        } else {
          clearInterval(this.interval)
        }
      })
    },
    goBack() {
      this.WXdialogVisible = false
    },
    toNum(num) {
      if (!num) return 0
      return (+num / 100).toFixed(2)
    },
    async generateQR(urlQ) {
      this.WXdialogVisible = true
      await QRCode.toDataURL(urlQ).then((url) => {
        this.wxQrcode = url
      })
    },
    checkPayOne(e) {
      this.checkPay = e
    },
    getDQTime(hs) {
      const hms = hs.substr(0, 1)
      const laHms = (+hms) * 31536000000 + new Date().getTime()
      const year = new Date(laHms).getFullYear()
      const month = new Date(laHms).getMonth() + 1
      const day = new Date(laHms).getDate()
      return `${year}年${month}月${day}`
    },

    async goBill() {
      if (+this.checkPay === 2) {
        this.BankdialogVisible = true
        return
      }
      await testHttpInteractor.createOrderCode({
        data: {
          orderId: this.orderInfo.orderId,
          payType: this.checkPay
        }
      }).then(res => {
        if (res) {
          if (+this.checkPay === 1) {
            this.generateQR(res)
          } else if (+this.checkPay === 0) {
            document.querySelector('body').innerHTML = res
            document.forms[0].target = ' _blank'// 在新页面弹出支付宝页面
            // document.forms[0].acceptCharset='GBK';//如果后台返回form的charset=GBK，需要做此修改
            document.forms[0].submit()
            setTimeout(() => {
              location.reload()
            }, 1000)
          }
          console.log(11)
        }
      })
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

 .wxPay2{
    text-align: center;
    width: 450px;
    height: 65px;
    background: #F2F2F2;
    // border-radius: 10px;
    margin: 30px auto;
    text-align: center;
    margin-left: -25px;
    margin-bottom: -32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .backBtn{
      cursor: pointer;
      width: 116px;
    height: 40px;
    margin: 0 auto;
    background: #0E4E90;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #F2F2F2;
    line-height: 40px;
}
  }
  .wxPay{
    text-align: center;
    width: 320px;
    height: 65px;
    background: #F2F2F2;
    // border-radius: 10px;
    margin: 0 auto;
    text-align: center;
    margin-left: -20px;
    margin-bottom: -30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .backBtn{
      cursor: pointer;
      width: 116px;
    height: 40px;
    margin: 0 auto;
    background: #0E4E90;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #F2F2F2;
    line-height: 40px;
}
  }
  .wxTit{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #2E2E2E;
      margin-bottom: 20px;
      margin-top: -20px;
  }
  .Bank{
      margin-top: -30px;
      margin-left: 30px;
    .B1{

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #646464;
    line-height: 30px;
    margin-top: 20px;
    }
    .B2{
      font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #2E2E2E;
    line-height: 30px;
    input{
      width: 300px;
height: 36px;
background: #FFFFFF;
border: 1px solid #E6E6E6;
border-radius: 3px;
font-size: 14px;
font-family: PingFang SC;
font-weight: 500;
color: #999999;
line-height: 30px;
padding-left: 5px;
    }
    }
    .B3{
 padding-left: 30px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FE5547;
    line-height: 30px;
    }

  }

  .wxQr{
    width: 180px;
     height: 180px;
     overflow: hidden;
     margin: 0 auto;
     margin-bottom: 10px;
     img{
       width: 100%;
       height: 100%;
     }
  }
  .ttyNav{
    width: 100%;
    height: 80px;
    position: relative;
    .navImg{
       width: 100%;
      height: 80px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
      }
    }
    .navTit{
      position: absolute;
      line-height: 80px;
      top: 0;
      left: 280px;
      text-align: left;
      width: 1350px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:#ffffff;
    }
  }
  .payContSt{
     width:1350px;
    margin: 0 auto;
   .payQ{
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #2E2E2E;
      line-height: 30px;
      margin-top:30px;
      margin-bottom: 20px;
   }
  .payStyle{
    display: flex;
      align-items: center;
    .paySt{
      width: 190px;
      height: 70px;
      background: #FFFFFF;
      border: 1px solid #E6E6E6;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      position: relative;
      overflow: hidden;
      .chPay{
        position: absolute;
        bottom:0px;
        right: 0px;
         width: 0;
        height: 0;
        border-bottom: 35px solid #0289F1;
        border-left: 40px solid transparent;
        img{
          position: absolute;
          bottom:-27px;
        right: 5px;
        z-index: 5;
        }
      }
      .P1{
        cursor: pointer;
        padding-left: 20px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #2E2E2E;
      line-height: 30px;
      }
    }

  }
  }
  .payCont{
    width:1350px;
    margin: 0 auto;
    text-align: right;

.P1{

  font-size:18px;
font-family:PingFang SC;
font-weight:500;
color:rgba(46,46,46,1);
line-height:30px;
span{
  font-size:26px;
font-family:PingFang SC;
font-weight:800;
color:rgba(254,86,71,1);
line-height:30px;
}
}
.P2{
font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(46,46,46,1);
line-height:30px;
}
.P3{
  font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(46,46,46,1);
line-height:30px;
margin-bottom: 10px;
span{
  color: #186AC0;
}

}
.goDill{
  cursor: pointer;
 margin-left: 1234px;
  margin-bottom: 50px;
  width:116px;
height:40px;
background:rgba(14,78,144,1);
border-radius:5px;
font-size:16px;
text-align: center;
font-family:PingFang SC;
font-weight:500;
color:rgba(242,242,242,1);
line-height:40px
}
  }
.ttOrderDet{
  width:1350px;
  height:296px;
  margin: 30px auto;
  background:rgba(255,255,255,1);
  border:1px solid rgba(211,211,211,1);
  border-radius:10px;
  .ttOrtit{
    cursor: pointer;
    margin: 40px 100px;
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
      display: flex;
      justify-content: flex-start;
      align-items: center;

      span{
        margin-left: 10px;
        // width: 130px;
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

