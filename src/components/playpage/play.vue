<template>
	<div class="play" v-if='flag'>
		<audio id="audio" v-bind:src="url"  v-on:timeupdate='timeUpdate'  controls="controls"></audio>
		<div class="bg"><img class="blur" v-bind:src="picUrl" alt=""></div>
		<div class="title">
			<i v-on:click='back()' class="icon-back"></i><div class="p"><p class="a">{{name}}</p><p class="b">{{singer.name}}</p></div><i class="icon-share"></i>
		</div>
		<div class="album-box">
			<div class="tou"><div><img src="../../assets/img/stick_bg.png" alt=""></div></div>
			<div class="yuan"><div class="img"><img v-bind:src="picUrl" alt=""></div></div>
		</div>
		<div class="bottom">
			<div class="list">
				<i class="icon-like"></i>
				<i class="icon-download"></i>
				<i class="icon-comment"></i>
				<i class="icon-more"></i>
			</div>
			<div class="time">
				<div class="start">{{currTime}}</div>
				<div class="hengxian">
					<div class="dian"></div>
					<div class="pass"></div>
					<div class="not-pass"></div>
				</div>
				<div class="end">00:00</div>
			</div>
			<div class="caozuo">
				<i class="icon-xhbf"></i>
				<i class="icon-prev"></i>
				<i id='pp' v-on:click="play()" class="icon-play"></i>
				<i class="icon-next"></i>
				<i class="icon-bflb"></i>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return {
				flag:false,	
				song_id:null,
				picUrl:null,
				singer:null,
				name:null,
				url:null,
				from:null,
				currTime:"00:00"
			}
		},
		methods:{
			timeUpdate:function(){
				var time = document.getElementById('audio').currentTime
				var seconds = parseInt(time.toString().split('.')[0]);
				var minutes = seconds/60;
				if (minutes<9) {
					minutes = "0"+minutes;
				}
				var second = seconds%60;
				if (second<9) {
					second = "0"+second;
				}
				this.currTime = minutes+":"+second;
				alert(this.currTime);
			},
			play:function(){
				if (document.getElementById('audio').paused) {
					document.getElementById('pp').className='icon-pause'
					document.getElementById('audio').play();
				}else{
					alert('暂停')
					document.getElementById('audio').pause();
					document.getElementById('pp').className='icon-play'
				}
			},
			back:function(){
				this.$emit('back',this.from);
				this.flag = false; 
			},
			hide:function(){
				this.flag=false;
			},
			show:function(id,from){
				this.flag = true;
				var _this = this;
				this.from = from;
				this.$http.get('/song/detail?ids='+id).then(function(res){
					console.log(res);
					//歌曲编号
					_this.song_id = res.data.privileges[0].id;
					_this.name = res.data.songs[0].name;
					_this.picUrl = res.data.songs[0].al.picUrl;
					_this.singer = res.data.songs[0].ar[0];
					console.log('获取歌曲详情完成')
				}).then(function(){
					_this.$http.get('/music/url?id='+_this.song_id).then(function(res){
						console.log('获取url')
						console.log(res);
						/*_this.url = res.data.data[0].url;*/
						_this.url="http://music.163.com/song/media/outer/url?id="+id+".mp3"

					})
				})
			}
		},
		created:function(){
			
		}
	}
</script>
<style scoped>
	audio{
		position: fixed;
		z-index: 1000;
		height: 0;
	}
	.caozuo{
		height: 50%;
		width: 350px;
		max-width: 350px;
		display: flex;
		margin:0 auto;
	}
	.caozuo i{
		flex: 1;
	}
	.icon-xhbf{
		background: url('../../assets/img/xhbf.png') no-repeat center;
		background-size: 35%;
	}
	.icon-prev{
		background: url('../../assets/img/next.png') no-repeat center;
		background-size: 45%;
	}
	.icon-play{
		background: url('../../assets/img/play_w.png') no-repeat center;
		background-size: 65%;
	}
	.icon-pause{
		background: url('../../assets/img/pause.png') no-repeat center;
		background-size: 65%;
	}
	.icon-next{
		background: url('../../assets/img/prev.png') no-repeat center;
		background-size: 39%;
	}
	.icon-bflb{
		background: url('../../assets/img/bflb.png') no-repeat center;
		background-size: 30%;
	}
	.time{
		color:#fff;
		font-size: 14px;
		height: 20%;
		width: 350px;
		max-width: 350px;
		margin:0 auto;
		display: flex;
		align-items: center;
	}
	.hengxian{
		height: 2px;
		width: 300px;
		margin:0 10px;
		background: #ccc;
		border-radius: 1px;
		position: relative;
	}
	.dian{
		width: 12px;
		height: 12px;
		border-radius: 6px;
		background: #9A1506;
		box-sizing: border-box;
		border:4px solid #fff;
		position: absolute;
		left: 0;
		top: -5px;
	}
	.list{
		height: 30%;
		width: 300px;
		max-width: 300px;
		margin:0 auto;
		box-sizing: border-box;
		display: flex;
	}
	.list i{
		flex: 1;
	}
	.icon-like{
		background: url('../../assets/img/heart.png') no-repeat center;
		background-size: 40%;
	}
	.icon-download{
		background: url('../../assets/img/download.png') no-repeat center;
		background-size: 40%;
	}
	.icon-comment{
		background: url('../../assets/img/comment.png') no-repeat center;
		background-size: 30%;
	}
	.icon-more{
		background: url('../../assets/img/sandian.png') no-repeat center;
		background-size: 50%;
	}
	.play{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 1000;
		overflow: hidden;
	}
	.bg{
		position: absolute;
		top: 0;
		width: 110%;
		height: 110%;
		top: -5%;
		left: -5%;
		z-index: -1;
		background: rgba(0,0,0,1);
	}
	.bg img{
		width: 100%;
		height: 100%;
		filter: blur(20px);
	}
	.title{
		height: 50px;
		width: 100%;
		margin-top: 0px;
		border-bottom: 1px solid #fff;
		position: relative;
		display: flex;
		justify-content: center;
	}
	.title i{
		display: block;
		height: 50px;
		width: 50px;
		position: absolute;
		top: 0;
	}
	.icon-back{
		background: url('../../assets/img/r_arrow.png') no-repeat center;
		background-size: 45%;
		left: 0;
	}
	.icon-share{
		background: url('../../assets/img/share.png') no-repeat center;
		background-size: 45%;
		right: 0;
	}
	.title .p{
		color: #fff;
		display: inline-block;
		width: 70%;
		height: 50px;
		font-size: 17px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.title .p p{
		margin:0;
	}
	.title .b{
		font-size: 12px;
	}
	.album-box{
		width: 100%;
		height: 60%;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 80px;
		position: relative;
	}
	.tou{
		position: fixed;
		left: 0;right: 0;
		top: 51px;
		margin:0 auto;
		width: 200px;
		height: 200px;
		overflow: hidden;
		z-index: 1000;
	}
	.tou div{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.tou div img{
		display: block;
		position: absolute;
		top: -22px;
		left: 78px;
		width: 120px;
		height: 180px;
	}
	.yuan{
		width: 300px;
		height: 300px;
		border-radius: 150px;
		margin:0 auto;
		background: #fff;
		background: url('../../assets/img/placeholder_disk_play_song.png') no-repeat center;
		background-size: contain;
		animation: round linear 30s infinite;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.yuan .img{
		width: 220px;
		height: 220px;
		background: #fff;
		overflow: hidden;
		border-radius: 50%;
	}
	.yuan .img img{
		width: 100%;
	}
	@keyframes round{
		from{transform: rotate(0deg)}
    	to{transform: rotate(360deg)}
	}
	.bottom{
		width: 100%;
		height: 30%;
		position: absolute;
		bottom: 0;
	}
</style>