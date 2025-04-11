<template>
  <div class="roll-call">
    <div class="databord bg-white  pt-3 pb-3 pl-5 pr-5 rounded-4 ">
      <custom-title title="关键数据看板" fontSize="14px" fontWeight="500"></custom-title>
      <div class="flex justify-between mt-3 mb-2">
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d">
          <div class="contentMain">
            <div class="contentMainLeft">今日待点名</div>
            <div class="contentMainRight">3</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">今日待点名的日程</div>
            <div class="contentSubRight">快捷筛选</div>
          </div>
        </div>
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d ml-4 mr-4">
          <div class="contentMain">
            <div class="contentMainLeft">全部待点名</div>
            <div class="contentMainRight">3</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">过去至今从未点名的日程</div>
            <div class="contentSubRight">快捷筛选</div>
          </div>
        </div>
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d">
          <div class="contentMain">
            <div class="contentMainLeft">部分点名</div>
            <div class="contentMainRight">3</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">已点名但未完成全部点名的日程</div>
            <div class="contentSubRight">前往处理</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-4  mt-3 pl-2 pr-2">
      <all-filter :displayArray="displayArray" isShowChangTeacherSearch></all-filter>
    </div>
    <div class="bg-white rounded-4  mt-3 py-3 px-5">
      <div class="table-title flex justify-between">
        <div class="total">当前共计 {{ dataSource.length }} 条待点名日程</div>
        <div class="edit flex">
          <a-button class="mr-3">
            批量删除
          </a-button>
          <a-button class="mr-3">
            批量点名
          </a-button>
          <a-button class="mr-3" type="primary">
            创建未排课点名
          </a-button>
          <!-- 自定义字段 -->
          <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length-1"
            :num="selectedValues.length-1" />
        </div>
      </div>
      <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
        :scroll="{ x: totalWidth }" size="small">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'classDateTime'">
            <div>2025-04-10 (周四)</div>
            <div>10:00 ~ 10:30</div>
            {{ record.a }}
          </template>
          <template v-if="column.key === 'scheduleType'">
            <div class=" justify-between flex-center">
              <span>班级日程</span>
              <img height="45" src="https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/by-class-tag.621d0671.svg" alt="">
            </div>
          </template>
          <template v-if="column.key === 'classOr1v1'">
            奥夫班
          </template>
          <template v-if="column.key === 'courseName'">
            奥夫音乐课
          </template>
          <template v-if="column.key === 'mainTeacher'">
            商均
          </template>
          <template v-if="column.key === 'subTeacher'">
            张晨
          </template>
          <template v-if="column.key === 'classRoom'">
            -
          </template>
          <template v-if="column.key === 'subject'">
            自费
          </template>
          <template v-else-if="column.key === 'action'">
            <span class="flex action">
              <a>点名</a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['openClassStatus', 'doYouSchedule', 'billingMode', 'createPeo', 'createTime', 'intentionCourse', 'reference'])
const dataSource = ref([{}, {}])
const allColumns = ref([
{
    title: '上课日期/时段',
    dataIndex: 'classDateTime',
    key: "classDateTime",
    width: 150
  },
  {
    title: '日程类型',
    dataIndex: 'scheduleType',
    key: 'scheduleType',
    width: 140,
  },
  {
    title: '班级/1对1',
    key: 'classOr1v1',
    dataIndex: 'classOr1v1',
    width: 140,
  },
  {
    title: '课程名称',
    key: 'courseName',
    dataIndex: 'courseName',
    width: 110
  },
  {
    title: '上课老师',
    key: 'mainTeacher',
    dataIndex: 'mainTeacher',
    width: 110

  },
  {
    title: '上课助教',
    dataIndex: 'subTeacher',
    key: "subTeacher",
    width: 120
  },
  
  {
    title: '上课教室',
    dataIndex: 'classRoom',
    key: "classRoom",
    width: 120
  },
  {
    title: '科目',
    dataIndex: 'subject',
    key: "subject",
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: "action",
    fixed: 'right',
    width: 100,
    required:true
  },

])

const defaultOpenClassStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('roll-call-list');
const keysArray = allColumns.value
  .map(column => column?.key) // 可选链操作符
  .filter(key => typeof key !== 'undefined'); // 过滤未定义的值
const initialSelectedValues = savedSelected
  ? JSON.parse(savedSelected)
  : keysArray;

// 选中的列（初始化包含重要字段）
const selectedValues = ref(initialSelectedValues);
// 生成字段选择选项（排除操作列）
const columnOptions = computed(() =>
  allColumns.value
    .filter(col => col.key !== 'action')
    .map(col => ({
      id: col.key,
      value: col.title,
      disabled: col.required // 禁用必选字段
    }))
);
// 过滤后的列（自动包含必选列）
const filteredColumns = computed(() => {
  const requiredColumns = allColumns.value.filter(col => col.required);
  const optionalColumns = allColumns.value
    .filter(col =>
      selectedValues.value.includes(col.key) &&
      !col.required
    );

  // 保持固定列顺序：left -> normal -> right
  return [
    ...requiredColumns.filter(col => col.fixed === 'left'),
    ...optionalColumns,
    ...requiredColumns.filter(col => col.fixed === 'right')
  ];
});
// 强制包含必选字段的监听
watch(selectedValues, (newVal) => {
  const requiredKeys = allColumns.value
    .filter(col => col.required)
    .map(col => col.key);

  // 自动补全必选字段
  if (!requiredKeys.every(k => newVal.includes(k))) {
    selectedValues.value = Array.from(new Set([
      ...newVal.filter(v => !requiredKeys.includes(v)),
      ...requiredKeys
    ]));
  }
}, { deep: true });
// 自动保存列配置到本地存储
watch(selectedValues, (newVal) => {
  localStorage.setItem('roll-call-list', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
</script>

<style lang="less" scoped>
.contentMain {
  box-sizing: content-box;
  padding: 16px 12px 6px 24px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .contentMainLeft {
    font-size: 14px;
    font-weight: 500;
    color: #222;
    flex-shrink: 0;
  }

  .contentMainRight {
    min-width: 72px;
    height: 30px;
    font-size: 30px;
    font-weight: 700;
    font-family: DINAlternate-Bold, DINAlternate;
    color: #06f;
    line-height: 30px;
    flex-shrink: 0;
    text-align: center;
  }
}

.contentSub {
  padding: 0 24px;
  height: 16px;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .contentSubLeft {
    font-size: 13px;
    color: #888;
  }

  .contentSubRight {
    font-size: 12px;
    color: #06f;
  }
}

.total {
  position: relative;
  padding-left: 10px;
  color: #222;
  display: flex;
  align-items: center;

  &::before {
    display: inline-block;
    background: var(--pro-ant-color-primary);
    border-radius: 2px;
    content: "";
    height: 12px;
    left: 0;
    position: absolute;
    width: 4px;
  }
}
</style>