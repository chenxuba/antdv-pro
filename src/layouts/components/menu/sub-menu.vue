<script setup lang="ts">
import { isFunction, isUrl } from '@v-c/utils'
import type { VNodeChild } from 'vue'
import AsyncIcon from './async-icon.vue'
import type { MenuDataItem } from '~@/layouts/basic-layout/typing'

withDefaults(defineProps<{ item: MenuDataItem, link?: boolean }>(), {
  link: true,
})
function renderTitle(title: VNodeChild | (() => VNodeChild)) {
  if (isFunction(title))
    return title()

  return title
}
</script>

<template>
  <template v-if="item.children && !item.hideChildrenInMenu">
    <a-sub-menu :key="item.path">
      <template v-if="item.icon" #icon>
        <AsyncIcon :icon="item.icon" />
      </template>
      <template #title>
        {{ renderTitle(item.title) }}
      </template>
      <template v-for="menu in item.children">
        <template v-if="!menu.hideInMenu">
          <template v-if="menu.children">
            <sub-menu :key="menu.path" :item="menu" />
          </template>
          <template v-else>
            <a-menu-item :key="menu.path">
              <template v-if="menu.icon" #icon>
                <AsyncIcon :icon="menu.icon" />
              </template>
              <template v-if="!isUrl(menu.path)">
                <RouterLink v-if="link" :to="menu.path">
                  {{ renderTitle(menu.title) }} <span  v-if="menu.new" class="new">新</span>
                </RouterLink>
                <template v-else>
                  {{ renderTitle(menu.title) }}<span  v-if="menu.new" class="new">新</span>
                </template>
              </template>
              <template v-else>
                <a :href="menu.path" :target="menu.target ?? '_blank'">
                  {{ renderTitle(menu.title) }}<span  v-if="menu.new" class="new">新</span>
                </a>
              </template>
            </a-menu-item>
          </template>
        </template>
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.path">
      <template v-if="item.icon" #icon>
        <AsyncIcon :icon="item.icon" />
      </template>
      <template v-if="!isUrl(item.path)">
        <RouterLink v-if="link" :to="item.path">
          {{ renderTitle(item.title) }}
        </RouterLink>
        <template v-else>
          {{ renderTitle(item.title) }}
        </template>
      </template>
      <template v-else>
        <a :href="item.path" :target="item.target ?? '_blank'">
          {{ renderTitle(item.title) }}
        </a>
      </template>
    </a-menu-item>
  </template>
</template>
<style lang="less" scoped>
  .new{
    background: red;
    font-size: 10px;
    position: relative;
    top: -4px;
    color: #fff;
    padding:  2px 4px 3px 4px;
    border-radius: 20px 20px 20px 0;
    margin-left: 4px;
    font-weight: bold;
  }
</style>