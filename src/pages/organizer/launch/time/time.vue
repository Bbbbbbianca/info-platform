<template>
  <view class="tf-time-container">
    <view class="tf-time-main-part">
      <view class="tf-time-main-calender-part">
        <AtCalendar
          :on-day-click="onSelectDate"
          class="tf-time-main-calender"
        /> 
      </view>
      <view class="tf-time-main-timepicker-part">
        <picker
          :value="timeSel"
          mode="time"
          bindchange="onSelectTime"
        >
          <view class="tf-time-main-timepicker">
            {{ timeSel }}
          </view>
        </picker>
      </view>
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
import Taro from '@tarojs/taro';
import { getCurrentInstance } from '@tarojs/taro'

@Component({
  name: 'Time',
})
export default class Time extends Vue {
  timeSel: string='00:00';
  dateSel: string='2021-01-01';
  type: number=1;

  created() {
    this.type =  Number(getCurrentInstance().router.params.type)
    console.log(this.type)
  }

  onSelectDate(val) {
    this.dateSel = val.value;
    console.log(val.value);
  }

  onSelectTime(val) {
    this.timeSel = val.value;
    console.log(val.value);
  }

  toSubmit() {
    if (this.type == 1) {
      try {
        Taro.setStorageSync('activityStartTime', this.dateSel + ' ' + this.timeSel)
      } catch(e) {}
    }
    if (this.type == 2) {
      try {
        Taro.setStorageSync('activityEndTime', this.dateSel + ' ' + this.timeSel)
      } catch(e) {}
    }
    if (this.type == 3) {
      try {
        Taro.setStorageSync('activityDeadline', this.dateSel + ' ' + this.timeSel)
      } catch(e) {}
    }
    Taro.navigateBack()
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
  width: 100%;
  align-items: center;
}

.tf-time-main-calender-part {
  border-bottom: 2px solid #cccccc;
}

.tf-time-main-calender {
  width: 100%;
  margin-bottom: 32px;
  color: $tf-color-dark2;
  letter-spacing: 4px;
}

.tf-time-main-timepicker {
  border-bottom: 2px solid #cccccc;
  height: 80px;
}

.tf-time-main-timepicker {
  padding-top: 32px;
  padding-left: 300px;
  width: 100%;
  letter-spacing: 8px;
  color: $tf-color-dark2;
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
