<template>
  <div class="index-list-top">
      <span @click="goback" class="cubeic-back"></span>
      <p class="desc">{{title}}</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class BackTitle extends Vue {
  @Prop(String) private title!: string;
  goback() {
    this.$router.go(-1);
  }
}
</script>
<style lang="scss" scoped>
.index-list-top {
  display: flex;
  flex-direction: row;
  background-color: orange;
  height: 40px;
  .cubeic-back {
    width: 20px;
    height: 40px;
    line-height: 40px;
  }
  .desc {
    flex: 1;
    padding: 10px 0;
    text-align: center;
  }
}
</style>
