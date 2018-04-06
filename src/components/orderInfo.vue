<template>
  	<div class="content">
        <header class="head">
            <a href="javascript:;" class="back" @click="closeOrderInfo('show')"></a>
            <h1 class="y-confirm-order-h1">结算</h1>
        </header>
        <div class="main">
            <div class="order_balance">
                <router-link :to="{name: 'consigneeList', query: dataJson}" class="y-consignee-imfo" v-if="!consignee.id">
                    <p class="y-pt">您还没有收货地址~</p>
                    <i class="y-icon2"></i>
                </router-link>
                <router-link :to="{name: 'consigneeList', query: dataJson}" class="y-consignee-imfo" v-else>
                    <div class="y-line1 clearfix">
                      <div class="y-name"><em>{{consignee['consignee']}}</em></div>   
                      <div class="y-phone">{{consignee['telephone']}}</div>
                    </div>
                    <p class="y-address">{{consignee['address']}}</p>
                    <i class="y-icon2"></i>
                </router-link>
                <div class="y-order-pro">
                    <router-link :to="{path: 'inventory', query: dataJson}" v-if="dataJson['is_buy'] == '0'">
                        <div class="yy-kinli">
                            <span class="name">商品清单( 共{{goodsNumber}}件 )</span>
                            <input type="text" placeholder="点击给商家留言" class="ykinput" readonly>
                        </div>
                        <div class="yy-goodslist">
                            <div v-for="(data,index) in list">
                                <div class="ygimgbox" v-for="(goods,key) in data['goodsList']">
                                    <a href="javascript:;">
                                        <img :src="goods['goods_image']">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <div v-else v-for="(data,index) in list">
                        <div class="yy-sggods" v-for="(goods,key) in data['goodsList']">
                            <div class="in-goods">
                                <div class="imgbox">
                                    <img :src="goods['goods_image']">
                                </div>
                                <div class="ingmsg">
                                    <p class="name db-overflow">{{goods['goods_name']}}</p>
                                    <div class="invpn">
                                        <span class="price" v-if="!!goods['promotionData']">￥{{goods['promotionData']['promotion_price']}}</span>
                                        <span class="price" v-else>￥{{goods['goods_price']}}</span>
                                        <span class="num">x{{goods['goods_number']}}</span>
                                    </div>
                                    <div class="invattr" v-if="install[goods['goods_id']] == '0'">
                                        <span>{{goods['attr_list']}}</span>
                                    </div>
                                    <div class="invattr" v-else>
                                        <span>{{goods['attr_list']}} 上门安装</span>
                                        <span>￥{{goods['install_price']}} x1</span>
                                        <!-- <a href="javascript:;" class="pn">取消</a> -->
                                    </div>
                                </div>                        
                            </div>
                        </div>
                        <div class="invresmsg">
                            <span>给商家留言：</span>
                            <input type="text" v-model="message" maxlength="140" placeholder="选填，不超过140字">
                        </div>
                    </div>
                    <div v-if="dataJson['is_buy'] == '0'">
                        <div class="yy-kinli" v-if="merchantCanUseCoupon == '0'">
                            <span class="name">店铺优惠券</span>
                            <span class="notext">无优惠券可用</span>
                        </div>
                        <router-link :to="{path: 'inventory', query: dataJson}" v-else-if="merchantCanUseCoupon == '1'">
                            <div class="yy-kinli">
                                <span class="name">店铺优惠券</span>
                                <span class="notext">未使用</span>
                            </div>
                        </router-link>
                        <router-link :to="{path: 'inventory', query: dataJson}" v-else-if="merchantCanUseCoupon == '2'">
                            <div class="yy-kinli">
                                <span class="name">店铺优惠券</span>
                                <span class="coupon">已选{{merchantCouponNumber}}张</span>
                                <span class="money">-￥: {{merchantCouponTotal}}</span>
                            </div>
                        </router-link>
                        <div class="yy-kinli" v-if="platformCanUseCoupon == '0'">
                            <span class="name">平台优惠券</span>
                            <span class="notext">无优惠券可用</span>
                        </div>
                        <div class="yy-kinli" v-else-if="platformCanUseCoupon == '1'" @click="chooseCoupon">
                            <span class="name">平台优惠券</span>
                            <span class="notext">未使用</span>
                        </div> 
                        <div class="yy-kinli" v-else-if="platformCanUseCoupon == '2'" @click="chooseCoupon">
                            <span class="name">平台优惠券</span>
                            <span class="coupon">已选{{platformCouponNumber}}张</span>
                            <span class="money">-￥: {{platformCouponTotal}}</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="yy-kinli" v-if="merchantCanUseCoupon == '0' && platformCanUseCoupon == '0'">
                            <span class="name">优惠券</span>
                            <span class="notext">无优惠券可用</span>
                        </div>
                        <div class="yy-kinli" v-else-if="(merchantCanUseCoupon == '1' && platformCanUseCoupon == '0') || (merchantCanUseCoupon == '0' && platformCanUseCoupon == '1') || (merchantCanUseCoupon == '1' && platformCanUseCoupon == '1')" @click="chooseCoupon">
                            <span class="name">优惠券</span>
                            <span class="notext">未使用</span>
                        </div> 
                        <div class="yy-kinli" v-else-if="merchantCanUseCoupon == '2'" @click="chooseCoupon">
                            <span class="name">优惠券</span>
                            <span class="coupon">已选{{merchantCouponNumber}}张</span>
                            <span class="money">-￥: {{merchantCouponTotal}}</span>
                        </div>
                        <div class="yy-kinli" v-else-if="platformCanUseCoupon == '2'" @click="chooseCoupon">
                            <span class="name">优惠券</span>
                            <span class="coupon">已选{{platformCouponNumber}}张</span>
                            <span class="money">-￥: {{platformCouponTotal}}</span>
                        </div> 
                    </div>
                    <div class="yy-kinli">
                        <span class="name">商品总金额</span>
                        <span class="money">+￥: {{total}}</span>
                    </div>
                    <div class="yy-kinli">
                        <span class="name">送装服务费</span>
                        <span class="money">+￥: {{installTotal}}</span>
                    </div>
                </div>
            </div>
            <footer class="y-foot-45px">
                <div class="padding-l-120">
                    <div class="total">
                        <em class="em1">需支付 </em>
                        <em class="em-price">￥ {{realTotal}}</em>
                    </div>
                    <a href="javascript:;" class="gotopay" @click="commitOrder">去付款</a>
                </div>
           </footer>
           <!-- 退出弹窗 -->
           <div class="outOrder" :style="{display: outOrderStyle}">
                <div class="outBox">
                    <p>确认退出订单吗？</p>
                    <div class="btn">
                        <span class="line" @click="closeOrderInfo('stay')">继续下单</span>
                        <span @click="closeOrderInfo('back')">去意已决</span>
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
            dataJson : {
                consignee_id : ( this.$route.query.consignee_id ) ? this.$route.query.consignee_id : '',
                is_buy :  ( this.$route.query.is_buy ) ? this.$route.query.is_buy : '0',
                coupon_type : ( this.$route.query.coupon_type ) ? this.$route.query.coupon_type : '0',
                ids : ( this.$route.query.ids ) ? this.$route.query.ids : '',
                message : ( this.$route.query.message ) ? this.$route.query.message : '',
                install : ( this.$route.query.install ) ? this.$route.query.install : '',
                coupon : ( this.$route.query.coupon ) ? this.$route.query.coupon : '',
            },
            consignee: {},
            list : [],
            total : 0,
            installTotal : 0,
            realTotal : 0,
            goodsNumber : 0,
            outOrderStyle : 'none',
            install : {},
            merchantCanUseCoupon : 0,
            platformCanUseCoupon : 0,
            merchantCouponTotal : 0,
            platformCouponTotal : 0,
            merchantCouponNumber : 0,
            platformCouponNumber : 0,
            agentData : [],
            agentCouponData : {},
            message : '',
            promotion_price : ( this.$route.query.promotion_price ) ? this.$route.query.promotion_price : ''
        }
    },
    created(){
        this.$store.commit('loading',{show:true,text:'加载中...'});
        this.getData();
    },
    mounted(){
        this.$store.commit('loading',{show:false});
    },
    computed: {

    },
    methods: {
        getData(){
            this.$http.post('/Shop/Shop/orderInfo',this.dataJson,{emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    var list = returnData['data']['list'];
                    var agentCouponData = {};
                    for ( var i in list ) {
                        var data = list[i],
                            agent_id = data['agent_id'];
                        this.agentData.push(agent_id);
                        agentCouponData[agent_id] = {};
                        agentCouponData[agent_id]['canUseCoupon'] = 0;
                        agentCouponData[agent_id]['couponNumber'] = 0;
                        agentCouponData[agent_id]['couponTotal'] = 0;
                        agentCouponData[agent_id]['total'] = data['total'];
                        agentCouponData[agent_id]['installTotal'] = data['installTotal'];
                    }
                    this.agentCouponData = agentCouponData;

                    // var installData = eval('(' + this.dataJson.install + ')');
                    var installData = JSON.parse(this.dataJson.install);
                    for (var i = 0; i < installData.length; i++) {
                        var data = installData[i];
                        this.install[data['goods_id']] = data['install'];
                    }
                    this.consignee = !returnData['data']['consignee'] ? this.consignee : returnData['data']['consignee'];
                    this.dataJson.consignee_id = !returnData['data']['consignee'] ? this.dataJson.consignee_id : this.consignee.id;
                    this.list = returnData['data']['list'];
                    console.log(this.list);
                    this.installTotal = returnData['data']['installTotal'];
                    this.total = returnData['data']['total'];
                    this.goodsNumber = returnData['data']['goodsNumber'];
                    this.calcTotal();
                    this.userCanUseCoupon();
                } 
            });
        },
        commitOrder(){
            if ( this.dataJson.is_buy == '1' ) {
                var messageJson = [];
                messageJson[0] = {};
                messageJson[0].agent_id = this.agentData[0];
                messageJson[0].message = this.message;
                this.dataJson.message = JSON.stringify(messageJson);
            }
            this.$http.post('/Shop/Shop/commitOrder',this.dataJson,{emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    var queryJson = {order_sn: returnData['data']['order_sn'],'historyGo':'0'};
                    this.$router.push({name: 'payment', query: queryJson});
                } else {
                    this.$store.commit('alert',{show:true,text:returnData['message']});
                }
            });
        },
        userCanUseCoupon(){
            var requestJson = {agent_id: this.agentData.join(',') + ',0'}
            this.$http.post('/Shop/Coupon/userCanUseCoupon', requestJson, {emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    var couponList = returnData['data']['list'];
                    for (var i = 0; i < couponList.length; i++) {
                        var couponData = couponList[i],
                            agent_id = couponData['agent_id'],
                            min_cost = Number(couponData['min_cost']);
                        if ( this.agentData.indexOf(agent_id) != '-1' ) {
                            var realTotal = Number(this.agentCouponData[agent_id]['total']) +  Number(this.agentCouponData[agent_id]['installTotal']);
                            if ( min_cost <= realTotal ) {
                                this.merchantCanUseCoupon = 1;
                            }
                        } else if ( agent_id == '0' ) {
                            if ( min_cost <= this.realTotal ) {
                                this.platformCanUseCoupon = 1;
                            }
                        }
                    }

                    if ( this.dataJson.coupon ) {
                        // var couponList = eval('(' + this.dataJson.coupon + ')');
                        var couponList = JSON.parse(this.dataJson.coupon);
                        for (var i = 0; i < couponList.length; i++) {
                            var couponData = couponList[i],
                                agent_id = couponData['agent_id'];
                            if ( agent_id != '0' ) {
                                this.merchantCouponTotal += Number(couponData['coupon_value']);
                                this.merchantCouponNumber++;
                                this.merchantCanUseCoupon = 2;
                            } else {
                                this.platformCouponTotal += Number(couponData['coupon_value']);
                                this.platformCouponNumber++;
                                this.platformCanUseCoupon = 2;
                            }
                        }
                        this.calcTotal();
                    }
                }
            });
        },
        chooseCoupon(){
            var queryJson = this.dataJson;
            queryJson['coupon_type'] = 1;
            queryJson['installTotal'] = this.installTotal;
            queryJson['total'] = this.total;
            if ( this.dataJson.is_buy == '1' ) {
                queryJson['agent_id'] = this.agentData.join(',') + ',0';
            }
            this.$router.push({name: 'myCoupons', query: queryJson});
        },
        closeOrderInfo( type ){
            switch ( type ) {
                case 'show' :
                    this.outOrderStyle = 'block';
                    break;
                case 'stay' :
                    this.outOrderStyle = 'none';
                    break;
                case 'back' :
                    this.$router.push({name: 'shoppingCart'});
                    break;
            }
        },
        calcTotal(){
            this.realTotal = parseFloat(this.installTotal) + parseFloat(this.total) - parseFloat(this.merchantCouponTotal) - parseFloat(this.platformCouponTotal);
            this.realTotal = ( this.realTotal <= 0 ) ? 0 : this.realTotal;
        }
    }

}
</script>

