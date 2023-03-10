<template>
  <div class="home">
    <el-row>
      <el-col :xs="{ span: 8, offset: 8 }" :sm="{ span: 8, offset: 8 }" :md="{ span: 4, offset: 0 }" :lg="{}" :xl="{}">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          active-text-color=""
          text-color=""
          background-color=""
          default-active="tax"
          class="el-menu-vertical-demo"
          @select="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu v-if="roles.finance" index="finance">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">财务专员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="tax">税率</el-menu-item>
              <el-menu-item index="assure">社保</el-menu-item>
              <el-menu-item index="salary">工资</el-menu-item>
              <el-menu-item index="attendanceRules">考勤规则</el-menu-item>
              <el-menu-item index="objection">员工意见</el-menu-item>
              <el-menu-item index="assureDetailsPublic">社保公司缴纳细节</el-menu-item>
              <el-menu-item index="chargebackContent">设定扣款项目</el-menu-item>
              <el-menu-item index="bonusContent">设定奖金项目</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu v-else-if="roles.staff" index="staff">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">人事专员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="registrationApplication">注册申请</el-menu-item>
              <el-menu-item index="contract">劳动合同</el-menu-item>
              <el-menu-item index="recruitment">记录招聘需求</el-menu-item>
              <el-menu-item index="staff">员工基本信息</el-menu-item>
              <el-menu-item index="leave">所有请假申请</el-menu-item>
              <el-menu-item index="attendance">考勤详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu v-else-if="roles.system" index="system">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">系统管理员</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="user">用户管理</el-menu-item>
              <el-menu-item index="department">部门管理</el-menu-item>
              <el-menu-item index="position">职位管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :xs="{ span: 8, offset: 8 }" :sm="{ span: 8, offset: 8 }" :md="{ span: 20, offset: 0 }" :lg="{}" :xl="{}">
        <keep-alive>
          <component :is="currentTabComponent"></component>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    'finance-tax': () => import('../components/Tax.vue'),
    'finance-assure': () => import('../components/Assure.vue'),
    'finance-salary': () => import('../components/Salary.vue'),
    'finance-attendanceRules': () => import('../components/AttendanceRules.vue'),
    'finance-objection': () => import('../components/Objection.vue'),
    'finance-assureDetailsPublic': () => import('../components/AssureDetailsPublic.vue'),
    'finance-chargebackContent': () => import('../components/ChargebackContent.vue'),
    'finance-bonusContent': () => import('../components/BonusContent.vue'),
    'staff-registrationApplication': () => import('../components/RegistrationApplication.vue'),
    'staff-contract': () => import('../components/Contract.vue'),
    'staff-recruitment': () => import('../components/Recruitment.vue'),
    'staff-staff': () => import('../components/Staff.vue'),
    'staff-leave': () => import('../components/Leave.vue'),
    'staff-attendance': () => import('../components/Attendance.vue'),
    'system-user': () => import('../components/User.vue'),
    'system-department': () => import('../components/Department.vue'),
    'system-position': () => import('../components/Position.vue'),
    'system-role': () => import('../components/Role.vue'),
  },
  data() {
    return {
      isCollapse: true,
      currentTabComponent:'finance-tax'
    }
  },
  computed:{
    roles(){
      let obj={
        finance:false,
        staff:false,
        system:false
      }
      function clear(){
        obj.finance=false
        obj.staff=false
        obj.system=false
      }
      let role=window.localStorage.getItem('role')
      if(role==='finance'){
        clear()
        obj.finance=true
        return obj
      }else if(role==='staff'){
        clear()
        obj.staff=true
        return obj
      }else if(role==='system'){
        clear()
        obj.system=true
        return obj
      }else if(role==='all'){
        obj.system=true
        obj.finance=true
        obj.staff=true
        return obj
      }else{
        throw new Error('Home页面角色解析错误！')
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.currentTabComponent=keyPath[0]+'-'+keyPath[1]
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
