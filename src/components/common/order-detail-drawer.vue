<template>
  <div>
    <a-drawer v-model:open="openDrawer" :bodyStyle="{ padding: '0', background: '#fff' }" :closable="false"
      width="1165px" placement="right">
      <!-- 自定义头部 -->
      <template #title>
        <div class="custom-header flex justify-between h-4 flex-items-center">
          <div class="text-5">订单详情</div>
          <a-button type="text" @click="openDrawer = false" class="close-btn">
            <template #icon>
              <CloseOutlined class="text-5 close-icon" />
            </template>
          </a-button>
        </div>
      </template>
      <div class="px6 py4">
        <div class="flex flex-items-center justify-between">
          <span>订单状态：已完成</span>
          <a-space>
            <a-button>废除订单</a-button>
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    打印收据
                  </a-menu-item>
                  <a-menu-item key="2">
                    下载收据
                  </a-menu-item>
                  <a-menu-item key="3">
                    发送短信
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                查看收据
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <a-button type="primary">补费</a-button>
          </a-space>
        </div>
        <div class="error pl-4 mt-2 flex flex-items-center rounded-1 bg-#ffe6e6 text-#ff3333 h-10 text-3.5 mb-4">
          <ExclamationCircleFilled class="text-#ff3333 mr-2" /> 此订单尚有100.00元欠费未缴清
        </div>
        <div class="basic-info bg-#f6f7f8 rounded-4 p6 mb-6">
          <div class="t text-5 font-500 mb-5">审批信息</div>
          <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="审批编号">20250409001503604544860</a-descriptions-item>
            <a-descriptions-item label="审批状态">
              <div>
                <span class="dot"></span><span>审批通过</span>
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="当前审批人">- <a class="ml-1">查看审批流程</a> </a-descriptions-item>
            <a-descriptions-item label="申请人">龙钊</a-descriptions-item>
            <a-descriptions-item label="申请时间">2025-04-09 00:15</a-descriptions-item>
            <a-descriptions-item label="审批完成时间">2025-04-09 00:15</a-descriptions-item>
            <a-descriptions-item label="触发审批条件">
              <span class="text-#ff3333">不限制，订单提交/支付后即生成审批</span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="stu-info mb6">
          <div class="t text-5 font-500 mb-5 flex justify-between flex-center">
            <span>学员信息</span>
            <a class="text-3.5">查看学员详情</a>
          </div>
          <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="学员姓名">妞妞</a-descriptions-item>
            <a-descriptions-item label="手机号">
              <span class="flex flex-items-center">198****0917
                <EyeInvisibleOutlined class=" cursor-pointer text-#06f text-4 ml-1" />
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="order-info mb6">
          <div class="t text-5 font-500 mb-5 flex justify-between flex-center">
            <span>订单信息</span>
          </div>
          <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="订单编号">20250409001456920078965</a-descriptions-item>
            <a-descriptions-item label="办理类型">报名续费</a-descriptions-item>
            <a-descriptions-item label="经办人">龙钊</a-descriptions-item>
            <a-descriptions-item label="经办日期">
              <div class="flex flex-items-center">2025-04-09
                <FormOutlined class="text-#06f cursor-pointer ml1" />
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="订单来源">线下办理</a-descriptions-item>
            <a-descriptions-item label="创建时间">2025-04-09 00:14</a-descriptions-item>
            <a-descriptions-item label="完成时间">2025-04-09 00:15</a-descriptions-item>
            <a-descriptions-item label="对内备注">
              <div class="flex flex-items-center">-
                <FormOutlined class="text-#06f cursor-pointer ml1" />
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="对外备注">
              <div class="flex flex-items-center">-
                <FormOutlined class="text-#06f cursor-pointer ml1" />
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="订单销售员">
              <div class="flex flex-items-center">商老师
                <FormOutlined class="text-#06f cursor-pointer ml1" />
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="订单标签">
              <div class="flex flex-items-center">【内荐】、【转介绍】
                <FormOutlined class="text-#06f cursor-pointer ml1" />
              </div>
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="order-list mb-8">
          <div class="t text-5 font-500 mb-5 flex justify-between flex-center">
            <span>订单明细</span>
          </div>
          <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
            <a-descriptions-item label="整单总优惠">-¥0.00</a-descriptions-item>
            <a-descriptions-item label="整单优惠活动">-</a-descriptions-item>
            <a-descriptions-item label="订单总金额">
              <div class="flex flex-center justify-between w100%">
                <span>¥400.00</span>
                <div class="flex flex-items-center">
                  <a-popover placement="topRight">
                    <template #title>
                      <div style="border-bottom:1px solid #eee;padding-bottom: 6px;">说明</div>
                    </template>
                    <template #content>
                      <div class="text-#666">报价单 × 购买份数 - 单课优惠 - 分摊优惠金额 = 应收金额</div>
                    </template>
                    <QuestionCircleOutlined class="text-#06f cursor-pointer" />
                  </a-popover>
                  <span class="ml-0.5">计算公式</span>
                </div>
              </div>
            </a-descriptions-item>
          </a-descriptions>
          <div class="list">
            <a-row class="bg-#005ce60f px6 py4 border border-solid border-#eee border-b-none">
              <a-col :span="24" class="flex justify-between">
                <div class="flex flex-items-center">
                  <div class="text-4 font-500 mr-3">奥夫音乐课</div>
                  <a-space>
                    <span class="bg-#e6f0ff text-#06f text-3 rounded-10 px3 py1">班级授课</span>
                    <span class="bg-#e6f0ff text-#06f text-3 rounded-10 px3 py1">课时</span>
                  </a-space>
                </div>
                <div class="flex flex-items-center">续费
                  <FormOutlined class="text-#06f cursor-pointer ml1" />
                </div>
              </a-col>
            </a-row>
            <a-row class="bg-#eeeeee33 border border-solid border-#eee">
              <a-col :span="4" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">报价单</div>
                <span class="text-#000000a6">1课时/100元</span>
              </a-col>
              <a-col :span="3" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">购买份数</div>
                <span class="text-#000000a6">4份</span>
              </a-col>
              <a-col :span="3" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">赠送课时</div>
                <span class="text-#000000a6">0课时</span>
              </a-col>
              <a-col :span="3" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">有效期至</div>
                <span class="text-#000000a6">2025-09-23</span>
              </a-col>
              <a-col :span="3" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">单课优惠</div>
                <span class="text-#000000a6">¥100.00</span>
              </a-col>
              <a-col :span="4" class="px6 py5 border-0 border-r border-solid border-#eee">
                <div class="text-#222 font500 mb-2">分摊整单优惠(元)</div>
                <span class="text-#000000a6">-¥0.00</span>
              </a-col>
              <a-col :span="4" class="px6 py5">
                <div class="text-#222 font500 mb-2">应收金额(元)</div>
                <span class="text-#000000a6">¥400.00</span>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="pay-data">
          <div class="t text-5 font-500 mb-5 flex justify-between flex-center">
            <span>支付记录</span>
          </div>
          <div class="items-list mb3">
            <div class="t  bg-#f0f5fe w-24 h-6 flex-center rounded-lt-2 rounded-rt-2">支付记录1</div>
            <div class="bg-#fbfbfb px6 py4">
              <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
                <a-descriptions-item label="支付金额">¥300.00</a-descriptions-item>
                <a-descriptions-item label="创建时间">2025-04-09 00:15</a-descriptions-item>
                <a-descriptions-item label="收款方式">微信</a-descriptions-item>
                <a-descriptions-item label="收款账户">默认账户</a-descriptions-item>
                <a-descriptions-item label="支付单号">-</a-descriptions-item>
                <a-descriptions-item label="对方账户">-</a-descriptions-item>
                <a-descriptions-item label="支付日期">
                  <div class="flex flex-items-center">2025-04-09
                    <FormOutlined class="text-#06f cursor-pointer ml1" />
                  </div>
                </a-descriptions-item>
                <a-descriptions-item label="账单备注">
                  <div class="flex flex-items-center">-
                    <FormOutlined class="text-#06f cursor-pointer ml1" />
                  </div>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
          <div class="items-list mb3">
            <div class="t  bg-#f0f5fe w-24 h-6 flex-center rounded-lt-2 rounded-rt-2">支付记录2</div>
            <div class="bg-#fbfbfb px6 py4">
              <a-descriptions :column="3" :contentStyle="{ color: '#888' }">
                <a-descriptions-item label="支付金额">¥100.00</a-descriptions-item>
                <a-descriptions-item label="创建时间">2025-04-09 00:15</a-descriptions-item>
                <a-descriptions-item label="收款方式">微信</a-descriptions-item>
                <a-descriptions-item label="收款账户">默认账户</a-descriptions-item>
                <a-descriptions-item label="支付单号">-</a-descriptions-item>
                <a-descriptions-item label="对方账户">-</a-descriptions-item>
                <a-descriptions-item label="支付日期">
                  <div class="flex flex-items-center">2025-04-09
                    <FormOutlined class="text-#06f cursor-pointer ml1" />
                  </div>
                </a-descriptions-item>
                <a-descriptions-item label="账单备注">
                  <div class="flex flex-items-center">-
                    <FormOutlined class="text-#06f cursor-pointer ml1" />
                  </div>
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { CloseOutlined, DownOutlined, ExclamationCircleFilled, EyeInvisibleOutlined, FormOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:open']);
// 处理双向绑定
const openDrawer = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});
</script>

<style lang="less" scoped>
/* 添加旋转动画 */
@keyframes icon-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

.close-btn {
  &:hover {
    background: transparent;

    .close-icon {
      animation: icon-rotate 0.3s linear;
    }
  }
}

span.dot {
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  position: relative;
  vertical-align: middle;
  width: 6px;
  margin-right: 4px;
  background: #00cc33;
}
</style>