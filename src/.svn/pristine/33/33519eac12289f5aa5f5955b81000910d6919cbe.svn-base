<template>
  	<div class="content">
  		<header class="head">
  			<a href="javascript:window.history.go(-1);" class="back"></a>
			 <h1 class="y-confirm-order-h1">选择城市</h1>
		</header>
		<div class="main">
			<div class="slCity">
				<h1>--------- 已上线城市 ---------</h1>
				<ul>
					<li v-for="(data,index) in list" @click="selectCity(data['id'],data['region_name'])">{{data['region_name']}}</li>
				</ul>
				<h1 class="gu">--------- 敬请期待更多城市上线 ---------</h1>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      list : [],
    }
  },
  created(){
    this.getCity();
  },
  computed: {
    
  },
  methods: {
    getCity(){
        this.$http.post('/Shop/Region/getCity', {},{emulateJSON:true}).then(function(response){
            var returnData = response['data'];
            if( returnData['status'] == "200000" ){
                this.list = returnData['data']['list'];
                console.log(this.list);
            }
        });
    },
    selectCity(region_id,region_name){
        localStorage.region_name = region_name;
        localStorage.region_id = region_id;
        this.$router.push('/');
    }
  }

}
</script>

