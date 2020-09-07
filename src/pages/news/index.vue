<template>
  <div class="ttNewsCont">
    <div class="ttnewBanner">
      <img src="@/assets/newsB.png" alt="" srcset="">
    </div>
    <div class="ttNewsList ">
      <div class="ttnewZW" />
      <div v-for="item in list" :key="item.id" class="ttNewOne">
        <div class="ttLeft">
          <img :src="item.noticeImg" alt="" srcset="">
        </div>
        <div class="ttCont">
          <p class="C1">{{ item.title }}</p>
          <p class="C2">来源：{{ item.source }}  发布时间：{{ formatDate(item.releaseTime) }}</p>
          <p class="C3" v-html="item.textBody" />
          <p class="C4" @click="goNews(item.id)">查看详情</p>
        </div>
      </div>
      <div v-for="item in 5" :key="item" class="ttNewOne">
        <div class="ttLeft">
          <img src="" alt="" srcset="">
        </div>
        <div class="ttCont">
          <p class="C1">泰霆云saas正式上线，此处应该来个标题</p>
          <p class="C2">来源：泰霆科技  发布时间：2020-08-19</p>
          <p class="C3">泰霆云是泰霆科技有限公司研发的智能建筑管理系统，于2020年7月上线运营。主要服务是人事管理，建筑管理，财务管理，行政管理，销售管理，等一站式以系统业务处理系统，该系统为企业降低成本提高效率，创造无纸化办公创造有效环境</p>
          <p class="C4">查看详情</p>
        </div>
      </div>
      <p class="showAllLine"> 共{{ total }}条资讯</p>
      <div class="pageFy">
        <el-pagination
          :background="true"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
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

      list: [],
      query: {
        pageNum: 1,
        pageSize: 6
      },
      total: 0
    }
  },
  async created() {
    this.getNewsList()
  },
  methods: {
    goNews(id) {
      this.$router.push({ name: 'Detail', params: { newsId: id }})
    },
    handleCurrentChange(val) {
      this.query.pageNum = val
      this.getNewsList()
    },
    // 时间戳转换
    formatDate(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
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
.ttNewsCont{
  .ttnewBanner{
    width: 100%;
    height: 300px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ttnewZW{
    margin-bottom: 70px;
  }
  .ttNewsList{
    position: relative;
    width:1350px;
    z-index: 2;
    margin: -70px auto;
    height:1600px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(229, 229, 229, 1);
    border-radius:10px;

    .active{
      background:rgba(241,241,241,1);
      border-bottom:1px solid rgb(252, 152, 152) !important;
    }
    .showAllLine{
      margin-top:10px;
      width: 130px;
      float: right;
font-size: 12px;
font-family: PingFang SC;
font-weight: 500;
color: #646464;
line-height: 26px;
    }
     .pageFy{
       width: 300px;
       margin: 50px auto;

     }

    .ttNewOne{
      width:1200px;
      height:225px;
      margin: 0 auto;
      padding: 30px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid rgba(229,229,229,1);
      &:hover{
        background:rgba(241,241,241,1);
      // border-bottom:1px solid rgb(252, 152, 152) !important;
      .ttCont{
        .C4{
         background:rgba(13,77,143,1);
         color:rgba(255,255,255,1);
          font-size:15px;
        font-family:PingFang SC;
        font-weight:500;
        }
      }
      }
    .ttLeft{
      width:248px;
      height:165px;
      overflow: hidden;
      // background-color: bisque;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .ttCont{
      cursor: pointer;
      width: 1000px;
      margin-left: 20px;
      margin-top: -0px;
      .C1{
          font-size:18px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(13,77,143,1);
          line-height:30px;
      }
      .C2{
        font-size:12px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(153,153,153,1);
      line-height:33px;
      }
      .C3{
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(99,99,99,1);
        line-height:23px;
      }
      .C4{

        width:100px;
        height:32px;
        border:1px solid rgba(229,229,229,1);
        text-align: center;
        border-radius:5px;
       font-size:14px;
        font-family:Adobe Heiti Std;
        font-weight:normal;
        color:rgba(99,99,99,1);
        line-height:30px;
        margin-top:20px;

      }
      .btnActive{
        background:rgba(13,77,143,1);
         color:rgba(255,255,255,1);
          font-size:15px;
        font-family:PingFang SC;
        font-weight:500;
      }
    }
    }
  }

}

</style>
<style>
.pageFy .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0E4D90;
  color: #fff
}

</style>

