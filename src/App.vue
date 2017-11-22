<template>
  <div id="app">
    <!--  -->
    <searchHeader ref='searchHeader' v-on:hideresult="hideresult" v-on:showsearch="showsearch"></searchHeader>
    <result ref='result' v-on:playmusic="playmusic" v-on:hideheader="hideheader"></result>
    <router-view ref="index" v-on:showheader="showheader" v-on:hideheader="hideheader" v-on:showheaderandfooter="showheaderandfooter"></router-view>
    <div ref='footer' class="footer" v-show='flag'>
      <div class="btn"><i class="icon-logo"></i><p>发现音乐</p></div>
      <div class="btn"><i class="icon-music"></i><p>我的音乐</p></div>
      <div class="btn"><i class="icon-py"></i><p>朋友</p></div>
      <div class="btn"><i class="icon-zh"></i><p>账号</p></div>
    </div>
  </div>
</template>

<script>
  import searchHeader from './components/search-header/search-header'
  import result from "./components/result/result"
  export default {
    data:function(){
      return {
        flag:true
      }
    },
    methods:{
      showheaderandfooter:function(){
        this.showheader();
      },
      playmusic:function(id){
          this.$refs.index.playmusic(id,"fromSearch");
      },
      hideresult:function(){
        this.$refs.result.hideresult();
      },
      hideheader:function(){
        this.$refs.searchHeader.hideHeader();
        this.flag=false;
      },
      showheader:function(){
        this.$refs.searchHeader.showHeader();
        this.flag=true;
      },
      showsearch:function(val){
        console.log(val);
        this.getResult(val);
        /*this.$refs.result.showresult();  */
      },
      show:function(){
        this.flag = true;
      },
      hide:function(){
        this.flag = false;
      },
      getResult:function(val){
        var _this = this;
        this.$http.get('/search?keywords='+val).then(function(res){
            console.log(res.data);
            _this.$refs.result.showresult(res.data.result.songs);
        })
      }
    },
    components:{
      searchHeader,result
    },
    mounted:function(){
      console.log(this.$refs.index);
    }
  }
</script>
  
<style>
audio{
  position: fixed;
  z-index: 1000;
}
  div,p,*,input{
    margin: 0;
    padding: 0;
  }
  .btn i{
    display: inline-block;
    width: 20px;
    height:20px;
  }
  .select .icon-logo{
    background: url('assets/img/logo.png') no-repeat center;
    background-size: 100%;
  }
  .icon-logo{
    background: url('assets/img/logo1.png') no-repeat center;
    background-size: 100%;
  }
  .icon-music{
    background: url('assets/img/music1.png') no-repeat center;
    background-size: 100%;
  }
  .icon-py{
    background: url('assets/img/py1.png') no-repeat center;
    background-size: 100%;
  }
  .icon-zh{
    background: url('assets/img/zh1.png') no-repeat center;
    background-size: 100%;
  }
  .footer{
    height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,0.95);
    z-index: 200;
    display: flex;
  }
  .footer .btn{
    flex: 1;
    color: #ccc;
    display: flex;
    padding-top: 5px;
    flex-direction: column;
    align-items: center;
  }
  .footer .btn p{
    margin:0;
    font-size: 12px;
    transform: scale(0.7);
  }
</style>
