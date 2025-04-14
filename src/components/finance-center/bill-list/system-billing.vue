<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap bg-white pl-3 pr-3 rounded-lb-4 rounded-rb-4">
      <all-filter :defaultCreateTimeVals="defaultCreateTimeVals" :displayArray="displayArray"
        :is-quick-show="false"></all-filter>
    </div>
    <div class="student-list mt-3 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">共 {{ dataSource.length }} 条信息</div>
          <div class="edit flex">
            <a-button type="primary" class="mr-2">记一笔</a-button>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1"> 批量导出 </a-menu-item>
                  <a-menu-item key="3"> 导出记录 </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                导出数据
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions"
              :total="allColumns.length - 1" :num="selectedValues.length - 1" />
          </div>
        </div>
        <div class="table-content mt-2">
          <div class="tip">
            收入：¥ 8410， 支出：¥ 100， 结算：¥ 8310， 已确认 0 条， 待确认 15
            条， 退款中 0 条， 退款失败 0 条
          </div>
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :scroll="{ x: totalWidth }" size="small">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'orderNum'">
                <a-tooltip>
                  <template #title>查看账单详情</template>
                  <a class="text-#06f cursor-pointer" @click="handleBillDetail()">20250413184836423728284</a>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'orderType'"> 系统同步 </template>
              <template v-if="column.key === 'paymentType'"> 支付宝 </template>
              <template v-if="column.key === 'paymentAccount'">
                默认账户
              </template>
              <template v-if="column.key === 'payNum'"> - </template>
              <template v-if="column.key === 'linkOrder'">
                <a-tooltip>
                  <template #title>查看订单详情</template>
                  <a class="text-#06f cursor-pointer" @click="handleOrderDetail()">20250413184833667811567</a>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'otherAccont'"> - </template>
              <template v-if="column.key === 'handleBy'"> 龙钊 </template>
              <template v-if="column.key === 'putinType'"> 收入 </template>
              <template v-if="column.key === 'createTime'">
                2025-04-13 19:04
              </template>
              <template v-if="column.key === 'remark'"> - </template>
              <!-- handleContent -->
              <template v-if="column.key === 'handleContent'">
                初级感统课
              </template>
              <!-- handlePeo -->
              <template v-if="column.key === 'handlePeo'"> - </template>
              <template v-if="column.key === 'oneLevelClassify'">
                订单收入
              </template>
              <template v-if="column.key === 'twoLevelClassify'">
                报名续费
              </template>
              <template v-if="column.key === 'payDate'"> 2025-04-13 </template>
              <template v-if="column.key === 'handledremark'"> - </template>
              <!-- handledremark -->
              <template v-if="column.key === 'name'">
                <a-tooltip>
                  <template #title>查看学员档案</template>
                  <div class="flex cursor-pointer flex-items-center" @click="handleSeeStuData()">
                    <img width="36" height="36" class="mr-1" style="border-radius: 100%"
                      src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                      alt="" />
                    <div class="name mt-0">
                      <div class="text-#222 hover-text-#0066ff">龙龙</div>
                      <div class="text-3 text-#888 flex flex-items-center">
                        176****1636
                      </div>
                    </div>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'price'"> +200.00 </template>
              <template v-if="column.key === 'orderStatus'">
                <span class="bg-#fff5e6 text-#f90 text-3 px3 py1 rounded-3 font-500">待确认</span>
              </template>
              <template v-if="column.key === 'action'">
                <a-space :size="12">
                  <a href="#">确认到账{{ record.a }}</a>
                  <a href="#">编辑{{ record.a }}</a>
                  <a href="#">删除{{ record.a }}</a>
                </a-space>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
   
    <!-- 账单详情 -->
    <a-drawer v-model:open="openBillDrawer" :bodyStyle="{ padding: '0', background: '#fff' }" :closable="false"
      width="800px" placement="right">
      <!-- 自定义头部 -->
      <template #title>
        <div class="custom-header flex justify-between h-4 flex-items-center">
          <div class="text-5">账单详情</div>
          <a-button type="text" @click="openBillDrawer = false" class="close-btn">
            <template #icon>
              <CloseOutlined class="text-5 close-icon" />
            </template>
          </a-button>
        </div>
      </template>
      <div class="contenter pb20">
        <!-- <div class="h-11 bg-#fff5e6 text-#f90 flex flex-items-center font-400 pl3.5">
          <ExclamationCircleFilled class="font-800 mr1" />
          手动记账中的收银宝相关账单不支持再次编辑内容
        </div> -->
        <div class="h-11 bg-#e6f0ff text-#06f flex flex-items-center font-400 pl3.5">
          <ExclamationCircleOutlined class="font-800 mr1" />
          自动同步的订单不支持进行编辑或删除
        </div>
        <div class="h-36 pt-8 pb-6 flex-center flex-col  border border-b-#eee border-solid border-x-none border-t-none">
          <div class="mb1">
            <svg width="40px" height="40px" viewBox="0 0 40 40" class="icon income">
              <title>切片</title>
              <g id="\u9875\u9762-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="\u8BBE\u7F6E-\u5207\u6362" transform="translate(-576.000000, -160.000000)">
                  <g id="\u7F16\u7EC4-22\u5907\u4EFD-4" transform="translate(539.000000, 152.000000)">
                    <g id="\u7F16\u7EC4-21" transform="translate(28.000000, 8.000000)">
                      <g id="\u7F16\u7EC4-34\u5907\u4EFD-50" transform="translate(9.000000, 0.000000)">
                        <circle id="\u692D\u5706\u5F62" fill="#e6f0ff" cx="20" cy="20" r="20"></circle>
                        <path
                          d="M28,9 C29.6568542,9 31,10.3431458 31,12 L31,12 L31,26 C31,28.7614237 28.7614237,31 26,31 L26,31 L11.5,31 C9.01471863,31 7,28.9852814 7,26.5 L7,26.5 L7,25 C7,23.3431458 8.34314575,22 10,22 L10,22 L14,22 L14,12 C14,10.4023191 15.24892,9.09633912 16.8237272,9.00509269 L17,9 Z M14,24 L10,24 C9.44771525,24 9,24.4477153 9,25 L9,25 L9,26.5 C9,27.8807119 10.1192881,29 11.5,29 L11.5,29 L14,29 L14,24 Z M28,11 L17,11 C16.4477153,11 16,11.4477153 16,12 L16,12 L16,22 L20,22 C21.5976809,22 22.9036609,23.24892 22.9949073,24.8237272 L23,25 L23,26.5 C23,27.8807119 24.1192881,29 25.5,29 L25.5,29 L26,29 C27.5976809,29 28.9036609,27.75108 28.9949073,26.1762728 L28.9949073,26.1762728 L29,26 L29,12 C29,11.4477153 28.5522847,11 28,11 L28,11 Z M20,24 L16,24 L16,29 L21.758,29 C21.3146237,28.3362246 21.0439378,27.5542808 21.004898,26.7118357 L21.004898,26.7118357 L21,26.5 L21,25 C21,24.4477153 20.5522847,24 20,24 L20,24 Z M22,18 C22.5522847,18 23,18.4477153 23,19 C23,19.5128358 22.6139598,19.9355072 22.1166211,19.9932723 L22,20 L19,20 C18.4477153,20 18,19.5522847 18,19 C18,18.4871642 18.3860402,18.0644928 18.8833789,18.0067277 L19,18 L22,18 Z M25.6498204,14 C26.2021052,14 26.6498204,14.4477153 26.6498204,15 C26.6498204,15.5128358 26.2637802,15.9355072 25.7664415,15.9932723 L25.6498204,16 L19,16 C18.4477153,16 18,15.5522847 18,15 C18,14.4871642 18.3860402,14.0644928 18.8833789,14.0067277 L19,14 L25.6498204,14 Z"
                          id="\u5F62\u72B6\u7ED3\u5408" fill="#06f"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="text-8 font-400 text-#222">+10.00</div>
        </div>
        <div class="mt-4 px-6 border border-b-#eee border-solid border-x-none border-t-none pb2">
          <a-descriptions :column="2" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="账单编号">20250413184836423728284</a-descriptions-item>
            <a-descriptions-item label="来源">系统同步</a-descriptions-item>
            <a-descriptions-item label="收款方式">微信</a-descriptions-item>
            <a-descriptions-item label="收款账户">默认账户</a-descriptions-item>
            <a-descriptions-item label="支付单号">-</a-descriptions-item>
            <a-descriptions-item label="关联订单">20250413184833667811567 <span class="text-#06f ml2 cursor-pointer" @click="handleOrderDetail">查看</span> </a-descriptions-item>
            <a-descriptions-item label="对方账户">-</a-descriptions-item>
            <a-descriptions-item label="经办人">龙钊</a-descriptions-item>
            <a-descriptions-item label="一级分类">订单收入</a-descriptions-item>
            <a-descriptions-item label="二级分类">报名续费</a-descriptions-item>
            <a-descriptions-item label="支付日期">2025-04-13</a-descriptions-item>
            <a-descriptions-item label="操作时间">2025-04-13 18:48</a-descriptions-item>
            <a-descriptions-item label="学员信息">妞妞 198****0917</a-descriptions-item>
            <a-descriptions-item label="办理内容">初级感统课</a-descriptions-item>
            <a-descriptions-item label="账单备注">-</a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="mt-4 px-6 border border-b-#eee border-solid border-x-none border-t-none pb2">
          <a-descriptions :column="2" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="确认时间">2025-04-13 20:13:25</a-descriptions-item>
            <a-descriptions-item label="账单状态">已确认</a-descriptions-item>
            <a-descriptions-item label="确认人员">陈瑞</a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="mt-4 px-6 border border-b-#eee border-solid border-x-none border-t-none pb2">
          <a-descriptions :column="1" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="确认备注">-</a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
      <template #footer>
        <div class="h-15 flex flex-center justify-end">
          <a-space :size="14">
            <a-button type="primary" ghost class="h-12 w-35 text-5">下一个</a-button>
          <a-button danger class="h-12 w-35 text-5">取消确认</a-button>
          </a-space>
        </div>
      </template>
    </a-drawer>
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
    <order-detail-drawer v-model:open="openOrderDetailDrawer"></order-detail-drawer>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined, CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons-vue";
const displayArray = ref([
  "intention",
  "followStatus",
  "sex",
  "createPeo",
  "payDate",
  "intentionCourse",
  "reference",
  "studentStatus",
  "classEndingTime",
  "classStopTime",
]);
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
    title: "账单编号",
    dataIndex: "orderNum",
    key: "orderNum",
    fixed: "left",
    width: 250,
    required: true, // 新增必选标识
  },

  {
    title: "记账类型",
    dataIndex: "orderType",
    key: "orderType",
    width: 120,
  },
  {
    title: "收款方式",
    dataIndex: "paymentType",
    key: "paymentType",
    width: 120,
  },
  {
    title: "收款账户",
    dataIndex: "paymentAccount",
    key: "paymentAccount",
    width: 120,
  },
  {
    title: "支付单号",
    dataIndex: "payNum",
    key: "payNum",
    width: 120,
  },
  {
    title: "关联订单",
    dataIndex: "linkOrder",
    key: "linkOrder",
    width: 240,
  },
  {
    title: "对方账户",
    dataIndex: "otherAccont",
    key: "otherAccont",
    width: 120,
  },
  {
    title: "经办人",
    dataIndex: "handleBy",
    key: "handleBy",
    width: 120,
  },
  {
    title: "收支类型",
    dataIndex: "putinType",
    key: "putinType",
    width: 120,
  },
  {
    title: "一级分类",
    dataIndex: "oneLevelClassify",
    key: "oneLevelClassify",
    width: 120,
  },
  {
    title: "二级分类",
    dataIndex: "twoLevelClassify",
    key: "twoLevelClassify",
    width: 120,
  },
  {
    title: "支付日期",
    dataIndex: "payDate",
    key: "payDate",
    width: 120,
  },
  {
    title: "操作时间",
    dataIndex: "createTime",
    key: "createTime",
    width: 160,
  },
  {
    title: "账单备注",
    dataIndex: "remark",
    key: "remark",
    width: 120,
  },
  {
    title: "学员/电话",
    dataIndex: "name",
    key: "name",
    width: 160,
  },
  //   办理内容
  {
    title: "办理内容",
    dataIndex: "handleContent",
    key: "handleContent",
    width: 120,
  },
  {
    title: "确认人员",
    dataIndex: "handlePeo",
    key: "handlePeo",
    width: 120,
  },
  {
    title: "确认时间",
    dataIndex: "handledDate",
    key: "handledDate",
    width: 120,
  },
  {
    title: "确认备注",
    dataIndex: "handledremark",
    key: "handledremark",
    width: 120,
  },
  {
    title: "金额",
    dataIndex: "price",
    key: "price",
    fixed: "right",
    width: 100,
    required: true,
  },
  {
    title: "账单状态",
    dataIndex: "orderStatus",
    key: "orderStatus",
    fixed: "right",
    width: 100,
    required: true,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 160,
    required: true,
  },
]);
const defaultCreateTimeVals = ref(["2025-04-01", "2025-04-13"]);
const openBillDrawer = ref(false)
const handleBillDetail = () => {
  openBillDrawer.value = true
}
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem("system-billing");
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
    localStorage.setItem("system-billing", JSON.stringify(newVal));
  },
  { deep: true }
);
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
const openDrawer = ref(false);
const handleSeeStuData = () => {
  openDrawer.value = true;
};
const openOrderDetailDrawer = ref(false);
const handleOrderDetail = () => {
  openOrderDetailDrawer.value = true;
};
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