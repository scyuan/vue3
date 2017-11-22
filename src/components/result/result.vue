<template>
	<div class="result" v-show='show'>
			<ul class="list">
				<li v-for='(item,index) in songs' v-on:click="play(index)">
					<div class="wenzi">
						<p class="name">{{item.name}}</p>
						<p class="sub">{{getSingers(item.artists)}}&nbsp;-&nbsp;{{item.album.name}}</p>
					</div>
					<i class="icon-more"></i>
				</li>
			</ul>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				show:false,
				songs:null
			}
		},
		methods:{
			play:function(index){
				var _this= this;
				this.$emit('playmusic',_this.songs[index].id);
				this.show=false;
				this.$emit('hideheader');
			},
			getSingers(artists){
				var result = '';
				for(let i=0;i<artists.length;i++){
  					if(i!=artists.length-1)
					{
						result = result + artists[i].name+'/';
					}	
					else{
						result = result + artists[i].name;
					}
				}
				return result
			},
			showresult:function(list){
				this.show = true;
				this.songs = list;
			},
			hideresult:function(){
				this.show = false;
			}
		}
	}
</script>
<style scoped>
	.wenzi{
		height: 100%;
		width: 90%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.wenzi p{
		width: 100%;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.icon-more{
		display: block;
		width: 30px;
		height: 30px;
		background: url('../../assets/img/shenlue.png') center no-repeat;
		background-size: 100%;
	}
 	.name{
 		color: #3091D1;
 	}
 	.sub{
 		font-size: 12px;
 		color: #777;
 	}
	.result{
		width:100%;
		height: 100%;
		background: #fff;
		top: 0;
		left: 0;
		z-index: 210;
		position: fixed;
		box-sizing: border-box;
		background-clip: content-box;
		padding-top: 45px;
	}
	.list{
		list-style-type: none;
		height: 100%;
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
		overflow: scroll;
	}
	.list li{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		float: left;
		width: 100%;
		border-top: 1px solid #eee;
		height: 50px;
		min-height: 50px;
	}
</style>