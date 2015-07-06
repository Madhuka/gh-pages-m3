"use strict";angular.module("apacheZeppelinGsocApp",["ngResource","ngRoute","googlechart","highcharts-ng","nvd3"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/about.html"}).when("/milestone01",{templateUrl:"views/milestone01.html",controller:"ChartCtrl"}).when("/contact",{templateUrl:"views/contact.html"}).when("/",{templateUrl:"views/about.html"}).otherwise({redirectTo:"/"})}]),angular.module("apacheZeppelinGsocApp").service("ChartMetaService",function(){var a={ChartLib:null,ChartTemplateURL:null,ChartType:null,ChartDataSetName:null,ChartDataSetPath:null,ChartData:null};this.getChartLib=function(){return a.ChartLib},this.getChartType=function(){return a.ChartType},this.getChartTemplateURL=function(){return a.ChartTemplateURL},this.getChartDataSetName=function(){return a.ChartDataSetName},this.getChartDataSetPath=function(){return a.ChartDataSetPath},this.getChartData=function(){return a.ChartData},this.setChartLib=function(b){a.ChartLib=b},this.setChartType=function(b){a.ChartType=b},this.setChartTemplateURL=function(b){a.ChartTemplateURL=b},this.setChartDataSetName=function(b){a.ChartDataSetName=b,a.ChartDataSetPath="data/"+b+".csv",a.ChartData=d3.csv(a.ChartDataSetPath)},this.isMetaCompleted=function(){return null!==a.ChartType}}),angular.module("apacheZeppelinGsocApp").controller("NavCtrl",["$scope","$rootScope","$location",function(a,b,c){function d(a){return a===c.path()}var e=this;e.isActive=d}]),angular.module("apacheZeppelinGsocApp").controller("ChartCtrl",["$scope","ChartFactory","GoogleChartFactory","HighChartFactory","NVD3ChartFactory","ChartService","ChartMetaService","chartConfig",function(a,b,c,d,e,f,g,h){function i(a,b){b.row(a.model).get(a.get)}function j(a){p("dataButton",a),w=o(a),g.setChartDataSetName(a),n(w)}function k(a){p("chartLibraryButton",t[a].library),g.setChartLib(t[a].library),g.setChartTemplateURL(t[a].template),null===g.getChartType()&&g.setChartType("Bar"),n(w)}function l(){return g.getChartTemplateURL()}function m(a){g.setChartType(a),p("chartTypeButton",a),n(w)}function n(a){var b={},c=g.getChartType();switch(console.log(c),g.getChartLib()){case"NVD3Chart":b=f.getNVD3Chart(c),s.data=b.viewModel.data,s.options=b.viewModel.options;break;case"highChart":b=f.getHighChart(c),s.chartConfig=b.viewModel;break;case"googleChart":b=f.getGoogleChart(c),s.chart=b.viewModel}b.model&&i(b.model,a)}function o(a){return d3.csv("data/"+a+".csv")}function p(a,b){x[a]=b}function q(a,b){return x[a]===b}function r(a){return x[a]}var s=this,t=h.libraryName,u=h.dataFiles,v=h.chartTypes,w={},x={dataButton:!1,chartLibraryButton:!1,chartTypeButton:!1};s.loadData=j,s.isButtonActive=q,s.isButtonSelected=r,s.loadChartLibrary=k,s.loadChartType=m,s.files=u,s.libraryName=t,s.chartTypes=v,s.getChartTemplateURL=l}]),angular.module("apacheZeppelinGsocApp").constant("chartConfig",{libraryName:[{library:"highChart",template:"views/charts/highchart.html"},{library:"NVD3Chart",template:"views/charts/nvd3chart.html"},{library:"googleChart",template:"views/charts/googlechart.html"}],dataFiles:["car","bike"],chartTypes:["Line","Bar"]}),angular.module("apacheZeppelinGsocApp").factory("ChartFactory",function(){var a=function(a,b){this.libname=a,this.model=b,this.viewModel={},this.type={},this.data={}};return a.setChartType=function(b){a.type=b},a}),angular.module("apacheZeppelinGsocApp").factory("GoogleChartFactory",["ChartFactory",function(a){function b(a){return{c:[{v:a.Make},{v:+a.Length}]}}function c(a,b){f.data.rows=b}function d(a){h.viewModel.type=e[a]}var e={Bar:"BarChart",Line:"LineChart"},f={type:"BarChart",cssStyle:"height:400px; width:500px;",data:{cols:[{id:"pizza",label:"Pizza",type:"string"},{id:"populartiy",label:"Populartiy",type:"number"}],rows:[{c:[{v:"Pepperoni"},{v:14}]}]},options:{isStacked:"true",fill:20,height:300,displayExactValues:!0,vAxis:{gridlines:{count:6}},hAxis:{title:"hAxis title"}},formatters:{}},g={model:b,get:c},h=new a("googleChart",g);return h.viewModel=f,h.setChartType=function(a){h.type=a,d(a)},h}]),angular.module("apacheZeppelinGsocApp").factory("HighChartFactory",["ChartFactory",function(a){function b(a){return+a.Length}function c(a,b){console.log("loading for view"),console.log(b),i.series[0].data=b}function d(a){k.viewModel.options.chart.type=h[a]}function e(a,b){console.log(b),l=b,k.viewModel.xAxis.categories=l}function f(a){return a.Make}function g(a){l=d3.csv(a).row(f).get(e)}var h={Bar:"bar",Line:"line"},i={options:{chart:{type:"bar"}},xAxis:{categories:[]},series:[{data:[]}],size:{width:500,height:300},loading:!1},j={model:b,get:c},k=new a("highxChart",j);i.series[0].data=null,k.viewModel=i,k.setChartType=function(a){k.type=a,d(a)},k.setChartAxis=function(a){g(a)};var l={};return k}]),angular.module("apacheZeppelinGsocApp").factory("NVD3ChartFactory",["ChartFactory",function(a){function b(a,b){var c={values:b};i.data[0]=c,console.log(i.data)}function c(a){return{label:a.Make,value:+a.Length,valuex:+a.No}}function d(a){k.viewModel.options.chart.type=h[a]}function e(a,b){console.log(b),l=b,k.viewModel.options.chart.xAxis={axisLabel:"Make",tickFormat:function(a){return l[a]}}}function f(a){return a.Make}function g(a){l=d3.csv(a).row(f).get(e)}var h={Bar:"discreteBarChart",Line:"lineChart"},i={options:{chart:{type:"discreteBarChart",height:300,width:500,showLegend:!0,margin:{top:20,right:20,bottom:20,left:20},x:function(a){return a.valuex},y:function(a){return a.value},showValues:!0,transitionDuration:500,xAxis:{axisLabel:"X Axis"},yAxis:{axisLabel:"Y Axis",axisLabelDistance:10}}},data:[]},j={model:c,get:b},k=new a("NVD3Chart",j);k.viewModel=i,k.setChartType=function(a){k.type=a,d(a)},k.setChartAxis=function(a){g(a)};var l={};return k}]),angular.module("apacheZeppelinGsocApp").service("ChartService",["HighChartFactory","GoogleChartFactory","NVD3ChartFactory","ChartMetaService",function(a,b,c,d){this.getHighChart=function(b){var c=a;return c.setChartType(b),c.setChartAxis(d.getChartDataSetPath()),c},this.getGoogleChart=function(a){var c=b;return c.setChartType(a),c},this.getNVD3Chart=function(a){var b=c;return b.setChartType(a),b.setChartAxis(d.getChartDataSetPath()),b}}]);