<script setup>
import { ref } from 'vue';
const activeKey = ref('1');
const activeKey2 = ref('1');
</script>

<template>
  <div class="home">
    <div class="tabs">
      <a-tabs animated v-model:activeKey="activeKey" :tabBarStyle="{
        'border-bottom-left-radius': '0px',
        'border-bottom-right-radius': '0px'
      }">
        <!-- force-render 强制渲染 -->
        <a-tab-pane key="1" tab="意向学员">
          <a-tabs animated v-model:activeKey="activeKey2" :tabBarStyle="{
            'height': '46px', 'border-top-left-radius': '0px',
            'border-top-right-radius': '0px'
          }" class="twoTab">
            <a-tab-pane key="1" tab="全部意向学员">
              <all-intention-student></all-intention-student>
            </a-tab-pane>
            <a-tab-pane key="2" tab="部门意向学员">
              <div class="tab-content">
                <dpt-intention-student></dpt-intention-student>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-tab-pane>
        <a-tab-pane key="2" tab="公有池">
          <public-pool></public-pool>
        </a-tab-pane>
        <a-tab-pane key="3" tab="渠道管理">
          <channel-management></channel-management>
        </a-tab-pane>
        <a-tab-pane key="4" tab="设置">设置</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  color: #666;

  .tabs {
    width: 100%;
    border-radius: 10px;
    line-height: 40px;

    :deep(.ant-tabs-nav) {
      background: #fff;
      border-radius: 16px;
      margin: 0;
    }

    :deep(.ant-tabs-nav-wrap) {
      padding-left: 36px;
    }

    :deep(.ant-tabs-ink-bar) {
      text-align: center;
      height: 9px !important;
      background: transparent;
      bottom: 1px !important;

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

    .twoTab {
      padding: 0;

      :deep(.ant-tabs-nav-wrap) {
        padding-left: 10px;
        margin: 6px 0;
      }

      :deep(.ant-tabs-nav) {
        &::before {
          display: none;
        }
      }

      :deep(.ant-tabs-tab) {
        padding: 6px 14px !important;
      }

      :deep(.ant-tabs-tab-active) {
        background: #e6f0ff;
        border-radius: 8px;
      }

      :deep(.ant-tabs-ink-bar) {
        display: none;
      }


    }
  }
}
</style>
