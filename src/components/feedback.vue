<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">意见反馈</h1>
		</header>
		<div class="main">
			<div class="releaseNews">
				<ul>
					<li>
						<div class="rel_text">
              <p>请输入您的反馈( 不少于5个字 )</p>
							<textarea placeholder="输入您的建议或问题" maxlength="200" class="fkui" v-model="text"></textarea>
						</div>
					</li>
				</ul>
				<a href="javascript:;" class="widup" @click="commitFun">提交</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      text : ""
    }
  },  
  methods: {
    commitFun : function(){    	
    	this.$http.post('/Shop/User/userFeedback', {text:this.text},{emulateJSON:true}).then(function(response){
    		this.text = "";
         	if( response.data.status == 200000 ){
        		this.$store.commit("alert",{show:true,text:response.data.message});       		                  
        	}else{
        		this.$store.commit("alert",{show:true,text:response.data.message});       		                  
        	}
      	});	
    }
  }

}
</script>

