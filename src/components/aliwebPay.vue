<template>
    <div class="content">
        <div class="J-weixin-tip weixin-tip" :style="{display : tip}">
            <div class="weixin-tip-content">
                请在菜单中选择在浏览器中打开,<br/>
                以完成支付
            </div>
        </div>
        <div class="J-weixin-tip-img weixin-tip-img" :class="{iphone: iphone, android: android}" :style="{display : tipImg}"></div>
    </div>
</template>
<script>
export default {

    data () {
        return {
            tip : 'none',
            tipImg : 'none',
            iphone : false,
            android : false,
        }
    },
    created(){
        this.initialize();  
    },
    mounted(){
        
    },
    methods: {
        initialize(){
            if (location.hash.indexOf('error') != -1) {
                alert('参数错误，请检查');
            } else {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.indexOf('micromessenger') != -1) {
                    this.tip = 'block';
                    this.tipImg = 'block';
                    if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
                        this.iphone = true;
                        this.android = false;
                    } else {
                        this.iphone = false;
                        this.android = true;
                    }
                } else {
                    var getQueryString = function (url, name) {
                        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
                        if (reg.test(url)) return RegExp.$2.replace(/\+/g, " ");
                    };
                    var param = getQueryString(location.href, 'goto') || '';
                    location.href = param != '' ? _AP.decode(param) : 'pay#error';
                }
            }
        }
    }

}
</script>
<style>
  @import '../assets/css/alipay.css';
</style>