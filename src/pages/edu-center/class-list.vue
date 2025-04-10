<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap  bg-white  pl-3 pr-3 rounded-4">
      <all-filter :defaultOpenClassStatus="defaultOpenClassStatus" 
        :displayArray="displayArray" :is-quick-show="false" :isShowSearchStuPhone="false" :isShowClsssSearch="true" searchLabel="班级名称"></all-filter>
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
            :row-selection="rowSelection" :scroll="{ x: totalWidth }" size="small" >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                奥夫班
              </template>
              <template v-if="column.key === 'linkCourse'">
                <div class="text-#222">奥夫音乐课{{ record.a }}</div>
                <div class="text-3 text-#888 flex flex-items-center">课程</div>
              </template>
              <template v-if="column.key === 'studentNum'">
                0
              </template>
              <template v-if="column.key === 'headTeacher'">
                张晨
              </template>
              <template v-if="column.key === 'classRoom'">
                -
              </template>
              <template v-if="column.key === 'classTime'">
                隔天 10:00 ～ 10:30
              </template>
              <template v-if="column.key === 'doYouSchedule'">
                <div class="studentStatus">
                <span class="dot"></span>
                  <span>已排课</span>
                </div>
              </template>
              <template v-if="column.key === 'alreadyOnOrtotal'">
                0/4节
              </template>
              <template v-if="column.key === 'openClassStatus'">
                <div class="text-#06f bg-#e6f0ff rounded-2.5 inline-block text-3 pt-0.5 pb-0.5 pl-2 pr-2">开班中</div>
              </template>
              <template v-if="column.key === 'createTime'">
                2025-03-24 08:01
              </template>
              <template v-if="column.key === 'createUser'">
                龙钊
              </template>
              <template v-else-if="column.key === 'action'">
              <span class="flex action">
                <a class="mr-3">排课</a>
                <a class="mr-3">添加学员</a>
                <div style="cursor: pointer;">
                  <a-dropdown :trigger="['click']"  placement="bottom">
                    <a @click.prevent>
                      <div class="intention">更多
                        <CaretDownOutlined class="ml-1 text-#1677ff"
                          :style="{ 'font-size': '12px' }" />
                      </div>
                    </a>
                    <template #overlay>
                      <a-menu @click="onClickMenu" style="text-align: center;width: 120px;">
                        <a-menu-item key="1">
                          上课点名
                        </a-menu-item>
                        <a-menu-item key="2">
                          未排课点名
                        </a-menu-item>
                        <a-menu-item key="3">
                          编辑班级
                        </a-menu-item>
                        <a-menu-item key="4">
                          结班
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
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
import { DownOutlined, CaretDownOutlined,CaretUpOutlined,ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['openClassStatus', 'doYouSchedule', 'billingMode', 'createPeo', 'createTime', 'intentionCourse', 'reference', 'classEndingTime', 'classStopTime'])
const dataSource = ref([{}, {}])
const allColumns = ref([
  {
    title: '班级名称',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 140,
    required: true // 新增必选标识
  },
  {
    title: '关联课程',
    key: 'linkCourse',
    dataIndex: 'linkCourse',
    width: 140,
  },
  {
    title: '学员数',
    key: 'studentNum',
    dataIndex: 'studentNum',
    width: 110
  },
  {
    title: '班主任',
    key: 'headTeacher',
    dataIndex: 'headTeacher',
    width: 110

  },
  {
    title: '上课教室',
    dataIndex: 'classRoom',
    key: "classRoom",
    width: 120
  },
  {
    title: '上课时间',
    dataIndex: 'classTime',
    key: "classTime",
    width: 300
  },
  {
    title: '是否排课',
    dataIndex: 'doYouSchedule',
    key: "doYouSchedule",
    width: 120
  },
  {
    title: '已上/日程总数',
    dataIndex: 'alreadyOnOrtotal',
    key: "alreadyOnOrtotal",
    width: 150
  },
  {
    title: '状态',
    dataIndex: 'openClassStatus',
    key: "openClassStatus",
    width: 120

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 180

  },
  {
    title: '创建人',
    key: 'createUser',
    dataIndex: 'createUser',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: "action",
    fixed: 'right',
    width: 220
  },
  
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const defaultOpenClassStatus = ref(1)
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