<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap  bg-white  pl-3 pr-3 rounded-4">
      <all-filter :defaultOpenClassStatus="defaultOpenClassStatus" :displayArray="displayArray" :is-quick-show="false"
        :isShowSearchStuPhone="false" :is-show-search-stu-phonefilter="true" searchLabel="班级名称"></all-filter>
    </div>
    <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">当前共{{ dataSource.length }}条数据</div>
          <div class="edit flex">
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    批量停课
                  </a-menu-item>
                  <a-menu-item key="2">
                    批量复课
                  </a-menu-item>
                  <a-menu-item key="3">
                    批量结课
                  </a-menu-item>
                  <a-menu-item key="4">
                    批量转课
                  </a-menu-item>
                  <a-menu-item key="5">
                    批量修改有效期
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                批量操作
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    批量导出
                  </a-menu-item>
                  <a-menu-item key="2">
                    导出记录
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                导出数据
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length"
              :num="selectedValues.length" />
          </div>
        </div>
        <div class="table-content mt-2">
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :row-selection="rowSelection" :scroll="{ x: totalWidth }" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <div class="flex">
                  <img width="40" height="40" class="mr-2" style="border-radius: 100%;"
                    src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                    alt="">
                  <div class="name mt-1">
                    <div class="text-#222">龙龙</div>
                    <div class="text-3 text-#888 flex flex-items-center">男</div>
                  </div>
                </div>
              </template>
              <template v-if="column.key === 'phone'">
                <div class="name">
                  <div class="text-#222">爸爸</div>
                  <div class="text-3 text-#666">176****1636</div>
                </div>
              </template>
              <template v-if="column.key === 'makeCourseStatus'">
                未安排
              </template>
              <template v-if="column.key === 'missSchoolCourse'">
                初级认知课
              </template>
              <template v-if="column.key === 'missSchoolTime'">
                <div class="name">
                  <div class="text-#222">2025-04-10 (周四)</div>
                  <div class="text-3 text-#666">09:00 ～ 10:00</div>
                </div>
              </template>
              <template v-if="column.key === 'classRoom'">
                郭杨
              </template>
              <template v-if="column.key === 'gotoCourseStatus'">
                请假
              </template>
              <template v-if="column.key === 'action'">
                <span class="flex action">
                  <!-- 插班补课 、取消补课 -->
                  <a class="mr-3">一对一补课 {{ record.a }}</a>
                  <a class="mr-3">添加补课记录</a>
                  <a>详情</a>
                </span>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['openClassStatus', 'doYouSchedule', 'billingMode', 'createPeo', 'createTime', 'intentionCourse', 'reference', 'classEndingTime', 'classStopTime'])
const dataSource = ref([{}, {}])
const allColumns = ref([
  {
    title: '学员/性别',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 120,
    required: true // 新增必选标识
  },
  {
    title: '联系电话',
    key: 'phone',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '补课状态',
    key: 'makeCourseStatus',
    dataIndex: 'makeCourseStatus',
    width: 120
  },
  {
    title: '缺课课程',
    key: 'missSchoolCourse',
    dataIndex: 'missSchoolCourse',
    width: 120

  },
  {
    title: '缺课时段',
    dataIndex: 'missSchoolTime',
    key: "missSchoolTime",
    width: 120
  },
  {
    title: '上课教室',
    dataIndex: 'classRoom',
    key: "classRoom",
    width: 120
  },
  {
    title: '到课状态',
    dataIndex: 'gotoCourseStatus',
    key: "gotoCourseStatus",
    width: 120
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: "action",
    fixed: 'right',
    width: 150
  },

])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const defaultOpenClassStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('makeup-a-missedlesson');
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
  localStorage.setItem('makeup-a-missedlesson', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
</script>

<style lang="less" scoped>
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

.studentStatus {
  display: flex;
  align-items: center;

  span.dot {
    border-radius: 50%;
    display: inline-block;
    height: 6px;
    position: relative;
    vertical-align: middle;
    width: 6px;
    margin-right: 4px;
    background: var(--pro-ant-color-primary);
  }
}
</style>