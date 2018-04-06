<template>
  	<div class="content">
  		<header class="head">
  			<div class="search_cate tesu">
  				<router-link to="/searchGoods">
	  				<input type="text" name="" disabled="disabled" placeholder="搜索商品">	  				
          </router-link>
  			</div>
  		</header>
  		<div class="main">
  			<div class="nuu-f0f0f5 clearfix" id="content">
            <div class="con-fl-nav diyScroll">
                <ul class="all-class">
                    <li v-for="(item,index) in categoryList" :class="{on : url_selNum == parseInt(index)}" @click="selectCategory(index,item.category_path)">
                        <a href="javascript:;">{{item.category_name}}</a>
                    </li>                
                </ul>
            </div>
            <div class="con-fr-nav diyScroll" id="categoryList">
                <div class="store-goods-u">
                    <a href="javascript:;" v-bind:class="{on: sale_sort}" @click="goodsSort(0)">销量</a> 
                    <a href="javascript:;" v-bind:class="{on: comment_sort}"@click="goodsSort(1)">评分</a> 
                    <a href="javascript:;" class="price" v-bind:class="{on: price_sort}" @click="goodsSort(2)">
                        价格
                        <span><i class="one Jonem"></i><i class="two"></i></span>
                    </a>
                </div>
                <div class="igoodsMain">
                  <ul>
                    <li v-for="(data,index) in goodsList">
                      <router-link :to="{path:'/goodsDetail', query:{id:data['id'],url:'categoryList',url_selNum:url_selNum}}">
                        <div class="imgbox">
                          <img :src="data.goods_image">
                        </div>
                        <p class="gt">{{data.goods_name}}</p>
                        <div class="ppt"><span>￥{{data.goods_price}}元</span><span class="buy ys">已售{{data.sale_number}}件</span>
                        </div>
                      </router-link>
                    </li>             
                  </ul>
                  <p class="nomore" v-if="nomore == true">已经到底啦~</p>
              </div>        
            </div>
  	     </div>
         <!-- 回到顶部 -->
        <div class="totop" @click="totop"></div>
  		</div>
  	</div>
</template>
<script>

export default {

  data () {
    return {
      url : (this.$route.query.url) ? this.$route.query.url : '',
      url_selNum : (this.$route.query.url_selNum) ? this.$route.query.url_selNum : 0,
      categoryList : [],
      goodsList : [],
      category_path : '',
      dataJson : {
          category_path : (this.$route.query.category_path) ? this.$route.query.category_path : '',
          page : 0,
          comment_sort : '-1',
          sale_sort : '-1',
          price_sort : '-1',
      },
      comment_sort : false,
      sale_sort : false,
      price_sort : false,
      loadData : true,
      nomore : false,
    }
  },
  created(){
      this.$store.commit('loading',{show:true,text:'加载中...'});
      this.getData();
  },
  mounted(){
      this.$store.commit('loading',{show:false});
      this.loadMore();
  },
  methods: {
      getData : function(){
          this.$http.post('/Shop/Goods/goodsCategory', {}, {emulateJSON:true}).then(function(response){
              var returnData = response['data'];
              if( returnData['status'] == "200000" ){
                  var list = returnData['data']['list'];
                  this.categoryList = list; 
                  this.dataJson.category_path = list[this.url_selNum]['category_path']; 
                  this.getGoodsList(this.url_selNum);     
              }    
          });
      },
      selectCategory : function(index, path){  
          this.dataJson.page = 0;
          this.url_selNum = index;
          this.dataJson.category_path = path;
          this.goodsList = [];
          this.getGoodsList();
      },
      getGoodsList : function() {
          var that = this;
          if ( that.loadData == true ) {
              that.dataJson.page++;
              that.loadData = false;
              that.$http.post('/Shop/Goods/goodsList', that.dataJson, {emulateJSON:true}).then(function(response){
                  var returnData = response['data'];
                  if ( returnData['data']['list'].length ) {
                      that.goodsList = ( that.goodsList.length ) ? that.goodsList.concat(returnData['data']['list']) : returnData['data']['list'];
                  } else {
                      if ( that.goodsList.length ) {
                          that.nomore = true;
                      }
                  }
                  that.$nextTick(function () {
                      that.loadData = true;
                  })
              });
          }
      },
      goodsSort : function(sort){
          this.goodsList = [];
          switch ( sort ) {
              case 0 :
                  this.dataJson.comment_sort = '-1';
                  this.dataJson.sale_sort = '1';
                  this.dataJson.price_sort = '-1';
                  this.sale_sort = true;
                  this.comment_sort = false;
                  this.price_sort = false;
                  break;
              case 1 :
                  this.dataJson.comment_sort = '1';
                  this.dataJson.sale_sort = '-1';
                  this.dataJson.price_sort = '-1';
                  this.comment_sort = true;
                  this.sale_sort = false;
                  this.price_sort = false;
                  break;
              case 2 :
                  this.dataJson.comment_sort = '-1';
                  this.dataJson.sale_sort = '-1';
                  this.dataJson.price_sort = this.dataJson.price_sort == '-1' ? '1' : ( this.dataJson.price_sort == '1' ? '0' : '1' );
                  this.price_sort = true;
                  this.sale_sort = false;
                  this.comment_sort = false;
                  break;
          }
          this.dataJson.page = 0;
          this.getGoodsList();
      },
      loadMore(){         
          var that = this;
          that.$store.commit('scrollFun',{dom:'categoryList', auto:false, bottomCall:function(){ 
              if ( that.nomore == false ) {                  
                  that.getGoodsList();
              }
          }})
      },
      totop(){
          var timer = null;
          timer = setInterval(function(){
              var container = document.getElementById('categoryList');
              var _top = container.scrollTop;
              var speed = _top/5;
              container.scrollTop -= speed;
              if( _top == 0){
                  clearInterval(timer);
              }
          },20)
      },
  }

}
</script>

