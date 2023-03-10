<template>
  <div>
    <el-card shadow="hover" style="margin-top: 12px" v-for="card in cards" :key="card.id">
      <h5>{{ card.title }}</h5>
      <span>{{ `${card.pub_text}:` }}</span>
      <el-input-number v-model="card.pub_value" size="mini" controls-position="right" :min="0"></el-input-number
      >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-waiqinchucha"></use>
      </svg>
      <span>{{ `${card.pri_text}:` }}</span
      ><el-input-number v-model="card.pri_value" size="mini" controls-position="right" :min="0"></el-input-number>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-geren"></use>
      </svg>
      <div style="margin-top: 16px">
        <el-button type="primary" @click="update(card.id)">更新</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'assure',
  data() {
    return {
        cards: [],
    }
  },
  methods: {
    getData() {
      this.axios
        .get('/inquireUniversal?type=assure&offset=0&ItemsNum=9999')
        .then(response => {
          this.cards = response.data.message.map(v => {
            return {
              title: v.name,
              pub_text: '公司缴纳比例',
              pri_text: '个人缴纳比例',
              pub_value: v.public,
              pri_value: v.private,
              id: v.id,
            }
          })
          console.log(response.data.query)
        })
        .catch(e => {
          throw e
        })
    },
    update(id) {
      let data = this.cards.filter(v => v.id === id)[0]
      let arr = []
      Object.keys(data).forEach(v => {
        if (v === 'pub_value') {
          arr.push({ name: 'public', value: data[v] })
        } else if (v === 'pri_value') {
          arr.push({ name: 'private', value: data[v] })
        }
      })
      this.axios
        .patch('/updateUniversal', {
          changeArr: arr,
          type: '',
          id: id,
        })
        .then(response => {
          this.$notify({
            title: '成功',
            message: response.data.message,
            type: 'success',
          })
          console.log(response.data.body)
        })
        .catch(e => {
          throw e
        })
    },
  },
  mounted(){
    this.getData()
  }
}
</script>
<style scoped>
.icon{
    font-size: 24px;
}
</style>
