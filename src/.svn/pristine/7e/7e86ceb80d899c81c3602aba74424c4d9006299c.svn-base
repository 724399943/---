<template>
  	<div class="content" id="MyCont">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">我的积分</h1>			
		</header>
		<div class="main">
			<div class="recordWrap">
        <div class="mppsTop">
            <p><span>{{userInfo.point}}</span> 积分</p>
        </div>
				<div class="set_d_list">
          <a href="javascript:;">积分明细</a>
					<ul>
						<li v-for="(item,index) in list">
							<div class="lf">
								<p class="tt" v-if="item.event_type == 0">签到</p>
                <p class="tt" v-else-if="item.event_type == 1">购物</p>
                <p class="tt" v-else-if="item.event_type == 2">分享</p>
                <p class="tt" v-else-if="item.event_type == 3">邀请好友</p>
                <p class="tt" v-else-if="item.event_type == 4">文章加精</p>
								<p class="time">{{item.add_time | time}}</p>                
							</div>
              <div class="rg">  
                  <span v-if="item.type == 1">+{{item.num}}</span>
              </div>
						</li>						
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
      hasAjax:0,
      page : 1,
      userInfo : {}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getUserInfo();
    this.getData();
  },
  mounted(){
    this.loadMore();
    this.$store.commit('loading',{show:false});
  },
  methods: {
    getUserInfo(){
      this.$http.post('/Shop/User/userInfo', {},{emulateJSON:true}).then(function(response){
          if( response.data.status == "200000" ){
            this.userInfo = response.data.data.list;                    
          }    
        });
    },
    getData(){
      if( this.hasAjax == 0 ){
        this.hasAjax = 1;
        this.$http.post('/Shop/Point/pointLog', {page:this.page},{emulateJSON:true}).then(function(response){ 
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
        this.$store.commit('scrollFun',{dom:"MyCont",auto:true,bottomCall:function(){           
          that.getData();
        }})
    }
  }

}
</script>

