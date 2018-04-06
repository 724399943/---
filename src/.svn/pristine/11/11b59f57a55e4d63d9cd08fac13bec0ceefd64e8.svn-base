<template>
  	<div class="content" id="DecoInform">
    		<header class="head">
      			<div class="search_cate">
      				<a href="javascript:window.history.go(-1);" class="back"></a>
      				<h1 class="y-confirm-order-h1">装修资讯</h1>
      			</div>
  		  </header>
        <div class="main">
            <div class="decInform">
                <div class="decNav">
                    <div class="dntop" id="Jdntop">
                        <span :class="{on:group_id == 0}" id="all" @click="tabFun(0)">全部<em></em></span> 
                        <span v-for="(gr,index) in groupList" :class="{on : gr.id == group_id}" @click="tabFun(gr.id)">{{gr.group_name}}<em></em></span>                         
                    </div>
                </div>
                <div class="decCont">
                    <ul class="inforUl">
                      <template v-for="(ar,index) in articleList">
                        <router-link :to="{path:'/informationDetail',query:{id:ar.id}}">
                          <li>
                              <div class="pp-msg">
                                  <p class="db-overflow">{{ar.title}}</p>
                                  <div class="sju">
                                      <span class="look">{{ar.view_number}}</span>
                                      <span class="live">{{ar.collect_number}}</span>
                                  </div>
                              </div>
                              <div class="imgbox">
                                  <img :src="ar.image">
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
      groupList : [],
      articleList : [],
      hasAjax:0,
      page : 1,
      group_id : ''
    }
  },
  created(){
      this.$store.commit('loading',{show:true,text:'加载中...'});
      this.getArticleGroup();
  },
  mounted(){
      this.$store.commit('loading',{show:false});
      this.loadMore();
      this.scrollX();
  },
  methods: {
    getArticleGroup : function(){
        this.$http.post('/Shop/Article/articleGroup', {},{emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
                this.groupList = response.data.data.list;   
                this.setNavWidth();
                this.getArticleList();                 
            }   
        });
    },
    setNavWidth : function(){
        var Jdntop = document.getElementById('Jdntop');   
        var elw = document.getElementById('all').clientWidth;
        var _size = this.groupList.length;
        var _width = elw * (_size+2);
        Jdntop.style.width = _width +'px';
    },
    getArticleList : function(){
        if( this.hasAjax == 0 ){
          this.hasAjax = 1;
          this.$http.post('/Shop/Article/articleList', {group_id:this.group_id,page:this.page},{emulateJSON:true}).then(function(response){ 
            this.hasAjax = 0;
            if( this.page == 0 ){
              this.articleList = response.data.data.list;
              this.page++;              
            }else{
              if( response.data.data.list.length == 0 ){                
                this.hasAjax = 1;
              }else{
                this.page++;
                this.articleList = this.articleList.concat(response.data.data.list);
              }
            }
            this.$store.commit('loading',{show:false});                               
            });

        }        
    },
    tabFun : function(id){
      this.group_id = id;
      this.hasAjax = 0;
      this.page = 1;
      this.articleList = [];
      this.getArticleList();
    },
    loadMore(){
        var startX = 0, startY = 0;
        var that = this;
      function touchSatrtFunc(evt) {
          try
          {
              var touch = evt.touches[0]; //获取第一个触点  
              var x = Number(touch.clientX); //页面触点X坐标  
              var y = Number(touch.clientY); //页面触点Y坐标  
              //记录触点初始位置  
              startX = x;
              startY = y;

          } catch (e) {
              alert( e.message);
          }
      }
      document.getElementById('DecoInform').addEventListener('touchstart', touchSatrtFunc, false);
      document.getElementById('DecoInform').addEventListener('touchmove',scrlllfunction,false);
      function scrlllfunction (ev){
          var _point = ev.touches[0];
          var _top,_sh,_dh,bottomAdr
              _top = document.body.scrollTop;                
              _sh = document.body.scrollHeight;
              _dh = window.innerHeight;
          console.log(_point.clientY,_top)
          console.log( window.innerHeight)
            // 什么时候到底部
           bottomAdr = _sh - _dh;
          //判断是否滚到底部加载更多
          if(_top >= bottomAdr-40 && _point.clientY < startY){
            console.log('dsdsd')
            that.getArticleList();
          }
          // 到达顶端
          if (_top === 0) {
              // 阻止向下滑动
              if (_point.clientY > startY) {
                  
              } else {
                  // 阻止冒泡
                  // 正常执行
                  ev.stopPropagation();
              }
          } else if (_top == bottomAdr) {
              // 到达底部
              // 阻止向上滑动
              if (_point.clientY < startY) {
                  //ev.preventDefault();
              } else {
                  // 阻止冒泡
                  // 正常执行
                  ev.stopPropagation();
              }
          } else if (_top > 0 && _top < bottomAdr) {
              ev.stopPropagation();
          } else {
              //ev.preventDefault();
          }
      }
    },
    scrollX(){         
        var that = this;
      //  this.$store.commit('scrollFun',{dom:'Jdntop', auto:false})
    }
  }

}
</script>