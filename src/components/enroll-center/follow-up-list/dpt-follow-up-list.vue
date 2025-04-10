<script setup>
import { ref, watch, computed } from 'vue';
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const activeKey = ref('1');
const activeKey2 = ref('1');
const dataSource = ref([
  {
    key: '1',
    name: '张三/男',
    phone: '13800138000',
    createPeo: '李老师',
    content: '咨询钢琴课程',
    stuState: '意向学员',
    channelType: '线上渠道',
    channel: '官网表单',
    imgAudio: '--',
    intentionCourse: '钢琴入门',
    followed: '2024-02-20 14:30',
    followedWay: '电话跟进',
    teacher: '王销售',
    nextTime: '2024-02-25 10:00',
    returnState: '待回访',
    action: '查看详情'
  },
  {
    key: '2',
    name: '李莉/女',
    phone: '13912345678',
    createPeo: '张顾问',
    content: '试听舞蹈课',
    stuState: '体验学员',
    channelType: '线下渠道',
    channel: '门店咨询',
    imgAudio: '--',
    intentionCourse: '爵士舞基础',
    followed: '2024-02-21 09:15',
    followedWay: '微信沟通',
    teacher: '陈经理',
    nextTime: '2024-02-28 15:00',
    returnState: '已回访',
    action: '编辑'
  },
  {
    key: '3',
    name: '王五/男',
    phone: '13698765432',
    createPeo: '赵老师',
    content: '询问价格方案',
    stuState: '潜在客户',
    channelType: '转介绍',
    channel: '老生推荐',
    imgAudio: '--',
    intentionCourse: '声乐培训',
    followed: '2024-02-22 16:45',
    followedWay: '面谈',
    teacher: '刘总监',
    nextTime: '2024-03-01 11:30',
    returnState: '需再次跟进',
    action: '删除'
  }
])
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
    key: 'phone',
  },
  {
    title: '跟进人',
    dataIndex: 'createPeo',
    key: "createPeo",
    width: 100
  },
  {
    title: '跟进内容',
    dataIndex: 'content',
    key: "content",
    width: 180
  },
  {
    title: '学员状态',
    dataIndex: 'stuState',
    key: "stuState",
    width: 120
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
    title: "图片/音频",
    dataIndex: 'imgAudio',
    key: "imgAudio",
    width: 100
  },
  {
    title: '意向课程',
    key: 'intentionCourse',
    dataIndex: 'intentionCourse',
    width: 120

  },
  {
    title: '跟进时间',
    dataIndex: 'followed',
    key: "followed",
    width: 160
  },
  {
    title: '跟进方式',
    dataIndex: 'followedWay',
    key: "followedWay",
    width: 100
  },
  {
    title: '销售员',
    dataIndex: 'teacher',
    key: "teacher",
    width: 100

  },
  {
    title: '下次跟进',
    dataIndex: 'nextTime',
    key: "nextTime",
    fixed: 'right',
    width: 160
  },
  {
    title: '回访状态',
    dataIndex: 'returnState',
    key: "returnState",
    fixed: 'right',
    width: 120,
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 120,
    required: true
  },
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const onClickMenu = ({ key }) => {
  console.log(`Click on item ${key}`);
}
const visible = ref(false);
const actionvisible = ref(false);
const statusvisible = ref(false);
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('followUpList');
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
  localStorage.setItem('followUpList', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference','department'])
</script>

<template>
  <div class="tab-content">
    <all-filter :displayArray="displayArray" type="dpt" :isShowSearchStuPhone="false"></all-filter>
    <div class="tab-table">
      <div class="table-title flex justify-between">
        <div class="total">当前共 {{ dataSource.length }} 条跟进记录, 跟进学员 1 人，0 条已标记回访，1 条未回访</div>
        <div class="edit flex">
          <a-button class="mr-2">导出数据</a-button>
          <!-- 自定义字段 -->
          <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length - 1"
            :num="selectedValues.length - 1" />
        </div>
      </div>
      <div class="table-content mt-2">
        <a-table :dataSource="dataSource" :pagination="false" :columns="filteredColumns" :row-selection="rowSelection"
          :scroll="{ x: totalWidth }" size="small">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="flex">
                <img width="40" height="40" class="mr-2" style="border-radius: 100%;"
                  src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                  alt="">
                <div class="name mt-1">
                  <div class="text-#222">龙龙</div>
                  <div class="text-3 text-#888">男</div>
                </div>
              </div>
            </template>
            <template v-if="column.key === 'phone'">
              <div class="name">
                <div class="text-#222">爸爸</div>
                <div class="text-3 text-#666">176****1636</div>
              </div>
            </template>
            <template v-if="column.key === 'intentionCourse'">
              <clamped-text :text="record.intentionCourse"></clamped-text>
            </template>
            <template v-if="column.key === 'channel'">
              <clamped-text :text="record.channel"></clamped-text>
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