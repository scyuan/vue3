<template>

<transition name="slide">
	<div class="detail" v-show='flag'>
		<div class="title">
			<i class="icon-larrow" v-on:click='back()'></i>
			<p>歌单</p>
			<i class="icon-zzbf"></i>
		</div>
		<div class="header">
			<div class="bg">
				<img v-bind:src="playlist.coverImgUrl" alt="">
			</div>
			
			<div class="desc clearfix">
				<div class="img">
					<img v-bind:src="playlist.coverImgUrl" alt="">
					<!-- <p class="count" v-if='gedan.playCount>10000'><i class='icon-erji'></i>{{getPlayCount(gedan.playCount)}}万</p>
					                    <p class="count" v-else>{{gedan.playCount}}</p> -->
				</div>
				<div class="wenzi">
					<p>{{playlist.name}}</p>
					<p class="author"><span><img v-bind:src="playlist.creator.backgroundUrl" width="100%" alt=""></span>{{playlist.creator.nickname}}</p>
				</div>
			</div>
			<div class="list">
				<div class="item"><i class="icon-add"></i><p>{{playlist.subscribedCount}}</p></div>
				<div class="item"><i class="icon-comment"></i><p>{{playlist.commentCount}}</p></div>
				<div class="item"><i class="icon-share"></i><p>{{playlist.shareCount}}</p></div>
				<div class="item"><i class="icon-download"></i><p>下载</p></div>
			</div>
		</div>
		<!-- 歌单列表 -->
		<div class="musicList clearfix">
			<div class="music-title clearfix">
				<i class="icon-play"></i>
				<div class="i-wenzi clearfix">
					<p class="a">播放全部</p>
					<p class="b">(共{{playlist.trackCount}}首)</p>
					<p class="c">多选</p>
					<i class="icon-list"></i>
				</div>
			</div>
			<div v-on:click='play(index)' class="music-list" v-for='(item,index) in playlist.tracks'>
				<div class="index">{{index+1}}</div>
				<div class="music-info">
					<p class="name">{{item.name}}</p>
					<p class="singer">{{item.ar[0].name}} - {{item.al.name}}</p>
				</div>
				<i class="icon-more"></i>
			</div>
		</div>
	</div>
</transition>
</template>
<script>
	export default{
		data:function(){
			return {
				flag:false,
				playlist:{}
			}
		},
		methods:{
			play:function(index){
				var id = this.playlist.trackIds[index].id;
				console.log(id+'歌曲被点击')
				//this.$emit('openplaypage',id);
				this.$emit("openplaypage",id);
			},
			back:function(){
				this.flag = false;
				this.$emit('showheader')
			},
			show:function(id){
				
				var _this = this;
				this.$http.get('/playlist/detail?id='+id).then(function(res){
					console.log(res.data);
					_this.playlist = res.data.playlist;
					
				}).then(function(){
					_this.flag = true;
					_this.$emit('hideheader');
				})
			}
		}
	}
</script>
<style scoped>
	.slide-enter-active {
  		transition: all .3s;
	}
	.slide-leave-active {
  		transition: all .3s;
	}
	.slide-enter-to{
		transform: translateX(0);
	}
	.slide-leave{
		transform: translateX(0);
	}
	.slide-enter, .slide-leave-to{
  		transform: translateX(100%);
	}
	.clearfix:after { 
	    content: "."; 
	    display: block; 
	    height: 0; 
	    clear: both; 
	    visibility: hidden; 
	} 
	.detail{
		box-sizing: border-box;
		padding-bottom: 50px;
		position: fixed;
		top: 0;
		width: 100%;
		height:100%;
		background: #fff;
		z-index: 60;
		overflow: scroll;
	}
	.header{
		height: 260px;
		background: rgba(0,0,0,0.6);
		position: relative;
		overflow: hidden;
		color: #fff;
	}
	.bg{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(10px);
		z-index: -1;
	}
	.bg img{
		width: 100%;
		height: 100%;
	}
	.title{
		height: 40px;
		width: 100%;
		position: fixed;
		top: 0;
		color: #fff;
		z-index: 60;
		background: rgba(0,0,0,0.3);
	}
	.title p{
		float: left;
		line-height: 40px;
		margin-left: 37%;
		text-align: center;
	}
	.icon-larrow{
		display: inline-block;
		float: left;
		height: 40px;
		width: 40px;
		background: url('../../assets/img/r_arrow.png') no-repeat center;
		background-size: 50%;
		vertical-align: middle;
		line-height: 40px;
	}
	.icon-zzbf{
		display: inline-block;
		float: right;
		height: 40px;
		width: 40px;
		background: url('../../assets/img/zzbf.png') no-repeat center;
		background-size: 50%;
		vertical-align: middle;
		line-height: 40px;
	}
	.desc{
		width: 100%;
		padding: 15px;
		margin-top: 40px;
		box-sizing: border-box;
	}
	.desc .img{
		float: left;
		width: 40%;
		margin-right: 15px;
		max-width: 138px;
	}
	.desc .img img{
		width: 100%;
	}
	.desc .wenzi{
		box-sizing: border-box;
		float: left;
		width: 55%;
		padding-top: 15px;
	}
	.wenzi span{
		display: inline-block;
		overflow: hidden;
		width: 26px;
		height: 26px;
		margin-right: 8px;
		border-radius: 13px;
	}
	.author{
		font-size: 13px;
		color: #ccc;
		display: flex;
		margin-top: 10px;
		align-items: center;
	}
	.list{
		height: 48px;
		width: 100%;
		display: flex;
	}
	.item{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 5px;
	}
	.item p{
		font-size: 12px;
		color: #ccc;
	}
	.item i{
		display: block;
		width:30px;
		height: 30px;
	}
	.icon-add{
		background: url('../../assets/img/add.png') no-repeat center;
		background-size: 85%;
	}
	.icon-comment{
		background: url('../../assets/img/comment.png') no-repeat center;
		background-size: 85%;
	}
	.icon-share{
		background: url('../../assets/img/share.png') no-repeat center;
		background-size: 85%;
	}
	.icon-download{
		background: url('../../assets/img/download.png') no-repeat center;
		background-size: 85%;
	}
	.music-title{
		height:45px;
		width: 100%;
	}
	.icon-play{
		display: block;
		float: left;
		width: 45px;
		height: 45px;
		background: url('../../assets/img/play.png') no-repeat center;
		background-size: 60%;
	}
	.icon-list{
		display: block;
		float: right;
		width: 45px;
		height: 45px;
		background: url('../../assets/img/liebiao.png') no-repeat center;
		background-size: 50%;
	}
	.music-title p{
		line-height: 45px;
		vertical-align: middle;
		color: #2c2c2c;
		display: inline-block;
	}
	.i-wenzi{
		border-bottom: 1px solid #eee;
		width: 88%;
		float: left;
	}
	.music-title .b{
		color: #aaa;
		font-size: 14px;
	}
	.music-title .c{
		float: right;
		margin-right: 15px;
	}
	.music-title .a{
		float: left;
	}
	.music-list{
		height: 50px;
	}
	.music-list .index{
		width: 45px;
		height: 50px;
		float: left;
		text-align: center;
		line-height: 50px;color: #999;
	}
	.music-info{
		float: left;
		position: relative;
		width: 88%;
		height: 100%;
		border-bottom: 1px solid #eee;
		padding-top: 5px;
		box-sizing: border-box;
	}
	.music-info .name{
		color: #2c2c2c;
		width: 80%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.singer{
		color: #666;
		font-size: 12px;
		width: 80%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.icon-more{
		display: block;
		height: 50px;
		width: 50px;
		position: absolute;
		right: 0;
		background: url('../../assets/img/shenlue.png') no-repeat center;
		background-size: 60%;
	}
</style>