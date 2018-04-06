import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/components/index'
// 登录
import login from '@/components/login'
// 注册
import register from '@/components/register'
// 忘记密码
import forgotPassword from '@/components/forgotPassword'
// 装修圈
import decorateACircle from '@/components/decorateACircle'
// 帖子详情
import postDetails from '@/components/postDetails'
// 发帖
import post from '@/components/post'
// 编辑帖子
import editPost from '@/components/editPost'
// 体验馆
import experiencePavilion from '@/components/experiencePavilion'
// 搜素商品
import searchGoods from '@/components/searchGoods'
// 搜索体验馆
import searchMerchant from '@/components/searchMerchant'
// 搜素结果（商品）
import searchGoodsResult from '@/components/searchGoodsResult'
// 搜素结果（体验馆）
import searchMerchantResult from '@/components/searchMerchantResult'
// 限时抢购
import flashSale from '@/components/flashSale'
// 抢购商品详情
import buyingGoodsDetail from '@/components/buyingGoodsDetail'
// 特惠商品
import dailyDeal from '@/components/dailyDeal'
// 特惠商品详情
import goodsDetail from '@/components/goodsDetail'
// 城市选择
import selectCity from '@/components/selectCity'
// 签到
import signin from '@/components/signin'
// 装修资讯
import decorationInformation from '@/components/decorationInformation'
// 资讯详情
import informationDetail from '@/components/informationDetail'
// 店铺详情
import shopDetails from '@/components/shopDetails'
// 领取优惠券
import receiveCoupons from '@/components/receiveCoupons'
// 分类
import categoryList from '@/components/categoryList'
// 商品列表
import goodsList from '@/components/goodsList'
// 全部评价
import allEvaluation from '@/components/allEvaluation'
// 结算
import orderInfo from '@/components/orderInfo'
// 全部订单
import orderList from '@/components/orderList'
// 商品清单
import inventory from '@/components/inventory'
// 选择地址
import consigneeList from '@/components/consigneeList'
// 选择优惠券
import chooseCoupons from '@/components/chooseCoupons'
// 支付成功
import paySuccess from '@/components/paySuccess'
// 购物车
import shoppingCart from '@/components/shoppingCart'
// 选择支付方式
import payment from '@/components/payment'
// 我的收藏
import myCollection from '@/components/myCollection'
// 我的足迹
import myTracks from '@/components/myTracks'
// 设置
import setUp from '@/components/setUp'
// 意见反馈
import feedback from '@/components/feedback'
// 关于我们
import aboutUs from '@/components/aboutUs'
// 个人设置
import userInfo from '@/components/userInfo'
// 设置昵称
import setNickname from '@/components/setNickname'
// 邀请好友页
import invitationPage from '@/components/invitationPage'
// 消息
import messageIndex from '@/components/messageIndex'
// 客服对话
import consultation from '@/components/consultation'
// 系统消息
import systemMessage from '@/components/systemMessage'
// 消息详情
import messageDetail from '@/components/messageDetail'
// 我的帖子
import myPost from '@/components/myPost'
// 个人中心
import personalCenter from '@/components/personalCenter'
// 申请入驻
import applyForAdmission from '@/components/applyForAdmission'
// 我的积分
import myPoints from '@/components/myPoints'
// 我的优惠券
import myCoupons from '@/components/myCoupons'
// 新增收货地址
import newAddress from '@/components/newAddress'
// 编辑收货地址
import editAddress from '@/components/editAddress'
// 订单进度
import orderSchedule from '@/components/orderSchedule'
// 订单详情
import orderDetail from '@/components/orderDetail'
// 退货/售后
import returnsAfterSales from '@/components/returnsAfterSales'
// 选择退货/售后商品
import selReturnGoods from '@/components/selReturnGoods'
// 申请退货
import applyForReturns from '@/components/applyForReturns'
// 选择评价商品
import selEvaluateGoods from '@/components/selEvaluateGoods'
// 评价
import evaluate from '@/components/evaluate'
// 评价成功
import evaluateSuccess from '@/components/evaluateSuccess'
// 支付宝网页支付
import aliwebPay from '@/components/aliwebPay'
// banner图文详情
import bannerDetail from '@/components/bannerDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
      	default: index
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: register
      }
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      components: {
        default: forgotPassword
      }
    },
    {
      path: '/decorateACircle',
      name: 'decorateACircle',
      components: {
        default: decorateACircle
      }
    },
    {
      path: '/postDetails',
      name: 'postDetails',
      components: {
        default: postDetails
      }
    },
    {
      path: '/post',
      name: 'post',
      components: {
        default: post
      }
    },
    {
      path: '/editPost',
      name: 'editPost',
      components: {
        default: editPost
      }
    },
    {
      path: '/experiencePavilion',
      name: 'experiencePavilion',
      components: {
        default: experiencePavilion
      }
    },
    {
      path: '/searchGoods',
      name: 'searchGoods',
      components: {
        default: searchGoods
      }
    },
    {
      path: '/searchGoodsResult',
      name: 'searchGoodsResult',
      components: {
        default: searchGoodsResult
      }
    },
    {
      path: '/searchMerchant',
      name: 'searchMerchant',
      components: {
        default: searchMerchant
      }
    },
    {
      path: '/searchMerchantResult',
      name: 'searchMerchantResult',
      components: {
        default: searchMerchantResult
      }
    },
    {
      path: '/flashSale',
      name: 'flashSale',
      components: {
        default: flashSale
      }
    },
    {
      path: '/buyingGoodsDetail',
      name: 'buyingGoodsDetail',
      components: {
        default: buyingGoodsDetail
      }
    },
    {
      path: '/dailyDeal',
      name: 'dailyDeal',
      components: {
        default: dailyDeal
      }
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      components: {
        default: goodsDetail
      }
    },
    {
      path: '/selectCity',
      name: 'selectCity',
      components: {
        default: selectCity
      }
    },
    {
      path: '/signin',
      name: 'signin',
      components: {
        default: signin
      }
    },
    {
      path: '/decorationInformation',
      name: 'decorationInformation',
      components: {
        default: decorationInformation
      }
    },
    {
      path: '/informationDetail',
      name: 'informationDetail',
      components: {
        default: informationDetail
      }
    },
    {
      path: '/shopDetails',
      name: 'shopDetails',
      components: {
        default: shopDetails
      }
    },
    {
      path: '/receiveCoupons',
      name: 'receiveCoupons',
      components: {
        default: receiveCoupons
      }
    },
    {
      path: '/categoryList',
      name: 'categoryList',
      components: {
        default: categoryList
      }
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      components: {
        default: goodsList
      }
    },
    {
      path: '/allEvaluation',
      name: 'allEvaluation',
      components: {
        default: allEvaluation
      }
    },
    {
      path: '/orderInfo',
      name: 'orderInfo',
      components: {
        default: orderInfo
      }
    },
    {
      path: '/orderList',
      name: 'orderList',
      components: {
        default: orderList
      }
    },
    {
      path: '/inventory',
      name: 'inventory',
      components: {
        default: inventory
      }
    },
    {
      path: '/consigneeList',
      name: 'consigneeList',
      components: {
        default: consigneeList
      }
    },
    {
      path: '/chooseCoupons',
      name: 'chooseCoupons',
      components: {
        default: chooseCoupons
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      components: {
        default: paySuccess
      }
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      components: {
        default: shoppingCart
      }
    },
    {
      path: '/payment',
      name: 'payment',
      components: {
        default: payment
      }
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      components: {
        default: myCollection
      }
    },
    {
      path: '/myTracks',
      name: 'myTracks',
      components: {
        default: myTracks
      }
    },
    {
      path: '/setUp',
      name: 'setUp',
      components: {
        default: setUp
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      components: {
        default: feedback
      }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      components: {
        default: aboutUs
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      components: {
        default: userInfo
      }
    },
    {
      path: '/setNickname',
      name: 'setNickname',
      components: {
        default: setNickname
      }
    },
    {
      path: '/invitationPage',
      name: 'invitationPage',
      components: {
        default: invitationPage
      }
    },
    {
      path: '/messageIndex',
      name: 'messageIndex',
      components: {
        default: messageIndex
      }
    },
    {
      path: '/consultation',
      name: 'consultation',
      components: {
        default: consultation
      }
    },
    {
      path: '/systemMessage',
      name: 'systemMessage',
      components: {
        default: systemMessage
      }
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      components: {
        default: messageDetail
      }
    },
    {
      path: '/myPost',
      name: 'myPost',
      components: {
        default: myPost
      }
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      components: {
        default: personalCenter
      }
    },
    {
      path: '/applyForAdmission',
      name: 'applyForAdmission',
      components: {
        default: applyForAdmission
      }
    },
    {
      path: '/myPoints',
      name: 'myPoints',
      components: {
        default: myPoints
      }
    },
    {
      path: '/myCoupons',
      name: 'myCoupons',
      components: {
        default: myCoupons
      }
    },
    {
      path: '/newAddress',
      name: 'newAddress',
      components: {
        default: newAddress
      }
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      components: {
        default: editAddress
      }
    },
    {
      path: '/orderSchedule',
      name: 'orderSchedule',
      components: {
        default: orderSchedule
      }
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      components: {
        default: orderDetail
      }
    },
    {
      path: '/returnsAfterSales',
      name: 'returnsAfterSales',
      components: {
        default: returnsAfterSales
      }
    },
    {
      path: '/selReturnGoods',
      name: 'selReturnGoods',
      components: {
        default: selReturnGoods
      }
    },
    {
      path: '/applyForReturns',
      name: 'applyForReturns',
      components: {
        default: applyForReturns
      }
    },
    {
      path: '/selEvaluateGoods',
      name: 'selEvaluateGoods',
      components: {
        default: selEvaluateGoods
      }
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      components: {
        default: evaluate
      }
    },
    {
      path: '/evaluateSuccess',
      name: 'evaluateSuccess',
      components: {
        default: evaluateSuccess
      }
    },
    {
      path: '/aliwebPay',
      name: 'aliwebPay',
      components: {
        default: aliwebPay
      }
    },
    {
      path: '/bannerDetail',
      name: 'bannerDetail',
      components: {
        default: bannerDetail
      }
    }
  ]
})
