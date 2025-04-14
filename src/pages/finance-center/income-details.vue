<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap bg-white pl-3 pr-3 rounded-lb-4 rounded-rb-4">
      <all-filter  :displayArray="displayArray"
        :is-quick-show="false" :is-show-search-stu-phonefilter="true"></all-filter>
    </div>
    <div class="student-list mt-3 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">共 {{ dataSource.length }} 条确认收入记录，确认收入金额总计：￥2288.00</div>
          <div class="edit flex">
            <a-button  class="mr-2">导出数据</a-button>
            <!-- 自定义字段 -->
            <!-- <customize-code v-model:checkedValues="selectedValues" :options="columnOptions"
              :total="allColumns.length - 1" :num="selectedValues.length - 1" /> -->
          </div>
        </div>
        <div class="table-content mt-2">
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :scroll="{ x: totalWidth }" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'createTime'"> 2025-04-13 19:58{{ record.a }} </template>
              <template v-if="column.key === 'student'"> 妞妞 </template>
              <template v-if="column.key === 'courseName'"> 奥夫音乐课 </template>
              <template v-if="column.key === 'courseType'"> - </template>
              <template v-if="column.key === 'teachingMethod'"> 班课 </template>
              <template v-if="column.key === 'detailsStatus'"> 
                <div class="flex flex-items-center">
                  <span class="dot"></span>
                  <span>课时课消</span>
                </div>  
              </template>
              <template v-if="column.key === 'teachers'"> 郭杨 </template>
              <template v-if="column.key === 'subTeachers'"> - </template>
              <template v-if="column.key === 'linkClass'"> 奥夫班 </template>
              <template v-if="column.key === 'courseTime'"> 
                <div class="text-#222">2025-04-14</div>
                <div class="text-3 text-#888">时段：10:00~10:30</div>  
              </template>
              <template v-if="column.key === 'callNameTime'"> 2025-04-14 08:19 </template>
              <template v-if="column.key === 'courseUse'"> 1课时 </template>
              <template v-if="column.key === 'confirmIncome'"> + 300.00 </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
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
const dataSource = ref([{},{},])
const allColumns = ref([
  {
    title: "确认收入创建时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 200,
  },

  {
    title: "学员",
    dataIndex: "student",
    key: "student",
    width: 120,
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    key: "courseName",
    width: 140,
  },
  {
    title: "课程类别",
    dataIndex: "courseType",
    key: "courseType",
    width: 120,
  },
  {
    title: "授课方式",
    dataIndex: "teachingMethod",
    key: "teachingMethod",
    width: 120,
  },
  {
    title: "明细类型",
    dataIndex: "detailsStatus",
    key: "detailsStatus",
    width: 140,
  },
  {
    title: "上课教师",
    dataIndex: "teachers",
    key: "teachers",
    width: 120,
  },
  {
    title: "上课助教",
    dataIndex: "subTeachers",
    key: "subTeachers",
    width: 120,
  },
  {
    title: "课消所属班级",
    dataIndex: "linkClass",
    key: "linkClass",
    width: 140,
  },
  {
    title: "上课时间",
    dataIndex: "courseTime",
    key: "courseTime",
    width: 180,
  },
  {
    title: "点名时间",
    dataIndex: "callNameTime",
    key: "callNameTime",
    width: 180,
  },
  {
    title: "课程消耗",
    dataIndex: "courseUse",
    key: "courseUse",
    fixed: "right",
    required: true, // 新增必选标识
    width: 120,
  },
  {
    title: "确认收入",
    dataIndex: "confirmIncome",
    key: "confirmIncome",
    fixed: "right",
    required: true, // 新增必选标识
    width: 120,
  },
]);
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem("income-details");
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
    localStorage.setItem("income-details", JSON.stringify(newVal));
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

</style>