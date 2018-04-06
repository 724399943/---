<template>
  	<div class="content">
    		<header class="head">
      				<a href="javascript:window.history.go(-1);" class="back"></a>
      				<h1 class="y-confirm-order-h1">评价</h1>
  		  </header>
        <div class="main">
            <div class="collectWrap">
                <div class="cmgoods-m">
                    <div class="mm-cgwl" v-for="(data,index) in goodsData">
                        <div class="imgbox">
                            <router-link :to="{name: 'goodsDetail', query: {'id': data['goods_id']}}">
                                <img :src="data['goods_image']">
                            </router-link>
                        </div>
                        <div class="m-ggmsg">
                            <router-link :to="{name: 'goodsDetail', query: {'id': data['goods_id']}}">
                                <p class="name db-overflow">{{data['goods_name']}}</p>
                            </router-link>
                            <div class="segdiv">
                                <router-link :to="{name: 'evaluate', query: {'goods_id': data['goods_id'], 'order_sn': orderData['order_sn'], 'goods_image': data['goods_image']}}" class="segbtn">
                                    评价
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>                                 
            </div>
        </div>
  	</div>
</template>
<script>
export default {

  data () {
      return {
          goodsData : [],
          orderData : {},
      }
  },
  created(){
      this.getData();
  },
  computed: {
    
  },
  mounted(){
      
  },
  methods: {
      getData(){
        this.$http.post('/Shop/Order/orderDetail', {order_sn:this.$route.query.order_sn},{emulateJSON:true}).then(function(response){
              var returnData = response['data'];
              if( returnData.status == "200000" ){
                  this.goodsData = returnData.data.goodsData;
                  this.orderData = returnData.data.orderData;
              }    
          });
      },
  }

}
</script>

