<script setup lang="ts">
import { ref, toRaw, nextTick } from 'vue';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons-vue';
import checkboxFilter from "@/components/common/checkboxFilter.vue";
const customOptions = ref([{ id: 1, value: "高" }, { id: 2, value: "中" }, { id: 3, value: "低" }, { id: 4, value: "未知" }]);
const selectedValues = ref([]);
const followStatusOptions = ref([{ id: 1, value: "待跟进" }, { id: 2, value: "跟进中" }, { id: 3, value: "未接听" }, { id: 4, value: "已邀约" }]);
const followStatusVals = ref([]);
const sexOptions = ref([{ id: 1, value: "男" }, { id: 2, value: "女" }, { id: 3, value: "未知" }]);
const sexVals = ref([]);
const handleIntentionChange = () => {
  nextTick(() => {
    console.log('当前选中值:', toRaw(selectedValues.value));
  })
  // 执行其他业务逻辑
};
const handleFollowChange = () => {
  nextTick(() => {
    console.log('当前选中值:', toRaw(followStatusVals.value));
  })
  // 执行其他业务逻辑
};
const handleSexChange = () => {
  nextTick(() => {
    console.log('当前选中值:', toRaw(sexVals.value));
  })
  // 执行其他业务逻辑
};
</script>

<template>
  <div class="home">
    <div>Debug: {{ selectedValues }}</div>
    <div class="sheet">
      <span>快捷筛选：</span>
      <a-button type="primary" class="bg-[var(--pro-ant-color-primary)] h-28px flex filter-btn">今日待跟进（1）</a-button>
      <a-button type="default" class="h-28px flex filter-btn" style="margin: 0 12px;">本周新增（0）</a-button>
      <a-button type="default" class="h-28px flex filter-btn">逾期未回访（0）</a-button>
    </div>
    <div class="sheet">
      <span>筛选条件：</span>
      <checkbox-filter v-model:checkedValues="selectedValues" :options="customOptions" label="意向度"
        @change="handleIntentionChange"></checkbox-filter>
      <checkbox-filter v-model:checkedValues="followStatusVals" :options="followStatusOptions" label="跟进状态"
        @change="handleFollowChange"></checkbox-filter>
      <checkbox-filter v-model:checkedValues="sexVals" :options="sexOptions" label="性别"
        @change="handleSexChange"></checkbox-filter>
    </div>
    <div class="sheet">
      <span>已选条件：</span>
      <a-tag color="red">清空已选
        <DeleteOutlined />
      </a-tag>
      <a-tag color="blue">快捷筛选：今日待跟进
        <CloseOutlined style="cursor: pointer;" :style="{ fontSize: '10px' }" />
      </a-tag>
      <a-tag color="blue">渠道：场地预约、跨校办理
        <CloseOutlined style="cursor: pointer;" :style="{ fontSize: '10px' }" />
      </a-tag>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(@/assets/styles/common.css);

.home {
  width: 100%;
  border-radius: 10px;
  background: #fff;
  line-height: 40px;
  padding: 0 12px;

  .sheet {
    display: flex;
    align-items: center;

    .num {
      background: #f33;
      color: #fff;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      margin-left: 6px;
      display: flex;
      justify-content: center;
      width: 16px;
      border-radius: 100px;
      font-weight: 600;
    }
  }
}

/* 或者使用 flex 布局 */
.vertical-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

::v-deep .ant-dropdown-menu-item {
  &:hover {
    background-color: transparent !important;
  }
}
</style>
