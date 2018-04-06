<template>
  	<div class="content" id="Jreworp">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">编辑收货地址</h1>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li>
						<a href="javascript:;">
							<span>收货人</span>
							<i></i>
							<input type="text" v-model="consigneeJson['consignee']">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>电话</span>
							<i></i>
							<input type="text" v-model="consigneeJson['telephone']">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>地址</span>
							<i></i>
							<input type="text" readonly="readonly" placeholder="点击选择省市区" class="pcc" id="JLAreaclick">
						</a>
						<input id="JAreavalue" type="hidden" v-model="consigneeJson['area']">
	    				<input id="province" type="hidden" name="province">
	    				<input id="city" type="hidden" name="city">
	    				<input id="county" type="hidden" name="county">					
					</li>
					<li>
						<a href="javascript:;">
							<span>详细地址</span>
							<i></i>
							<input type="text" v-model="consigneeJson['address']">
						</a>
					</li>					
				</ul>
			</div>
			<div class="editAddbtn">
				<span @click="editConsignee">保存</span>
				<span @click="delConsignee">删除</span>
			</div>
		</div>
  	</div>
</template>
<script>
import {} from '../assets/js/LArea.js';
export default {

	data () {
		return {
			consigneeJson : {},
			dataJson : {
                consignee_id : ( this.$route.query.consignee_id ) ? this.$route.query.consignee_id : '',
                is_buy :  ( this.$route.query.is_buy ) ? this.$route.query.is_buy : '0',
                ids : ( this.$route.query.ids ) ? this.$route.query.ids : '',
                message : ( this.$route.query.message ) ? this.$route.query.message : '',
                install : ( this.$route.query.install ) ? this.$route.query.install : '',
                coupon : ( this.$route.query.coupon ) ? this.$route.query.coupon : '',
            },
		}
	},
	created(){
		this.$store.commit('loading',{show:true,text:'加载中...'});
		this.getData();
	},
	mounted(){
		this.$store.commit('loading',{show:false});
	},
	methods: {
		getData(){
			var requestJson = {id: this.$route.query.id};
			this.$http.post('/Shop/Consignee/getConsignee', requestJson, {emulateJSON:true}).then(function(response){
				var returnData = response['data'];
			 	if( returnData['status'] == "200000" ){
					this.consigneeJson = returnData['data']['list'];
				}
				this.apifun(); 
			});
		},
		editConsignee(){
			this.$http.post('/Shop/Consignee/editConsignee', this.consigneeJson, {emulateJSON:true}).then(function(response){
				var returnData = response['data'];
			 	if( returnData['status'] == "200000" ){
					this.$router.push({name: 'consigneeList', query: this.dataJson});
				} else {
					this.$store.commit('alert', {show: true, text: returnData['message']});
				}  
			});
		},
		apifun(){
			// 初始化所在地信息
			var that = this;
			var LA = new LArea();
			LA.init({
				'trigger': '#JLAreaclick', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
				'valueTo': '#JAreavalue', //选择完毕后id属性输出到该位置
				'keys': {
					id: 'id',
					name: 'name'
				},
				//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
				'type': 1, //数据源类型
				// 'data': LAreaData ,  //数据源
				'callback': function() {
					that.consigneeJson['province'] = document.getElementById('province').value
			        that.consigneeJson['city'] = document.getElementById('city').value
			        that.consigneeJson['county'] = document.getElementById('county').value
			        that.consigneeJson['area'] = document.getElementById('JAreavalue').value
			    }
			});
	    	document.getElementById('JLAreaclick').setAttribute('placeholder', that.consigneeJson['province_name'] + ' - ' + that.consigneeJson['city_name'] + ' - ' + that.consigneeJson['county_name']);
			var area = (that.consigneeJson['area'].split(','));
			for (var i = 0; i < area.length; i++) {
				area[i] = parseInt(area[i]);
			}
			// console.log(area);
			LA.value = area;//控制初始位置，注意：该方法并不会影响到input的value
		},
		delConsignee(){
	    	var requestJson = {id: this.$route.query.id};
	    	this.$http.post('/Shop/Consignee/delConsignee', requestJson, {emulateJSON:true}).then(function(response){
	         	var returnData = response['data'];
			 	if( returnData['status'] == "200000" ){
					this.$router.push({name: 'consigneeList', query: this.dataJson});
				} else {
					this.$store.commit('alert', {show: true, text: returnData['message']});
				}   
	      	});
	    },
	}

}
</script>
<style>
  @import '../assets/css/LArea.css';
</style>
