<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap  bg-white  pl-3 pr-3 rounded-4">
      <all-filter :displayArray="displayArray" :is-quick-show="false"
        :is-show-search-stu-phonefilter="true"></all-filter>
    </div>
    <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">共 {{ dataSource.length }} 条</div>
          <div class="edit flex">
            <a-button class="mr-2">导出数据</a-button>
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
                    <div class="text-#222">龙龙</div>{{ record.a }}
                    <div class="text-3 text-#888">男</div>
                  </div>
                </div>
              </template>
              <template v-if="column.key === 'faceTime'">
                2025-04-11 13:49
              </template>
              <template v-if="column.key === 'face'">
                <a-tooltip placement="right">
                  <template #title>
                    <span>点击重新采集人脸</span>
                  </template>
                  <div class="flex flex-items-center cursor-pointer">
                    <span class="whitespace-nowrap text-#333">
                      已采集
                    </span>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" style="margin-left: 12px;">
                      <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="\u753B\u677F\u5907\u4EFD-27" transform="translate(-594.000000, -464.000000)">
                          <g id="\u7F16\u7EC4-11" transform="translate(518.000000, 310.000000)">
                            <g id="Rectangle-2\u5907\u4EFD-80" transform="translate(0.000000, 126.000000)">
                              <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                                <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                                  <polygon id="\u77E9\u5F62" fill="#000000" fill-rule="nonzero" opacity="0"
                                    points="0 0 16 0 16 16 8 16 0 16"></polygon>
                                  <path
                                    d="M1.49983336,11 C1.74529324,10.9999182 1.94950067,11.1767253 1.99191437,11.4099604 L2,11.4998334 L2,14 L4.5,14 C4.74545992,14 4.9496084,14.1768752 4.99194436,14.4101244 L5,14.5 C5,14.7454599 4.82312487,14.9496084 4.58987566,14.9919444 L4.5,15 L1.50100003,15 C1.25559799,15 1.05147725,14.8232051 1.00908211,14.5900195 L1.00100006,14.5001667 L1,11.5001667 C0.999908009,11.2240243 1.223691,11.0000921 1.49983336,11 Z M14.4988336,11 C14.7442935,10.9999183 14.9485009,11.1767254 14.9909146,11.4099605 L14.9990002,11.4998334 L15,14.4998334 C15.0000818,14.7453511 14.8231944,14.9495863 14.5898958,14.9919408 L14.5,15 L11.5,15 C11.2238576,15 11,14.7761424 11,14.5 C11,14.2545401 11.1768752,14.0503917 11.4101244,14.0080557 L11.5,14 L14,14 L13.9990003,11.5001667 C13.9989185,11.2547068 14.1757256,11.0504994 14.4089607,11.0080857 L14.4988336,11 Z M4.5,9 L11.5,9 L11.4931641,9.38828125 L11.4931641,9.38828125 L11.4769287,9.60498047 L11.4769287,9.60498047 L11.4453125,9.83125 C11.28125,10.75 10.625,11.8 8,11.8 C5.484375,11.8 4.77685547,10.8356771 4.5778656,9.94669189 L4.53663635,9.71717529 C4.53140259,9.67943522 4.5269165,9.64200846 4.52307129,9.60498047 L4.50683594,9.38828125 L4.50683594,9.38828125 L4.5,9 Z M11,5.5 C11.5522847,5.5 12,5.94771525 12,6.5 C12,7.05228475 11.5522847,7.5 11,7.5 C10.4477153,7.5 10,7.05228475 10,6.5 C10,5.94771525 10.4477153,5.5 11,5.5 Z M5,5.5 C5.55228475,5.5 6,5.94771525 6,6.5 C6,7.05228475 5.55228475,7.5 5,7.5 C4.44771525,7.5 4,7.05228475 4,6.5 C4,5.94771525 4.44771525,5.5 5,5.5 Z M14.5,1 C14.7455177,1 14.9496939,1.17695541 14.9919707,1.41026814 L15,1.50016663 L14.9990002,4.50016663 C14.9989082,4.77630898 14.774976,5.000092 14.4988336,5 C14.2533737,4.99991817 14.0492842,4.82297499 14.007026,4.58971169 L13.9990003,4.49983337 L14,2 L11.5,2 C11.2545401,2 11.0503916,1.82312484 11.0080557,1.58987563 L11,1.5 C11,1.25454011 11.1768752,1.05039163 11.4101244,1.00805567 L11.5,1 L14.5,1 Z M4.5,1 C4.77614235,1 5,1.22385763 5,1.5 C5,1.74545989 4.82312481,1.94960837 4.5898756,1.99194433 L4.5,2 L2,2 L2,4.50016667 C1.99991812,4.74562654 1.82297492,4.94971605 1.58971162,4.99197426 L1.49983331,5 C1.25437343,4.99991815 1.05028392,4.82297495 1.00802571,4.58971165 L1,4.49983333 L1.001,1.49983333 C1.0010818,1.25443131 1.17794474,1.05036951 1.41114451,1.0080521 L1.50099997,1 L4.5,1 Z"
                                    id="\u5F62\u72B6" fill="#0066FF"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'faceType'">
                人脸考勤
              </template>
              <template v-if="column.key === 'signInOutType'">
                自动签到
              </template>
              <template v-if="column.key === 'signInOutTime'">
                2025-04-11 13:49
              </template>
              <template v-if="column.key === 'schedulePlan'">
                有
              </template>
              <template v-if="column.key === 'classTime'">
                <div>
                  2025-04-11 
                </div>
                <div>
                  09:00 ～ 10:00
                </div>
              </template>
              <template v-if="column.key === 'linkSchedule'">
                妞妞-一对一认知课
              </template>
              <template v-if="column.key === 'remarks'">
                点名到课
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
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference'])
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    phone: 17601241636,
    intentionCourse: '初级言语课、高级感统课、中级认知课',
    channelType: "外部渠道",
    channel: "抖音",
    teacher: "张晨",
    status: "已邀约",
    followed: "2025-03-31 17:09",
    nextTime: "2025-03-31 17:09",
    createTime: "2025-03-31 17:09",
    createPeo: "张晨",
    putType: "否",
    putPeo: "-",
    birthday: "2022-09-23",
    wxchat: "1115009958",
    grade: "一年级",
    school: "上海市第一人民小学",
    address: "上海市杨浦区纪念路8号财大科技园区5号楼102A",
    IDcard1: "CL202209229932",
    IDcard2: "37292520220922883X",
  },
])
const allColumns = ref([
  {
    title: '学员姓名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 130,
    required: true // 新增必选标识
  },
  {
    title: '考勤时间',
    dataIndex: 'faceTime',
    width: 150,
    key: 'faceTime',
  },
  {
    title: '人脸采集',
    dataIndex: 'face',
    key: "face",
    width: 120
  },
  {
    title: '考勤类型',
    dataIndex: 'faceType',
    key: "faceType",
    width: 120
  },
  {
    title: '签到/签退类型',
    dataIndex: 'signInOutType',
    key: "signInOutType",
    width: 160
  },
  {
    title: '签到/签退时间',
    dataIndex: 'signInOutTime',
    key: "signInOutTime",
    width: 160

  },
  {
    title: '排课计划',
    dataIndex: 'schedulePlan',
    key: "schedulePlan",
    width: 120
  },
  {
    title: '上课时间',
    dataIndex: 'classTime',
    key: "classTime",
    width: 160
  },
  {
    title: '相关日程',
    dataIndex: 'linkSchedule',
    key: "linkSchedule",
    width: 160
  },
  {
    title: '提示',
    dataIndex: 'remarks',
    key: "remarks",
    width: 160
  },
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('face-record');
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
  localStorage.setItem('face-record', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
</script>

<style lang="less" scoped>
.actionbtn {
  color: var(--pro-ant-color-primary);
  cursor: pointer;
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