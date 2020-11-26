<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/goods/add">
          <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input
              v-model="queryInfo.name"
              placeholder="商品名称"
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
          :data="goods"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            width="300"
          ></el-table-column>
          <el-table-column prop="retail_price" label="售价"></el-table-column>
          <el-table-column prop="goods_number" label="库存"></el-table-column>
          <el-table-column prop="is_new" label="新品">
            <template slot-scope="scope">
              {{ scope.row.is_new === 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="is_new" label="人气">
            <template slot-scope="scope">
              {{ scope.row.is_hot === 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="is_show" label="上架">
            <template slot-scope="scope">
              {{ scope.row.is_on_sale === 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="sort_order" label="排序"> </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editGoods(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteGoods(scope.$index, scope.row)"
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
        name: '',
        page: 1,
        size: 8
      },
      total: 0,
      goods: []
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
    editGoods(index, row) {
      this.$router.push({ name: 'goods_add', query: { id: row.id } })
    },
    deleteGoods(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/goods/destory', { id: row.id }).then(response => {
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
      const { data: res } = await this.$http.get('/goods', {
        params: this.queryInfo
      })
      // console.log(res.data.data)
      this.goods = res.data.data
      this.total = res.data.count
    }
  }
}
</script>

<style scoped>
</style>
