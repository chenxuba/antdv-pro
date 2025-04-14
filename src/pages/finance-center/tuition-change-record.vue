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
          <div class="total">当前共计 {{ dataSource.length }} 条记录</div>
          <div class="edit flex">
            <a-button  class="mr-2">导出数据</a-button>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions"
              :total="allColumns.length - 1" :num="selectedValues.length - 1" />
          </div>
        </div>
        <div class="table-content mt-2">
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :scroll="{ x: totalWidth }" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'createTime'"> 2025-04-13 19:58{{ record.a }} </template>
              <template v-if="column.key === 'name'"> 
                <a-tooltip>
                  <template #title>查看学员档案</template>
                  <div class="flex cursor-pointer  hover " @click="handleSeeStuData()">
                    <img width="36" height="36" class="mr-0" style="border-radius: 100%;"
                      src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                      alt="">
                    <div class="name ">
                      <div class="text-#222 name">龙龙{{ record.a }}</div>
                      <div class="text-3 text-#888 flex flex-items-center">176****1636</div>
                    </div>
                  </div>
                </a-tooltip> 
              </template>
              <template v-if="column.key === 'account'"> 奥夫音乐课 </template>
              <template v-if="column.key === 'teacherMethod'"> 班级授课 </template>
              <template v-if="column.key === 'chargingMethod'"> 按课时 </template>
              <template v-if="column.key === 'changeType'"> 课消 </template>
              <template v-if="column.key === 'changeNum'"> 
                <span class="text-#f03333">-1课时</span>  
              </template>
              <template v-if="column.key === 'price'"> 
                <span class="text-#f03333  ml10">-300.00</span>  
              </template>
              <template v-if="column.key === 'action'">
                <a href="#" @click="handleSeeClassRecord()">上课记录详情</a>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
    <class-record-details v-model:open="openClassRecordDrawer"></class-record-details>
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
const openDrawer = ref(false)
const openClassRecordDrawer = ref(false)
const dataSource = ref([{},{},])
const allColumns = ref([
  {
    title: "变动时间",
    dataIndex: "createTime",
    key: "createTime",
    fixed: "left",
    width: 160,
    required: true,
  },
  {
    title: "学员/电话",
    dataIndex: "name",
    key: "name",
    width: 140,
  },
  {
    title: "扣费课程账户",
    dataIndex: "account",
    key: "account",
    width: 140,
  },
  {
    title: "授课方式",
    dataIndex: "teacherMethod",
    key: "teacherMethod",
    width: 140,
  },
  {
    title: "收费方式",
    dataIndex: "chargingMethod",
    key: "chargingMethod",
    width: 140,
  },
  {
    title: "变动类型",
    dataIndex: "changeType",
    key: "changeType",
    width: 140,
  },
  {
    title: "变动数量",
    dataIndex: "changeNum",
    key: "changeNum",
    width: 140,
  },
  {
    title: "变动数量对应学费（元）",
    dataIndex: "price",
    key: "price",
    width: 170,
  },
 
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 140,
    required: true,
  },
]);
const handleSeeStuData = () => {
  openDrawer.value = true
}
const handleSeeClassRecord = ()=>{
  openClassRecordDrawer.value = true
}
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem("tuition-change-record");
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
    localStorage.setItem("tuition-change-record", JSON.stringify(newVal));
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
.hover{
  &:hover{
    .name{
      color: #06f;
    }
  }
}

</style>