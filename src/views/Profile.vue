<template>
    <div class="view-content profile">
      <el-row class="height-100" :gutter="12">
        <el-col :xs="24"
                :sm="editFlag ? 12 : 24"
                :md="editFlag ? 12 : 24"
                :lg="editFlag ? 12 : 24"
                :xl="editFlag ? 8 : 24"
                style="text-align: center"
                class="height-100 width-trans">
          <el-card class="height-100 box-card" shadow="never">
            <el-upload
              ref="upload"
              :action="action"
              :multiple="false"
              :show-file-list="false"
              :file-list="fileList"
              :on-progress="handleProgress"
              :on-success="handleSuccess">
              <el-avatar :size="148" :src="form.userPic">
                <img src="@/assets/img/pic.png"/>
              </el-avatar>
            </el-upload>
            <el-button type="text" class="edit-btn" v-if="!editFlag" @click="startEdit" plain><i class="el-icon-edit"></i>编辑</el-button>
          </el-card>
        </el-col>
        <el-col v-if="editFlag" :xs="24" :sm="12" :md="12" :lg="12" :xl="16" class="height-100 width-trans">
          <el-card class="height-100 box-card" shadow="never">
            <el-form ref="form" :model="form" label-width="auto">
              <el-form-item label="用户名">
                <el-input v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="success" @click="save" plain>保存</el-button>
            <el-button type="danger" @click="cancel" plain>取消</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {
  Upload,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Button,
  Card,
  Avatar
} from 'element-ui'
export default {
  name: 'Profile',
  components: {
    'el-upload': Upload,
    'el-row': Row,
    'el-col': Col,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-button': Button,
    'el-card': Card,
    'el-avatar': Avatar
  },
  data: function () {
    return {
      action: 'http://localhost:8089/user/upload',
      form: {
        userName: '',
        userPic: '',
        name: ''
      },
      editFlag: false,
      fileList: []
    }
  },
  mounted: function () {
    this.form = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
    cancel: function () {
      this.editFlag = false
    },
    save: function () {
      this.editFlag = false
    },
    startEdit: function () {
      this.editFlag = true
    },
    handleProgress: function (ev, file, list) {
      console.log(ev, file, list)
    },
    handleSuccess: function (response, file, fileList) {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>
  .profile {
  }
  .el-avatar {
    border: 1px solid #E9E9EB;
    position: relative;
    cursor: pointer;
  }
  .el-avatar:before {
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: inline-block;
    position: absolute;
    background: none;
    transition: background 250ms;
  }
  .el-avatar:hover:before {
    content: '更换';
    background: rgba(0, 0, 0, 0.6);
  }
  .height-100 {
    height: 100%;
  }
  .width-trans {
    transition: width 250ms;
  }
  .el-card {
    overflow-y: auto;
  }
  .edit-btn {
    border: none;
  }
</style>
