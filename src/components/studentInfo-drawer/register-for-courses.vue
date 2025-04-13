<template>
  <div class="register-for-courses p3 pr0">
    <a-space class="flex flex-wrap">
      <div class=" bg-white w-92.5 h-44 rounded-2" v-for="(item, index) in 5" :key="index">
        <div class="t flex justify-between p4 pb0 flex-items-center">
          <span class="text-4 text-#222 font-500 flex-1 line-clamp-1 mr-10">一对一认知课</span>
          <EllipsisOutlined class="text-5 ont-500" />
        </div>
        <div class="tag px3 mt1">
          <a-space>
            <span class="bg-#06f text-#fff text-3 rounded-10 px3 py1">通用课</span>
            <span class="bg-#e6f0ff text-#06f text-3 rounded-10 px3 py1">班级授课</span>
            <span class="bg-#e6f0ff text-#06f text-3 rounded-10 px3 py1">课时</span>
          </a-space>
        </div>
        <div class="remaining-class-hours px3 text-3 text-#888 mt-5 flex justify-between">
          <span>剩余课时：3（含赠送 1 课时）</span>
          <span class="bg-#e6f0ff text-#06f text-3 rounded-10 px2 py0.5 pb0 flex-center cursor-pointer"><img
              class="mt--0.6"
              src="https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/left-detail.8a056096.svg"
              alt=""> 剩余详情</span>
        </div>
        <div class="validity px3 text-#888 flex justify-start flex-items-center">
          <span class="text-3 ">有效期至：2025-04-13</span>
          <a-popover >
            <template #title>
              <div style="border-bottom:1px solid #eee;padding-bottom: 6px;">字段说明</div>
            </template>
            <template #content>
              <div class="text-#666">此有效期展示为历史报名订单中，最长的有效期。</div>
              <div class="text-#666">具体每次报名有效期，请点击剩余详情进行查看。</div>
            </template>
            <QuestionCircleOutlined class="ml-2 mb-0.5" />
          </a-popover>
        </div>
        <div class="line w-100% h-0.25 bg-#eee mt2"></div>
        <div class="btn mt2 flex justify-end pr3">
          <a-button size="small" class=" text-#666" style="font-size: 12px;border-radius: 10px;padding: 0 10px;">查看一对一</a-button>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script setup>
import { EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';

</script>

<style lang="less" scoped></style>