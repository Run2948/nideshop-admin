<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/brand/add">
          <el-button type="primary" icon="el-icon-plus">添加品牌</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="品牌名称">
            <el-input
              v-model="queryInfo.name"
              placeholder="品牌名称"
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
          :data="brands"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="name" label="品牌名称"> </el-table-column>
          <el-table-column prop="is_new" label="推荐到首页" width="120">
            <template slot-scope="scope">
              {{ scope.row.is_new == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="is_show" label="是否显示" width="100">
            <template slot-scope="scope">
              {{ scope.row.is_show == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="sort_order" label="排序" width="80">
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="editBrand(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteBrand(scope.$index, scope.row)"
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
      brands: []
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
    editBrand(index, row) {
      this.$router.push({ name: 'brand_add', query: { id: row.id } })
    },
    deleteBrand(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.post('/brand/destory', {
            id: row.id
          })
          if (res.errno !== 0) {
            return this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async getList() {
      const { data: res } = await this.$http.get('/brand', {
        params: this.queryInfo
      })
      // console.log(res.data.data)
      this.brands = res.data.data
      this.total = res.data.count
    }
  }
}
</script>

<style scoped>
</style>
