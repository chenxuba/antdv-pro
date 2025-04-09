<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap mt-2 bg-white  pl-3 pr-3 rounded-4">
      <all-filter :defaultStudentStatus="defaultStudentStatus" :displayArray="displayArray" :is-quick-show="false" :isShowSearchStuPhone="true"></all-filter>
    </div>
    <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">当前共{{ dataSource.length }}名学员</div>
          <div class="edit flex">
            <a-button class="mr-2">群发短信</a-button>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    批量分配销售
                  </a-menu-item>
                  <a-menu-item key="2">
                    批量编辑学员
                  </a-menu-item>
                  <a-menu-item key="3">
                    批量删除学员
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                批量操作
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    导入意向学员
                  </a-menu-item>
                  <a-menu-item key="2">
                    批量导出
                  </a-menu-item>
                  <a-menu-item key="3">
                    导出记录
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                导出/导入学员
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length"
              :num="selectedValues.length" />
          </div>
        </div>
        <div class="table-content mt-2">
          <div class="tip">家校微信关注数为 1，关注率 33.33%，已超过 10.09% 机构。引导家长关注家校平台，发送学员成果，提升续费率！ <a>点击下载家校物料（易拉宝、台卡等）</a> </div>
          <a-table :dataSource="dataSource" :pagination="dataSource.length>10" :columns="filteredColumns" :row-selection="rowSelection"
            :scroll="{ x: totalWidth }">
            <template #headerCell="{ column }">
              <template v-if="column.key === 'studentStatus'">
                <span class="mr-1">{{ column.title }}</span>
                <a-tooltip color="#666">
                  <template #title>在读学员：当前报读课程有一门或多门课程有剩余课时/天数/金额的学员。
                    历史学员：报读课程中全部课程都已结课的学员。</template>
                  <ExclamationCircleOutlined />
                </a-tooltip>
              </template>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <div class="flex">
                  <img width="40" height="40" class="mr-2" style="border-radius: 100%;"
                    src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                    alt="">
                  <div class="name mt-1">
                    <div class="text-#222">龙龙</div>
                    <div class="text-3 text-#888 flex flex-items-center">男 <span class="inline-block w-0.2 h-2.5 bg-#ccc ml-1.5 mr-1.5"></span> 1个月</div>
                  </div>
                </div>
              </template>
              <template v-if="column.key === 'phone'">
                <div class="name">
                  <div class="text-#222">爸爸</div>
                  <div class="text-3 text-#666">176****1636</div>
                </div>
              </template>
              <template v-if="column.key === 'cloud'">
                <a-tooltip placement="right">
                  <template #title>
                    <span>点击邀请关注</span>
                  </template>
                  <div class="flex flex-items-center cursor-pointer">
                    <span class="whitespace-nowrap text-#ccc">
                      未关注
                    </span>
                    <svg width="16px" height="16px" class="ml-2" viewBox="0 0 16 16">
                      <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-474.000000, -608.000000)"
                          fill="#CCCCCC">
                          <g id="Rectangle-2\u5907\u4EFD-89" transform="translate(398.000000, 580.000000)">
                            <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                              <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                                <path
                                  d="M12.5488957,14.2844713 L11.5010486,14.2844713 C11.1341596,14.280754 10.8398076,13.9883197 10.843536,13.6312425 C10.8398076,13.2741654 11.1341596,12.9817311 11.5010486,12.9780138 L12.5488957,12.9780138 C13.1929132,12.9707828 13.7094253,12.457622 13.7035882,11.8308133 L13.7035882,5.51659915 C13.7049584,5.07149643 13.4426881,4.66546656 13.0299588,4.47372986 L8.49973266,2.41098807 C8.19497588,2.2717625 7.84236314,2.2717625 7.53760636,2.41098807 L3.00725203,4.47372986 C2.59455747,4.66549483 2.33231941,5.07151473 2.33368895,5.51659915 L2.33368895,8.11331051 C2.33741739,8.47038769 2.04306536,8.76282195 1.67617635,8.76653928 C1.30928733,8.76282195 1.0149353,8.47038769 1.01862871,8.11331051 L1.01862871,5.51659915 C1.01573797,4.56462047 1.57664141,3.69619985 2.4593492,3.28605311 L6.98970297,1.22331132 C7.64157303,0.925562892 8.39577156,0.925562892 9.04764162,1.22331132 L13.5778672,3.28605311 C14.460609,3.69617215 15.0215439,4.56460257 15.0186287,5.51659915 L15.0186287,11.8308133 C15.0186287,13.1837748 13.9107309,14.2844713 12.5488957,14.2844713 Z"
                                  id="\u8DEF\u5F84"></path>
                                <path
                                  d="M1.56733162,10.2194036 C1.40127346,10.2195233 1.23544109,10.2313173 1.07112909,10.2546935 C1.02383678,10.4730961 1,10.6956916 1,10.9188916 C1,11.7700045 1.34739282,12.5862583 1.96575882,13.1880863 C2.58412481,13.7899143 3.42280952,14.1280178 4.29731162,14.1280178 C4.51607755,14.1280178 4.73430678,14.1069519 4.94880175,14.0650857 C4.97598308,13.8947261 4.98963678,13.7225811 4.98963678,13.5501797 C4.98963678,12.666803 4.6290758,11.8196066 3.98726883,11.1949647 C3.34546185,10.5703228 2.4749842,10.2194036 1.56733162,10.2194036 Z"
                                  id="\u8DEF\u5F84"></path>
                                <path
                                  d="M4.04965057,14.1112242 C4.36580361,14.1624804 4.68574686,14.1883875 5.00625618,14.1886844 C6.55014367,14.1886844 8.03079835,13.5917848 9.12249298,12.529291 C10.2141876,11.4667972 10.8274979,10.0257453 10.8274979,8.5231503 C10.8271446,8.25723104 10.8076999,7.99166078 10.7693057,7.72837983 C10.4531526,7.67712408 10.1332094,7.65121719 9.81270009,7.65092023 C8.26881275,7.65092023 6.78815822,8.24781981 5.69646369,9.3103135 C4.60476916,10.3728072 3.99145897,11.813859 3.99145897,13.3164538 C3.99181199,13.582373 4.01125654,13.8479433 4.04965057,14.1112242 Z"
                                  id="\u8DEF\u5F84"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'face'">
                <a-tooltip placement="right">
                  <template #title>
                    <span>点击采集人脸</span>
                  </template>
                  <div class="flex flex-items-center cursor-pointer">
                    <span class="whitespace-nowrap text-#ccc">
                      未采集
                    </span>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" class="ml-2">
                      <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-594.000000, -608.000000)">
                          <g id="\u7F16\u7EC4-11" transform="translate(518.000000, 310.000000)">
                            <g id="Rectangle-2\u5907\u4EFD-88" transform="translate(0.000000, 270.000000)">
                              <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                                <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                                  <polygon id="\u77E9\u5F62" fill="#000000" fill-rule="nonzero" opacity="0"
                                    points="0 0 16 0 16 16 8 16 0 16"></polygon>
                                  <path
                                    d="M1.49983336,11 C1.74529324,10.9999182 1.94950067,11.1767253 1.99191437,11.4099604 L2,11.4998334 L2,14 L4.5,14 C4.74545992,14 4.9496084,14.1768752 4.99194436,14.4101244 L5,14.5 C5,14.7454599 4.82312487,14.9496084 4.58987566,14.9919444 L4.5,15 L1.50100003,15 C1.25559799,15 1.05147725,14.8232051 1.00908211,14.5900195 L1.00100006,14.5001667 L1,11.5001667 C0.999908009,11.2240243 1.223691,11.0000921 1.49983336,11 Z M14.4988336,11 C14.7442935,10.9999183 14.9485009,11.1767254 14.9909146,11.4099605 L14.9990002,11.4998334 L15,14.4998334 C15.0000818,14.7453511 14.8231944,14.9495863 14.5898958,14.9919408 L14.5,15 L11.5,15 C11.2238576,15 11,14.7761424 11,14.5 C11,14.2545401 11.1768752,14.0503917 11.4101244,14.0080557 L11.5,14 L14,14 L13.9990003,11.5001667 C13.9989185,11.2547068 14.1757256,11.0504994 14.4089607,11.0080857 L14.4988336,11 Z M4.5,9 L11.5,9 L11.4931641,9.38828125 L11.4931641,9.38828125 L11.4769287,9.60498047 L11.4769287,9.60498047 L11.4453125,9.83125 C11.28125,10.75 10.625,11.8 8,11.8 C5.484375,11.8 4.77685547,10.8356771 4.5778656,9.94669189 L4.53663635,9.71717529 C4.53140259,9.67943522 4.5269165,9.64200846 4.52307129,9.60498047 L4.50683594,9.38828125 L4.50683594,9.38828125 L4.5,9 Z M11,5.5 C11.5522847,5.5 12,5.94771525 12,6.5 C12,7.05228475 11.5522847,7.5 11,7.5 C10.4477153,7.5 10,7.05228475 10,6.5 C10,5.94771525 10.4477153,5.5 11,5.5 Z M5,5.5 C5.55228475,5.5 6,5.94771525 6,6.5 C6,7.05228475 5.55228475,7.5 5,7.5 C4.44771525,7.5 4,7.05228475 4,6.5 C4,5.94771525 4.44771525,5.5 5,5.5 Z M14.5,1 C14.7455177,1 14.9496939,1.17695541 14.9919707,1.41026814 L15,1.50016663 L14.9990002,4.50016663 C14.9989082,4.77630898 14.774976,5.000092 14.4988336,5 C14.2533737,4.99991817 14.0492842,4.82297499 14.007026,4.58971169 L13.9990003,4.49983337 L14,2 L11.5,2 C11.2545401,2 11.0503916,1.82312484 11.0080557,1.58987563 L11,1.5 C11,1.25454011 11.1768752,1.05039163 11.4101244,1.00805567 L11.5,1 L14.5,1 Z M4.5,1 C4.77614235,1 5,1.22385763 5,1.5 C5,1.74545989 4.82312481,1.94960837 4.5898756,1.99194433 L4.5,2 L2,2 L2,4.50016667 C1.99991812,4.74562654 1.82297492,4.94971605 1.58971162,4.99197426 L1.49983331,5 C1.25437343,4.99991815 1.05028392,4.82297495 1.00802571,4.58971165 L1,4.49983333 L1.001,1.49983333 C1.0010818,1.25443131 1.17794474,1.05036951 1.41114451,1.0080521 L1.50099997,1 L4.5,1 Z"
                                    id="\u5F62\u72B6" fill="#CCCCCC"></path>
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
              <template v-if="column.key === 'studentStatus'">
                <div class="flex flex-items-center studentStatus">
                  <span class="dot"></span>
                  <span>在读学员</span>
                </div>
              </template>
              <template v-if="column.key === 'createUser'">
                陈瑞生{{ record.createUser }}
              </template>
              <template v-if="column.key === 'createTime'">2024-12-12 12:23</template>
              <template v-if="column.key === 'firstEenrollmentTime'">2025-03-12 11:23</template>
              <template v-if="column.key === 'channel'">线上渠道</template>
              <template v-if="column.key === 'birthday'">2020-12-12</template>
              <template v-if="column.key === 'wechatNumber'">
                <clamped-text :lines="1" text="1115009958"></clamped-text>
              </template>
              <template v-if="column.key === 'grade'">
                <clamped-text :lines="1" text="一年级"></clamped-text>
              </template>
              <template v-if="column.key === 'school'">
                <clamped-text :lines="2" text="上海市第一人民小学真北路校区"></clamped-text>
              </template>
              <template v-if="column.key === 'address'">
                <clamped-text :lines="2" text="上海市杨浦区纪念路8号财大科技园区5号楼102A"></clamped-text>
              </template>
              <template v-if="column.key === 'disableID'">
                <clamped-text :lines="2" text="CJ202209092236223"></clamped-text>
              </template>
              <template v-if="column.key === 'IDCard'">
                <clamped-text :lines="2" text="372925199311156719"></clamped-text>
              </template>
              <template v-if="column.key === 'sale'">张晨</template>
              <template v-if="column.key === 'newFollow'">
                2025-04-08 12:33
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
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference','studentStatus'])
const dataSource = ref([{},{}])
const allColumns = ref([
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
    width: 100

  },
  {
    title: '学员状态',
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 110
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
    width: 160

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
    width: 110
  },
  {
    title: '微信号',
    dataIndex: 'wechatNumber',
    key: "wechatNumber",
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
    key: "school",
    width: 140
  },
  {
    title: '家庭地址',
    dataIndex: 'address',
    key: "address",
    width: 140
  },
  {
    title: '残疾证号',
    dataIndex: 'disableID',
    key: "disableID",
    width: 140
  },
  {
    title: '身份证号',
    dataIndex: 'IDCard',
    key: "IDCard",
    width: 140
  },
  {
    title: '销售',
    key: "sale",
    dataIndex: 'sale',
    width: 100,
  },
  {
    title: '最新跟进',
    dataIndex: 'newFollow',
    key: 'newFollow',
    fixed: 'right',
    width: 160,
    required: true
  },
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const defaultStudentStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('studyingOrHistoryColumns');
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
  localStorage.setItem('studyingOrHistoryColumns', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
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

.tip{
  padding: 10px 24px 10px 14px;
  background: #e6f0ff;
  color: #333;
  a{
    color: var(--pro-ant-color-primary);
  }
}
</style>