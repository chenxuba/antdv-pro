<template>
  <div class="roll-call">
    <div class="databord bg-white  pt-0.1 pb-1 pl-5 pr-5 rounded-4   rounded-lt-none rounded-rt-none ">
      <div class="flex justify-between mt-3 mb-2">
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d">
          <div class="contentMain">
            <div class="contentMainLeft">校区总账户余额（元）</div>
            <div class="contentMainRight font-900 mt7 mr-4 text-#06f">700.00</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">充值余额+赠送余额</div>
          </div>
        </div>
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d mx4">
          <div class="contentMain">
            <div class="contentMainLeft">充值余额（元）</div>
            <div class="contentMainRight font-900 mt7 mr-4 text-#222">700.00</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">校区账户充值金额</div>
          </div>
        </div>
        <div class="flex-1 bg-#fbfcff h-22.5 cursor-pointer rounded-5 hover-bg-#0066ff0d">
          <div class="contentMain">
            <div class="contentMainLeft">赠送余额（元）</div>
            <div class="contentMainRight font-900 mt7 mr-4 text-#222">0.00</div>
          </div>
          <div class="contentSub">
            <div class="contentSubLeft">校区账户赠送金额</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-4  mt-3 pl-2 pr-2">
      <all-filter :displayArray="displayArray" is-show-search-stu-phonefilter></all-filter>
    </div>
    <div class="bg-white rounded-4  mt-3 py-3 px-5">
      <div class="table-title flex justify-between mb2">
        <div class="total">共 {{ dataSource.length }} 个账户</div>
        <div class="edit flex">
          <a-button class="mr-3" type="primary">
            账户充值
          </a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  导入储值账户
                </a-menu-item>
                <a-menu-item key="2">
                  导出储值账户
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              导入/导出储值账户
              <DownOutlined :style="{ fontSize: '10px' }" />
            </a-button>
          </a-dropdown>
          <!-- 自定义字段 -->
          <!-- <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length-1"
            :num="selectedValues.length-1" /> -->
        </div>
      </div>
      <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
        :scroll="{ x: totalWidth }" size="small">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'canUseTotal'">
            <span class="flex-center">{{ column.title }}</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'rechargeAccount'">
            niuniuAccount {{ record.a }}
          </template>
          <template v-if="column.key === 'linkStudent'">
            <div class="text-#222 font-500">1位</div>


            <div class="text-3 text-#222 font-500 ">
              <a-tooltip>
                <template #title>查看学员详情</template>
                <span class="hover-text-#06f cursor-pointer " @click="handleSeeStuData()">刘小明</span>
              </a-tooltip>
            </div>
          </template>
          <template v-if="column.key === 'updateTime'">
            2025-03-21 16:29
          </template>
          <template v-if="column.key === 'canUseTotal'">
            <span class="font-800 text-#222 flex-center">700.00</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span class="flex action">
              <a-space :size="14">
                <a>充值</a>
                <a>退款</a>
              </a-space>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>

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
const allColumns = ref([
  {
    title: '储值账户',
    dataIndex: 'rechargeAccount',
    key: "rechargeAccount",
    width: 150
  },
  {
    title: '关联学员',
    dataIndex: 'linkStudent',
    key: 'linkStudent',
    width: 250,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 140,
    sorter: {
      compare: (a, b) => a.updateTime - b.updateTime,
    },
    defaultSortOrder: 'descend',
  },
  {
    title: '可用总余额（元）',
    dataIndex: 'canUseTotal',
    key: 'canUseTotal',
    width: 100,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: "action",
    fixed: 'right',
    width: 100,
    required: true
  },

])

const defaultOpenClassStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('recharge-account-list');
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
  localStorage.setItem('recharge-account-list', JSON.stringify(newVal));
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
</style>