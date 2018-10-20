import React from 'react';
//主模块
import echarts from 'echarts/lib/echarts';
//百度地图
import bmap from 'echarts/extension/bmap/bmap';
//图表
import 'echarts/lib/chart/heatmap';
//工具组件
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import $ from 'jquery';
import allurl from '../../../public/allurl.json';

export default class Zhizhu extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  	//let url="public/data.json";
  	//let url='http://10.52.200.36:8080/workLocates';
  	let sourcework=[];
  	let sourcestate=[[116.291693,39.837386,30],[116.302383,39.91766,30]];
  	let so=[];
  	$.getJSON(allurl.getworklocaltion,function(data){
  		for(let i=0;i<data.data.length;i++){//data.data.length
		    so.push(data.data[i].work_lon);
		    so.push(data.data[i].work_lat);
		    so.push(data.data[i].weight);
		    sourcework.push(so);
		    so=[];
    	}
	  	let dom = document.getElementById("main");
	  	let myChart=echarts.init(dom);
	  	let option={
	  		title:{
	  			text:'职住分布图'
	  		},
	  		
	  		// tooltip : {
		   //      trigger: 'item',
		   //      formatter : function (params) {
		   //          var value = (params.value + '').split('.');
		   //          value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
		   //                  + '.' + value[1];
		   //          return params.seriesName + '<br/>' + params.name + ' : ' + value;
		   //      }
		   //  },
	  		visualMap:{   //
	  			min:0,  //热度的大小
	  			max:30,
	  			calculable:true, //支持热度区域的选择
	  			left:'left',
	  			top:'middle',
	  			inRange: {
	 	            color: ['green', 'yellow', 'red']
	 	        }
	  		},
	  		bmap:{
	  			center: [116.416534,39.911733],
	  			zoom: 12,   //缩放比例
	  			roam: true  //是否响应鼠标滚轮缩放
	  		},
	  		series:[{   //数据序列
	  			name:'工作地点分布',
	  			type:'heatmap',
	  			coordinateSystem:'bmap',   //坐标系系统
	  			mapType:'beijing',
	  			pointSize:8,//点大小
	  			blurSize:6,//点模糊程度
	  			//x,y,z
	  			data:sourcework
	  		},{   //数据序列
	  			name:'休息地点分布',
	  			type:'heatmap',
	  			coordinateSystem:'bmap',   //坐标系系统
	  			mapType:'beijing',
	  			pointSize:8,//点大小
	  			blurSize:6,//点模糊程度
	  			//x,y,z
	  			data:sourcestate
	  		}],
	  		
			legend:{
					show:true,
					
					textStyle:{
						fontSize:24,
						color:'red',
						fontWeight:'bold'
					},
					//backgroundColor:'green',
					top:'bottom',
					left:500,
					data:[{
						name:'工作地点分布',
						icon:'circle'
					},{
						name:'休息地点分布',
						icon:'circle'
					}]
				}


	  	}
	  	myChart.setOption(option);
	});
  }

  render() {
    return (
      <div id = "main" style={{width:"100%",height:600}}></div>
    );
  }
}