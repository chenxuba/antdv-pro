<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap bg-white pl-3 pr-3 rounded-lb-4 rounded-rb-4">
      <all-filter  :displayArray="displayArray"
        :is-quick-show="false" :is-show-search-input="true" search-label="工资条名称"></all-filter>
    </div>
    <div class="student-list mt-3 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">当前共计 {{ dataSource.length }} 个工资条</div>
          <div class="edit flex">
            <a-button  class="mr-2" @click="openPayrollDrawer = true">工资条项目管理</a-button>
            <a-button type="primary" class="mr-2">创建工资条</a-button>
            <!-- 自定义字段 -->
            <!-- <customize-code v-model:checkedValues="selectedValues" :options="columnOptions"
              :total="allColumns.length - 1" :num="selectedValues.length - 1" /> -->
          </div>
        </div>
        <div class="table-content mt-2">
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :scroll="{ x: totalWidth }" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'titleOrDate'">
                <div class="text-#222">3月业绩提成工资条</div>
                <div class="text-3 text-#888">结算起止：2025-03-01 ～ 2025-03-31</div>
              </template>
              <template v-if="column.key === 'user'"> 全部员工（12名） </template>
              <template v-if="column.key === 'createUser'"> 何洪武 </template>
              <template v-if="column.key === 'createTime'"> 2025-04-02 15:18 </template>
              <template v-if="column.key === 'status'"> 
                <div class="flex flex-items-center">
                  <span class="dot"></span>
                  <span>待确认</span>
                </div>  
              </template>
              <template v-if="column.key === 'action'">
                <a-space :size="16">
                  <a href="#">详情{{ record.a }}</a>
                  <a href="#">导出{{ record.a }}</a>
                  <a href="#">作废{{ record.a }}</a>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <a-drawer v-model:open="openPayrollDrawer" :bodyStyle="{ padding: '0', background: '#fff' }" :closable="false"
      width="800px" placement="right">
      <!-- 自定义头部 -->
      <template #title>
        <div class="custom-header flex justify-between h-4 flex-items-center">
          <div class="text-5">工资条项目管理</div>
          <a-button type="text" @click="openPayrollDrawer = false" class="close-btn">
            <template #icon>
              <CloseOutlined class="text-5 close-icon" />
            </template>
          </a-button>
        </div>
      </template>
      <div class="contenter p5">
        <div class="t flex justify-between flex-items-center mb4">
          <div class="total">当前共 {{ dataSource.length }} 条</div>
          <a-button type="primary">创建工资条项目</a-button>
        </div>
        <a-table :dataSource="payrollSource" :pagination="payrollSource.length > 10" :columns="columns"
             size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'project'">
                <div class="text-#222">全额阶梯</div>
                <div class="text-3 text-#888">创建时间：2025-04-01 10:18:23</div>
              </template>
              <template v-if="column.key === 'type'"> 发放 </template>
              <template v-if="column.key === 'rule'"> 学费消耗 </template>
              <template v-if="column.key === 'model'"> 阶梯 </template>
              <template v-if="column.key === 'action'">
                <a-space :size="16">
                  <a href="#">详情{{ record.a }}</a>
                  <a href="#">编辑{{ record.a }}</a>
                  <a href="#">删除{{ record.a }}</a>
                </a-space>
              </template>
            </template>
          </a-table>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined, CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons-vue";
const displayArray = ref([
  "intention",
  "intentionCourse",
  "reference",
  "studentStatus",
  "classEndingTime",
  "classStopTime",
]);
const openPayrollDrawer = ref(false)
const dataSource = ref([
  {
    key: "1",
    orderNum: "12345678901234567890",
    orderType: "收入",
    orderForm: "支付宝",
    orderTag: "默认账户",
    orderStatus: "-",
    handleContent: "2023-04-01",
    orderSalesperson: "张三",
    handledBy: "李四",
    handledDate: "2023-04-01",
    createTime: "1234567890",
    accountChanges: "2023-04-01",
    discount: "100",
    orderStatus: "已支付",
  },
]);
const allColumns = ref([
  {
    title: "工资条名称/结算起止日期",
    dataIndex: "titleOrDate",
    key: "titleOrDate",
    width: 220,
  },

  {
    title: "结算员工",
    dataIndex: "user",
    key: "user",
    width: 140,
  },
  {
    title: "创建人",
    dataIndex: "createUser",
    key: "createUser",
    width: 120,
  },
  {
    title: "创建日期",
    dataIndex: "createTime",
    key: "createTime",
    width: 140,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 120,
  },
]);
const payrollSource = ref([{},{},{},{},])
const columns = ref([
{
    title: "工资条项目",
    dataIndex: "project",
    key: "project",
    width: 240,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: 120,
  },
  {
    title: "结算规则",
    dataIndex: "rule",
    key: "rule",
    width: 120,
  },
  {
    title: "规则模式",
    dataIndex: "model",
    key: "rule",
    width: 120,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 160,
  },
  
])
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem("payroll-list");
const keysArray = allColumns.value
  .map((column) => column?.key) // 可选链操作符
  .filter((key) => typeof key !== "undefined"); // 过滤未定义的值
const initialSelectedValues = savedSelected
  ? JSON.parse(savedSelected)
  : keysArray;

// 选中的列（初始化包含重要字段）
const selectedValues = ref(initialSelectedValues);
// 生成字段选择选项（排除操作列）
const columnOptions = computed(() =>
  allColumns.value
    .filter((col) => col.key !== "action")
    .map((col) => ({
      id: col.key,
      value: col.title,
      disabled: col.required, // 禁用必选字段
    }))
);
// 过滤后的列（自动包含必选列）
const filteredColumns = computed(() => {
  const requiredColumns = allColumns.value.filter((col) => col.required);
  const optionalColumns = allColumns.value.filter(
    (col) => selectedValues.value.includes(col.key) && !col.required
  );

  // 保持固定列顺序：left -> normal -> right
  return [
    ...requiredColumns.filter((col) => col.fixed === "left"),
    ...optionalColumns,
    ...requiredColumns.filter((col) => col.fixed === "right"),
  ];
});
// 强制包含必选字段的监听
watch(
  selectedValues,
  (newVal) => {
    const requiredKeys = allColumns.value
      .filter((col) => col.required)
      .map((col) => col.key);

    // 自动补全必选字段
    if (!requiredKeys.every((k) => newVal.includes(k))) {
      selectedValues.value = Array.from(
        new Set([
          ...newVal.filter((v) => !requiredKeys.includes(v)),
          ...requiredKeys,
        ])
      );
    }
  },
  { deep: true }
);
// 自动保存列配置到本地存储
watch(
  selectedValues,
  (newVal) => {
    localStorage.setItem("payroll-list", JSON.stringify(newVal));
  },
  { deep: true }
);
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

span.dot {
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  position: relative;
  vertical-align: middle;
  width: 6px;
  margin-right: 4px;
  background: #06f;
}
/* 添加旋转动画 */
@keyframes icon-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

.close-btn {
  &:hover {
    background: transparent;

    .close-icon {
      animation: icon-rotate 0.3s linear;
    }
  }
}




</style>