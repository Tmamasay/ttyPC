<template>
  <div class="ttOrderCont">
    <div class="ttyNav">
      <div class="navImg">
        <img src="@/assets/heng.png" alt="" srcset="">
      </div>
      <p class="navTit"><span>价格</span>><span>订单填写</span></p>
    </div>
    <div class="ttOrderDet">
      <div v-if="userInfo.company" class="ttOrtit">
        <!-- <p class="O1"><span />订单信息</p> -->
        <p class="O2"><span>公司名称：{{ userInfo.company.companyName }}</span></p>
        <p class="O2"><span>订购版本：{{ testInfo.productName }}</span></p>
        <p class="O2"><span>使用人数：</span>
          <el-select v-model="person" size="small" placeholder="请选择" @change="showItem">
            <el-option
              v-for="item in testInfo.numLists"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </p>
        <p class="O2">
          <span>预计容量：{{ checkTh?checkTh.capacity:'请选使用人数' }}</span>
        </p>
        <div class="yearsCk ">
          <div v-for="item in checkItem" :key="item.id" :class="{'ck1':1, 'active':item.id===checkTh.id}" @click="checkThis(item)">
            <div class="zk">
              <img src="@/assets/zk.png" alt="" srcset="">
              <p>折扣</p>
            </div>
            <p class="k1">{{ item.years }}</p>
            <p class="k2">￥{{ toNum(item.price) }}</p>
          </div>
        </div>
      </div>

    </div>
    <div class="payCont">
      <p class="P1">订单金额：<span>￥{{ toNum(checkTh?checkTh.price:0) ||'0' }} </span></p>
      <p v-if="checkTh&&!isTry" class="P2">支付完成后可申请发票，购买后到期日为{{ getDQTime( checkTh?checkTh.years:'1') }}</p>
      <p v-if="checkTh&&isTry" class="P2">确认后试用到期日为{{ getDQTime( checkTh?checkTh.years:'1') }}</p>
      <p class="P3"><el-checkbox v-model="checked"> 我已阅读并同意<span @click="goYs">《服务协议》</span></el-checkbox></p>
      <p class="goDill" @click="goTryDill">{{ isTry?'确认支付':'提交订单' }}</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { getUserInfo, setUserOrder } from '@/core/services/cache'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      isTry: false,
      checkTh: null,
      checked: false,
      person: '',
      checkItem: null,
      userInfo: getUserInfo() ? getUserInfo() : null,
      testInfo: {},
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.getTestList()
  },
  mounted() {
    this.isTry = this.$route.params.isTry
    // alert(this.$route.params.isTry)
  },
  methods: {
    goYs() {
      const routeData = this.$router.resolve({ path: '/user/agreeFw' })
      window.open(routeData.href, '_blank')
      // this.$router.push({ name: 'Agreement' })
    },
    toNum(num) {
      if (!num) return 0
      return (+num / 100).toFixed(2)
    },
    getDQTime(hs) {
      const hms = hs.substr(0, 1)
      const laHms = (+hms) * 31536000000 + new Date().getTime()
      const year = new Date(laHms).getFullYear()
      const month = new Date(laHms).getMonth() + 1
      const day = new Date(laHms).getDate()
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

      if (!this.$route.params.productId && !this.$route.params.orderId) {
        await testHttpInteractor.createProductPriceTest().then(res => {
          if (res) {
            this.$message({
              message: '试用申请成功~',
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
            productId: this.$route.params.productId || this.$route.params.orderId,
            productPriceId: this.checkTh.id
          }
        }).then(res => {
          if (res) {
            setUserOrder(res.orderId)
            this.$router.push({ name: 'Srue', params: { orderId: res.orderId }})
          }
        })
      }
    },
    async getTestList() {
      try {
        if (this.$route.params.isTry) {
          const data = await testHttpInteractor.getProductPriceTest()
          console.log(data)
          this.testInfo = data
        } else if (this.$route.params.productId) {
          const data = await testHttpInteractor.getProductPriceList({
            param: {
              productId: this.$route.params.productId
            }
          })
          console.log(data)
          this.testInfo = data
        } else if (this.$route.params.orderId) {
          const data = await testHttpInteractor.delayOrder({
            param: {
              orderId: this.$route.params.orderId
            }
          })
          console.log(data)
          this.testInfo = data
        } else {
          this.$router.push({ name: 'Home' })
        }
      } catch (error) {
        console.log(error)
      }
    },
    showItem(e) {
      this.checkItem = this.testInfo.priceList.filter(el => el.peopleNum === e)
      this.checkTh = this.checkItem[0]
      console.log(this.checkItem)
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
  height:376px;
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
    .yearsCk{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .ck1{
        position: relative;
        width: 220px;
        height: 90px;
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        border-radius: 10px;
        text-align: center;
        margin-right: 20px;
        .zk{
          position: absolute;
          top: 0px;
          left: 0px;
          width: 58px;
          height: 26px;
          overflow: hidden;
          text-align: center;
          p{
            width: 100%;
            position: absolute;
            top: 0px;
            z-index: 8;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 26px;

          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .k1{
          margin-top: 10px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #2E2E2E;
        line-height: 30px;
        }
        .k2{

        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FE5547;
        line-height: 30px;
        }
      }
      .active{
background: linear-gradient(90deg, #FDF0D4, #FEE6BB);
border: 1px solid #FFE5B3;
border-radius: 10px;
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

