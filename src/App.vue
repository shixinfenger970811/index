<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2020-03-17 16:20:55
 * @LastEditors: Seven
 * @LastEditTime: 2020-03-24 13:52:37
 -->
<template>
  <div>
    <!-- <Monitor></Monitor> -->
    <router-view></router-view>
  </div>
</template>
<script>
//import Monitor from "./components/Monitor"
//import api from "./axios/api.js"
export default {
  name:"app",
  data(){
    return{
      dataShow:[]
    };
  },
  created(){
    // this.getdata();
  },
  methods:{
    // getdata(){
    //   api.mockdata("/data/index").then(res =>{
    //     console.log(res);
    //     this.dataShow =res.data;
    //   });
    // }
  },
// components: {
// Monitor
// }
}
</script>

<style lang="scss">
body{
    background:#E4E7ED;
}
</style>