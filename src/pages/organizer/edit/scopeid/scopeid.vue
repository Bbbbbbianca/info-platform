<template>
  <view class="tf-scopeid-container">
    <view class="tf-scopeid-main-part">
      <AtCheckbox
        :options="scopeIdOptions"
        :selected-list="scopeIdList"
        :on-change="onSelectScopeId"
        class="tf-scopeid-choice"
      />
    </view>
    <view class="tf-scopeid-btn-part">
      <AtButton
        type="primary"
        :on-click="toSubmit"
        class="tf-scopeid-btn"
      >
        确定
      </AtButton>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
// import {APP_ROUTES} from "../../../../base/constant";

@Component({
  name: 'Scopeid',
})
export default class Scopeid extends Vue {
  scopeIdList: string[]=[];
  scopeId: string='';
  created() {
    //获取活动人员范围列表
  }

  data() {
    return {
      scopeIdOptions:[
        { label: '17级软件工程', value: 'asg12bdhs' },
        { label: '16级软件工程', value: 'sagsh2g3d' },
        { label: '15级软件工程', value: 'dh67dfj3k' }
      ],
    }
  }

  onSelectScopeId(val) {
    this.scopeIdList = val
    this.scopeId = String(val)
    console.log(this.scopeId)
    console.log(val)
  }

  toSubmit() {
    try {
      Taro.setStorageSync('activityScopeId', this.scopeId)
    } catch(e) {}
    Taro.navigateBack()
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-scopeid-container {
  display: flex;
  flex-direction: column;
}

.tf-scopeid-main-part {
  width: 96%;
  align-items: center;
}

.tf-scopeid-choice {
  margin: 16px 16px;
  font-size: 32px;
  color: $tf-color-dark2;
  letter-spacing: 4px;
}

// 按钮
.tf-scopeid-btn-part {
  position: fixed;
  bottom: 0px;
  width: 100%;
  .tf-scopeid-btn {
    margin-top: 24px;
  }
}
</style>
