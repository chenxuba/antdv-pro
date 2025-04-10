<script setup>
import { ref, nextTick, toRaw, onBeforeUnmount } from 'vue';
import { DeleteOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { debounce } from 'lodash-es';
// 配置参数
const DEBOUNCE_TIME = 500; // 防抖时间（毫秒）
// 实时响应的中间值（用于v-model绑定）
const inputValue = ref('');
// 创建防抖函数（确保单例）
const triggerDebounce = debounce((value) => {
  searchInputKey.value = value;
  console.log('执行防抖后的操作:', value); // 替换为实际业务逻辑
}, DEBOUNCE_TIME);

// 监听输入框变化
watch(inputValue, (newVal) => {
  triggerDebounce(newVal);
});

// 组件卸载时清理
onBeforeUnmount(() => {
  triggerDebounce.cancel(); // 清除未执行的防抖任务
});
const props = defineProps({
  defaultStudentStatus: {
    type: Number,
    default: null
  },
  defaultOrNotFenClass: {
    type: Array,
    default: () => { return [] }
  },
  defaultCurrentStatus: {
    type: Array,
    default: () => { return [] }
  },
  defaultOpenClassStatus: {
    type: Number,
    default: null
  },
  type: {
    type: String,
    default: 'all'
  },
  isQuickShow: {
    type: Boolean,
    default: false
  },
  isQuickOneToOneShow: {
    type: Boolean,
    default: false
  },
  displayArray: {
    type: Array,
    default: () => { return [] }
  },
  isShowSearchStuPhone: {
    type: Boolean,
    default: false
  },
  isShowSearchStuPhonefilter: {
    type: Boolean,
    default: false
  },
  isShowOneToOne: {
    type: Boolean,
    default: false
  },
  isShowSearchInput: {
    type: Boolean,
    default: false
  },
  isShowClsssSearch: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String,
    default: '请输入关键字'
  },
  searchLabel: {
    type: String,
    default: '搜索纬度'
  },
});
const getNameById = (id) => {
  const search = (nodes) => {
    for (const node of nodes) {
      if (node.id === id) return node.name;
      if (node.children) {
        const result = search(node.children);
        if (result) return result;
      }
    }
    return null;
  };
  return search(dptListOptions.value);
};

const dptName = ref('')
const searchKeyOneToOne = ref(undefined) //一对一搜索框的值
const searchKeyStuPhone = ref(undefined) //学员/电话搜索的值
const searchInputKey = ref(undefined)
const selectInputKey = ref(undefined)
const childRefs = ref({});// 存储子组件实例（按 category 分类）
// 动态收集/清理子组件实例
const handleRef = (el, category) => {
  if (el) {
    childRefs.value[category] = el; // 组件挂载时存储实例
  } else {
    delete childRefs.value[category]; // 组件卸载时删除实例
  }
};
const lastUpdated = reactive({});
const conditionOrder = ref([]); // 存储条件类型的添加顺序
// 班级选项
const classOptions = ref([
  {
    id: 1,
    value: '香蕉班',
  },
  {
    id: 2,
    value: '葡萄班',
  },
  {
    id: 3,
    value: '苹果班',
  },
]);
// 意向度选项
const customOptions = ref([
  { id: 1, value: "高" },
  { id: 2, value: "中" },
  { id: 3, value: "低" },
  { id: 4, value: "未知" }
]);
const selectedValues = ref([]);

// 跟进状态选项
const followStatusOptions = ref([
  { id: 1, value: "待跟进" },
  { id: 2, value: "跟进中" },
  { id: 3, value: "未接听" },
  { id: 4, value: "已邀约" }
]);
const followStatusVals = ref([]);

// 性别选项
const sexOptions = ref([
  { id: 1, value: "男" },
  { id: 2, value: "女" },
  { id: 3, value: "未知" }
]);
const sexVals = ref([]);

// 创建人选项
const createPeoOptions = ref([
  { id: 1, value: "陈瑞生", phone: '17601241636' },
  { id: 2, value: "张晨", phone: '17662072520' },
  { id: 3, value: "陈旭", phone: '15864646629' },
])
const createPeoVals = ref(null);

// 创建时间选项
const createTimeVals = ref([])

// 结课日期选项
const classEndingTimeVals = ref([])
// 停课日期选项
const classStopTimeVals = ref([])

// 课程列表选项
const courseListOptions = ref([
  { id: 1, value: "初级感统课" },
  { id: 2, value: "初级言语课" },
  { id: 3, value: "交互认知课" },
  { id: 4, value: "高级认知课" },
  { id: 5, value: "高级游戏课" },
])
const selectCourseValues = ref(null);

// 推荐人选项
const oneToOneOptions = ref([
  { id: 1, name: "张学良", course: "作业OT训练" },
  { id: 2, name: "高保庆", course: "交互训练" },
])
const stuListOptions = ref([
  { id: 1, name: "张学良", phone: "17601241636" },
  { id: 2, name: "高保庆", phone: "18882327343" },
  { id: 3, name: "谢霆锋", phone: "16723338886" },
  { id: 4, name: "张飞", phone: "17662372329" },
  { id: 5, name: "武松", phone: "19187235172" },
  { id: 6, name: "杜十娘", phone: "15422127865" }
])
const selectStuVals = ref(null)

// 部门列表选项
const dptListOptions = ref([
  { id: 1, name: "总校区", children: [{ id: 2, name: "教研部" }, { id: 3, name: "销售部" }, { id: 4, name: "市场部" }, { id: 5, name: "商务部" }] }
])
const selectDptVals = ref(2)

// 渠道状态列表选项
const channelListOptions = ref([
  { id: 1, value: "启用" },
  { id: 2, value: "未启用" }
])
const selectChannelVals = ref([])

// 渠道类型列表选项
const channelTypeOptions = ref([
  { id: 1, value: "自定义" },
  { id: 2, value: "系统默认" },
])
const selectChannelTypeVals = ref([])

// 渠道分类列表选项
const channelCategoryOptions = ref([
  { id: 1, value: "无分类" },
  { id: 2, value: "线上渠道" },
  { id: 3, value: "线下渠道" },
  { id: 4, value: "抖音/快手" },
])
const selectChannelCategoryVals = ref([])

// 科目列表选项
const subjectOptions = ref([
  { id: 1, value: "残联" },
  { id: 2, value: "自费" },
  { id: 3, value: "民生" },
])
const selectSubjectVals = ref(null)

// 课程类别列表选项
const courseCategoryOptions = ref([
  { id: 1, value: "线上课程" },
  { id: 2, value: "线下工作坊" },
  { id: 3, value: "认证培训" },
])
const selectCourseCategoryVals = ref(null)

// 学员状态选项
const studentStatusOptions = ref([
  { id: 1, value: "在读学员" },
  { id: 2, value: "历史学员" }
])
const selectStudentStatusVals = ref(null)

// 当前状态选项
const currentStatusOptions = ref([
  { id: 1, value: "已停课" },
  { id: 2, value: "已结课" },
  { id: 3, value: "正常" },
])
const selectCurrentStatusVals = ref([])

// 是否分班
const orNotFenClassOptions = ref([
  { id: 0, value: "未分班" },
  { id: 1, value: "已分班" },
])
const selectOrNotFenClassVals = ref([])

// 计费模式选项
const billingModeOptions = ref([
  { id: 0, value: "按金额" },
  { id: 1, value: "按课时" },
  { id: 2, value: "按时段" },
])
const selectBillingModeVals = ref([])

// 是否设置有效期
const isSetExpirationDateOptions = ref([
  { id: 1, value: "已设置有效期" },
  { id: 2, value: "未设置有效期" },
])
const selectIsSetExpirationDateVals = ref(null)

// 开班状态选项
const openClassStatusOptions = ref([
  { id: 1, value: "开班中" },
  { id: 2, value: "未开班" },
])
const selectOpenClassStatusVals = ref(null)

// 是否排课选项
const doYouScheduleOptions = ref([
  { id: 1, value: "已排课" },
  { id: 2, value: "未排课" },
])
const selectDoYouScheduleVals = ref(null)

// 快捷筛选选项（单选）
const quickFilters = ref([
  { id: 1, name: "今日待跟进", count: 1, selected: false },
  { id: 2, name: "本周新增", count: 0, selected: false },
  { id: 3, name: "逾期未回访", count: 0, selected: false }
]);
const quickOneToOneFilters = ref([
  { id: 1, name: "未分配班主任学员", count: 1, selected: false },
  { id: 2, name: "待排课学员", count: 0, selected: false },
]);
// 处理快捷筛选单选
const selectQuickFilter = (selectedFilter, type) => {
  if (type == 1) {
    quickFilters.value.forEach(filter => {
      filter.selected = filter.id === selectedFilter.id ? !filter.selected : false;
    });
    console.log('当前快捷筛选:', quickFilters.value.find(q => q.selected)?.name);
  } else if (type == 2) {
    quickOneToOneFilters.value.forEach(filter => {
      filter.selected = filter.id === selectedFilter.id ? !filter.selected : false;
    });
    console.log('当前快捷筛选:', quickOneToOneFilters.value.find(q => q.selected)?.name);
  }
};

// 处理常规筛选变化
const handleIntentionChange = () => {
  nextTick(() => {
    console.log('意向度:', toRaw(selectedValues.value));
  });
};

const handleFollowChange = () => {
  nextTick(() => {
    console.log('跟进状态:', toRaw(followStatusVals.value));
  });
};

const handleSexChange = () => {
  nextTick(() => {
    console.log('性别:', toRaw(sexVals.value));
  });
};
const handleCreatePeoChange = (e) => {
  nextTick(() => {
    console.log('创建人:', e);
  });
}
const handleCreateTimeChange = (e) => {
  nextTick(() => {
    console.log('创建时间:', e);
  });
}
const handleCourseChange = (e) => {
  nextTick(() => {
    console.log('意向课程:', e);
  });
}
const handleReferenceChange = (e) => {
  nextTick(() => {
    console.log('推荐人:', e);
  });
}
const handleChannelChange = () => {
  nextTick(() => {
    console.log('渠道状态:', toRaw(selectChannelVals.value));
  });
};
const handleChannelTypeChange = () => {
  nextTick(() => {
    console.log('渠道类型:', toRaw(selectChannelTypeVals.value));
  });
};
const handleChannelCategoryChange = () => {
  nextTick(() => {
    console.log('渠道分类:', toRaw(selectChannelCategoryVals.value));
  });
};
const handleSubjectChange = (e) => {
  nextTick(() => {
    console.log('科目:', e);
  });
}
const handleCourseCategoryChange = (e) => {
  nextTick(() => {
    console.log('课程类别:', e);
  });
}
const handleStudentStatusChange = (e) => {
  nextTick(() => {
    console.log('学员状态:', e);
  });
}
const handleCurrentStatusChange = (e) => {
  nextTick(() => {
    console.log('当前状态:', e);
  });
}
const handleOrNotFenClassChange = (e) => {
  nextTick(() => {
    console.log('是否分班:', e);
  });
}
const handleBillingModeChange = (e) => {
  nextTick(() => {
    console.log('计费模式:', e);
  });
}
const handleIsSetExpirationDateChange = (e) => {
  nextTick(() => {
    console.log('有效期状态:', e);
  });
}
const handleOpenClassStatusChange = (e) => {
  nextTick(() => {
    console.log('开班状态:', e);
  });
}
const handleDoYouScheduleChange = (e) => {
  nextTick(() => {
    console.log('是否排课:', e);
  });
}
// 已选条件计算
const selectedConditions = computed(() => {
  const conditions = [
    {
      type: 'quick',
      label: '快捷筛选',
      show: true,
      values: quickFilters.value.filter(q => q.selected).map(q => ({ id: q.id, value: q.name }))
    },
    {
      type: 'quickOneToOne',
      label: '快捷筛选',
      show: true,
      values: quickOneToOneFilters.value.filter(q => q.selected).map(q => ({ id: q.id, value: q.name }))
    },
    {
      type: 'oneToOneSearch',
      label: '一对一',
      show: true,
      values: (() => {
        if (!searchKeyOneToOne.value) return [];
        const item = oneToOneOptions.value.find(opt => opt.id === searchKeyOneToOne.value);
        return item ? [{ id: item.id, value: `${item.name}～${item.course}` }] : [];
      })()
    },
    {
      type: 'stuPhoneSearch',
      label: '学员/电话',
      show: true,
      values: (() => {
        if (!searchKeyStuPhone.value) return [];
        const item = stuListOptions.value.find(opt => opt.id === searchKeyStuPhone.value);
        return item ? [{ id: item.id, value: `${item.name}` }] : [];
      })()
    },
    {
      type: 'selectInputKeySearch',
      label: '班级名称',
      show: true,
      values: (() => {
        if (!selectInputKey.value) return [];
        const item = classOptions.value.find(opt => opt.id === selectInputKey.value);
        return item ? [{ id: item.id, value: `${item.value}` }] : [];
      })()
    },
    {
      type: 'searchInputKeySearch',
      label: props.searchLabel,
      show: true,
      values: (() => {
        if (!searchInputKey.value) return [];
        return [{ id: 0, value: searchInputKey.value }];
      })()
    },
    // searchInputKey
    {
      type: 'intention',
      label: '意向度',
      show: props.displayArray.includes('intention'),
      values: customOptions.value.filter(opt => selectedValues.value.includes(opt.id))
    },
    {
      type: 'followStatus',
      label: '跟进状态',
      show: props.displayArray.includes('followStatus'),
      values: followStatusOptions.value.filter(opt => followStatusVals.value.includes(opt.id))
    },
    {
      type: 'sex',
      label: '性别',
      show: props.displayArray.includes('sex'),
      values: sexOptions.value.filter(opt => sexVals.value.includes(opt.id))
    },
    {
      type: 'createPeo',
      label: '创建人',
      show: props.displayArray.includes('createPeo'),
      values: createPeoOptions.value.filter(opt => opt.id === createPeoVals.value)
    },
    {
      type: 'createTime',
      label: '创建时间',
      show: props.displayArray.includes('createTime'),
      values: createTimeVals.value.length === 2
        ? [{
          id: 'dateRange',
          value: `${createTimeVals.value[0]} 至 ${createTimeVals.value[1]}`
        }]
        : []
    },
    {
      type: 'classEndingTime',
      label: '结课时间',
      show: props.displayArray.includes('classEndingTime'),
      values: classEndingTimeVals.value.length === 2
        ? [{
          id: 'dateRange',
          value: `${classEndingTimeVals.value[0]} 至 ${classEndingTimeVals.value[1]}`
        }]
        : []
    },
    {
      type: 'classStopTime',
      label: '停课时间',
      show: props.displayArray.includes('classStopTime'),
      values: classStopTimeVals.value.length === 2
        ? [{
          id: 'dateRange',
          value: `${classStopTimeVals.value[0]} 至 ${classStopTimeVals.value[1]}`
        }]
        : []
    },
    {
      type: 'intentionCourse',
      label: '意向课程',
      show: props.displayArray.includes('intentionCourse'),
      values: courseListOptions.value.filter(opt => opt.id === selectCourseValues.value)
    },
    {
      type: 'reference',
      label: '推荐人',
      show: props.displayArray.includes('reference'),
      values: stuListOptions.value.filter(opt => opt.id === selectStuVals.value)
    },
    {
      type: 'channelCategory',
      label: '渠道分类',
      show: props.displayArray.includes('channelCategory'),
      values: channelCategoryOptions.value.filter(opt => selectChannelCategoryVals.value.includes(opt.id))
    },
    {
      type: 'channelStatus',
      label: '渠道状态',
      show: props.displayArray.includes('channelStatus'),
      values: channelListOptions.value.filter(opt => selectChannelVals.value.includes(opt.id))

    },
    {
      type: 'channelType',
      label: '渠道类型',
      show: props.displayArray.includes('channelType'),
      values: channelTypeOptions.value.filter(opt => selectChannelTypeVals.value.includes(opt.id))

    },
    {
      type: 'subject',
      label: '科目',
      show: props.displayArray.includes('subject'),
      values: subjectOptions.value.filter(opt => opt.id === selectSubjectVals.value)
    },
    {
      type: 'courseCategory',
      label: '课程类别',
      show: props.displayArray.includes('courseCategory'),
      values: courseCategoryOptions.value.filter(opt => opt.id === selectCourseCategoryVals.value)
    },
    {
      type: 'studentStatus',
      label: '学员状态',
      show: props.displayArray.includes('studentStatus'),
      values: studentStatusOptions.value.filter(opt => opt.id === selectStudentStatusVals.value)
    },
    {
      type: 'currentStatus',
      label: '当前状态',
      show: props.displayArray.includes('currentStatus'),
      values: currentStatusOptions.value.filter(opt => selectCurrentStatusVals.value.includes(opt.id))
    },
    {
      type: 'orNotFenClass',
      label: '是否分班',
      show: props.displayArray.includes('orNotFenClass'),
      values: orNotFenClassOptions.value.filter(opt => selectOrNotFenClassVals.value.includes(opt.id))
    },
    {
      type: 'billingMode',
      label: '计费模式',
      show: props.displayArray.includes('billingMode'),
      values: billingModeOptions.value.filter(opt => selectBillingModeVals.value.includes(opt.id))
    },
    {
      type: 'isSetExpirationDate',
      label: '是否设置有效期',
      show: props.displayArray.includes('isSetExpirationDate'),
      values: isSetExpirationDateOptions.value.filter(opt => opt.id === selectIsSetExpirationDateVals.value)
    },
    {
      type: 'openClassStatus',
      label: '开班状态',
      show: props.displayArray.includes('openClassStatus'),
      values: openClassStatusOptions.value.filter(opt => opt.id === selectOpenClassStatusVals.value)
    },
    {
      type: 'doYouSchedule',
      label: '是否排课',
      show: props.displayArray.includes('doYouSchedule'),
      values: doYouScheduleOptions.value.filter(opt => opt.id === selectDoYouScheduleVals.value)
    },

  ];
  return conditions
    .filter(item => item.values.length > 0 && item.show)
    .sort((a, b) => (lastUpdated[a.type] || 0) - (lastUpdated[b.type] || 0));
});
watch(selectDptVals, () => { dptName.value = getNameById(selectDptVals.value) })
// 监听各条件变化，更新最后操作时间
watch(selectedValues, () => lastUpdated.intention = Date.now());
watch(followStatusVals, () => lastUpdated.followStatus = Date.now());
watch(sexVals, () => lastUpdated.sex = Date.now());
watch(selectChannelVals, () => lastUpdated.channelStatus = Date.now());
watch(selectChannelTypeVals, () => lastUpdated.channelType = Date.now());
watch(selectChannelCategoryVals, () => lastUpdated.channelCategory = Date.now());
watch(createPeoVals, () => lastUpdated.createPeo = Date.now());
watch(createTimeVals, () => lastUpdated.createTime = Date.now());
watch(classEndingTimeVals, () => lastUpdated.classEndingTime = Date.now());
watch(classStopTimeVals, () => lastUpdated.classStopTime = Date.now());
watch(selectCourseValues, () => lastUpdated.intentionCourse = Date.now());
watch(() => quickFilters.value.map(q => q.selected), () => lastUpdated.quick = Date.now(), { deep: true });
watch(() => quickOneToOneFilters.value.map(q => q.selected), () => lastUpdated.quickOneToOne = Date.now(), { deep: true });
watch(selectStuVals, () => lastUpdated.reference = Date.now());
watch(selectSubjectVals, () => lastUpdated.subject = Date.now());
watch(selectCourseCategoryVals, () => lastUpdated.courseCategory = Date.now());
watch(selectStudentStatusVals, () => lastUpdated.studentStatus = Date.now());
watch(selectCurrentStatusVals, () => lastUpdated.currentStatus = Date.now());
watch(selectOrNotFenClassVals, () => lastUpdated.orNotFenClass = Date.now());
watch(selectBillingModeVals, () => lastUpdated.billingMode = Date.now());
watch(selectIsSetExpirationDateVals, () => lastUpdated.isSetExpirationDate = Date.now());
watch(selectOpenClassStatusVals, () => lastUpdated.openClassStatus = Date.now());
watch(selectDoYouScheduleVals, () => lastUpdated.doYouSchedule = Date.now());
// 观察筛选条件变化，维护顺序队列
watch(selectedConditions, (newConditions) => {
  const newTypes = newConditions.map(c => c.type);

  // 保留仍然存在的类型
  conditionOrder.value = conditionOrder.value.filter(t => newTypes.includes(t));

  // 添加新增的类型到队列末尾
  newTypes.forEach(t => {
    if (!conditionOrder.value.includes(t)) {
      conditionOrder.value.push(t);
    }
  });
}, { deep: true });
// 最终使用的排序条件
const orderedConditions = computed(() => {
  return [...selectedConditions.value].sort((a, b) =>
    conditionOrder.value.indexOf(a.type) - conditionOrder.value.indexOf(b.type)
  );
});
// 清空所有筛选
const clearAll = () => {
  // 重置多选类
  [selectedValues, followStatusVals, sexVals, createTimeVals, classEndingTimeVals, classStopTimeVals,
    selectChannelVals, selectChannelCategoryVals, selectChannelTypeVals, selectCurrentStatusVals,
    selectOrNotFenClassVals, selectBillingModeVals].forEach(
      ref => ref.value = []
    );
  // 重置单选类
  quickFilters.value.forEach(q => q.selected = false);
  quickOneToOneFilters.value.forEach(q => q.selected = false);
  createPeoVals.value = null;
  selectCourseValues.value = null;
  selectStuVals.value = null;
  selectSubjectVals.value = null
  selectCourseCategoryVals.value = null
  selectStudentStatusVals.value = null
  selectIsSetExpirationDateVals.value = null
  selectOpenClassStatusVals.value = null
  selectDoYouScheduleVals.value = null
  Object.values(childRefs.value).forEach(child => {
    if (child?.resetSearch) {
      child.resetSearch();
    }
  });
  searchInputKey.value = undefined
  searchKeyOneToOne.value = undefined
  searchKeyStuPhone.value = undefined
  selectInputKey.value = undefined
  inputValue.value = undefined
};
// 移除单个条件
const removeCondition = (type, id) => {
  switch (type) {
    case 'oneToOneSearch':
      searchKeyOneToOne.value = undefined; // 清空搜索框
      break;
    case 'stuPhoneSearch':
      searchKeyStuPhone.value = undefined; // 清空搜索框
      break;
    case 'selectInputKeySearch':
      selectInputKey.value = undefined; // 清空搜索框
      break;
    case 'searchInputKeySearch':
      searchInputKey.value = undefined; // 清空搜索框
      inputValue.value = undefined
      break;
    case 'intention':
      selectedValues.value = [];
      break;
    case 'followStatus':
      followStatusVals.value = [];
      break;
    case 'sex':
      sexVals.value = [];
      break;
    case 'channelStatus':
      selectChannelVals.value = [];
      break;
    case 'channelCategory':
      selectChannelCategoryVals.value = [];
      break;
    case 'channelType':
      selectChannelTypeVals.value = [];
      break;
    case 'quick':
      const filter = quickFilters.value.find(q => q.id === id);
      if (filter) filter.selected = false;
      break;
    case 'quickOneToOne':
      const filterOneToOne = quickOneToOneFilters.value.find(q => q.id === id);
      if (filterOneToOne) filterOneToOne.selected = false;
      break;
    case 'createPeo':  // 新增创建人移除逻辑
      createPeoVals.value = null;
      break;
    case 'createTime':  // 新增创建时间移除逻辑
      createTimeVals.value = [];
      break;
    case 'classEndingTime':  // 新增创建时间移除逻辑
      classEndingTimeVals.value = [];
      break;
    case 'classStopTime':  // 新增创建时间移除逻辑
      classStopTimeVals.value = [];
      break;
    case 'intentionCourse':  // 新增意向课程移除逻辑
      selectCourseValues.value = null;
      break;
    case 'reference':  // 新增推荐人移除逻辑
      selectStuVals.value = null;
      break;
    case 'subject':  // 新增科目移除逻辑
      selectSubjectVals.value = null;
      break;
    case 'courseCategory':  // 课程类别移除逻辑
      selectCourseCategoryVals.value = null;
      break;
    case 'studentStatus':
      selectStudentStatusVals.value = null;
      break;
    case 'currentStatus':
      selectCurrentStatusVals.value = [];
      break;
    case 'orNotFenClass':
      selectOrNotFenClassVals.value = [];
      break;
    case 'billingMode':
      selectBillingModeVals.value = [];
      break;
    case 'isSetExpirationDate':
      selectIsSetExpirationDateVals.value = null;
      break;
    case 'openClassStatus':
      selectOpenClassStatusVals.value = null;
      break;
    case 'doYouSchedule':
      selectDoYouScheduleVals.value = null;
      break;
  }
};
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const filterOption = (input, option) => {
  // 获取所有待匹配字段
  const name = option.label?.toString() || '';       // 主标签字段
  const phone = option.data?.phone?.toString() || ''; // 电话号码
  const course = option.data?.course?.toString() || ''; // 新增课程字段

  // 统一格式处理
  const normalizedInput = input.toLowerCase().trim();
  const searchContent = [
    name.toLowerCase(),
    phone.toLowerCase(),
    course.toLowerCase()
  ].join(' '); // 合并所有字段为搜索字符串

  return searchContent.includes(normalizedInput);
};
// 子组件内部需要初始化（在 onMounted 中）
onMounted(() => {
  dptName.value = getNameById(selectDptVals.value)
  if (props.defaultStudentStatus) {
    selectStudentStatusVals.value = props.defaultStudentStatus;
  }
  if (props.defaultCurrentStatus) {
    selectCurrentStatusVals.value = props.defaultCurrentStatus;
  }
  if (props.defaultOrNotFenClass) {
    selectOrNotFenClassVals.value = props.defaultOrNotFenClass;
  }
  if (props.defaultOpenClassStatus) {
    selectOpenClassStatusVals.value = props.defaultOpenClassStatus;
  }
});

const filterClassOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>

<template>
  <div class="home flex">
    <div class="flex-1 mr-0">
      <!-- 快捷筛选区域 -->
      <div class="flex">
        <div class="filter-section mb-2 flex-1" v-if="isQuickShow">
          <span class="section-title mt-0.5">快捷筛选：</span>
          <div class="quick-filters">
            <a-button v-for="filter in quickFilters" :key="filter.id" :type="filter.selected ? 'primary' : 'default'"
              class="filter-btn" @click="selectQuickFilter(filter, 1)">
              {{ filter.name }}（{{ filter.count }}）
            </a-button>
          </div>
        </div>
        <div class="filter-section mb-2 flex-1" v-if="isQuickOneToOneShow">
          <span class="section-title mt-0.5">快捷筛选：</span>
          <div class="quick-filters">
            <a-button v-for="filter in quickOneToOneFilters" :key="filter.id"
              :type="filter.selected ? 'primary' : 'default'" class="filter-btn" @click="selectQuickFilter(filter, 2)">
              {{ filter.name }}（{{ filter.count }}）
            </a-button>
          </div>
        </div>
        <div class="w-100 mt--1" v-if="isShowSearchStuPhone">
          <div class="selectBox flex ">
            <div class="label">学员/电话</div>
            <div>
              <a-select allowClear v-model:value="searchKeyStuPhone" :filter-option="filterOption" show-search
                placeholder="搜索姓名/手机号" style="width: 240px" @change="handleChange" option-label-prop="label">
                <a-select-option v-for="(item) in stuListOptions" :key="item.id" :value="item.id" :data="item"
                  :label="item.name">
                  <div class="flex flex-center mb-1">
                    <div>
                      <img class="w-10 rounded-10"
                        src="https://prod-cdn.schoolpal.cn/training/next-erp/shared/static/images/defaultimg/default_avator.png"
                        alt="">
                    </div>
                    <div class="ml-2 mr-3">
                      <div class="text-sm text-#666  leading-7">{{ item.name }}</div>
                      <div class="text-xs text-#888">{{ item.phone }}</div>
                    </div>
                    <div>
                      <a-tag :bordered="false" color="processing">在读学员</a-tag>
                    </div>
                  </div>
                </a-select-option>

              </a-select>
            </div>
          </div>
        </div>
        <div class="w-100 mt--1" v-if="isShowOneToOne">
          <div class="selectBox flex ">
            <div class="label">一对一</div>
            <div>
              <a-select allowClear v-model:value="searchKeyOneToOne" :filter-option="filterOption" show-search
                placeholder="请输入关键字" style="width: 240px" @change="handleChange" option-label-prop="label">
                <a-select-option v-for="(item) in oneToOneOptions" :key="item.id" :value="item.id" :data="item"
                  :label="`${item.name}～${item.course}`">
                  <div class="flex flex-items-center mb-1">
                    <div class="ml-2">
                      <div class="text-sm text-#666  leading-7">{{ item.name }}</div>
                    </div>
                    <span>~</span>
                    <div>
                      <div class="text-sm text-#666  leading-7">{{ item.course }}</div>
                    </div>
                  </div>
                </a-select-option>
              </a-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 常规筛选条件 -->
      <div class="filter-section flex justify-between">
        <div class="flex">
          <span class="section-title mt-0.5 text-#222">筛选条件：</span>
          <div class="standard-filters">
            <checkbox-filter v-if="displayArray.includes('intention')" v-model:checkedValues="selectedValues"
              :options="customOptions" label="意向度" @change="handleIntentionChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('followStatus')" v-model:checkedValues="followStatusVals"
              :options="followStatusOptions" label="跟进状态" @change="handleFollowChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('sex')" v-model:checkedValues="sexVals" :options="sexOptions"
              label="性别" @change="handleSexChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('createPeo')" :ref="(el) => handleRef(el, 'createUser')"
              category="teacher" placeholder="请输入创建人" v-model:checkedValues="createPeoVals" :options="createPeoOptions"
              label="创建人" @radioChange="handleCreatePeoChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('createTime')" v-model:checkedValues="createTimeVals"
              label="创建时间" @datePickerChange="handleCreateTimeChange" type="dateTime" />
            <checkbox-filter v-if="displayArray.includes('classEndingTime')" v-model:checkedValues="classEndingTimeVals"
              label="结课时间" @datePickerChange="handleCreateTimeChange" type="dateTimeQuick" />
            <checkbox-filter v-if="displayArray.includes('classStopTime')" v-model:checkedValues="classStopTimeVals"
              label="停课时间" @datePickerChange="handleCreateTimeChange" type="dateTimeQuick" />
            <checkbox-filter v-if="displayArray.includes('intentionCourse')"
              :ref="(el) => handleRef(el, 'yiXiangcourse')" category="course" placeholder="请输入意向课程"
              v-model:checkedValues="selectCourseValues" :options="courseListOptions" label="意向课程"
              @radioChange="handleCourseChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('reference')" :ref="(el) => handleRef(el, 'tuijianren')"
              category="stu" placeholder="请输入推荐人" v-model:checkedValues="selectStuVals" :options="stuListOptions"
              label="推荐人" @radioChange="handleReferenceChange" type="radio" />
            <checkbox-filter v-if="type == 'dpt' && displayArray.includes('department')"
              v-model:checkedValues="selectDptVals" :options="dptListOptions" label="所属部门" type="tree" />
            <checkbox-filter v-if="displayArray.includes('channelCategory')" showSearch
              v-model:checkedValues="selectChannelCategoryVals" :options="channelCategoryOptions" label="渠道分类"
              @change="handleChannelCategoryChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('channelStatus')" v-model:checkedValues="selectChannelVals"
              :options="channelListOptions" label="渠道状态" @change="handleChannelChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('channelType')" v-model:checkedValues="selectChannelTypeVals"
              :options="channelTypeOptions" label="渠道类型" @change="handleChannelTypeChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('subject')" :ref="(el) => handleRef(el, 'kemu')"
              category="course" placeholder="请输入科目" v-model:checkedValues="selectSubjectVals" :options="subjectOptions"
              label="科目" @radioChange="handleSubjectChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('courseCategory')" :ref="(el) => handleRef(el, 'courseType')"
              category="course" placeholder="请选择课程类别" v-model:checkedValues="selectCourseCategoryVals"
              :options="courseCategoryOptions" label="课程类别" @radioChange="handleCourseCategoryChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('studentStatus')" :ref="(el) => handleRef(el, 'studentStatus')"
              category="noSearchRadio" placeholder="选择学员状态" v-model:checkedValues="selectStudentStatusVals"
              :options="studentStatusOptions" label="学员状态" @radioChange="handleStudentStatusChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('currentStatus')" :ref="(el) => handleRef(el, 'currentStatus')"
              category="course" placeholder="选择状态" v-model:checkedValues="selectCurrentStatusVals"
              :options="currentStatusOptions" label="当前状态" @change="handleCurrentStatusChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('orNotFenClass')" :ref="(el) => handleRef(el, 'orNotFenClass')"
              v-model:checkedValues="selectOrNotFenClassVals" :options="orNotFenClassOptions" label="是否分班"
              @change="handleOrNotFenClassChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('billingMode')" :ref="(el) => handleRef(el, 'billingMode')"
              v-model:checkedValues="selectBillingModeVals" :options="billingModeOptions" label="计费模式"
              @change="handleBillingModeChange" type="checkbox" />
            <checkbox-filter v-if="displayArray.includes('isSetExpirationDate')"
              :ref="(el) => handleRef(el, 'isSetExpirationDate')" category="noSearchRadio" placeholder="请选择有效期状态"
              v-model:checkedValues="selectIsSetExpirationDateVals" :options="isSetExpirationDateOptions"
              label="是否设置有效期" @radioChange="handleIsSetExpirationDateChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('openClassStatus')"
              :ref="(el) => handleRef(el, 'openClassStatus')" category="noSearchRadio" placeholder="请选择开班状态"
              v-model:checkedValues="selectOpenClassStatusVals" :options="openClassStatusOptions" label="开班状态"
              @radioChange="handleOpenClassStatusChange" type="radio" />
            <checkbox-filter v-if="displayArray.includes('doYouSchedule')" :ref="(el) => handleRef(el, 'doYouSchedule')"
              category="noSearchRadio" placeholder="请选择排课状态" v-model:checkedValues="selectDoYouScheduleVals"
              :options="doYouScheduleOptions" label="是否排课" @radioChange="handleDoYouScheduleChange" type="radio" />
          </div>
        </div>
        <div class="w-100 mt--1" v-if="isShowSearchInput">
          <div class="selectBox flex ">
            <div class="label searchLabel">{{ searchLabel }}</div>
            <div>
              <a-input  class="searchInput" allowClear :placeholder="searchPlaceholder" v-model:value="inputValue">
                <template #suffix>
                  <SearchOutlined style="color: #bbb;" />
                </template>
              </a-input>
            </div>
          </div>
        </div>
        <div class="w-100 mt--0.5" v-if="isShowClsssSearch">
          <div class="selectBox flex ">
            <div class="label searchLabel">{{ searchLabel }}</div>
            <div>
              <a-select v-model:value="selectInputKey" allowClear show-search :placeholder="searchPlaceholder"
                @change="handleChange" style="width: 200px" :options="classOptions"
                :fieldNames="{ label: 'value', value: 'id' }" :filter-option="filterClassOption"></a-select>
            </div>
          </div>
        </div>
        <div class="w-100 mt--0.5" v-if="isShowSearchStuPhonefilter">
          <div class="selectBox flex ">
            <div class="label">学员/电话</div>
            <div>
              <a-select allowClear v-model:value="searchKeyStuPhone" :filter-option="filterOption" show-search
                placeholder="搜索姓名/手机号" style="width: 240px" @change="handleChange" option-label-prop="label">
                <a-select-option v-for="(item) in stuListOptions" :key="item.id" :value="item.id" :data="item"
                  :label="item.name">
                  <div class="flex flex-center mb-1">
                    <div>
                      <img class="w-10 rounded-10"
                        src="https://prod-cdn.schoolpal.cn/training/next-erp/shared/static/images/defaultimg/default_avator.png"
                        alt="">
                    </div>
                    <div class="ml-2 mr-3">
                      <div class="text-sm text-#666  leading-7">{{ item.name }}</div>
                      <div class="text-xs text-#888">{{ item.phone }}</div>
                    </div>
                    <div>
                      <a-tag :bordered="false" color="processing">在读学员</a-tag>
                    </div>
                  </div>
                </a-select-option>

              </a-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 已选条件展示 -->
      <div class="selected-conditions" v-if="orderedConditions.length > 0 || type == 'dpt'">
        <span class="section-title text-#222">已选条件：</span>
        <div class="condition-tags">
          <a-tag v-if="type != 'dpt' || orderedConditions.length > 0" color="red" class="clear-all mb-2"
            @click="clearAll">
            清空所有
            <DeleteOutlined class="text-3 ml-0.5" />
          </a-tag>
          <a-tag v-if="type == 'dpt'" color="blue" class="condition-tag mb-2">
            <div class="tag-content">
              <span class="condition-label">所属部门：</span>
              <div class="condition-values">
                <span class="value-item">
                  {{ dptName }}
                </span>
              </div>
            </div>
          </a-tag>
          <a-tag v-for="condition in orderedConditions" :key="condition.type" color="blue" class="condition-tag mb-2">
            <div class="tag-content">
              <span class="condition-label">{{ condition.label }}：</span>
              <div class="condition-values">
                <!-- <template v-if="condition.type === 'createTime'">
                  <span class="value-item">
                    {{ condition.values[0].value }}
                    <CloseOutlined class="close-icon" @click.stop="removeCondition(condition.type, 0)" />
                  </span>
                </template>
                <template v-else-if="condition.type === 'classStopTime'">
                  <span class="value-item">
                    {{ condition.values[0].value }}
                    <CloseOutlined class="close-icon" @click.stop="removeCondition(condition.type, 0)" />
                  </span>
                </template>
                <template v-else>
                  <span v-for="(value, index) in condition.values" :key="value.id" class="value-item">
                    {{ value.value ?? value.name }}
                    <CloseOutlined v-if="index === condition.values.length - 1" class="close-icon"
                      @click.stop="removeCondition(condition.type, value.id)" />
                    <span v-else class="separator">、</span>
                  </span>
                </template> -->
                <span v-for="(value, index) in condition.values" :key="value.id" class="value-item">
                  {{ value.value ?? value.name }}
                  <CloseOutlined v-if="index === condition.values.length - 1" class="close-icon"
                    @click.stop="removeCondition(condition.type, value.id)" />
                  <span v-else class="separator">、</span>
                </span>
              </div>
            </div>
          </a-tag>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.selectBox {
  justify-content: flex-end;
  align-items: center;
}

.searchInput {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}


.selectBox .label {
  border: 1px solid #d9d9d9;
  height: 32px;
  padding: 0 10px;
  line-height: 32px;
  text-align: left;
  width: 100px;
  border-radius: 8px 0 0 8px !important;
  color: #222;
  font-size: 14px;
  min-width: 104px;
  padding-left: 8px;
  padding-right: 16px;
  border-right: 0;
}

.selectBox .searchLabel {
  border-right: 0 !important;
}

:deep(.selectBox .ant-select-selector) {
  border-radius: 0 6px 6px 0 !important;
}

.home {
  padding: 12px 12px 6px 12px;
  background: #ffffff;
  border-radius: 8px;
  align-items: flex-start;
  width: 100%;
}

.debug-panel {
  padding: 16px;
  margin-bottom: 24px;
  background: #f8f9fa;
  border-radius: 6px;
}

.filter-section {
  display: flex;
  align-items: flex-start;
}

.section-title {
  white-space: nowrap;
}


.quick-filters {
  display: flex;
  gap: 8px;
}

.standard-filters {
  display: flex;
  flex-wrap: wrap;
}

.selected-conditions {
  display: flex;
  align-items: flex-start;
}

.condition-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.condition-tag {
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.tag-content {
  display: flex;
  align-items: center;
}


.condition-values {
  display: flex;
  align-items: center;
}

.value-item {
  display: inline-flex;
  align-items: center;
}

.close-icon {
  margin-left: 6px;
  font-size: 12px;
  cursor: pointer;
  color: rgba(92, 92, 92, 0.45);
  transition: color 0.3s;
}

.close-icon:hover {
  color: rgba(0, 0, 0, 0.75);
}

.clear-all {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.filter-btn {
  height: 28px;
  padding: 0 12px;
}
</style>