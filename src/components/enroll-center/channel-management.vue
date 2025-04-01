<script setup>
import { ref } from 'vue';
import allIntentionStudentFilter from '~@/components/enroll-center/all-intention-student-filter.vue';
const dataSource = ref([
  {
    id: 0,
    name: "自然流量渠道",
    category: "线上渠道",
    status: "0",
    type: "免费渠道",
    effective: 235,
    doneNum: 47,
    doneRate: "20.0%",
    remark: "自然搜索流量",
    createTime: "2024-02-15 09:23:12",
    systemDefault: false
  },
  {
    id: 1,
    name: "自然流量渠道",
    category: "线上渠道",
    status: "1",
    type: "免费渠道",
    effective: 235,
    doneNum: 47,
    doneRate: "20.0%",
    remark: "自然搜索流量",
    createTime: "2024-02-15 09:23:12",
    systemDefault: true
  },
  {
    id: 2,
    name: "社交媒体广告",
    category: "付费推广",
    status: "1",
    type: "付费渠道",
    effective: 178,
    doneNum: 32,
    doneRate: "18.0%",
    remark: "Q4季度投放",
    createTime: "2024-01-05 14:45:30",
    systemDefault: true

  },
  {
    id: 3,
    name: "合作伙伴推荐",
    category: "合作渠道",
    status: "1",
    type: "合作推广",
    effective: 94,
    doneNum: 21,
    doneRate: "22.3%",
    remark: "战略合作伙伴",
    createTime: "2023-12-20 16:10:55",
    systemDefault: true
  },
  {
    id: 4,
    name: "线下活动获客",
    category: "线下渠道",
    status: "1",
    type: "免费渠道",
    effective: 156,
    doneNum: 29,
    doneRate: "18.6%",
    remark: "展会现场登记",
    createTime: "2024-03-01 11:30:18",
    systemDefault: true
  },
  {
    id: 5,
    name: "邮件营销渠道",
    category: "线上渠道",
    status: "1",
    type: "免费渠道",
    effective: 312,
    doneNum: 45,
    doneRate: "14.4%",
    remark: "月度EDM推送",
    createTime: "2024-02-28 10:15:47",
    systemDefault: true
  },
])
const allColumns = ref([
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name',
    width: 140,
  },
  {
    title: '渠道分类',
    dataIndex: 'category',
    width: 120,
    key: 'category',
  },
  {
    title: '渠道状态',
    key: 'status',
    dataIndex: 'status',
    width: 120
  },
  {
    title: '渠道类型',
    key: 'type',
    dataIndex: 'type',
    width: 120

  },
  {
    title: '有效线索数',
    dataIndex: 'effective',
    key: "effective",
    width: 120
  },
  {
    title: '成交转化数',
    dataIndex: 'doneNum',
    key: "doneNum",
    width: 120
  },
  {
    title: '成交转化率',
    dataIndex: 'doneRate',
    key: "doneRate",
    width: 120
  },

  {
    title: '备注',
    dataIndex: 'remark',
    key: "remark",
    width: 140

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 180
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 140,
    fixed: 'right',
  }
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.systemDefault, // Column configuration not to be checked
    name: record.name,
  }),
};
// 动态计算横向滚动宽度
const totalWidth = computed(() => {
  return allColumns.value.reduce((acc, column) => acc + (column.width || 0), 0);
});

const displayArray = ref(['channelCategory','channelStatus','channelType'])


</script>

<template>
  <div class="tab-content">
    <all-intention-student-filter :displayArray="displayArray" :isQuickShow="false"></all-intention-student-filter>
    <div class="tab-table">
      <div class="table-title flex justify-between">
        <div class="total">共{{ dataSource.length }}个渠道</div>
        <div class="edit flex">
          <a-button type="primary" class="mr-2">创建渠道</a-button>
          <a-button class="mr-2">分类管理</a-button>
          <a-button class="mr-2">批量调整渠道</a-button>
        </div>
      </div>
      <div class="table-content mt-2">
        <a-table rowKey="id" :dataSource="dataSource" :pagination="false" :columns="allColumns"
          :row-selection="rowSelection" :scroll="{ x: totalWidth }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag v-if="record.status == 1" color="blue">启用中</a-tag>
              <a-tag v-if="record.status == 0" color="red">已停用</a-tag>
            </template>
            <template v-if="column.key === 'action' && !record.systemDefault">
              <a>编辑</a>
              <a class="ml-3 mr-3">调整</a>
              <a v-if="record.status == 1">停用</a>
              <a v-if="record.status == 0">启用</a>
            </template>
            <template v-if="column.key === 'action' && record.systemDefault">
              <div class="text-#bbb text-3 cursor-not-allowed">系统默认，不支持操作</div>
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
        width: 52px;
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