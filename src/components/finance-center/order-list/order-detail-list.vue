<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap bg-white  pl-3 pr-3 rounded-lb-4 rounded-rb-4">
      <all-filter :defaultStudentStatus="defaultStudentStatus" :displayArray="displayArray"
        :is-quick-show="false"></all-filter>
    </div>
    <div class="student-list mt-3 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">共 {{ dataSource.length }} 条订单 ，实收总计 10438 元，共欠费 100 元</div>
          <div class="edit flex">
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    导入学员订单
                  </a-menu-item>
                  <a-menu-item key="1">
                    批量导出
                  </a-menu-item>
                  <a-menu-item key="3">
                    导出记录
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                导入/导出学员订单
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions"
              :total="allColumns.length" :num="selectedValues.length" />
          </div>
        </div>
        <div class="table-content mt-2">
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
             :scroll="{ x: totalWidth }" size="small">
            <!-- <template #headerCell="{ column }">
              <template v-if="column.key === 'studentStatus'">
                <span class="mr-1">{{ column.title }}</span>
                <a-tooltip color="#666">
                  <template #title>在读学员：当前报读课程有一门或多门课程有剩余课时/天数/金额的学员。
                    历史学员：报读课程中全部课程都已结课的学员。</template>
                  <ExclamationCircleOutlined />
                </a-tooltip>
              </template>
            </template> -->
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'studentName'">

                <a-tooltip>
                  <template #title>查看学员档案</template>
                  <div class="flex cursor-pointer py5.5  flex-items-center h-4 w-30" @click="handleSeeStuData()">
                    <img width="36" height="36" class="mr-2" style="border-radius: 100%;"
                      src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                      alt="">
                    <div class="name mt-1">
                      <div class="text-#222">龙龙{{ record.a }}</div>
                      <div class="text-3 text-#888 flex flex-items-center">176****1636</div>
                    </div>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'orderNum'">
                <span class="text-#06f flex-center justify-start cursor-pointer"
                  @click="handleOrderDetail()">20250410144858420324570 {{ record.a }}
                  <a-tooltip>
                    <template #title>订单欠费未缴清</template>
                    <span
                      class="w-5 h-5 block text-red bg-#FBE7E6 text-3 ml-1 text-center line-height-5 rounded-1">欠</span>
                  </a-tooltip>
                </span>
              </template>
              <template v-if="column.key === 'orderType'">
                报名续费
              </template>

              <template v-if="column.key === 'orderSource'">
               线下办理
              </template>

              <template v-if="column.key === 'orderTag'">
               【内荐】、【转介绍】
              </template>

              <template v-if="column.key === 'orderStatus'">
                已完成
              </template>

              <template v-if="column.key === 'handleContent'">
                一对一认知课
              </template>

              <template v-if="column.key === 'studyType'">
                新报
              </template>

              <template v-if="column.key === 'productType'">
                课程
              </template>

              <template v-if="column.key === 'courseCategory'">
                -
              </template>

              <template v-if="column.key === 'enrolledClass'">
               -
              </template>

              <template v-if="column.key === 'classStatus'">
               -
              </template>

              <template v-if="column.key === 'quotation'">
               1课时/100.00元
              </template>

              <template v-if="column.key === 'purchaseCopies'">
                2份
              </template>

              <template v-if="column.key === 'purchaseQuantity'">
                2课时
              </template>

              <template v-if="column.key === 'giftQuantity'">
                1课时
              </template>

              <template v-if="column.key === 'courseDiscountName'">
                -
              </template>

              <template v-if="column.key === 'courseDiscount'">
               -
              </template>

              <template v-if="column.key === 'sharedDiscount'">
                - ¥ 0.00
              </template>

              <template v-if="column.key === 'receivableAmount'">
                <span class="font-800">+1000.00</span>

              </template>

              <template v-if="column.key === 'orderSalesperson'">
               商老师
              </template>

              <template v-if="column.key === 'handler'">
                龙钊
              </template>

              <template v-if="column.key === 'handleDate'">
                2025-04-13
              </template>

              <template v-if="column.key === 'createTime'">
                2025-04-13 13:50
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
    <order-detail-drawer v-model:open="openOrderDetailDrawer"></order-detail-drawer>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference', 'studentStatus', 'classEndingTime', 'classStopTime'])
const dataSource = ref([{ key: 1 }, { key: 2 }])
const allColumns = ref([
  {
    title: '订单编号',
    dataIndex: 'orderNum',
    key: 'orderNum',
    fixed: 'left',
    width: 250,
    required: true
  },
  {
    title: '报名学员',
    dataIndex: 'studentName',
    key: 'studentName',
    fixed: 'left',
    width: 160,
    required: true
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    key: 'orderType',
    width: 130
  },
  {
    title: '订单来源',
    dataIndex: 'orderSource',
    key: 'orderSource',
    width: 130
  },
  {
    title: '订单标签',
    dataIndex: 'orderTag',
    key: 'orderTag',
    width: 200
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    width: 130
  },
  {
    title: '办理内容',
    dataIndex: 'handleContent',
    key: 'handleContent',
    width: 180
  },
  {
    title: '报读类型',
    dataIndex: 'studyType',
    key: 'studyType',
    width: 130
  },
  {
    title: '商品类型',
    dataIndex: 'productType',
    key: 'productType',
    width: 130
  },
  {
    title: '课程类别',
    dataIndex: 'courseCategory',
    key: 'courseCategory',
    width: 130
  },
  {
    title: '报读班级',
    dataIndex: 'enrolledClass',
    key: 'enrolledClass',
    width: 130
  },
  {
    title: '分班状态',
    dataIndex: 'classStatus',
    key: 'classStatus',
    width: 130
  },
  {
    title: '报价单',
    dataIndex: 'quotation',
    key: 'quotation',
    width: 180
  },
  {
    title: '购买份数',
    dataIndex: 'purchaseCopies',
    key: 'purchaseCopies',
    width: 130
  },
  {
    title: '购买数量',
    dataIndex: 'purchaseQuantity',
    key: 'purchaseQuantity',
    width: 130
  },
  {
    title: '赠送数量',
    dataIndex: 'giftQuantity',
    key: 'giftQuantity',
    width: 130
  },
  {
    title: '单课优惠名称',
    dataIndex: 'courseDiscountName',
    key: 'courseDiscountName',
    width: 150
  },
  {
    title: '单课优惠',
    dataIndex: 'courseDiscount',
    key: 'courseDiscount',
    width: 130
  },
  {
    title: '分摊整单优惠',
    dataIndex: 'sharedDiscount',
    key: 'sharedDiscount',
    width: 150
  },
  {
    title: '应收金额',
    dataIndex: 'receivableAmount',
    key: 'receivableAmount',
    width: 140
  },
  {
    title: '订单销售员',
    dataIndex: 'orderSalesperson',
    key: 'orderSalesperson',
    width: 130
  },
  {
    title: '经办人',
    dataIndex: 'handler',
    key: 'handler',
    width: 130
  },
  {
    title: '经办日期',
    dataIndex: 'handleDate',
    key: 'handleDate',
    width: 130
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160
  },
])
const defaultStudentStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('order-detail-list');
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
  localStorage.setItem('order-detail-list', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
const openDrawer = ref(false)
const handleSeeStuData = () => {
  openDrawer.value = true
}
const openOrderDetailDrawer = ref(false)
const handleOrderDetail = () => {
  openOrderDetailDrawer.value = true
}
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

.tip {
  padding: 10px 24px 10px 14px;
  background: #e6f0ff;
  color: #333;

  a {
    color: var(--pro-ant-color-primary);
  }
}

.upNew {
  position: relative;

  &::before {
    position: absolute;
    top: -12px;
    left: -22px;
    z-index: 999;
    width: 39px;
    height: 22px;
    background: url(data:image/png;base64,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);
    background-size: contain;
    content: "";
  }
}
</style>