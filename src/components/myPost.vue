<template>
  	<div class="content" id="MyPost">
  		<header class="head">
      <router-link to="/personalCenter">
			 <a class="back" href=""></a>
      </router-link>
			<h1 class="y-confirm-order-h1">我的帖子</h1>
		</header>
		<div class="main">
			<div class="mmpp-main">
				<ul class="inforUl">
          <li class="mmpli mpd" v-for="(item,index) in list" :class="{on:item.is_delete == 1}">
              <div class="pp-msg">
                  <p class="pname">{{item.title}}</p>
                  <div class="sju">
                      <span class="look">{{item.view_number}}</span>
                      <span class="live">{{item.comment_number}}</span>
                  </div>
              </div>
              <div class="mmp-rg">
              	<p>{{item.add_time | time("yyyy-MM-dd hh:mm:ss")}}</p>
              	<p><router-link :to="{name: 'editPost', query: {id: item.id}}" class="mpt" v-if="item.is_delete == 0">编辑</router-link><a href="javascript:;" class="mpt" @click="delPost('open',item.id,index)">删除</a></p>
              </div>                        
          </li>                   
      </ul>
			</div>
			<!-- 退出弹窗 -->
       <div class="mmomask" v-if="is_del == 1">
            <div class="mmadelBox">
                <p>删除帖子后将不能找回，<br>确认删除吗？</p>
                <div class="btn">
                    <span @click="delPost('close')">暂不删除</span>
                    <span class="line" @click="delPost('sure')">确认删除</span>
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
      hasAjax:0,
      page : 1,
      is_del : 0,
      is_delID : "",
      is_delIndex : ""
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
    getData(){
      if( this.hasAjax == 0 ){
          this.hasAjax = 1;
          this.$http.post('/Shop/Post/userPost', {page:this.page},{emulateJSON:true}).then(function(response){ 
            this.hasAjax = 0;
            if( this.page == 0 ){
              this.list = response.data.data.list;
              this.page++;              
            }else{
              if( response.data.data.list.length == 0 ){                
                this.hasAjax = 1;
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
        this.$store.commit('scrollFun',{dom:"MyPost",auto:true,bottomCall:function(){           
          that.getData();
        }})
    },
    delPost(type,id,index){
      if( type == "open" ){
        this.is_delID = id;
        this.is_delIndex = index;
        this.is_del = 1;
      }else if( type == "close" ){
        this.is_delID = "";
        this.is_del = 0;
      }else{     
        this.$http.post('/Shop/Post/delPost', {id:this.is_delID},{emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
              this.is_del = 0;
              this.is_delID = "";
              // this.list[this.is_delIndex].is_delete = 1;
              this.list.splice(this.is_delIndex, 1);
              this.$store.commit('alert',{show:true,text:response.data.message});                  
              this.is_delIndex = "";
            }    
        });
      }
    }
  }

}
</script>

