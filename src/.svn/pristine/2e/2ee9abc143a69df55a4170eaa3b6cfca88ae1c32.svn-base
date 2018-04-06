// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/home.js'
import store from './assets/js/store.js'
import VueResource from 'vue-resource'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(VueResource)

store.registerModule('vux', {
  state: {
  demoScrollTop: 0,
  isLoading: false,
  direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})
Vue.use(vuexI18n.plugin,store)
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next)  =>{
  if(localStorage.session_id !='undefined'){
    request.body.session_id = localStorage.session_id;
  }
  next((response) => {
    if(response.data.status==100000){
       router.push('/login');
    }else{
      return response;
    }
  });
});
/* eslint-disable no-new */
var appvue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    //this.getajax()
  },
  http: {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
       
    }
  }
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = 'http${url}'
  } else {
    next()
  }
})

//转化时间格式
/**              
 * 时间戳转换日期              
 * @param <int> unixTime    待时间戳(秒)              
 * @param <bool> type    返回完整时间('yyyy-MM-dd h:mm:ss' 或者 'yyyy-MM-dd' )                          
 */
Vue.filter('time',function(value,type="YYYY-MM-dd") {
  var newDate = new Date();
  newDate.setTime(value * 1000);
  Date.prototype.format = function(format) {
         var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
         };
         if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
         }
         for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                       format = format.replace(RegExp.$1, RegExp.$1.length == 1
                              ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
         }
         return format;
  }
  return newDate.format(type);
})





