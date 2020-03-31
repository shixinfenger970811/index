<template>
    <div class="echartstable">
        <!-- 头部 -->
        <div class="header">
         <span class="fold">
             <i class="el-icon-s-fold"></i>
             <span>故障处理视图</span>
         </span>
         <span class="dates">
         <span>
             <i class="el-icon-date"></i>
             <span>数据时间:17/10/2019 ~ 31/10/2019</span>
         </span>
         </span>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="近15天" name="first"></el-tab-pane>
            <el-tab-pane label="近30天" name="second"></el-tab-pane>
            <el-tab-pane label="近90天" name="third"></el-tab-pane>
            <el-tab-pane label="自定义" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
        <!-- 表格内容 -->
        <div class="content">
          <div class="content-left">
            <div class="left-top">
              <div class="untreated">
                <h1 style="color:red">3</h1>
                <span>未处理完成故障数</span>
              </div>
              <div class="total">
                <h1>3</h1>
                <span>故障总数</span>
              </div>
              <div class="len">
                <h1>32<span>分钟</span></h1>
                <span>故障平均处理时长</span>
              </div>
            </div>
            <div class="left-middle">
              <h2 class="trendtitle">故障趋势图</h2>
              <div id="trend" class="trend" style="width:95%; height:60%"></div>
            </div>
            <div class="left-bottom">
              <div class="rescake">
              <div id="rescake" style="width:95%; height:80%"></div>
              </div>
              <div class="vline"></div>
              <div class="rescol">
              <div id="iaas" class="iaas" style="width:85%; height:33%"></div>
              <div id="paas" class="paas" style="width:85%; height:33%"></div>
              <div id="saas" class="saas" style="width:85%; height:33%"></div>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="right-top">
              <div id="num" class="num" style="width:95%; height:80%"></div>
            </div>
            <div class="right-bottom">
              <h3 class="lbtitle">故障影响的资源TOP 5</h3>
                <el-table
                :data="tableData"
                style="width: 98%">
                <el-table-column
                 prop="index"
                 label=""
                 width="30">
               </el-table-column>
               <el-table-column
                 prop="Resourcename"
                 label="资源名称"
                 width="480">
               </el-table-column>
               <el-table-column
                 prop="Influencetimes"
                 label="影响次数"
                width="100">
               </el-table-column>
             </el-table>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
/**
 * 堆积柱状图
 * @param grid 图的位置和大小
 * @param xAxis x轴的相关设置
 * @param YAxis y轴相关
 * @param axisLine 线的设置
 * @param axisLine 提示框设置
 * @param splitLine 格子线
 * @param axisLabel 坐标轴设置
 * ...
 */
import echarts from "echarts";
export default {
     data() {
      return {
        activeName: 'first',
        tableData: [{
            index:1,
            Resourcename: '【服务】服开轮询接收接口',
            Influencetimes: '10',
          },{
            index:2,
            Resourcename: '【KEEPER集群】',
            Influencetimes: '7',
          },{
            index:3,
            Resourcename: '【MYSQL集群】',
            Influencetimes: '5',
          },{
            index:4,
            Resourcename: '【主机】',
            Influencetimes: '2',
          },{
            index:5,
            Resourcename: '【主机】',
            Influencetimes: '1',
          }, ]
      };
    },
    methods: {
      handleClick(tab, event) { 
        console.log(tab, event);
      },
      //趋势曲线图
      drawtrendChart(){
        //初始化echarts对象
        var mytrendChart = this. $echarts.init(document.getElementById("trend"));
        //指定图标的配置项和数据
        var option = {
          backgroundColor: "white",
          //  title:{
          //  text:'故障趋势图',
          // },
          tooltip: {
		      },
		      grid: {
		      	top: '5%',
		      	left: '0.5%',
		      	right: '1%',
		      	bottom: '5%',
		      	containLabel: true,
		      },
		      xAxis: [{
		      	type: 'category',
		      	boundaryGap: false,
		       	axisLine: { //x轴的线设置
		      		 show: true,
		      		 lineStyle: {
					      color: '#BBBBBB'
				       },
            },
            splitLine: { //x轴中间的格子竖线
             show: true,
             lineStyle:{
               color:['#E4E7ED'],
               type:'dashed',
             }
		      },
			    axisLabel: { //X坐标轴刻度标签的相关设置
				    textStyle: {
					  fontSize: 15,
            color: '#BBBBBB',
					  margin:15,
				    },
			    },
			    axisTick: { show: false,},
		    	data: ['17/10', '18/10', '19/10', '20/10', '21/10', '22/10', '23/10','24/10','25/10','26/10','27/10','28/10','29/10','30/10','31/10'],
	    	  }],
          
          yAxis: [{ //y轴的数据相关设置
	    		type: 'value',
	    		min: 0,
	    		max:10,
	    		splitNumber: 2,
	    		splitLine: {
             show: true,
             lineStyle:{
               color:['#E4E7ED'],
               type:'dashed',
             }
		      },
          axisLine: { //y轴的线设置
            show: true,
            lineStyle: {
					      color: '#BBBBBB'
				       },
            },
		      axisLabel: { //y轴的数据格式设置
		     	margin:5,
		    	 textStyle: {
             fontSize: 15,
             color: '#BBBBBB',
		    	 },
			   },
			   axisTick: { show: false,},  
	  	   }],
	    	 series: [{  //曲线相关设置
	    		type: 'line',
	    		smooth: true, //是否平滑曲线显示
     			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
          symbolSize:8,
          color:"#88A5F9",
	    		lineStyle: {//曲线线条的样式
	    			normal: {
              color: "#88A5F9",
              width:3
	    			}
			    },
			    areaStyle: { //区域填充样式
                normal: {
                 //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					       { offset: 0.2,  color: 'rgba(61,234,255, 0.9)'}, 
					       { offset: 1,  color: 'rgba(61,234,255, 0)'}
				       ], false),
                 shadowColor: '#88A5F9', //阴影颜色
                 opacity:0.2,
                 shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
             }
         },
			data: [7, 4, 3, 8, 9, 6, 4, 2, 4, 7, 5, 7, 3, 4, 9]
		}]
       }
       mytrendChart.setOption(option);
      },
      //故障数量柱状图
      drawnumChart(){
        var mynumChart = this.$echarts.init(document.getElementById("num"));
        var option = {
        // 标题
        title: {
            text: '按故障等级统计故障数量',
            left:'left',
            padding:[5,0,30,20],
            textStyle:{
              fontSize:'30px'
            },
        },
        tooltip: {
          show: true,   // 是否显示提示框，默认为true
          trigger: 'item', // 数据项图形触发
          axisPointer: {   // 指示样式
            type: 'shadow',
            axis: 'auto'
          },
          padding: 5,
          textStyle: { // 提示框内容的样式
            color: '#6E90F8'  
          }
        },
         // x轴
        xAxis: {
          data: ["一级故障", "一级故障", "一级故障", "一级故障"],
          axisLine: { //x轴的线设置
          show: true,
          lineStyle: {
					    color: '#BBBBBB'
				     },
          },
          axisLabel: { //y轴的数据格式设置
		       	margin:5,
		    	   textStyle: {
             fontSize: 22,
             color: '#444444',
		    	 },
         },
          axisTick:{ //刻度显示
            show:false,
          }
        },
        yAxis: {
          type: 'value',
	    		min: 0,
	    		max:10,
	    		splitNumber: 2,
	    		splitLine: {
             show: true,
             lineStyle:{
               color:['#E4E7ED'],
             }
          },
          axisLine: { //y轴的线设置
            show: true,
            lineStyle: {
					      color: '#BBBBBB'
				       },
            },
            axisLabel: { //y轴的数据格式设置
		       	margin:5,
		    	   textStyle: {
             fontSize: 20,
             color: '#BBBBBB',
		    	 },
         },
         axisTick:{
            show:false,
          }
        },
          // 数据
          series: [{
            type: 'bar',
            itemStyle: {    // 图形的形状
             color: '#6E90F8',
            },
             barWidth: 45,  // 柱形的宽度
             barCategoryGap: '20%',  // 柱形的间距
             label: {
              show: true, // 开启显示
              position: 'top', // 在上方显示
              distance: 10, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
              verticalAlign: 'middle',
              textStyle: { // 数值样式
                color: '#6E90F8',
                fontSize: 20,
              }
            },
            data: [10,8,3,5],
          }]
    }; 
        mynumChart.setOption(option);
      },
       //资源占比饼状图
      drawcakeChart(){
        var mycakeChart = this.$echarts.init(document.getElementById("rescake"));
        var option = {
            title: {
                text: '各资源类型故障占比',
                left: 'left',
                padding:[20,0,0,30],
                textStyle:{
                  fontSize:'22',
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                icon:"square",
                left:'60%',
                top:'40%',
                data: ['IaaS', 'PaaS', 'SaaS'],
                formatter: function(name) {
              // 获取legend显示内容
              let data = option.series[0].data;
              let total = 0;
              let tarValue = 0;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
              let p = (tarValue / total * 100).toFixed(2);
              return name + ' ' + ' ' + tarValue + ' ' + ' ' + p + '%';
              },
              textStyle:{
                fontSize:20,
              }
            },
            color:['#E8BE90','#FCE69F','#94B3F9'],
            series: [{
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            center: ['30%', '65%'],
            data: [
                {value: 12, name: 'IaaS'},
                {value: 12, name: 'PaaS'},
                {value: 8, name: 'SaaS'},
            ],
            label:{
              show:false,
            },
        }
    ]
   };
        mycakeChart.setOption(option);
      },
      // IaaS PaaS SaaS横向柱状图
      drawcolumnarChart(){
        var myiaasChart = this.$echarts.init(document.getElementById("iaas"));
        var mypaasChart = this.$echarts.init(document.getElementById("paas"));
        var mysaasChart = this.$echarts.init(document.getElementById("saas"));
        myiaasChart.setOption({
          color:'#94B3F9',
          title: {
          text: 'IaaS',
          x:'left',
          padding:[30,0,0,10],
          textStyle:{
            fontSize:20,
            fontWeight:500,
          }
        },
        grid: {
           height:"70%",
           width:'70%',
            containLabel: true
        },
        xAxis: {  //x轴数据设置
          show:false,
        },
        yAxis: { //y轴数据设置
        type:'category',
          axisLine:{
          show:false
          },
          axisTick:{ //刻度显示
            show:false,
          },
          
          axisLabel:{
            textStyle:{
            fontSize:16
          },
          },
            data: ['交换机', '防火墙', '主机']
        },
         series: [{  //数据
            type: 'bar',
            data: [2, 4, 6],
            showBackground: true,
            barCategoryGap:'35%',
            backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)',
            },
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
            }, 
            
        },
        ]
        });
        mypaasChart.setOption({
          color:'#E8BE90',
          title: {
          text: 'PaaS',
          x:'left',
          padding:[30,0,0,25],
          textStyle:{
            fontSize:20,
            fontWeight:500,
          }
        },
        grid: {
           height:"70%",
           width:'75%',
            containLabel: true
        },
        xAxis: {  //x轴数据设置
          show:false,
        },
        yAxis: { //y轴数据设置
        type:'category',
          axisLine:{
          show:false
          },
          axisTick:{ //刻度显示
            show:false,
          },
          
          axisLabel:{
            textStyle:{
            fontSize:16
          },
          },
            data: ['Geteway', 'DBProxy', 'Mysql']
        },
        series: [{  //数据
            type: 'bar',
            data: [2, 4, 6],
            showBackground: true,
            barCategoryGap:'35%',
            backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)',
            },
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
            }, 
            
        },
       ]
        });
        mysaasChart.setOption({
          color:'#FCE69F',
          title: {
          text: 'SaaS',
          x:'left',
          padding:[30,0,0,0],
          textStyle:{
            fontSize:20,
            fontWeight:500,
          }
        },
        grid: {
           height:"70%",
           width:'67%',
            containLabel: true
        },
        xAxis: {  //x轴数据设置
          show:false,
        },
        yAxis: { //y轴数据设置
        type:'category',
          axisLine:{
          show:false
          },
          axisTick:{ //刻度显示
            show:false,
          },
          
          axisLabel:{
            textStyle:{
            fontSize:16
          },
          },
            data: ['服务', '场景', '应用']
        },
        series: [{  //数据
            type: 'bar',
            data: [2, 4, 6],
            showBackground: true,
            barCategoryGap:'35%',
            backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)',
            },
            itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在上方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
            }, 
            
        },
       ]
        });
      },
    },
    mounted(){
      this.drawtrendChart();
      this.drawnumChart();
      this.drawcakeChart();
      this.drawcolumnarChart();
    }
}
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.echartstable{
.header{
      border: 2px solid #C0C4CC;
      background: white;
      margin:0.5% 1% 1% 1%;
      height: 58px;
      width: 98%;
      font-size: 18px;
      font-family: 微软雅黑;
      font-weight:100;
      .fold{
        float: left;
        width: 13%;
        margin-left: 20px;
        display: flex;
        align-items: center;
        i{ 
          font-size: 28px;
          margin: 13px 10px;
        }
      }
      .dates{
           width:18%;
           float: left;
           margin-left:40%;
           display: flex;
           align-items: center;
           margin-top: 5px;
           i{
          font-size: 17px;
          margin:13px 10px;
        }
      }  
      .el-tabs{
          float: left;
          width: 21%;
          margin-left: 5px;
          margin-top: 8px;
      }
  }
.content{
    background:#E4E7ED;
    border: 2px solid #E4E7ED;
    height: 800px;
    margin-left:2px;
    .left-top, .left-middle, .left-bottom, .right-top, .right-bottom {
      border: 1.2px solid #C0C4CC;
      background: white;
    }
    .content-left{
      float: left;
      height: 99%;
      width: 57%;
      margin:0 1% 0 1%;
      .left-top{
        display: flex;
        height:17%;
        margin-bottom:1.8%;
        .untreated, .total, .len{
          text-align:center;
          width: 32%;
          margin: 2% 2% 3% 2%;
          span{
            font-size: 25px;
          }
        }
        .len{
          h1{
            span{
              font-weight:500;
              color:grey;
              font-size: 20px;
              margin-left: 5px;
            }
          }
        }
      }
      .left-middle{
        height: 30%;
        margin-bottom:1.8%;
        .trendtitle{
          font-weight:500;
          font-size: 25px;
          padding-top:2%;
          padding-left:4%;
        }
        .trend{
          margin:3% 7% 10% 3%;
        }
      }
      .left-bottom{
        height: 48%;
        width: 100%;
        .rescake{
          float: left;
          width: 55%;
          height: 98%;
        }
        .vline{
          float: left;
          width: 0.2%;
          height: 80%;
          margin-top:3%;
          background:#E4E7ED;
        }
        .rescol{
          float: left;
          width: 44.8%;
          height: 98%;
          .iaas{
            margin-left: 8%;
          }
          .paas{
            margin-left:4%;
          }
          .saas{
            margin-left: 11%;
          }
        }
      }
    }
    .content-right{
      float: left;
      height: 99%;
      width: 40%;
      .right-top{
        height: 49.8%;
        width: 100%;
        margin-bottom:2.5%;
        .num{
          margin-top:8%;
        }
      }
      .right-bottom{
        width: 100%;
        height: 48%;
        font-family:微软雅黑;
        .lbtitle{
          font-size: 23px;
          font-weight: 500;
          margin:3% 0 1% 3%;
        }
        .el-table{
          max-width: 90%;
          margin:0 3% 0 7%;
          font-size: 20px;
          color: black;
          thead{
            font-size: 20px;
            background: #000;
          }
        }
      }
    }
   }
  }
</style>