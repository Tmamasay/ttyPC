<template>
  <div class="ttOrderCont">
    <div class="ttyNav">
      <div class="navImg">
        <img src="@/assets/heng.png" alt="" srcset="">
      </div>
      <p class="navTit"><span>价格</span>><span>订单填写</span>><span>确认订单</span></p>
    </div>
    <div class="ttOrderDet">
      <div v-if="userInfo.company" class="ttOrtit">
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
        <div class="paySt" @click="checkPayOne(1)">
          <img src="@/assets/o4.png" alt="" srcset="" width="36" height="36">
          <p class="P1">支付宝支付</p>
          <div v-if="+checkPay===1" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
        <div class="paySt" @click="checkPayOne(2)">
          <img src="@/assets/o2.png" alt="" srcset="" width="41" height="36">
          <p class="P1">微信支付</p>
          <div v-if="+checkPay===2" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
        <div class="paySt" @click="checkPayOne(3)">
          <img src="@/assets/o1.png" alt="" srcset="" width="36" height="36">
          <p class="P1">对公转账</p>
          <div v-if="+checkPay===3" class="chPay">
            <img src="@/assets/o3.png" alt="" srcset="" width="12" height="9">
          </div>
        </div>
      </div>
    </div>
    <div class="payCont">
      <p class="P1">订单金额：<span>￥{{ orderInfo.price||'0' }}</span></p>
      <p class="P2">支付完成后可申请发票，购买后到期日为{{ getDQTime( orderInfo.productVO.priceList[0].years) }}</p>
      <p class="P3"><el-checkbox v-model="checked"> 我已阅读并同意<span>《服务协议》</span></el-checkbox></p>
      <p class="goDill" @click="goTryDill">提交订单</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { getUserInfo, getUserOrder } from '@/core/services/cache'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      userInfo: getUserInfo() ? getUserInfo() : null,
      testInfo: {},
      checkPay: 1,
      // orderInfo: getUserOrder() ? getUserInfo() : null
      orderInfo: {
        'orderId': 'JZ20200907Nm6MnI',
        'price': 3533800,
        'productVO': {
          'productId': '110',
          'productName': '基础版',
          'rate': 0,
          'status': null,
          'lists': null,
          'numLists': null,
          'priceList': [
            {
              'id': '256205',
              'action': 1,
              'createTime': 1597757702000,
              'updateTime': null,
              'productId': '110',
              'peopleNum': '1-10',
              'price': 35338,
              'years': '2年',
              'capacity': '500GB',
              'minNum': 1,
              'maxNum': 10
            }
          ]
        }
      }
    }
  },
  async created() {
    // this.getTestList()
  },
  mounted() {
    // alert(this.$route.params.isTry)
  },
  methods: {
    checkPayOne(e) {
      this.checkPay = e
    },
    getDQTime(hs) {
      const hms = hs.substr(0, 1)
      const laHms = (+hms) * 31536000000 + this.orderInfo.productVO.priceList[0].createTime
      const year = new Date(laHms).getFullYear()
      const month = new Date(laHms).getMonth() + 1
      const day = new Date(laHms).getDay()
      return `${year}年${month}月${day}`
    },
    checkThis(item) {
      this.checkTh = item
    },
    async goTryDill() {
      if (!this.person) {
        this.$message({
          message: '请选择使用人数',
          type: 'warning',
          duration: 4 * 1000
        })
        return
      }
      if (!this.checked) {
        this.$message({
          message: '请勾选同意服务协议',
          type: 'warning',
          duration: 4 * 1000
        })
        return
      }

      if (!this.$route.params.productId) {
        await testHttpInteractor.createProductPriceTest().then(res => {
          if (res) {
            this.$message({
              message: '试用申请提交成功，等待管理员审核~',
              type: 'success',
              duration: 5 * 1000
            })
            setTimeout(() => {
              this.$router.push({ name: 'Home' })
            }, 3000)
          }
        })
      } else {
        await testHttpInteractor.createProductOrder({
          data: {
            productId: this.$route.params.productId,
            productPriceId: this.checkTh.id
          }
        }).then(res => {
          if (res) {
            console.log(11)
          }
        })
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
  height:286px;
  margin: 30px auto;
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

