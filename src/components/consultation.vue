<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">{{aname}}</h1>
			<!-- <a href="tel:12345678"><span class="call"></span></a> -->
		</header>
		<div class="main">
			<div class="imchat_wrap">    
			    <div id="em-kefu-webim-chat" class="em-widget-wrapper">
			        <div id="em-widgetBody" class="em-widgetBody-wrapper diyScroll">
			            <div class="em-widget-chat">
			            	<div class="em-chat-goods" v-if="isNeedGoods == 1">
			            		<div class="e-goods-m">
			            			<div class="imgbox">
				            			<img :src="goodsData['goods_image']">
				            		</div>
				            		<div class="g-msg">
				            			<p class="name db-overflow">{{goodsData['goods_name']}}</p>
				            			<p class="price">￥{{goodsData['goods_price']}}</p>
				            		</div>
			            		</div>
			            	</div>
			            	<div v-for="(data,index) in messageList">
			            		<div class="em-widget-date"><span>{{data['time']}}</span></div>
				                <div class="em-widget-left" v-if="data['method'] == 'receive'">
				                    <div class="em-widget-msg-wrapper">
				                        <i class="icon-corner-left">
				                        	<img :src="data['ext']['headimgurl']">
				                        </i>
				                        <div class="em-widget-msg-container em-widget-msg-txt" v-if="data['messageType'] == 'txt'">
				                            <span>{{data['data']}}</span>
				                        </div>
				                        <div class="em-widget-msg-container em-widget-msg-img" v-if="data['messageType'] == 'img'">
				                            <a href='javascript:;'>
				                            	<img class='em-widget-imgview' :src="data['url']">
				                            </a>
				                        </div>
				                        <!-- <div class="emcaoTips">
				                        	<div class="triangle-up"></div>
				                        	<div class="operation">
				                        		<span>删除</span>
				                        		<span>|</span>
				                        		<span>复制</span>
				                        	</div>
				                        </div> -->
				                    </div>
				                </div>
				                <div class="em-widget-right" v-else>
				                    <div class="em-widget-msg-wrapper">
				                        <i class="icon-corner-right">
				                        	<img :src="data['ext']['headimgurl']">
				                        </i>
				                        <div class="em-widget-msg-container em-widget-msg-txt" v-if="data['messageType'] == 'txt'">
				                            <span>{{data['data']}}</span>
				                        </div>
				                        <div class="em-widget-msg-container em-widget-msg-img" v-if="data['messageType'] == 'img'">
				                            <a href='javascript:;'>
				                            	<img class='em-widget-imgview' :src="data['url']">
				                            </a>
				                        </div>
				                        <!-- <div class="emcaoTips">
				                        	<div class="triangle-up"></div>
				                        	<div class="operation">
				                        		<span>删除</span>
				                        		<span>|</span>
				                        		<span>复制</span>
				                        	</div>
				                        </div> -->
				                    </div>
				                </div>
				                <!-- <div class="em-widget-left">
				                    <div class="em-widget-msg-wrapper">
				                        <i class="icon-corner-left">
				                        	<img src="http://placehold.it/350x150">
				                        </i>
				                        <div class="em-widget-msg-container em-widget-msg-txt">
				                            <div class="e-goods-m">
						            			<div class="imgbox">
							            			<img src="http://placehold.it/350x150">
							            		</div>
							            		<div class="g-msg">
							            			<p class="name db-overflow">时尚灯具时尚灯具时尚灯具时尚灯具时尚灯具时尚灯具时尚灯具时尚灯具</p>
							            			<p class="price">￥29.00</p>
							            		</div>
						            		</div>
				                        </div>			                        
				                    </div>
				                </div> -->
			            	</div>
			            </div>
			        </div>
			        <div id=em-widgetSend class=em-widget-send-wrapper :class="{slideUp:slideUp,slideDown:slideDown}">
			            <div class=toolbar>
			           		<i class="em-add-open icon-face e-face fg-hover-color" title=功能 id="openFun" @click="openFun"></i>
			           		<i class="em-address-ye icon-face e-face fg-hover-color" title=发送 id="sendPrivateText" @click="sendPrivateText"></i>
			                <!-- <div contenteditable="true" spellcheck=false id="talkInputId">请输入文字</div> -->
			                <input type="text" id="talkInputId" placeholder="请输入文字" class=em-widget-div v-model="msg">
			            </div>
			            <div class="open-upload-box" id="OuploadImg">
			            	<div class="o_up_main">
			            		<div class="imgbox">
			            			<img src="../assets/images/chat_upload_img.png">
			            			<input id=em-widget-img-input type=file class=upload-img-container accept="image/*;capture=camera" @change="sendPrivateImg"> 
			            		</div>
			            		<p>图片</p>
			            	</div>
			            	<div class="o_up_main">
			            		<div class="imgbox">
			            			<img src="../assets/images/chatPhotograph.png">
			            			<input id=em-widget-img-input type=file class=upload-img-container accept="image/*;capture=camera" @change="sendPrivateImg"> 
			            		</div>
			            		<p>拍照</p>
			            	</div>
			            </div>
			        </div>
			    </div>
			    </div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			goodsData : {},
 			userData : {},
			aname : this.$route.query.aname,
			open : false,
			slideUp : false,
 			slideDown : false,
 			messageList : [],
 			msg : '',
 			from : 'yjwy' + this.$route.query.uid,
 			to : 'yjwy' + this.$route.query.aid,
 			isNeedGoods : ( this.$route.query.isNeedGoods ) ? parseInt(this.$route.query.isNeedGoods) : 1,
		}
	},
	beforeCreate(){
		this.$store.commit('imini');
	},
	created(){
		if ( this.isNeedGoods == 1 ) {
			this.goodsInfo();
		}
		this.$store.commit('imlogin', {userId : this.from, passWord: this.from});
	},
	watch : {
		'$store.state.messageData':'createMessage',
	},
	computed: {

	},
	mounted(){
		
	},
	methods: {
		openFun(){
			if ( this.slideUp == false ) {
				this.slideUp = true;
				this.slideDown = false;
			} else {
				this.slideUp = false;
				this.slideDown = true;
			}
		},
		goodsInfo(){
			let requestJson = {id : this.$route.query.id};
			this.$http.post('/Shop/Goods/goodsInfo', requestJson, {emulateJSON:true}).then(function(response){
				var returnData = response.data;
				this.goodsData = returnData['data']['list']['goodsInfo'];
				this.userData = returnData['data']['user'];
			}); 
		},
		createMessage(){
			var messageData = this.$store.state.messageData;
			console.log(messageData);
			messageData.time = this.filterTime(messageData.ext.time);
			if ( this.messageList.length ) {
				this.messageList.push(this.$store.state.messageData);
			} else {
				this.messageList = this.messageList.concat(this.$store.state.messageData);
			}
			// console.log(this.messageList);
		},
		sendPrivateText(){
			if ( !this.msg ) {
				this.$store.commit('alert', {show: true, text: '请输入文字'});
				return;
			}
			let msgArray = {};
			msgArray.user = this.userData;
			msgArray.time = new Date().getTime();
			let sendJson = {
				msg : this.msg,
				receiveId : this.to,
				msgArray : msgArray,
			};
			this.$store.commit('sendPrivateText', sendJson);
			this.msg = '';
		},
		sendPrivateImg(){
			let msgArray = {};
			msgArray.user = this.userData;
			msgArray.time = new Date().getTime();
			let sendJson = {
				receiveId : this.to,
				msgArray : msgArray,
			};
			this.$store.commit('sendPrivateImg', sendJson);
			this.openFun();
		},
		filterTime(timestamp){
			var date = new Date();
			var now = date.getTime(); //当前时间戳

			var date = new Date();
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			var today = date.getTime(); //今天0点时间戳

			var date = new Date();
			date.setMonth(0);
			date.setDate(1);
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			var year = date.getTime(); //今年0点时间戳

			var timer = (now - timestamp) / 1000;   // 转换为秒级时间戳
			var tips = '';
			var timeTips = new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes();
			if (timer <= 0) {
				tips = timeTips;
			} else if (Math.floor(timer/60) <= 0) {
				tips = timeTips;
			} else if (timer < 3600) {
				tips = timeTips;
			} else if (timer >= 3600 && (timestamp - today >= 0) ) {
				tips = timeTips;
			} else if (timer/86400 <= 1) {
			    tips = '昨天 ' + timeTips;
			} else {
				var date = new Date(timestamp);
				var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var minutes = date.getMinutes();
				tips = date.getFullYear() + '-' + month + "-" + day + ' ' + timeTips;
			}
			return tips;
		}
	}

}
</script>

