<template>
  <a-dropdown :trigger="['click']" v-model:open="visible" placement="bottomLeft" :arrow="true">
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a-checkbox-group class="vertical-checkbox-group" v-model:value="checkedValues">
            <a-checkbox v-for="item in options" :key="item.id" :value="item.id" @change="handleChange">
              {{ item.value }}
            </a-checkbox>
          </a-checkbox-group>
        </a-menu-item>
      </a-menu>
    </template>

    <a-button class="h-28px flex filter-btn mr-2">
      {{ label }}
      <div v-if="checkedValues.length > 0" class="num">{{ checkedValues.length }}</div>
      <DownOutlined v-else :style="{ fontSize: '10px' }" />
    </a-button>
  </a-dropdown>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => ([
      { id: 1, value: "高" },
      { id: 2, value: "中" },
      { id: 3, value: "低" },
      { id: 4, value: "未知" }
    ])
  },
  label: {
    type: String,
    default: '意向度'
  },
  checkedValues: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:checkedValues', 'change']);

const visible = ref(false);

const checkedValues = computed({
  get() {
    return props.checkedValues;
  },
  set(value) {
    emit('update:checkedValues', value);
  }
});

const handleChange = () => {
  emit('change', checkedValues.value);
};
</script>

<!-- 保留原有样式或根据需要添加 scoped 样式 -->
<style lang="less" scoped>
@import url(@/assets/styles/common.css);

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