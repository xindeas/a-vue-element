<template>
  <div class="content">
    <div class="form-content">
      <div class="form-title">{{sysName}}</div>
      <div class="form-body">
        <el-form ref="form" :model="form" :size="size" :rules="rules">
          <el-form-item prop="userName">
<!--            <label slot="label">账号</label>-->
            <el-input type="text" prefix-icon="el-icon-user" v-model="form.userName" placeholder="账号/手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
<!--            <label slot="label">密码</label>-->
            <el-input type="password" prefix-icon="el-icon-lock" v-model="form.password" placeholder="密码" show-password></el-input>
          </el-form-item>
        </el-form>
        <div class="oper-bar">
          <div class="oper-bar-item">
            <el-checkbox v-model="form.autoLogin">
              自动登录
            </el-checkbox>
          </div>
          <div class="oper-bar-item">
            <el-link type="primary">忘记密码</el-link>
          </div>
        </div>
        <el-button type="primary" style="width: 100%;" :loading="btnLoading" @click="login">登录</el-button>
      </div>
      <div class="form-footer">
        ©2020 Xindeas All rights reserved.
      </div>
    </div>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Link
} from 'element-ui'
import { SYS_NAME, DEFAULT_ROUTER } from '@/utils/const.js'
export default {
  name: 'Login',
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-button': Button,
    'el-checkbox': Checkbox,
    'el-link': Link
  },
  data: function () {
    return {
      sysName: SYS_NAME,
      form: {
        userName: '',
        password: '',
        autoLogin: false
      },
      rules: {
        userName: [{required: true, message: '账号不能为空', trigger: 'change'}],
        password: [{required: true, message: '密码不能为空', trigger: 'change'}]
      },
      btnLoading: false
    }
  },
  computed: {
    size: function () {
      return this.$store.state.size
    }
  },
  methods: {
    login: function () {
      var vm = this

      let valid = false
      vm.$refs.form.validate((result, obj) => {
        valid = result
      })
      if (!valid) {
        return
      }
      vm.btnLoading = true
      // 后台返回用户账号信息存入session

      // this.$post('/user/login', vm.form).then((res) => {
      //   vm.btnLoading = false
      //   const userInfo = {
      //     userName: vm.form.userName,
      //     userPic: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
      //     name: '张三'
      //   }
      //   // this.$store.commit('permissionList', [菜单数组])
      //   sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      //   vm.$router.push({path: DEFAULT_ROUTER})
      // }, () => {
      //   vm.btnLoading = false
      // })
      setTimeout(() => {
        const userInfo = {
          userName: vm.form.userName,
          userPic: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg',
          name: '张三'
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

        vm.$router.push({path: DEFAULT_ROUTER})
        vm.btnLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login-bg.png');
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .form-content {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 2em;
    width: 18em;
  }
  .form-title {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1em;
    font-family: Font001;
  }
  .form-footer {
    color: #999;
    text-align: center;
    margin-top: 1em;
    font-family: Font002;
  }
  .el-form-item label {
    color: white;
  }

  .oper-bar {
    margin-bottom: 0.5em;
  }
  .oper-bar:after {
    content: '';
    display: block;
    clear: both;
  }
  .oper-bar-item:first-child {
    float: left;
  }
  .oper-bar-item:last-child {
    float: right;
  }
</style>
<style>
  .content .el-checkbox__label {
    color: white;
  }
</style>
