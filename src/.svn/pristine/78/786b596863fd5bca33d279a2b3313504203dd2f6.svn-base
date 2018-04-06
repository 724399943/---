<template>
  	<div class="content" id="dailyDeal">
  		<header class="head">
  			<a href="javascript:window.history.go(-1);" class="back"></a>
			<h1 class="y-confirm-order-h1">每日特惠</h1>
		</header>
		<div class="main">
			<div class="isGoodsMain">
				<ul class="isgoodsUl">
					<li v-for="(item,index) in list">
						<div class="ismask" v-if="item.is_sold_out == 1">
							<div class="tips"><span>售罄</span></div>
						</div>
						<router-link :to="{name: 'goodsDetail', query: {daily_id: item['daily_id'], id: item['goods_id']}}">
							<div class="isgoods">
								<div class="imgbox">
									<img :src="item.goods_image">
								</div>
								<p class="db-overflow">{{item.goods_name}}</p>
								<div class="isprice">
									<span class="red">￥{{item.promotion_price}}元</span>
									<span>￥{{item.goods_price}}元</span>
								</div>
							</div>
						</router-link>
					</li>					
				</ul>
				<p class="nomore" v-if="nomore == 1">没有更多了~</p>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : [],
      hasAjax:0,
      page : 1,
      nomore : 0
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getIndexDailyGoods();
  },  
  mounted(){
      this.loadMore();
  },
  methods: {
		getIndexDailyGoods : function(){
		    if( this.hasAjax == 0 ){
		      this.hasAjax = 1;
		      this.$http.post('/Shop/Promotion/dailyGoods', {page:this.page},{emulateJSON:true}).then(function(response){ 
		        this.hasAjax = 0;
		        if( this.page == 0 ){
		          this.list = response.data.data.list;
		          this.page++;              
		        }else{
		          if( response.data.data.list.length == 0 ){                
		            this.hasAjax = 1;
		            this.nomore = 1;
		          }else{
		            this.page++;
		            this.list = this.list.concat(response.data.data.list);
		          }
		        }
		        this.$store.commit('loading',{show:false});                               
		        });
		    }
	  },
	  loadMore(){         
	      var that = this;
	      this.$store.commit('scrollFun',{dom:'dailyDeal',auto:true,bottomCall:function(){           
	        that.getIndexDailyGoods();
	      }})
	  }
  }

}
</script>

