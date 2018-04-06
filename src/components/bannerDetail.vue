<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">{{list.title}}</h1>
		</header>
		<div class="main">
			<div class="busiInt_cont posit">
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
      dataJson : {
        id : this.$route.query.id,
      },
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
    	this.$http.post('/Shop/Index/bannerDetail', this.dataJson, {emulateJSON:true}).then(function(response){
          var returnData = response['data'];
         	if( returnData.status == "200000" ){
        		this.list = returnData.data.list;         		                  
        	}    
      	});	
    }
  }

}
</script>

