<template>
  	<div class="content" id="Jreworp">
  		<header class="head">
			<a href="javascript:window.history.go(-1);" class="back"></a>
			<h1 class="y-confirm-order-h1">新增收货地址</h1>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li>
						<a href="javascript:;">
							<span>收货人</span>
							<i></i>
							<input type="text" placeholder="请填写收货人" v-model="consigneeJson.consignee">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>电话</span>
							<i></i>
							<input type="text" placeholder="请填写正确的电话号码" v-model="consigneeJson.telephone">
						</a>
					</li>
					<li>
						<a href="javascript:;">
							<span>地址</span>
							<i></i>
							<input type="text" readonly="readonly" placeholder="点击选择省市区" class="pcc" id="JLAreaclick">
						</a>	
						<input id="JAreavalue" type="hidden">
	    				<input id="province" type="hidden" name="province">
	    				<input id="city" type="hidden" name="city">
	    				<input id="county" type="hidden" name="county">
					</li>
					<li>
						<a href="javascript:;">
							<span>详细地址</span>
							<i></i>
							<input type="text" placeholder="请填写详细收货地址" v-model="consigneeJson.address">
						</a>
					</li>					
				</ul>
			</div>
			<a href="javascript:;" class="addUpbtn" @click="addAddress">保存</a>
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
	mounted(){
		this.apifun();
	},
	methods: {
		addAddress(){    	
			this.$http.post('/Shop/Consignee/addConsignee', this.consigneeJson, {emulateJSON:true}).then(function(response){
				var returnData = response['data'];
		     	if( returnData.status == "200000" ){
		     		this.dataJson.consignee_id = ( !this.dataJson.consignee_id ) ? returnData['data']['id'] : this.dataJson.consignee_id;
		     		this.$router.push({name: 'consigneeList', query: this.dataJson});
		    	} else {
		    		this.$store.commit("alert",{show:true,text:returnData.message});         
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
		}
	}

}
</script>
<style>
  @import '../assets/css/LArea.css';
</style>
