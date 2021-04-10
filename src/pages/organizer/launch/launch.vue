<template>
  <view class="tf-launch-container">
    <view class="tf-launch-main-part">
      <view class="tf-launch-form-part">
        <view class="tf-launch-form-picture-part">
          <image
            :src="imageUrl"
            mode="scaleToFill"
            class="tf-launch-form-picture"
          />
          <view class="tf-launch-form-picture-hint">
            <AtButton
              class="tf-launch-form-picture-btn"
              :on-click="toUploadPicture"
            >
              <image
                src="../../../assets/images/upload.png"
                mode="scaleToFill"
                class="tf-launch-form-picture-icon"
              />
            </AtButton>
            <view class="tf-launch-form-picture-text">
              上传活动照片
            </view>
          </view>
        </view>
        <AtInput
          class="tf-launch-form-input"
          name="name"
          title="活动名称"
          type="text"
          clear
          placeholder="预设内容"
          placeholder-style="font-size: 12px;"
          :value="name"
          :on-change="handleInputName"
        />
        <AtListItem
          class="tf-launch-form-list"
          title="开始时间"
          arrow="right"
          :on-click="toInputStartTime"
        />
        <AtListItem
          class="tf-launch-form-list"
          title="结束时间"
          arrow="right"
          :on-click="toInputEndTime"
        />
        <AtInput
          class="tf-launch-form-input"
          name="place"
          title="地点"
          type="text"
          clear
          placeholder="预设内容"
          placeholder-style="font-size: 12px;"
          :value="place"
          :on-change="handleInputPlace"
        />
        <AtListItem
          class="tf-launch-form-list"
          title="活动类别"
          arrow="right"
          :on-click="toInputTypeId"
        />
        <view class="tf-launch-form-textarea-title"> 
          简介
        </view>
        <AtTextarea
          max-length="200"
          placeholder="请输入文本"
          placeholder-style="font-size: 12px;"
          class="tf-launch-form-textarea" 
          :value="description"
          :on-change="handleInputDescription"
        />
        <AtListItem
          class="tf-launch-form-list"
          title="可报名人员"
          arrow="right"
          :on-click="toInputScopeId"
        />
        <AtInput
          class="tf-launch-form-input"
          name="limitOfPeople"
          title="人数限制"
          type="text"
          clear
          placeholder="预设内容"
          placeholder-style="font-size: 12px;"
          :value="limitOfPeople"
          :on-change="handleInputLimitOfPeople"
        />
        <AtListItem
          class="tf-launch-form-list"
          title="报名截止时间"
          arrow="right"
          :on-click="toInputDeadline"
        />
      </view>
      <view class="tf-launch-btn-part">
        <AtButton
          type="primary"
          :on-click="onLaunch"
          class="tf-actvity-btn"
        >
          确认发布
        </AtButton>
      </view>
    </view>
    <view
      v-if="launchSuccessHint"
      class="tf-launch-mask"
    />
    <view
      v-if="launchSuccessHint"
      class="tf-launch-dialog"
    >
      <view class="tf-launch-dialog-card">
        <view class="tf-launch-dialog-content">
          <AtIcon
            value="check-circle"
            size="48"
            class="tf-launch-dialog-icon-check"
          />
          <view class="tf-launch-dialog-content-text">
            发布成功
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import { APP_ROUTES } from "../../../base/constant";
@Component({
  name: 'Launch',
})
export default class Launch extends Vue {
  launchSuccessHint: boolean = false;
  name: string = '';
  imageUrl: string = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg';
  startTime: string = '';
  endTime: string = '';
  deadline: string = '';
  place: string = '';
  limitOfPeople: number = 999;
  typeId: string = '';
  scopeId: string = '';
  description: string = '';

  onLaunch() {
    console.log('确认发布');
    this.name = Taro.getStorageSync('activityName') || '';
    this.startTime = Taro.getStorageSync('activityStartTime') || '';
    this.endTime = Taro.getStorageSync('activityEndTime') || '';
    this.deadline = Taro.getStorageSync('activityDeadline') || '';
    this.place = Taro.getStorageSync('activityPlace') || '';
    this.limitOfPeople = Taro.getStorageSync('activityLimitOfPeople') || 999;
    this.description = Taro.getStorageSync('activityDescription') || '';
    this.typeId = Taro.getStorageSync('activityTypeId') || '';
    this.scopeId = Taro.getStorageSync('activityScopeId') || '';
    
    //补充添加活动的接口

    this.launchSuccessHint = true;
    Taro.navigateBack()
  }

  toUploadPicture() {

  }

  toInputStartTime() {
    Taro.navigateTo({
      url: APP_ROUTES.LAUNCH_TIME + `?type=1`
    }) 
  }

  toInputEndTime() {
    Taro.navigateTo({
      url: APP_ROUTES.LAUNCH_TIME + `?type=2`
    }) 
  }  

  toInputDeadline() {
    Taro.navigateTo({
      url: APP_ROUTES.LAUNCH_TIME + `?type=3`
    }) 
  }

  toInputTypeId() {
    Taro.navigateTo({
      url: APP_ROUTES.LAUNCH_TYPEID
    }) 
  }

  toInputScopeId() {
    Taro.navigateTo({
      url: APP_ROUTES.LAUNCH_SCOPEID
    }) 
  }

  handleInputName(val: string) {
    try {
      Taro.setStorageSync('activityName', val)
    } catch(e) {}
  }

  handleInputPlace(val: string) {
    try {
      Taro.setStorageSync('activityPlace', val)
    } catch(e) {}
  }

  handleInputLimitOfPeople(val: number) {
    try {
      Taro.setStorageSync('activityLimitOfPeople', val)
    } catch(e) {}
  }

  handleInputDescription(val: string) {
    try {
      Taro.setStorageSync('activityDescription', val)
    } catch(e) {}
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-launch-container {
  display: flex;
  flex-direction: column;
}

.tf-launch-main-part {
  position: absolute;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// 表单
.tf-launch-form-part {
  width: 96%;
  margin-bottom: 96px;
}

.tf-launch-form-picture-part {
  height: 350px;
  border-radius: 12px;
  box-shadow: 8px 8px 12px $tf-color-grey3;
  display: flex;
  justify-content: flex-end;
  margin: 16px 10px;

  .tf-launch-form-picture {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  }
  .tf-launch-form-picture-hint {
  position: absolute;
  z-index: 10;
  top: 138px;
  left: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .tf-launch-form-picture-btn {
  padding: 0;
  height: auto;
  border: none;
  line-height: normal;
  }
  .tf-launch-form-picture-icon {
  margin-left: 48px;
  width: 72px;
  height: 72px;
  }
  .tf-launch-form-picture-text {
  margin-left: 32px;
  font-size: 32px;
  color: $tf-color-dark1;
  }
}

.tf-launch-form-input {
  width: 92%;
  font-size: 32px;
  color: $tf-color-dark2;
  border: none;
}

.tf-launch-form-list {
  width: 96%;
  margin-left: 5px;
  font-size: 32px;
  color: $tf-color-dark2;
  border: none;
}

.tf-launch-form-textarea-title {
  font-size: 32px;
  color: $tf-color-dark2;
  margin: 28px;
  border: none;
}

.tf-launch-form-textarea {
  color: $tf-color-dark2;
  font-size: 32px;
  background-color: $tf-color-grey1;
  width: 92%;
  margin-left: 26px;
  margin-right: 26px;
  border: none;
}

// 按钮
.tf-launch-btn-part {
  position: fixed;
  bottom: 0px;
  width: 100%;
  .tf-launch-btn {
    margin: 24px 0;
  }
}

// 提示信息
.tf-launch-mask {
  position: absolute;
  z-index: 950;
  width: 100%;
  height: 1600px;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-launch-dialog {
  position: absolute;
  z-index: 999;
  top: 460px;
  left: 220px;
  right: 220px;
  bottom: 500px;
  display: flex;
  justify-content: center;
.tf-launch-dialog-card {
  width: 480px;
  border-radius: 8px;
  background-color: $tf-color-dark4;
}

.tf-launch-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}

.tf-launch-dialog-icon-check {
  margin: 16px 0;
  color: $tf-color-primary;
}

.tf-launch-dialog-content-text {
  font-size: 32px;
  color: $tf-color-white;
}
}

</style>
