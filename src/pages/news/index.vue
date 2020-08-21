<template>
  <div class="ttNewsCont">
    <div class="ttnewBanner">
      <img src="@/assets/newsB.png" alt="" srcset="">
    </div>

    <div class="ttNewsList ">
      <div class="ttnewZW" />
      <div class="ttNewOne active">
        <div class="ttLeft">
          <img src="" alt="" srcset="">
        </div>
        <div class="ttCont">
          <p class="C1">泰霆云saas正式上线，此处应该来个标题</p>
          <p class="C2">来源：泰霆科技  发布时间：2020-08-19</p>
          <p class="C3">泰霆云是泰霆科技有限公司研发的智能建筑管理系统，于2020年7月上线运营。主要服务是人事管理，建筑管理，财务管理，行政管理，销售管理，等一站式以系统业务处理系统，该系统为企业降低成本提高效率，创造无纸化办公创造有效环境</p>
          <p class="C4 btnActive">查看详情</p>
        </div>
      </div>
      <div class="ttNewOne">
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
      border-bottom:1px solid rgba(255,255,255,1) !important;
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
    .ttLeft{
      width:248px;
      height:165px;
      overflow: hidden;
      background-color: bisque;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .ttCont{
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

