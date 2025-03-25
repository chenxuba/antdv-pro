<script setup lang="ts">
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons-vue';

</script>

<template>
  <div class="home">
    <div class="sheet">
      <span>快捷筛选：</span>
      <a-button type="primary" size="small">今日待跟进（1）</a-button>
      <a-button type="default" size="small" style="margin: 0 12px;">本周新增（0）</a-button>
      <a-button type="default" size="small">逾期未回访（0）</a-button>
    </div>
    <div class="sheet">
      <span>已选条件：</span>
      <a-tag color="red">清空已选
        <DeleteOutlined />
      </a-tag>
      <a-tag color="blue">快捷筛选：今日待跟进
        <CloseOutlined  :style="{ fontSize: '10px' }"/>
      </a-tag>
      <a-tag color="blue">渠道：场地预约、跨校办理
        <CloseOutlined  :style="{ fontSize: '10px' }"/>
      </a-tag>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  border-radius: 10px;
  background: #fff;
  line-height: 40px;
  padding: 0 12px;
}
</style>
