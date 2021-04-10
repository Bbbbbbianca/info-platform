<template>
  <view class="tf-detail-container">
    <view class="tf-detail-main-part">
      <view class="tf-detail-name-part">
        <view class="tf-detail-name">
          <view class="tf-detail-name-text">
            {{ activity.name }}
          </view>
          <AtButton
            class="tf-detail-action-btn"
            :on-click="onActionHint"
          >
            <AtIcon
              value="menu"
              size="32"
              color="#6190e8"
            />
          </AtButton>
        </view>
      </view>

      <view class="tf-detail-image-part">
        <image
          :src="activity.coverUrl"
          mode="scaleToFill"
          class="tf-detail-image"
          alt="cover"
        />
      </view>

      <view class="tf-detail-info-part">
        <view class="tf-detail-place">
          <image
            src="../../../assets/images/clock.png"
            mode="scaleToFill"
            class="tf-detail-icon"
          />
          <view class="tf-detail-place-text">
            {{ activity.startTime }} - {{ activity.endTime }}
          </view>
        </view>

        <view class="tf-detail-place">
          <image
            src="../../../assets/images/place.png"
            mode="scaleToFill"
            class="tf-detail-icon"
          />
          <view class="tf-detail-place-text">
            {{ activity.place }}
          </view>
        </view>

        <view class="tf-detail-deadline">
          <view class="tf-detail-deadline-text">
            截止时间：{{ activity.deadline }}
          </view>
          <view class="tf-detail-deadline-person">
            人数：{{ activity.numberOfPeople }} / {{ activity.limitOfPeople }}
          </view>
        </view>

        <view class="tf-detail-description">
          <view class="tf-detail-description-text">
            活动简介
          </view>
          <view class="tf-detail-description-context">
            {{ activity.description }}
          </view>
        </view>
      </view>

      <view class="tf-detail-btn-part">
        <AtButton
          type="primary"
          :on-click="toCheckActivity"
          class="tf-detail-btn"
        >
          核销检票
        </AtButton>
      </view>
    </view>

    <AtDrawer
      v-if="actionVisible"
      :show="actionVisible"
      mask
      right
      :on-close="onActionClose"
    >
      <view class="tf-detail-drawer-part">
        <AtListItem
          class="tf-detail-drawer-list"
          title="停止报名"
          :on-click="onStopHint"
        />
        <AtListItem
          class="tf-detail-drawer-list"
          title="修改信息"
          arrow="right"
          :on-click="toEditForm"
        />
        <AtListItem
          class="tf-detail-drawer-list"
          title="查看名单"
          arrow="right"
          :on-click="toViewList"
        />
        <AtListItem
          class="tf-detail-drawer-list"
          title="分享"
          :on-click="toShare"
        />
      </view>
    </AtDrawer>

    <view
      v-if="stopDialogVisible || stopTipVisible || shareDialogVisible"
      class="tf-detail-mask"
    />
    <view
      v-if="stopDialogVisible"
      class="tf-detail-dialog"
    >
      <view class="tf-detail-dialog-card">
        <view class="tf-detail-dialog-content">
          <AtIcon
            value="alert-circle"
            size="60"
            class="tf-detail-dialog-icon"
          />
          <view class="tf-detail-dialog-content-text">
            确定停止该活动的报名？
          </view>
        </view>

        <view class="tf-detail-dialog-action">
          <view
            class="tf-detail-dialog-cancel"
            @tap="cancelStop"
          >
            取消
          </view>
          <view
            class="tf-detail-dialog-confirm"
            @tap="confirmStop"
          >
            确定
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="stopTipVisible"
      class="tf-detail-tip"
    >
      <view class="tf-detail-tip-card">
        <view class="tf-detail-tip-content">
          <AtIcon
            value="check-circle"
            size="48"
            class="tf-detail-tip-icon-check"
          />
          <view class="tf-detail-tip-content-text">
            已取消报名
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import { APP_ROUTES } from "../../../base/constant";
import { ActivityModel } from "../../../models/activity.model";
import { getActivity } from "../../../base/servers/servers";

@Component({
  name: 'Detail',
})
export default class Detail extends Vue {
  activityId: string = '';
  activity: ActivityModel = new ActivityModel();

  actionVisible: boolean = false;
  drawerItems: string[] = ['停止报名', '修改信息', '查看名单', '分享'];
  stopDialogVisible: boolean = false;
  stopTipVisible : boolean=false;
  shareDialogVisible: boolean = false;

  created() {
    /*if (Taro.getCurrentInstance().router.params.id) {
      this.activityId = Taro.getCurrentInstance().router.params.id;
      Taro.setStorageSync({
        key: 'activityId',
        value: this.activityId
      });
    } else {
      this.activityId = Taro.getStorageSync({key: 'activityId'});
    }
    console.log(this.activityId);*/
  }

  mounted() {
    // this.getActivityDetail();
    this.activity.mock();
  }

  getActivityDetail() {
    getActivity(0, 1, this.activityId).then((res: any) => {
      if (res.success) {
        this.activity.engrave(res.data);
      }
    })
  }

  toCheckActivity() {
    Taro.navigateTo({
      url: APP_ROUTES.CHECK
    }) 
  }

  onActionHint() {
    console.log('actionHint')
    this.actionVisible = true;
  }

  onActionClose() {
    console.log('actionClose')
    this.actionVisible = false;
  }

  onStopHint() {
    console.log('点击停止活动报名')
    this.stopDialogVisible = true;
  }

  cancelStop() {
    console.log('取消停止')
    this.stopDialogVisible = false;
  }

  confirmStop() {
    console.log('确认停止')
    this.stopDialogVisible = false;
    // 停止报名
    this.stopTipVisible = true;
    
    this.stopTipVisible = false;
  }

  toEditForm() {
    Taro.navigateTo({
      url: APP_ROUTES.EDIT
    }) 
  }

  toViewList() {
    Taro.navigateTo({
      url: APP_ROUTES.VIEWLIST
    }) 
  }

  onShareHint() {
    console.log('点击分享活动')
    this.shareDialogVisible = true;
  }

  toShare() {
    // 补充分享部分代码
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";
.tf-detail-container {
  position: relative;
  height: 100%;
}

.tf-detail-main-part {
  position: absolute;
  z-index: 0;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tf-detail-name-part {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tf-detail-name {
    width: 100%;
    display: flex;
    font-size: 48px;
    color: $tf-color-dark2;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    .tf-detail-name-text {
      font-size: 36px;
      color: $tf-color-dark4;
    }

    .tf-detail-action-btn {
      margin: 0;
      padding: 0;
      border: none;
      line-height: normal;
    }
  }
}

.tf-detail-image-part {
  width: 90%;
  height: 400px;
  border-radius: 12px;
  box-shadow: 16px 16px 24px $tf-color-grey3;
  margin-top: 12px;

  .tf-detail-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
}

.tf-detail-info-part {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tf-detail-icon {
    width: 48px;
    height: 48px;
  }

  .tf-detail-place {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid $tf-color-grey4;

    .tf-detail-place-text {
      margin-left: 24px;
      font-size: 28px;
      color: $tf-color-dark1;
    }
  }

  .tf-detail-deadline {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid $tf-color-grey4;

    .tf-detail-deadline-text {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 2;
      padding: 24px 0;
    }

    .tf-detail-deadline-person {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 1;
      padding: 24px 16px;
      border-left: 2px solid $tf-color-grey4;
    }
  }

  .tf-detail-description {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 160px;
    padding: 24px 0;

    .tf-detail-description-text {
      font-size: 28px;
      color: $tf-color-dark1;
    }

    .tf-detail-description-context {
      font-size: 24px;
      color: $tf-color-dark2;
      padding: 24px 16px;
    }
  }
}

.tf-detail-btn-part {
  position: fixed;
  bottom: 4px;
  width: 95%;
  .tf-detail-action-btn {
    margin: 24px 0;
  }
}

.tf-detail-drawer-part {
  width: 100%;
}

.tf-detail-drawer-list {
  margin-left: 5px;
  font-size: 32px;
  color: $tf-color-dark2;
  border: none;
}

.tf-detail-mask {
  position: absolute;
  z-index: 950;
  width: 100%;
  height: 100%;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-detail-dialog {
  position: absolute;
  z-index: 999;
  top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
  .tf-detail-dialog-card {
    width: 480px;
    border-radius: 8px;
    background-color: $tf-color-white;

    .tf-detail-dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;

      .tf-detail-dialog-icon {
        color: $tf-color-warning;
        border: 6px;
        padding: 16px;
        border-radius: 50%;
      }

      .tf-detail-dialog-content-text {
        padding: 18px;
        font-size: 32px;
        color: $tf-color-dark1;
        margin: 16px 0;
      }

    }

    .tf-detail-dialog-action {
      display: flex;
      align-items: center;
      border-top: 2px solid $tf-color-grey4;

      .tf-detail-dialog-cancel {
        flex: 1;
        padding: 16px;
        text-align: center;
        font-size: 28px;
        color: $tf-color-dark1;
      }

      .tf-detail-dialog-confirm {
        flex: 1;
        padding: 16px;
        border-left: 2px $tf-color-grey4 solid;
        text-align: center;
        font-size: 28px;
        color: $tf-color-warning;
      }
    }
  }
}

.tf-detail-tip {
  position: absolute;
  z-index: 999;
  top: 460px;
  left: 220px;
  right: 220px;
  bottom: 500px;
  display: flex;
  justify-content: center;
  .tf-detail-tip-card {
    width: 480px;
    border-radius: 8px;
    background-color: $tf-color-dark4;
  }

  .tf-detail-tip-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
  }

  .tf-detail-tip-icon-check {
    margin: 16px 0;
    color: $tf-color-primary;
  }

  .tf-detail-tip-content-text {
    font-size: 32px;
    color: $tf-color-white;
  }
}
</style>
