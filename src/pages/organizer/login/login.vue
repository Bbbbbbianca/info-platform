<template>
  <view class="tf-login-container">
    <AtNoticebar>注册请前往网页：——</AtNoticebar>
    <view class="tf-login-main-part">
      <view class="tf-login-card">
        <view class="tf-login-card-title-text">
          登录
        </view>
        <view class="tf-login-card-title-tab" />

        <AtInput
          name="account"
          title="账号"
          type="text"
          clear
          :border="false"
          placeholder="请输入账号"
          placeholder-style="font-size: 12px;"
          class="tf-login-first-input"
          :value="account"
          :on-change="handleInputAccount"
        />

        <AtInput
          name="password"
          title="密码"
          type="text"
          clear
          :border="false"
          placeholder="请输入密码"
          placeholder-style="font-size: 12px;"
          class="tf-login-second-input"
          :value="password"
          :on-change="handleInputPassword"
        />
      </view>

      <AtButton
        type="primary"
        :on-click="ToCheck"
      >
        进入主页面
      </AtButton>
    </view>
    <view
      v-if="loginSuccessHint || unloginSuccessHint || loginingHint"
      class="tf-login-mask"
    />
    <view
      v-if="loginingHint"
      class="tf-login-dialog"
    >
      <view class="tf-login-dialog-card">
        <view class="tf-login-dialog-content">
          <AtIcon
            value="loading-2"
            size="48"
            class="tf-login-dialog-icon-loading"
          />
          <view class="tf-login-dialog-content-text">
            正在登录...
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="loginSuccessHint"
      class="tf-login-dialog"
    >
      <view class="tf-login-dialog-card">
        <view class="tf-login-dialog-content">
          <AtIcon
            value="check-circle"
            size="48"
            class="tf-login-dialog-icon-check"
          />
          <view class="tf-login-dialog-content-text">
            登录成功
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="unloginSuccessHint"
      class="tf-login-dialog"
    >
      <view class="tf-login-dialog-card">
        <view class="tf-login-dialog-content">
          <AtIcon
            value="close-circle"
            size="48"
            class="tf-login-dialog-icon-close"
          />
          <view class="tf-login-dialog-content-text">
            输入错误
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

@Component({
  name: "Login"
})

export default class Login extends Vue {
  account: string = '';
  password: string = '';

  loginingHint: boolean = false;
  loginSuccessHint: boolean = false;
  unloginSuccessHint: boolean = false;

  mounted() {
  }

  handleInputAccount(val:string) {
    this.account = val;
  }

  handleInputPassword(val:string) {
    this.password = val;
  }

  ToCheck() {
    // this.loginingHint = true;
    // this.loginSuccessHint = true;
    // this.unloginSuccessHint = true;
    // console.log('正在登录..');
    if(1){
      console.log('登录成功！');
    //   this.loginingHint = false;
      this.loginSuccessHint = true;
      Taro.navigateTo({
      url: APP_ROUTES.QRGACTIVITY
      })
    } else {
    //   console.log('登录失败！');
    //   this.loginingHint = false;
    //   this.unloginSuccessHint = true;
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";
.tf-login-container {
  height: 100%;
  background-color: $tf-color-grey1;
}

.tf-login-main-part {
  position: absolute;
  z-index: 0;
  left: 48px;
  right: 48px;
  top: 96px;

  .tf-login-card {
    background-color: $tf-color-white;
    padding: 80px 24px;
    margin-bottom: 48px;

    .tf-login-card-title-text {
      color: $tf-color-primary;
      font-size: 48px
    }

    .tf-login-card-title-tab {
      background-color: $tf-color-primary;
      height: 4px;
      width: 128px;
      margin: 24px 0 200px;
    }

    .tf-login-first-input {
      margin: 64px 16px;
      padding: 16px 32px;
      background-color: $tf-color-grey1;

      .tf-login-code-button {
        font-size: 24px;
        margin-left: 16px;
        border: none;
        padding: 0;
      }

      .tf-login-code-text {
        font-size: 24px;
        margin-left: 16px;
        display: flex;
        align-items: center;
        color: $tf-color-warning !important;
      }
    }

    .tf-login-second-input {
      margin: 64px 16px;
      padding: 16px 32px;
      background-color: $tf-color-grey1;

      .tf-login-code-button {
        font-size: 24px;
        margin-left: 16px;
        border: none;
        padding: 0;
      }

      .tf-login-code-text {
        font-size: 24px;
        margin-left: 16px;
        display: flex;
        align-items: center;
        color: $tf-color-warning !important;
      }
    }
  }
}

.tf-login-mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-login-dialog {
  position: absolute;
  z-index: 99;
  top: 460px;
  left: 220px;
  right: 220px;
  bottom: 500px;
  display: flex;
  justify-content: center;
}

.tf-login-dialog-card {
  width: 480px;
  border-radius: 8px;
  background-color: $tf-color-dark4;
}

.tf-login-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}

.tf-login-dialog-icon-check {
  margin: 16px 0;
  color: $tf-color-primary;
}

.tf-login-dialog-icon-loading {
  margin: 16px 0;
  color: $tf-color-primary;
}

.tf-login-dialog-icon-close {
  margin: 16px 0;
  color: $tf-color-info;
}

.tf-login-dialog-content-text {
  font-size: 32px;
  color: $tf-color-white;
}

// at style
.at-input__title {
  font-size: 24px;
  width: 102px;
}

.at-input input {
  font-size: 24px;
}

.at-action-sheet__footer {
  font-size: 32px;
}

</style>
