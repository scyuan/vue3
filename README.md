# vue3

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## 写在前面

> 为什么会想到做一个这样的项目？因为感觉没什么动力，前端的HTML/JS/Jquery/CSS感觉学的东西也会，但是东西太多，总感觉自己知道的太少了，然后又不知道该怎样去提高前端技术。                                                                                         
  这两天也学了点vue，发现东西也多，写了点小项目来学习vue，但是总感觉不够，所以在git上找了两个开源项目来学习
  
#### 一、看别人的博客，这个项目要用到哪些东西
- vue+vue-router（核心框架）
- better-scroll（使移动端滑动体验更加流畅）
- vue-lazyload（用户图片懒加载）
- nprogress（用于加载过渡）
- axios（请求）

##### nprogress

> 用于加载过渡，那么在vue中如何使用

安装

```
npm install --save nprogress
```


都是在main.js中


1.引入依赖


```
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
```

2.如果想ajax请求有progress，加载vue-resource的interceptors中：
  
```
Vue.http.interceptors.push((request, next) => {
  NProgress.start();

  next((response)=>{
    NProgress.done();
  });
});
```

3.如果想路由跳转有progress，加在vue-router的beforeEach和afterEach中

```
router.beforeEach(transition => {
  NProgress.start();
  next();
});

router.afterEach(transition => {
  NProgress.done();
});
```
3.1理解vue中的导航守卫

##### vue-lazyload

1.下载vue-lazyload包


```
npm install vue-lazyload --save
```

2.在main.js中importan这个包


```
import VueLazyload from 'vue-lazyload'
```
3.配置vuelazy-load

```
Vue.use(VueLazyload, {
  error: 'dist/error.png',//这个是请求失败后显示的图片
  loading: 'dist/loading.gif',//这个是加载的loading过渡效果
  try: 2 // 这个是加载图片数量
})
```
4.官方配置api


![image](http://images2015.cnblogs.com/blog/1151727/201705/1151727-20170509143453738-1706116849.png)

5.在组件中

```
<template>
    <div id="rj">
        <ul id="container">
            <li v-for="img in list">
                <img v-lazy="img">
            </li>
        </ul>
    </div>
</template>
<script>
 export default {
    data () {
        return {
             list: [
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
                'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb',
            ]
        }
    }
 }
</script>
```

##### 相关的一些技术准备完毕，现在了解一些代码中的vue知识

> 1.ref

尽管有 prop 和事件，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个引用 ID。例如：

```
vue官方文档

<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```
```
var parent = new Vue({ el: '#parent' })
// 访问子组件实例
var child = parent.$refs.profile
```
当 ref 和 v-for 一起使用时，获取到的引用会是一个数组，包含和循环数据源对应的子组件。
$refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅是一个直接操作子组件的应急方案——应当避免在模板或计算属性中使用 $refs。



---

##### 2017.11.10---今天正式开始写了这个vue仿网易云的项目了
###### 今天也是学到了一些东西

> 1.在vue中使用swiper插件

###### 1.安装swiper

```
//npm
npm install vue-awesome-swiper --save
//cnpm
cnpm install vue-awesome-swiper --save
```
###### 2.在main.js中引入swiper,然后全局注册

```
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

```
###### 3.在组件中使用swiper


```
//1.首先在swiper中引入组件
import {swiper,swiperSlide} from 'vue-awesome-swiper'
//export defult
export default{
    data:function(){
        return {
            //swiper的配置，说是和官网的一样，我没去看，有空去对比一下
            swiperOption: {  
                pagination: '.swiper-pagination',  
                slidesPerView: 'auto',  
                centeredSlides: true,  
                paginationClickable: true,
                onSlideChangeEnd: swiper => {  
                    //这个位置放swiper的回调方法  
                    this.page = swiper.realIndex+1;  
                    this.index = swiper.realIndex;  
                },  
            }
        }  
    },
    components:{
        swiper,swiperSlide
    },
    //定义这个sweiper对象  
    computed: {  
        swiper() {  
            return this.$refs.mySwiper.swiper;  
        }  
    },  
    mounted () {  
        //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
        //this.swiper.slideTo(0, 0, false);  
    }  
}
//2.html
<swiper :options="swiperOption"  ref="mySwiper">  
    <!-- 这部分放你要渲染的那些内容 -->  
    <swiper-slide> 
        <img src="../assets/img/lunbo1.jpg" width="100%" alt="">
    </swiper-slide>  
    <swiper-slide> 
        <img src="../assets/img/lunbo2.jpg" width="100%" alt="">
    </swiper-slide>
    <swiper-slide> 
        <img src="../assets/img/lunbo3.jpg" width="100%" alt="">
    </swiper-slide>
    <swiper-slide> 
        <img src="../assets/img/lunbo4.jpg" width="100%" alt="">
    </swiper-slide>
    <!-- 这是轮播的小圆点 -->  
    <div class="swiper-pagination" slot="pagination"></div>  
</swiper>
```
###### 4.以为到这里是不是就觉得完了？

> 这个时候页面的swiper是没有样式的，所以还需要我们导入样式

在main.js中

```
import 'swiper/dist/css/swiper.css'
```
> 2.关于嵌套使用router-view(后来理解也就是嵌套路由)

###### 1.首先看需求

![image](C:/Users/sichao.yuan/Desktop/aaa.png)

首先应用进来的页面App.vue

```
<template>
  <div id="app">
    //也就是上图中的header.vue
    <searchHeader></searchHeader>
    //下面这个大的紫色框
    <router-view></router-view>
  </div>
</template>
```
router-view所渲染的（path='/'）页面（index.vue）

点击音乐、视频、电台,然后再下面的router-view渲染相应的页面（也就是vue组件）

```
<template>
    <div class="index">
        <div class="select-header">
            <div class="ul">
                <span class="select">音乐</span>
                <span>视频</span>
                <span>电台</span> 
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
```

然后我在main.js中是这样配置路由的

```
const routes = [
    {
        path:'/',
        component:Index,
    }
]
```
运行结果如下

可想而知，index.vue下的router-view并没有渲染东西，原因很正常，因为没有给这个router-view配置路径（或者说路由吧）

![image](C:/Users/sichao.yuan/Desktop/bbb.png)

> 由于对vue的使用不熟悉，有些api自然是不了解，刚开始以为router-view只是一个渲染出口（官方说是渲染出口），跟路由（router）没有任何关系，想不通如何在嵌套的router-view里面渲染vue组件。（后来看了api发现如果要在使用嵌套router-view，就一定要用到嵌套路由，嵌套路由在下面讲），以为只是单纯的进行组件的切换。（其实如果你要改变router-view里面渲染的vue组件，就一定要改变路由）,如果只是简单使用组件切换，无非就是让这个组件隐藏，再让另外一个组件显示呗。自己一定还要好好理解。

> 官方api文档----关于嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

> 其实官方讲的这个例子跟我的需求是一毛一样的。

```
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```
借助 vue-router，使用嵌套路由配置，就可以很简单地表达这种关系。

接着上节创建的 app：

```
<div id="app">
  <router-view></router-view>
</div>

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>：


```
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：

```
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。

你会发现，children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

此时，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```

理解官方对嵌套路由的做法之后，修改了自己的代码，主要是路由的配置：

```
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
```
> 总结 ，首先对问题的不理解，不知道嵌套router-view就是嵌套路由的问题，单纯的理解router-view是一个渲染出口，以为可以手动的在不改变路由的情况下（即就在本页面）把某个组件渲染到router-viewz中。（由此还有一个非router-view嵌套问题，即一个vue中有多个router-view）。希望多总结总结

---
##### 2017/11/13 

有一个问题: npm install axios 这是全局安装吗？？？


今天时间可能来不及了。就是随便写点，明天再总结

vue 使用axios而不适用vue-resource,以及axios的使用方法和跨域解决方法，

z-index有作用域的（因为这个问题，看了别人的做法之后，不得不用$emit，然后有了接下来的问题）

$emit  子组件无法向父组件传值


上面那份问题解决了。。。。父组件接受函数写错地方了。。。

！
蠢蠢蠢蠢蠢------


---
2017年11月14日19:18:00

今天微信小程序官方的Toast如果字数多的情况下，在安卓下是擦除多余的文本，但在iOS下不会，为了解决这种情况，于是想到自己写一个插件，但是我并不会写插件啊，于是去github上面找了一个，半懂半不懂的样子，唉，好好琢磨一下别人写的代码。


接上，上面是晚上加班的时候写的

今天上午是写了一下这个网易云应用，好像也没写多少，就写了一个播放的页面

在播放的页面使用audio不是很熟练（以前根本没用嘛），看了下例子的，给了歌曲的url好像是播放不了。。。也不知道为什么

写到现在vue也算大致了解了一下了，但还不熟练吧

包括我对html,css，布局,js等一些知识也是不是很熟练



---
##### 2017/11/15 

2017年11月15日09:58:10

1.编程式路由导航


声明式| 编程式
---|---
```<router-link :to="...">``` | ```router.push(...)```

```
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

2.获取当前url
```
this.$route
```


---
2017年11月15日11:09:41

感觉做不下去了。。

目前前面提到的vue插件哪些没用呢

better-scroll（使移动端滑动体验更加流畅）


vue-lazyload（用户图片懒加载）

nprogress（用于加载过渡）

使用了axios（非vue插件 ）


---
2017年11月21日20:05:06

今天又重新开始写这个项目，因为实在没事，今天写了搜索模块，写这个模块的时候发现几个问题

1.ref可以用在dom上，vue组件上，==router-view==

2.$emit不仅仅可以用在子组件向父组件传值上，还可以用在router-view内的某个组件向该router-view使用(可能这也是子向父组件传参的一种？)。

3.跳转稍微多一点，状态一多，异常麻烦，脑海里面立马想到用vuex

4.看到一个名词--语法糖？？？？纳尼？？

5.vue事件分为两种，dom绑定事件，自定义事件

6.flex-direction决定了flex-box的主轴方向，justfy-content即表示主轴方向的排列方式，以前一直理解错了，一位justfy-content就是横轴的排列方式


---
2017年11月22日09:11:51

nprogress 插件  已经使用

better-scroll可能目前用不了，因为要改东西，目前可能改不了，太麻烦了



---
2017年11月22日16:56:16

完成了音乐的播放  包括播放、暂停、总时间、当前时间、进度条

总体有这么几个知识点

1.如何实现实时更新时间（歌曲播放的时候）

如何实现呢？摆在我面前有两个问题，audio有没有类似play的事件，即我想在create钩子函数里面写audio.addEventListener('play',function)监听播放时间，然后在里面获取当前播放时长，结果发现这样是实现不了的，原因是不知道是不是没有play这个事件还是什么的，然后看了一下别人写的代码

发现了实现方法
首先是关于vue的v-on语法（这个可能还需要看一下官方的api文档，又或者是我不是很熟悉，虽然可能隐约知道是干嘛的），即绑定dom事件，比如比较常见的v-on:click="doSomething()",在网上找了audio详细资料有一个updatetime事件，于是可以这样写v-on:updatetime='updateTime'

```
html
<audio id="audio" v-bind:src="url" v-on:canplay="canPlay"  v-on:timeupdate='timeUpdate'  controls="controls"></audio>
js
timeUpdate:function(){
    //更新当前时间显示
    //currTime==音频的当前播放时间
    var time = document.getElementById('audio').currentTime
    var seconds = parseInt(time.toString().split('.')[0]);
    console.log('seconds:'+seconds);
    var minutes = parseInt(seconds/60);
    if (minutes<10) {
        minutes = "0"+minutes;
    }
    var second = seconds%60;
    if (second<10) {
        second = "0"+second;
    }
    this.currTime = minutes+":"+second;

    //更新进度条
    var total = document.getElementById('audio').duration;
    //计算比例
    var rate = time/total;
    //获取总长度
    var left = 245*rate;
    document.getElementById('dian').style.left=left+'px';
},
```

2.audio的一些属性和事件 

这个我另外总结在另外一份文档中

3.由上面两点引起的关于vue中v-on的更深层次的理解

其实不用去理解，只是我用的少，v-on的语法就是绑定事件嘛，然后定义函数去处理。

4.js的一些语法（当然并不是去可以去记，只是我今天用到了，但是我不知道，所以我要去网上查资料）---int转string、string转int。除法取整，，当然这一系列还有很多

这个我也另外写成一份文档

5.关于git的使用 将本地项目上传到你的github上面、更新代码

这个也是总结成一份文档，供以后参考








For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
