<script setup>
import { ref, watch, computed } from 'vue';
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const activeKey = ref('1');
const activeKey2 = ref('1');
const dataSource = ref([
  {
    key: '1',
    name: '王晓明',
    phone: '13812345678',
    stuState: '已报名',
    tryListeningState: '已完成',
    formSchedule: '市场活动',
    tryListeningType: '线下试听',
    createTime: '2023-08-01 14:30',
    channelType: '线上渠道',
    channel: '官方网站',
    course: '钢琴基础课',
    classTime: '2023-08-05 09:00',
    teacher: '张老师',
    helpTeacher: '李助教',
    classRoom: '音乐厅A',
    createUser: '王芳'
  },
  {
    key: '2',
    name: '李思雨',
    phone: '13923456789',
    stuState: '试听中',
    tryListeningState: '待反馈',
    formSchedule: '老生推荐',
    tryListeningType: '线上试听',
    createTime: '2023-08-02 10:15',
    channelType: '线下渠道',
    channel: '校园宣传',
    course: '声乐入门',
    classTime: '2023-08-06 15:30',
    teacher: '陈老师',
    helpTeacher: '赵助教',
    classRoom: '排练室3',
    createUser: '张伟'
  },
  {
    key: '3',
    name: '张浩然',
    phone: '13634567890',
    stuState: '待联系',
    tryListeningState: '已取消',
    formSchedule: '线上推广',
    tryListeningType: '免费试听',
    createTime: '2023-08-03 16:20',
    channelType: '合作机构',
    channel: '少儿艺术中心',
    course: '小提琴初级',
    classTime: '2023-08-06 15:30',
    teacher: '王老师',
    helpTeacher: '孙助教',
    classRoom: '弦乐教室',
    createUser: '李娜'
  },
  {
    key: '4',
    name: '陈雨桐',
    phone: '13545678901',
    stuState: '已结业',
    tryListeningState: '已取消',
    formSchedule: '家长推荐',
    tryListeningType: '线下试听',
    createTime: '2023-07-28 09:45',
    channelType: '线下渠道',
    channel: '社区活动',
    course: '舞蹈基础',
    classTime: '2023-08-04 18:00',
    teacher: '刘老师',
    helpTeacher: '周助教',
    classRoom: '舞蹈房2',
    createUser: '陈强'
  },
  {
    key: '5',
    name: '赵心怡',
    phone: '13256789012',
    stuState: '待缴费',
    tryListeningState: '已完成',
    formSchedule: '线上直播',
    tryListeningType: '线上试听',
    createTime: '2023-08-04 11:10',
    channelType: '线上渠道',
    channel: '抖音直播',
    course: '吉他弹唱',
    classTime: '2023-08-09 19:30',
    teacher: '黄老师',
    helpTeacher: '吴助教',
    classRoom: '流行乐教室',
    createUser: '郑秀兰'
  }
])
const allColumns = ref([
  {
    title: '学员姓名',
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
    key: 'phone',
  },
  {
    title: '学员状态',
    dataIndex: 'stuState',
    key: "stuState",
    width: 120
  },
  {
    title: '试听状态',
    dataIndex: 'tryListeningState',
    key: "tryListeningState",
    width: 120
  },
  {
    title: '来源日程',
    dataIndex: 'formSchedule',
    key: "formSchedule",
    width: 120
  },
  {
    title: '试听类型',
    dataIndex: 'tryListeningType',
    key: "tryListeningType",
    width: 120
  },
  {
    title: '邀约时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 160
  },
  {
    title: '渠道分类',
    dataIndex: 'channelType',
    key: "channelType",
    width: 130
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: "channel",
    width: 130
  },
  {
    title: '课程名称',
    dataIndex: 'course',
    key: "course",
    width: 130
  },
  {
    title: '上课时间',
    dataIndex: 'classTime',
    key: "classTime",
    width: 170
  },
  {
    title: '上课老师',
    dataIndex: 'teacher',
    key: "teacher",
    width: 130
  },
  {
    title: '助教',
    dataIndex: 'helpTeacher',
    key: "helpTeacher",
    width: 130
  },
  {
    title: '上课教室',
    dataIndex: 'classRoom',
    key: "classRoom",
    width: 130
  },
  {
    title: '销售员',
    dataIndex: 'teacher',
    key: "teacher",
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    key: "createUser",
    width: 100
  },

])

const onClickMenu = ({ key }) => {
  console.log(`Click on item ${key}`);
}
const visible = ref(false);
const actionvisible = ref(false);
const statusvisible = ref(false);
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('tryListening');
const initialSelectedValues = savedSelected
  ? JSON.parse(savedSelected)
  : [
    'name', 'phone', 'intentionCourse', 'channel',
    'followed', 'nextTime', 'intentionLevel', 'status',
    'teacher', 'action'
  ];

// 选中的列（初始化包含重要字段）
const selectedValues = ref(initialSelectedValues);
const value1 = ref(1);
const options = [{ id: 1, type: '1', label: "高" }, { id: 2, type: '2', label: "中" }, { id: 3, type: '3', label: "低" }, { id: 4, type: '4', label: "未知" }]
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
  localStorage.setItem('tryListening', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference','department'])
</script>

<template>
  <div class="tab-content">
    <all-filter :displayArray="displayArray" type="dpt" :is-quick-show="false" :isShowSearchStuPhone="false"></all-filter>
    <div class="tab-table">
      <div class="table-title flex justify-between">
        <div class="total">共 {{ dataSource.length }} 条，共 0 位学员</div>
        <div class="edit flex">
          <a-button type="primary" class="mr-2">安排试听</a-button>
          <a-button  class="mr-2">创建试听</a-button>
          <a-button class="mr-2">导出数据</a-button>
          <!-- 自定义字段 -->
          <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length - 1"
            :num="selectedValues.length" />
        </div>
      </div>
      <div class="table-content mt-2">
        <a-table :dataSource="dataSource" :pagination="false" :columns="filteredColumns" 
          :scroll="{ x: totalWidth }" size="small">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="flex flex-center justify-start">
                <img width="40" height="40" class="mr-2" style="border-radius: 100%;"
                  src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                  alt="">
                <div class="name">
                  <div class="text-#222">{{record.name}}</div>
                </div>
              </div>
            </template>
            <template v-if="column.key === 'phone'">
              <div class="name">
                <div>176****1636</div>
              </div>
            </template>
            <template v-if="column.key === 'intentionCourse'">
              <clamped-text :text="record.intentionCourse"></clamped-text>
            </template>
            <template v-if="column.key === 'channel'">
              <clamped-text :text="record.channel"></clamped-text>
            </template>
            <template v-if="column.key === 'content'">
              <clamped-text :text="record.content"></clamped-text>
            </template>
            <template v-if="column.key === 'stuState'">
              <div class="intention">
                <a-badge status="processing" text="意向学员" /> 
              </div>
            </template>
            <template v-if="column.key === 'address'">
              <clamped-text :text="record.address"></clamped-text>
            </template>
            <template v-if="column.key === 'createPeo'">
              <clamped-text :text="record.createPeo"></clamped-text>
            </template>
            <template v-else-if="column.key === 'action'">
              <span class="flex action">
                <a class="mr-3">标记已回访</a>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.tab-content {
  .tab-table {
    background: #fff;
    margin-top: 8px;
    padding: 12px;
    border-radius: 12px;

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
        margin-top: 1px;
        position: absolute;
        width: 4px;
      }
    }

    .intention {
      display: flex;
      align-items: center;

      .statusTag {
        
        height: 24px;
        background-color: rgb(255, 245, 230);
        color: rgb(255, 153, 0);
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC, sans-serif;
        font-weight: 600;
      }
    }

    .intentionTag {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #f33;
      border-radius: 100px;
      margin-right: 3px;
    }

    .action {
      a {
        color: var(--pro-ant-color-primary);
        ;
      }
    }
  }
}
</style>