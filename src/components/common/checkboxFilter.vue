<template>
  <a-dropdown v-if="type == 'checkbox'" :trigger="['click']" v-model:open="visible" placement="bottomLeft"
    :arrow="true">
    <template #overlay>
      <a-menu>
        <a-menu-item class="check-item">
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
  <a-dropdown v-if="type == 'radio'" :trigger="['click']" v-model:open="visible" placement="bottomLeft" :arrow="true">
    <template #overlay>
      <a-menu>
        <a-menu-item class="top-item">
          <!-- 搜索栏 -->
          <a-input v-if="category == 'course' || category == 'teacher'" class="mt-1 mb-2 w-27" v-model:value="searchPeo" autofocus :placeholder="placeholder" />
          <a-input v-if="category == 'stu'" class="mt-1 mb-2 w-59" v-model:value="searchPeo" autofocus :placeholder="placeholder" />
        </a-menu-item>
        <div class="max-h-80 overflow-auto scrollbar" v-if="category == 'course' || category == 'teacher'">
          <a-menu-item :class="checkedValues == item.id ? 'menu-item active' : 'menu-item'" v-for="item in options"
            :key="item.id" :value="item.id" @click="handleRadioChange(item.id)">
            <div class="text-sm text-#666  leading-7">{{ item.value ?? item.name }}</div>
            <div class="text-xs text-#888">{{ item.phone ?? '' }}</div>
          </a-menu-item>
        </div>
        <div class="max-h-80 overflow-auto scrollbar" v-if="category == 'stu'">
          <a-menu-item :class="checkedValues == item.id ? 'menu-item active' : 'menu-item'" v-for="item in options"
            :key="item.id" :value="item.id" @click="handleRadioChange(item.id)">
            <div class="flex flex-center mb-1">
              <div>
                <img class="w-10 rounded-10"
                  src="https://prod-cdn.schoolpal.cn/training/next-erp/shared/static/images/defaultimg/default_avator.png"
                  alt="">
              </div>
              <div class="ml-2 mr-3">
                <div class="text-sm text-#666  leading-7">{{ item.value ?? item.name }}</div>
                <div class="text-xs text-#888">{{ item.phone ?? '' }}</div>
              </div>
              <div>
                <a-tag  :bordered="false" color="processing">在读学员</a-tag>
              </div>
            </div>
          </a-menu-item>
        </div>
      </a-menu>
    </template>

    <a-button class="h-28px flex filter-btn mr-2">
      {{ label }}
      <div v-if="checkedValues" class="num">1</div>
      <DownOutlined v-else :style="{ fontSize: '10px' }" />
    </a-button>
  </a-dropdown>
  <a-dropdown v-if="type == 'dateTime'" :trigger="['click']" v-model:open="visible" placement="bottomLeft"
    :arrow="true">
    <a-button style="position: relative;" class="h-28px flex filter-btn mr-2">
      {{ label }}
      <div v-if="checkedValues.length > 0" class="num">1</div>
      <DownOutlined v-else :style="{ fontSize: '10px' }" />
      <a-range-picker :key="pickerKey" @calendarChange="calendarChangeFun" value-format="YYYY-MM-DD"
        :disabled-date="disabledDate" @change="handleRangePicker" popupClassName="picker-wrapper" :open="visible"
        v-model:value="selectDates" />
    </a-button>
  </a-dropdown>
</template>

<script setup>
import { ref, computed, watch, defineExpose, toRaw } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { debounce } from 'lodash-es';
import dayjs from 'dayjs';

// 指定禁用之前的日期（例如：2023-01-01）
let specifiedDate = null;

const disabledDate = (current) => {
  const today = new Date();

  // 克隆当前日期并清除时间部分
  const currentDate = new Date(current);

  // 禁用条件：日期在 specifiedDate 之前 或 今天之后
  return currentDate < specifiedDate || currentDate > today;
};
const calendarChangeFun = (e) => {
  specifiedDate = new Date(e[0])
}
const searchPeo = ref('');
const selectDates = ref([])
const pickerKey = ref(0);
// 监听输入变化
watch(searchPeo, (newVal) => {
  debouncedSearch(newVal);
});
// 暴露清空方法给父组件
const resetSearch = () => {
  searchPeo.value = ''
}

defineExpose({
  resetSearch
})
// 实际搜索逻辑
const doSearch = () => {
  console.log('执行搜索:', searchPeo.value);
  // 这里替换为真实的搜索逻辑
};

// 创建防抖函数（500ms延迟）
const debouncedSearch = debounce(doSearch, 500);

// 组件卸载前清理
onBeforeUnmount(() => {
  debouncedSearch.cancel();
});
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
  type: {
    type: String,
    default: 'radio'
  },
  checkedValues: {
    type: [Array, Number, String],
  },
  placeholder: {
    type: String,
    default: '请输入关键字'
  },
  category: {
    type: String,
    default: 'stu'
  },
});

const emit = defineEmits(['update:checkedValues', 'change', 'radioChange', 'datePickerChange']);

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
const handleRadioChange = (id) => {
  emit('radioChange', id);
  checkedValues.value = id
  visible.value = false
};
const handleRangePicker = (dates) => {
  checkedValues.value = dates
  visible.value = false
  pickerKey.value++;     // 强制重新渲染
  selectDates.value = []
  // 转为普通数组
  const rawDates = toRaw(dates);
  // 或浅拷贝
  // const rawDates = [...dates];
  emit('datePickerChange', rawDates);
  specifiedDate = ''
}
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

:deep(.ant-dropdown-menu-item.check-item) {
  &:hover {
    background-color: transparent !important;
  }
}

:deep(.ant-dropdown-menu-item.menu-item) {
  &:hover {
    background-color: #dee6fc !important;
  }
}

:deep(.active) {
  background-color: #ebf0fe !important;
}

:deep(.top-item) {
  padding: 0 !important;
}

:deep(.ant-picker-range) {
  pointer-events: none;
  opacity: 0;
  position: absolute;
  left: -10px !important;
}
</style>
<style lang="less">
.picker-wrapper {

  .ant-picker-range-arrow,
  .ant-picker-range-arrow {
    display: none !important;
    // left: 0 !important;
  }
}

.ant-dropdown-show-arrow {
  z-index: 9999 !important;
}
</style>