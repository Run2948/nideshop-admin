<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/category/add">
          <el-button type="primary" icon="el-icon-plus">添加分类</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <!-- 表格 -->
        <tree-table
          class="treeTable"
          :data="categories"
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          index-text="#"
          :show-row-hover="false"
          show-index
          border
        >
          <!-- 是否展示 -->
          <template slot="show" slot-scope="scope">
            <i
              class="el-icon-success"
              style="color: lightgreen"
              v-if="scope.row.is_show === 1"
            ></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.level === 1">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.level === 2"
              >二级</el-tag
            >
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <!-- 操作 -->
          <template slot="opt" slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="mini"
              @click="editCategory(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteCategory(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </tree-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      // 为table指定列的定义
      columns: [
        // {
        //   label: 'ID',
        //   prop: 'id'
        // },
        {
          label: '分类名称',
          prop: 'name'
        },
        {
          label: '是否显示',
          // 当前列 自定义模板
          type: 'template',
          template: 'show'
        },
        {
          label: '排序',
          // 当前列 自定义模板
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          // 当前列 自定义模板
          type: 'template',
          template: 'opt'
        }
      ]
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
    editCategory(index, row) {
      this.$router.push({ name: 'category_add', query: { id: row.id } })
    },
    deleteCategory(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/category/destory', { id: row.id })
            .then(response => {
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
        .catch(() => {})
    },
    async getList() {
      const { data: res } = await this.$http.get('/category')
      // console.log(res)
      this.categories = res.data
    }
  }
}
</script>

<style scoped>
.sub-category .el-table__expanded-cell {
  padding: 0;
}
</style>
