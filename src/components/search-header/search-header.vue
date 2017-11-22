<template>
	<div class="search-area" v-show="show_header">
      <i class="icon-tgsq" v-if="show"></i>
        <form id='area' action="" class="search-input" onsubmit="return false;">
          <i class="icon-search"></i>
          <input id="input" type="search" placeholder="搜索音乐、视频、歌词、电台" />
        </form>
      <i class='icon-zzbf' v-if='show'></i>
      <p class="cancel" v-if="!show" v-on:click='cancel'>取消</p>
  </div>
</template>
<script>
	export default{
      data:function(){
        return {  
          i:1,
          show:true,
          show_header:true,
        }
      },
      methods:{
        hideHeader:function(){
          this.show_header = false;
        },
        showHeader:function(){
           this.show_header = true;
        },
        cancel:function(){
          this.show=true;
          this.i=1;
          document.getElementById('area').className='search-input';
          document.getElementById('input').value='';
          this.$emit('hideresult');
        }
      },
      mounted:function(){
          var _this = this;
          var input = document.getElementById('input');
          input.onfocus = function(event){
            if(_this.i==1){
              _this.i = _this.i+1;
              _this.show=false;
              document.getElementById('area').className='search-input add';
              document.getElementById('input').focus();
            }
          }
          input.onsearch=function(){
              var val = document.getElementById('input').value;
              _this.$emit('showsearch',val);
          }

      }
	}
</script>
<style scoped>
  .add{
    margin-left: 15px;
  }
	.search-area{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 230;
    height: 45px;
    background: #D43B33;
    display: flex;
    align-items: center;
  }
  .icon-tgsq{
    width: 40px;
    height: 40px;
    background: url('../../assets/img/tgsq.png') no-repeat center;
    background-size: 60% 60%;
  }
  .icon-zzbf{
    width: 40px;
    height: 40px;
    background: url('../../assets/img/zzbf.png') no-repeat center;
    background-size: 50% 50%;
  }
  .cancel{
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  .search-input{
    flex: 1;
    height: 30px;
    position: relative;
    transition: all 0.3s;
  }
  .icon-search{
    width: 30px;
    height: 30px;
    background: url('../../assets/img/search.png') no-repeat center;
    background-size:40% 40%;
    position: absolute;
    left: 20px;
  }
  .search-input input{
    height: 100%;
    width: 100%; 
    border-radius: 15px;
    padding:0 20px;
    padding-left: 50px;
    box-sizing: border-box;
    outline: 0;
    border: 0;
    transition: all 0.3s;
  }
  .search-input input::-webkit-input-placeholder{
    color: #e2e2e2;
  }
</style>
