<template>
  	<div class="content">
  		<header class="head">
			<router-link to="/" class="back"></router-link>
			<!-- <a href="javascript:window.history.go(-1);" class="back"></a> -->
			<h1 class="y-confirm-order-h1">支付成功</h1>
		</header>
		<div class="main">
			<!-- 成功 -->
			<div class="paywrap" v-if="dataJson.status == '1'">
				<div class="psuccess_m">
					<div class="p_imgbox">
						<img src="../assets/images/zfjg_cg_icn@2x.png">
					</div>
					<p class="p_ptt">订单支付成功！</p>
					<p class="pay_tips">订单在确认收货后不能申请退货</p>					
				</div>
				<div class="p_suessbtn">
					<router-link :to="{name: 'orderDetail', query: {order_sn: dataJson.order_sn}}" class="btn sb">
						查看订单
					</router-link>
					<router-link to="/" class="btn bb">
						返回商城
					</router-link>
				</div>
			</div>
			<div class="paywrap" v-else>
				<div class="psuccess_m">
					<div class="p_imgbox">
						<img src="../assets/images/zfjg_bq_icn@2x.png">
					</div>
					<p class="p_ptt">订单支付失败！</p>					
				</div>
				<div class="p_suessbtn">
					<router-link :to="{name: 'payment', query: {order_sn: dataJson.order_sn}}" class="repay">
						重新支付
					</router-link>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			dataJson: {
				status: this.$route.query.status,
				order_sn : this.$route.query.order_sn,
			}
		}
	},
	created(){

	},
	computed: {

	},
	methods: {

	}

}
</script>

