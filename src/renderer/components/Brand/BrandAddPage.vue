<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item to="/dashboard">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          brandForm.id ? '编辑品牌' : '添加品牌'
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="backToList" icon="arrow-left"
          >返回列表</el-button
        >
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form
          ref="brandForm"
          :rules="brandFormRules"
          :model="brandForm"
          label-width="120px"
        >
          <el-form-item label="品牌名称" prop="name">
            <el-input v-model="brandForm.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌简介" prop="simple_desc">
            <el-input
              type="textarea"
              v-model="brandForm.simple_desc"
              :rows="3"
            ></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="品牌图片" prop="list_pic_url">
            <el-upload
              class="image-uploader"
              name="brand_pic"
              :action="$http.defaults.baseURL + '/upload/brandPic'"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :headers="uploaderHeader"
            >
              <img
                v-if="brandForm.list_pic_url"
                :src="brandForm.list_pic_url"
                class="image-show"
              />
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">图片尺寸：750*420</div>
          </el-form-item>
          <el-form-item label="推荐">
            <el-checkbox label="" v-model="brandForm.is_new"></el-checkbox>
          </el-form-item>
          <el-form-item label="推荐展示图片" v-if="brandForm.is_new">
            <el-upload
              class="image-uploader new-image-uploader"
              name="brand_new_pic"
              :action="$http.defaults.baseURL + '/upload/brandNewPic'"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :headers="uploaderHeader"
            >
              <img
                v-if="brandForm.new_pic_url"
                :src="brandForm.new_pic_url"
                class="image-show"
              />
              <i v-else class="el-icon-plus image-uploader-icon"></i>
            </el-upload>
            <div class="form-tip">图片尺寸：375*252</div>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number
              v-model="brandForm.sort_order"
              :min="1"
              :max="1000"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="启用">
            <el-switch v-model="brandForm.is_show"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveBrand">确定保存</el-button>
            <el-button @click="backToList">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaderHeader: {
        'X-Nideshop-Token': window.sessionStorage.getItem('token') || ''
      },
      brandForm: {
        id: 0,
        name: '',
        list_pic_url: '',
        simple_desc: '',
        pic_url: '',
        sort_order: 100,
        is_show: true,
        floor_price: 0,
        app_list_pic_url: '',
        is_new: false,
        new_pic_url: '',
        new_sort_order: 10
      },
      brandFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        simple_desc: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ],
        list_pic_url: [
          { required: true, message: '请选择品牌图片', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.brandForm.id = this.$route.query.id || 0
    this.getBrand()
  },
  methods: {
    backToList() {
      this.$router.push('/dashboard/brand')
    },
    async saveBrand() {
      this.$refs['brandForm'].validate(async valid => {
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.post(
          '/brand/store',
          this.brandForm
        )
        if (res.errno !== 0) {
          return this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.backToList()
      })
    },
    uploadSuccess(res, file) {
      if (res.errno === 0) {
        switch (res.data.name) {
          //品牌图片
          case 'brand_pic':
            this.brandForm.list_pic_url = res.data.fileUrl
            break
          case 'brand_new_pic':
            this.brandForm.new_pic_url = res.data.fileUrl
            break
        }
      }
    },
    async getBrand() {
      if (this.brandForm.id <= 0) {
        return false
      }
      //加载品牌详情
      const { data: res } = await this.$http.get('/brand/info', {
        params: {
          id: this.brandForm.id
        }
      })
      let resInfo = res.data
      resInfo.is_new = resInfo.is_new ? true : false
      resInfo.is_show = resInfo.is_show ? true : false
      this.brandForm = resInfo
    }
  }
}
</script>

<style>
.image-uploader {
  height: 105px;
}
.image-uploader .el-upload {
  border: 1px solid #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.image-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 187px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader .image-show {
  width: 187px;
  height: 105px;
  display: block;
}

.image-uploader.new-image-uploader {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader.new-image-uploader .image-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 165px;
  height: 105px;
  line-height: 105px;
  text-align: center;
}

.image-uploader.new-image-uploader .image-show {
  width: 165px;
  height: 105px;
  display: block;
}
</style>
