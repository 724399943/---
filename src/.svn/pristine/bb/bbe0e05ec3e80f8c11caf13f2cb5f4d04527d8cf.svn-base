<template>
  	<div class="content">
  		<header class="head">
  		<!-- <span v-if="url=='personal'">
  			<router-link :to="{path:'/returnsAfterSales', query:{url:'personal'}}">
  				<a class="back" href="javascript:window.history.go(-1);"></a>
  			</router-link>
  		</span> -->
  		<span><a class="back" href="javascript:window.history.go(-1);"></a></span>
			<h1 class="y-confirm-order-h1">申请退货</h1>
		</header>
		<div class="main">
			<div class="appforRturn">
				<div class="in-goods">
                    <div class="imgbox">
                        <img :src="goodsData['goods_image']">
                    </div>
                    <div class="ingmsg">
                        <p class="name db-overflow">{{goodsData['goods_name']}}</p>
                        <div class="invattr">
                            <span v-if="goodsData['is_install'] == '1'">{{goodsData['attr_list']}} 上门安装</span>
                            <span v-else>{{goodsData['attr_list']}}</span>
                        </div>
                        <div class="affterMoney">
                        	<p>结算金额：<em>￥{{goodsData['unit_price']}}</em></p>
                        	<span>x{{goodsData['goods_number']}}</span>
                        </div>
                    </div>   
                </div>
                <div class="arcont">
                	<div class="yy-infoorder">
						<div class="yyinder">
							<span>服务类型</span>
							<a href="javascript:;">退货</a>
						</div>
						<div class="yyinder">
							<span>申请数量</span>
							<div class="count">
								<span @click="number('cut')">-</span>
								<span class="num">{{dataJson.goods_number}}</span>
								<span @click="number('add')">+</span>
							</div>
						</div>
						<div class="yyinder">
							<span>问题描述</span>
						</div>
						<div class="miaoshu">
							<div class="yyafmiao">
								<textarea placeholder="请您在此描述问题" v-model="dataJson.description"></textarea>
								<div class="sqimgfile">
									<em></em>
								</div>
							</div>
						</div>
						<div class="sqmsImgMain">
							<div class="imgbox" v-for="(data,index) in photoData">
								<img :src="data['url']">
								<em @click="removePhoto(data['image'],index)"></em>
							</div>
							<div class="imgbox">
								<img src="../assets/images/add_ico.png">
								<input type="file" accept="image/*;capture=camera" @change="imageuploaded" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0;" v-if="(iphone == false && android == false) || iphone == true">
								<input type="button" @click="choose" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0;" v-else-if="android == true">
							</div>
						</div>
					</div>
                </div>
                <a href="javascript:;" class="afrbtn" @click="toAfterSale">提交</a>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

	data () {
		return {
			url :  (this.$route.query.url) ? this.$route.query.url : '',
			goodsData : {},
			photoData : [],
			goodsNumber : 0,
			dataJson : {
				order_sn : this.$route.query.order_sn,
				goods_id : this.$route.query.goods_id,
				goods_number : 0,
				description : '',
				image : '',
			},
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
		this.getData();
	},
	computed: {

	},
	methods: {
		getData(){
			var requestJson = {
				order_sn : this.$route.query.order_sn,
				goods_id : this.$route.query.goods_id,
			};
			this.$http.post('/Shop/OrderGoodsReturn/returnGoodsDetail', requestJson,{emulateJSON:true}).then(function(response){
				var returnData = response['data'];
				if ( returnData.status == '200000' ) {
					this.goodsData = returnData['data']['list'];
					if ( this.goodsData.goods_number == this.goodsData.return_number ) {
						this.$store.commit('alert', {show:true,text:'您已申请过退货，请勿重复申请哦'});
						setTimeout(function(){
							this.$router.push({name:'returnsAfterSales'});
						}, 2500);
						return;
					}
					this.dataJson.goods_number = parseInt(this.goodsData.goods_number);
				}
            })
		},
		toAfterSale(){
			if ( !this.dataJson.description ) {
				this.$store.commit('alert', {show:true,text:'请您在此描述问题'});
				return;
			}
			var image = [];
			for (var i = 0; i < this.photoData.length; i++) {
				var photoData = this.photoData[i];
				var imageData = photoData['image'];
				image.push(imageData);
			}
			this.dataJson.image = image.join(',');
			this.$http.post('/Shop/OrderGoodsReturn/toAfterSale', this.dataJson,{emulateJSON:true}).then(function(response){
				var returnData = response['data'];
				if ( returnData.status == '200000' ) {
					this.$router.push({name: 'returnsAfterSales', query: {is_tab: 'see',url:this.url}});
				}
            })
		},
		removePhoto(url, index){
			this.$http.post('/Shop/Public/removePhoto', {image: url},{emulateJSON:true}).then(function(response){
				if ( response.data.status == '200000' ) {
					this.photoData.splice(index, 1);
				}
            })
		},
		imageuploaded(e) {
			if ( this.photoData.length == 3 ) {
				this.$store.commit('alert', {show:true,text:'最多上传3张图片'});
				return;
			}
	        var that = this;
	        var files = e.target.files || e.dataTransfer.files
	        var reader = null;
	        reader = new window.FileReader();
	        reader.readAsDataURL(files[0]);
	        reader.onload = function(e){
	          	that.$http.post('/Shop/Public/base64Upload', {image:e.target.result,dir:'Return'},{emulateJSON:true}).then(function(response){
	          		var returnData = response['data'];
					if( returnData['status'] == "200000" ){
						var imageData = {};
						imageData['image'] = returnData['data']['image'];
						imageData['url'] = e.target.result;
						this.photoData.push(imageData);
					}
	            })
	        }
	    },
	    number(type){
	    	if ( type == 'cut' ) {
	    		if ( this.dataJson.goods_number == 1 ) {
	    			this.$store.commit('alert',{show:true,text:'数量不能再少了哦'});
	    			return;
	    		}
	    		--this.dataJson.goods_number;
	    	} else {
	    		if ( this.dataJson.goods_number == this.goodsData.goods_number ) {
	    			this.$store.commit('alert',{show:true,text:'不可超出下单数量哦'});
	    			return;
	    		}
	    		++this.dataJson.goods_number;
	    	}
	    },
	    choose(){
	    	//点击选择图片，js调用Android打开相册
	    	var canChooseNumber = 3 - parseInt(this.photoData.length);
	    	if ( canChooseNumber > 0 ) {
            	JSInterface.choose(canChooseNumber);
	    	} else {
	    		this.$store.commit('alert',{show:true,text:'最多上传3张图片哦'});
	    	}
	    },
	    onChooseResult(images){
	    	var imagesData = new Array();
	    	imagesData = images.split(',');
	    	for ( var i in imagesData) {
		    	var imageData = {};
				imageData['image'] = imagesData[i];
				imageData['url'] = imagesData[i];
				this.photoData.push(imageData);
	    	}
	    }
	}

}
</script>

