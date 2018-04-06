<template>
  	<div class="content" id="FlashSale">
  		<header class="head">
  			<a href="javascript:window.history.go(-1);" class="back"></a>
			<h1 class="y-confirm-order-h1">限时抢购</h1>
		</header>
		<div class="main">
			<div class="flashSale-m">
				<div class="fs-top">
					<em></em>
					正在抢购，先下单先得哦
				</div>
				<div class="fs-cont">
					<ul class="expul">
						<template v-for="(item,index) in list">
			                <router-link :to="{name: 'goodsDetail', query: {sale_id: item['sale_id'], id: item['goods_id']}}">
			                	<li>
				                  	<div class="imgbox fls">
				                    	<img :src="item.goods_image">
				                  	</div>
				                  	<div class="pp-msg">
				                    	<p class="name db-overflow">{{item.goods_name}}</p>
					                    <div class="p-ptcont">
					                      	<div class="price">
					                      		<span class="red">￥{{item.promotion_price}}</span>
					                      		<span class="old">￥{{item.goods_price}}</span>
					                      	</div>
					                      	<div class="count" v-if="item.is_sold_out == 0">
					                      		<span>{{item.hour}}</span>:<span>{{item.min}}</span>:<span>{{item.sec}}</span>
					                      	</div>
					                      	<a href="javascript:;" class="buy" v-if="item.is_sold_out == 0">立即抢购</a>
					                      	<a href="javascript:;" class="buy grey" v-else>已抢光</a>
					                    </div>
					                    <div class="p-salenum">
					                    	<div class="state">
						                    	<div class="total"></div>
						                    	<div class="sale" style="width:100%" v-if="item.surplus_number == 0"></div>
						                    	<div class="sale" v-else :style="'width:'+Math.round((parseInt(item.promotion_number)-parseInt(item.surplus_number))/parseInt(item.promotion_number)*100)+'%'"></div>
						                    </div>
						                    <span class="num">已抢{{item.surplus_number | schedule(item.promotion_number)}}</span>
					                    </div>
				                  	</div>
			                	</li>
				            </router-link>
				        </template>		                		               
		            </ul>  
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			list : [],
			counterId : '',
			dataJson : {
                page : 0
            },
			nomore : false,
            noResult : false,
            loadData : true,
		}
	},
	created(){
		this.$store.commit('loading',{show:true,text:'加载中...'});
		this.getData();
	},
	mounted(){
		this.$store.commit('loading',{show:false});
		this.loadMore();
		let self = this;
		this.counterId = setInterval(function(){
			self.counter();
		}, 1000);
	},
	beforeDestroy(){
		clearInterval(this.counterId);
	},
	filters : {
		schedule : function(value,sum){
			if( value == 0 ){
				value = '100%';
			}else{
				value = Math.round(( parseInt(sum) - parseInt(value) )/parseInt(sum)*100)+'%';
			}  		
			return value;
		}
	},
	methods: {
		getData(){
		    var that = this;
            if ( that.loadData == true ) {
                that.dataJson.page++;
                that.loadData = false;
                that.$http.post('/Shop/Promotion/saleGoods', that.dataJson, {emulateJSON:true}).then(function(response){
                    var returnData = response['data'];
                    if ( returnData['data']['list'].length ) {
                        that.list = ( that.list.length ) ? that.list.concat(returnData['data']['list']) : returnData['data']['list'];
                    } else {
                        if ( that.list.length ) {
                            that.nomore = true;
                        } else {
                            that.noResult = true;
                        }
                    }
                    that.$nextTick(function () {
                        that.loadData = true;
                        that.$store.commit('loading',{show:false});
                    })
                });
            }
		},
		loadMore(){         
		    var that = this;
		    this.$store.commit('scrollFun',{dom:"FlashSale",auto:true,bottomCall:function(){           
		    	that.getData();
		    }})
		},
		counter(){
			let now = new Date().getTime();
			let goodsData = [];
			for (var i = 0; i < this.list.length; i++) {
				let data = this.list[i],
				  	endTime = Number(data['sale_end_time'] * 1000);
				goodsData[i] = {};
				goodsData[i] = data;
				goodsData[i]['hour'] = this.timestampToTime((endTime - now), 0);
				goodsData[i]['min'] = this.timestampToTime((endTime - now), 1);
				goodsData[i]['sec'] = this.timestampToTime((endTime - now), 2);
			}
			console.log(1);
			this.list = goodsData;
		},
		timestampToTime(timestamp, type){
			let time;
			let hour = parseInt(timestamp/1000/3600);
			let min = parseInt((timestamp/1000 - hour * 3600)/60);
			let sec = parseInt(timestamp/1000 - hour * 3600 - min * 60)
			switch ( type ) {
				case 0 :
					time = hour;
					break;
				case 1 :
					time = min;
					break;
				case 2 :
					time = sec;
					break;
			}
			return time;
		}
	}

}
</script>

