<template>
  	<div class="content">
    		<header class="head">
      			<div class="search_cate">
      				<a href="javascript:window.history.go(-1);" class="back"></a>
      				<input type="text" autofocus="autofocus" placeholder="搜索体验馆" v-model="keyword">
      				<a href="javascript:;" class="search" @click="searchGoods"></a>
      			</div>
  		</header>
  	</div>
</template>
<script>
export default {

  data () {
      return {
          keyword : '',
      }
  },
  created(){
    
  },
  computed: {
    
  },
  methods: {
      searchGoods : function(){
          if ( !this.keyword ) {
              this.$store.commit('alert',{show:true,text:'请输入搜索词'});
              return;
          }
          this.$router.push('/searchMerchantResult?keyword=' + this.keyword);
      }
  }

}
</script>

