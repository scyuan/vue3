<template>
	<div class="index">
			<div class="select-header">
				<div id='ul' class="ul">
					<span class="select" v-on:click='move("/")'>音乐</span>
					<span v-on:click='move("/mv")'>视频</span>
					<span v-on:click='move("/radio")'>电台</span> 
				</div>
			</div>
			<router-view ref='rv' v-on:showheader="showheader" v-on:showheaderandfooter="showheaderandfooter" v-on:hideheader='hideheader'></router-view>
	</div>
</template>
<script>
	import musicHome from './music-home'
	export default{
		methods:{
			playmusic:function(id,from){
				this.$refs.rv.showmusic(id,from);
			},
			showheader:function(){
				this.$emit("showheader");
			},
			showheaderandfooter:function(){
				this.$emit("showheaderandfooter");
			},
			hideheader:function(){
				console.log('打开歌单')
				this.$emit("hideheader");
			},
			move:function(path){
				this.$router.push({path:path});
				
				this.changeClass(this.getIndex(path));
			},
			getIndex:function(path){
				var index = 0;
				if (path == '/') {index = 0}
				if (path == '/mv') {index = 1}
				if(path == '/radio'){ index = 2}
				return index;
			},
			changeClass(index){
				var ul = document.getElementById('ul');
				var spans = ul.getElementsByTagName('span')
				for(let i=0;i<spans.length;i++){
					spans[i].className = '';
				}
				spans[index].className = 'select';
			},
		},
		mounted:function(){
			this.changeClass(this.getIndex(this.$route.path))
			console.log(this.$route)
		},
		components:{
			musicHome
		}
	}
</script>
<style scoped>
	.index{
		width: 100%;
		height: 100%;
		padding-top:45px;
		box-sizing: border-box;
		position: relative;
		z-index: 190;
	}
	.clearfix:after { 
	    content: "."; 
	    display: block; 
	    height: 0; 
	    clear: both; 
	    visibility: hidden; 
	} 
	.select-header{
		position: fixed;
		top: 45px;
		width: 100%;
		z-index: 40;
	}
	.ul{
		display: block;
		height: 30px;
		line-height: 30px;
		list-style-type: none;
		display: flex;
		position: relative;
		z-index: 40;
		background: #fff;
		justify-content: space-around;
	}
	.ul span{
		font-size: 14px;
	}
	.ul .select{
		border-bottom: 2px solid #D43B33;
	}
</style>