<template>
  <view class="tf-check-container">
    <view class="tf-check-code-image">
      <!--写一个扫描二维码-->
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: 'Check'
})
export default class Check extends Vue{

  onCheckQR() {
    console.log('扫描二维码');
  }
}

</script>

<style lang="scss">
@import "src/assets/variables.scss";
.tf-check-container {
  position: relative;
  height: 100%;
  background-color: $tf-color-dark2;
  opacity: 0.78;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tf-check-code-image {
  position: absolute;
  top: 200px;
  width: 500px;
  min-height: 500px;
  background-color: $tf-color-dark3;
  display: flex;
}

</style>
