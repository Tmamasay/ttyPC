<template>
  <div class="ttOrderCont">
    <div class="ttyNav">
      <div class="navImg">
        <img src="@/assets/heng.png" alt="" srcset="">
      </div>
      <p class="navTit"><span>我的订单</span>><span>订单记录</span></p>
    </div>
    <div class="ttOrderDet">
      <div v-if="userInfo.company" class="ttOrtit">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="orderId"
            label="订单号"
            width="180"
          />
          <el-table-column
            prop="years"
            label="购买年限"
          />
          <el-table-column
            prop="productName"
            label="订购版本"
          />
          <el-table-column
            prop="peopleNum"
            label="使用人数"
          />
          <el-table-column prop="payTime" width="180" label="支付时间">
            <template slot-scope="scope">
              {{ formatDate(scope.row.payTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="支付金额"
          />
          <el-table-column
            prop="payType"
            label="支付方式"
          />
          <el-table-column
            prop="capacity"
            label="预计容量"
          />
          <el-table-column
            prop="payType"
            label="到期时间"
            width="180"
          />

          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <span v-if="+scope.row.payStatus===0">
                <span class="qxOr" @click="delOrder(scope.row)">取消订单</span>
                <span class="payOr" @click="goPay(scope.row)">去付款</span>
              </span>
              <span v-if="+scope.row.payStatus===1&&+scope.row.billStatus===0">
                <span class="qxOr" @click="getInvoice(scope.row)">申请发票</span>
              </span>
              <span v-if="+scope.row.payStatus===1&&+scope.row.billStatus===1">
                <span class="qxOrOver">已开票</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <Footer />
    <el-dialog
      title="申请发票"
      :visible.sync="isShowInvoice"
      width="30%"
      center
    >
      <div>
        <Invoice :info="orderInfo" />
      </div>

    </el-dialog>
  </div>
</template>

<script>
import Invoice from '@/components/invoice'
import { testHttpInteractor } from '@/core'
import Footer from '@/components/Footer'
import { getUserInfo } from '@/core/services/cache'

export default {
  name: 'Home',
  components: {
    Footer,
    Invoice
  },
  data() {
    return {
      orderInfo: null,
      isShowInvoice: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      checked: false,
      person: '',
      checkItem: null,
      userInfo: getUserInfo() ? getUserInfo() : null,
      testInfo: {},
      query: {
        page: 1,
        count: 10
      }
    }
  },
  async created() {
    this.getTestList()
  },
  mounted() {
    // alert(this.$route.params.isTry)
  },
  methods: {
    goPay(row) {
      setUserOrder(row.id)
      this.$router.push({ name: 'Srue', params: { orderId: row.id }})
    },
    async delOrder(row) {
      await testHttpInteractor.delOrder({
        data: {
          orderId: row.id
        }
      }).then(res => {
        if (res) {
          this.$message({
            message: '取消订单成功~',
            type: 'success',
            duration: 2 * 1000
          })
          this.getTestList()
        }
      })
    },
    getInvoice(row) {
      this.isShowInvoice = true
      this.orderInfo = row
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
    async goTryDill() {
      if (!this.person) {
        this.$message({
          message: '请选择使用人数',
          type: 'warning',
          duration: 4 * 1000
        })
        return
      }
      if (!this.checked) {
        this.$message({
          message: '请勾选同意服务协议',
          type: 'warning',
          duration: 4 * 1000
        })
        return
      }
      await testHttpInteractor.createProductPriceTest().then(res => {
        if (res) {
          this.$message({
            message: '试用申请提交成功，等待管理员审核~',
            type: 'success',
            duration: 5 * 1000
          })
          setTimeout(() => {
            this.$router.push({ name: 'Home' })
          }, 3000)
        }
      })
    },
    showItem(e) {
      this.checkItem = this.testInfo.priceList.find(el => +el.id === +e)
    },
    onAdd() {
      this.$router.push({ name: 'CreateTest' })
    },
    onEdit(item, index) {
      this.$router.push({ name: 'EditTest', params: { id: item.id }})
    },
    async getTestList() {
      try {
        const data = await testHttpInteractor.getMyOrderList()
        console.log(data)
        this.tableData = data
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
.ttOrderCont{
  width: 100%;
  .ttyNav{
    width: 100%;
    height: 80px;
    position: relative;
    .navImg{
       width: 100%;
      height: 80px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
      }
    }
    .navTit{
      position: absolute;
      line-height: 80px;
      top: 0;
      left: 280px;
      text-align: left;
      width: 1350px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:500;
      color:#ffffff;
    }
  }
.ttOrderDet{
  width:1350px;
  height:376px;
  margin: 30px auto;
  background:rgba(255,255,255,1);
  border:1px solid rgba(211,211,211,1);
  border-radius:10px;
  .ttOrtit{
    cursor: pointer;
    margin: 50px 60px;
    .qxOr{

    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #186AC0;
    line-height: 30px;
    }
    .qxOrOver{

    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #B2B7C0;
    line-height: 30px;
    }
    .payOr{
font-size: 12px;
font-family: PingFang SC;
font-weight: 500;
color: #186AC0;
line-height: 30px;
padding-left: 20px;
    }

  }
}

}
</style>

