<script setup lang="ts">
import Header from '../components/header/index.vue'
import SiderMenu from '../components/sider-menu/index.vue'
import DrawerMenu from '../components/drawer-menu/index.vue'
import Menu from '../components/menu/index.vue'
import SplitMenu from '../components/menu/split-menu.vue'
import GlobalFooter from '../components/global-footer/index.vue'
import { proLayoutProps } from './typing'
import { useLayoutProvider } from './context'

defineOptions({
  name: 'BasicLayout',
})
const props = defineProps(proLayoutProps)
const emit = defineEmits(['update:collapsed'])
const slots = defineSlots<{
  renderFooterLinks?: () => any
  headerActions?: () => any
  headerContent?: () => any
  contentPrefix?: () => any
  default: () => any
  footerRender?: () => any
  [key: string]: any
}>()
/**
 * 处理展开收起的事件参数
 * @param collapsed 展开收起的事件参数
 */
function handleCollapsed(collapsed: boolean) {
  emit('update:collapsed', collapsed)
  props?.onCollapsed?.(collapsed)
}

// 依赖注入所有的配置项，对属性进行控制，减少传值
const { layout, contentWidth } = useLayoutProvider(props, {
  handleCollapsed,
})
const contentCls = computed(() => {
  if (contentWidth.value === 'Fixed')
    return 'ant-pro-basicLayout-content-fixed'

  else
    return ''
})
</script>

<template>
  <div class="ant-pro-basicLayout" :data-theme="theme">
    <a-layout>
      <template v-if="menu">
        <SiderMenu v-if="layout !== 'top' && !isMobile" />
      </template>
      <a-layout>
        <template v-if="header">
          <Header>
            <template v-if="slots.headerActions" #headerActions>
              <slot name="headerActions" />
            </template>
            <template v-if="slots.headerContent || layout === 'top' || layout === 'mix'" #headerContent>
              <slot name="headerContent">
                <Menu v-if="!isMobile && layout === 'top'" />
                <!-- 分割菜单的模式 -->
                <SplitMenu v-if="!isMobile && layout === 'mix' && props.splitMenus" />
              </slot>
            </template>
          </Header>
        </template>
        <slot name="contentPrefix" />
        <a-layout-content class="ant-pro-basicLayout-content" flex flex-col>
          <div h-full flex flex-col flex-1 :class="contentCls">
            <slot />
          </div>
        </a-layout-content>
        <a-layout-footer v-if="footer" style="background-color: transparent;">
          <slot name="footerRender">
            <GlobalFooter :copyright="copyright">
              <template v-if="slots.renderFooterLinks" #renderFooterLinks>
                <footer-links />
              </template>
            </GlobalFooter>
          </slot>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <DrawerMenu v-if="menu" />
  </div>
</template>

<style lang="less">
@import './index.less';
.ant-menu-inline{
.ant-menu-sub {
  .ant-menu-item,.ant-menu-submenu-title {
    padding-left: 28px !important;
  }

  .ant-menu-title-content {

    &::before {
      display: inline-block;
      content: '';
      width: 6px;
      height: 6px;
      background-color: #c1cfe4;
      border-radius: 100px;
      vertical-align: middle;
      margin-right: 13px;
      transition: height .12s linear, background-color .3s ease-out;
      margin-top: -3px;
    }
    &:hover{
      &::before{
        background-color: var(--pro-ant-color-primary);;
      }
    }
  }
}

.ant-menu-sub {
  .ant-menu-item-selected{
    .ant-menu-title-content {
    &::before {
      height: 12px;
      background-color: var(--pro-ant-color-primary);
      transition: height .12s linear;
    }
  }
  }

}
}
.of-y-auto{
  &::-webkit-scrollbar{
    display: none;
  }
}
.ant-pro-basicLayout-content{
  margin: 12px;
  margin-top: 0;
}
.ant-menu-inline .ant-menu-item{
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}
</style>
