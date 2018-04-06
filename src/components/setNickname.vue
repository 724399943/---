<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">个人设置</h1>
			<span class="text" @click="commitFun">完成</span>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<div class="user-input">
					<input type="text" name="" placeholder="请输入昵称" v-model="nickname">
				</div>
				<p class="yutips">2-10个字符，由中英文、数字、“_”、“-”组成</p>
			</div>			
		</div>
  	</div>
</template>
<script>

export default {
  data () {
    return {
      nickname : this.$route.query.nickname
    }
  },
  methods: {  
    commitFun : function(){
       this.$http.post('/Shop/User/updateUser', {nickname:this.nickname},{emulateJSON:true}).then(function(response){
          if( response.data.status == "200000" ){
            this.$store.commit('confirm',{show:true,text:response.data.message,call:function(){
                window.history.go(-1);
            }});       
          }else{
            this.nickname = "";
            this.$store.commit('alert',{show:true,text:response.data.message});
          }    
        });
    }
  }

}
</script>

