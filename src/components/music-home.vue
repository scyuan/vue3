<template>
	<div class="music-home" ref='musichome'>
        <div class="content">	
		<swiper :options="swiperOption"  ref="mySwiper">  
            <!-- 这部分放你要渲染的那些内容 -->  
            <swiper-slide v-for='img in lunboList'> 
                <img v-bind:src="img" width="100%" height="100%" alt="">
            </swiper-slide>  
            <!-- 这是轮播的小圆点 -->  
            <div class="swiper-pagination" slot="pagination"></div>  
        </swiper>  
        <div class="mid-menu">
            <div class="menu"><i class="icon-gedan"></i><p>私人FM</p></div>
            <div class="menu"><i class="icon-tuijian"></i><p>每日推荐</p></div>
            <div class="menu"><i class="icon-sjy"></i><p>歌单</p></div>
            <div class="menu"><i class="icon-phb"></i><p>排行榜</p></div>
        </div>
        <div class="tuijiangedan">
            <p>推荐歌单<i class="icon-larrow"></i></p>
            <div class="gedanbox">
                <div class="gedan" v-on:click='open(gedan.id)' v-if='index<3' v-for='(gedan,index) in gedanList'>
                    <!-- 歌单图片和描述 -->
                    <img :src="gedan.picUrl" alt="">
                    <p>{{gedan.name}}</p>
                    <p class="count" v-if='gedan.playCount>10000'><i class='icon-erji'></i>{{getPlayCount(gedan.playCount)}}万</p>
                    <p class="count" v-else>{{gedan.playCount}}</p>
                </div>
            </div>
            <div class="gedanbox">
                <div class="gedan" v-on:click='open(gedan.id)' v-if='index>2' v-for='(gedan,index) in gedanList'>
                    <img :src="gedan.picUrl" alt="">
                    <p>{{gedan.name}}</p>
                    <p class="count" v-if='gedan.playCount>10000'><i class='icon-erji'></i>{{getPlayCount(gedan.playCount)}}万</p>
                    <p class="count" v-else>{{gedan.playCount}}</p>
                </div>
            </div>
        </div>
        <play ref='play' v-on:back='backtogedan'></play>
        <gedandetail ref='detail' v-on:hideheader='hideheader' v-on:showheader='showheader' v-on:openplaypage='showmusic'></gedandetail>
	</div>
    </div>
</template> 
<script>
    import Play from './playpage/play.vue'
    import Gedandetail from './gedanDetail/gedanDetail.vue'
	import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import BScroll from 'better-scroll'
	export default{
		data:function(){
			return {
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
                },
                lunboList:[],
                gedanList:[]
            }  
		},
		components:{
			swiper,swiperSlide,Gedandetail,Play
		},
		//定义这个sweiper对象  
        computed: {  
            swiper() {  
              return this.$refs.mySwiper.swiper;  
            },

        },  
        methods:{
            showheader:function(){
                this.$emit('showheader')
            },
            hideheader:function(){
                this.$emit('hideheader');
            },
            backtogedan:function(from){
                
                if (from!=null&&from=='fromSearch') {
                    this.$emit("showheaderandfooter");
                }else{
                    this.$refs.play.hide();
                }
            },
            showmusic:function(id,from){
                console.log(this.$refs.play);
                this.$refs.play.show(id,from);
            },
            open:function(id){
                this.$refs.detail.show(id);
            },
            getLunbo:function(){
                var _this = this;
                this.$http.get('/banner').then(
                        function(res){
                            console.log(res);
                            for(let i=0;i<res.data.banners.length;i++){
                                _this.lunboList.push(res.data.banners[i].pic)
                            }
                            _this.$nextTick(()=>{
                                if (!this.helloScroll) {
                                  this.helloScroll = new BScroll(this.$refs.musichome, {
                                    click: true
                                  });
                                } else {
                                  this.helloScroll.refresh();
                                }
                            })
                        }
                    )
            },
            getTJgedan:function(){
                var _this = this;
                this.$http.get('/personalized').then(
                        function(res){
                            console.log(res);
                            _this.gedanList = res.data.result
                            _this.$nextTick(()=>{
                                if (!this.helloScroll) {
                                  this.helloScroll = new BScroll(this.$refs.musichome, {
                                    click: true
                                  });
                                } else {
                                  this.helloScroll.refresh();
                                }
                            })
                        }
                    )
            },
            getPlayCount(val){
                if(val <10000){
                    return val;
                }
                var val = val/10000;
                var vals = val.toString().split('.');
                return vals[0];
            }  
        },
        mounted () {  
            //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
            //this.swiper.slideTo(0, 0, false);  
            this.getLunbo();
            this.getTJgedan();
        }  
	}
</script>
<style scoped>
    .music-home{
        padding-top: 30px;
        padding-bottom: 40px;
        z-index: 210;
    }
    .count{
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        display: flex;
        align-items: center;
        padding-right: 5px;
    }
    .icon-erji{
        display: inline-block;
        height: 20px;
        width: 20px;
        background: url('../assets/img/erji.png') no-repeat center;
        background-size: 60%;
    }
    .gedanbox{
        min-height: 150px;
        display: flex;
        margin-top: 10px;
    }
    .gedanbox .gedan{
        flex: 1;
        min-height: 100px;
        margin: 0 5px;
        position: relative;
    }
    .gedanbox .gedan p{
        font-size: 12px;
    }
    .gedanbox .gedan img{
        width: 100%;
    }
    .icon-larrow{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/img/l_arrow.png') no-repeat center;
        background-size: 90%;
    }
    .tuijiangedan>p{
        border-left: 2px solid #D43B33;
        padding-left: 6px;
        font-size: 16px;
        display: flex;
        align-items: center;
    }
    .tuijiangedan{
        margin-top: 10px;
    }
    .menu i{
        display: inline-block;
        width: 55px;
        height: 55px;
        border: 2px solid #D43B33;
        border-radius: 50%;
    }
    .menu p{
        font-size: 14px;
    }
    .icon-phb{
        background: url('../assets/img/phb.png') no-repeat center;
        background-size: 60%;
    }
    .icon-sjy{
        background: url('../assets/img/gedan.png') no-repeat center;
        background-size: 60%;
    }
    .icon-tuijian{
        background: url('../assets/img/rili.png') no-repeat center;
        background-size: 60%;
    }
    .icon-gedan{
        background: url('../assets/img/syj.png') no-repeat center;
        background-size: 60%;
    }
	.swiper-slide{
		height: 150px;
	}
	.swiper-pagination-bullet-active {
	    background:#D43B33;
	}
    .mid-menu{
        height: 100px;
        width: 100%;
        border-bottom: 1px solid #F2F3F5;
        display: flex;
    }
    .mid-menu div{
        padding-top: 10px;
        flex: 1;
        text-align: center;
    }
</style>