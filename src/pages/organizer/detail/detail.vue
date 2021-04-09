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
      show="{this.actionVisible}"
      mask
      right
      :on-close="onActionClose"
    >
      <View class-name="停止报名">
        优先展示items里的数据
      </View>
      <View class-name="修改信息">
        如果items没有数据就会展示children
      </View>
      <View class-name="drawer-item">
        这是自定义内容 <AtIconvalue='home'size='20' />
      </View>
      <View class-name="drawer-item">
        这是自定义内容
      </View>
    </AtDrawer>
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
</style>
