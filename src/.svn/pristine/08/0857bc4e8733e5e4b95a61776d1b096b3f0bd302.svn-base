<template>
  	<div class="content">
		<div class="enr_input all" v-if="showEditor == false">
			<a href="javascript:window.history.go('-1');" class="close"></a>
			<div class="forgetTop">
				<div class="logobox"><img src="../assets/images/wjmm_icn_02@2x.png"></div>
				<h1>找回密码</h1>
			</div>
			<form>
				<ul>
					<li class="line">
						<div class="einput">
							<input type="text" placeholder="请输入手机号码" v-model="forgetJson.account">
						</div>
					</li>					
					<li class="line">
						<div class="einput">
							<input type="text" placeholder="请输入短信验证码" class="code" v-model="forgetJson.verify">
							<button type="button" class="getCode_btn" id="getCode" @click="getCode">获取验证码</button>
						</div>
					</li>
				</ul>
			</form>
			<a href="javascript:;" class="register_btn" @click="forgetPassword">下一步</a>
			<p class="loginTips" v-bind:style="{display: displayStyle}" id="loginTips"><span>{{tips}}</span></p>
		</div>
		<div class="enr_input all" v-else>
			<span class="close" @click="hideEditor"></span>
			<div class="forgetTop">
				<div class="logobox"><img src="../assets/images/wjmm_icn_02@2x.png"></div>
				<h1>找回密码</h1>
				<div class="tips">登录密码是6-20位英文字符和数字的组合</div>
			</div>
			<form>
				<ul>
					<li class="line">
						<div class="einput pmr">
							<input type="password" placeholder="请输入新的登录密码" class="pmr" id="Kpassword" v-model="resetJson.password">
							<em v-bind:class="{on: eyeClass}" @click="showEye"></em>
						</div>
					</li>					
					<li class="line">
						<div class="einput pmr">
							<input type="password" placeholder="确认新的登录密码" class="pmr" id="Krepassword" v-model="resetJson.repassword">
							<em v-bind:class="{on: eyeClass2}" @click="showEye2"></em>
						</div>
					</li>
				</ul>
			</form>
			<a href="javascript:;" class="register_btn" @click="resetPassword">确认</a>
			<p class="loginTips" v-bind:style="{display: displayStyle}" id="loginTips"><span>{{tips}}</span></p>
		</div>
	</div>
</template>
<script>
export default {

	data () {
		return {
			forgetJson : {type:1},
			resetJson : {},
			displayStyle : 'none',
			tips : '',
			noget : 1,
          	settimes : 60,
          	showEditor : false,
          	eyeClass : false,
          	eyeClass2 : false,
		}
	},
	created(){

	},
	computed: {

	},
	methods: {
		getCode : function(){
			var requestData = this.forgetJson;
			if ( !requestData.account ) {
				this.processTips(1, '请输入手机号码');
				return;
			} else if ( !this.verifyPhone(requestData.account) ) {
				this.processTips(1, '手机号码格式不正确');
				return;
			}else{
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
		forgetPassword : function(){
			var requestData = this.forgetJson;
	  		if ( !requestData.account ) {
	  			this.processTips(1, '请输入手机号码');
	  			return;
	  		} else if ( !this.verifyPhone(requestData.account) ) {
	  			this.processTips(1, '手机号码格式不正确');
	  			return;
	  		} else if ( !requestData.verify ) {
				this.processTips(1, '请输入短信验证码');
	  			return;
	  		} else {
	  			var that = this;
	  			that.$http.post('/Shop/Login/forgetPassword', requestData, {emulateJSON:true}).then(function(response){
	  				var returnData = response['data'];
					if( returnData['status'] == '200000' ){
						localStorage.session_id = returnData['data']['session_id'];
						that.showEditor = true;
					}else{
						that.processTips(1, returnData['message']);
					}    	
		   	 	});
	  		}
		},
		resetPassword : function(){
			var requestData = this.resetJson;
	  		if ( !requestData.password ) {
	  			this.processTips(1, '请输入新的登录密码');
	  			return;
	  		} else if ( !requestData.repassword ) {
				this.processTips(1, '请确认新的登录密码');
	  			return;
	  		} else {
	  			var that = this;
	  			that.$http.post('/Shop/Login/resetPassword', requestData, {emulateJSON:true}).then(function(response){
	  				var returnData = response['data'];
					if( returnData['status'] == 200000 ){
						// window.location.href = "mitchell://login?user_id="+returnData['data']['user']['id']+'&session_id='+returnData['data']['session_id'];
						that.$router.push('/login');
					}else{
						that.processTips(1, returnData['message']);
					}    	
		   	 	});
	  		}
		},
		processTips : function(show, tips){
			if ( show ) {
				this.tips = tips;
				this.displayStyle = 'block';
			} else {
				this.displayStyle = 'none';
			}
			setTimeout(this.processTips, 4000);
		},
		verifyPhone : function(telephone){
			var telReg = !!telephone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/);
		    //如果手机号码不能通过验证
		    return telReg;
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
        showEye : function(){
			var password = document.getElementById('Kpassword');
			if ( this.eyeClass == false ) {
				this.eyeClass = true;
				password.setAttribute('type', 'text');
			} else {
				this.eyeClass = false;
				password.setAttribute('type', 'password');
			}
		},
		showEye2 : function(){
			var password = document.getElementById('Krepassword');
			if ( this.eyeClass2 == false ) {
				this.eyeClass2 = true;
				password.setAttribute('type', 'text');
			} else {
				this.eyeClass2 = false;
				password.setAttribute('type', 'password');
			}
		},
		hideEditor : function(){
			this.showEditor = false;
		}
	}

}
</script>

