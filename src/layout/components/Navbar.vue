<template>
  <div class="contain">
    <div class="conTent">
      <div class="conLogo">
        <img src="@/assets/logo.png" alt srcset>
      </div>
      <div class="conTab">
        <div class="conNav">
          <ul>
            <li>产品介绍</li>
            <li>价格</li>
            <li>行业资讯</li>
            <li>我的订单</li>
          </ul>
        </div>
        <div class="conLogin">
          <p class="login">登录</p>
          <p class="resgite">注册</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { VueVantLocales } from '@/lang'
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  computed: {},
  methods: {
    // onClickRight() {
    //   this.$router.push({ name: 'ComponentDemo' })
    // }
  }
}
</script>

<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 65px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 20px 0px rgba(191, 190, 190, 0.15);
  .conTent {
    width: 90%;
    height: 65px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .conLogo {
      width: 105px;
      height: 32px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .conTab{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .conNav{
        margin-right: 200px;
        cursor: pointer;
        ul{
          list-style: none;
          li{
             display: inline;
             padding-bottom: 5px;
             font-size:14px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(59,59,59,1);
              line-height:53px;
              margin-left: 80px;
             &:hover{
             border-bottom: 4px solid rgba(13,77,143,1);
             }
          }
        }
      }
      .conLogin{
        cursor: pointer;
        .login{
          display: inline-block;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(59,59,59,1);
          line-height:53px;
          margin-right: 31px;
        }
        .resgite{
          width: 80px;
          height: 36px;
          text-align: center;
          display: inline-block;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(253,253,253,1);
          line-height:36px;
          background:rgba(13,77,143,1);
        border-radius:5px;
        }
      }
    }
  }
}
</style>
