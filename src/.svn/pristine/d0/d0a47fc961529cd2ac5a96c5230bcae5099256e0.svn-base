<template>
  	<div class="content">
  		<div class="centerWarp">
  			<div class="u-top">
				<router-link to="/setUp" class="u-top-setting"></router-link>
				<router-link to="/messageIndex" class="u-top-msg" v-if="is_sign == 1">
					<i :class="{on: notRead}"></i>
				</router-link>
				<router-link to="/login" class="u-top-msg" v-else>
					<i></i>
				</router-link>				
				<div class="u-top-wrap">
					<router-link to="/userInfo" class="u-top-user" v-if="is_sign == 1">
						<div class="imgbox">
							<img :src="userInfo.headimgurl">
						</div>
						<span>{{userInfo.nickname}}</span>
						<p>{{phoneShow}}</p>
					</router-link>
					<!-- 未登录 -->
					<div class="u-top-user" v-else>
						<div class="imgbox">
							<img src="../assets/images/wd_mrtx_pic@2x.png">
						</div>
						<div class="u-user-btn">
							<router-link to="/login">登录</router-link>
							<span>/</span>
							<router-link to="/register">注册</router-link>
						</div>
					</div>
				</div>					
			</div>
			<div class="ysecline">				
				<div class="ym-setboxsec">
					<router-link :to="{path:'/orderList',query:{status:-1}}" class="title" v-if="is_sign == 1">
						<span>我的订单</span> 
						<p class="y-fr">查看全部订单</p>
						<i></i>
					</router-link>
					<router-link to="/login" class="title" v-else>
						<span>我的订单</span> 
						<p class="y-fr">查看全部订单</p>
						<i></i>
					</router-link>					
				</div>
				<div class="ymysetbox-tab clearfix">
					<router-link :to="{path:'/orderList',query:{status:0}}" class="ybox" v-if="is_sign == 1">
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待付款
					</router-link>
					<router-link to="/login" class="ybox" v-else>
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待付款
					</router-link>					
					<router-link :to="{path:'/orderList',query:{status:1}}" class="ybox" v-if="is_sign == 1">
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待发货
					</router-link>
					<router-link to="/login" class="ybox" v-else>
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待发货
					</router-link>					
					<router-link :to="{path:'/orderList',query:{status:2}}" class="ybox" v-if="is_sign == 1">
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待收货
					</router-link>	
					<router-link to="/login" class="ybox" v-else>
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待收货
					</router-link>				
					<router-link :to="{path:'/orderList',query:{status:3}}" class="ybox" v-if="is_sign == 1">
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待评价
					</router-link>
					<router-link to="/login" class="ybox" v-else>
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						待评价
					</router-link>
					<router-link :to="{name: 'returnsAfterSales', query: {url:'personal'}}" class="ybox" v-if="is_sign == 1">
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						退货
					</router-link>	
					<router-link to="/login" class="ybox" v-else>
						<div class="icondiv">
							<i class="icon"></i>
						</div>
						退货
					</router-link>					
				</div>
				<div class="p_cen_m">
					<div class="ppcm">
						<router-link to="/myPoints" v-if="is_sign == 1">
							<span class="pt">{{userInfo.point}}</span>
							<span>积分</span>
						</router-link>
						<router-link to="/login" v-else>
							<span class="pt">0</span>
							<span>积分</span>
						</router-link>
						<router-link to="/myCoupons" v-if="is_sign == 1">
							<span class="pt">{{count}}</span>
							<span>优惠券</span>
						</router-link>
						<router-link to="/login" v-else>
							<span class="pt">0</span>
							<span>优惠券</span>
						</router-link>
					</div>
					<ul>
						<li>
							<router-link to="/myTracks" v-if="is_sign == 1">
								<em class="ico1"></em>
								<span class="s1">我的足迹</span>
								<em class="ei"></em>
							</router-link>
							<router-link to="/login" v-else>
								<em class="ico1"></em>
								<span class="s1">我的足迹</span>
								<em class="ei"></em>
							</router-link>
						</li>						
						<li>
							<router-link to="/consigneeList" v-if="is_sign == 1">
								<em class="ico2"></em>
								<span class="s1">收货地址</span>
								<em class="ei"></em>
							</router-link>
							<router-link to="/login" v-else>
								<em class="ico2"></em>
								<span class="s1">收货地址</span>
								<em class="ei"></em>
							</router-link>
						</li>						
						<li>
							<router-link to="/myCollection" v-if="is_sign == 1">
								<em class="ico3"></em>
								<span class="s1">我的收藏</span>
								<em class="ei"></em>
							</router-link>
							<router-link to="/login" v-else>
								<em class="ico3"></em>
								<span class="s1">我的收藏</span>
								<em class="ei"></em>
							</router-link>
						</li>						
						<li v-if="wechatAgent == false">
							<a href="javascript:;" @click="shareFun('open')">
								<em class="ico4"></em>
								<span class="s1">邀请好友</span>
								<span class="sjf">推荐送积分</span>
								<em class="ei"></em>
							</a>							
						</li>
						<li>
							<router-link to="/myPost" v-if="is_sign == 1">
								<em class="ico5"></em>
								<span class="s1">我发布的帖子</span>
								<em class="ei"></em>
							</router-link>	
							<router-link to="/login" v-else>
								<em class="ico5"></em>
								<span class="s1">我发布的帖子</span>
								<em class="ei"></em>
							</router-link>							
						</li>
						<li>
							<router-link to="/applyForAdmission">
								<em class="ico6"></em>
								<span class="s1">申请入驻</span>
								<em class="ei"></em>
							</router-link>							
						</li>
					</ul>
				</div>
			</div>
  		</div>
  		<!-- 分享 -->
		<div class="mask" :class="{fadeIn:is_share==1,fadeOut:is_share==0}" @click="shareFun('close')"></div>
		<div class="ppcshare" :class="{slideUp:is_share==1,slideDown:is_share==0}">
			<div class="g_btn">
				<a @click="share('wechat')">
					<em class="icon"><i></i>微信好友</em>
				</a>
				<a @click="share('wechat_moments')">
					<em class="icon"><i></i>朋友圈</em>
				</a>				
				<a @click="share('sina_weibo')">
					<em class="icon"><i></i>微博</em>
				</a>
			</div>
		</div>
  	</div>
</template>
<script>

export default {

	data () {
		return {
			userInfo : {},
			phoneShow : "",
			count : "",
			is_share : 0,
			is_sign : 0,
			notRead : false,
			userAgent : navigator.userAgent.toLowerCase(),
			wechatAgent : false,
			shareText : '送你一个大礼包，快来领取吧',
			shareUrl : window.location.href,
			logo : '',
			webSite : '',
		}
	},
	created(){
		this.wechatAgent = ( this.userAgent.indexOf('micromessenger') != -1 ) ? true : false;
		this.$store.commit('loading',{show:true,text:'加载中...'});
		this.getUserInfo();
	},    
	mounted(){
		this.$store.commit('loading',{show:false});
	},
	watch : {
		'$store.state.messageData':'initMessage',
	},
	methods: {
		getUserInfo(){
			this.$http.post('/Shop/User/userInfo', {}, {emulateJSON:true}).then(function(response){
				var returnData = response['data'];
		     	if( returnData.status == 200000 ){
		    		this.userInfo = returnData.data.list; 
		    		var str = this.userInfo.phone.substring(3,7);
					this.phoneShow = this.userInfo.phone.replace(str,'****');
					this.logo = returnData.logo;
					this.webSite = returnData.webSite;
					if ( returnData['data']['is_temp'] == '0' ) {
						this.is_sign = 1;
						this.getCoupons();
						this.notReadMessage();
						this.shareUrl = this.shareUrl.replace('personalCenter', 'invitationPage') +'?id='+ this.userInfo['id'];
					}
		    	}else{
		    		this.is_sign = 0;
		    	}    
		  	});
		},
		notReadMessage(){
			this.$http.post('/Shop/Message/notReadMessage', {}, {emulateJSON:true}).then(function(response){
				var returnData = response['data'];
		     	if( returnData.status == 200000 ){
		    		console.log(returnData['data']);
		    		this.notRead = ( parseInt(returnData['data']['list']) > 0 ) ? true : false;
		    		// this.initMessage();
		    		if ( this.notRead !== true ) {
		    			this.initMessage();
		    		}
		    	}
		  	});
		},
		//保证停在首页时显示红点
		initMessage(){
			var messageList = localStorage.messageList;
			// console.log(messageList);
			if ( messageList ) {
				messageList = JSON.parse(messageList);
                var total = 0;
                for ( var i=0; i<messageList.length; i++ ) {
                   var data = messageList[i];
                   total += parseInt(data['total']);
                }
                this.notRead = ( total > 0 ) ? true : false;
			}else{
				this.notRead = false;
			}
		},
		getCoupons(){
			this.$http.post('/Shop/Coupon/userCoupon', {},{emulateJSON:true}).then(function(response){
				var returnData = response['data'];
		     	if( returnData.status == "200000" ){
		    		this.count = returnData.data.list.length;
		    	}    
		  	});	
		},
		shareFun : function(type){
			if( type == "open" ){
				this.is_share = 1;
			}else{
				this.is_share = 0;
			}
		},
		share(type){
			var text = encodeURI(this.shareText),
				// image = encodeURIComponent(this.webSite + this.logo),
				image = this.webSite + this.logo,
				uri = encodeURIComponent(this.shareUrl);
			window.location.href = "mitchell://share?type="+ type +"&image="+ image +"&text="+ text +"&url="+ uri;
		}
	}

}
</script>

