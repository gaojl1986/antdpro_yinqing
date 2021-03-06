import React from 'react';
import ReactEcharts from 'echarts-for-react';
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
import { Input } from 'antd';
const Search = Input.Search;

var option={
	  		title:{
	  			text:'职住分布图'
	  		},
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
	  			data:[]
	  		},{   //数据序列
	  			name:'休息地点分布',
	  			type:'heatmap',
	  			coordinateSystem:'bmap',   //坐标系系统
	  			mapType:'beijing',
	  			pointSize:8,//点大小
	  			blurSize:6,//点模糊程度
	  			//x,y,z
	  			data:[]
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
export default class Zhizhu extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	optdata:option
    }
  }
  //定位
  setPlace=(value) => {
		var url='http://api.map.baidu.com/geocoder/v2/?output=json&ak=FAavj8yvxkQq86aAgDEUOwHiru5LNMVI&address='+value;
		$.ajax({
            type:"GET",
            url:url, //访问的链接
            dataType:"jsonp",  //数据格式设置为jsonp
            jsonp:"callback",  //Jquery生成验证参数的名称
            success:function(data){  //成功的回调函数
               if(data.status == '0'){
					var lng = data.result.location.lng;
					var lat = data.result.location.lat;
					let opt=JSON.parse(JSON.stringify(this.state.optdata));
					opt.bmap.center=[lng,lat];
					opt.bmap.zoom=13;
					this.setState({
						optdata:opt
					});
				}else{
					alert('地址不正确');
				}	
            }.bind(this),
            error: function (e) {
                alert("error");
            }.bind(this)
        });
  }
  
  componentDidMount() {
  	//let url="public/data.json";
  	//let url='http://10.52.200.36:8080/workLocates';
  	$.getJSON(allurl.getworklocaltion,function(data){
  		let opt=JSON.parse(JSON.stringify(this.state.optdata));
  		let sourcework=[];
  		let so=[];
  		for(let i=0;i<data.data.length;i++){//data.data.length
		    so.push(data.data[i].work_lon);
		    so.push(data.data[i].work_lat);
		    so.push(data.data[i].weight);
		    sourcework.push(so);
		    so=[];
    	};
    	opt.series[0].data=sourcework;
	  	this.setState({
	  		optdata: opt
	  	});
	}.bind(this));
	$.getJSON(allurl.gethomelocaltion,function(data){
  		let opt=JSON.parse(JSON.stringify(this.state.optdata));
  		let sourcework=[];
  		let so=[];
  		for(let i=0;i<data.data.length;i++){//data.data.length
		    so.push(data.data[i].work_lon);
		    so.push(data.data[i].work_lat);
		    so.push(data.data[i].weight);
		    sourcework.push(so);
		    so=[];
    	};
    	opt.series[1].data=sourcework;
	  	this.setState({
	  		optdata: opt
	  	});
	}.bind(this));
  }

  render() {
    return (
    	<div>
    		<div style={{width:'50%',margin:'0 auto'}}>
				<Search
				  
			      placeholder="请输入地名"
			      enterButton="搜索"
			      size="large"
			      onSearch={value => this.setPlace(value)}
			    />
			</div>
			<br/>
	      	<ReactEcharts 
				option={this.state.optdata}
				style={{height:'600px',width:'100%'}}
			/>
		</div>
    );
  }
}