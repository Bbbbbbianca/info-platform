<template>
  <view class="tf-edit-container">
    <view class="tf-edit-main-part">
      <view class="tf-edit-form-part">
        <view class="tf-edit-form-picture-part">
          <image
            :src="imageUrl"
            mode="scaleToFill"
            class="tf-edit-form-picture"
          />
          <view class="tf-edit-form-picture-hint">
            <AtButton
              class="tf-edit-form-picture-btn"
              :on-click="toUploadPicture"
            >
              <image
                src="../../../assets/images/upload.png"
                mode="scaleToFill"
                class="tf-edit-form-picture-icon"
              />
            </AtButton>
            <view class="tf-edit-form-picture-text">
              上传活动照片
            </view>
          </view>
        </view>
        <AtInput
          class="tf-edit-form-input"
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
          class="tf-edit-form-list"
          title="开始时间"
          arrow="right"
          :on-click="toInputStartTime"
        />
        <AtListItem
          class="tf-edit-form-list"
          title="结束时间"
          arrow="right"
          :on-click="toInputEndTime"
        />
        <AtInput
          class="tf-edit-form-input"
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
          class="tf-edit-form-list"
          title="活动类别"
          arrow="right"
          :on-click="toInputTypeId"
        />
        <view class="tf-edit-form-textarea-title"> 
          简介
        </view>
        <AtTextarea
          max-length="200"
          placeholder="请输入文本"
          placeholder-style="font-size: 12px;"
          class="tf-edit-form-textarea" 
          :value="description"
          :on-change="handleInputDescription"
        />
        <AtListItem
          class="tf-edit-form-list"
          title="可报名人员"
          arrow="right"
          :on-click="toInputScopeId"
        />
        <AtInput
          class="tf-edit-form-input"
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
          class="tf-edit-form-list"
          title="报名截止时间"
          arrow="right"
          :on-click="toInputDeadline"
        />
      </view>
      <view class="tf-edit-btn-part">
        <AtButton
          type="primary"
          :on-click="onEditHint"
          class="tf-actvity-btn"
        >
          确认更改
        </AtButton>
      </view>
    </view>
    <view
      v-if="editSuccessHint || editDialogVisible"
      class="tf-edit-mask"
    />
    <view
      v-if="editDialogVisible"
      class="tf-edit-dialog"
    >
      <view class="tf-edit-dialog-card">
        <view class="tf-edit-dialog-content">
          <AtIcon
            value="help"
            size="60"
            class="tf-edit-dialog-icon"
          />
          <view class="tf-edit-dialog-content-text">
            是否需要通知活动参与者？
          </view>
        </view>

        <view class="tf-edit-dialog-action">
          <view
            class="tf-edit-dialog-cancel"
            @tap="cancelNotify"
          >
            否
          </view>
          <view
            class="tf-edit-dialog-confirm"
            @tap="confirmNotify"
          >
            是
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="editSuccessHint"
      class="tf-edit-tip"
    >
      <view class="tf-edit-tip-card">
        <view class="tf-edit-tip-content">
          <AtIcon
            value="check-circle"
            size="48"
            class="tf-edit-tip-icon-check"
          />
          <view class="tf-edit-tip-content-text">
            修改成功
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
  name: 'Edit',
})
export default class Edit extends Vue {
  editSuccessHint: boolean = false;
  editDialogVisible: boolean = false;

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

  created() {
    // 补充获取活动信息的接口
    // 存入缓存
  }

  onEditHint() {
    this.editDialogVisible = true;
  }

  cancelNotify() {
    this.editDialogVisible = false;
    console.log('不通知');
    this.name = Taro.getStorageSync('activityName');
    this.startTime = Taro.getStorageSync('activityStartTime');
    this.endTime = Taro.getStorageSync('activityEndTime');
    this.deadline = Taro.getStorageSync('activityDeadline');
    this.place = Taro.getStorageSync('activityPlace');
    this.limitOfPeople = Taro.getStorageSync('activityLimitOfPeople');
    this.description = Taro.getStorageSync('activityDescription');
    this.typeId = Taro.getStorageSync('activityTypeId');
    this.scopeId = Taro.getStorageSync('activityScopeId');
    
    // 补充编辑活动的接口

    this.editSuccessHint = true;
    Taro.navigateBack()
  }

  confirmNotify() {
    this.editDialogVisible = false;
    console.log('确认更改并通知');
    this.name = Taro.getStorageSync('activityName');
    this.startTime = Taro.getStorageSync('activityStartTime');
    this.endTime = Taro.getStorageSync('activityEndTime');
    this.deadline = Taro.getStorageSync('activityDeadline');
    this.place = Taro.getStorageSync('activityPlace');
    this.limitOfPeople = Taro.getStorageSync('activityLimitOfPeople');
    this.description = Taro.getStorageSync('activityDescription');
    this.typeId = Taro.getStorageSync('activityTypeId');
    this.scopeId = Taro.getStorageSync('activityScopeId');
    
    // 补充编辑活动
    // 补充通知活动更改

    this.editSuccessHint = true;
    Taro.navigateBack()
  }

  toUploadPicture() {

  }

  toInputStartTime() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT_TIME + `?type=1`
    }) 
  }

  toInputEndTime() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT_TIME + `?type=2`
    }) 
  }  

  toInputDeadline() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT_TIME + `?type=3`
    }) 
  }

  toInputTypeId() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT_TYPEID
    }) 
  }

  toInputScopeId() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT_SCOPEID
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

.tf-edit-container {
  display: flex;
  flex-direction: column;
}

.tf-edit-main-part {
  position: absolute;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// 表单
.tf-edit-form-part {
  width: 96%;
  margin-bottom: 96px;
}

.tf-edit-form-picture-part {
  height: 350px;
  border-radius: 12px;
  box-shadow: 8px 8px 12px $tf-color-grey3;
  display: flex;
  justify-content: flex-end;
  margin: 16px 10px;

  .tf-edit-form-picture {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  }
  .tf-edit-form-picture-hint {
  position: absolute;
  z-index: 10;
  top: 138px;
  left: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .tf-edit-form-picture-btn {
  padding: 0;
  height: auto;
  border: none;
  line-height: normal;
  }
  .tf-edit-form-picture-icon {
  margin-left: 48px;
  width: 72px;
  height: 72px;
  }
  .tf-edit-form-picture-text {
  margin-left: 32px;
  font-size: 32px;
  color: $tf-color-dark1;
  }
}

.tf-edit-form-input {
  width: 92%;
  font-size: 32px;
  color: $tf-color-dark2;
  border: none;
}

.tf-edit-form-list {
  width: 96%;
  margin-left: 5px;
  font-size: 32px;
  color: $tf-color-dark2;
  border: none;
}

.tf-edit-form-textarea-title {
  font-size: 32px;
  color: $tf-color-dark2;
  margin: 28px;
  border: none;
}

.tf-edit-form-textarea {
  color: $tf-color-dark2;
  font-size: 32px;
  background-color: $tf-color-grey1;
  width: 92%;
  margin-left: 26px;
  margin-right: 26px;
  border: none;
}

// 按钮
.tf-edit-btn-part {
  position: fixed;
  bottom: 0px;
  width: 100%;
  .tf-edit-btn {
    margin: 24px 0;
  }
}

// 提示信息
.tf-edit-mask {
  width: 100%;
  height: 1800px;
  position: absolute;
  z-index: 950;
  bottom: 0px;
  top: 0px;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-edit-dialog {
  position: absolute;
  z-index: 999;
  top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
  .tf-edit-dialog-card {
    width: 520px;
    border-radius: 8px;
    background-color: $tf-color-white;

    .tf-edit-dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;

      .tf-edit-dialog-icon {
        color: $tf-color-primary;
        border: 6px;
        padding: 16px;
        border-radius: 50%;
      }

      .tf-edit-dialog-content-text {
        padding: 18px;
        font-size: 32px;
        color: $tf-color-dark1;
        margin: 16px 0;
      }

    }

    .tf-edit-dialog-action {
      display: flex;
      align-items: center;
      border-top: 2px solid $tf-color-grey4;

      .tf-edit-dialog-cancel {
        flex: 1;
        padding: 16px;
        text-align: center;
        font-size: 28px;
        color: $tf-color-dark1;
      }

      .tf-edit-dialog-confirm {
        flex: 1;
        padding: 16px;
        border-left: 2px $tf-color-grey4 solid;
        text-align: center;
        font-size: 28px;
        color: $tf-color-primary;
      }
    }
  }
}

.tf-edit-tip {
  position: absolute;
  z-index: 999;
  top: 460px;
  left: 220px;
  right: 220px;
  bottom: 500px;
  display: flex;
  justify-content: center;
  .tf-edit-tip-card {
    width: 480px;
    border-radius: 8px;
    background-color: $tf-color-dark4;
  }

  .tf-edit-tip-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  }

  .tf-edit-tip-icon-check {
    margin: 16px 0;
    color: $tf-color-primary;
  }

  .tf-edit-tip-content-text {
    font-size: 32px;
    color: $tf-color-white;
  }
}
</style>
