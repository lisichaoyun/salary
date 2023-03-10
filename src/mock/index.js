import Mock from 'mockjs'
// 接口地址

Mock.mock('/exist_username','post',(options) => {
  let {username}=JSON.parse(options.body)
  let data=['lisichaoyun']
  if(data.includes(username)){
    return {code:200,message:'账户存在！'}
  }else{
    return {code:403,message:'账户不存在！'}
  }
})

Mock.mock('/get_departments','get',(options) => {
  return {code:200,message:[
    {id:1,name:'开发部'},
    {id:2,name:'研发部'},
    {id:3,name:'运营部'},
  ]}
})

Mock.mock('/get_positions','get',(options) => {
  return {code:200,message:[
    {id:1,name:'前端工程师'},
    {id:2,name:'后端工程师'},
    {id:3,name:'系统架构师'},
    {id:4,name:'算法分析师'},
  ]}
})

Mock.mock('/get_roles','get',(options) => {
  return {code:200,message:[
    {id:1,name:'普通用户'},
    {id:2,name:'人事专员'},
    {id:3,name:'财务专员'},
    {id:4,name:'系统管理员'},
  ]}
})


Mock.mock('/updateUniversal','patch',(options) => {
  let body=JSON.parse(options.body)
  return {code:200,message:'更新成功',body:body}
})

Mock.mock(/\/inquireUniversal/,'get',(options) => {
  const ItemsNum = getQuery(options.url,'ItemsNum')
  const offset = getQuery(options.url,'offset')
  const type = getQuery(options.url,'type')
  const success={code:200,query:{ItemsNum:ItemsNum,offset:offset,type:type}}
  if(type==='income'){
    success.message=[{id:1,name:'个人所得税一级',tax:10,threshold:5000}]
    return success
  }else if(type==='assure'){
    success.message=[{id:1,name:'医疗保险',public:10,private:5}]
    return success
  }
})

Mock.mock(/\/get_salary_data/,'get',(options) => {
  const ItemsNum = getQuery(options.url,'ItemsNum')
  const offset = getQuery(options.url,'offset')
  const type = getQuery(options.url,'type')

  return [{base:5000,name:'李斯超云',sex:'男',date:'2023-03-09',income:500,'全勤奖':500,'提成':600,'迟到':0,'犯错':0,'医保':500,'公积金':500}]
})

Mock.mock(/\/getTemplateUniversal/,'get',(options) => {
  const type = getQuery(options.url,'type')
  if(type==='bonus'){
    return [
      {name:'全勤奖'},
      {name:'提成'},
    ]
  }else if(type==='deduct'){
    return [
      {name:'迟到'},
      {name:'犯错'},
    ]
  }else if(type==='assure'){
    return [
      {name:'医保'},
      {name:'公积金'},
    ]
  }
})

Mock.mock('/login','post',(options) => {
  let {username,password}=JSON.parse(options.body)
  if(password==='lisichaoyun0726'){
    return {code:200,message:'登录成功！',token:'sys',role:'staff'}
  }else{
    return {code:403,message:'密码错误'}
  }
})

Mock.mock('/register','post',(options) => {
  let body=JSON.parse(options.body)
  body.staff.entertime=body.staff.entertime.substring(0,19).replace('T',' ')
  body.staff.birthday=body.staff.birthday.substring(0,10)
  return {code:200,message:body}
})


Mock.setup({timeout:100})

const getQuery = (url,name)=>{
  const index = url.indexOf('?')
  if(index !== -1) {
    const queryStrArr = url.substr(index+1).split('&')
    for(var i=0;i<queryStrArr.length;i++) {
      const itemArr = queryStrArr[i].split('=')
      if(itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}