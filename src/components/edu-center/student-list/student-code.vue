<template>
 <div>
  <div class="student-code bg-white p-4 rounded-b-4">
    <div class="flex flex-items-center justify-between">
      <div class="flex ">
        <custom-title title="已选属性 (12)" font-size="18px" font-weight="600"></custom-title> <span
          class="mt-1 flex flex-items-center text-3 ml-4 text-#888">带 <span
            class="text-red text-4 ml-1 mr-1 mt-1 flex">*</span>
          为学员必填属性</span>
      </div>
      <div>
        <a-button class="mr-4">自动升年级</a-button>
        <a-button type="primary">新增学员属性</a-button>
      </div>
    </div>
    <div class="content pl-2.5 mt-2 mb-4">
      <div class="subTitle text-3.5 text-#222 font-500 mb-3">系统默认（10）</div>
      <a-space :size="12" class="flex flex-wrap">
        <div v-for="(item,index) in itemList" :key="index"
          class="item bg-#f6f7f8 w-60 h-10 rounded-1.5 text-3.5 text-#222 flex flex-items-center pl-3 pr-3 justify-between">
          <div class="flex-center">
            <span :class="item.require?'text-red':'text-#f6f7f8'" class="text-5 mt-1.5 mr-1"  >*</span><span>{{ item.title }}</span>
          </div>
          <div>
            <FormOutlined class="icon cursor-pointer" v-if="!item.system" />
            <MinusCircleFilled v-if="!item.system&&item.edit" class="ml-3 cursor-pointer" style="color: red;" />
          </div>
        </div>
      </a-space>
    </div>
     <div class="content pl-2.5 mt-2 mb-4">
      <div class="subTitle text-3.5 text-#222 font-500 mb-3">自定义（2）</div>
      <a-space :size="12" class="flex flex-wrap">
        <div v-for="(item,index) in itemListCustom" :key="index"
          class="item bg-#f6f7f8 w-60 h-10 rounded-1.5 text-3.5 text-#222 flex flex-items-center pl-3 pr-3 justify-between">
          <div class="flex-center">
            <span :class="item.require?'text-red':'text-#f6f7f8'" class="text-5 mt-1.5 mr-1"  >*</span><span>{{ item.title }}</span>
          </div>
          <div>
            <FormOutlined class="icon cursor-pointer" v-if="!item.system" />
            <MinusCircleFilled v-if="!item.system&&item.edit" class="ml-3 cursor-pointer" style="color: red;" />
          </div>
        </div>
      </a-space>
    </div>
  </div>
  <div class="student-code bg-white p-4 rounded-4 mt-4">
    <div class="flex flex-items-center justify-between">
      <div class="flex ">
        <custom-title title="未选属性 (1)" font-size="18px" font-weight="600"></custom-title> <span
          class="mt-1 flex flex-items-center text-3 ml-4 text-#888">带 <span
            class="text-red text-4 ml-1 mr-1 mt-1 flex">*</span>
          为学员必填属性</span>
      </div>
    </div>
    <div class="content pl-2.5 mt-2 mb-4">
      <div class="subTitle text-3.5 text-#222 font-500 mb-3">系统默认（1）</div>
      <a-space :size="12" class="flex flex-wrap">
        <div v-for="(item,index) in itemListSystem" :key="index"
          class="item bg-#f6f7f8 w-60 h-10 rounded-1.5 text-3.5 text-#222 flex flex-items-center pl-3 pr-3 justify-between">
          <div class="flex-center">
            <span :class="item.require?'text-red':'text-#f6f7f8'" class="text-5 mt-1.5 mr-1"  >*</span><span>{{ item.title }}</span>
          </div>
          <div>
            <FormOutlined class="icon cursor-pointer" v-if="!item.system" />
            <PlusCircleFilled v-if="!item.system&&item.edit" class="ml-3 cursor-pointer icon"  />
          </div>
        </div>
      </a-space>
    </div>
     <div class="content pl-2.5 mt-2 mb-4">
      <div class="subTitle text-3.5 text-#222 font-500 mb-3">自定义（2）</div>
      <a-space :size="12" class="flex flex-wrap">
        <div v-for="(item,index) in itemListCustomD" :key="index"
          class="item bg-#f6f7f8 w-60 h-10 rounded-1.5 text-3.5 text-#222 flex flex-items-center pl-3 pr-3 justify-between">
          <div class="flex-center">
            <span :class="item.require?'text-red':'text-#f6f7f8'" class="text-5 mt-1.5 mr-1"  >*</span><span>{{ item.title }} <span class="text-#ccc">(文本)</span> </span>
          </div>
          <div>
            <DeleteOutlined class="mr-3 cursor-pointer" style="color:red;" />
            <FormOutlined class="icon cursor-pointer" v-if="!item.system" />
            <PlusCircleFilled  v-if="!item.system&&item.edit" class="ml-3 cursor-pointer icon"  />
          </div>
        </div>
      </a-space>
    </div>
  </div>
 </div>
</template>

<script setup>
import {
  FormOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  DeleteOutlined
  
} from '@ant-design/icons-vue';
const itemList = ref([
  {id:1,require:true,title:"学员姓名",system:true,edit:false},
  {id:2,require:true,title:"手机号",system:true,edit:false},
  {id:3,require:true,title:"手机号归属人",system:true,edit:false},
  {id:4,require:false,title:"渠道",system:false,edit:false},
  {id:5,require:false,title:"性别",system:false,edit:false},
  {id:6,require:false,title:"生日",system:false,edit:false},
  {id:7,require:false,title:"微信号",system:false,edit:true},
  {id:8,require:false,title:"年级",system:false,edit:true},
  {id:9,require:false,title:"就读学校",system:false,edit:true},
  {id:10,require:false,title:"家庭住址",system:false,edit:true},
])
const itemListCustom = ref([
  {id:1,require:false,title:"残疾证号",system:false,edit:true,type:1},
])
const itemListSystem = ref([
  {id:1,require:false,title:"兴趣爱好",system:false,edit:true},
])
const itemListCustomD = ref([
  {id:1,require:false,title:"身份证号",system:false,edit:true,type:1},
])
</script>

<style lang="less" scoped>
.icon {
  color: var(--pro-ant-color-primary);
}
</style>