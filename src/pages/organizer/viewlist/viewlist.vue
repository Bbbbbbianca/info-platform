<template>
  <view class="tf-viewlist-container">
    <view class="tf-viewlist-search-part">
      <AtSearchBar
        placeholder="搜索"
        show-action-button
        :value="searchTerm"
        :on-change="handleInputSearch"
        :on-action-click="onActionClick"
      />
    </view>
    <view class="tf-viewlist-list-part">
      <AtIndexes
        :list="peopleList"
        class="tf-viewlist-list"
      />
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: 'Viewlist'
})
export default class Viewlist extends Vue{
  searchTerm: string = '';

  data() {
    return {
        peopleList: [{
      title: 'A',
      key: 'A',
      items: [
        {
          'name': 'Amily'
        }]
      },
      {
        title: 'B',
        key: 'B',
        items: [
          {
            'name': 'Bob'
          },
          {
            'name': 'Bana'
          }]
      },
      {
        title: 'C',
        key: 'C',
        items: [
          {
            'name': 'Cina'
          },
          {
            'name': 'Cecilia'
          },
          {
            'name': 'Celia'
          }]
      }
    ]
    }
  }

  handleInputSearch(val: string) {
    this.searchTerm = val;
  }

  onActionClick() {
    console.log('点击了搜索按钮')
  }

}

</script>

<style lang="scss">
.tf-viewlist-container {
  position: absolute;
  left: 0px;
  right: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tf-viewlist-search-part {
  position: absolute;
  width: 100%;
  top: 0px;
}

.tf-viewlist-list-part {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 100px;
  background-color: $tf-color-white;
}
.tf-viewlist-list {
  width: 100%;
  font-size: 24px;
}
</style>
