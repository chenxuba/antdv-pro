<template>
  <div class="follow-up-record p3 pr0">
    <div class="record bg-white rounded-3 p3">
      <div class="t flex flex-center justify-between border border-b-solid border-color-#eee pb2">
        <span class="text-4 font-500">跟进信息</span>
        <a-button>添加跟进记录</a-button>
      </div>
      <div class="timeLine mt-8 pl-3">
        <a-timeline>
          <a-timeline-item v-for="(item,index) in list" :key="index">
            <div>
              <div class="time h-8 bg-#06f rounded-10 px-4 flex flex-center w-40 text-#fff">2025-04-13 10:35</div>
              <div class="bg-#fafafa p4 rounded-2 mt-3">
                <div class="name flex justify-between flex-center">
                  <div class="flex-center">
                    <span class="w-10 h-10 rounded-10 bg-#06f text-#fff flex-center text-4">龙</span>
                    <span class="text-#666 ml-3 text-3.5">龙钊</span>
                  </div>
                  <div>
                    <a type="text" class="text-#06f">编辑</a>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="content text-#222 mt-4 mb-2">
                    客户说下午来机构，准备报名100000元的课程，卧槽老板发财了！！！客户说下午来机构，准备报名100000元的课程，卧槽老板发财了！！！客户说下午来机构，准备报名100000元的课程，卧槽老板发财了！！！
                  </div>
                  <div class="content-img">
                    <a-space>
                      <a-image :width="80" class=" rounded-1"
                        src="https://pic.rmb.bdstatic.com/bjh/240111/a30ee3a731f0c8a071c91b9e7128d17a7303.jpeg@h_1280"
                        alt="" />
                      <a-image :width="80" class=" rounded-1"
                        src="https://ww4.sinaimg.cn/mw690/008ql2Izly1hw6ukttw5cj30qs0qs180.jpg" alt="" />
                      <a-image :width="80" class=" rounded-1"
                        src="https://pic1.zhimg.com/v2-19b7d28a9c81f8a232481a7e5fe1c177_r.jpg?source=2c26e567" alt="" />
                    </a-space>
                  </div>
                </div>
                <div class="type text-#888 text-3">跟进方式：电话</div>
                <div class="type text-#888 text-3">意向课程：初级感统课、初级言语课</div>
                <div class="type text-#888 text-3 flex-center justify-start mt-2">下次跟进时间：
                  <div
                    class="bg-#eee rounded-1 px3 py1">2025-04-10 19:22 <span class="text-#ff3333 bg-#ffe6e6 px1.5 py0.5 mx2">未回访</span> 
                    <a> <CheckOutlined /> 标记为已回访</a>
                  </div>
                </div>
              </div>
            </div>
          </a-timeline-item>
          <a-timeline-item v-if="list.length>0">
            <span style="position: relative;top: 6px;">到底了～</span>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckOutlined } from '@ant-design/icons-vue';
const list = ref([{},{},{},{},])
</script>

<style lang="less" scoped>
.timeLine {
  :deep(.ant-timeline-item-content) {
    inset-block-start: -12px;
  }
}
</style>