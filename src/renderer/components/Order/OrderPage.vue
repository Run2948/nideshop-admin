<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>订单中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/order/add">
          <el-button type="primary" icon="el-icon-plus">添加订单</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input
              v-model="queryInfo.order_sn"
              placeholder="请输入订单号"
              clearable
              @clear="getList"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input
              v-model="queryInfo.consignee"
              placeholder="请输入收货人"
              clearable
              @clear="getList"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table
          :data="orders"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="order_sn" label="订单号"> </el-table-column>
          <el-table-column prop="add_time" label="下单时间"> </el-table-column>
          <el-table-column prop="consignee" label="收货人"> </el-table-column>
          <el-table-column prop="actual_price" label="订单金额">
          </el-table-column>
          <el-table-column prop="order_status_text" label="订单状态">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editOrder(scope.$index, scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteOrder(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[8, 9, 10, 20, 50, 100]"
          :page-size="queryInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        order_sn: '',
        consignee: '',
        page: 1,
        size: 8
      },
      total: 0,
      orders: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getList()
    },
    editOrder(index, row) {
      this.$router.push({ name: 'order_add', query: { id: row.id } })
    },
    deleteOrder(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/order/destory', { id: row.id }).then(response => {
          console.log(response.data)
          if (response.data.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            this.getList()
          }
        })
      })
    },
    async getList() {
      const { data: res } = await this.$http.get('/order', {
        params: this.queryInfo
      })
      this.orders = res.data.data
      this.page = res.data.currentPage
      this.total = res.data.count
    }
  }
}
</script>

<style scoped>
</style>
