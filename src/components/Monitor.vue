<template>
<div class="monitor">
    <!-- 头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="head">
    <el-breadcrumb-item :to="{ path: '/' }">监控资源</el-breadcrumb-item>
     <el-breadcrumb-item>4g新装详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 导航条 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="content">
    <el-tab-pane label="指标看板" name="first"></el-tab-pane>
    <el-tab-pane label="高警信息" name="second"></el-tab-pane>
    <el-tab-pane label="监控列表" name="third"></el-tab-pane>
    <el-tab-pane label="告警接收规则" name="fourth"></el-tab-pane>
      <el-button class="btn" type="primary" @click="dialogFormVisible = true">新增监控</el-button>
      <i class="el-icon-s-tools"></i>
    <!-- 弹窗 -->
      <el-dialog title="新增监控" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="监控指标" :label-width="formLabelWidth">
      <el-input v-model="form.monitorIndex" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="监控方法" :label-width="formLabelWidth">
      <el-input v-model="form.monitorFun" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="监控时段" :label-width="formLabelWidth">
      <el-input v-model="form.MonitorPer" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="修改人" :label-width="formLabelWidth">
      <el-input v-model="form.modifier" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" :label-width="formLabelWidth">
      <el-input v-model="form.modifyTime" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addtabledata()" v-if="dialogFormVisible">确 定</el-button>
  </div>
</el-dialog>
      <!-- 分页 -->
      <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </div>
  <!-- 表格内容 -->
  <el-table class="table"
    :data="tabledata"
    :span-method="objectSpanMethod"
    row-key="id"
    height="390"
    style="width: 98%"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="monitorIndex"
      label="监控指标"
      style="width: 20%">
    </el-table-column>
    <el-table-column
      prop="monitorFun"
      label="监控方法"
      style="width: 20%">
    <template slot-scope="">
       <span class="iconfont icon-zhuyi-yin"></span>
       <span>周期不确定性预测</span>
    </template>
    </el-table-column>
    <el-table-column
      prop="MonitorPer"
      label="监控时段"
     style="width: 15%">
    </el-table-column>
    <el-table-column
      prop="modifier"
      label="修改人"
     style="width: 8%">
    </el-table-column>
    <el-table-column
      prop="modifyTime"
      label="修改时间"
      style="width: 15%">
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      style="width: 20%">
      <template slot-scope="scope">
        <el-button @click="modifytabledata(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="deletetabledata(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small">查看告警接收人</el-button>
      </template>
    </el-table-column>
   </el-table>
  </el-tabs>
  </div>
</template>
<script>

export default {
  data() {
      return {
        activeName: 'third',
        currentPage: 1,
        tabledata:[],
        dialogFormVisible: false,
        form: {
          //id:'',
          monitorIndex: '',
          monitorFun: '',
          MonitorPer: '',
          modifier: '',
          modifyTime: '',
        },
        formLabelWidth: '150px'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    //     modifytabledata(row) {
    //     console.log(row);
    //   },
    //   deletetabledata(scope,row){
    //       this.tableData.splice(scope,row);
    //   },
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            // {
            //   id: 21,
            //   monitorIndex: '/opt root',
            //   jkfangfa: '周期不确定性预测',
            //   MonitorPer: '全天',
            //   modifier:'张三',
            //   modifyTime:'2019-6-20 09:00:00',
            // }, {
            //   id: 22,
            //   monitorIndex: '/tmp root',
            //   jkfangfa: '周期不确定性预测',
            //   MonitorPer: '全天',
            //   modifier:'张三',
            //   modifyTime:'2019-6-20 09:00:00',
            // }
          ])
        }, 1000)
      },
      objectSpanMethod({rowIndex, columnIndex }) {
        if (columnIndex === 0 && rowIndex >= 4) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      //添加表格数据
      addtabledata(){
          //判断是否填选
          if(!this.form.monitorIndex || !this.form.monitorFun || !this.form.MonitorPer || !this.form.modifier || !this.form.modifyTime) {
            this.$message({
             message: '请将信息补全！',
            type: 'warning'
            });
             return;
          }
             this.tableData.push({
              monitorIndex:this.form.monitorIndex,
              monitorFun:this.form.monitorFun,
              MonitorPer:this.form.MonitorPer,
              modifier:this.form.modifier,
              modifyTime:this.form.modifyTime
          });
          this.form = {}; //清空
          this.dialogFormVisible=false;
      },
      //请求table数据
      gettabledata(){
        this.$http.get('http://localhost:8081/mockmonitor').then(res => {
          console.log(res)
          if (res.data) {
            this.tabledata = res.data.data
          }
        })
      }
    },
    mounted(){
      this.gettabledata();
    }
}
</script>
j  
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.head{
padding:10px;
}
.content{
  background: white;
  border: 2px solid #E4E7ED;
  height: 850px;
  margin-left:2px;
  .el-dialog{
      .el-dialog__title{
          font-size:25px;
          font-weight:500;
      }
      .el-form-item__label{
          width:15% !important;
          font-size: 20px;
          font-weight:500;
      }
      .el-input__inner{
          width: 85%;
          height: 45px;
          font-size: 18px;
  }
  .dialog-footer{
      height: 100px;
    .el-button{
          width:15%;
          height: 50%;
          margin-right: 20%;
          font-size: 16px;
      }
  }
  }
  .el-tabs__nav-scroll {
    padding-left: 30px;
  }
 .el-tabs__item {
    font-size: 18px;
    color: black;
  }
  .btn{
    margin-left: 20px;
    margin-right:15px;
    padding:8px 18px;
  }
  .el-icon-s-tools {
    color:#E4E7ED;
  }
  .block{
    display: inline-block;
    padding-left: 55%;
  }
  .table{
      .gutter{
          width: 0px !important;
      }
    ::-webkit-scrollbar {
        margin-left: 0px;
        width: 10px;
     background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: lightgray;
}
    margin:15px 20px;
    .iconfont{
      color:orange;
      font-size:20px;
      margin-right: 10px;
    }
    .el-table{
      text-align: center;
    }
  }
}
</style>
