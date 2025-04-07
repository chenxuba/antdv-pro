<template>
  <div class="main">
    <div class="step header h-20 bg-white rounded-4 flex flex-center">
      <a-steps style="width: 800px" :current="current" :items="items"></a-steps>
    </div>
    <div v-if="current == 0" class="current0 contenter">
      <div class="center">
        <div class="step student h-34 bg-white rounded-4 mt-3 justify-start p-6">
          <custom-title class="mb-4" title="学员" font-size="20px" font-weight="500"></custom-title>
          <a-form v-if="formState.id == undefined" :model="formState" name="basic">
            <a-form-item label="搜索/选择学员：" name="id" :rules="[{ required: true, message: '请选择学员' }]">
              <div class="selectBox flex">
                <div class="flex">
                  <a-select v-model:value="formState.id" :filter-option="filterOption" show-search
                    placeholder="搜索姓名/手机号" style="width: 360px" @change="handleChange" option-label-prop="label">
                    <a-select-option v-for="item in stuListOptions" :key="item.id" :value="item.id" :data="item"
                      :label="item.name">
                      <div class="flex flex-center mb-1 justify-between">
                        <div class="flex flex-center">
                          <div>
                            <img class="w-10 rounded-10"
                              src="https://prod-cdn.schoolpal.cn/training/next-erp/shared/static/images/defaultimg/default_avator.png"
                              alt="" />
                          </div>
                          <div class="ml-2 mr-3">
                            <div class="text-sm text-#666 leading-7">
                              {{ item.name }}
                            </div>
                            <div class="text-xs text-#888">{{ item.phone }}</div>
                          </div>
                        </div>
                        <div>
                          <a-tag :bordered="false" color="processing">在读学员</a-tag>
                        </div>
                      </div>
                    </a-select-option>
                  </a-select>
                  <a-button class="ml-6" type="primary">创建新学员</a-button>
                </div>
              </div>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }"> </a-form-item>
          </a-form>
          <div class="stuInfo mt-2 flex" v-if="formState.id">
            <div class="flex">
              <div class="avatar mr-4">
                <img src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_female.png" alt="" />
              </div>
              <div class="name text-5 mr-4">妞妞</div>
              <div class="phone text-4 mr-5">176****1636</div>
              <a-tag color="orange">意向学员</a-tag>
            </div>
            <div class="btn">
              <a-popconfirm title="提示：“更换学员”后会重置“订单设置”的内容。" ok-text="我知道了" cancel-text="再想想" @confirm="confirm">
                <a-button type="primary" ghost>更换学员</a-button>
              </a-popconfirm>
            </div>
          </div>
        </div>
        <div class="step bg-white rounded-4 mt-3 justify-start p-6">
          <custom-title class="mb-2" title="办理内容" font-size="20px" font-weight="500"></custom-title>
          <div v-if="!activeCourseOver" class="select-box flex flex-center">
            <div class="select flex flex-col flex-center">
              <svg width="64px" height="64px" viewBox="0 0 64 64">
                <title>编组_4</title>
                <g id="\u9875\u9762-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u62A5\u540D-\u751F\u6210\u8BA2\u5355" transform="translate(-492.000000, -394.000000)">
                    <g id="\u7F16\u7EC4-4" transform="translate(492.000000, 394.000000)">
                      <rect id="\u77E9\u5F62" fill="#E6F0FF" fill-rule="nonzero" x="0" y="0" width="64" height="64"
                        rx="21.3333333"></rect>
                      <g id="\u7F16\u7EC4" transform="translate(14.000000, 14.000000)">
                        <ellipse id="\u692D\u5706\u5F62" fill="#0F8BF3" opacity="0.149130394" cx="18" cy="33.75" rx="18"
                          ry="2.25" style="mix-blend-mode: multiply"></ellipse>
                        <path
                          d="M2.25,31.5 C2.25,30.6944444 2.25,29.8888889 2.25,29.0833333 L2.25,6.91666667 C2.25,4.33933783 4.33933783,2.25 6.91666667,2.25 L31.4166667,2.25 C32.7053311,2.25 33.75,3.29466892 33.75,4.58333333 L33.75,27 C33.75,30.7279221 30.7279221,33.75 27,33.75 L4.5,33.75 C3.25735931,33.75 2.25,32.7426407 2.25,31.5 Z"
                          id="\u8DEF\u5F84" fill="#607EF5"></path>
                        <path
                          d="M30.2884615,1.125 C31.5788961,1.125 32.625,2.16833643 32.625,3.45535714 L32.625,25.7869201 C32.6233831,28.8928905 30.10597,31.4110272 27.0000002,31.4135368 L8.0048076,31.4189962 C6.76241968,31.42 5.75545445,32.4272547 5.75480769,33.6696429 L5.75480769,33.75 L5.75480769,33.75 L4.5,33.75 C3.25735931,33.75 2.25,32.7426407 2.25,31.5 L2.25,4.62053571 L2.25,4.62053571 C2.25,2.69000465 3.81915585,1.125 5.75480769,1.125 L30.2884615,1.125 Z"
                          id="\u8DEF\u5F84\u5907\u4EFD-2" fill="#2547CC"></path>
                        <path
                          d="M26.4375,1.39888101e-14 C27.6801407,1.39888101e-14 28.6875,1.00735931 28.6875,2.25 L28.6875,24.7425436 C28.6875,27.227825 26.6727814,29.2425436 24.1875,29.2425436 L5.0625,29.2425436 L5.0625,29.2425436 C3.59988876,29.2425436 2.39803946,30.3589982 2.26268507,31.7861744 C2.25428654,31.6900981 2.25,31.5918214 2.25,31.4925436 L2.25,3.375 C2.25,1.51103897 3.76103897,1.39888101e-14 5.625,1.39888101e-14 L26.4375,1.39888101e-14 Z"
                          id="\u8DEF\u5F84" fill="#2F59FF"></path>
                        <path
                          d="M29.3936098,0 C30.556937,0 31.5,0.99041396 31.5,2.2121515 L31.5,24.75 C31.5,27.2352814 29.4852814,29.25 27,29.25 L6.76187542,29.25 L6.76187542,29.25 L6.75,0 L29.3936098,0 Z"
                          id="\u8DEF\u5F84\u5907\u4EFD" fill="#5D95FF"></path>
                        <path
                          d="M19.125,3.375 L25.875,3.375 L25.875,13.5 L23.1240377,11.6660251 C22.7461509,11.4141006 22.2538491,11.4141006 21.8759623,11.6660251 L19.125,13.5 L19.125,13.5 L19.125,3.375 Z"
                          id="\u77E9\u5F62" fill="#FFFFFF"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <a-button class="mt-4" type="primary" @click="handleSelect(1)">按课程/学杂费/教材商品选择</a-button>
            </div>
            <div class="select ml-4 flex flex-col flex-center">
              <svg width="64px" height="64px" viewBox="0 0 64 64">
                <title>编组_7</title>
                <g id="\u9875\u9762-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u62A5\u540D-\u751F\u6210\u8BA2\u5355" transform="translate(-676.000000, -394.000000)">
                    <g id="\u7F16\u7EC4-7" transform="translate(676.000000, 394.000000)">
                      <rect id="\u77E9\u5F62\u5907\u4EFD" fill="#CFEE9F" fill-rule="nonzero" opacity="0.332462754" x="0"
                        y="0" width="64" height="64" rx="21.3333333"></rect>
                      <g id="\u7F16\u7EC4" transform="translate(14.000000, 14.000000)">
                        <ellipse id="\u692D\u5706\u5F62" fill="#63B228" opacity="0.191826615" cx="18" cy="33.75" rx="18"
                          ry="2.25" style="mix-blend-mode: multiply"></ellipse>
                        <path
                          d="M1.125,32.625 L1.125,2.25 C1.125,1.05913601 2.05016159,0.084355084 3.22095119,0.00519081254 L3.375,0 C4.61764069,-2.28269391e-16 5.625,1.00735931 5.625,2.25 L5.625,32.625 C5.625,33.815864 4.69983841,34.7906449 3.52904881,34.8698092 L3.375,34.875 C2.13235931,34.875 1.125,33.8676407 1.125,32.625 Z"
                          id="\u5F62\u72B6\u7ED3\u5408" fill="#63B228"></path>
                        <path
                          d="M5.625,2.25 L31.5,2.25 C33.9852814,2.25 36,4.26471863 36,6.75 L36,24.75 C36,27.2352814 33.9852814,29.25 31.5,29.25 L5.625,29.25 L5.625,29.25 L5.625,2.25 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-50" fill="#63B228"></path>
                        <path
                          d="M5.625,2.25 L31.5,2.25 C33.9852814,2.25 36,4.26471863 36,6.75 L36,22.5 C36,24.9852814 33.9852814,27 31.5,27 L5.625,27 L5.625,27 L5.625,2.25 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-51" fill="#88D510"></path>
                        <path
                          d="M3.375,0 C4.61764069,-2.28269391e-16 5.625,1.00735931 5.625,2.25 L5.625,32.625 C5.625,33.8676407 4.61764069,34.875 3.375,34.875 L3.375,34.875 L3.375,34.875 L3.375,0 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-52" fill="#88D510" opacity="0.5"></path>
                        <circle id="\u692D\u5706\u5F62\u5907\u4EFD-11" fill="#FFFFFF" opacity="0.5" cx="12.4060826"
                          cy="10.6875" r="2.8125"></circle>
                        <path
                          d="M12.375,14.625 C14.3225615,14.625 15.9846694,16.0330166 16.3048466,17.9540795 L16.6566752,20.0650511 C16.7588196,20.6779178 16.3447975,21.2575487 15.7319309,21.3596932 C15.670808,21.3698803 15.608948,21.375 15.546982,21.375 L9.20301797,21.375 C8.58169763,21.375 8.07801797,20.8713203 8.07801797,20.25 C8.07801797,20.188034 8.08313767,20.126174 8.09332481,20.0650511 L8.44515342,17.9540795 C8.76533056,16.0330166 10.4274385,14.625 12.375,14.625 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-47" fill="#FFFFFF" opacity="0.5"></path>
                        <circle id="\u692D\u5706\u5F62\u5907\u4EFD-12" fill="#FFFFFF" cx="19.1560826" cy="10.6875"
                          r="2.8125"></circle>
                        <circle id="\u692D\u5706\u5F62\u5907\u4EFD-13" fill="#FFFFFF" opacity="0.600000024"
                          cx="25.9060826" cy="10.6875" r="2.8125"></circle>
                        <path
                          d="M25.875,14.625 C27.8225615,14.625 29.4846694,16.0330166 29.8048466,17.9540795 L30.1566752,20.0650511 C30.2588196,20.6779178 29.8447975,21.2575487 29.2319309,21.3596932 C29.170808,21.3698803 29.108948,21.375 29.046982,21.375 L22.703018,21.375 C22.0816976,21.375 21.578018,20.8713203 21.578018,20.25 C21.578018,20.188034 21.5831377,20.126174 21.5933248,20.0650511 L21.9451534,17.9540795 C22.2653306,16.0330166 23.9274385,14.625 25.875,14.625 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-53" fill="#FFFFFF" opacity="0.600000024"></path>
                        <path
                          d="M19.125,14.625 C21.0725615,14.625 22.7346694,16.0330166 23.0548466,17.9540795 L23.4066752,20.0650511 C23.5088196,20.6779178 23.0947975,21.2575487 22.4819309,21.3596932 C22.420808,21.3698803 22.358948,21.375 22.296982,21.375 L15.953018,21.375 C15.3316976,21.375 14.828018,20.8713203 14.828018,20.25 C14.828018,20.188034 14.8331377,20.126174 14.8433248,20.0650511 L15.1951534,17.9540795 C15.5153306,16.0330166 17.1774385,14.625 19.125,14.625 Z"
                          id="\u77E9\u5F62\u5907\u4EFD-48" fill="#FFFFFF"></path>
                        <path
                          d="M5.625,27 L5.625,27 L5.625,27 L5.625,32.625 C5.625,33.8676407 4.61764069,34.875 3.375,34.875 L3.375,34.875 L3.375,34.875 L3.375,29.25 C3.375,28.0073593 4.38235931,27 5.625,27 Z"
                          id="\u77E9\u5F62" fill="#469C06" opacity="0.900000036"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <a-button class="mt-4 w-34 classes" type="primary">按班级选择</a-button>
            </div>
          </div>
          <div class="conductContent mt-5" v-if="activeCourseOver">
            <div v-for="(_, index) in formData" :key="index" class="container-box mb-4">
              <div class="container-box-top">
                <div class="flex flex-items-center">
                  <span class="font-600 text-#222 text-4">{{
                    _.courseName
                    }}</span>
                  <span class="ml-4">
                    <a-tag color="#2db7f5" v-if="_.isCommon">通用课</a-tag>
                    <a-tag color="#87d068" v-if="_.isClass">班级授课</a-tag>
                    <a-tag color="#108ee9" v-if="_.courseType == 1">课时</a-tag>
                  </span>
                  <span class="ml-4">
                    <a-select v-model:value="_.handleType" placeholder="请选择" style="width: 100px">
                      <a-select-option :value="0">无</a-select-option>
                      <a-select-option :value="1">新报</a-select-option>
                      <a-select-option :value="2">续费</a-select-option>
                      <a-select-option :value="3">扩科</a-select-option>
                    </a-select>
                  </span>
                </div>
                <div class="right">
                  <span class="price">合计：¥ 0.00</span>
                  <span class="line" v-if="!handleOver"></span>
                  <span class="cancel" v-if="!handleOver">取消选择</span>
                </div>
              </div>
              <div class="container-box-bottom">
                <a-form layout="vertical" :model="_" :rules="rules" :validateMessages="validateMessages" ref="formRefs">
                  <a-space :size="24">
                    <!-- 报价单必选校验 -->
                    <a-form-item name="priceItem" label="报价单">
                      <a-select :disabled="handleOver" v-model:value="_.priceItem" placeholder="请选择报价单"
                        :options="_.priceList" style="width: 170px" />
                    </a-form-item>

                    <!-- 购买份数 -->
                    <a-form-item name="num" label="购买份数" :rules="numRules(index)">
                      <a-input-number :disabled="handleOver" v-model:value="_.num" style="width: 120px" :precision="0"
                        :min="1" />
                    </a-form-item>

                    <!-- 赠送课时 -->
                    <a-form-item name="giftNum" label="赠送课时" :rules="giftNumRules(index)">
                      <a-input-number :disabled="handleOver" v-model:value="_.giftNum" style="width: 120px"
                        :precision="2" :min="0" />
                    </a-form-item>
                    <!-- 有效期 -->
                    <a-form-item label="有效期至">
                      <a-date-picker class="w-35" v-if="!handleOver" :disabled="handleOver"
                        v-model:value="_.expiryDate" />
                      <a-date-picker class="w-35" v-if="handleOver && _.expiryDate" :disabled="handleOver"
                        v-model:value="_.expiryDate" />
                      <div v-if="handleOver && _.expiryDate == ''" class="w-35">
                        不限制
                      </div>
                    </a-form-item>
                    <!-- 单课优惠 -->
                    <a-form-item name="radio" label="单课优惠">
                      <div class="flex flex-items-center" v-if="!handleOver">
                        <a-radio-group v-model:value="_.radio" class="custom-radio">
                          <a-radio value="0">无</a-radio>
                          <a-radio value="1">金额</a-radio>
                          <a-radio value="2">折扣</a-radio>
                        </a-radio-group>

                        <template v-if="_.radio === '1'">
                          <a-form-item name="youhuiPrice" :rules="youhuiPriceRules(index)" class="ml-2 mgnone">
                            <div class="flex flex-center">
                              <a-input-number :disabled="handleOver" v-model:value="_.youhuiPrice" style="width: 100px"
                                :precision="2" :min="0.01" />
                              <span class="ml-1">元</span>
                            </div>
                          </a-form-item>
                        </template>

                        <template v-if="_.radio === '2'">
                          <a-form-item name="youhuiZheKou" :rules="youhuiZheKouRules(index)" class="ml-2 mgnone">
                            <div class="flex flex-center styleCss">
                              <a-input-number :disabled="handleOver" v-model:value="_.youhuiZheKou" style="width: 100px"
                                :precision="2" :min="0.1" :max="10" />
                              <span class="ml-1">折</span>
                            </div>
                          </a-form-item>
                        </template>
                      </div>
                      <div class="text-#f00 whitespace-nowrap" v-else>
                        -¥ <span>200.00</span>
                      </div>
                    </a-form-item>
                    <!-- 整单分摊优惠 -->
                    <a-form-item v-if="handleOver" class="ml-5" label="整单分摊优惠">
                      <div class="text-#f00 whitespace-nowrap">
                        -¥ <span>20.12</span>
                      </div>
                    </a-form-item>
                    <a-form-item v-if="handleOver" class="ml-5" label="分摊优惠券优惠">
                      <div>无</div>
                    </a-form-item>
                    <a-form-item v-if="handleOver" class="ml-5" label="分摊赠送金额">
                      <div>无</div>
                    </a-form-item>
                  </a-space>
                </a-form>
              </div>
            </div>
            <a-space :size="14" class="flex justify-end" v-if="!handleOver">
              <a-button type="primary" ghost>按班级选择</a-button>
              <a-button type="primary" ghost>选择课程/学杂费/教材商品</a-button>
              <a-button type="primary" style="width: 128px" @click="validateAll">保存</a-button>
            </a-space>
            <a-space :size="14" class="flex justify-end" v-if="handleOver">
              <a-button type="primary" ghost @click="handleEdit">编辑内容</a-button>
            </a-space>
          </div>
        </div>
        <div class="step bg-white rounded-4 mt-3 justify-start p-6">
          <custom-title class="mb-5" title="订单设置" font-size="20px" font-weight="500"></custom-title>
          <a-form v-if="handleOver && formState.id" :model="settingForm" ref="settingOrderForm" labelAlign="left">
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="整单优惠设置：">
              <div class="flex flex-items-center">
                <a-radio-group v-model:value="settingForm.radio" class="custom-radio">
                  <a-radio value="0">无</a-radio>
                  <a-radio value="1">金额</a-radio>
                  <a-radio value="2">折扣</a-radio>
                </a-radio-group>

                <template v-if="settingForm.radio === '1'">
                  <a-form-item name="zyouhuiPrice" :rules="zyouhuiPriceRules()" class="ml-2 mgnone">
                    <div class="flex flex-center">
                      <a-input-number v-model:value="settingForm.youhuiPrice" style="width: 100px" :precision="2"
                        :min="0.01" />
                      <span class="ml-1">元</span>
                    </div>
                  </a-form-item>
                </template>

                <template v-if="settingForm.radio === '2'">
                  <a-form-item name="zyouhuiZheKou" :rules="zyouhuiZheKouRules()" class="ml-2 mgnone">
                    <div class="flex flex-center styleCss">
                      <a-input-number v-model:value="settingForm.youhuiZheKou" style="width: 100px" :precision="2"
                        :min="0.1" :max="10" />
                      <span class="ml-1">折</span>
                    </div>
                  </a-form-item>
                </template>
              </div>
            </a-form-item>
            <a-form-item class="custom-label mt--2" :labelCol="{ span: 2 }" label="经办日期：">
              <a-date-picker class="w-80" :disabled-date="disabledDate" v-model:value="settingForm.date"
                value-format="YYYY-MM-DD" @change="handleDateChange" format="YYYY-MM-DD" />
            </a-form-item>
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="优惠券：">
              <a-button class="w-35" ghost type="primary">输入优惠券码</a-button>
            </a-form-item>
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="订单销售员：">
              <a-select placeholder="请选择销售员" v-model:value="settingForm.salesperson" show-search style="width: 320px"
                :options="salespersonOptions" :fieldNames="{ label: 'name', value: 'id' }">
                <template #option="{ name, phone }">
                  <div class="flex justify-between flex-items-center">
                    <span>{{ name }}</span>
                    <span class="text-#999 text-3">{{ phone }}</span>
                  </div>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="订单标签：">
              <a-select mode="multiple" placeholder="请选择订单标签" v-model:value="settingForm.orderLabel" show-search
                style="width: 100%" :options="orderLabelOptions" :filter-option="orderLabelFilterOption"
                :fieldNames="{ label: 'name', value: 'id' }">
              </a-select>
            </a-form-item>
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="对内备注：">
              <a-input placeholder="请输入对内备注，此备注仅内部员工可见" v-model:value="settingForm.remarks1"
                style="width: 100%"></a-input>
            </a-form-item>
            <a-form-item class="custom-label" :labelCol="{ span: 2 }" label="对外备注：">
              <a-input placeholder="请输入对内备注，此备注打印时将显示" v-model:value="settingForm.remarks2"
                style="width: 100%"></a-input>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <a-affix :offset-bottom="bottom">
        <div class="step h-20 flex flex-center justify-end pr-10 footer bg-white rounded-4 mt-3">
          <div class="text-5.6 totalPrice setting mr-12">
            应收金额：<span>¥ 2000.00</span>
          </div>
          <a-button class="h-11 w-35" type="primary" @click="submitOrder">提交订单</a-button>
        </div>
      </a-affix>
      <a-modal @ok="handleOk" centered wrapClassName="modal" width="1000px" :bodyStyle="{ padding: 0 }"
        v-model:open="openSelect" title="选择课程/学杂费/教材商品">
        <div class="modal-wrap">
          <div class="modal-left">
            <a-list>
              <a-list-item v-for="(item, index) in selectItems" :key="index" :class="{ active: activeIndex === index }"
                @click="changeSelectItems(index)">
                <custom-title v-if="activeIndex === index" :title="item.title" font-size="16px"
                  :font-weight="activeIndex === index ? '500' : '300'" />
                <span class="pl-2.5" v-else>{{ item.title }}</span>
                <span class="num">1</span>
              </a-list-item>
            </a-list>
          </div>
          <div class="modal-right">
            <div class="m-r-t">
              <all-filter :displayArray="displayArray" :isQuickShow="false" search-label="课程名称"
                searchPlaceholder="请输入课程名称" :isShowSearchInput="true" :isShowSearchStuPhone="false"></all-filter>
            </div>
            <div class="m-r-b">
              <a-list>
                <a-list-item @click="changeSelectCourse(index)" :class="activeCourse == index ? 'activeCourse' : ''"
                  v-for="(item, index) in courseList" :key="index"
                  class="flex flex-items-center justify-between r-item">
                  <div class="m-r-b-l pt-1 pb-1">
                    <div class="text-4 text-#222 font-500 mb-1">
                      {{ item.name }}
                    </div>
                    <div>
                      <a-tag color="#2db7f5">通用课</a-tag>
                      <a-tag color="#87d068">全部课程</a-tag>
                      <a-tag color="#108ee9">课时</a-tag>
                    </div>
                  </div>
                  <div class="m-r-b-r pt-1 pb-1">
                    <a v-if="activeCourse == index" class="active-a">取消选择</a>
                    <a v-if="activeCourse != index">点击选择</a>
                  </div>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
    <div v-if="current == 1" class="current1 current0">
      <div class="step current1-auto bg-white rounded-4 mt-3 justify-start p-6">
        <div class="Yprice"><span>*</span>应收金额：</div>
        <div class="Yprice-num">¥ 100.00</div>
        <div class="radio-pay-type">
          <a-radio-group v-model:value="payType" button-style="solid">
            <a-radio-button value="1">已收款只记账</a-radio-button>
            <a-radio-button value="2">面对面收款</a-radio-button>
          </a-radio-group>
          <div class="payList mt-4">
            <div class="payList-title">
              <span>*</span>收款方式
              <span class="payList-tip ml-2">请选择</span>
            </div>
            <div class="pay">
              <a-checkbox-group v-model:value="pay">
                <label class="pay-box" :class="{ active: pay.includes(item.id) }" v-for="(item, index) in checkOptions"
                  :key="index">
                  <span> <img :src="item.img" alt="" /> {{ item.label }}</span>
                  <a-checkbox :value="item.id"></a-checkbox>
                </label>
              </a-checkbox-group>
            </div>
          </div>
          <div class="payDetail mt-5">
            <div v-for="(item, index) in accountData" :key="index" class="step bg-white rounded-4 justify-start">
              <div class="conductContent">
                <div class="container-box mb-4">
                  <div class="container-box-top">
                    <div class="flex flex-items-center">
                      <span class="font-600 text-#222 text-4 flex flex-items-center">
                        <img width="23" class="mt--0.5" :src="item.img" alt="" />
                        <span class="ml-1">{{ item.payTitle }}</span>
                      </span>
                    </div>
                    <div class="right">
                      <span class="price flex flex-items-center">实收金额：
                        <a-input style="width: 120px" v-model:value="item.solidPrice">
                          <template #addonAfter> 元 </template>
                        </a-input>
                      </span>
                      <span class="cancel ml-5" @click="handleCancel(item)">取消选择</span>
                    </div>
                  </div>
                  <div class="container-box-bottom">
                    <a-form layout="vertical" :model="item" ref="accountFormRefs">
                      <a-space :size="24">
                        <!-- 收款账户必选校验 -->
                        <a-form-item label="收款账户" name="account" :rules="[
                          {
                            required: true,
                            message: '请选择收款账户',
                            trigger: 'change',
                          },
                        ]">
                          <a-select v-model:value="item.account" placeholder="请选择收款账户" :options="accountList"
                            style="width: 170px" />
                        </a-form-item>
                        <div style="border-right: 1px solid #eee; height: 80px"></div>
                        <!-- 支付日期 -->
                        <a-form-item label="支付日期" name="payDate" :rules="[
                          {
                            required: true,
                            message: '请选择支付日期',
                            trigger: 'change',
                          },
                        ]">
                          <div class="flex flex-items-center week-wrap">
                            <a-date-picker :disabled-date="disabledDate" :default-value="dayjs()" format="YYYY-MM-DD"
                              class="w-35" placeholder="请选择日期" v-model:value="item.payDate" />
                            <div class="week">周一</div>
                          </div>
                        </a-form-item>
                        <div style="border-right: 1px solid #eee; height: 80px"></div>
                        <a-form-item label="账单备注（选填）">
                          <div class="flex flex-items-center week-wrap">
                            <a-button>填写</a-button>
                          </div>
                        </a-form-item>
                      </a-space>
                    </a-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-affix :offset-bottom="0">
        <div class="mt-3 fixedcss">
          <div class="h-20 flex flex-center justify-end pr-10 bg-white rounded-4">
            <div class="text-5 totalPrice mr-12 flex">
              <div>实收金额：<span>¥ 2000.00</span></div>
              <div class="text-3.5 text-#666 font-400">
                {{ paymentSummary }}
              </div>
            </div>
            <a-button class="h-11 w-35 text-5 font-600" type="primary" @click="validateForms">提交</a-button>
          </div>
        </div>
      </a-affix>
    </div>
    <div v-if="current == 2" class="current2">
      <div class="step bg-white rounded-4 mt-3 justify-start p-6">
        <div class="unfollowContainer flex flex-items-center">
          <ExclamationCircleFilled class="ExclamationCircleFilled" />
          <div class="unfollowText">此学员家长尚未关注家校平台</div>
          <div class="unfollowButtonContainer">
            点击邀请关注，推送家校通知
            <RightOutlined />
          </div>
        </div>
        <div class="patStatus">
          <div class="icon">
            <svg width="72px" height="72px" viewBox="0 0 72 72">
              <title>形状结合</title>
              <g id="\u9875\u9762-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="PC\u62A5\u540D\u7EED\u8D39" transform="translate(-694.000000, -288.000000)" fill="#FF9900">
                  <path
                    d="M730,288 C749.882251,288 766,304.117749 766,324 C766,343.882251 749.882251,360 730,360 C710.117749,360 694,343.882251 694,324 C694,304.117749 710.117749,288 730,288 Z M725.982064,302.866071 C724.206907,302.866071 722.767857,304.305132 722.767857,306.080302 L722.767857,306.080302 L722.767857,326.698561 L722.768382,326.772524 C722.803014,329.20975 724.546618,331.292687 726.947622,331.750368 L726.947622,331.750368 L742.897637,334.790775 L742.94993,334.800305 C744.674923,335.100229 746.327776,333.961588 746.656847,332.235253 L746.656847,332.235253 L746.666377,332.18296 C746.966299,330.457955 745.827666,328.805089 744.101344,328.476016 L744.101344,328.476016 L729.196271,325.634757 L729.196271,306.080302 L729.19584,306.027149 C729.167456,304.276494 727.73947,302.866071 725.982064,302.866071 Z"
                    id="\u5F62\u72B6\u7ED3\u5408"></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="payPrice">¥54.00</div>
          <div class="payTip">- 订单审批中（机构已开启订单审批）-</div>
        </div>
        <div class="payButton">
          <a-button :icon="h(LeftOutlined)">返回</a-button>
          <a-button type="primary" class="ml4 mr4">再报一笔</a-button>
          <a-button>查看订单详情</a-button>
        </div>
        <div class="detailInfo">
          <a-form>
            <a-row>
              <a-col :span="6">
                <a-form-item label="学员姓名">
                  <span>妞妞</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="手机号">
                  <span>176****1636</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="订单编号">
                  <span>20250407134718529850982</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="对内备注">
                  <span>无</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                <a-form-item label="对外备注">
                  <span>无</span>
                </a-form-item>
              </a-col>
              <a-col :span="18">
                <a-form-item label="办理时间">
                  <span>2025-04-07 13:47:19</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class="bg-#f6f7f8 pt-3 ml--4 pl-4 rounded-2" v-for="(item, index) in 3" :key="index">
              <a-col :span="6">
                <a-form-item label="收款方式1">
                  <span>支付宝(¥100.00)</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="收款账户">
                  <span>默认账户</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="支付单号">
                  <span>-</span>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="支付日期">
                  <span>2025-04-07</span>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref, reactive, computed } from "vue";
import { Form, message } from "ant-design-vue";
import {
  ExclamationCircleFilled,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
const current = ref(0);
const bottom = ref(0);
const openSelect = ref(false);
const activeCourseOver = ref(false);
const handleOver = ref(false);
const displayArray = ref(["subject", "courseCategory"]);
import {
  FileDoneOutlined,
  CreditCardOutlined,
  SolutionOutlined,
} from "@ant-design/icons-vue";
const activeIndex = ref(0);
const activeCourse = ref(-1);
const selectItems = ref([
  { title: "课程商品" },
  { title: "学杂费" },
  { title: "教材商品" },
]);
const courseList = ref([
  { id: 1, name: "初级言语课" },
  { id: 2, name: "初级认知课" },
  { id: 3, name: "初级感统课" },
]);
const salespersonOptions = ref([
  { id: "1", name: "陈瑞生", phone: "17601241636" },
  { id: "2", name: "刘明", phone: "18876552232" },
  { id: "3", name: "张望名", phone: "17601241636" },
  { id: "4", name: "李元芳", phone: "17601241636" },
  { id: "5", name: "秦叔宝", phone: "17601241636" },
]);
const orderLabelOptions = ref([
  { id: "1", name: "内荐" },
  { id: "2", name: "转介绍" },
  { id: "3", name: "双11订单" },
  { id: "4", name: "会员日订单" },
]);
const orderLabelFilterOption = (input, option) => {
  const keyword = input.toLowerCase();
  const nameMatch = option.name.toLowerCase().includes(keyword);
  return nameMatch;
};
const changeSelectCourse = (index) => {
  if (index == activeCourse.value) {
    activeCourse.value = -1;
  } else {
    activeCourse.value = index;
  }
};
const handleOk = () => {
  openSelect.value = false;
  activeCourseOver.value = true;
};
const items = [
  {
    title: "生成订单",
    icon: h(SolutionOutlined),
  },
  {
    title: "订单支付",
    icon: h(CreditCardOutlined),
  },
  {
    title: "订单完成",
    icon: h(FileDoneOutlined),
  },
];
const changeSelectItems = (index) => {
  activeIndex.value = index;
};
const searchKey = ref(undefined);
const filterOption = (input, option) => {
  // 正确访问选项的 label（对应 item.name）和 phone
  const name = option.label || ""; // 对应 :label="item.name"
  const phone = option.data?.phone || ""; // 通过 data 传递额外字段

  return (
    name.toLowerCase().includes(input.toLowerCase()) || phone.includes(input)
  );
};
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const stuListOptions = ref([
  { id: 1, name: "张学良", phone: "17601241636" },
  { id: 2, name: "高保庆", phone: "18882327343" },
  { id: 3, name: "谢霆锋", phone: "16723338886" },
  { id: 4, name: "张飞", phone: "17662372329" },
  { id: 5, name: "武松", phone: "19187235172" },
  { id: 6, name: "杜十娘", phone: "15422127865" },
]);
const formState = reactive({
  id: undefined,
});
// 获取当前日期（格式：YYYY-MM-DD）
const getCurrentDate = () => dayjs().format("YYYY-MM-DD");
const settingForm = reactive({
  radio: "0",
  youhuiPrice: 0,
  youhuiZheKou: 0,
  date: getCurrentDate(), // 使用dayjs更简洁,
  salesperson: undefined,
  orderLabel: undefined,
  remarks1: "",
  remarks2: "",
});
// 处理日期更新
const handleDateChange = (dateObj) => {
  if (!dateObj) {
    // 仅当值被清空时恢复当前日期
    settingForm.date = getCurrentDate();
  }
};
// 禁止选择今天之后的日期
const disabledDate = (current) => {
  // 当天结束时间（23:59:59）之后的时间不可选
  return current > dayjs().endOf("day");
};
// 初始化表单数据
const formData = reactive([
  {
    courseName: "初级言语课",
    isCommon: true, //是否通用课
    isClass: true, //是否班级授课
    courseType: 1, //1 课时
    expiryDate: "",
    priceList: [
      {
        label: "单次报价单",
        options: [
          {
            value: "1",
            label: "1课时｜100元",
          },
        ],
      },
      {
        label: "套餐报价单",
        options: [
          {
            value: "2",
            label: "10课时｜900元",
          },
        ],
      },
    ],
    handleType: 0,
    priceItem: undefined,
    num: 1,
    giftNum: 0,
    radio: "0",
    youhuiPrice: undefined,
    youhuiZheKou: undefined,
  },
  // 第二个表单块
  {
    courseName: "高级认知课",
    isCommon: true, //是否通用课
    isClass: false, //是否班级授课
    courseType: 1, //1 课时
    expiryDate: "",
    priceList: [
      {
        label: "单次报价单",
        options: [
          {
            value: "1",
            label: "1课时｜100元",
          },
        ],
      },
    ],
    handleType: 0,
    priceItem: undefined,
    num: 1,
    giftNum: 0,
    radio: "0",
    youhuiPrice: undefined,
    youhuiZheKou: undefined,
  },
]);
// 表单引用
const formRefs = ref([]);
const settingOrderForm = ref();
// 校验规则
const validateMessages = {
  required: "${label}不能为空",
  types: {
    number: "请输入有效的数字",
  },
};

const rules = {
  priceItem: [{ required: true, message: "请选择报价单" }],
};

// 动态校验规则
const numRules = (index) => [
  {
    validator: async () => {
      // 改为 async 函数
      const total = formData[index].num + formData[index].giftNum;
      if (total <= 0) {
        return Promise.reject(new Error("购买数+赠送数的总和不可为0"));
      }
      return Promise.resolve();
    },
  },
];

const giftNumRules = (index) => [
  {
    validator: async () => {
      // 改为 async 函数
      const total = formData[index].num + formData[index].giftNum;
      if (total <= 0) {
        return Promise.reject(new Error("购买数+赠送数的总和不可为0"));
      }
      return Promise.resolve();
    },
  },
];

const youhuiPriceRules = (index) => [
  {
    required: formData[index].radio === "1",
    message: "请输入优惠金额",
    type: "number",
    min: 0.01,
  },
];

const youhuiZheKouRules = (index) => [
  {
    required: formData[index].radio === "2",
    message: "请输入折扣（0.1-10）",
    type: "number",
    min: 0.1,
    max: 10,
  },
];
const zyouhuiPriceRules = () => [
  {
    required: settingForm.radio === "1",
    message: "请输入优惠金额",
    type: "number",
    min: 0.01,
  },
];

const zyouhuiZheKouRules = (index) => [
  {
    required: settingForm.radio === "2",
    message: "请输入折扣（0.1-10）",
    type: "number",
    min: 0.1,
    max: 10,
  },
];
// 提交时统一校验
const validateAll = async () => {
  try {
    // 确保所有表单校验通过
    await Promise.all(
      formRefs.value.map((formRef) => {
        return formRef.validate(); // 直接返回 validate() 的 Promise
      })
    );

    // 所有校验通过后的处理
    console.log("所有表单验证通过");
    // 这里添加提交逻辑
    handleOver.value = true;
  } catch (error) {
    handleOver.value = false;
    console.log("验证失败:", error);
    // 错误信息会自动显示在对应表单项下方
  }
};
const confirm = (e) => {
  formState.id = undefined;
};
const handleSelect = (e) => {
  if (e == 1) {
    openSelect.value = true;
  } else {
  }
};
const handleEdit = () => {
  handleOver.value = false;
};
const submitOrder = () => {
  if (!formState.id) {
    message.error("请选择学员");
  }
  settingOrderForm.value
    .validate()
    .then(() => {
      current.value++;
      console.log("values");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const payType = ref("1");
const pay = ref([]);
const checkOptions = reactive([
  {
    id: 1,
    label: "微信",
    img: "data:image/png;base64,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",
  },
  {
    id: 2,
    label: "支付宝",
    img: "data:image/png;base64,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",
  },
  {
    id: 3,
    label: "银行转帐",
    img: "data:image/png;base64,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",
  },
  {
    id: 4,
    label: "POS机",
    img: "data:image/png;base64,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",
  },
  {
    id: 5,
    label: "现金",
    img: "data:image/png;base64,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",
  },
  {
    id: 6,
    label: "其他",
    img: "data:image/png;base64,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",
  },
]);
const accountData = reactive([]);
const accountFormRefs = ref([]);
const validateForms = async () => {
  try {
    // 确保所有表单校验通过
    await Promise.all(
      accountFormRefs.value.map((formRef) => {
        return formRef.validate(); // 直接返回 validate() 的 Promise
      })
    );

    // 所有校验通过后的处理
    console.log("所有表单验证通过");
    current.value++;
    // 这里添加提交逻辑
  } catch (error) {
    handleOver.value = false;
    console.log("验证失败:", error);
    // 错误信息会自动显示在对应表单项下方
  }
};
const accountList = ref([{ value: 1, label: "默认账户" }]);
// 监听支付方式变化
watch(
  () => [...pay.value],
  (newVal, oldVal) => {
    // 处理新增项
    newVal.forEach((id) => {
      if (!oldVal.includes(id)) {
        const option = checkOptions.find((opt) => opt.id === id);
        accountData.push({
          payTitle: option.label,
          img: option.img,
          solidPrice: "100.00",
          account: accountList.value[0]?.value || null, // 默认第一个账户
          payDate: dayjs(),
          remarks: { text: "", img: [] },
        });
      }
    });

    // 处理移除项
    const removed = oldVal.filter((id) => !newVal.includes(id));
    removed.forEach((id) => {
      const index = accountData.findIndex(
        (item) =>
          item.payTitle === checkOptions.find((opt) => opt.id === id)?.label
      );
      if (index > -1) accountData.splice(index, 1);
    });
  },
  { deep: true }
);

// 取消选择处理
const handleCancel = (item) => {
  const target = checkOptions.find((opt) => opt.label === item.payTitle);
  pay.value = pay.value.filter((id) => id !== target?.id);
};

// 计算支付方式汇总信息
const paymentSummary = computed(() => {
  const groups = accountData
    .filter((item) => Number(item.solidPrice) > 0)
    .map((item) => `${item.payTitle} ¥${Number(item.solidPrice).toFixed(2)}`);

  return groups.length > 0 ? groups.join("，") : "";
});
</script>

<style lang="less" scoped>
.r-item {
  border-bottom: 1px solid #eee !important;
  cursor: pointer;
}

.step {
  box-shadow: 0 0 8px 0 rgba(94, 188, 255, 0.08);
}

.modal-wrap {
  display: flex;
  height: 70vh;

  .modal-left {
    width: 160px;

    .ant-list-item {
      border: none;
      font-size: 16px;
      color: #666;
      padding-left: 14px;
      cursor: pointer;
      line-height: 2.5;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .num {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background: #f33;
        border-radius: 100px;
        color: #fff;
        font-size: 12px;
      }
    }

    .active.ant-list-item {
      background: var(--pro-ant-color-primary-bg-hover);

      .title {
        color: var(--pro-ant-color-primary);
      }
    }
  }

  .modal-right {
    flex: 1;
    border-left: 1px solid #eee;

    .m-r-t {
      display: flex;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid #eee;
    }

    .m-r-b {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }

  .activeCourse {
    background: var(--pro-ant-color-primary-bg-hover);
  }

  .active-a {
    position: relative;

    &::before {
      display: inline-block;
      position: absolute;
      content: "✓";
      font-size: 16px;
      line-height: 20px;
      top: -2px;
      left: -30px;
      color: var(--pro-ant-color-primary);
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }
}

.totalPrice {
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  line-height: 1.2;
  font-family: "DIN alternate", sans-serif;

  span {
    color: var(--pro-ant-color-primary);
    font-family: "DIN alternate", sans-serif;
    font-size: 38px;
  }
}

.totalPrice.setting {
  flex-direction: row;
  align-items: center;
}

.contenter {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 195px);
  overflow: hidden;

  .center {
    flex: 1;
    overflow: auto;
  }
}

.current0 {
  .m-r-b-r a {
    color: var(--pro-ant-color-primary);
  }

  .classes {
    background: var(--pro-ant-color-success);

    &:hover {
      background: var(--pro-ant-color-success-hover);
    }
  }

  .stuInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .flex {
      align-items: center;
      background: #fafafa;
      border-radius: 100px;
      padding-right: 16px;

      .avatar {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }

      .name {
        font-weight: 500;
      }
    }
  }

  .conductContent {
    .container-box {
      background: #fafafa;
      overflow-x: auto;

      .container-box-top {
        height: 44px;
        background: #f0f5fe;
        padding: 10px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;

        .right {
          display: flex;
          align-items: center;

          span.price {
            font-weight: 500;
            color: #222;
            white-space: nowrap;
            font-size: 14px;
          }

          .line {
            height: 12px;
            width: 1px;
            background: #ccc;
            display: inline-block;
            margin: 0 18px;
          }

          .cancel {
            color: var(--pro-ant-color-primary);
            font-weight: bold;
            cursor: pointer;
          }
        }
      }

      .container-box-bottom {
        padding: 10px 8px 0 24px;

        :deep(.ant-form-item-label label) {
          white-space: nowrap;
        }
      }
    }
  }

  .mgnone {
    margin: 0 !important;

    :deep(.ant-form-item-explain-error) {
      position: absolute;
    }
  }

  :deep(.ant-form-item-explain-error) {
    font-size: 12px !important;
  }

  :deep(.ant-select-disabled .ant-select-selector) {
    border-color: transparent !important;
    background: transparent !important;
    color: #333 !important;
    cursor: default !important;
  }

  :deep(.ant-select-disabled .ant-select-arrow) {
    display: none !important;
  }

  :deep(.ant-input-number-disabled) {
    border-color: transparent !important;
    background: transparent !important;
    color: #333 !important;
    cursor: default !important;
  }

  :deep(.ant-input-number-disabled .ant-input-number-input) {
    padding-left: 0;
  }

  :deep(.ant-picker-disabled) {
    border-color: transparent !important;
    background: transparent !important;
    padding-left: 0;
  }

  :deep(.ant-picker-disabled input) {
    color: #333 !important;
  }

  :deep(.ant-picker-disabled .ant-picker-suffix) {
    display: none !important;
  }

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

}

.current1 {
  .current1-auto {
    max-height: calc(100vh - 300px);
    overflow: auto;
  }

  .Yprice {
    font-size: 14px;

    span {
      color: red;
    }
  }

  .Yprice-num {
    padding-top: 12px;
    width: 560px;
    font-family: DINAlternate;
    font-weight: 700;
    font-size: 48px;
    color: #000;
    line-height: 56px;
  }

  .radio-pay-type {
    padding-top: 20px;
  }

  .payList {
    span {
      color: red;
    }

    span.payList-tip {
      color: var(--pro-ant-color-primary);
    }
  }

  .pay {
    margin-top: 10px;

    .pay-box {
      border: 1px solid #eee;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      margin-right: 6px;
      user-select: none;
      cursor: pointer;

      &:hover {
        border-color: var(--pro-ant-color-primary);
      }

      span {
        color: #000;
        margin-right: 20px;
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }
    }

    .active {
      border-color: var(--pro-ant-color-primary);
    }
  }

  .week-wrap {
    display: flex;

    .week {
      background: #e6f0ff;
      border-radius: 14px;
      color: var(--pro-ant-color-primary);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin-left: 8px;
      padding: 2px 14px;
    }
  }

  .fixedcss {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.current2 {
  .unfollowContainer {
    background: var(--pro-ant-color-primary-bg-hover);
    padding: 15px;
    margin: 0 0 20px 0;
    border-radius: 4px;

    .unfollowButtonContainer {
      margin-left: 10px;
      color: var(--pro-ant-color-primary);
      cursor: pointer;
    }

    .ExclamationCircleFilled {
      color: var(--pro-ant-color-primary);
      margin-right: 4px;
      font-size: 16px;
    }
  }

  .patStatus {
    text-align: center;

    .payPrice {
      margin-top: 12px;
      margin-bottom: 8px;
      line-height: 38px;
      font-family: "DIN alternate", sans-serif;
      font-size: 32px;
      font-weight: 700;
      color: #222;
    }

    .payTip {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 16px;
      color: #f90;
      line-height: 22px;
      font-style: normal;
    }
  }

  .payButton {
    text-align: center;
    margin-top: 34px;
    border-bottom: 1px solid #eee;
    padding-bottom: 40px;
  }

  .detailInfo {
    margin-top: 24px;

    span {
      color: #888;
    }

    :deep(.ant-form-item) {
      margin-bottom: 12px !important;
    }

    .rounded-2 {
      :deep(.ant-form-item) {
        margin-bottom: 2px !important;
      }
    }
  }
}
</style>
<style lang="less">
.modal {
  .ant-modal-header {
    margin-bottom: 0;
  }

  .ant-modal-footer {
    margin-top: 0;
  }
}
</style>