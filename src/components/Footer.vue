<template>
	<!-- 底部固定菜单 -->
    <footer class="y-ycar-foot">
      	<router-link to="/" :class="{on : $store.state.isActive == 'index'}">
        	<em class="icon"><i></i>首页</em>
      	</router-link>
      	<router-link to="/categoryList" :class="{on : $store.state.isActive == 'categoryList'}">
        	<em class="icon"><i></i>分类</em>
      	</router-link>
      	<router-link to="/decorateACircle" :class="{on : $store.state.isActive == 'decorateACircle'}">
        	<em class="icon"><i></i>装修圈</em>
      	</router-link>
      	<router-link to="/shoppingCart" :class="{on : $store.state.isActive == 'shoppingCart'}">
        	<em class="icon"><i></i>购物车</em>
      	</router-link>
      	<router-link to="/personalCenter" :class="{on : $store.state.isActive == 'personalCenter'}">
        	<em class="icon"><i></i>我的</em>
      	</router-link>
    </footer>	
</template>
<script>
export default {

	data () {
		return {			
	    }
	},
	watch : {
    		
	}

}
</script>