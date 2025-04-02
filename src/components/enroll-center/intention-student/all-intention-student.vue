<script setup>
import { ref, watch, computed } from 'vue';
import { DownOutlined, CaretDownOutlined, CaretUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
const activeKey = ref('1');
const activeKey2 = ref('1');
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    phone: 17601241636,
    intentionCourse: '初级言语课、高级感统课、中级认知课',
    channelType: "外部渠道",
    channel: "抖音",
    teacher: "张晨",
    status: "已邀约",
    followed: "2025-03-31 17:09",
    nextTime: "2025-03-31 17:09",
    createTime: "2025-03-31 17:09",
    createPeo: "张晨",
    putType: "否",
    putPeo: "-",
    birthday: "2022-09-23",
    wxchat: "1115009958",
    grade: "一年级",
    school: "上海市第一人民小学",
    address: "上海市杨浦区纪念路8号财大科技园区5号楼102A",
    IDcard1: "CL202209229932",
    IDcard2: "37292520220922883X",
  },
])
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
    title: '意向度',
    key: 'intentionLevel',
    dataIndex: 'addresss',
    width: 100
  },
  {
    title: '意向课程',
    key: 'intentionCourse',
    dataIndex: 'addresss',
    width: 120

  },
  {
    title: '渠道分类',
    dataIndex: 'channelType',
    key: "channelType",
    width: 100
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: "channel",
    width: 100

  },
  {
    title: '销售员',
    dataIndex: 'teacher',
    key: "teacher",
    width: 100

  },
  {
    title: '跟进状态',
    key: 'status',
    dataIndex: 'status',
    width: 120
  },
  {
    title: '最近跟进',
    dataIndex: 'followed',
    key: "followed",

    width: 160
  },
  {
    title: '下次跟进',
    dataIndex: 'nextTime',
    key: "nextTime",
    width: 160
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 160
  },
  {
    title: '创建人',
    key: "createPeo",
    width: 100
  },
  {
    title: '是否被推荐',
    dataIndex: 'putType',
    key: "putType",
    width: 110
  },
  {
    title: '推荐人',
    dataIndex: 'putPeo',
    key: "putPeo",
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
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 220,
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
const savedSelected = localStorage.getItem('selectedColumns');
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
  localStorage.setItem('selectedColumns', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
const displayArray = ref(['intention','followStatus','sex','createPeo','createTime','intentionCourse','reference'])
</script>

<template>
  <div class="tab-content">
    <all-filter :displayArray="displayArray"></all-filter>
    <div class="tab-table">
      <div class="table-title flex justify-between">
        <div class="total">当前共{{ dataSource.length }}名学员</div>
        <div class="edit flex">
          <a-button type="primary" class="mr-2">创建学员</a-button>
          <a-button type="primary" class="mr-2">安排试听</a-button>
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
                <a-menu-item key="4">
                  批量转入公有池
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              批量操作
              <DownOutlined :style="{ fontSize: '10px' }" />
            </a-button>
          </a-dropdown>
          <!-- 自定义字段 -->
          <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length - 2"
            :num="selectedValues.length - 1" />
        </div>
      </div>
      <div class="table-content mt-2">
        <a-table :dataSource="dataSource" :pagination="false" :columns="filteredColumns" :row-selection="rowSelection"
          :scroll="{ x: totalWidth }">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'status'">
              <span class="mr-1">{{ column.title }}</span>
              <a-tooltip color="#666">
                <template #title>跟进状态为手动标记，仅为区分跟进状态，与学员实际系统状态无关</template>
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
            <template v-if="column.key === 'intentionLevel'">
              <div style="cursor: pointer;">
                <a-dropdown :trigger="['click']" v-model:open="visible">
                  <div @click.prevent>
                    <div class="intention">
                      <span class="intentionTag"></span>高
                      <CaretDownOutlined v-if="!visible" class="ml-1 text-#ccc" :style="{ 'font-size': '10px' }" />
                      <CaretUpOutlined v-if="visible" class="ml-1 text-#1677ff" :style="{ 'font-size': '10px' }" />
                    </div>
                  </div>
                  <template #overlay>
                    <a-menu @click="onClickMenu" style="text-align: center;width: 70px;">
                      <a-menu-item key="1">
                        高
                      </a-menu-item>
                      <a-menu-item key="2">
                        中
                      </a-menu-item>
                      <a-menu-item key="3">
                        低
                      </a-menu-item>
                      <a-menu-item key="4">
                        未知
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
            <template v-if="column.key === 'intentionCourse'">
              <clamped-text :text="record.intentionCourse"></clamped-text>
            </template>
            <template v-if="column.key === 'school'">
              <clamped-text :lines="2" :text="record.school"></clamped-text>
            </template>
            <template v-if="column.key === 'channelType'">
              <clamped-text :text="record.channelType"></clamped-text>
            </template>
            <template v-if="column.key === 'channel'">
              <clamped-text :text="record.channel"></clamped-text>
            </template>
            <template v-if="column.key === 'status'">
              <div style="cursor: pointer;">
                <a-dropdown :trigger="['click']" v-model:open="statusvisible">
                  <div @click.prevent>
                    <div class="intention">
                      <span class="statusTag">已邀约</span>
                      <CaretDownOutlined v-if="!statusvisible" class="ml-1 text-#ccc"
                        :style="{ 'font-size': '10px' }" />
                      <CaretUpOutlined v-if="statusvisible" class="ml-1 text-#1677ff"
                        :style="{ 'font-size': '10px' }" />
                    </div>
                  </div>
                  <template #overlay>
                    <a-menu @click="onClickMenu" style="text-align: center;width: 100px;">
                      <a-menu-item key="1">
                        待跟进
                      </a-menu-item>
                      <a-menu-item key="2">
                        跟进中
                      </a-menu-item>
                      <a-menu-item key="3">
                        未接听
                      </a-menu-item>
                      <a-menu-item key="4">
                        已邀约
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
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
                <a class="mr-3">添加跟进</a>
                <a class="mr-3">试听</a>
                <div style="cursor: pointer;">
                  <a-dropdown :trigger="['click']" v-model:open="actionvisible">
                    <a @click.prevent>
                      <div class="intention">更多
                        <CaretDownOutlined v-if="!actionvisible" class="ml-1 text-#1677ff"
                          :style="{ 'font-size': '12px' }" />
                        <CaretUpOutlined v-if="actionvisible" class="ml-1 text-#ccc" :style="{ 'font-size': '12px' }" />
                      </div>
                    </a>
                    <template #overlay>
                      <a-menu @click="onClickMenu" style="text-align: center;width: 100px;">
                        <a-menu-item key="1">
                          报名
                        </a-menu-item>
                        <a-menu-item key="2">
                          分配销售
                        </a-menu-item>
                        <a-menu-item key="3">
                          编辑
                        </a-menu-item>
                        <a-menu-item key="4">
                          删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
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
  margin: 8px 0;

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