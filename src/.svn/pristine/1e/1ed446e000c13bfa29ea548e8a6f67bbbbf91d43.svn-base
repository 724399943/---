<template>
  	<div class="content" id="receiveCoupons">
  		<header class="head">
  			<a href="javascript:window.history.go(-1);" class="back"></a>
			  <h1 class="y-confirm-order-h1">领取优惠券</h1>
		  </header>
		<div class="main">
			   <div class="couponWrap">
            <ul class="coupul">
                <li v-for="(data,index) in couponList">
                    <div class="rcc-msg">
                        <p class="name">限购[{{agent_name}}]店铺商品</p>
                        <p class="time">{{data.start_use_time | time("yyyy-MM-dd hh:mm:ss")}}-{{data.end_use_time | time("yyyy-MM-dd hh:mm:ss")}}</p>
                    </div>
                    <div class="rcc-imgWrap get" v-if="data['is_get'] == '0'">
                        <div class="rcctext" @click="getCoupon(data['coupon_sn'], index)">
                            <h1>￥{{data['coupon_value']}}</h1>
                            <p>满{{data['min_cost']}}可用</p>
                            <a href="javascript:;">立即领取</a>
                        </div>
                    </div>
                    <div class="rcc-imgWrap use" v-else>
                        <div class="rcctext">
                            <h1>￥{{data['coupon_value']}}</h1>
                            <p>满{{data['min_cost']}}可用</p>
                            <router-link to="/">
                                <span>去使用</span>
                            </router-link>
                        </div>
                    </div>
                </li>
                <!-- <li>
                    <div class="rcc-msg">
                        <p class="name">限购[{{agent_name}}]店铺商品</p>
                        <p class="time">2017.06.01-2017.06.20</p>
                    </div>
                    <div class="rcc-imgWrap none">
                        <div class="rcctext">
                            <h1>￥3</h1>
                            <p>满50可用</p>
                            <a href="javascript:;">抢光了</a>
                        </div>
                    </div>
                </li> -->
            </ul>
         </div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
        dataJson : {
            agent_id : this.$route.query.agent_id,
            page : 0,
        },
        agent_name : this.$route.query.agent_name,
        couponList : [],
        loadData : true,
    }
  },
  created(){
      this.getAgentCoupon();
  },
  computed: {
    
  },
  mounted(){
      this.loadMore();
  },
  methods: {
      getAgentCoupon(){
          var that = this;
          if ( that.loadData == true ) {
              that.dataJson.page++;
              that.loadData = false;
              that.$http.post('/Shop/Coupon/agentCoupon', that.dataJson, {emulateJSON:true}).then(function(response){
                  var returnData = response['data'];
                  if ( returnData['data']['list'].length ) {
                      that.couponList = ( that.couponList.length ) ? that.couponList.concat(returnData['data']['list']) : returnData['data']['list'];
                  }
                  that.$nextTick(function () {
                      that.loadData = true;
                  })
              });
          }
      },
      getCoupon(coupon_sn, index){
          var requestJson = {coupon_sn: coupon_sn};
          var that = this;
          // console.log(index);return;
          that.$http.post('/Shop/Coupon/getCoupon', requestJson, {emulateJSON:true}).then(function(response){
              var returnData = response['data'];
              if ( returnData['status'] == '200000' ) {
                  that.$store.commit('alert', {show:true,text:'领取成功'});
                  that.couponList[index]['is_get'] = '1';
              } else {
                  that.$store.commit('alert', {show:true,text:returnData['message']});
              }
          });
      },
      loadMore(){         
          var that = this;
          that.$store.commit('scrollFun',{dom:'receiveCoupons',auto:true,bottomCall:function(){           
              if ( that.nomore == false ) {
                  that.getAgentCoupon();
              }
          }})
      },
  }

}
</script>

