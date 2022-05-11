<template>
  <div class="login-container">
    <div class="box">
        <div class="login">
            <div class="left">
                <img src="~@/assets/images/slogan.png" alt="">
            </div>
            <div class="right">
                <div class="title">欢迎登录</div>
                <el-form :model="ruleForm" :rules="loginRules" ref="ruleForm">
                <el-form-item prop="username">
                  <el-input prefix-icon="el-icon-user" v-model="ruleForm.username" style="240px;padding:0 20px"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" style="240px;padding:0 20px"></el-input>
                </el-form-item>
                </el-form>
                  <el-button type="primary" style="width:240px" @click="handleLogin">登录</el-button>
                  <div class="register">还没有账号，去注册</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { loginApi } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    // 自定义校验函数 "TODO:"
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      ruleForm: {
        username: 'laotang',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message:'用户名不能为空' },
          { trigger:'blur', min: 2, max: 15, message:'用户名需要2~15个字符' }
          ],
        password: [
          { required: true, trigger: 'blur', message:'密码不能为空' },
          { trigger:'blur', min: 6, max: 15, message:'密码需要6~15个字符' }
          ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    handleLogin() {
      this.$refs.ruleForm.validate(async valid => {
        console.log(91,valid);
        if (valid) {
          try {
            // 验证完成后的操作
            this.loading = true
            await this.$store.dispatch('user/userLogin', this.ruleForm)
            this.$message.success('登录成功，正在跳转...')
            this.$router.push('/')
            console.log(98,this.$store.state.token);
          } catch (error) {
            console.log(99,error);
            this.$message.error('用户名或密码错误')
            this.loading = false
          }
        } else {
          this.$message.error('请填写用户密码')
          return false
        }
      })
    }

  //  async handleLogin() {
    //  await this.$refs.ruleForm.validate()
    //  const res = await loginApi(this.ruleForm)
    //  await this.$store.dispatch('user/userLogin',this.ruleForm)
     
      //  await this.$store.dispatch('user/SET_TOKEN',res.token)
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
$iptColor:#283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $iptColor;
      height: 47px;
      caret-color: $bg; // 输入框鼠标光标的颜色

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2b2e3e;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .box {
  background-color: #2b2e3e;
  height: 100%;
  color: #fff;
  // position: relative;
  .login {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    width: 750px;
    margin: 150px auto;
    // position: absolute;
    // top: 40%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    .left {
    }
    .right {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        .title {
            color: #2b2e3e;
            padding-bottom: 20px;
            font-size: 20px;
            padding-left: 15px;
        }
        .register {
            color: #1071fd;
            margin-top: 10px;
            text-decoration: underline;
            padding-left: 15px;
            cursor: pointer;
        }
    }
  }
}
}
</style>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  background-color: #fff;
}

input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}
//设置成你需要的颜色
input {
    -webkit-text-fill-color: red;  
}

</style>
