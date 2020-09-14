<template>
  <div class="ttFooter">
    <div class="ttFCont">
      <div class="ttF1">
        <p class="tF2">产品</p>
        <p class="tF3">产品介绍</p>
      </div>
      <div class="ttF1">
        <p class="tF2">支持</p>
        <p class="tF3" @click="goRoute(1)">企业私有化部署</p>
        <p class="tF3" @click="goRoute(2)">使用教程</p>
        <p class="tF3" @click="goRoute(3)">为什么选择泰霆</p>
      </div>
      <div class="ttF1">
        <p class="tF2">关于</p>
        <p class="tF3" @click="goAbout">关于我们</p>
        <p class="tF3">加入我们</p>
        <p class="tF3" @click="goRoute(4)">服务协议</p>
        <p class="tF3" @click="goRoute(5)">隐私协议</p>
      </div>
      <div class="ttF1">
        <p class="tF2">泰霆科技（重庆）有限公司</p>
        <p class="tF3">地址：重庆市两江新区杨柳路3号1幢25层25-3</p>
        <p class="tF3">电话：023-67284792          18002343507</p>
        <p class="tF3">邮箱：Joanna@tyteen.com</p>
        <p class="tF3">微信公众号：泰霆云</p>
      </div>
    </div>
    <div class="tFF">
      <p>©2012—2020 泰霆—高效的智能办公平台</p>
      <p>京ICP备1255566号-2</p>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {

    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    goRoute(e) {
      const routeData = this.$router.resolve({ path: '/user/agreement' })
      const routeData2 = this.$router.resolve({ path: '/user/agreeYs' })
      switch (e) {
        case 1:
          this.$router.push({ name: 'Offer' })
          break
        case 2:
          this.$router.push({ name: 'Price' })
          break
        case 3:
          this.$router.push({ name: 'About' })
          break
        case 4:
          window.open(routeData.href, '_blank')
          // this.$router.push({ name: 'Agreement' })
          break
        case 5:
          window.open(routeData2.href, '_blank')
          // this.$router.push({ name: 'Agreement' })
          break

        default:
          break
      }
    },
    goAbout() {
      this.$router.push({ name: 'About' })
    }

  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.ttFooter{
  cursor: pointer;
  width: 100%;
  background-color: #ffffff;
  .ttFCont{

     width: 1348px;
    //  height: 558px;
     margin: 0 auto;
     border-top: 1px solid rgba(229,229,229,1);
     display: flex;
     justify-content: space-between;

     .ttF1{
       padding-top: 100px;
       .tF2{
        font-size:15px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(45,45,45,1);
        line-height:53px;
       }
       .tF3{
          font-size:15px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(45,45,45,1);
          line-height:53px;
       }

     }
  }
  .tFF{
    width: 100%;
    text-align: center;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(187,193,197,1);
    line-height:24px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
</style>
