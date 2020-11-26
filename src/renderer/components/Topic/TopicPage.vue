<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>店铺运营</el-breadcrumb-item>
        <el-breadcrumb-item>专题管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/operate/topic/add">
          <el-button type="primary" icon="el-icon-plus">添加专题</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="专题名称">
            <el-input
              v-model="queryInfo.name"
              placeholder="专题名称"
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
          :data="topics"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="title" label="专题名称"> </el-table-column>
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
                @click="editTopic(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteTopic(scope.$index, scope.row)"
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
      topics: []
    }
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
    editTopic(index, row) {
      this.$router.push({ name: 'topic_add', query: { id: row.id } })
    },
    deleteTopic(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/topic/destory', { id: row.id }).then(response => {
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
      const { data: res } = await this.$http.get('/topic', {
        params: this.queryInfo
      })
      this.topics = res.data.data
      this.total = res.data.count
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
</style>
