<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/user/add"> </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
          <el-form-item label="会员名称">
            <el-input
              v-model="queryInfo.name"
              placeholder="会员名称"
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
        <el-table :data="users" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="100"></el-table-column>
          <el-table-column prop="username" label="会员名称"></el-table-column>
          <el-table-column prop="nickname" label="呢称" width="120">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="80">
            <template slot-scope="scope">
              {{ scope.row.gender == 1 ? '女' : '男' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            width="120"
          ></el-table-column>
          <el-table-column prop="register_time" label="注册时间">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteUser(scope.$index, scope.row)"
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
      users: []
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
    editUser(index, row) {
      this.$router.push({ name: 'user_add', query: { id: row.id } })
    },
    deleteUser(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/user/destory', { id: row.id }).then(response => {
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
      const { data: res } = await this.$http.get('/user', {
        params: this.queryInfo
      })
      // console.log(res.data.data)
      this.users = res.data.data
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
