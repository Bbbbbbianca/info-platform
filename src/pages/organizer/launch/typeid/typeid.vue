<template>
  <view class="tf-typeid-container">
    <view class="tf-typeid-main-part">
      <AtRadio
        :options="typeIdOptions"
        :value="typeId"
        :on-click="onSelectTypeId"
        class="tf-typeid-choice"
      />
    </view>
    <view class="tf-typeid-btn-part">
      <AtButton
        type="primary"
        :on-click="toSubmit"
        class="tf-typeid-btn"
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
  name: 'Typeid',
})
export default class Typeid extends Vue {

  typeId: string='';
  created() {
    //获取活动类型列表
  }

  data() {
    return {
      typeIdOptions:[
        { label: '讲座', value: '1' },
        { label: '比赛', value: '2' },
        { label: '晚会', value: '3' }
      ],
    }
  }

  onSelectTypeId(val) {
    this.typeId = val
    console.log(val)
  }

  toSubmit() {
    let pages = Taro.getCurrentPages();
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      mydata: this.typeId
    });
    Taro.navigateBack({//返回
      delta: 1
    })
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-typeid-container {
  display: flex;
  flex-direction: column;
}

.tf-typeid-main-part {
  width: 96%;
  align-items: center;
}

.tf-typeid-choice {
  margin: 16px 16px;
  font-size: 32px;
  color: $tf-color-dark2;
  letter-spacing: 4px;
}

// 按钮
.tf-typeid-btn-part {
  position: fixed;
  bottom: 0px;
  width: 100%;
  .tf-typeid-btn {
    margin-top: 24px;
  }
}
</style>
