<template>
  <div class="contain">
    <div class="conTent" @mouseleave="mouseLeave">
      <div class="conLogo">
        <img src="@/assets/logo.png" alt srcset>
      </div>
      <div class="conTab">
        <!-- {{ onRoutesChild }} -->
        <div class="conNav">
          <ul>
            <li :class="{'active':onRoutesChild=='home'}" @click="showTab(1)">产品介绍</li>
            <li :class="{'active':onRoutesChild=='price'}" @click="showTab(2)">价格</li>
            <li :class="{'active':onRoutesChild=='news'}" @click="showTab(3)">行业资讯</li>
            <li :class="{'active':onRoutesChild=='order'}" @click="showTab(4)">我的订单</li>
          </ul>
        </div>
        <p v-if="info" class="workArea" @click="jumpTyteen">进入工作区</p>
        <div v-if="!info" class="conLogin">
          <p class="login" @click="login">登录</p>
          <p class="resgite" @click="register">注册</p>
        </div>
        <div
          v-else
          class="right-menu"
          @mouseover="mouseOver"
        >

          <div class="avatar-container">
            <div class="avatar-wrapper">
              <img src="@/assets/PITAO-15.png" class="user-avatar" style="margin-top:6px">
              <!-- <svg-icon style="width:45px;height:45px" icon-class="touxiang" /> -->
              <img :class="{'xlC':1,'close':isshow}" src="@/assets/sl.png" alt="" srcset="">
            </div>
            <div v-if="isshow" @mouseleave="mouseLeave">
              <tableft />
            </div>
            <!-- <el-dropdown-menu disabled style="display:none" /> -->

            <!-- <tableft /> -->
            <!-- <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <tableft />
              <el-dropdown-item divided @click.native="ttyAuth">
                <span style="display:block;">企业信息</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/core/services/cache'
import tableft from '@/components/tabMenu'
import { testHttpInteractor } from '@/core'

export default {
  name: 'Navbar',
  components: {
    tableft
  },
  data() {
    return {
      info: getUserInfo(),
      isshow: false
    }
  },
  computed: {
    onRoutesChild() {
      return this.$route.path.replace('/', '').split('/')[0]
    }
  },
  mounted() {
    this.info = getUserInfo()
    console.log(getUserInfo())
    console.log('------------')
  },
  methods: {
    async pushTab(tab) {
      await testHttpInteractor.addTable({
        data: {
          tableId: tab
        }
      }).then(res => {

      })
    },
    jumpTyteen() {
      testHttpInteractor.jumpTyteen().then(res => {
        res = JSON.parse(res)
        console.log(res.data)
        if (res.data.accessToken) {
          window.location.href = `http://www.tyteenyun.com/ttbuild/#/workbench/approvalProcess?accessToken=${res.data.accessToken}`
          this.pushTab(e)
        } else {
          this.$message({
            message: '跳转工作台失败~',
            type: 'warning',
            duration: 2 * 1000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    showMenu() {
      this.isshow = !this.isshow
    },
    mouseOver() {
      this.isshow = true
    },
    mouseLeave() {
      // alert(1)
      this.isshow = false
    },

    // 注册
    register() {
      this.$router.push({ name: 'Register' })
    },
    // 登录
    login() {
      this.$router.push({ name: 'Login' })
    },
    showTab(e) {
      switch (e) {
        case 1:

          this.$router.push({ name: 'Home' })
          this.pushTab(e)
          break
        case 2:

          this.$router.push({ name: 'Price' })
          this.pushTab(e)
          break
        case 3:
          this.$router.push({ name: 'News' })
          this.pushTab(e)
          break
        case 4:
          if (!this.info) {
            this.$router.push({ name: 'Login' })
            break
          }
          this.$router.push({ name: 'Order' })
          break

        default:
          break
      }
    }
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
  position: fixed;
  z-index: 88;
  top: 0;
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
    .conTab {
      display: flex;
      justify-content: space-between;
      align-items: center;
        .workArea{
          cursor: pointer;
          text-align: center;
      width: 100px;
      height: 36px;
      background: #0E4E90;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FEFEFE;
      line-height: 36px;
      margin-right: 40px;
    }
      .conNav {
        margin-right: 200px;
        cursor: pointer;
        ul {
          list-style: none;
          .active{
            border-bottom: 4px solid rgba(13, 77, 143, 1);
          }
          li {
            display: inline;
            padding-bottom: 5px;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(59, 59, 59, 1);
            line-height: 53px;
            margin-left: 80px;
            &:hover {
              border-bottom: 4px solid rgba(13, 77, 143, 1);
            }
          }
        }
      }
      .conLogin {
        cursor: pointer;
        .login {
          display: inline-block;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(59, 59, 59, 1);
          line-height: 53px;
          margin-right: 31px;
        }
        .resgite {
          width: 80px;
          height: 36px;
          text-align: center;
          display: inline-block;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(253, 253, 253, 1);
          line-height: 36px;
          background: rgba(13, 77, 143, 1);
          border-radius: 5px;
        }
      }
      .right-menu {
    float: right;
    height: 100%;

    // line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: -5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .xlC{
          width: 20px;
          height: 20px;
          transition: all 0.4s;
        }
        .close{
          transition: all 0.4s;
          transform:rotate(180deg);
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;

        }
      }
    }
  }
    }
  }
}
</style>
