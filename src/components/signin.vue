<template>
  	<div class="content">
    		<header class="head">
      			<div class="search_cate">
      				<a href="javascript:window.history.go(-1);" class="back"></a>
      				<h1 class="y-confirm-order-h1">签到</h1>
      			</div>
  		  </header>
        <div class="main">
            <div class="signWrap">
                <div class="yysign">
                  <div class="sign_top">
                      <div class="stext" v-if="checkIn == 0" @click="signin">
                          <p>今日签到</p>
                          <p>+{{signInCoin}}积分</p>
                      </div>
                      <div class="stext" v-else>
                          <p>已签到</p>
                          <p>连续{{continueDays}}天</p>
                      </div>
                  </div>
                </div>
                <div class="sign_date">
                    <ul>
                        <li :class="{on:continueDays == 1}">
                          <span>1</span>
                          <div class="qdday" v-if="continueDays == 1">
                              第1天
                          </div>
                        </li>
                        <li :class="{on:continueDays == 2}">
                          <span>2</span>
                          <div class="qdday" v-if="continueDays == 2">
                              第2天
                          </div>
                        </li>
                        <li :class="{on:continueDays == 3}">
                          <span>3</span>
                          <div class="qdday" v-if="continueDays == 3">
                              第3天
                          </div>
                        </li>
                        <li :class="{on:continueDays == 4}">
                          <span>4</span>
                          <div class="qdday" v-if="continueDays == 4">
                              第4天
                          </div>
                        </li>
                        <li :class="{on:continueDays == 5}">
                          <span>5</span>
                          <div class="qdday" v-if="continueDays == 5">
                              第5天
                          </div>
                        </li>
                        <li :class="{on:continueDays == 6}">
                          <span>6</span>
                          <div class="qdday" v-if="continueDays == 6">
                              第6天
                          </div>
                        </li>
                        <li :class="{on:continueDays >= 7}">
                          <span>7</span>
                          <div class="qdday" v-if="continueDays >= 7">
                              第{{continueDays}}天
                          </div>
                        </li>
                    </ul>
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
          session_id : localStorage.session_id
      },
      continueDays : '',
      signInCoin : '',
      checkIn : ''
    }
  },
  created(){
      this.signinInformation();
  },
  computed: {
    
  },
  methods: {
    signinInformation : function(){
        this.$http.post('/Shop/Login/signinInformation', this.dataJson, {emulateJSON:true}).then(function(response){
            var returnData = response['data'];
            if( returnData['status'] == "200000" ){
                this.continueDays = returnData['data']['continueDays'];                     
                this.signInCoin = returnData['data']['signInCoin'];
                this.checkIn = returnData['data']['checkIn'];
            }    
        });
    },
    signin : function(){
        this.$http.post('/Shop/Login/userSignin', this.dataJson, {emulateJSON:true}).then(function(response){
            if( response.data.status == "200000" ){
               this.checkIn = 1;                   
               this.signinInformation();
            }    
        });
    }
  }

}
</script>

