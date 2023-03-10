<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
      </el-table-column>
      <el-table-column label="姓名" width="90">
        <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>性别: {{ scope.row.sex }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
      </el-table-column>
      <el-table-column label="工资">
        <el-table-column prop="base" label="基本工资"> </el-table-column>
        <el-table-column label="奖金">
          <el-table-column v-for="(item,index) in bonus" :key="`bonus${index}`" :prop="item.name" :label="item.name"></el-table-column>

        </el-table-column>
        <el-table-column label="扣款">
          <el-table-column prop="income" label="个税"></el-table-column>
          <el-table-column label="社保">
            <el-table-column v-for="(item,index) in assure" :key="`assure${index}`" :prop="item.name" :label="item.name"></el-table-column>
            
          </el-table-column>
          <el-table-column v-for="(item,index) in deduct" :key="`deduct${index}`" :prop="item.name" :label="item.name"></el-table-column>

        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'salary',
  data() {
    return {
      tableData: [],
      offset:0,
      ItemsNum:10,
      bonus:[],
      deduct:[],
      assure:[],

    }
  },
  computed:{
    
  },
  methods:{
    get_base_data(){//
      //基本工资，姓名，员工id等一切职工信息
      //日期,获取个税,工资记录一致关联
      //获取数据
      this.axios.get(`/get_salary_data?offset=${this.offset}&ItemsNum=${this.ItemsNum}`).then(reseponse=>{
        
        Promise.all([//获取模板
          this.axios.get('/getTemplateUniversal?type=bonus'),
          this.axios.get('/getTemplateUniversal?type=deduct'),
          this.axios.get('/getTemplateUniversal?type=assure')
        ]).then(AllReponse=>{
          this.bonus=AllReponse[0].data
          this.deduct=AllReponse[1].data
          this.assure=AllReponse[2].data
          this.tableData=reseponse.data
        }).catch(e=>{
          throw e
        })
      })
    },
  },
  mounted(){
    this.get_base_data()
  }
}
</script>
<style scoped></style>
