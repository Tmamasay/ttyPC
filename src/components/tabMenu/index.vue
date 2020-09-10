<template>
  <div class="TabCnu">
    <div class="tabContent">
      <div class="tabName">
        <p class="L1">{{ info.user.name||'小可爱' }}</p>
        <p class="L2">{{ info.user.companyName||'泰霆科技' }}</p>
      </div>
      <div class="tabGn">
        <div class="Gn1" @click="ttyAuth">
          <div class="n1">
            <img src="@/assets/qy.png" alt="" srcset="">
          </div>
          <p class="q1">企业认证</p>
        </div>
        <div class="Gn1" @click="logout">
          <div class="n1">
            <img src="@/assets/out.png" alt="" srcset="">
          </div>
          <p class="q2">退出登录</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getUserInfo } from '@/core/services/cache'
export default {
  name: 'TabMenu',
  data() {
    return {
      info: getUserInfo()
    }
  },
  mounted() {
    this.info = getUserInfo()
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      setTimeout(() => {
        this.$router.push({ name: 'Home' })
        location.reload()
      }, 1000)
    },
    ttyAuth() {
      this.$router.push({ name: 'Auth' })
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
.TabCnu{
  cursor: pointer;
  // margin-top: 250px;;
  position: absolute;
  right: -85px;
  top:63px;
  z-index: 99;
 .tabContent{
   width: 180px;
  height: 160px;
  background: #FFFFFF;
  box-shadow: 0px 3px 16px 0px rgba(100, 100, 100, 0.2);
  border-radius: 10px;
  overflow: hidden;
.tabName{
  width: 205px;
height: 70px;
background: #0E4D90;
// border-radius: 10px;
.L1{

font-size: 16px;
font-family: PingFang SC;
font-weight: 500;
color: #FDFDFD;
padding-top:14px;
margin-left: 16px
// line-height: 45px;
}
.L2{

font-size: 14px;
font-family: PingFang SC;
font-weight: 500;
color: #FDFDFD;
padding-top:11px;
margin-left: 16px

}
}
.tabGn{
  .Gn1{
    margin-left: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
     .q1{

          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #1769C0;
          line-height: 50px;
          padding-left: 10px;
      }
      .q2{

      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #2E2E2E;
      padding-left: 10px;
      // line-height: 53px;
      }
    .n1{
      width: 17px;
      height: 17px;
      overflow:hidden;
      img{
        width: 100%;
        height: 100%;
      }

    }
  }

}
 }
 }
</style>
