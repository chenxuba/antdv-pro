<template>
  <div class="roll-call">
    <div class="bg-white rounded-4  rounded-lt-none rounded-rt-none  pl-2 pr-2">
      <all-filter :displayArray="displayArray" is-show-search-stu-phonefilter></all-filter>
    </div>
    <div class="bg-white rounded-4  mt-3 py-3 px-5">
      <div class="table-title flex justify-between mb2">
        <div class="total">收入 ￥1010.00，支出 ￥310.00</div>
        <div class="edit flex">
          <a-button>
            导出数据
          </a-button>
          <!-- 自定义字段 -->
          <!-- <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length-1"
            :num="selectedValues.length-1" /> -->
        </div>
      </div>
      <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
        :scroll="{ x: totalWidth }" size="small">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'totalPrice'">
            <span class="flex justify-end">{{ column.title }}</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'rechargeAccount'">
            niuniuAccount {{ record.a }}
          </template>
          <template v-if="column.key === 'linkStudent'">
            <a-tooltip>
              <template #title>查看学员详情</template>
              <div class="flex cursor-pointer hover " @click="handleSeeStuData()">
                <img width="36" height="36" class="mr-1" style="border-radius: 100%;"
                  src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                  alt="">
                <div class="name mt-0">
                  <div class="text-#222 name">龙龙</div>
                  <div class="text-3 text-#888 flex flex-items-center">176****1636</div>
                </div>
              </div>
            </a-tooltip>
          </template>
          <template v-if="column.key === 'createTime'">
            2025-04-13 13:50
          </template>
          <template v-if="column.key === 'detailsType'">
            <span class="bg-#e6f0ff text-#06f text-3 px2 py1 rounded-10">储值账户充值</span>
          </template>
          <template v-if="column.key === 'price'">
            + 1000.00
          </template>
          <template v-if="column.key === 'givePrice'">
            + 10.00
          </template>
          <template v-if="column.key === 'orderNum'">
            <a-tooltip>
              <template #title>查看订单详情</template>
              <a class="text-#06f cursor-pointer" @click="handleOrderDetail()">20250413184833667811567</a>
            </a-tooltip>
          </template>
          <template v-if="column.key === 'remarks'">
            -
          </template>
          <template v-if="column.key === 'totalPrice'">
            <span class="flex justify-end font-800">1010.00</span>
          </template>
        </template>
      </a-table>
    </div>
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
    <order-detail-drawer v-model:open="openOrderDetailDrawer"></order-detail-drawer>

  </div>
</template>

<script setup>
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['openClassStatus', 'doYouSchedule', 'billingMode', 'createPeo', 'createTime', 'intentionCourse', 'reference'])
const dataSource = ref([{}, {}])
const openDrawer = ref(false)
const handleSeeStuData = () => {
  openDrawer.value = true
}
const openOrderDetailDrawer = ref(false);
const handleOrderDetail = () => {
  openOrderDetailDrawer.value = true;
};
const allColumns = ref([
  {
    title: '储值账户',
    dataIndex: 'rechargeAccount',
    key: "rechargeAccount",
    width: 150
  },
  {
    title: '明细关联学员',
    dataIndex: 'linkStudent',
    key: 'linkStudent',
    width: 120,
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 140,
    sorter: {
      compare: (a, b) => a.updateTime - b.updateTime,
    },
  },
  {
    title: '明细类型',
    dataIndex: 'detailsType',
    key: 'detailsType',
    width: 100,
  },
  {
    title: '金额（元）',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  },
  {
    title: '赠送金额（元）',
    dataIndex: 'givePrice',
    key: 'givePrice',
    width: 100,
  },
  {
    title: '订单编号',
    dataIndex: 'orderNum',
    key: 'orderNum',
    width: 180,
  },
  {
    title: '账单备注',
    dataIndex: 'remarks',
    key: 'remarks',
    width: 100,
  },
  {
    title: '总计（元）',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    width: 100,
  },

])

const defaultOpenClassStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('recharge-account-details');
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
  localStorage.setItem('recharge-account-details', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
</script>

<style lang="less" scoped>
.contentMain {
  box-sizing: content-box;
  padding: 16px 12px 6px 24px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .contentMainLeft {
    font-size: 14px;
    font-weight: 500;
    color: #222;
    flex-shrink: 0;
  }

  .contentMainRight {
    min-width: 72px;
    height: 30px;
    font-size: 30px;
    font-weight: 700;
    font-family: DINAlternate-Bold, DINAlternate;
    line-height: 30px;
    flex-shrink: 0;
    text-align: center;
  }
}

.contentSub {
  padding: 0 24px;
  height: 16px;
  line-height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  .contentSubLeft {
    font-size: 13px;
    color: #888;
  }

  .contentSubRight {
    font-size: 12px;
    color: #06f;
  }
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

.hover {
  &:hover {
    .name {
      color: var(--pro-ant-color-primary);
    }
  }
}
</style>