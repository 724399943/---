<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">关于我们</h1>
		</header>
		<div class="main">
			<div class="busiInt_cont posit">
				<!-- <div class="inforDetail_img">
					<img src="http://placehold.it/350x150">
				</div> -->
				<div class="inforCont" v-html="list.content">
					
				</div>	
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : {}
    }
  },
  created(){
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getData();
  },    
  mounted(){
  	this.$store.commit('loading',{show:false});
  },
  methods: {
    getData(){
    	this.$http.post('/Shop/Article/articleDetail', {sign:'aboutUs'},{emulateJSON:true}).then(function(response){
         	if( response.data.status == "200000" ){
        		this.list = response.data.data.list;         		                  
        	}    
      	});	
    }
  }

}
</script>

