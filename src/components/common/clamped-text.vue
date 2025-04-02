<template>
  <a-tooltip v-if="isOverflow" :title="text">
    <div ref="contentRef" :style="clampStyle">{{ text }}</div>
  </a-tooltip>
  <div v-else ref="contentRef" :style="clampStyle">{{ text }}</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'

const props = defineProps({
  text: String,
  lines: {
    type: Number,
    default: 2,
    validator: val => val >= 1
  }
})

const contentRef = ref(null)
const isOverflow = ref(false)
let rafId = null
let observer = null

const clampStyle = computed(() => ({
  display: '-webkit-box',
  WebkitLineClamp: props.lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineClamp: props.lines,
}))

// 优化后的计算方法
const checkOverflow = async () => {
  await nextTick()
  const el = contentRef.value
  if (!el) return

  // 完全展开元素查看原始尺寸
  const originalStyle = {
    display: el.style.display,
    webkitLineClamp: el.style.webkitLineClamp
  }

  // 解除限制测量真实高度
  el.style.display = '-webkit-box'
  el.style.webkitLineClamp = 'unset'

  // 强制同步布局
  void el.offsetHeight // Trigger reflow

  // 获取展开后的完整行数
  const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20 // 默认20px
  const actualLines = Math.round(el.scrollHeight / lineHeight)

  // 恢复原始样式
  el.style.display = originalStyle.display
  el.style.webkitLineClamp = originalStyle.webkitLineClamp

  isOverflow.value = actualLines > props.lines
}

// 防抖处理
const debouncedCheck = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    checkOverflow()
  })
}

// 响应props和内容变化
watch([() => props.text, () => props.lines], debouncedCheck)

onMounted(() => {
  observer = new ResizeObserver(debouncedCheck)
  if (contentRef.value) {
    observer.observe(contentRef.value)
  }
  // 延迟初始化检查
  setTimeout(debouncedCheck, 100)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>