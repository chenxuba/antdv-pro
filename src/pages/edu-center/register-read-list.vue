<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap  bg-white  pl-3 pr-3 rounded-4">
      <all-filter :defaultOrNotFenClass="defaultOrNotFenClass" :defaultCurrentStatus="defaultCurrentStatus"
        :displayArray="displayArray" :is-quick-show="false"  :isShowSearchStuPhonefilter="true"></all-filter>
    </div>
    <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">总计（{{ dataSource.length }}条）：已课消金额：¥0，剩余学费金额：¥7438，学员人数：3人</div>
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
                  <div class="text-3.5 text-#333">176****1636</div>{{ record.a }}
                </div>
              </template>
              <template v-if="column.key === 'registerReadCourse'">
                <div class="text-#222">初级感统课</div>
                <div class="text-3 text-#888 flex flex-items-center">班级授课 | 按金额</div>
              </template>
              <template v-if="column.key === 'registerReadNum'">
                <div class="text-#222">4课时</div>
                <div class="text-3 text-#888 flex flex-items-center">购3课时+赠1课时</div>
              </template>
              <template v-if="column.key === 'currentStatus'">
                <div class="text-#0c3 bg-#e6ffec rounded-2.5 inline-block text-3 pt-0.5 pb-0.5 pl-2 pr-2">正常</div>
              </template>
              <template v-if="column.key === 'orNotFenClass'">
                <div class="text-#f90 bg-#fff5e6 rounded-2.5 inline-block text-3 pt-0.5 pb-0.5 pl-2 pr-2">未分班</div>
              </template>
              <template v-if="column.key === 'headTeacher'">
                张晨
              </template>
              <template v-if="column.key === 'expiryDate'">
                2025-06-12
              </template>
              <template v-if="column.key === 'usedNumber'">
                0课时
              </template>
              <template v-if="column.key === 'remainNumber'">
                4课时
              </template>
              <template v-if="column.key === 'usedtuitionfeeamount'">
                ¥ 0
              </template>
              <template v-if="column.key === 'remaintuitionfeeamount'">
                ¥ 2000
              </template>
              <template v-if="column.key === 'totaltuitionfee'">
                ¥ 2000
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['intention', 'isSetExpirationDate', 'billingMode', 'createPeo', 'createTime', 'intentionCourse', 'reference', 'classEndingTime', 'classStopTime', 'currentStatus', 'orNotFenClass'])
const dataSource = ref([{}, {}])
const allColumns = ref([
  {
    title: '学员/性别',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 160,
    required: true // 新增必选标识
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 120,
    fixed: 'left',
    key: 'phone',
  },
  {
    title: '报读课程',
    key: 'registerReadCourse',
    dataIndex: 'registerReadCourse',
    width: 160
  },
  {
    title: '报读数量',
    key: 'registerReadNum',
    dataIndex: 'registerReadNum',
    width: 160

  },
  {
    title: '当前状态',
    dataIndex: 'currentStatus',
    key: "currentStatus",
    width: 120
  },
  {
    title: '分班状态',
    dataIndex: 'orNotFenClass',
    key: "orNotFenClass",
    width: 120
  },
  {
    title: '班主任',
    dataIndex: 'headTeacher',
    key: "headTeacher",
    width: 120
  },
  {
    title: '有效期至',
    dataIndex: 'expiryDate',
    key: "expiryDate",
    width: 150
  },
  {
    title: '已用数量',
    dataIndex: 'usedNumber',
    key: "usedNumber",
    width: 120

  },
  {
    title: '剩余数量',
    dataIndex: 'remainNumber',
    key: "remainNumber",
    width: 140

  },
  {
    title: '已用学费金额',
    key: 'usedtuitionfeeamount',
    dataIndex: 'usedtuitionfeeamount',
    width: 140
  },
  {
    title: '剩余学费金额',
    dataIndex: 'remaintuitionfeeamount',
    key: "remaintuitionfeeamount",
    width: 140
  },
  {
    title: '总学费',
    dataIndex: 'totaltuitionfee',
    key: "totaltuitionfee",
    width: 140
  },
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const defaultOrNotFenClass = ref([0])
const defaultCurrentStatus = ref([1, 3])
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('register-read-list');
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
  localStorage.setItem('register-read-list', JSON.stringify(newVal));
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