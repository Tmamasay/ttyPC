<template>
  <div class="ttNewsDetailCont">
    <div class="showDetail">
      <p class="D1">泰霆云saas正式上线，此处应该来个标题</p>
      <p class="D2">来源：泰霆科技      发布时间：2020-08-19</p>
      <p class="D3">此前的一天，有报道称，甲骨文加入了对TikTok北美、澳大利亚、新西兰业务的竞购。路透社指出，这对甲骨文来说是一个战略性的转变，因为甲骨文过去主要面向的是公司客户，从云服务和软件许可中赚钱。甲骨文的创始人Larry Ellison是公开支持特朗普的少数几位顶级科技公司高管之一。消息称，甲骨文正与字节跳动的一些投资者合作，包括General Atlantic和红杉资本，提出了收购TikTok资产的提议。
        美国财长姆努钦（Mnuchin）周二在接受采访时拒绝就甲骨文是否加入竞购TikTok相关业务作出评论，他仅表示，任何收购这家中国背景的短视频产品的交易获得许可，都将保护美国数据。
        微软最早确认正与字节跳动谈判，拟收购TikTok部分地区业务，随后推特也被曝出有竞购意向。美东时间8月14日晚，根据美国外国投资委员会（CFIUS）建议，美国总统特朗普发布第二道行令，要求字节跳动90天内必须完成TikTok美国业务出售交易的交割。行政令充分授权总检察长强制剥离TikTok美国业务，“有权采取任何必要措施以执行此命令。</p>

    </div>

    <Footer />
  </div>
</template>

<script>
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
    // this.getTestList({ page: 1, count: 10 })
  },
  methods: {
    // onAdd() {
    //   this.$router.push({ name: 'CreateTest' })
    // },
    // onEdit(item, index) {
    //   this.$router.push({ name: 'EditTest', params: { id: item.id }})
    // },
    // async getTestList(query) {
    //   try {
    //     this.query = Object.assign({}, this.query, query)
    //     const { data, total } = await testHttpInteractor.getTestList(
    //       this.query
    //     )
    //     this.listTotal = total
    //     if (this.query.page === 1) {
    //       this.list = data
    //     } else {
    //       this.list = [...this.list, ...data]
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.ttNewsDetailCont{
  width: 100%;
  .showDetail{
width: 1000px;
margin: 100px auto;
text-align: center;
.D1{
  font-size:35px;
font-family:PingFang SC;
font-weight:500;
color:rgba(45,45,45,1);
line-height:53px;
}
.D2{
  font-size:14px;
font-family:PingFang SC;
font-weight:500;
color:rgba(153,153,153,1);
line-height:80px;
}
.D3{
  font-size:16px;
font-family:PingFang SC;
font-weight:500;
color:rgba(45,45,45,1);
line-height:30px;
text-align: left;
}

  }

}

</style>

