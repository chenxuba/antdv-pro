<template>
  <div>
    <a-drawer :push="{ distance: 80 }" v-model:open="openDrawer" :bodyStyle="{ padding: '0', background: '#f7f7fd' }"
      :closable="false" width="1165px" placement="right">
      <!-- 自定义头部 -->
      <template #title>
        <div class="custom-header flex justify-between h-4 flex-items-center">
          <div class="text-5">上课记录详情</div>
          <a-button type="text" @click="openDrawer = false" class="close-btn">
            <template #icon>
              <CloseOutlined class="text-5 close-icon" />
            </template>
          </a-button>
        </div>
      </template>
      <div class="contenter flex flex-center bg-white px6 py3">
        <div class="avatarBox w-16 h-16 relative">
          <img width="64" height="64" class=" rounded-100"
            src="https://pcsys.admin.ybc365.com//e64c7fd6-2edc-412f-9141-a9904be88b4f.png" alt="">
        </div>
        <div class="info flex flex-1 ml-4 flex-col">
          <div class="top flex justify-between flex-center flex-1">
            <a-space>
              <div class="name text-5 font-800">奥夫班</div>
            </a-space>
            <a-space>
              <a-button danger ghost>删除</a-button>
              <a-button type="primary">编辑点名</a-button>
              <a-button type="primary">课堂点名</a-button>
              <a-button type="primary">课后任务</a-button>
            </a-space>
          </div>
          <div class="bottom flex-1 flex flex-items-center mt-2">
            <div class="birthday flex-center">
              <span class="text-4 text-#222">2025-04-14(周一)10:00 ~ 10:30</span>
              <span class="bg-#e6f0ff text-#06f text-3 px2 py1 rounded-10 ml2">30分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="desc pt-4 bg-white px6 py3 pb0">
        <a-descriptions :column="4" size="small" :contentStyle="{ color: '#888' }">
          <a-descriptions-item label="上课老师">张晨</a-descriptions-item>
          <a-descriptions-item label="上课助教">陈瑞生</a-descriptions-item>
          <a-descriptions-item label="上课教室">-</a-descriptions-item>
          <a-descriptions-item label="本次上课">教师记录1课时</a-descriptions-item>
          <a-descriptions-item label="创建时间">2025-04-14 08:19 陈瑞</a-descriptions-item>
          <a-descriptions-item label="科目">-</a-descriptions-item>
          <a-descriptions-item> <span class="text-#06f cursor-pointer">编辑上课信息</span> </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" size="large" :tabBarStyle="{
          'border-radius': '0px', 'padding-left': '24px'
        }">
          <a-tab-pane key="0" tab="点名详情">
            <call-name-details></call-name-details>
          </a-tab-pane>
          <a-tab-pane key="1" tab="点名变更记录">
            <call-name-change-details></call-name-change-details>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { CloseOutlined } from '@ant-design/icons-vue';

const activeKey = ref('0');
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:open']);
// 处理双向绑定
const openDrawer = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

// defineEmits(['update:open']);
</script>

<style lang="less" scoped>
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

.tabs {
  width: 100%;
  border-radius: 10px;

  :deep(.ant-tabs-nav) {
    background: #fff;
    margin: 0;
  }



  :deep(.ant-tabs-ink-bar) {
    text-align: center;
    height: 12px !important;
    background: transparent;
    bottom: 0px !important;

    &::after {
      position: absolute;
      top: 0;
      left: calc(50% - 12px);
      width: 24px !important;
      height: 4px !important;
      border-radius: 2px;
      background-color: var(--pro-ant-color-primary);
      content: "";
    }
  }
}
</style>