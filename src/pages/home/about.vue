<template>
  <div class="ttOfferCont">
    <div class="ttOfferBanner">
      <img src="@/assets/about.png" alt="" srcset="">
      <div class="getTitle">
        <p class="Gt1">关于我们</p>
        <p class="Gt2">About  Us</p>
      </div>

    </div>
    <div class="aboutCont">
      <div class="A1">
        <img src="@/assets/ab1.png" alt="" srcset="">
      </div>
      <p class="A2">企业简介</p>
      <p class="A3">Company  profile</p>
      <p class="A4"><span>泰霆科技（重庆）有限公司</span> 2015年先后成立于深圳、重庆等地，专注研发B端企业管理系统软件产品，一直以“全智能”系统为研究方向。深耕于智慧建筑与智能制造行业。我们秉承着“为企业提高效率、节省成本为核心”帮助企业实现大数据智能管理模式， 满足不同管理层次、不同信息化程度、不同行业特点的智能管理。

      </p>
      <p class="A4">泰霆科技，自成立起一直以“全智能”系统为研究方向，专业从事智慧建筑与智能制造行业的技术研发。业务涵盖软件开发、品牌及创意设计、代运营活动实施和效果呈现等，致力于为客户提供全方位互联网技术服务，为企业创造更多价值。</p>
      <p class="A4">泰霆科技拥有专业的技术团队，经验丰富，以“创意”为核心，“实战”为风格，以市场的角度和客户的需求为出发点，帮助企业管理更加智能高效，拓展市场空间创造竞争优势，提升企业的无形资产。
      </p>
      <p class="A4">重视技术的研发与创新的同时，也注重企业文化建设，追求高效与价值，个人与企业携手共进，凝聚精神动力，具有无限创造的可能。</p>
    </div>
    <div class="aboutBot">
      <div class="A1">
        <img src="@/assets/ab2.png" alt="" srcset="">
      </div>
      <p class="A2">关于泰霆云</p>
      <p class="A3">TAI  TING  CLOUD </p>
      <div class="lineAb">
        <div class="linImg">
          <img src="@/assets/ab3.png" alt="" srcset="">
        </div>
        <p class="linP">泰霆云Taiting Cloud 是泰霆科技（重庆）有限公司旗下的一款在智能建筑工程管理系统
          泰霆云致力于为中小型建筑企业打破过去大而全的模式，充分利用云平台信息资源，帮助企业内部实现管理的革新，同时对企业的发展规划打下了牢固的地基。解决企业管理述求，提高企业办公效率、实时可视化管理、加大项目成本控制及项目进度监控。
          让企业以简单、安全、高效的管理的方式，去创造更高的价值。</p>
      </div>
    </div>
    <div class="conTact">
      <img src="@/assets/ab4.png" alt="" srcset="">
      <div class="TacTit">
        <p class="Ac1">联系我们</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import TestHttpInteractor from '@/core/interactors/common-interactor'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      offerForm: {
        phone: '',
        company: '',
        useNum: ''
      }

    }
  },
  async created() {

  },
  methods: {
    async  getOffer() {
      const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (!this.offerForm.phone) {
        this.$message({
          message: '请输入联系电话',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }

      if (!reg.test(this.offerForm.phone)) {
        this.$message({
          message: '联系电话格式错误',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }
      if (!this.offerForm.company) {
        this.$message({
          message: '请输入公司名称',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }
      if (!this.offerForm.useNum) {
        this.$message({
          message: '请输入使用人数',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }
      const _param = {
        data: {
          companyName: this.offerForm.company,
          peopleNum: this.offerForm.useNum,
          phone: this.offerForm.phone
        }
      }
      await TestHttpInteractor.setProductMessage(_param).then(data => {
        if (data) {
          this.$message({
            message: '资料提交成功~',
            type: 'success',
            duration: 3 * 1000
          })
        }
      })
    },

    async getNewsList() {
      try {
        const _param = {
          data: {
            pageNum: this.query.pageNum,
            pageSize: this.query.pageSize
          }
        }
        await TestHttpInteractor.selectNotices(_param).then(data => {
          this.total = data.total
          // if (this.query.pageNum === 1) {
          this.list = data.records
          // } else {
          //   this.list = [...this.list, ...data.records]
          // }
        })
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

.ttOfferCont{
    .conTact{
    width: 100%;
    height: 550px;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;

    }
    .TacTit{
      .Ac1{

font-size: 50px;
font-family: PingFang SC;
font-weight: 500;
color: #FFFFFF;
line-height: 38px;
      }
    }
  }
  .aboutBot{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    .A1{
        width: 97px;
        height: 87px;
        overflow: hidden;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .A2{
margin-top: 17px;
font-size: 30px;
font-family: PingFang SC;
font-weight: 500;
color: #2E2E2E;
line-height: 38px;
z-index: 99;
position: relative;
      }
      .A3{
margin-top: -25px;
font-size: 30px;
font-family: Adobe Heiti Std;
font-weight: normal;
color: #E1E1F4;
opacity: 0.5;
z-index: 0;
margin-bottom: 47px;
      }
      .lineAb{
        display: flex;
        align-items: center;
        .linImg{
 width: 1044px;
        height: 678px;
        overflow: hidden;
        }

        img{
          width: 100%;
          height: 100%;
        }
        .linP{
          margin-left:25px ;
          text-align: left;
          width: 566px;
          height: 296px;
          background: #F6F6F6;
          border-radius: 10px;
          padding:50px 30px ;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2E2E2E;
          line-height: 30px;
        }
      }

  }
  .aboutCont{
      width: 1350px;
      margin: 99px auto;
      text-align: center;

      .A1{
        width: 97px;
        height: 87px;
        overflow: hidden;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .A2{
margin-top: 17px;
font-size: 30px;
font-family: PingFang SC;
font-weight: 500;
color: #2E2E2E;
line-height: 38px;
z-index: 99;
position: relative;
      }
      .A3{
margin-top: -25px;
font-size: 30px;
font-family: Adobe Heiti Std;
font-weight: normal;
color: #E1E1F4;
opacity: 0.5;
z-index: 0;
margin-bottom: 47px;
      }
      .A4{
        font-size: 16px;
font-family: PingFang SC;
font-weight: Medium;
color: #2E2E2E;
line-height: 30px;
text-align: left;

span{
font-size: 20px;
font-family: PingFang SC;
font-weight: bold;
color: #2E2E2E;
line-height: 30px;
}
      }
    }
  .ttOfferBanner{
    width: 100%;
    height: 808px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }

    .getTitle{
        position: absolute;
      top: 341px;
      left: 518px;
      .Gt1{

font-size: 68px;
font-family: PingFang SC;
font-weight: 500;
color: #F6F6F6;
    // line-height: 53px;
      }
      .Gt2{
      margin-top: 30px;
font-size: 30px;
font-family: PingFang SC;
font-weight: 800;
color: #F6F6F6;
      }
    }

    .Gbtn{
      cursor: pointer;
      margin-top: 20px;
      width: 375px;
      height: 50px;
      background: #0F5EEB;
      border-radius: 5px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 50px;
      text-align: center;
    }
    p{
         cursor: pointer;
     margin-top: 15px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #F2F2F2;
      line-height: 30px;
    }
  }

}

</style>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
}
input[type="number"]{-moz-appearance:textfield;}

</style>

