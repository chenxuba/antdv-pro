<template>
  <div class="face">
    <div class="faceInner">
      <div class="topTitle text-#000 text-6 font-800 pt-4" style="text-align: center;">智能人脸考勤系统</div>
      <div class="change-btn mb-3">
        <a-button :class="data == 1 ? 'active' : ''" class="mr-4 w-34 h-10">人脸采集</a-button>
        <a-button :class="data == 2 ? 'active' : ''" class="w-34 h-10 ">人脸考勤</a-button>
      </div>
      <div class="faceBody">
        <div class="faceTips">
          <!-- 今日待考勤 <span class="text-#0066ff mx-1">4</span>，今日考勤成功 <span class="text-#0066ff mx-1">1</span>，今日考勤成功未点名 <span
            class="text-#ff3333 mx-1">1</span> 人 -->
          请单人采集，人脸采集成功后，前往“人脸考勤”进行考勤
        </div>
        <div class="face-wrap flex">
          <div class="face-left">
            <div class="cameraPic">
              <div class="moveLine"></div>
            </div>
            <div class="tips">抱歉，未找到摄像头，请检查后重试</div>
          </div>
          <div class="face-right">
            <div class="t">学员人脸采集</div>
            <div class="con">
              <a-select allowClear :filter-option="filterOption" show-search v-model:value="student"
                style="width: 100%;" placeholder="搜索学员姓名/手机号" option-label-prop="label" :data="item">
                <a-select-option v-for="(item, index) in studentList" :key="index" :value="item.id" :label="item.name">
                  <div class="flex justify-between flex-items-center">
                    <div>
                      <span>{{ item.name }}</span>
                      <span class="text-3 text-#888 ml-2 font-300">{{ item.phone }}</span>
                    </div>
                    <span class="bg-#eee px-2.5 py-0.5 text-3 rounded-10">未采集</span>
                  </div>
                </a-select-option>
              </a-select>
              <div class="faceNoDataBox">
                请先选择一位学员进行人脸采集
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-right: 20px;">
        <div class="faceBottom">
        <div class="t">注意事项</div>
        <div class="li">
          <div>面部平视摄像</div>
          <div>被遮挡</div>
          <div>面部平视摄像</div>
          <div>面部平视摄像</div>
        </div>
        <ul>
          <li>若人脸考勤无反应，请刷新浏览器再次尝试；如无法正常使用，请切换为谷歌浏览器</li>
          <li>未注册的学员，不能完成考勤，需要 1 秒人脸采集</li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const data = ref(null)
const student = ref(undefined)
const studentList = ref([
  { id: 1, name: "张晨", phone: "17601241636", status: 0 },
  { id: 2, name: "李元芳", phone: "18899238823", status: 0 },
  { id: 3, name: "潘金莲", phone: "15782827732", status: 0 },
  { id: 4, name: "武松", phone: "17866232253", status: 0 },
])
const filterOption = (input, option) => {
  // 获取所有待匹配字段
  const name = option.label?.toString() || '';       // 主标签字段
  const value = option.data?.value?.toString() || ''; // 电话号码
  const phone = option.data?.phone?.toString() || ''; // 电话号码
  const course = option.data?.course?.toString() || ''; // 新增课程字段

  // 统一格式处理
  const normalizedInput = input.toLowerCase().trim();
  const searchContent = [
    name.toLowerCase(),
    value.toLowerCase(),
    phone.toLowerCase(),
    course.toLowerCase()
  ].join(' '); // 合并所有字段为搜索字符串

  return searchContent.includes(normalizedInput);
};
onMounted(() => {
  // 直接获取参数
  const type = route.query.type
  console.log('参数变化:', type)
  document.title = type == 1 ? '人脸采集' : "人脸考勤"
  data.value = type
})

// 监听参数变化（重要！）
watch(
  () => route.query.type,
  (newType) => {
    console.log('参数变化:', newType)
    // 这里可以执行数据加载等操作
  }
)
</script>

<style lang="less" scoped>
.face {
  width: 100%;
  min-height: 100vh;
  background: #f0f0fb;
  padding-bottom: 30px;
  .faceInner {
    width: 960px;
    margin: 0 auto;

    .active {
      background: #06f;
      border-color: #06f;
      box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
      color: #fff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
      font-weight: bold;
    }

    .faceBody {
      width: 100%;
      height: 545px;
      background: url("https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/face-bg-new.d77f45f0.png");
      background-size: 100% 100%;
      margin-left: -11px;
      padding: 16px 34px 32px;

      .faceTips {
        color: #222;
        font-size: 12px;
        display: flex;
        align-items: center;
        height: 36px;
        margin-bottom: 14px;
        border: 1px solid;
        border-radius: 4px;
        border-image: linear-gradient(94deg, #fff, hsla(0, 0%, 100%, .13)) 1 1;
        color: #222;
        background: rgba(159, 196, 253, .28);
        box-shadow: 0 1px 4px 0 rgba(142, 185, 230, .35), inset 0 -1px 1px 0 #fcfffc, inset 1px 1px 0 0 hsla(0, 0%, 100%, .74), inset 0 1px 0 0 rgba(153, 208, 255, .45);
        backdrop-filter: blur(25.085829px);
        padding-left: 20px;
      }

      .face-wrap {
        display: flex;
        justify-content: space-between;

        .face-left {
          width: 600px;
          height: 450px;
          margin-right: 14px;
          background: url("https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/face-init.611d0d29.png");
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding-top: 118px;

          .cameraPic {
            width: 67px;
            height: 65px;
            background: url("https://pcsys.admin.ybc365.com//172d2f4e-dd0a-40a6-8278-766575e19367.png");
            background-size: 100% 100%;
            position: relative;

            .moveLine {
              position: absolute;
              left: -5px;
              width: 77px;
              height: 22px;
              background: url("https://pcsys.admin.ybc365.com//0fead903-f008-4633-83dc-eb12b5333452.png") no-repeat;
              background-size: contain;
              animation: moveUpDown 2s linear infinite;
            }
          }

          @keyframes moveUpDown {

            0%,
            to {
              top: 0
            }

            50% {
              top: 60px
            }
          }

          .tips {
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            line-height: 4;

            &::before {
              display: inline-block;
              content: "";
              width: 8px;
              height: 8px;
              margin-right: 5px;
              border-radius: 4px;
              background: #f33;
            }
          }
        }

        .face-right {
          flex: 1;
          height: 450px;
          background: red;
          background: url('https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/face-title-bg-new.3c96e3f1.png');
          background-size: 100% 100%;

          .t {
            height: 38px;
            line-height: 44px;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
          }

          .con {
            padding: 12px;

            .faceNoDataBox {
              background: url("https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/face-no-data-new.f42af9dd.png") no-repeat center;
              background-size: 160px 100px;
              height: 290px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 55px;
              color: #888;
            }
          }
        }
      }
    }

    .faceBottom {
      width: 100%;
      height: 218px;
      background: url("https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/face-bottom-bg-new.bb4e8d81.png");
      background-size: 100% 100%;
      padding: 30px 26px 0;
      margin-right: 20px;
      
      .t {
        margin-bottom: 24px;
        font-family: PingFangSC-Medium, PingFang SC, sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #222;
      }

      .li {
        display: flex;
        justify-content: space-between;

        div {
          text-align: right;
          flex: 1;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 60px;

          &:first-child {
            background: url('https://pcsys.admin.ybc365.com//4f4e1526-6335-45df-b9ea-80fd5ddc0d67.png');
            background-size: 100% 100%;
            padding-top: 4px;
          }

          &:nth-child(2) {
            background: url('https://pcsys.admin.ybc365.com//67fc388d-8075-4be0-82f8-56b19323886f.png');
            background-size: 100% 100%;
            padding-top: 2px;
            padding-right: 28px;
          }

          &:nth-child(3) {
            background: url('https://pcsys.admin.ybc365.com//d692d98c-24f6-44b8-bd25-9942076f46dd.png');
            background-size: 100% 100%;
            padding-right: 44px;
          }

          &:nth-child(4) {
            background: url('https://pcsys.admin.ybc365.com//f2e8bf11-e7b3-4cd2-95b9-c81c0bf25910.png');
            background-size: 100% 100%;
            padding-left: 66px;
          }
        }
      }
      ul{
        padding-left: 18px;
        font-size: 14px;
        color: #888;
        margin-top: 18px;
      }
    }
  }
}
</style>