<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap bg-white pl-3 pr-3 rounded-lb-4 rounded-rb-4">
      <all-filter
        :defaultCreateTimeVals="defaultCreateTimeVals"
        :displayArray="displayArray"
        :is-quick-show="false"
      ></all-filter>
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
              <customize-code
                v-model:checkedValues="selectedValues"
                :options="columnOptions"
                :total="allColumns.length - 1"
                :num="selectedValues.length - 1"
              />
          </div>
        </div>
        <div class="table-content mt-2">
          <div class="tip">
            收入：¥ 8410， 支出：¥ 100， 结算：¥ 8310， 已确认 0 条， 待确认 15
            条， 退款中 0 条， 退款失败 0 条
          </div>
          <a-table
            :dataSource="dataSource"
            :pagination="dataSource.length > 10"
            :columns="filteredColumns"
            :scroll="{ x: totalWidth }"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'orderNum'">
                <a-tooltip>
                  <template #title>查看账单详情</template>
                  <a class="text-#06f cursor-pointer"
                    >20250413184836423728284</a
                  >
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
                  <a
                    class="text-#06f cursor-pointer"
                    @click="handleOrderDetail()"
                    >20250413184833667811567</a
                  >
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
                  <div
                    class="flex cursor-pointer flex-items-center"
                    @click="handleSeeStuData()"
                  >
                    <img
                      width="36"
                      height="36"
                      class="mr-1"
                      style="border-radius: 100%"
                      src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                      alt=""
                    />
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
                <span
                  class="bg-#fff5e6 text-#f90 text-3 px3 py1 rounded-3 font-500"
                  >待确认</span
                >
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
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
    <order-detail-drawer
      v-model:open="openOrderDetailDrawer"
    ></order-detail-drawer>
  </div>
</template>
  
  <script setup>
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
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
    width: 120,
    required: true,
  },
  {
    title: "账单状态",
    dataIndex: "orderStatus",
    key: "orderStatus",
    fixed: "right",
    width: 120,
    required: true,
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 200,
    required: true,
  },
]);
const defaultCreateTimeVals = ref(["2025-04-01", "2025-04-13"]);

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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAsCAYAAADLlo5MAAAAAXNSR0IArs4c6QAABjtJREFUaEPtm3lo1EcUxz+zRrwtgmiNf4hBvEFkd0m8Fa1XbdGWBlERFVsFj1ovPEGsfxk86omK4IEiFg/EQkHFekATknjfSETQKKKoVfFKdsrbybq7yR6//e3+4prkwWJI3nsz8913z6hIgrTWipycbHy+b/H5slAqE8hEa/m3aRKqUyeq1CvgEVCK1qW4XCW4XH+Rn1+glNJ2F1J2BLXXOwStfwK+R+uv7ej47DJKPQaOodSfqrDwZKL7SQg4nZ2dQ1nZaqBfogulOf85MjIWqoKCfKv7tASc9nqz0DoPrX+wqviL5FPqMEotUIWFJfH2Hxc4v1v6fAeBFvGU1ZC/P8flyo3nvjGB0273LJRah9b1aggo1o6hVDla/6aKizdGE4gKnHa71wO/WlupxnL9oYqL50Q6XUTg/JYGG2osHIkdbHYky6sCXEWp8Xetc8+oPqnKUWp45ZgXBpw/e/p8RbUoEVi1PUkYntBsGw6cx3OoxpccVqGqzKfUYVVU9GPg15+Aqyhu/7Wrt1bIZWT0ChTJQeDc7nNA35QC0KULTJliVC5dCh8+2FffsiUsXgxZWbBsGVy/bl2XywXdukH9+nDhgnW5qpznVXGxv2vyA1dR5J5IRmNE2X79YN068yf5+e3b5JbYvBmys+H4cVixoqqujAwQgAOfVq2gZ08j07w5PH8Oo0fDmzf29+FyfSOJwgDndm8HfravLYpkssBNngwDBgSVt2gBbdvCx49w+3b4otu2QY8eMHVq5M1obWTWrIGLF+0fVantqqhomvKPhrxeGbmkfsqRLHDikmIhVmj5cmjXzgAnFnXzJpSWms+9e1BUBC9fWtEUm0emKoWFmcrRpJAscJ07Q2YmNG1qYtuVK8FDNWgAbjcUFEB5Ody4YUAW4M6ehblzkwcpmgZJEtrr/R2fb5kjqyQLnGyqQwfYtQvevYPhw6GszGxVXFjc7u5dGDvW/G769OoBzuVapbTbvQ8Yl7bAycYOHjQWN2cOnD9vtirJYdQoA+qmTdULHOxX2uM5jdYDHQduy5bY5YiUKgJQKPXqBU2aQP/+MHIk5OfD0aOGQ8qbZs1gwwYTx0pKYOhQY3Hi0lu3Rj/SpUsmwdglpf4R4G6jdUe7OmLKhbpqvAUkcA8eHM516JAJ+FZoxw5QKnpWDdUhX8KTJ1a0RuZR6o64qlxmOHOxEgqcfMsSxKORZMLKAX3lSmjdOijRuDFIUS1UWZ/UdlKqiMWJNQVqNUkijRqZtV/JUTEx8elT+8DBa7G4/9C6WTJaosqmIjmEKu/UCfZJSAYGDoTXr8OXjpQccnNh4UK4dQsmTEjZMavPVe10Dg0bGmsJkGTYQOwaMyYcuBcvYNq0qlnVQeCqJznYAW7iRJg925qVDBsG48eDyJw8CYsWGTnHgEvnckRca8aMIHAS/KUfFZJ6TtqoAElpsmABDBkCu3fDxorrAseAS/cCOF6Mk+D//r3h2rMHunaFVauCZYtjwJlLZmfmcKlIDu3bw9q1JoseOBBMDpIIpD+9fz/ozqdOwVdfmQ5CelNHXTWdm3w5+KRJMHOmKX7F/QJZVWqxI0egXj0YMcIU12fOGLDEbR/LCwcHY5zo1h7PNrT+xVoUToArFRYnLVX37rB6NVy+HF6OSNslZUlengFKelcBsE+fYPxzylX9wJnb+vQbZEqxu3dv0IrEDUPruL59TTy7ds0MATweY3Xz5gW/XSeB84Pndp9N+DGNVODSfEejNm1A+k2hY8eCk41YRvvwocmKQuvXg4Ajjb00+JULYMmqs2bBnTuwZImRkc5B4mGAHAfOTpKQqUROTgK+a4FVGnS5p5Bpr4AtBbCAIe4qHyk3JIsOGhQcGsyfb9qoq1dBpsah5DRwFbEusevBceNiW5wFnKqwPHhgRkVCYrHSIchkZf9+6FgxizhxwlzcBEj62Z07TYw7ffozAJfOF9IyxJSJsCQIybCVL35kUvzoUXhRLBBKXde7Nzx7ZrJwiqjuCYRNIOse3aQSOH+8q3vmFRPSuoeFqba4gL5a+JTVEpRx3wD73ba2PJ62BJlhsgTcJ+szRXJeyh/nJLDhdGFNCLhK7puLUt858nQiXdCJsQ9bwH0C8Ev4L0kOfQn/A6jssToWH7guAAAAAElFTkSuQmCC);
    background-size: contain;
    content: "";
  }
}
</style>