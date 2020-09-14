<template>
  <div class="ttPriceCont">
    <div class="ttPriBanner">
      <img src="@/assets/r1.png" alt="" srcset="">
      <p class="tt1">选择适合您的套餐</p>
      <p class="tt2">能满足不同规模、各层级需求的智能化办公品台</p>
    </div>
    <div class="ttPriMeal">
      <div v-for="(item,index) in list" :key="item.id" class="ttPM1">
        <div class="ttPImg">
          <p>{{ item.productName }}</p>
          <img :src="getImgUrl(index)" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p v-for="child in item.lists" :key="child.id" class="P1">{{ child.functionName }}</p>
          <!-- <p class="P1">安全维护</p> -->
          <p v-if="+index===0" class="P2" style="margin-top:45px">低至每人</p>
          <p v-if="+index===0" class="P2">¥<span>21</span>.06/月</p>
        </div>
        <p v-if="+index===0" class="P3" @click="goPay(item.productId)">年付</p>
        <p v-else-if="+index===5" class="P3 getPri" @click="getOffer">获取报价</p>
        <p v-else class="P3 close">敬请期待</p>

      </div>

    </div>
    <div class="ttQs">
      <p class="Q1">常见问题解答</p>
      <div class="qsOne">
        <div class="Qs1">
          <p class="s1">1、支付渠道和支付方式说明</p>
          <div :class="{'sIm':1,'close':isShow}"><img src="@/assets/open.png" alt="" srcset=""></div>
          <p class="s2" @click="show()">{{ isShow?'收起详情':'查看详情' }}</p>
        </div>
        <p v-if="+isShow" class="QScont">我们支付方式只能在泰霆云官网上进行支付，支付方式有支付宝支付、微信支付、对公转账，支付信息已官网为准。请勿相信私下转账交易，如有任何疑问请与我们客服联系。</p>
      </div>
      <div class="qsOne">
        <div class="Qs1">
          <p class="s1">2、 购买后是否可以开具发票？</p>
          <div :class="{'sIm':1,'close':isShow2}"><img src="@/assets/open.png" alt="" srcset=""></div>
          <p class="s2" @click="show2()">{{ isShow2?'收起详情':'查看详情' }}</p>
        </div>
        <p v-if="isShow2" class="QScont">我们提供增值税普通发票，付款成功后进入【我的订单】页面选择【申请发票】信息提交成功后，我们将以邮寄的方式送达给您。</p>
      </div>
      <div class="qsOne">
        <div class="Qs1">
          <p class="s1">3、使用期间增加人员名额如何付费？</p>
          <div :class="{'sIm':1,'close':isShow3}"><img src="@/assets/open.png" alt="" srcset=""></div>
          <p class="s2" @click="show3()">{{ isShow3?'收起详情':'查看详情' }}</p>
        </div>
        <p v-if="isShow3" class="QScont">登录后进入【我的订单】页面选择【升级人数】，在根据现阶段人数选择合适的套餐人数下单即可。升级人数付款金额我们是以补差价的方式计算，并且有效期以原订单的剩余有效期为准。计算方法如下：付款金额为=（升级版本金额-旧版本金额）/365÷（365-已使用天数）。</p>
      </div>
      <div class="qsOne">
        <div class="Qs1">
          <p class="s1">4、 到期后已产生的数据是否会继续保留以及系统可否继续使用？</p>
          <div :class="{'sIm':1,'close':isShow4}"><img src="@/assets/open.png" alt="" srcset=""></div>
          <p class="s2" @click="show4()">{{ isShow4?'收起详情':'查看详情' }}</p>
        </div>
        <p v-if="isShow4" class="QScont">到期后已产生的数据在180天内会保留在该系统，此时间内用户可以查看该系统的内容，但是不能再进行任何操作，需付费后才能正常使用该系统所有功能。如满180天还未成功续费，系统将自动清空所有保留的数据。</p>
      </div>

    </div>
    <Footer />
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="20%"
      center
    >
      <span>请先进行企业认证后再下单哦</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="ttyRZ" @click="goAuth">去认证</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { getUserInfo } from '@/core/services/cache'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      isShow: true,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      centerDialogVisible: false,
      info: getUserInfo(),
      list: [],
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.getTestList()
  },
  methods: {
    show() {
      this.isShow = !this.isShow
    },
    show2() {
      this.isShow2 = !this.isShow2
    },
    show3() {
      this.isShow3 = !this.isShow3
    },
    show4() {
      this.isShow4 = !this.isShow4
    },
    getOffer() {
      this.$router.push({ name: 'Offer' })
    },
    goAuth() {
      this.centerDialogVisible = false
      this.$router.push({ name: 'Auth' })
    },
    goPay(id) {
      if (!this.info) {
        this.$router.push({ name: 'Login' })
        return
      }
      if (this.info.user && +this.info.user.companyStatus === 2) {
        this.$router.push({ name: 'Fill', params: { productId: id }})
        return
      }
      this.centerDialogVisible = true
    },
    getImgUrl(index) {
      return require(`@/assets/r${index + 2}.png`)
    },

    async getTestList() {
      try {
        const data = await testHttpInteractor.getProductList()
        console.log(data)
        console.log('o000000009999999988888888888887777')
        this.list = data
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
.ttPriceCont{
  width: 100%;
  background-color: #ffffff;
  .ttPriBanner{
    width: 100%;
    height: 452px;
    overflow: hidden;
    position:relative;
    img{
      width: 100%;
      height: 100%;
    }
    .tt1{
      position: absolute;
      top:172px;
      width: 100%;
      text-align: center;
      font-size: 50px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FCFCFC;
      line-height: 53px;
    }
    .tt2{
        position: absolute;
      top:258px;
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FBFBFB;
      line-height: 36px;
    }
  }
  .ttyRZ{
    padding: 6px 10px;
  }
  .ttQs{
    width: 100%;
    // height: 563px;
    padding-bottom: 20px;
    margin-bottom: 40px;
    background:rgba(243,243,247,1);
  .Q1{
    text-align: center;
    padding-top: 100px;
    padding-bottom: 30px;
    font-size:40px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(45,45,45,1);
    line-height:53px;
  }
  .qsOne{
    width: 1100px;
  //  height: 55px;
     border-bottom:1px solid rgba(232,232,232,1);
       margin: 0 auto;
    .QScont{
        font-size:14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(45,45,45,1);
      line-height:30px;
      padding-bottom: 20px;
      transition: all 0.4s;
    }
  .Qs1{
    cursor: pointer;
   padding-bottom:15px ;
   display: flex;
   justify-content: space-between;
   align-items: center;

   .s1{
     width: 500px;
     font-size:16px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(45,45,45,1);
    line-height:53px;
   }
    .sIm{
        display:inline-block ;
        width: 16px;
        height: 16px;
        overflow: hidden;
        margin-right: -510px;
        transition: all 0.4s;
        img{
          display:inline-block;
          width: 100%;
          height: 100%;
        }
      }
   .s2{
     font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(0,79,165,1);
      line-height:53px;
   }
   .close{
          transition: all 0.4s;
          transform:rotate(180deg);
        }
  }
  }
  }
  .ttPriMeal{
    width: 1350px;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ttPM1{
      transition: all 0.3s;
      &:hover{
      box-shadow: 0 15px 30px rgba(0,0,0,.1);
    transform: translate3d(0,-2px,0);
    }
      cursor: pointer;
      width:208px;
      height:506px;
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 46px 0px rgba(124,124,124,0.2);
      border-radius:10px;
      text-align: center;
      .ttPImg{
      width: 208px;
      height: 86px;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      p{
        width: 100%;
        text-align: center;
        position: absolute;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:42px;
        top: 50%;
        margin-top: -20px
      }
      }
      .ttJs{
        width: 100%;
        height: 320px;
      .P1{

        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(45,45,45,1);
        line-height:42px;

        span{
          color: #F34F00;
        }
      }
       .P1Img{
          width: 150px;
          height: 30px;
          overflow: hidden;
          margin: 0 auto;
          position: relative;

          img{
            width: 100%;
            height: 100%;
          }
          p{
            width: 100%;
            position: absolute;
            font-size:14px;
             text-align: center;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(46,46,46,1);
            line-height:43px;
            top: 50%;
            margin-top: -22px
          }
        }
      .P2{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(45,45,45,1);
        line-height:42px;
        span{
       font-size:40px;
        font-family:PingFang SC;
        font-weight:bold;
        }
      }

      }
      .P3{
          width:116px;
          height:40px;
          margin: 28px auto;
          background:rgba(13,77,143,1);
          border-radius:5px;
          font-size:16px;
          text-align: center;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(249,249,249,1);
          line-height:40px;

      }
      .close{
            background:rgba(192,196,204,1) !important;
          }
          .getPri{
            background:rgba(42,51,69,1) !important;
          }
    }
  }
}

</style>

