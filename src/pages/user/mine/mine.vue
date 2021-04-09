<template>
  <view class="tf-mine-container">
    <view class="tf-mine-info">
      <view class="tf-mine-avatar">
        <AtAvatar
          circle
          :image="user.avatarUrl"
          class="tf-mine-avatar-size"
        />
        <view class="tf-mine-nickname">
          {{ user.nickname }}
        </view>
      </view>
      <view class="tf-mine-guide">
        <view class="tf-mine-guide-text">
          个人主页
        </view>
        <view @tap="toSpace">
          <AtIcon
            value="chevron-right"
            class="tf-mine-guide-icon"
          />
        </view>
      </view>
    </view> 
    <view class="tf-mine-list">
      <view class="tf-mine-list-item">
        <view class="tf-mine-list-item-text">
          我参与的
        </view>
        <view @tap="toJoin">
          <AtIcon
            value="chevron-right"
            class="tf-mine-list-item-icon"
          />
        </view>
      </view>
      <view class="tf-mine-list-item">
        <view class="tf-mine-list-item-text">
          意见反馈
        </view>
        <view @tap="toFeedback">
          <AtIcon
            value="chevron-right"
            class="tf-mine-list-item-icon"
          />
        </view>
      </view>
      <view class="tf-mine-list-item">
        <view class="tf-mine-list-item-text">
          退出登录
        </view>
        <view @tap="onShowLogout">
          <AtIcon
            value="chevron-right"
            class="tf-mine-list-item-icon"
          />
        </view>
      </view>
    </view>
    <view
      v-if="showLogout"
      class="tf-mine-mask"
    />
    <view
      v-if="showLogout"
      class="tf-mine-dialog"
    >
      <view class="tf-mine-dialog-card">
        <view class="tf-mine-dialog-content">
          <AtIcon
            value="alert-circle"
            size="60"
            class="tf-mine-dialog-icon"
          />
          <view class="tf-mine-dialog-content-text">
            确定退出登录？
          </view>
        </view>

        <view class="tf-mine-dialog-action">
          <view
            class="tf-mine-dialog-cancel"
            @tap="cancelLogout"
          >
            取消
          </view>
          <view
            class="tf-mine-dialog-confirm"
            @tap="confirmLogout"
          >
            确定
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../../base/constant";
import {UserModel} from "../../../models/user.model";

@Component({
  name: 'Mine'
})
export default class Mine extends Vue{
  user: UserModel = new UserModel();
  showLogout: boolean = false;

  mounted() {
    this.user.mock();
  }

  toSpace() {
    console.log('去个人主页');
    Taro.navigateTo({
      url: APP_ROUTES.SPACE
    });
  }

  toJoin() {
    console.log('去我参与的');
    Taro.navigateTo({
      url: APP_ROUTES.JOIN+'?id='+this.user.id
    });
  }

  toFeedback() {
    console.log('去意见反馈');
    Taro.navigateTo({
      url: APP_ROUTES.FEEDBACK
    });
  }

  onShowLogout() {
    console.log('展示退出确认框');
    this.showLogout = true;
  }

  cancelLogout() {
    console.log('取消退出');
    this.showLogout = false;
  }

  confirmLogout() {
    console.log('确认退出');
    this.showLogout = false;
    Taro.redirectTo({
      url: APP_ROUTES.USRWELCOME
    });
  }

}

</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-mine-container {
  position: relative;
  height: 100%;
}

.tf-mine-info {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 0;
  background-color: $tf-color-grey2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 128px 48px 96px;

  .tf-mine-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .tf-mine-avatar-size {
      width: 128px;
      height: 128px;
    }

    .tf-mine-nickname {
      font-size: 32px;
      color: $tf-color-dark1;
      margin-left: 32px;
    }
  }

  .tf-mine-guide {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .tf-mine-guide-text {
      font-size: 24px;
      color: $tf-color-dark3;
    }

    .tf-mine-guide-icon {
      font-size: 32px;
      color: $tf-color-primary;
      line-height: normal;
      margin-left: 8px;
    }
  }
}

.tf-mine-list {
  position: absolute;
  top: 350px;
  left: 0px;
  right: 0px;
  z-index: 0;
  padding: 48px;

  .tf-mine-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px $tf-color-grey4 solid;
    padding: 32px 0;

    .tf-mine-list-item-text {
      font-size: 28px;
      color: $tf-color-dark1;
    }

    .tf-mine-list-item-icon {
      font-size: 32px;
      color: $tf-color-dark3;
      line-height: normal;
      margin-left: 8px;
    }
  }
}

.tf-mine-mask {
  position: absolute;
  z-index: 50;
  width: 100%;
  height: 100%;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-mine-dialog {
  position: absolute;
  z-index: 99;
  top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
  .tf-mine-dialog-card {
    width: 480px;
    border-radius: 8px;
    background-color: $tf-color-white;

    .tf-mine-dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;

      .tf-mine-dialog-icon {
        color: $tf-color-warning;
        border: 6px;
        padding: 16px;
        border-radius: 50%;
      }

      .tf-mine-dialog-content-text {
        padding: 18px;
        font-size: 32px;
        color: $tf-color-dark1;
        margin: 16px 0;
      }

    }

    .tf-mine-dialog-action {
      display: flex;
      align-items: center;
      border-top: 2px solid $tf-color-grey4;

      .tf-mine-dialog-cancel {
        flex: 1;
        padding: 16px;
        text-align: center;
        font-size: 28px;
        color: $tf-color-dark1;
      }

      .tf-mine-dialog-confirm {
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

</style>