<template>
  <div class="tab-content mt-2">
    <!-- 意向学员录入设置 -->
    <div class="setting">
      <div class="title">意向学员录入设置</div>
      <div class="tips mt-2">
        <ExclamationCircleFilled class="mr-2" /> 姓名 + 手机号都重复的意向学员信息，均不允许录入！
      </div>
      <div class="table-wrap">
        <table border>
          <tbody>
            <tr>
              <td class="td1" rowspan="2">新增意向学员</td>
              <td>
                <a-radio-group class="custom-radio" v-model:value="newAddSetting" name="radioGroup">
                  <a-radio value="1">限制录入手机号和姓名同时相同的学员</a-radio>
                  <a-radio value="2">限制录入手机号相同的学员</a-radio>
                  <a-radio value="3">限制录入姓名相同的学员</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr>
              <td><a-checkbox v-model:checked="checked">限制录入微信号相同的学员</a-checkbox></td>
            </tr>
            <tr>
              <td class="td1" rowspan="2">导入学员</td>
              <td>
                <a-radio-group class="custom-radio" v-model:value="importSetting" name="radioGroup">
                  <a-radio value="1">限制录入手机号和姓名同时相同的学员</a-radio>
                  <a-radio value="2">限制录入手机号相同的学员</a-radio>
                  <a-radio value="3">限制录入姓名相同的学员</a-radio>
                </a-radio-group>
              </td>
            </tr>
            <tr>
              <td><a-checkbox v-model:checked="importChecked">限制录入微信号相同的学员</a-checkbox></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
  <div class="setting before mt-2">
    <div class="title">售前人员设置</div>
    <div class="table-wrap">
      <a class="font-800">去设置
        <RightOutlined />
      </a>
    </div>
  </div>
  <div class="tab-content mt-2">
    <!-- 意向学员录入设置 -->
    <div class="setting">
      <div class="title mb-2.5">公有池设置</div>
      <div class="table-wrap">
        <table border>
          <tbody>
            <tr>
              <td class="td1" rowspan="2">公有池</td>
              <td>
                <div class="checked">
                  <span class="flex flex-center justify-start text-#666"><a-switch class="mr-2" @change="changeSwitch" v-model:checked="publicChecked" checked-children="开" un-checked-children="关" /> 开启后，系统会自动将没有销售员的意向学员汇总到公有池，方便管理和再次分配</span>
                </div>
                <div class="tip mt-5 pl-13">未跟进时间超过 <span class="day">7</span> 天的意向学员将自动进入公有池 <FormOutlined @click="handleSetting" class="icon" /></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
  <!-- 未跟进天数进公有池设置model -->
  <a-modal centered  v-model:open="openModel" title="未跟进天数设置" width="437px" >
      <div class="setting-wrap">
        <div class="settingPoolCont flex flex-center justify-start">未跟进<a-input-number class="w-34 ml-2 mr-2" v-model:value="dayNum" :min="1"  /> 天</div>
        <div class="setting-tip mt-3 text-#888">设置后，超过未跟进时间的学员进入公有池</div>
      </div>
    </a-modal>
</template>

<script setup>
import { ExclamationCircleFilled, RightOutlined,FormOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
const newAddSetting = ref('1')
const importSetting = ref('1')
const checked = ref(false);
const importChecked = ref(false);
const publicChecked = ref(true)
const openModel = ref(false)
const dayNum = ref(1)
const handleSetting = ()=>{
  openModel.value = true
}
const emit = defineEmits(['diaplayPublicData']);

const changeSwitch = (e)=>{
  emit('diaplayPublicData',e)
}
</script>

<style lang="less" scoped>
.tab-content {
  background: #fff;
  border-radius: 12px;
  padding: 12px 20px;

  /* 自定义镂空样式 */
  .custom-radio ::v-deep(.ant-radio-wrapper:hover .ant-radio),
  .custom-radio ::v-deep(.ant-radio:hover .ant-radio-inner),
  .custom-radio ::v-deep(.ant-radio-input:focus + .ant-radio-inner) {
    border-color: var(--pro-ant-color-primary);
  }

  .custom-radio ::v-deep(.ant-radio-inner) {
    background-color: transparent;
    border-color: #d9d9d9;
  }

  .custom-radio ::v-deep(.ant-radio-checked .ant-radio-inner) {
    background-color: transparent;
    border-color: var(--pro-ant-color-primary);
  }

  .custom-radio ::v-deep(.ant-radio-inner::after) {
    background-color: var(--pro-ant-color-primary);
    transform: scale(0.5);
  }

  .setting {

    .title {
      font-size: 18px;
      color: #222;
      font-weight: 600;
      display: flex;
      align-items: center;

      &::before {
        display: inline-block;
        content: '';
        width: 4px;
        height: 14px;
        background: var(--pro-ant-color-primary);
        border-radius: 100px;
        margin-right: 6px;
      }
    }

    .tips {
      height: 40px;
      display: flex;
      align-items: center;
      background: var(--pro-ant-color-primary-bg-hover);
      color: var(--pro-ant-color-primary);
      padding: 0 24px;
      font-size: 14px;
      margin-bottom: 8px;
      border-radius: 4px;
      justify-content: flex-start;
    }

    .table-wrap {
      a {
        display: flex;
        align-items: center;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #eee;
        border-radius: 8px;

        tr,
        td {
          border: 1px solid #eee;
        }

        td {
          padding: 18px 24px;
        }

        .td1 {
          width: 200px;
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222;
        }
      }
      .day{
        color: var(--pro-ant-color-primary);
        font-weight: bold;
        font-size: 14px;
      }
      .icon{
        color: var(--pro-ant-color-primary);
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
}

.before {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
  border-radius: 12px;
  align-items: center;
  .title {
    font-size: 18px;
    color: #222;
    font-weight: 600;
    display: flex;
    align-items: center;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 14px;
      background: var(--pro-ant-color-primary);
      border-radius: 100px;
      margin-right: 6px;
    }
  }

  .table-wrap {
    font-size: 14px;
    a{
      color: var(--pro-ant-color-primary);
    }
  }
}
.setting-wrap{
  background: #f6f7f8;
    border-radius: 8px;
    padding: 16px;
}
</style>
