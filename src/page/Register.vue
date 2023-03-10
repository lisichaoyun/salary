<template>
  <div class="register">
    <el-row>
      <el-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 12, offset: 6 }">
        <el-steps :active="active" finish-status="success">
          <el-step title="设置账户密码"></el-step>
          <el-step title="填写入职信息"></el-step>
          <el-step title="选择对应角色"></el-step>
        </el-steps>
      </el-col>

      <el-col v-show="step.account" :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 4, offset: 10 }">
        <el-form :model="account" status-icon ref="account_ruleForm" :rules="account_rules" style="margin-top: 50%">
          <label style="-webkit-text-stroke: 1px greenyellow"> 请填写您要注册的账户信息 </label>

          <el-form-item prop="username" size="small" style="margin-top: 5vh">
            <el-input v-model="account.username" autocomplete="on" placeholder="用户名" class="register-form-input"></el-input>
          </el-form-item>

          <el-form-item prop="password" size="small">
            <el-input type="password" v-model="account.password" placeholder="密码" class="register-form-input"></el-input>
          </el-form-item>

          <el-form-item prop="confirm_password" size="small">
            <el-input type="password" v-model="account.confirm_password" placeholder="确认密码" class="register-form-input"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="plain" @click="submitForm()" style="width: 100%; color: #58bb92; font-weight: bold"> 下一步 </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-show="step.staff" :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 4, offset: 10 }">
        <el-form :model="staff" status-icon ref="staff_ruleForm" :rules="staff_rules" style="margin-top: 50%">
          <label style="-webkit-text-stroke: 1px greenyellow"> 请补充您的入职职工基本信息 </label>

          <el-form-item prop="name" size="small" style="margin-top: 5vh">
            <el-input v-model="staff.name" placeholder="姓名" class="register-form-input"></el-input>
          </el-form-item>

          <el-form-item prop="departmentid" size="small" style="margin-top: 5vh">
            <el-select v-model="staff.departmentid" placeholder="请选择部门">
              <el-option v-for="item in departments" :key="`department-${item.id}`" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="positionid" size="small" style="margin-top: 5vh">
            <el-select v-model="staff.positionid" placeholder="请选择职位">
              <el-option v-for="item in positions" :key="`position-${item.id}`" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="sex" size="small" style="margin-top: 5vh">
            <el-select v-model="staff.sex" placeholder="请选择性别">
              <el-option label="先生" value="0"></el-option>
              <el-option label="女士" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="phone" size="small" style="margin-top: 5vh">
            <el-input v-model="staff.phone" placeholder="手机号" class="register-form-input"></el-input>
          </el-form-item>

          <el-form-item prop="birthday" size="small" style="margin-top: 5vh">
            <el-date-picker v-model="staff.birthday" type="date" placeholder="出生日期"></el-date-picker>
          </el-form-item>

          <el-form-item prop="academic" size="small" style="margin-top: 5vh">
            <el-select v-model="staff.academic" placeholder="请选择学历">
              <el-option label="博士" value="博士"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="高中/中专" value="高中/中专"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="小学" value="小学"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="entertime" size="small" style="margin-top: 5vh">
            <el-date-picker v-model="staff.entertime" type="datetime" placeholder="入职时间"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="plain" @click="submitForm()" style="width: 100%; color: #58bb92; font-weight: bold"> 下一步 </el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-show="step.role" :xs="{ span: 24, offset: 0 }" :sm="{ span: 16, offset: 4 }" :md="{ span: 4, offset: 10 }">
        <el-form :model="accout_sys" status-icon ref="accout_sys_ruleForm" :rules="accout_sys_rules" style="margin-top: 50%">
          <label style="-webkit-text-stroke: 1px greenyellow"> 请补充系统信息 </label>
          <el-form-item prop="roleid" size="small" style="margin-top: 5vh">
            <el-select v-model="accout_sys.roleid" placeholder="请选择您在本系统中的角色">
              <el-option v-for="item in roles" :key="`role-${item.id}`" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="plain" @click="submitForm()" style="width: 100%; color: #58bb92; font-weight: bold"> 提交注册信息 </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { isPoneAvailable } from '../until/phone'
import {isAllChinese} from '../until/isChinese'
export default {
  name: 'register',
  data() {
    let compared_password = (rule, value, callback) => {
      if (value === this.$data.account.password) {
        callback()
      } else {
        callback(new Error('两次密码不一致！'))
      }
    }
    let chinese = (rule, value, callback) => {
      if (isAllChinese(value)) {
        callback()
      } else {
        callback(new Error('必须为中文字符'))
      }
    }
    let phone = (rule, value, callback) => {
      if (isPoneAvailable(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码！'))
      }
    }
    return {
      active: 0,
      account: {
        password: '',
        username: '',
        confirm_password: '',
      },
      departments: [],
      positions: [],
      roles: [],
      staff: {
        //id数据库自定
        name: '',
        departmentid: '',
        positionid: '',
        sex: '',
        phone: '',
        birthday: '',
        academic: '',
        entertime: '',
      },
      accout_sys: {
        roleid: '', //角色id
      },
      account_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 12, max: 26, message: '长度在 12 到 26 个字符', trigger: 'change' },
        ],
        confirm_password: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: compared_password, trigger: 'change' },
        ],
      },
      staff_rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '名字2-10字符', trigger: 'change' },
          { validator: chinese, trigger: 'change' },
        ],
        departmentid: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        positionid: [{ required: true, message: '请选择职位', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 20, message: '手机号码为11至20位', trigger: 'blur' },
          { validator: phone, trigger: 'change' },
        ],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
        academic: [{ required: true, message: '请选择您的学历', trigger: 'blur' }],
        entertime: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
      },
      accout_sys_rules: {
        roleid: [{ required: true, message: '选择您要选择账户种类', trigger: 'blur' }],
      },
    }
  },
  computed: {
    step() {
      let obj = { account: false, staff: false, role: false }
      function clear() {
        obj.account = false
        obj.staff = false
        obj.role = false
      }
      if (this.active === 0) {
        clear()
        obj.account = true
        return obj
      } else if (this.active === 1) {
        clear()
        obj.staff = true
        return obj
      } else if (this.active === 2) {
        clear()
        obj.role = true
        return obj
      } else {
        throw new Error('计算属性step步骤索引错误')
      }
    },
  },
  methods: {
    submitForm() {
      if (this.active === 0) {
        this.$refs['account_ruleForm'].validate(valid => {
          if (valid) {
            this.active = 1
          } else {
            return false
          }
        })
      } else if (this.active === 1) {
        this.$refs['staff_ruleForm'].validate(valid => {
          if (valid) {
            this.active = 2
          } else {
            return false
          }
        })
      } else if (this.active === 2) {
        this.$refs['accout_sys_ruleForm'].validate(valid => {
          if (valid) {
            this.register()
          } else {
            return false
          }
        })
      } else {
        throw new Error('提交时步骤索引错误')
      }
    },
    register() {
      this.axios
        .post('/register', { account: this.account, staff: this.staff, accout_sys: this.accout_sys })
        .then(response => {
          if (response.data.code === 200) {
            console.log(response.data.message)
          } else {
            throw new Error(response.data.message)
          }
        })
        .catch(e => {
          throw e
        })
    },
    get_departments() {
      this.axios
        .get('/get_departments')
        .then(response => {
          if (response.data.code === 200) {
            this.departments = response.data.message
          } else {
            throw new Error(response.data.message)
          }
        })
        .catch(e => {
          throw e
        })
    },
    get_positions() {
      this.axios
        .get('/get_positions')
        .then(response => {
          if (response.data.code === 200) {
            this.positions = response.data.message
          } else {
            throw new Error(response.data.message)
          }
        })
        .catch(e => {
          throw e
        })
    },
    get_roles() {
      this.axios
        .get('/get_roles')
        .then(response => {
          if (response.data.code === 200) {
            this.roles = response.data.message
          } else {
            throw new Error(response.data.message)
          }
        })
        .catch(e => {
          throw e
        })
    },
  },
  mounted() {
    this.get_departments()
    this.get_positions()
    this.get_roles()
  },
}
</script>
<style scoped>
.register {
  background-color: white;
  height: 100%;
}
.register-form-input >>> .el-input__inner {
  background-color: rgba(221, 218, 215, 0.4);
  border: none;
  color: rgb(7, 225, 47);
}
.register-form-input >>> .el-input__inner::placeholder {
  color: rgb(127, 128, 127);
}
</style>
