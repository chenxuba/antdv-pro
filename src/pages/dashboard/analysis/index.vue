<script setup >
import { ref, computed, nextTick } from 'vue';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons-vue';
import checkboxFilter from "@/components/common/checkboxFilter.vue";
const childRef = ref(null)
// 意向度选项
const customOptions = ref([
  { id: 1, value: "高" },
  { id: 2, value: "中" },
  { id: 3, value: "低" },
  { id: 4, value: "未知" }
]);
const selectedValues = ref([]);

// 跟进状态选项
const followStatusOptions = ref([
  { id: 1, value: "待跟进" },
  { id: 2, value: "跟进中" },
  { id: 3, value: "未接听" },
  { id: 4, value: "已邀约" }
]);
const followStatusVals = ref([]);

// 性别选项
const sexOptions = ref([
  { id: 1, value: "男" },
  { id: 2, value: "女" },
  { id: 3, value: "未知" }
]);
const sexVals = ref([]);

// 创建人选项
const createPeoOptions = ref([
  { id: 1, value: "陈瑞生", phone: '17601241636' },
  { id: 2, value: "张晨", phone: '17662072520' },
  { id: 3, value: "陈旭", phone: '15864646629' },
])
const createPeoVals = ref(null); 

// 创建时间选项
const createTimeVals = ref([])

// 快捷筛选选项（单选）
const quickFilters = ref([
  { id: 1, name: "今日待跟进", count: 1, selected: false },
  { id: 2, name: "本周新增", count: 0, selected: false },
  { id: 3, name: "逾期未回访", count: 0, selected: false }
]);

// 处理快捷筛选单选
const selectQuickFilter = (selectedFilter) => {
  quickFilters.value.forEach(filter => {
    filter.selected = filter.id === selectedFilter.id ? !filter.selected : false;
  });
  console.log('当前快捷筛选:', quickFilters.value.find(q => q.selected)?.name);
};

// 处理常规筛选变化
const handleIntentionChange = () => {
  nextTick(() => {
    console.log('意向度:', toRaw(selectedValues.value));
  });
};

const handleFollowChange = () => {
  nextTick(() => {
    console.log('跟进状态:', toRaw(followStatusVals.value));
  });
};

const handleSexChange = () => {
  nextTick(() => {
    console.log('性别:', toRaw(sexVals.value));
  });
};

const handleCreatePeoChange = (e) => {
  nextTick(() => {
    console.log('创建人:', e);
  });
}
const handleCreateTimeChange = (e) => {
  nextTick(() => {
    console.log('创建时间:', e);
  });
}

// 已选条件计算
const selectedConditions = computed(() => {
  const conditions = [
    {
      type: 'quick',
      label: '快捷筛选',
      values: quickFilters.value.filter(q => q.selected).map(q => ({ id: q.id, value: q.name }))
    },
    {
      type: 'intention',
      label: '意向度',
      values: customOptions.value.filter(opt => selectedValues.value.includes(opt.id))
    },
    {
      type: 'followStatus',
      label: '跟进状态',
      values: followStatusOptions.value.filter(opt => followStatusVals.value.includes(opt.id))
    },
    {
      type: 'sex',
      label: '性别',
      values: sexOptions.value.filter(opt => sexVals.value.includes(opt.id))
    },
    {
      type: 'createPeo',
      label: '创建人',
      values: createPeoOptions.value.filter(opt => opt.id === createPeoVals.value)
    },
    {
      type: 'createTime',
      label: '创建时间',
      values: createTimeVals.value.length === 2
        ? [{
          id: 'dateRange',
          value: `${createTimeVals.value[0]} 至 ${createTimeVals.value[1]}`
        }]
        : []
    },

  ];
  return conditions.filter(item => item.values.length > 0);
});

// 清空所有筛选
const clearAll = () => {
  // 重置多选类
  [selectedValues, followStatusVals, sexVals, createTimeVals].forEach(
    ref => ref.value = []
  );
  // 重置单选类
  quickFilters.value.forEach(q => q.selected = false);
  createPeoVals.value = null;
  if (childRef.value) {
    childRef.value.resetSearch()
  }
};

// 移除单个条件
const removeCondition = (type, id) => {
  switch (type) {
    case 'intention':
      selectedValues.value = [];
      break;
    case 'followStatus':
      followStatusVals.value = [];
      break;
    case 'sex':
      sexVals.value = [];
      break;
    case 'quick':
      const filter = quickFilters.value.find(q => q.id === id);
      if (filter) filter.selected = false;
      break;
    case 'createPeo':  // 新增创建人移除逻辑
      createPeoVals.value = null;
      break;
    case 'createTime':  // 新增创建时间移除逻辑
      createTimeVals.value = [];
      break;
  }
};
</script>

<template>
  <div class="home">
    <!-- 快捷筛选区域 -->
    <div class="filter-section">
      <span class="section-title">快捷筛选：</span>
      <div class="quick-filters">
        <a-button v-for="filter in quickFilters" :key="filter.id" :type="filter.selected ? 'primary' : 'default'"
          class="filter-btn" @click="selectQuickFilter(filter)">
          {{ filter.name }}（{{ filter.count }}）
        </a-button>
      </div>
    </div>

    <!-- 常规筛选条件 -->
    <div class="filter-section">
      <span class="section-title">筛选条件：</span>
      <div class="standard-filters">
        <checkbox-filter  v-model:checkedValues="selectedValues" :options="customOptions" label="意向度"
          @change="handleIntentionChange" type="checkbox" />
        <checkbox-filter v-model:checkedValues="followStatusVals" :options="followStatusOptions" label="跟进状态"
          @change="handleFollowChange" type="checkbox" />
        <checkbox-filter v-model:checkedValues="sexVals" :options="sexOptions" label="性别" @change="handleSexChange"
          type="checkbox" />
        <checkbox-filter ref="childRef" v-model:checkedValues="createPeoVals" :options="createPeoOptions" label="创建人"
          @radioChange="handleCreatePeoChange" type="radio" />
        <checkbox-filter v-model:checkedValues="createTimeVals" label="创建时间" @datePickerChange="handleCreateTimeChange"
          type="dateTime" />
      </div>
    </div>

    <!-- 已选条件展示 -->
    <div class="selected-conditions" v-if="selectedConditions.length > 0">
      <span class="section-title">已选条件：</span>
      <div class="condition-tags">
        <a-tag color="red" class="clear-all mb-2" @click="clearAll">
          清空所有
          <DeleteOutlined class="text-3 ml-0.5" />
        </a-tag>

        <a-tag v-for="condition in selectedConditions" :key="condition.type" color="blue" class="condition-tag mb-2">
          <div class="tag-content">
            <span class="condition-label">{{ condition.label }}：</span>
            <div class="condition-values">
              <template v-if="condition.type === 'quick'">
                <span class="value-item">
                  {{ condition.values[0].value }}
                  <CloseOutlined class="close-icon"
                    @click.stop="removeCondition(condition.type, condition.values[0].id)" />
                </span>
              </template>
              <template v-else-if="condition.type === 'createTime'">
                <span class="value-item">
                  {{ condition.values[0].value }}
                  <CloseOutlined class="close-icon" @click.stop="removeCondition(condition.type, 0)" />
                </span>
              </template>
              <template v-else>
                <span v-for="(value, index) in condition.values" :key="value.id" class="value-item">
                  {{ value.value }}
                  <CloseOutlined v-if="index === condition.values.length - 1" class="close-icon"
                    @click.stop="removeCondition(condition.type, value.id)" />
                  <span v-else class="separator">、</span>
                </span>
              </template>
            </div>
          </div>
        </a-tag>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.debug-panel {
  padding: 16px;
  margin-bottom: 24px;
  background: #f8f9fa;
  border-radius: 6px;
}

.filter-section {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.section-title{
  white-space: nowrap;
}


.quick-filters {
  display: flex;
  gap: 8px;
}

.standard-filters {
  display: flex;
}

.selected-conditions {
  display: flex;
  align-items: flex-start;
}

.condition-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.condition-tag {
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.tag-content {
  display: flex;
  align-items: center;
}


.condition-values {
  display: flex;
  align-items: center;
}

.value-item {
  display: inline-flex;
  align-items: center;
}

.close-icon {
  margin-left: 6px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(92, 92, 92, 0.45);
  transition: color 0.3s;
}

.close-icon:hover {
  color: rgba(0, 0, 0, 0.75);
}

.clear-all {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.filter-btn {
  height: 28px;
  padding: 0 12px;
}
</style>