<template>
  <div id="app">
      <transition :name="'vux-pop-' + (direction == 'forward' ? 'in' : 'out')">
      <!-- <keep-alive> -->
       <router-view class="router-view"></router-view>
      <!-- </keep-alive> -->
      </transition>
      <VFooter v-if="($store.state.isActive == 'index' || $store.state.isActive == 'categoryList' || $store.state.isActive == 'decorateACircle' || $store.state.isActive == 'shoppingCart' || $store.state.isActive == 'personalCenter') && $store.state.isNeedFooter == true"></VFooter>
      <!-- 操作提示框 -->
      <confirm v-model="$store.state.confirmJson.show" :title="$store.state.confirmJson.title" @on-cancel="onCancel" @on-confirm="onConfirm" :cancel-text="$store.state.confirmJson.cencelBtn" :confirm-text='$store.state.confirmJson.confirmBtn'>
        <p style="text-align:center;">{{ $store.state.confirmJson.text }}</p>
      </confirm>
    <!-- 加载 -->
    <loading :show="$store.state.loadingJson.show" :text="$store.state.loadingJson.text"></loading>
    <!-- 提示框 -->
    <alert v-model="$store.state.alertJson.show" :title="$store.state.alertJson.title" :button-text="$store.state.alertJson.alertBtn" @on-hide="onHide" >{{$store.state.alertJson.text}}</alert>
  </div>
</template>
<script>
import Confirm from 'vux/src/components/confirm'
import Loading from 'vux/src/components/loading'
import Alert   from 'vux/src/components/alert'
import { mapState } from 'vuex'
import VFooter from './components/Footer'

export default {
  data () {
    return {
    }
  },
  components: {
    Loading,
    Confirm,
    Alert,
    VFooter
  },
  created: function (store) {
      this.loadData()
     // this.share()
    // if(this.$route.query.session_id !='' && this.$route.query.session_id !=undefined){
    //   localStorage.session_id = this.$route.query.session_id;
    // } 
    this.$store.state.isActive = this.$route.name;
    window.onChatSuccessful = this.onChatSuccessful;
  },
  watch:{
      $route (to,from) {
          // if ( from.name == 'goodsDetail' && to.name == 'shoppingCart' ) {
          //     this.$store.state.isNeedFooter = false;
          // } else {
          //     this.$store.state.isNeedFooter = true;
          // }
          this.$store.state.isActive = to.name;
          this.$store.state.isNeedFooter = true;
          document.body.scrollTop = 0;
      } 
  },
  computed: {
     ...mapState({
        direction: state => state.vux.direction
     })
  },
  methods: {
    	loadData(){

    	},onCancel(){

      },onConfirm(){
        if(this.$store.state.confirmJson.call){
          this.$store.state.confirmJson.call();
        }
      },onHide(){

      },loginFun(){
        
      },share(){


      },
      onChatSuccessful(messageData){
          messageData = JSON.parse(messageData);
          var messageList = localStorage['messageList'];
          /****处理本地信息*****/ 
          var is_end = true;
          if( !messageList ){
            messageList = [];
            var node = {};
            node.id = messageData.from;
            node.total = 1;
            switch( messageData.chat_type ){
              case 'txt':
                node.type = 1;
                node.content = messageData.data;
                break;
              case 'image':
                node.type = 2;
                node.content = "[图片]";
              case 'voice':
                node.type = 3;
                node.content = "[语音]";
            };
            // node.content = messageData.data;
            node.time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
            messageList.push(node);
          }else{
            var messageList = JSON.parse(messageList);
            for(var j=0; j<messageList.length; j++){
              if( messageData.from == messageList[j].id){
                //本地有用户id,加total,换content
                ++messageList[j].total;
                switch( messageData.chat_type ){
                  case 'txt':
                  messageList[j].type = 1;
                  messageList[j].content = messageData.data;
                  break;
                case 'image':
                  messageList[j].type = 2;
                  messageList[j].content = "[图片]";
                case 'voice':
                  messageList[j].type = 3;
                  messageList[j].content = "[语音]";
                };
                messageList[j].time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
                is_end = false;
                break;
              }
            }
            //本地没有用户id的消息，拼接json数据
            if( is_end ){
              var node = {};
              node.id = messageData.from;
              node.total = 1;
              switch( messageData.chat_type ){
                case 'txt':
                  node.type = 1;
                  node.content = messageData.data;
                break;
              case 'image':
                  node.type = 2;
                  node.content = "[图片]";
              case 'voice':
                  node.type = 3;
                  node.content = "[语音]";
              };
              node.time = (messageData.ext.time) ? messageData.ext.time : new Date().getTime();
              messageList.push(node);
            }
          }
          localStorage['messageList'] = JSON.stringify(messageList);
          this.$store.state.messageData = messageData;
      }
  }
  
}

</script>

<style>
@import './assets/css/base.css';
@import './assets/css/yjwyStyle.css';
</style>
