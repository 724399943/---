<template>
  	<div class="content" id="searchGoods">
    	<header class="head">
			<div class="search_cate">
				<a href="javascript:window.history.go('-1');" class="back"></a>
				<h1 class="y-confirm-order-h1">{{dataJson.keyword}}</h1>
			</div>
  		</header>
      <div class="main">
        <div class="yy-experWarp">
            <!-- 有结果 -->
            <div class="igoodsMain" v-if="noResult == false">
                <ul>
                    <li v-for="(data,index) in goodsList">
                        <router-link :to="{path:'/goodsDetail', query:{id:data['id']}}">
                            <div class="imgbox">
                                <img :src="data.goods_image">
                            </div>
                            <p class="gt">{{data.goods_name}}</p>
                            <div class="ppt">
                                <span>￥{{data.goods_price}}元</span>
                                <span class="buy ys">已售{{data.sale_number}}件</span>
                            </div>
                        </router-link>
                    </li>                       
                </ul>
                <p class="nomore" v-if="nomore == true">已经到底啦~</p>
            </div>
            <!-- 无结果 -->
            <div class="noResult" v-else>
                <div class="imgbox">
                    <img src="../assets/images/dpcw_bg@2x.png">
                </div>
                <p>没有相关商品</p>
            </div>           
        </div>
      </div>
  	</div>
</template>
<script>
export default {

    data () {
        return {
            goodsList : [],
            dataJson : {
                keyword : this.$route.query.keyword,
                page : 0
            },
            nomore : false,
            noResult : false,
            loadData : true,
        }
    },
    created(){
        this.$store.commit('loading',{show:true,text:'加载中...'});
        this.getGoodsList();
    },
    computed: {

    },
    mounted(){
        this.$store.commit('loading',{show:false});
        this.loadMore();
    },
    methods: {
        getGoodsList : function() {
            var that = this;
            if ( that.loadData == true ) {
                that.dataJson.page++;
                that.loadData = false;
                that.$http.post('/Shop/Goods/searchGoods', that.dataJson, {emulateJSON:true}).then(function(response){
                    var returnData = response['data'];
                    if ( returnData['data']['list'].length ) {
                        that.goodsList = ( that.goodsList.length ) ? that.goodsList.concat(returnData['data']['list']) : returnData['data']['list'];
                    } else {
                        if ( that.goodsList.length ) {
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
            that.$store.commit('scrollFun',{dom:'searchGoods',auto:true,bottomCall:function(){           
                if ( that.nomore == false ) {
                    that.getGoodsList();
                }
            }})
        },
    }

}
</script>

