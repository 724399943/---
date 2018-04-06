<template>
  	<div class="content" id="SystemMessage">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">消息</h1>
		</header>
		<div class="main">
			<div class="sysNews_wrap">
				<ul>
					<li v-for="(item,index) in messageList">
						<router-link :to="{path:'/messageDetail',query:{id:item.id}}">
							<p class="time">{{item.add_time | time}}</p>
							<div class="sysbox">
								<div class="imgbox">
									<img :src="item.image">
								</div>
								<p class="cont db-overflow">{{item.title}}</p>
								<a href="javascript:;" class="seenews">查看详情</a>
							</div>
						</router-link>
					</li>					
				</ul>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      messageList : [],
      hasAjax:0,
      page : 1
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getSystemMessage();
  },
  mounted(){
    this.$store.commit('loading',{show:false});
    this.loadMore();
  },
  methods: {
    getSystemMessage(){
  		if( this.hasAjax == 0 ){
          this.hasAjax = 1;
          this.$http.post('/Shop/Message/systemMessage', {page:this.page},{emulateJSON:true}).then(function(response){ 
            this.hasAjax = 0;
            if( this.page == 0 ){
              this.messageList = response.data.data.list;
              this.page++;              
            }else{
              if( response.data.data.list.length == 0 ){                
                this.hasAjax = 1;
              }else{
                this.page++;
                this.messageList = this.messageList.concat(response.data.data.list);
              }
            }
            this.$store.commit('loading',{show:false});                               
            });
        }
  	},
    loadMore(){         
        var that = this;
        this.$store.commit('scrollFun',{dom:"SystemMessage",auto:true,bottomCall:function(){           
        	that.getSystemMessage();
        }})
    }
  }

}
</script>

