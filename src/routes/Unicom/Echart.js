import React, { Fragment } from 'react';
import {Row,Col} from 'antd';
import ReactEcharts from 'echarts-for-react';
//引入echarts主模块
import echarts from 'echarts/lib/echarts';
//引入柱状图
import 'echarts/lib/chart/bar';
//引入标题和提示框
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
//引入图表卡片
import {ChartCard} from '../../components/Charts';
import allurl from '../../../public/allurl.json';

import $ from 'jquery';


export default class Echart1 extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	sourcel:[],
    	namel:[],
    	sourcer:[],
    	namer:[]
    }
  }
  componentDidMount=()=> {
    this.getStartAndAge();
  	this.getStartAndCareer();
  }
  //获取质量与职业的关系数据
  getStartAndCareer=()=>{
    let sourcel=[];
    let namell=[];
    let namelr=[];
	  $.getJSON(allurl.getStartAndCareer,function(data){
     	for(let i=0;i<data.data.length;i++){
		    var star=data.data[i].star;
		    var career=data.data[i].career;
		    var value=data.data[i].count;
            sourcel.push({"source":star,"target":career,"value":value});
            let indexla = 0;
            for(let i=0;i<namell.length;i++){
            	if(namell[i].name == star){
            		indexla = 1;
            	}
            }
            if(indexla == 0){
            	namell.push({"name":star});
            }else{indexla =0;}

            let indexlb = 0;
            for(let i=0;i<namelr.length;i++){
            	if(namelr[i].name == career){
            		indexlb = 1;
            	}
            }
            if(indexlb == 0){
            	namelr.push({"name":career});
            }else{indexlb =0;}
    	}
      //showleft
      let namel=[...namell,...namelr]
      this.showl(sourcel,namel);
	  }.bind(this))
  }
  //获取质量与职业的关系数据
  getStartAndAge=()=>{
    let sourcer=[];
    let sourcernew=[];
    let namerl=[];
    let namerr=[];
	  $.getJSON(allurl.getStartAndAge,function(data){
     	for(let i=0;i<data.data.length;i++){
     		var age=data.data[i].age;
		    var star=data.data[i].star;
		    var value=data.data[i].count;
            sourcer.push({"source":star,"target":age,"value":value});
            
            //star 的名字排重
            let indexra = 0;
            for(let i=0;i<namerl.length;i++){
            	if(namerl[i].name == star){
            		indexra = 1;
            	}
            }
            if(indexra == 0){
            	namerl.push({"name":star});
            }else{indexra =0;}
            //age分段处理并排重
            let ager = this.agefenduan(age);
            let indexage=0;
            for(let i=0;i<namerr.length;i++){
            	if(namerr[i].name == ager){
            		indexage = 1;
            	}
            }
            if(indexage == 0){
            	namerr.push({"name":ager});
            }else{indexage =0;}
    	}
    	for(let i=0;i<namerl.length;i++){
    		for(let j=0;j<namerr.length;j++){
    			var s=0;
    			for(let l=0;l<sourcer.length;l++){
    				let ager = this.agefenduan(sourcer[l].target);
    				if(sourcer[l].source == namerl[i].name & ager==namerr[j].name){
    					s += sourcer[l].value;
    				}
    			}
    			sourcernew.push({"source":namerl[i].name,"target":namerr[j].name,"value":s});
    		}
    	}
	    let namer=[...namerl,...namerr]
      this.showr(sourcernew,namer);
	  }.bind(this))
  }
  agefenduan=(age)=>{
    	let ager;
    	if(age <=20 ){
    	ager = "小于等于20岁";
    	}else if(age <=30 ){
    		ager = "大于20岁小于等于30岁";
    	}else if(age <=40){
    		ager = "大于30岁小于等于40岁";
    	}else {ager = "大于40岁";}
    	return ager;
  }
  //展示质量与职业的关系数据
  showl =(source,name)=>{
  	let elleft = document.getElementById("mainleft");
  	//图表初始化
  	let myChartleft = echarts.init(elleft);
  	//图表配置项
  	let option={
  		title:{
	  		text:'用户质量与职业关系'
  		},
      tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
      },
      toolbox:{
        left:200,
        feature: {
            saveAsImage: {
              pixelRatio:5
            }
        }
      },
	  	series:{
		    type: 'sankey',
		    layout:'none',
		    data:name,
		    links:source,
        //focusNodeAdjacency: true,
        itemStyle: {
              normal: {
                  borderWidth: 1,
                  borderColor: '#aaa'
              }
        },
        lineStyle: {
              normal: {
                  color: 'source',
                  curveness: 0.5
              }
        }
		  }   
  	};
  	myChartleft.setOption(option);
  }
  //展示质量与年龄的关系数据
  //http://10.52.200.36:8080/starts_ages
  showr =(source,name)=>{
  	let elright = document.getElementById("mainright");
  	//图表初始化
  	let myChartright = echarts.init(elright);
  	//图表配置项
  	let option={
  		title:{
	  		text:'用户质量与年龄关系'
  		},
      tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
      },
      toolbox:{
        left:200,
        feature: {
            saveAsImage: {
              pixelRatio:5
            }
        }
      },
	  	series:{
		    type: 'sankey',
		    layout:'none',
		    data:name,
        links:source,
        itemStyle: {
              normal: {
                  borderWidth: 1,
                  borderColor: '#aaa'
              }
        },
        lineStyle: {
              normal: {
                  color: 'source',
                  curveness: 0.5
              }
        }
		  }
  	};
  	myChartright.setOption(option);
  }

  render() {
    return (
      // <div>
      	// <Fragment>
        <Row>
          <Col xl={12} lg={12} md={18} sm={24} xs={24}>
          	
            <div id = "mainleft" style={{width:'100%',height:600}}></div>
          </Col>
          <Col xl={12} lg={12} md={18} sm={24} xs={24}>
            <div id = "mainright" style={{width:'100%',height:600}}></div>
          </Col>
        </Row>
      // </Fragment>
      // </div>
    );
  }
}