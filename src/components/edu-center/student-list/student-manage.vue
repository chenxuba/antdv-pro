<template>
  <div class="home">
    <!-- 快捷入口 -->
    <div class="kuaiRun">
      <custom-title title="快捷入口" fontSize="14px" fontWeight="500"></custom-title>
      <div class="items-list mt-4">
        <div class="items one ">
          <div class="items-t">
            <span class="text-3.5 text-#222 font-600">学员总数 4</span>
            <span class="text-3 text-#0066ff"> <i class="bg-#e6f0ff font-500">近1个月新增涨幅 -</i> <img class="ml--3"
                src="https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/go-up.5c9cb6eb.svg"
                alt=""></span>
          </div>
          <div class="items-b text-3.25 text-#888 mt-2">
            当前机构（在读+意向+历史）学员数量
          </div>
        </div>
        <div class="items" :class="{ 'selected-item': item.selected }" @click="handleSelect(item)"
          v-for="(item, index) in itemsList" :key="index">
          <div class="items-l">
            <img :src="item.icon" alt="">
          </div>
          <div class="items-r">
            <div class="text-#222">{{ item.name }}</div>
            <div class="text-#000 font-600 text-4 mt-1.5">{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 学员列表 -->
    <studying-or-history v-if="currentType == 1 || currentType == 2"></studying-or-history>
    <pending-fees v-if="currentType == 4"></pending-fees>
    <owe-price v-if="currentType == 5"></owe-price>
    <wait-class v-if="currentType == 6"></wait-class>
    <birthday-student v-if="currentType==7"></birthday-student>
    <wait-focus v-if="currentType==8"></wait-focus>
    <miss-school v-if="currentType==9"></miss-school>
  </div>
</template>

<script setup>
const router = useRouter()
const currentType = ref(1)
const itemsList = ref([
  { type: 1, selected: true, name: "在读学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/reading-icon.a7ae1ed0.svg" },
  { type: 2, selected: false, name: "历史学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/history-icon.f39cedb5.svg" },
  { type: 3, selected: false, name: "意向学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/intention-icon.d6515e60.svg" },
  { type: 4, selected: false, name: "待续费学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/renew-icon.50f2cafa.svg" },
  { type: 5, selected: false, name: "欠费学员", num: 1, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/arrears-icon.6f028695.svg" },
  { type: 6, selected: false, name: "待分班学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/streaming-icon.703400f2.svg" },
  { type: 7, selected: false, name: "生日学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/birthday-icon.7ec2c5c7.svg" },
  { type: 8, selected: false, name: "待关注学员", num: 1, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/follow-icon.4393714e.svg" },
  { type: 9, selected: false, name: "缺课学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/absentee-icon.5c1240ed.svg" },
].map(item => ({
  ...item,
  selected: item.type === 1  // 使用 map 自动设置选中状态
})))
const handleSelect = (selectedItem) => {
  if (selectedItem.type == 3) {
    router.replace({
      path: '/enroll-center/intention-student',
    })
    return
  }
  currentType.value = selectedItem.type
  itemsList.value = itemsList.value.map(item => ({
    ...item,
    selected: item.type === selectedItem.type
  }));
}
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
const allColumns = ref([])
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
// 在读学员/历史学院表单字段
const studyingOrHistoryColumns = ref([
  {
    title: '学员/性别/年龄',
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
    title: '家校云',
    key: 'cloud',
    dataIndex: 'cloud',
    width: 100
  },
  {
    title: '人脸采集',
    key: 'face',
    dataIndex: 'face',
    width: 120

  },
  {
    title: '学员状态',
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    key: "createUser",
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 160
  },
  {
    title: '首次报读时间',
    dataIndex: 'firstEenrollmentTime',
    key: "firstEenrollmentTime",
    width: 100

  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: "channel",
    width: 100

  },
  {
    title: '生日',
    key: 'birthday',
    dataIndex: 'birthday',
    width: 120
  },
  {
    title: '微信号',
    dataIndex: 'wechatNumber',
    key: "wechatNumber",
    width: 160
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: "grade",
    width: 160
  },
  {
    title: '就读学校',
    dataIndex: 'school',
    key: "school",
    width: 100
  },
  {
    title: '家庭地址',
    dataIndex: 'address',
    key: "putType",
    width: 110
  },
  {
    title: '残疾证号',
    dataIndex: 'disableID',
    key: "disableID",
    width: 100
  },
  {
    title: '身份证号',
    dataIndex: 'IDCard',
    key: "IDCard",
    width: 100
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    key: "birthday",
    width: 120
  },
  {
    title: '微信号',
    dataIndex: 'wxchat',
    key: "wxchat",
    width: 120
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: "grade",
    width: 100
  },
  {
    title: '就读学校',
    dataIndex: 'school',
    key: 'school',
    width: 120,
  },
  {
    title: '家庭地址',
    key: "address",
    dataIndex: 'address',
    width: 150,
  },
  {
    title: '残疾证号',
    key: "IDcard1",
    dataIndex: 'IDcard1',
    width: 160,
  },
  {
    title: '身份证号',
    key: "IDcard2",
    dataIndex: 'IDcard2',
    width: 190,
  },
  {
    title: '销售',
    key: "sale",
    dataIndex: 'sale',
    width: 190,
  },
  {
    title: '最新跟进',
    dataIndex: 'sale',
    key: 'newFollow',
    fixed: 'right',
    width: 220,
    required: true
  },
])
// 待续费学员
const pendingFeesColumns = ref([
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
    title: '当前状态',
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 100
  },
  {
    title: '在读课程',
    dataIndex: 'readingCcourses',
    key: "readingCcourses",
    width: 100
  },
  {
    title: '班主任',
    dataIndex: 'headTeacher',
    key: "headTeacher",
    width: 160
  },
  {
    title: '剩余数量',
    dataIndex: 'remainingNum',
    key: "remainingNum",
    width: 100

  },
  {
    title: '到期时间',
    dataIndex: 'expireTime',
    key: "expireTime",
    width: 100
  },
])
// 欠费学员
const owePriceColumns = ref([
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
    title: '欠费金额',
    dataIndex: 'owePrice',
    key: "owePrice",
    width: 100
  },
  {
    title: '订单总金额',
    dataIndex: 'orderTotalPrice',
    key: "orderTotalPrice",
    width: 100
  },
  {
    title: '已支付金额',
    dataIndex: 'payPrice',
    key: "payPrice",
    width: 160
  },
  {
    title: '原订单号',
    dataIndex: 'originalOrderNum',
    key: "originalOrderNum",
    width: 100

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    width: 220,
    required: true
  },
])
// 待分班学员
const waitClassColumns = ref([
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
    title: '课程名称',
    dataIndex: 'courseName',
    key: "courseName",
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    width: 220,
    required: true
  },
])
// 生日学员
const birthdayColumns = ref([
  {
    title: '学员/性别/年龄',
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
    title: '当前状态',
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 100
  },
  {
    title: '家校云',
    key: 'cloud',
    dataIndex: 'cloud',
    width: 100
  },
])
// 待关注学员
const waitFocusColumns = ref([
  {
    title: '学员/性别/年龄',
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
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 100
  },
  {
    title: '生日日期',
    dataIndex: 'birthday',
    key: "birthday",
    width: 120
  },
])
// 缺课学员
const missSchoolColumns = ref([
  {
    title: '学员/电话',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 160,
    required: true // 新增必选标识
  },
  {
    title: '未记录次数',
    dataIndex: 'notRecordedNumber',
    width: 120,
    key: 'notRecordedNumber',
  },
  {
    title: '旷课次数',
    dataIndex: 'truancyNumber',
    key: "truancyNumber",
    width: 100
  },
  {
    title: '请假次数',
    dataIndex: 'leaveNumber',
    key: "leaveNumber",
    width: 120
  },
  {
    title: '距离上次上课天数',
    dataIndex: 'daysSinceLastClass',
    key: "daysSinceLastClass",
    width: 120
  },
  {
    title: '提醒标记',
    dataIndex: 'reminderMark',
    key: "reminderMark",
    width: 120
  },
  {
    title: '上次提醒时间',
    dataIndex: 'lastReminderTime',
    key: "lastReminderTime",
    width: 120
  },
])
</script>

<style lang="less" scoped>
.home {
  .kuaiRun {
    padding: 12px 24px;
    background: #fff;
    border-radius: 0 0 16px 16px;

    .items-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .items {
        height: 80px;
        border-radius: 14px;
        background: #fbfcff;
        cursor: pointer;
        margin-right: 8px;
        margin-bottom: 8px;
        width: 165px;
        padding: 16px 8px;
        display: flex;

        &:hover {
          background: #e6f0ff;
        }

        i {
          font-style: normal;
          font-weight: bold;
          background: #e6f0ff;
          padding: 3px 8px;
          border-radius: 12px;
        }

        img {
          width: 30px;
          margin-right: 5px;
        }
      }

      /* 添加选中状态样式 */
      .selected-item {
        background: #e6f0ff;
      }

      .items.one {
        width: 338px;
        padding: 16px 24px;
        flex-direction: column;

        .items-t {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 14px;
          }
        }
      }
    }
  }

  // .student-list{

  // }
}
</style>