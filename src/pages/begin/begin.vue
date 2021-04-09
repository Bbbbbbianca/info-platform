<template>
  <view class="container">
    <AtButton
      type="primary"
      :on-click="toOrganizer"
      style="margin: 12px;"
    >
      我是组织
    </AtButton>
    <AtButton
      type="primary"
      :on-click="toUser"
      style="margin: 12px;"
    >
      我是用户
    </AtButton>
    <AtButton
      type="secondary"
      :on-click="toExit"
      style="margin: 12px;"
    >
      退出小程序
    </AtButton>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";

@Component({
  name: 'Index'
})
export default class Index extends Vue {

  mounted() {}

  toOrganizer() {
    Taro.navigateTo({
      url: APP_ROUTES.QRGWELCOME
    })
  }

  toUser() {
    Taro.navigateTo({
      url: APP_ROUTES.INDEX
    })
  }

  toExit() {
    // TO DO
  }
}
</script>

<style>
.container {
  padding: 24px;
}

</style>
