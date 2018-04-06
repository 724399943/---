<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">设置</h1>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li>
						<router-link to="/userInfo">
							<span>个人设置</span>
							<i></i>
						</router-link>
					</li>
					<li>
						<router-link to="/feedback">
							<span>意见反馈</span>
							<i></i>
						</router-link>
					</li>
					<li>
						<router-link to="/aboutUs">
							<span>关于我们</span>
							<i></i>
						</router-link>
					</li>
					<li v-if="wechatAgent == false">
						<a href="mitchell://upgrade">
							<span>检查更新</span>
							<i></i>
						</a>
					</li>					
				</ul>
			</div>
			<a href="javascript:;" class="widup" @click="logout">退出登录</a>
			<!-- 弹窗 -->
			<div class="windmask" style="display:none;">
				<div class="setUpbox">
					<p>已经是最新版本</p>
					<a href="javascript:;">确定</a>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			userAgent : navigator.userAgent.toLowerCase(),
			wechatAgent : false,
		}
	},
	created(){
		this.wechatAgent = ( this.userAgent.indexOf('micromessenger') != -1 ) ? true : false;
	},
	computed: {

	},
	methods: {
		logout(){
			this.$http.post('/Shop/Login/logout', {}, {emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    localStorage.clear();
                    this.$router.push({name: 'login'});
                } 
            });
		},
		checkUpdates(){
			this.$http.post('/Shop/Public/checkUpdates', {}, {emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    localStorage.clear();
                    this.$router.push({name: 'login'});
                } 
            });
		}
	}

}
</script>

