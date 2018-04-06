<template>
  	<div class="content" id="decorateACircle">
  		<header class="head">
			<h1 class="y-confirm-order-h1">装修圈</h1>
		</header>
  		<div class="main">
  			<div class="decCircle">
  				<div class="decNav">
  					<span v-bind:class="{on: firstPost}" @click="selectPost(0)">精品<em></em></span>
  					<span v-bind:class="{on: secondPost}" @click="selectPost(1)">热门<em></em></span>
  					<span v-bind:class="{on: thirdPost}" @click="selectPost(2)">最新<em></em></span>
  				</div>
  				<div class="decContent">
            <div class="decCont" v-for="(data, index) in postList">
              <router-link :to="{path: 'postDetails', query: {id: data['id']}}">
    						<div class="sign" v-if="dataJson.type == '0' || dataJson.type == '1'">{{postType}}</div>
    						<div class="dectop">
    							<h1>{{data['title']}}</h1>
    							<span>{{data['add_time'] | filterTime}}</span>
    						</div>
    						<p class="txt" v-html="data['content']"></p>
    						<div class="decUser">
    							<div class="imgbox">
    								<img :src="data['headimgurl']">
    							</div>
    							<div class="d-uname">
    								<p>{{data['nickname']}}</p>
    								<span>{{data['add_time'] | filterTime}}</span>
    							</div>
    							<div class="d-see">
    								<em></em>
    								{{data['comment_number']}}
    							</div>
                </div>
              </router-link>
            </div>
  				</div>
          <router-link to="/post">
    				<div href="javascript:;" class="dec-posting">
    					<img src="../assets/images/zxq_fb_icn@2x.png">
    				</div>
          </router-link>
  			</div>
  		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
		  dataJson : {
          type : 0,
          page : 0,
      },
      postList : [],
      loadData : true,
      postType : '精品',
      firstPost : true,
      secondPost : false,
      thirdPost : false,
	  }
	},
	created(){
		  this.$store.commit('loading',{show:true,text:'加载中...'});
      this.getPostList();
	},
  mounted(){
      this.$store.commit('loading',{show:false});
      this.loadMore();
  },
  filters:{
      filterTime:function(timestamp){
          timestamp = timestamp * 1000;
          var date = new Date();
          var now = date.getTime(); //当前时间戳

          var date = new Date();
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          var today = date.getTime(); //今天0点时间戳

          var date = new Date();
          date.setMonth(0);
          date.setDate(1);
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          var year = date.getTime(); //今年0点时间戳

          var timer = (now - timestamp) / 1000;   // 转换为秒级时间戳
          var tips = '';
          if (timer <= 0) {
              tips = '刚刚';
          } else if (Math.floor(timer/60) <= 0) {
              tips = '刚刚';
          } else if (timer < 3600) {
              tips = Math.floor(timer/60) + '分钟前';
          } else if (timer >= 3600 && (timestamp - today >= 0) ) {
              tips = Math.floor(timer/3600) + '小时前';
          // } else if (timer/86400 <= 31) {
          //     tips = Math.ceil(timer/86400) + '天前';
          } else {
              var date = new Date(timestamp);
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              tips = date.getFullYear() + '-' + month + "-" + day;
          }
          return tips;
      },
  },
	methods: {
	    getPostList(){
          var that = this;
          if ( that.loadData == true ) {
              that.dataJson.page++;
              that.loadData = false;
              that.$http.post('/Shop/Post/postList', that.dataJson, {emulateJSON:true}).then(function(response){
                  var returnData = response['data'];
                  if ( returnData['data']['list'].length ) {
                      that.postList = ( that.postList.length ) ? that.postList.concat(returnData['data']['list']) : returnData['data']['list'];
                  }
                  that.$nextTick(function () {
                      that.loadData = true;
                      this.$store.commit('loading',{show:false});
                  })
              });
          }
      },
      selectPost( type ){
          this.postList = [];
          switch ( type ) {
              case 0 :
                  this.dataJson.type = '0';
                  this.firstPost = true;
                  this.secondPost = false;
                  this.thirdPost = false;
                  this.postType = '精品';
                  break;
              case 1 :
                  this.dataJson.type = '1';
                  this.firstPost = false;
                  this.secondPost = true;
                  this.thirdPost = false;
                  this.postType = 'HOT';
                  break;
              case 2 :
                  this.dataJson.type = '2';
                  this.firstPost = false;
                  this.secondPost = false;
                  this.thirdPost = true;
                  this.postType = '';
                  break;
          }
          this.dataJson.page = 0;
          this.getPostList();
      },
      loadMore(){         
          var that = this;
          that.$store.commit('scrollFun',{dom:'decorateACircle', auto:true, bottomCall:function(){
              if ( that.nomore == false ) {                  
                  that.getPostList();
              }
          }})
      },
	}

}
</script>
