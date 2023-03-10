<template>
    <div class="cover">
      <el-row>
        <el-col
          :xs="{ span: 8, offset: 8 }"
          :sm="{ span: 8, offset: 8 }"
          :md="{ span: 4, offset: 10 }"
        >
          <el-form
            :model="ruleForm"
            status-icon
            ref="ruleForm"
            class="ruleForm"
            :rules="rules"
            style="margin-top: 50%"
          >
            <label for="username" style="-webkit-text-stroke: 1px greenyellow">
              登录
            </label>
  
            <el-form-item prop="username" size="small" style="margin-top: 5vh">
              <el-input
                v-model="ruleForm.username"
                autocomplete="on"
                placeholder="用户名"
                id="username"
                class="login-form-input"
              ></el-input>
            </el-form-item>
  
            <el-form-item prop="password" size="small">
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="密码"
                class="login-form-input"
              ></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button
                type="plain"
                @click="submitForm()"
                style="width: 100%; color: #58bb92; font-weight: bold"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
          <router-link to="/register" style="color: darkblue;font-family: 华文琥珀">普通用户注册</router-link>
        </el-col>
      </el-row>
      <div class="video-box" id="can"></div>
    </div>
  </template>
  
<script>
import { Loading } from 'element-ui'
import video_bg from 'vidbg.js'
export default {
    mounted() {
      new video_bg(
          ".video-box",
          {
            mp4: "video/video.mp4", // url或相对地址
            webm: "video/video.webm", // url或相对地址
            poster: "video/poster.jpg", // url或相对地址
            overlay: true,
            overlayColor: "#000",
            overlayAlpha: 0.1,
          },
          {
            autoplay: true,
            controls: false,
            loop: true,
            muted: true,
            playsInline: true,
          }
      )
      let canvas=document.getElementById('can').style
      canvas.position='absolute'
      canvas.zIndex='-2'
      canvas.top='0'
      canvas.left='0'
      canvas.width='100%'
      canvas.height='100%'
    },
    name: 'login',
    data() {
      let username_exist = (rule, value, callback) => {
        this.axios.post('/exist_username',{username:value}).then(response=>{
          if(response.data.code===200){
            callback()
          }else{
            callback(new Error(response.data.message))
          }
        }).catch(e=>{
          callback(e)
        })
      };
      return {
        ruleForm: {
          password: '',
          username: '',
        },
        rules:{
          username:[
            {required: true, message: '请输入用户名', trigger: 'change'},
            { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'change' },
            {validator:username_exist,trigger:'blur'}
          ],
          password:[
          {required: true, message: '请输入密码', trigger: 'change'},
          { min: 12, max: 26, message: '长度在 12 到 26 个字符', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            return false;
          }
        });
      },
      login(){
        let login_loading=Loading.service({fullscreen:true,text:'登录中......'})
        this.axios.post('/login',{username:this.ruleForm.username,password:this.ruleForm.password}).then(response=>{
          if(response.data.code===200){
            this.$message({type:'success',message:response.data.message,showClose:true,center:true})
            window.localStorage.setItem('token',response.data.token)
            window.localStorage.setItem('role',response.data.role)
            this.$router.push({name:'home'})
          }else{
            this.$message({type:'error',message:response.data.message,showClose:true,center:true})
          }
        }).catch(e=>{
          throw e
        }).finally(()=>{
          login_loading.close()
        })
      }
    },
  }
  </script>
  
<style scoped>
  @import url("../assets/css/vidbg.css");/*这里打包压缩成功*/
  .video-box .vidbg-container {
    background-image: url('../../public/video/poster.jpg');
  }
  .login-form-input >>> .el-input__inner {
    background-color: rgba(221, 218, 215, 0.4);
    border: none;
    color: whitesmoke;
  }
  .login-form-input >>> .el-input__inner::placeholder{
    color: whitesmoke;
  }
</style>  