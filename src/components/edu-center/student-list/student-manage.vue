<template>
  <div class="home">
    <!-- 快捷入口 -->
    <div class="kuaiRun">
      <custom-title title="快捷入口" fontSize="14px" fontWeight="500"></custom-title>
      <div class="items-list mt-4">
        <div class="items one ">
          <div class="items-t">
            <span class="text-3.5 text-#222 font-600">学员总数 4</span>
            <span class="text-3 text-#0066ff"> <i class="bg-#e6f0ff font-500">近1个月新增涨幅 -</i> <img class="ml--3"
                src="https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/go-up.5c9cb6eb.svg"
                alt=""></span>
          </div>
          <div class="items-b text-3.25 text-#888 mt-2">
            当前机构（在读+意向+历史）学员数量
          </div>
        </div>
        <div class="items" v-for="(item, index) in itemsList" :key="index">
          <div class="items-l">
            <img :src="item.icon" alt="">
          </div>
          <div class="items-r">
            <div class="text-#222">{{ item.name }}</div>
            <div class="text-#000 font-600 text-4 mt-1.5">{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap mt-2 bg-white  pl-3 pr-3 rounded-4">
      <all-filter :displayArray="displayArray" :is-quick-show="false" :isShowSearchStuPhone="true"></all-filter>
    </div>
    <!-- 学员列表 -->
     <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      学员列表
     </div>
  </div>
</template>

<script setup>
const itemsList = ref([
  { type: 1, name: "在读学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/reading-icon.a7ae1ed0.svg" },
  { type: 2, name: "历史学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/history-icon.f39cedb5.svg" },
  { type: 3, name: "意向学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/intention-icon.d6515e60.svg" },
  { type: 4, name: "待续费学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/renew-icon.50f2cafa.svg" },
  { type: 5, name: "欠费学员", num: 1, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/arrears-icon.6f028695.svg" },
  { type: 6, name: "待分班学员", num: 2, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/streaming-icon.703400f2.svg" },
  { type: 7, name: "生日学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/birthday-icon.7ec2c5c7.svg" },
  { type: 8, name: "待关注学员", num: 1, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/follow-icon.4393714e.svg" },
  { type: 9, name: "缺课学员", num: 0, icon: "https://prod-tbu-next-erp-cdn.schoolpal.cn/next-pc-static/static/12087/static/absentee-icon.5c1240ed.svg" },
])
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference'])
</script>

<style lang="less" scoped>
.home {
  .kuaiRun {
    padding: 12px 24px;
    background: #fff;
    border-radius: 0 0 16px 16px;

    .items-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .items {
        height: 80px;
        border-radius: 14px;
        background: #fbfcff;
        cursor: pointer;
        margin-right: 8px;
        margin-bottom: 8px;
        width: 165px;
        padding: 16px 8px;
        display: flex;

        &:hover {
          background: #e6f0ff;
        }

        i {
          font-style: normal;
          font-weight: bold;
          background: #e6f0ff;
          padding: 3px 8px;
          border-radius: 12px;
        }

        img {
          width: 30px;
          margin-right: 5px;
        }
      }

      .items.one {
        width: 338px;
        padding: 16px 24px;
        flex-direction: column;

        .items-t {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 14px;
          }
        }
      }
    }
  }
  .student-list{

  }
}
</style>