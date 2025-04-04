<script setup lang="ts">
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { CSSProperties } from 'vue'
import { useLayoutState } from '../../basic-layout/context'
import Menu from '../menu/index.vue'

const {
  collapsed,
  leftCollapsed,
  // handleCollapsed,
  selectedMenus,
  splitMenus,
  layout,
  logo,
  theme,
  title,
  collapsedWidth,
  siderWidth,
  headerHeight,
  fixedSider,
  isMobile,
  header,
} = useLayoutState()

const prefixCls = shallowRef('ant-pro-sider')

const siderStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    paddingTop: `${layout.value !== 'side' && !isMobile.value ? headerHeight.value : 0}px`,
    transition:
      'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
    overflow: 'hidden',
  }

  // bugfix https://github.com/antdv-pro/antdv-pro/issues/173
  if (layout.value === 'mix' && header.value === false)
    style.paddingTop = '0px'

  return style
})

const cls = computed(() => ({
  [prefixCls.value]: true,
  [`${prefixCls.value}-fixed`]: fixedSider.value,
  [`${prefixCls.value}-layout-${layout.value}`]: !!layout.value,
}))

const showLogo = computed(() => {
  return (layout.value === 'side' || isMobile.value) && layout.value !== 'mix'
})

const logoCls = computed(() => {
  return {
    'ant-pro-sider-collapsed': collapsed.value && !isMobile.value,
    'ant-pro-sider-logo-dark': theme.value === 'inverted',
  }
})
</script>

<template>
  <div
    v-if="fixedSider" :style="{
      width: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      maxWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      minWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      ...siderStyle,
    }"
  />
  <a-layout-sider
    v-if="splitMenus ? (selectedMenus ?? []).length > 0 : true"
    :theme="theme === 'inverted' ? 'dark' : 'light'" :collapsed="collapsed && !isMobile" :trigger="null"
    :collapsed-width="collapsedWidth" :width="siderWidth" collapsible :class="cls" :style="siderStyle"
  >
    <div v-if="showLogo" class="ant-pro-sider-logo" :class="logoCls">
      <a>
        <img :src="logo" alt="logo">
        <h1 v-if="!collapsed || isMobile">{{ title }} </h1>
      </a>
    </div>
    <div class="flex-1 of-x-hidden of-y-auto scrollbar">
      <Menu />
    </div>
    <div
      v-if="!isMobile && leftCollapsed" class="w-100% flex-shrink-0 ant-pro-sider-collapsed-button"
      :class="theme === 'inverted' ? 'ant-pro-sider-collapsed-button-inverted' : ''"
    >
      <!-- <a-menu
        class="ant-pro-sider-menu"
        mode="inline"
        :theme="theme === 'inverted' ? 'dark' : 'light'"
        :selectable="false"
        @click="handleCollapsed?.(!collapsed)"
      > -->
      <a-menu
        class="ant-pro-sider-menu themes" :theme="theme === 'inverted' ? 'dark' : 'light'"
        :selectable="false"
      >
        <a-menu-item :style="{ width: !collapsed ? '76px' : '34px', padding: collapsed ? '16px 0 0 0' : '16px 0 0 0' }">
          <template #icon>
            <div :style="{ width: !collapsed ? '76px' : '34px' }" class="themeIcon">
              <img width="15" height="15" src="@/assets/theme.svg" alt="">
              <span v-if="!collapsed">换肤</span>
            </div>
          </template>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<style lang="less">
@import './index.less';
.ant-pro-sider-collapsed-button{
    border: none !important;
  }
.ant-pro-sider-menu.themes {
  height: 60px;
  .ant-menu-item-only-child {
    margin: 0 auto;
    &:hover {
      background: transparent !important;
    }
  }

  .themeIcon {
    height: 24px;
    border-radius: 12px;
    background-color: #f2f7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    font-size: 12px !important;
    color: #29354d;
    img{
      margin-right: 4px;
    }
  }
}
</style>
