<template>
  	<div class="content" id="searchMerchant">
    	<header class="head">
    			<div class="search_cate">
    				<a href="javascript:window.history.go('-1');" class="back"></a>
    				<h1 class="y-confirm-order-h1">{{dataJson.keyword}}</h1>
    			</div>
  		</header>
      <div class="main">
          <div class="yy-experWarp">
              <!-- 有结果 -->
              <div v-if="noResult == false">
                <ul class="expul">
                  <li v-for="(data,index) in merchantList">
                    <div class="imgbox">
                      <router-link :to="{path:'/shopDetails', query:{id:data['id']}}">
                        <img :src="data['logo']">
                      </router-link>
                    </div>
                    <div class="pp-msg">
                      <router-link :to="{path:'/shopDetails', query:{id:data['id']}}">
                        <p class="name db-overflow">{{data['agent_name']}}</p>
                        <div class="address">
                          <em>{{data['distance']}}m</em>
                          <span>{{data['address']}}</span>
                        </div>
                      </router-link>
                      <div class="pp-btn">
                        <span @click="jumpToNav(data['latitude'],data['longitude'],data['address'])">导航到店</span>
                        <span class="red" @click="jumpToPanorama(data['panorama'])">全景逛店</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 无结果 -->
              <div class="noResult" v-else>
                  <div class="imgbox">
                      <img src="../assets/images/jccw_bg@2x.png">
                  </div>
                  <p>没有相关体验馆</p>
              </div>        
            </div>
      </div>
  	</div>
</template>
<script>
export default {

    data () {
        return {
            merchantList : [],
            dataJson : {
                keyword : this.$route.query.keyword,
                page : 0
            },
            nomore : false,
            noResult : false,
            loadData : true,
            iphone : false,
            android : false,
        }
    },
    created(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') == -1) {
          if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
            this.iphone = true;
            this.android = false;
          } else {
            this.iphone = false;
            this.android = true;
          }
        }
        this.$store.commit('loading',{show:true,text:'加载中...'});
        this.getMerchantList();
    },
    computed: {

    },
    mounted(){
        this.loadMore();
    },
    methods: {
        getMerchantList : function() {
            var that = this;
            if ( that.loadData == true ) {
                that.dataJson.page++;
                that.dataJson.longitude = localStorage.longitude;
                that.dataJson.latitude = localStorage.latitude;
                that.loadData = false;
                that.$http.post('/Shop/Agent/searchAgent', that.dataJson, {emulateJSON:true}).then(function(response){
                    var returnData = response['data'];
                    if ( returnData['data']['list'].length ) {
                        that.merchantList = ( that.merchantList.length ) ? that.merchantList.concat(returnData['data']['list']) : returnData['data']['list'];
                    } else {
                        if ( that.merchantList.length ) {
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
            that.$store.commit('scrollFun',{dom:'searchMerchant',auto:true,bottomCall:function(){           
                if ( that.nomore == false ) {
                    that.getMerchantList();
                }
            }})
        },
        jumpToPanorama(url){
          if ( this.android === true ) {
            window.location.href = url;
          } else {
            var title = encodeURI('全景逛店'),
            uri = encodeURIComponent(url);
            window.location.href = "mitchell://blank?url="+ uri +"&title="+ title;
          }
        },
          jumpToNav(lat,lng,address){
           window.location.href = "mitchell://navigation?lat="+ lat +"&lng="+ lng + "&poiName=" + address;
        }
    }

}
</script>

