<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script setup>
  defineProps({
  title: {
    type: String,
    default: '自定义',
  },
  fontSize:{
    type: String,
    default: '12px',
  },
  fontWeight:{
    type: String,
    default: 'none',
  },
})
</script>

<style lang="less" scoped>
.title {
  position: relative;
  padding-left: 10px;
  color: #000;
  font-weight: v-bind(fontWeight);
  display: flex;
  align-items: center;
  font-size: v-bind(fontSize);
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
</style>