<template>
  	<div class="content" id="InforDetail">
  		<header class="head">
      <a @click="jumpToUrl" class="back"></a>
			<h1 class="y-confirm-order-h1">{{list.title}}</h1>
      <a href="javascript:;" class="topost" @click="shareFun('open')"></a>
		</header>
  		<div class="main">
  			<div class="postDetail">    
            <div class="pd-img">
                <img :src="list.image">
            </div>    
            <div class="pd-futitle">{{list.subtitle}}</div>
            <div class="pd-word" v-html="list.content"></div>
            <div class="pd-eva">
                <p class="title">{{list.comment_number}}条评论</p>
                <ul class="pd_evaul">
                    <li v-for="(item,index) in commentList">
                        <div class="evaTop">
                          <div class="imgbox">
                              <img :src="item.headimgurl">
                          </div>
                          <p class="name">{{item.nickname}}</p>
                          <span class="time">{{item.add_time | time}}</span>
                        </div>
                        <p class="evacont">{{item.contain}}</p>
                    </li>                    
                </ul>
                <div class="pd-evatotal">
                    <div class="evlf">
                        浏览 {{list.view_number}} · 评论 {{list.comment_number}}
                    </div>
                    <div class="evrg">
                        <div class="rg" @click="toCollect">
                            <em class="collect" :class="{on:isCollect == 1}"></em>
                            收藏
                        </div>
                        <div class="rg" @click="processText(1)">
                            <em class="comment"></em>
                            评论
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评论 -->
        <div class="mask" v-bind:style="{display: maskStyle}" @click="processText(0)"></div>
        <div class="evainput" v-bind:style="{display: evainputStyle}">
            <div class="llint">
                <input type="text" name="" v-model="content" @focus="onfocusFun()">
                <a href="javascript:;" class="evaset" @click="toComment">发送</a>
            </div>
        </div>
        <!-- 分享弹窗 -->
        <div class="mask" :class="{ fadeIn:is_share == 1,fadeOut:is_share == 0 }" v-if="is_share == 1" @click="shareFun('close')"></div>
        <div class="ggshare_window" :class="{ fadeIn:is_share == 1,fadeOut:is_share == 0 }" v-if="is_share == 1">
          <div class="g_btn">
            <a @click="share('wechat')">
              <em class="icon"><i></i>微信好友</em>
            </a>
            <a @click="share('wechat_moments')">
              <em class="icon"><i></i>微信朋友圈</em>
            </a>        
            <a @click="share('sina_weibo')">
              <em class="icon"><i></i>新浪微博</em>
            </a>
          </div>      
        </div>
  		</div>
  	</div>
</template>
<script>

export default {

	data () {
		return {
       url : (this.$route.query.url) ? this.$route.query.url : '',
			 list : {},
       isCollect : "",
       hasAjax:0,
       page : 1,
       commentList : [],
       maskStyle : 'none',
       evainputStyle : 'none',
       content : "",
       bfscrolltop : '',
       interval : null,
       collectId : '0',
       is_share : 0,
	  }
	},
	created(){
		this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
    this.bfscrolltop = document.body.scrollTop;
	},
	mounted(){
    this.$store.commit('loading',{show:false});
    this.loadMore();
  },
	methods: {
	    getData(){
        this.$http.post('/Shop/Article/articleDetail', {id:this.$route.query.id},{emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
                this.list = response.data.data.list;   
                this.isCollect = response.data.data.is_collect;   
                this.collectId = response.data.data.collect_id;                           
            }   
            this.getComment();
        });
      },
      getComment(){
        if( this.hasAjax == 0 ){
          this.hasAjax = 1;
          this.$http.post('/Shop/Article/articleComment', {id:this.$route.query.id,page:this.page},{emulateJSON:true}).then(function(response){ 
            this.hasAjax = 0;
            if( this.page == 0 ){
              this.commentList = response.data.data.list;
              this.page++;              
            }else{
              if( response.data.data.list.length == 0 ){                
                this.hasAjax = 1;
              }else{
                this.page++;
                this.commentList = this.commentList.concat(response.data.data.list);
              }
            }
            this.$store.commit('loading',{show:false});                               
            });

        }
      },
      loadMore(){         
          var that = this;
          this.$store.commit('scrollFun',{dom:'InforDetail',auto:true,bottomCall:function(){           
            that.getComment();
          }})
      },
      toCollect(){
        var that = this;
        if ( that.collectId != '0' ) {
          var requestJson = {ids:that.collectId,type:2};
          that.$http.post('/Shop/Collect/delCollect', requestJson, {emulateJSON:true}).then(function(response){
            var returnData = response['data'];
            if ( returnData['status'] == '200000' ) {
                that.isCollect = false;
                that.collectId = '0';
            } else {
                that.$store.commit('alert', {show:true,text:returnData['message']});
            }
          });
        } else {
            var requestJson = {id:that.$route.query.id,type:2};
          that.$http.post('/Shop/Collect/toCollect', requestJson, {emulateJSON:true}).then(function(response){
            var returnData = response['data'];
            if ( returnData['status'] == '200000' ) {
                that.isCollect = true;
                that.collectId = returnData['data']['collect_id'];
            } else {
                that.$store.commit('alert', {show:true,text:returnData['message']});
            }
          });
        }
      },
      toComment(){
          var that = this;
          if ( !that.content ) {
              that.$store.commit('alert', {show:true,text:'评论不能为空~'});
              return;
          }
          that.$http.post('/Shop/Article/toComment',{id:this.$route.query.id,contain:this.content}, {emulateJSON:true}).then(function(response){
              var returnData = response['data'];
              if ( returnData['status'] == '200000' ) {
                  that.$store.commit('alert', {show:true,text:'评论成功'});
                  that.processText(0);
                  var commentData = {};
                  commentData['add_time'] = Date.parse(new Date()) / 1000;
                  commentData['contain'] = that.content;
                  commentData['nickname'] = returnData['data']['user']['nickname'];
                  commentData['headimgurl'] = returnData['data']['user']['headimgurl'];
                  that.commentList.unshift(commentData);
                  that.content = '';
                  that.list.comment_number++;
              } else {
                  that.$store.commit('alert', {show:true,text:returnData['message']});
              }
          });
      },
      processText(type){
          if ( type == 1 ) {
              this.maskStyle = 'block';
              this.evainputStyle = 'block';
          } else {  
              this.maskStyle = 'none';
              this.evainputStyle = 'none';
          }
      },      
      onfocusFun : function(){
        var t = setTimeout(function(){
            document.body.scrollTop = document.body.scrollHeight;
        },700);
      },
      shareFun : function(type){
        if( type == "open" ){
          this.is_share = 1;        
        }else{
          this.is_share = 0;
        }
      },
      share(type){
        var text = encodeURI(this.list['title']),
          image = this.webSite + this.list['image'],
          uri = encodeURIComponent(this.shareUrl);
        window.location.href = "mitchell://share?type="+ type +"&image="+ image +"&text="+ text +"&url="+ uri;
      },
      jumpToUrl(){
        if(this.url == 'collectionArticle')
          this.$router.push({path: '/myCollection',query:{is_tab : 'article'}});
        else
          window.history.go(-1);
      }
	}

}
</script>
