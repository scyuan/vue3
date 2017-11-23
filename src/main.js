// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import axios from 'axios'
//1.npm install vue-swesom-swiper --save
//2.
import VueAwesomeSwiper from 'vue-awesome-swiper'
//3.全局注册
Vue.use(VueAwesomeSwiper)
//4.在模板中使用
Vue.use(Router)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Index from './components/Index'
import musicHome from './components/music-home'
import mvHome from './components/mv-home'
import radioHome from './components/radio-home'
import '../static/swiper/swiper-3.4.2.min.css'
const routes = [
	{
		path:'/',
		redirect:'/music',
		component:Index,
		children:[
			{
				path:'music',
				component:musicHome
			},
			{
				path:'mv',
				component:mvHome
			},
			{
				path:'radio',
				component:radioHome
			}
		]
	}
]

const router = new Router({
	routes
})
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
