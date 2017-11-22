<template>
	<div class="mv-home">
		<div class="mv" v-for='item in mv_list'>
			<img v-bind:src="item.cover" alt="">
			<i class="icon-play"></i>
			<div class="playCount"><i class="icon-shiping"></i>{{item.playCount}}</div>
			<p>{{item.name}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		data:function(){
			return {
				mv_list:[]
			}
		},
		mounted:function(){
			var _this = this;
			this.$http.get('/top/mv?limit=10').then(function(res){
				console.log(res);
				_this.mv_list = res.data.data;
			})
		}
	}
</script>
<style scoped>
	.mv-home{
		padding-top: 30px;
		padding-bottom: 40px;
	}
	.mv{
		width: 100%;
		position: relative;	
	}
	.mv img{
		width: 100%;
		position: relative;
	}
	.icon-shiping{
		display: block;
		width: 20px;
		height: 20px;
		background: url('../assets/img/sp.png') no-repeat center;
		background-size: 100%;
		margin-right: 5px;
	} 
	.icon-play{
		position: absolute;
		width: 50px;
		height: 50px;
		background: url('../assets/img/play_w.png') no-repeat center;
		background-size: 100%;
		left: 0;
		right: 0;
		top: 35%;
		margin:0 auto;
	}
	.playCount{
		position: absolute;
		width: 100%;
		height: 20px;
		padding-left: 15px;
		color: #fff;
		bottom: 30px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
	.mv p{
		padding-left:15px;
		font-size: 16px;
		margin-bottom: 20px;
	}
</style>