<template>
  <div id="">
    <video id="my_video_1" class="video-js vjs-default-skin" autoplay="autoplay"   width="300px" height="200px" data-setup="{}">
      <source src="http://172.16.7.2:83/openUrl/xznGjG8/live.m3u8" type="application/x-mpegURL">
    <!--<source src="https://fzninja.github.io/#/assembly/fz-live" type="application/x-mpegURL">-->
    <!--<source src="http://10.3.10.110:8000/openUrl/JZMsc4o/live.m3u8" type="application/x-mpegURL">-->
  </video>
  </div>
</template>

<script>
export default {
  props:['vurl'],
  watch:{
    vurl(old,newurl){
      console.log("come in watch==>"+newurl)
    }
  },
  name: 'App',
  components:{
  },
  data() {
    return {
      timer: '' //延时器
    };
  },
  methods: {
    //实时搜索
    searchEvent() {
      this.clearTimer();
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      //页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      // this.InitialLoading = false
    }, 2000);
  },
  created() {
   
  }
};
</script>

<style scoped lang="scss">
.mint-search-list {
  height: 0;
}

</style>
