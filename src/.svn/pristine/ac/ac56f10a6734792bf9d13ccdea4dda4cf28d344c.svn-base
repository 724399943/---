<template>
  	<div class="content">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">个人设置</h1>
		</header>
		<div class="main">
			<div class="y-bindphone">
				<ul>
					<li class="ute">
						<span>头像</span>
						<div class="imgbox">
							<img :src="userInfo.headimgurl">	
							<div class="upfile-box">
                <input type="file" accept="image/*;capture=camera" @change="imageuploaded" v-if="(iphone == false && android == false) || iphone == true">
                <input type="button" @click="choose" v-else-if="android == true">
				      </div>						
						</div>
					</li>
					<li class="ute">
						<span>手机号</span>
						<p>{{phoneShow}}</p>
					</li>
					<li class="ute">
						<router-link :to="{path:'/setNickname',query:{nickname:userInfo.nickname}}">
							<span>昵称</span>
							<input type="text" name="" class="name" readonly="readonly" :value="userInfo.nickname">
						</router-link>
					</li>					
				</ul>
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
      iphone : false,
      android : false,
    }
  },
  created(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') == -1) {
      if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
            this.iphone = true;
            this.android = false;
        } else {
            this.iphone = false;
            this.android = true;
        }
    }
    window.onChooseResult = this.onChooseResult;
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.getUserInfo();
  },
  mounted(){
  	this.$store.commit('loading',{show:false});
  },
  methods: {  
  	getUserInfo(){
    	this.$http.post('/Shop/User/userInfo', {},{emulateJSON:true}).then(function(response){
          var returnData = response['data'];
         	if( returnData.status == "200000" ){
              if ( returnData['data']['is_temp'] == '1' ) {
                  this.$router.push({name:'login'});
              } else {
                  this.userInfo = returnData.data.list; 
                  var str = this.userInfo.phone.substring(3,7);
                  this.phoneShow = this.userInfo.phone.replace(str,'****');
              }
        	}    
      	});
    },imageuploaded(e) {
        var that = this;
        var files = e.target.files || e.dataTransfer.files
        var reader = null;
        reader = new window.FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e){
          that.$http.post('/Shop/Public/base64Upload', {image:e.target.result,dir:'User'},{emulateJSON:true}).then(function(response){
              if( response.data.status == "200000" ){
                  that.userInfo["headimgurl"] = response.data.data.image;
                  that.changeHeadimg();
              }
            })
        }
    },
    changeHeadimg : function(){
      var dataJson = {
          headimgurl : this.userInfo.headimgurl,
          nickname : this.userInfo.nickname,
      };
      this.$http.post('/Shop/User/updateUser', dataJson, {emulateJSON:true}).then(function(response){
          this.$store.commit('alert',{show:true,text:response.data.message});       
      });
    },
    choose(){
        //点击选择图片，js调用Android打开相册
        JSInterface.choose(1);
    },
    onChooseResult(images){
        var imagesData = new Array();
        imagesData = images.split(',');
        this.userInfo['headimgurl'] = imagesData[0];
        this.changeHeadimg();
    }
  }

}
</script>

