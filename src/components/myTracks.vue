<template>
  	<div class="content" id="myTracks">
    		<header class="head">
      				<router-link to="/personalCenter">
                <a  class="back"></a>
              </router-link>
      				<h1 class="y-confirm-order-h1">
                  <span :class="{on: goodsShow}" @click="changeTags('goodsShow')">商品</span>
                  <span :class="{on: agentShow}" @click="changeTags('agentShow')">店铺</span>
              </h1>
              <span class="text" @click="editEvent">{{editText}}</span>
  		  </header>
        <div class="main">
            <div class="collectWrap">
                <div v-if="goodsShow == true">
                    <!-- 商品 -->
                    <div class="cmgoods-m" v-if="editType == '0'">
                        <div class="mm-cgwl" v-for="(data,index) in list">
                            <div class="imgbox">
                                <router-link :to="{name: 'goodsDetail', query: {id: data['goods_id'],url:'trackGoods'}}">
                                    <img :src="data['goods_image']">
                                </router-link>
                            </div>
                            <div class="m-ggmsg">
                                <router-link :to="{name: 'goodsDetail', query: {id: data['goods_id'],url:'trackGoods'}}">
                                    <p class="name db-overflow">{{data['goods_name']}}</p>
                                    <p class="price">￥ {{data['goods_price']}}</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <!-- 商品 - 编辑 -->
                    <div class="cmgoods-m" v-else>
                        <div class="mm-cgwl" v-for="(data,index) in list">
                            <div class="s_goods_wrap">
                                <div class="s_cbox">
                                    <input type="checkbox" :id="data['id']" :value="data['id']" v-model="collectData" @change="selectCheck(index)"> 
                                    <label :for="data['id']"></label>
                                </div>
                            </div>
                            <div class="imgbox">
                                <img :src="data['goods_image']">
                            </div>
                            <div class="m-ggmsg yi">
                                <p class="name db-overflow">{{data['goods_name']}}</p>
                                <p class="price">￥ {{data['goods_price']}}</p>
                            </div>                      
                        </div>
                        <div class="mm-czbtn">
                            <div class="czm">
                                <div class="czmcheck">
                                    <div class="checkboxs">
                                        <input type="checkbox" id="AllCheck" :value="AllCheck" v-model="AllCheck" @change="selectAllCheck">
                                        <label for="AllCheck"></label>
                                    </div>
                                </div>
                                <span>全选</span>
                            </div>
                            <div class="czbtn">
                                <span @click="editEvent">取消</span>
                                <span @click="delBrowsing">删除</span>
                            </div>
                        </div>             
                    </div>
                </div>
                <div  v-if="agentShow == true">
                    <!-- 店铺 -->
                    <div class="cmshop-m" v-if="editType == '0'">
                        <ul class="expul">
                            <li v-for="(data,index) in list">
                                <div class="imgbox">
                                    <router-link :data-index=inde :to="{path:'/shopDetails',query:{id:data.agent_id,url:'trackShop'}}">
                                      <img :src="data['logo']">
                                    </router-link>
                                </div>
                                <div class="pp-msg">
                                    <router-link :data-index=inde :to="{path:'/shopDetails',query:{id:data.agent_id,url:'trackShop'}}">
                                      <p class="name db-overflow">{{data['agent_name']}}</p>
                                      <div class="address">
                                          {{data['address']}}
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
                    <!-- 店铺编辑 -->
                    <div class="cmshop-m" v-else>
                        <div class="cmspop">
                          <ul class="expul">
                            <li v-for="(data,index) in list">
                                <div class="s_goods_wrap">
                                    <div class="s_cbox">
                                        <input type="checkbox" :id="data['id']" :value="data['id']" v-model="collectData" @change="selectCheck(index)"> 
                                        <label :for="data['id']"></label>
                                    </div>
                                </div>
                                <div class="imgbox">
                                    <img :src="data['logo']">
                                </div>
                                <div class="pp-msg">
                                    <p class="name db-overflow">{{data['agent_name']}}</p>
                                    <div class="address">
                                        {{data['address']}}
                                    </div>
                                    <div class="pp-btn">
                                        <span>导航到店</span>
                                        <span class="red">全景逛店</span>
                                    </div>
                                </div>                      
                            </li>                      
                          </ul>
                        </div>
                        <div class="mm-czbtn">
                            <div class="czm">
                                <div class="czmcheck">
                                    <div class="checkboxs">
                                        <input type="checkbox" id="AllCheck" :value="AllCheck" v-model="AllCheck" @change="selectAllCheck">
                                        <label for="AllCheck"></label>
                                    </div>
                                </div>
                                <span>全选</span>
                            </div>
                            <div class="czbtn">
                                <span @click="editEvent">取消</span>
                                <span @click="delBrowsing">删除</span>
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
          list : [],
          copyList : [],
          collectData : [],
          deleteData : [],
          dataJson : {page : 0},
          nomore : false,
          noResult : false,
          loadData : true, 
          editType : '0',
          editText : '编辑',
          goodsShow : (this.$route.query.goodsShow) ? this.$route.query.goodsShow : true,
          agentShow : (this.$route.query.agentShow) ? this.$route.query.agentShow : false,
          // agentShow : false,
          AllCheck : '',
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
      if(this.agentShow)
        this.changeTags('agentShow');
      else
        this.changeTags('goodsShow');
  },
  computed: {
    
  },
  mounted(){
      this.loadMore();
  },
  methods: {
      browsingGoods(){
          var that = this;
          if ( that.loadData == true ) {
              that.dataJson.page++;
              that.loadData = false;
              that.$http.post('/Shop/Browsing/browsingGoods', that.dataJson, {emulateJSON:true}).then(function(response){
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
      browsingAgent(){
          var that = this;
          if ( that.loadData == true ) {
              that.dataJson.page++;
              that.loadData = false;
              that.$http.post('/Shop/Browsing/browsingAgent', that.dataJson, {emulateJSON:true}).then(function(response){
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
      //降序函数
      descOrder(value1,value2){
        if(value1 < value2){
            return 1;
        }else if(value1 > value2){
            return -1;
        }else {
            return 0;
        }
      },
      delBrowsing(){
        this.deleteData.sort(this.descOrder);
          if ( this.collectData.length == 0 ) {
              this.$store.commit('alert', {show:true,text: (this.goodsShow == true) ? '请选择要删除的商品' : '请选择要删除的店铺'});
              return;
          }
          var requestJson = {ids: this.collectData.join(',')};
          requestJson.browsing_type = ( this.goodsShow == true ) ? 0 : 1;
          this.$http.post('/Shop/Browsing/delBrowsing', requestJson, {emulateJSON:true}).then(function(response){
              var returnData = response['data'];
              this.$store.commit('alert', {show:true,text:returnData['message']});
              if ( returnData['status'] == '200000' ) {
                  if ( this.deleteData.length == 0 ) {
                      this.list = [];
                      this.AllCheck = '';
                  } else {
                      for (var i = 0; i < this.deleteData.length; i++) {
                          this.list.splice(this.deleteData[i], 1);
                      }
                  }
              }
          });
      },
      loadMore(){
          var that = this;
          that.$store.commit('scrollFun',{dom:'myTracks',auto:true,bottomCall:function(){           
              if ( that.nomore == false ) {
                  if ( that.goodsShow == true ) {
                      that.browsingGoods();
                  } else if ( that.agentShow == true ) {
                      that.browsingAgent();
                  }
              }
          }})
      },
      changeTags( type ){
          this.$store.commit('loading',{show:true,text:'加载中...'});
          this.list = [];
          this.dataJson.page = 0;
          this.nomore = false;
          this.noResult = false;
          this.loadData = true;
          if ( type == 'goodsShow' ) {
              this.goodsShow = true;
              this.agentShow = false;
              this.browsingGoods();
          } else
           {
              this.goodsShow = false;
              this.agentShow = true;
              this.browsingAgent();
          }
      },
      editEvent(){
          if ( this.editType == '0' ) {
              this.editText = '完成';
              this.editType = '1';
          } else {
              this.collectData = [];
              this.deleteData = [];
              this.AllCheck = '';
              this.editText = '编辑';
              this.editType = '0';
          }
      },
      selectCheck(index){
          this.AllCheck = ( this.list.length == this.collectData.length ) ? 'AllCheck' : '';
          if ( event.target.checked ) {
              this.deleteData.push(index);
          } else {
              var thatIndex = this.deleteData.indexOf(index);
              if ( thatIndex != '-1' ) {
                  this.deleteData.splice(thatIndex, 1);
              }
          }
      },
      selectAllCheck(){
          if ( event.target.checked ) {
              for( var i = 0;i < this.list.length;i++ ){
                  this.collectData.push(this.list[i].id);
                  // this.is_delIndex.push(i);
              }
          } else {
            this.collectData = [];
          }
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

