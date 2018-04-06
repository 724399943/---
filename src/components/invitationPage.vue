<template>
  	<div class="content">
  		<header class="head">
			<router-link to="/" class="close"></router-link>
			<h1 class="y-confirm-order-h1">壹家无忧</h1>
	    </header>
	    <div class="main">
			<div class="enr_input" v-if="registerStatus == false">		
				<div class="enimg-m" v-html="list.content">
					<img src="http://placehold.it/350x150">
				</div>	
				<form>
					<ul>
						<li>
							<div class="einput">
								<input type="text" placeholder="请输入手机号码" v-model="dataJson.phone">
							</div>
						</li>
						<li>
							<div class="einput">
								<input type="text" placeholder="请输入短信验证码" class="code" v-model="dataJson.verify">
								<a href="javascript:;" class="getCode_btn" id="getCode" @click="getCode" v-if="noget">获取验证码</a>
								<a href="javascript:;" class="getCode_btn res" v-else>重新发送({{settimes}})</a>
							</div>
						</li>
						<li>
							<div class="einput pmr">
								<input type="password" placeholder="请输入登录密码" class="pmr" v-model="dataJson.password">
							</div>
						</li>					
						<li>
							<div class="einput">
								<p class="tips">登录密码是6-20位英文字符和数字的组合</p>
							</div>
						</li>
					</ul>
				</form>
				<a href="javascript:;" class="register_btn" @click="register">注册</a>
				<!-- 提示 -->
				<div class="invtips" :style="{display: displayStyle}">{{tips}}</div>
			</div>
			<!-- 注册成功 -->
			<div class="enr_input" v-else>
				<div class="enrlogo">
					<div class="yqlogobox">
						<img src="../assets/images/LOGO.png">
					</div>
				</div>
				<p class="yqsuss">注册成功</p>
				<a href="javascript:;" class="down_btn" @click="downloadApp">下载壹家无忧</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			dataJson : {
				type : '0',
				referer_id : this.$route.query.id,
			},
			list : {},
     		tips : '',
     		noget : 1,
          	settimes : 60,
          	displayStyle : 'none',
          	switch : false,
          	registerStatus : false,
		}
	},
	created(){
		this.getData();
	},
	computed: {

	},
	methods: {
		getData(){
	    	this.$http.post('/Shop/Article/articleDetail', {sign:'share'},{emulateJSON:true}).then(function(response){
	    		var returnData = response['data'];
	         	if( returnData['status'] == "200000" ){
	        		this.list = returnData['data']['list'];
	        	}    
	      	});	
	    },
		getCode : function(){
	  		var requestData = this.dataJson;
	  		requestData['account'] = requestData['phone'];
	  		if ( !requestData.account ) {
	  			this.processTips(1, '请输入手机号码');
	  			return;
	  		} else if ( !this.verifyPhone(requestData.account) ) {
	  			this.processTips(1, '手机号码格式不正确');
	  			return;
	  		} else {
	  			var that = this;
	  			if ( that.noget == 1 ) {
					that.$http.post('/Shop/Login/getVerifyCode', requestData, {emulateJSON:true}).then(function(response){
						var returnData = response['data'];
						if( returnData['status'] == '200000' ){
							var getCode = document.getElementById('getCode');
							that.settime(getCode);			
						}else{
							that.processTips(1, returnData['message']);
						}    	
			   	 	});
				}
	  		}
	    },
	    register : function(){
	    	var requestData = this.dataJson;
	  		if ( !requestData.phone ) {
	  			this.processTips(1, '请输入手机号码');
	  			return;
	  		} else if ( !this.verifyPhone(requestData.phone) ) {
	  			this.processTips(1, '手机号码格式不正确');
	  			return;
	  		} else if ( !requestData.verify ) {
				this.processTips(1, '请输入短信验证码');
	  			return;
			} else if ( !requestData.password ) {
				this.processTips(1, '请输入登录密码');
	  			return;
	  		} else {
	  			var that = this;
	  			that.$http.post('/Shop/Login/register', requestData, {emulateJSON:true}).then(function(response){
	  				var returnData = response['data'];
					if( returnData['status'] == '200000' ){
						this.registerStatus = true;
					}else{
						that.processTips(1, returnData['message']);
					}    	
		   	 	});
	  		}
	    },
	    verifyPhone : function(telephone){
		    var telReg = !!telephone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/);
		    //如果手机号码不能通过验证
		    return telReg;
	    },
	    processTips : function(show, tips){
			if ( show ) {
				this.tips = tips;
				this.displayStyle = 'block';
				this.switch = true;
			} else {
				this.displayStyle = 'none';
				this.switch = false;
			}
			if ( this.switch == true ) {
				setTimeout(this.processTips, 4000);
			}
		},
	    settime : function(object){
            var that = this;
            if ( that.settimes == 0 ) { 
                object.innerText = "获取验证码";
                that.noget = 1;
                that.settimes = 60; 
            } else { 
                object.innerText = "重新发送("+ that.settimes +")";
                that.noget = 0;
                that.settimes--;
	            setTimeout(function(){ that.settime(object) }, 1000);
            } 
        },
        downloadApp(){
        	var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('micromessenger') != -1) {
                if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
                    window.location.href = '';
                } else {
                    window.location.href = '';
                }
            } else {
            	alert('userAgent error');
            }
        }
	}

}
</script>

