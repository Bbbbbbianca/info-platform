<template>
  <view class="tf-time-container">
    <view class="tf-time-main-part">
      <AtCalendar
        :on-day-click="onSelectDate"
        class="tf-time-main-calender"
      /> 
    </view>
    <view class="tf-time-btn-part">
      <AtButton
        type="primary"
        :on-click="toSubmit"
        class="tf-time-btn"
      >
        确定
      </AtButton>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
// import Taro from '@tarojs/taro';
// import {APP_ROUTES} from "../../../base/constant";

@Component({
  name: 'Time',
})
export default class Time extends Vue {
  onSelectDate(val: string) {
    console.log(val);
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-time-container {
  display: flex;
  flex-direction: column;
}

.tf-time-main-part {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tf-time-main-calender {
  width: 100%;
  background-color: $tf-color-white;
  border-top: 2px #f8f8f8 solid;
}

// 按钮
.tf-time-btn-part {
  position: fixed;
  bottom: 0px;
  width: 100%;
  .tf-time-btn {
    margin-top: 24px;
  }
}
</style>
