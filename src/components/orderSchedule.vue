<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">订单进度</h1>			
		</header>
		<div class="main">
			<div class="ytexress">
				<div class="y-trace-express">
					<p>订单编号：{{list.order_sn}}</p>				
				</div>
				<div class="y-traceexpress-li">
					<div class="paddingli">
						<ul class="yt-ul" id="Jytul" v-if="list.order_type == 0">
							<li v-if="list.received == 1" :class="{on:leng == 4}">
								<i class="point"></i>
								<p class="time">{{list.received_time | time}}</p>
								<p class="pl">您的订单已确认收货。感谢您在壹家无忧购物，欢迎再次光临。</p>
							</li>
							<li v-if="list.delivery_status == 1" :class="{on:leng == 3}">
								<i class="point"></i>
								<p class="time">{{list.delivery_time | time}}</p>
								<p class="pl">您的订单已经发货</p>
							</li>							
							<li v-if="list.delivery_status == 1" :class="{on:leng == 2}">
								<i class="point"></i>
								<p class="time">{{list.merchant_received_time | time}}</p>
								<p class="pl">您的订单已被处理，等待发货</p>
							</li>							
							<li v-if="list.is_pay == 1" :class="{on:leng == 1}">
								<i class="point"></i>
								<p class="time">{{list.pay_time | time}}</p>
								<p class="pl">订单支付成功，等待处理</p>
							</li>
						</ul>
						<ul class="yt-ul" id="Jytul" v-else>
							<li v-if="list.received == 1" :class="{on:leng == 5}">
								<i class="point"></i>
								<p class="time">{{list.received_time | time}}</p>
								<p class="pl">您的订单已确认收货。感谢您在壹家无忧购物，欢迎再次光临。</p>
							</li>
							<li v-if="list.delivery_status == 1" :class="{on:leng == 4}">
								<i class="point"></i>
								<p class="time">{{list.delivery_time | time}}</p>
								<p class="pl">您的订单已经发货</p>
							</li>
							<li v-if="list.merchant_production == 1" :class="{on:leng == 3}">
								<i class="point"></i>
								<p class="time">{{list.merchant_production_time | time}}</p>
								<p class="pl">订单商品正在生产中</p>
							</li>							
							<li v-if="list.merchant_received == 1" :class="{on:leng == 2}">
								<i class="point"></i>
								<p class="time">{{list.merchant_received_time | time}}</p>
								<p class="pl">您的订单已被处理，请等候卖家联系</p>
							</li>
							<li v-if="list.is_pay == 1" :class="{on:leng == 1}">
								<i class="point"></i>
								<p class="time">{{list.pay_time | time}}</p>
								<p class="pl">订单支付成功，等待处理</p>
							</li>
						</ul>
					</div>
				</div>
				<a href="javascript:;" class="ytcall osd" @click="consultation">联系客服</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			list : {},
			leng : 0,
			userAgent : navigator.userAgent.toLowerCase(),
			wechatAgent : false,
			agentInfo : {},
			userInfo : {},
		}
	},
	created(){
		this.wechatAgent = ( this.userAgent.indexOf('micromessenger') != -1 ) ? true : false;
		this.$store.commit('loading',{show:true,text:'加载中...'});
		this.getData();
	},
	mounted(){
		this.$store.commit('loading',{show:false});  
	},
	methods: {
		getData(){
			this.$http.post('/Shop/Order/checkTheOrder', {order_sn:this.$route.query.order_sn},{emulateJSON:true}).then(function(response){
				var returnData = response['data'];
		        if( returnData['status'] == "200000" ){
		            this.list = returnData['data']['list'];
		            this.agentInfo = returnData['data']['list']['agentInfo'];
		            this.userInfo = returnData['data']['user'];
		            this.$nextTick(function(){
		                this.leng = document.getElementById('Jytul').getElementsByTagName('li').length;
		            })
		        }    
		    });
		},
		consultation(){
			if ( this.wechatAgent === true ) {
				this.$router.push({name:'consultation',query:{uid:this.userInfo['id'],aid:this.agentInfo['user_id'],aname:this.agentInfo['agent_name'],isNeedGoods:0}});
			} else {
				window.location.href = 'mitchell://chat?user_id='+ this.agentInfo['user_id'] +'&nickname='+ this.agentInfo['agent_name'] +'&headimgurl='+ this.agentInfo['logo'];
			}
		}
	}

}
</script>

