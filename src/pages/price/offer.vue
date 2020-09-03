<template>
  <div class="ttOfferCont">
    <div class="ttOfferBanner">
      <img src="@/assets/offer.png" alt="" srcset="">
      <div class="getForm">
        <input v-model="offerForm.phone" class="T1" type="number" placeholder="联系电话">
        <input v-model="offerForm.company" class="T1" type="text" placeholder="公司名称">
        <input v-model="offerForm.useNum" class="T1" type="number" placeholder="使用人数">
        <div class="Gbtn" @click="getOffer">获取报价方案</div>
        <p>提交信息后，我们将在一个工作日与您联系</p>
      </div>
    </div>
    <div class="ttyOfferMid">
      <p class="O1">私有化部署的优势</p>
      <div class="Oline">
        <div class="L1">
          <div class="Limg">
            <img src="@/assets/of1.png" alt="" srcset="">
          </div>
          <div class="Ltit">
            <p class="Lt1">数据私密性更好</p>
            <p class="Lt2">系统部署在本地，数据更安全可控，可根据客户需要部署在不同系统平台，全方位安全设计，登录、信息传输、存储的加密机制</p>
          </div>
        </div>
        <div class="L1">
          <div class="Limg">
            <img src="@/assets/of2.png" alt="" srcset="">
          </div>
          <div class="Ltit">
            <p class="Lt1">内网部署自主掌控</p>
            <p class="Lt2">系统部署单位内部，内部的人员可以使用PC局域网连接，速度更快，企业可以完全自主掌控数据，避免人为数据事故</p>
          </div>
        </div>
      </div>
      <div class="Oline" style="margin-top:100px">
        <div class="L1">
          <div class="Limg">
            <img src="@/assets/of3.png" alt="" srcset="">
          </div>
          <div class="Ltit">
            <p class="Lt1">专属服务器</p>
            <p class="Lt2">独立的服务器保证系统服务的稳定性和高效的系统访问速度，提高用户体验与办公效率</p>
          </div>
        </div>
        <div class="L1">
          <div class="Limg">
            <img src="@/assets/of4.png" alt="" srcset="">
          </div>
          <div class="Ltit">
            <p class="Lt1">支持个性化定制</p>
            <p class="Lt2">功能更灵活，管理模式更成熟，可支持客户自己单位的专属名称、图标、启动图、服务器地址等信息</p>
          </div>
        </div>
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
  .ttOfferBanner{
    width: 100%;
    height: 540px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .getForm{
      position: absolute;
      top: 120px;
      right: 385px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .T1{
        margin-top: 20px;
        width: 375px;
        height: 50px;
        background: #000827;
        border: 1px solid #08C2FF;
        opacity: 0.5;
        border-radius: 5px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #8694A8;
        line-height: 30px;
        padding-left: 10px;
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
  .ttyOfferMid{
    width: 1350px;
    margin: 0 auto;
    .O1{
 text-align: center;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #2E2E2E;
    // line-height: 53px;
    padding-top: 99px;
    padding-bottom: 66px;
    }
    .Oline{
      display: flex;
  justify-content: space-between;
      .L1{
        display: flex;
        align-items: flex-start;
        .Limg{
          width: 55px;
          height: 51px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .Ltit{
          width: 485px;
          margin-left: 20px;
          .Lt1{
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #2E2E2E;
              // line-height: 53px;
          }
          .Lt2{
    margin-top: 18px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2E2E2E;
          line-height: 23px;
          }

        }
      }

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

