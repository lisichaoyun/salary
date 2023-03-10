<template>
  <div>
    <el-card shadow="hover" v-for="card in cards" :key="card.id">
      <h4>{{ card.name }}</h4>
      <p class="illustrate">{{ `超过${card.threshold}元的税率${card.tax}%,可自行调整` }}</p>
      <el-input-number size="mini" :min="0" v-model="card.tax" @change="update(card.id)"> </el-input-number>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tax',
  data() {
    return {
      cards: [],
    }
  },
  methods: {
    update(id) {
      let data = this.cards.filter(v => v.id === id)[0]
      let arr = [{ name: 'tax', value: data.tax }]
      this.axios.patch('/updateUniversal', {
          changeArr: arr,
          type: '',
          id: id,
        }).then(response => {
          if(response.data.code===200){
            this.$notify({
            title: '成功',
            message: response.data.message,
            type: 'success',
          })
          console.log(response.data.body)
          }else{
            this.$notify({
            title: '失败',
            message: response.data.message,
            type: 'error',
          })
          }
        }).catch(e => {
          throw e
        })
    },
    getdata() {
      this.axios.get('/inquireUniversal?type=income&offset=0&ItemsNum=9999')
      .then(response => {
        this.cards = response.data.message
      })
      .catch(e => {
        throw e
      })
    },
  },
  mounted() {
    this.getdata()
  },
}
</script>

<style scoped></style>
