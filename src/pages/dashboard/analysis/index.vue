<script setup lang="ts">
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons-vue';

</script>

<template>
  <div class="home">
    <div class="sheet">
      <span>快捷筛选：</span>
      <a-button type="primary" class="bg-[var(--pro-ant-color-primary)]" size="small">今日待跟进（1）</a-button>
      <a-button type="default" size="small" style="margin: 0 12px;">本周新增（0）</a-button>
      <a-button type="default" size="small">逾期未回访（0）</a-button>
    </div>
    <div class="sheet">
      <span>筛选条件：</span>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
      <a-button class="h-28px flex filter-btn mr-2"  type="default">意向度 <div class="num">3</div> </a-button>
    </div>
    <div class="sheet">
      <span>已选条件：</span>
      <a-tag color="red">清空已选
        <DeleteOutlined />
      </a-tag>
      <a-tag color="blue">快捷筛选：今日待跟进
        <CloseOutlined style="cursor: pointer;" :style="{ fontSize: '10px' }" />
      </a-tag>
      <a-tag color="blue">渠道：场地预约、跨校办理
        <CloseOutlined style="cursor: pointer;" :style="{ fontSize: '10px' }" />
      </a-tag>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(@/assets/styles/common.css);
.home {
  width: 100%;
  border-radius: 10px;
  background: #fff;
  line-height: 40px;
  padding: 0 12px;

  .sheet {
    display: flex;
    align-items: center;

    .num {
      background: #f33;
      color: #fff;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      margin-left: 6px;
      display: flex;
      justify-content: center;
      width: 16px;
      border-radius: 100px;
      font-weight: 600;
    }
  }
}
</style>
