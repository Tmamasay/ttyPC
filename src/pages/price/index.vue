<template>
  <div class="ttPriceCont">
    <div class="ttPriBanner">
      <img src="@/assets/r1.png" alt="" srcset="">
    </div>
    <div class="ttPriMeal">
      <div class="ttPM1">
        <div class="ttPImg">
          <p>基础版</p>
          <img src="@/assets/r3.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
          <p class="P2" style="margin-top:45px">低至每人</p>
          <p class="P2">¥<span>21</span>.06/月</p>
        </div>
        <p class="P3">年付</p>
      </div>

      <div class="ttPM1">
        <div class="ttPImg">
          <p>初创团队版</p>
          <img src="@/assets/r2.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
        </div>
        <p class="P3 close">敬请期待</p>
      </div>

      <div class="ttPM1">
        <div class="ttPImg">
          <p>企业版</p>
          <img src="@/assets/r4.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
        </div>

        <p class="P3 close">敬请期待</p>
      </div>

      <div class="ttPM1">
        <div class="ttPImg">
          <p>企业升级版</p>
          <img src="@/assets/r5.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
        </div>
        <p class="P3 close">敬请期待</p>
      </div>

      <div class="ttPM1">
        <div class="ttPImg">
          <p>智能高级版</p>
          <img src="@/assets/r7.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
        </div>
        <p class="P3 close">敬请期待</p>
      </div>

      <div class="ttPM1">
        <div class="ttPImg">
          <p>私有化部署</p>
          <img src="@/assets/r6.png" alt="" srcset="">
        </div>
        <div class="ttJs">
          <p class="P1">使用人数<span>（按需购买）</span></p>
          <div class="P1Img">
            <p>功能范围</p>
            <img src="@/assets/f1.png" alt="" srcset="">
          </div>
          <p class="P1">人事管理系统</p>
          <p class="P1">安全维护</p>
        </div>
        <p class="P3 getPri">获取报价</p>
      </div>
    </div>
    <div class="ttQs">

      <p class="Q1">常见问题解答</p>
      <div class="qsOne">
        <div class="Qs1">
          <p class="s1">1、支付渠道和支付方式说明</p>
          <div class="sIm"><img src="@/assets/open.png" alt="" srcset=""></div>
          <p class="s2">查看详情</p>
        </div>
        <p class="QScont">到期后已产生的数据会全部保留在该系统，可以查看该系统的内容，但是不能再进行任何操作，需付费后才能正常使用该系统所有功能，但是不能再进行任何操作，需付费后才能正常使用该系统所有功能</p>
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

      list: [],
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.getTestList({ page: 1, count: 10 })
  },
  methods: {
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
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ttQs{
    width: 100%;
    height: 563px;
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
    }
  .Qs1{
   padding-bottom:15px ;
   display: flex;
   justify-content: space-between;
   align-items: center;

   .s1{
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
        margin-right: -805px;
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

