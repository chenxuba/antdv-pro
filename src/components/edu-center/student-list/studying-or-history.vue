<template>
  <div>
    <!-- 学员筛选条件 -->
    <div class="filter-wrap mt-2 bg-white  pl-3 pr-3 rounded-4">
      <all-filter :defaultStudentStatus="defaultStudentStatus" :displayArray="displayArray" :is-quick-show="false"
        :is-show-search-stu-phonefilter="true"></all-filter>
    </div>
    <div class="student-list mt-2 pt-3 pb-3 pl-6 pr-6 bg-white rounded-4">
      <div class="tab-table">
        <div class="table-title flex justify-between">
          <div class="total">当前共{{ dataSource.length }}名学员</div>
          <div class="edit flex">
            <div class="upNew">
              <a-button class="mr-2">群发短信</a-button>
            </div>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    批量分配销售
                  </a-menu-item>
                  <a-menu-item key="2">
                    批量编辑学员
                  </a-menu-item>
                  <a-menu-item key="3">
                    批量删除学员
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                批量操作
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <a-dropdown class="mr-2">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    导入意向学员
                  </a-menu-item>
                  <a-menu-item key="2">
                    批量导出
                  </a-menu-item>
                  <a-menu-item key="3">
                    导出记录
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                导出/导入学员
                <DownOutlined :style="{ fontSize: '10px' }" />
              </a-button>
            </a-dropdown>
            <!-- 自定义字段 -->
            <customize-code v-model:checkedValues="selectedValues" :options="columnOptions" :total="allColumns.length"
              :num="selectedValues.length" />
          </div>
        </div>
        <div class="table-content mt-2">
          <div class="tip">家校微信关注数为 1，关注率 33.33%，已超过 10.09% 机构。引导家长关注家校平台，发送学员成果，提升续费率！ <a>点击下载家校物料（易拉宝、台卡等）</a> </div>
          <a-table :dataSource="dataSource" :pagination="dataSource.length > 10" :columns="filteredColumns"
            :row-selection="rowSelection" :scroll="{ x: totalWidth }" size="small">
            <template #headerCell="{ column }">
              <template v-if="column.key === 'studentStatus'">
                <span class="mr-1">{{ column.title }}</span>
                <a-tooltip color="#666">
                  <template #title>在读学员：当前报读课程有一门或多门课程有剩余课时/天数/金额的学员。
                    历史学员：报读课程中全部课程都已结课的学员。</template>
                  <ExclamationCircleOutlined />
                </a-tooltip>
              </template>
            </template>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a-tooltip>
                  <template #title>查看学员档案</template>
                  <div class="flex cursor-pointer  flex-items-center h-4 w-30" @click="handleSeeStuData()">
                    <img width="36" height="36" class="mr-2" style="border-radius: 100%;"
                      src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_120"
                      alt="">
                    <div class="name mt-1">
                      <div class="text-#222 hover-text-#0066ff">龙龙</div>
                      <div class="text-3 text-#888 flex flex-items-center">男 <span
                          class="inline-block w-0.2 h-2.5 bg-#ccc ml-1.5 mr-1.5"></span> 1个月</div>
                    </div>
                  </div>
                </a-tooltip>

              </template>
              <template v-if="column.key === 'phone'">
                <div class="name">
                  <div class="text-#222">爸爸</div>
                  <div class="text-3 text-#666">176****1636</div>
                </div>
              </template>
              <template v-if="column.key === 'cloud'">
                <a-tooltip placement="right">
                  <template #title>
                    <span>点击邀请关注</span>
                  </template>
                  <div class="flex flex-items-center cursor-pointer">
                    <span class="whitespace-nowrap text-#ccc">
                      未关注
                    </span>
                    <svg width="16px" height="16px" class="ml-2" viewBox="0 0 16 16">
                      <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-474.000000, -608.000000)"
                          fill="#CCCCCC">
                          <g id="Rectangle-2\u5907\u4EFD-89" transform="translate(398.000000, 580.000000)">
                            <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                              <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                                <path
                                  d="M12.5488957,14.2844713 L11.5010486,14.2844713 C11.1341596,14.280754 10.8398076,13.9883197 10.843536,13.6312425 C10.8398076,13.2741654 11.1341596,12.9817311 11.5010486,12.9780138 L12.5488957,12.9780138 C13.1929132,12.9707828 13.7094253,12.457622 13.7035882,11.8308133 L13.7035882,5.51659915 C13.7049584,5.07149643 13.4426881,4.66546656 13.0299588,4.47372986 L8.49973266,2.41098807 C8.19497588,2.2717625 7.84236314,2.2717625 7.53760636,2.41098807 L3.00725203,4.47372986 C2.59455747,4.66549483 2.33231941,5.07151473 2.33368895,5.51659915 L2.33368895,8.11331051 C2.33741739,8.47038769 2.04306536,8.76282195 1.67617635,8.76653928 C1.30928733,8.76282195 1.0149353,8.47038769 1.01862871,8.11331051 L1.01862871,5.51659915 C1.01573797,4.56462047 1.57664141,3.69619985 2.4593492,3.28605311 L6.98970297,1.22331132 C7.64157303,0.925562892 8.39577156,0.925562892 9.04764162,1.22331132 L13.5778672,3.28605311 C14.460609,3.69617215 15.0215439,4.56460257 15.0186287,5.51659915 L15.0186287,11.8308133 C15.0186287,13.1837748 13.9107309,14.2844713 12.5488957,14.2844713 Z"
                                  id="\u8DEF\u5F84"></path>
                                <path
                                  d="M1.56733162,10.2194036 C1.40127346,10.2195233 1.23544109,10.2313173 1.07112909,10.2546935 C1.02383678,10.4730961 1,10.6956916 1,10.9188916 C1,11.7700045 1.34739282,12.5862583 1.96575882,13.1880863 C2.58412481,13.7899143 3.42280952,14.1280178 4.29731162,14.1280178 C4.51607755,14.1280178 4.73430678,14.1069519 4.94880175,14.0650857 C4.97598308,13.8947261 4.98963678,13.7225811 4.98963678,13.5501797 C4.98963678,12.666803 4.6290758,11.8196066 3.98726883,11.1949647 C3.34546185,10.5703228 2.4749842,10.2194036 1.56733162,10.2194036 Z"
                                  id="\u8DEF\u5F84"></path>
                                <path
                                  d="M4.04965057,14.1112242 C4.36580361,14.1624804 4.68574686,14.1883875 5.00625618,14.1886844 C6.55014367,14.1886844 8.03079835,13.5917848 9.12249298,12.529291 C10.2141876,11.4667972 10.8274979,10.0257453 10.8274979,8.5231503 C10.8271446,8.25723104 10.8076999,7.99166078 10.7693057,7.72837983 C10.4531526,7.67712408 10.1332094,7.65121719 9.81270009,7.65092023 C8.26881275,7.65092023 6.78815822,8.24781981 5.69646369,9.3103135 C4.60476916,10.3728072 3.99145897,11.813859 3.99145897,13.3164538 C3.99181199,13.582373 4.01125654,13.8479433 4.04965057,14.1112242 Z"
                                  id="\u8DEF\u5F84"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'face'">
                <a-tooltip placement="right">
                  <template #title>
                    <span>点击采集人脸</span>
                  </template>
                  <div class="flex flex-items-center cursor-pointer">
                    <span class="whitespace-nowrap text-#ccc">
                      未采集
                    </span>
                    <svg width="16px" height="16px" viewBox="0 0 16 16" class="ml-2">
                      <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-594.000000, -608.000000)">
                          <g id="\u7F16\u7EC4-11" transform="translate(518.000000, 310.000000)">
                            <g id="Rectangle-2\u5907\u4EFD-88" transform="translate(0.000000, 270.000000)">
                              <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                                <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                                  <polygon id="\u77E9\u5F62" fill="#000000" fill-rule="nonzero" opacity="0"
                                    points="0 0 16 0 16 16 8 16 0 16"></polygon>
                                  <path
                                    d="M1.49983336,11 C1.74529324,10.9999182 1.94950067,11.1767253 1.99191437,11.4099604 L2,11.4998334 L2,14 L4.5,14 C4.74545992,14 4.9496084,14.1768752 4.99194436,14.4101244 L5,14.5 C5,14.7454599 4.82312487,14.9496084 4.58987566,14.9919444 L4.5,15 L1.50100003,15 C1.25559799,15 1.05147725,14.8232051 1.00908211,14.5900195 L1.00100006,14.5001667 L1,11.5001667 C0.999908009,11.2240243 1.223691,11.0000921 1.49983336,11 Z M14.4988336,11 C14.7442935,10.9999183 14.9485009,11.1767254 14.9909146,11.4099605 L14.9990002,11.4998334 L15,14.4998334 C15.0000818,14.7453511 14.8231944,14.9495863 14.5898958,14.9919408 L14.5,15 L11.5,15 C11.2238576,15 11,14.7761424 11,14.5 C11,14.2545401 11.1768752,14.0503917 11.4101244,14.0080557 L11.5,14 L14,14 L13.9990003,11.5001667 C13.9989185,11.2547068 14.1757256,11.0504994 14.4089607,11.0080857 L14.4988336,11 Z M4.5,9 L11.5,9 L11.4931641,9.38828125 L11.4931641,9.38828125 L11.4769287,9.60498047 L11.4769287,9.60498047 L11.4453125,9.83125 C11.28125,10.75 10.625,11.8 8,11.8 C5.484375,11.8 4.77685547,10.8356771 4.5778656,9.94669189 L4.53663635,9.71717529 C4.53140259,9.67943522 4.5269165,9.64200846 4.52307129,9.60498047 L4.50683594,9.38828125 L4.50683594,9.38828125 L4.5,9 Z M11,5.5 C11.5522847,5.5 12,5.94771525 12,6.5 C12,7.05228475 11.5522847,7.5 11,7.5 C10.4477153,7.5 10,7.05228475 10,6.5 C10,5.94771525 10.4477153,5.5 11,5.5 Z M5,5.5 C5.55228475,5.5 6,5.94771525 6,6.5 C6,7.05228475 5.55228475,7.5 5,7.5 C4.44771525,7.5 4,7.05228475 4,6.5 C4,5.94771525 4.44771525,5.5 5,5.5 Z M14.5,1 C14.7455177,1 14.9496939,1.17695541 14.9919707,1.41026814 L15,1.50016663 L14.9990002,4.50016663 C14.9989082,4.77630898 14.774976,5.000092 14.4988336,5 C14.2533737,4.99991817 14.0492842,4.82297499 14.007026,4.58971169 L13.9990003,4.49983337 L14,2 L11.5,2 C11.2545401,2 11.0503916,1.82312484 11.0080557,1.58987563 L11,1.5 C11,1.25454011 11.1768752,1.05039163 11.4101244,1.00805567 L11.5,1 L14.5,1 Z M4.5,1 C4.77614235,1 5,1.22385763 5,1.5 C5,1.74545989 4.82312481,1.94960837 4.5898756,1.99194433 L4.5,2 L2,2 L2,4.50016667 C1.99991812,4.74562654 1.82297492,4.94971605 1.58971162,4.99197426 L1.49983331,5 C1.25437343,4.99991815 1.05028392,4.82297495 1.00802571,4.58971165 L1,4.49983333 L1.001,1.49983333 C1.0010818,1.25443131 1.17794474,1.05036951 1.41114451,1.0080521 L1.50099997,1 L4.5,1 Z"
                                    id="\u5F62\u72B6" fill="#CCCCCC"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a-tooltip>
              </template>
              <template v-if="column.key === 'studentStatus'">
                <div class="flex flex-items-center studentStatus">
                  <span class="dot"></span>
                  <span>在读学员</span>
                </div>
              </template>
              <template v-if="column.key === 'createUser'">
                陈瑞生{{ record.createUser }}
              </template>
              <template v-if="column.key === 'createTime'">2024-12-12 12:23</template>
              <template v-if="column.key === 'firstEenrollmentTime'">2025-03-12 11:23</template>
              <template v-if="column.key === 'channel'">线上渠道</template>
              <template v-if="column.key === 'birthday'">2020-12-12</template>
              <template v-if="column.key === 'wechatNumber'">
                <clamped-text :lines="1" text="1115009958"></clamped-text>
              </template>
              <template v-if="column.key === 'grade'">
                <clamped-text :lines="1" text="一年级"></clamped-text>
              </template>
              <template v-if="column.key === 'school'">
                <clamped-text :lines="2" text="上海市第一人民小学真北路校区"></clamped-text>
              </template>
              <template v-if="column.key === 'address'">
                <clamped-text :lines="2" text="上海市杨浦区纪念路8号财大科技园区5号楼102A"></clamped-text>
              </template>
              <template v-if="column.key === 'disableID'">
                <clamped-text :lines="2" text="CJ202209092236223"></clamped-text>
              </template>
              <template v-if="column.key === 'IDCard'">
                <clamped-text :lines="2" text="372925199311156719"></clamped-text>
              </template>
              <template v-if="column.key === 'sale'">张晨</template>
              <template v-if="column.key === 'newFollow'">
                2025-04-08 12:33
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- <a-drawer v-model:open="openDrawer" :bodyStyle="{ padding: '0', background: '#f7f7fd' }" :closable="false"
      width="1165px" placement="right">
      <template #title>
        <div class="custom-header flex justify-between h-4 flex-items-center">
          <div class="text-5">学员详情</div>
          <a-button type="text" @click="openDrawer = false" class="close-btn">
            <template #icon>
              <CloseOutlined class="text-5 close-icon" />
            </template>
          </a-button>
        </div>
      </template>
      <div class="contenter flex flex-center bg-white px6 py3">
        <div class="avatarBox w-16 h-16 relative">
          <img width="64" height="64" class=" rounded-100"
            src="https://cdn.schoolpal.cn/schoolpal/next-erp/avator_male.png?x-oss-process=image/resize,w_192" alt="">
          <svg width="24px" height="24px" viewBox="0 0 24 24" style="position: absolute; bottom: 0px; right: 0px;">
            <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="\u753B\u677F\u5907\u4EFD-24" transform="translate(-1398.000000, -266.000000)">
                <g id="\u7F16\u7EC4" transform="translate(1398.000000, 266.000000)">
                  <g id="\u7537" fill="#0066FF">
                    <circle id="\u692D\u5706\u5F62" cx="12" cy="12" r="12"></circle>
                  </g>
                  <g transform="translate(4.000000, 3.722662)" fill="#FFFFFF"
                    id="\u65B0/\u7B26\u53F7/\u5973\u751F\u5907\u4EFD">
                    <path
                      d="M9.98295688,1.77676597 L13.6387257,1.8028489 C13.7930794,1.80396567 13.9394291,1.86533967 14.0486287,1.97426627 C14.1538252,2.07919975 14.2148488,2.21857568 14.2201186,2.36646345 L14.2204005,2.37727245 L14.2204757,2.3831554 L14.24663,6.02978943 C14.247728,6.18507156 14.1872157,6.33282206 14.0771854,6.44257728 C13.9671393,6.55234824 13.8190165,6.61270947 13.6633274,6.61158303 C13.5090196,6.61048247 13.3626594,6.54911856 13.2534413,6.44017355 C13.1482522,6.33524738 13.0872363,6.19587558 13.0819531,6.0479962 L13.0816702,6.03718885 L13.081594,6.03125507 L13.066604,3.92612534 L10.9521085,6.03536379 C11.5902388,6.87252677 11.9753326,7.91205155 11.9936747,9.04050714 L11.9943609,9.125 C11.9943609,11.9468299 9.7010826,14.234375 6.87218045,14.234375 C4.0432783,14.234375 1.75,11.9468299 1.75,9.125 C1.75,6.30317011 4.0432783,4.015625 6.87218045,4.015625 C8.04013318,4.015625 9.11678511,4.40555293 9.97844028,5.06202208 L12.091839,2.95392222 L9.98145814,2.93888322 C9.66489501,2.93662541 9.40718732,2.68201082 9.39984547,2.36749146 L9.39969175,2.3561979 C9.39938172,2.20746683 9.45543543,2.06567212 9.55744749,1.95781389 L9.56503348,1.94993442 L9.57526033,1.93973313 C9.68064605,1.83771034 9.81951788,1.78001951 9.966157,1.77689405 L9.97706176,1.77676597 L9.98295688,1.77676597 Z M6.87218045,5.390625 C4.80457307,5.390625 3.12844612,7.06256164 3.12844612,9.125 C3.12844612,11.1874384 4.80457307,12.859375 6.87218045,12.859375 C8.91911176,12.859375 10.5823531,11.2207099 10.6154132,9.18675472 L10.6158835,9.12851563 L10.6153352,9.059625 L10.6149403,9.03864311 C10.5971063,8.25003248 10.334411,7.50489804 9.86913214,6.88648584 L9.85482568,6.86759452 L9.54653822,6.46315625 L9.14174364,6.15475245 C8.50066151,5.66633126 7.7213899,5.39606271 6.89717046,5.39070618 L6.87218045,5.390625 Z"
                      id="\u5F62\u72B6\u7ED3\u5408"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div class="info flex flex-1 ml-4 flex-col">
          <div class="top flex justify-between flex-center flex-1">
            <a-space>
              <div class="name text-5 font-800">龙龙</div>
              <svg class="mt-0.5 cursor-pointer ml1" width="20px" height="20px" viewBox="0 0 16 14">
                <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-474.000000, -608.000000)" fill="#CCCCCC">
                    <g id="Rectangle-2\u5907\u4EFD-89" transform="translate(398.000000, 580.000000)">
                      <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                        <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                          <path
                            d="M12.5488957,14.2844713 L11.5010486,14.2844713 C11.1341596,14.280754 10.8398076,13.9883197 10.843536,13.6312425 C10.8398076,13.2741654 11.1341596,12.9817311 11.5010486,12.9780138 L12.5488957,12.9780138 C13.1929132,12.9707828 13.7094253,12.457622 13.7035882,11.8308133 L13.7035882,5.51659915 C13.7049584,5.07149643 13.4426881,4.66546656 13.0299588,4.47372986 L8.49973266,2.41098807 C8.19497588,2.2717625 7.84236314,2.2717625 7.53760636,2.41098807 L3.00725203,4.47372986 C2.59455747,4.66549483 2.33231941,5.07151473 2.33368895,5.51659915 L2.33368895,8.11331051 C2.33741739,8.47038769 2.04306536,8.76282195 1.67617635,8.76653928 C1.30928733,8.76282195 1.0149353,8.47038769 1.01862871,8.11331051 L1.01862871,5.51659915 C1.01573797,4.56462047 1.57664141,3.69619985 2.4593492,3.28605311 L6.98970297,1.22331132 C7.64157303,0.925562892 8.39577156,0.925562892 9.04764162,1.22331132 L13.5778672,3.28605311 C14.460609,3.69617215 15.0215439,4.56460257 15.0186287,5.51659915 L15.0186287,11.8308133 C15.0186287,13.1837748 13.9107309,14.2844713 12.5488957,14.2844713 Z"
                            id="\u8DEF\u5F84"></path>
                          <path
                            d="M1.56733162,10.2194036 C1.40127346,10.2195233 1.23544109,10.2313173 1.07112909,10.2546935 C1.02383678,10.4730961 1,10.6956916 1,10.9188916 C1,11.7700045 1.34739282,12.5862583 1.96575882,13.1880863 C2.58412481,13.7899143 3.42280952,14.1280178 4.29731162,14.1280178 C4.51607755,14.1280178 4.73430678,14.1069519 4.94880175,14.0650857 C4.97598308,13.8947261 4.98963678,13.7225811 4.98963678,13.5501797 C4.98963678,12.666803 4.6290758,11.8196066 3.98726883,11.1949647 C3.34546185,10.5703228 2.4749842,10.2194036 1.56733162,10.2194036 Z"
                            id="\u8DEF\u5F84"></path>
                          <path
                            d="M4.04965057,14.1112242 C4.36580361,14.1624804 4.68574686,14.1883875 5.00625618,14.1886844 C6.55014367,14.1886844 8.03079835,13.5917848 9.12249298,12.529291 C10.2141876,11.4667972 10.8274979,10.0257453 10.8274979,8.5231503 C10.8271446,8.25723104 10.8076999,7.99166078 10.7693057,7.72837983 C10.4531526,7.67712408 10.1332094,7.65121719 9.81270009,7.65092023 C8.26881275,7.65092023 6.78815822,8.24781981 5.69646369,9.3103135 C4.60476916,10.3728072 3.99145897,11.813859 3.99145897,13.3164538 C3.99181199,13.582373 4.01125654,13.8479433 4.04965057,14.1112242 Z"
                            id="\u8DEF\u5F84"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg class="mt-0.5 cursor-pointer ml0.5" width="20px" height="20px" viewBox="0 0 16 14">
                <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u753B\u677F\u5907\u4EFD-21" transform="translate(-594.000000, -608.000000)">
                    <g id="\u7F16\u7EC4-11" transform="translate(518.000000, 310.000000)">
                      <g id="Rectangle-2\u5907\u4EFD-88" transform="translate(0.000000, 270.000000)">
                        <g id="\u7F16\u7EC4" transform="translate(76.000000, 21.600000)">
                          <g id="\u7F16\u7EC4" transform="translate(0.000000, 6.400000)">
                            <polygon id="\u77E9\u5F62" fill="#000000" fill-rule="nonzero" opacity="0"
                              points="0 0 16 0 16 16 8 16 0 16"></polygon>
                            <path
                              d="M1.49983336,11 C1.74529324,10.9999182 1.94950067,11.1767253 1.99191437,11.4099604 L2,11.4998334 L2,14 L4.5,14 C4.74545992,14 4.9496084,14.1768752 4.99194436,14.4101244 L5,14.5 C5,14.7454599 4.82312487,14.9496084 4.58987566,14.9919444 L4.5,15 L1.50100003,15 C1.25559799,15 1.05147725,14.8232051 1.00908211,14.5900195 L1.00100006,14.5001667 L1,11.5001667 C0.999908009,11.2240243 1.223691,11.0000921 1.49983336,11 Z M14.4988336,11 C14.7442935,10.9999183 14.9485009,11.1767254 14.9909146,11.4099605 L14.9990002,11.4998334 L15,14.4998334 C15.0000818,14.7453511 14.8231944,14.9495863 14.5898958,14.9919408 L14.5,15 L11.5,15 C11.2238576,15 11,14.7761424 11,14.5 C11,14.2545401 11.1768752,14.0503917 11.4101244,14.0080557 L11.5,14 L14,14 L13.9990003,11.5001667 C13.9989185,11.2547068 14.1757256,11.0504994 14.4089607,11.0080857 L14.4988336,11 Z M4.5,9 L11.5,9 L11.4931641,9.38828125 L11.4931641,9.38828125 L11.4769287,9.60498047 L11.4769287,9.60498047 L11.4453125,9.83125 C11.28125,10.75 10.625,11.8 8,11.8 C5.484375,11.8 4.77685547,10.8356771 4.5778656,9.94669189 L4.53663635,9.71717529 C4.53140259,9.67943522 4.5269165,9.64200846 4.52307129,9.60498047 L4.50683594,9.38828125 L4.50683594,9.38828125 L4.5,9 Z M11,5.5 C11.5522847,5.5 12,5.94771525 12,6.5 C12,7.05228475 11.5522847,7.5 11,7.5 C10.4477153,7.5 10,7.05228475 10,6.5 C10,5.94771525 10.4477153,5.5 11,5.5 Z M5,5.5 C5.55228475,5.5 6,5.94771525 6,6.5 C6,7.05228475 5.55228475,7.5 5,7.5 C4.44771525,7.5 4,7.05228475 4,6.5 C4,5.94771525 4.44771525,5.5 5,5.5 Z M14.5,1 C14.7455177,1 14.9496939,1.17695541 14.9919707,1.41026814 L15,1.50016663 L14.9990002,4.50016663 C14.9989082,4.77630898 14.774976,5.000092 14.4988336,5 C14.2533737,4.99991817 14.0492842,4.82297499 14.007026,4.58971169 L13.9990003,4.49983337 L14,2 L11.5,2 C11.2545401,2 11.0503916,1.82312484 11.0080557,1.58987563 L11,1.5 C11,1.25454011 11.1768752,1.05039163 11.4101244,1.00805567 L11.5,1 L14.5,1 Z M4.5,1 C4.77614235,1 5,1.22385763 5,1.5 C5,1.74545989 4.82312481,1.94960837 4.5898756,1.99194433 L4.5,2 L2,2 L2,4.50016667 C1.99991812,4.74562654 1.82297492,4.94971605 1.58971162,4.99197426 L1.49983331,5 C1.25437343,4.99991815 1.05028392,4.82297495 1.00802571,4.58971165 L1,4.49983333 L1.001,1.49983333 C1.0010818,1.25443131 1.17794474,1.05036951 1.41114451,1.0080521 L1.50099997,1 L4.5,1 Z"
                              id="\u5F62\u72B6" fill="#CCCCCC"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </a-space>
            <a-space>
              <a-button>删除</a-button>
              <a-button>编辑</a-button>
              <a-button>未排课点名</a-button>
              <a-button>分配销售</a-button>
              <a-button>试听</a-button>
              <a-button type="primary">报名</a-button>
            </a-space>
          </div>
          <div class="bottom flex-1 flex flex-items-center mt-2">
            <div class="birthday flex-center">
              <svg width="20" height="20" viewBox="0 0 16 18">
                <g id="\u9875\u9762-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u753B\u677F\u5907\u4EFD-24" transform="translate(-1395.000000, -98.000000)">
                    <g id="\u7F16\u7EC4" transform="translate(1395.000000, 98.000000)">
                      <rect id="\u77E9\u5F62" fill="#000000" fill-rule="nonzero" opacity="0" x="0" y="0" width="16"
                        height="16"></rect>
                      <path
                        d="M14.5,9 L14.5,13.4615385 C14.5,14.3112073 13.6045695,15 12.5,15 L3.5,15 C2.3954305,15 1.5,14.3112073 1.5,13.4615385 L1.5,9 L14.5,9 Z"
                        id="\u8DEF\u5F84" fill="#FF6B6B" fill-rule="nonzero"></path>
                      <path
                        d="M8,3.5 C8.55228475,3.5 9,3.05228475 9,2.5 C9,1.5 7.5,1 7.5,1 C7.5,1 7,1.94771525 7,2.5 C7,3.05228475 7.44771525,3.5 8,3.5 Z"
                        id="\u692D\u5706\u5F62" fill="#FF6B6B"></path>
                      <path
                        d="M8,4 C11,4 11,5.8954305 11,7 L12.1363636,7 C13.3850074,7 14.4075122,7.81925966 14.4940653,8.85716817 L14.5,9 C14.5,9.27614237 14.2761424,9.5 14,9.5 C13.7238576,9.5 13.5,9.27614237 13.5,9 L13.5,9.5 C13.5,10.0522847 13.0522847,10.5 12.5,10.5 C11.9477153,10.5 11.5,10.0522847 11.5,9.5 L11.5,9 C11.5,9.27614237 11.2761424,9.5 11,9.5 C10.7238576,9.5 10.5,9.27614237 10.5,9 L10.5,9.5 C10.5,10.0522847 10.0522847,10.5 9.5,10.5 C8.94771525,10.5 8.5,10.0522847 8.5,9.5 L8.5,9 C8.5,9.27614237 8.27614237,9.5 8,9.5 C7.72385763,9.5 7.5,9.27614237 7.5,9 L7.5,9.5 C7.5,10.0522847 7.05228475,10.5 6.5,10.5 C5.94771525,10.5 5.5,10.0522847 5.5,9.5 L5.5,9 C5.5,9.27614237 5.27614237,9.5 5,9.5 C4.72385763,9.5 4.5,9.27614237 4.5,9 L4.5,9.5 C4.5,10.0522847 4.05228475,10.5 3.5,10.5 C2.94771525,10.5 2.5,10.0522847 2.5,9.5 L2.5,9 C2.5,9.27614237 2.27614237,9.5 2,9.5 C1.72385763,9.5 1.5,9.27614237 1.5,9 C1.5,7.8954305 2.55823605,7 3.86363636,7 L5,7 L5.0005144,6.80904291 C5.00925926,5.69067721 5.16666667,4 8,4 Z"
                        id="\u5F62\u72B6\u7ED3\u5408" fill="#FFC3C3"></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span class="text-4 text-#222 ml-2">6个月（09-18）</span>
            </div>
            <span class="flex w-0.25 h-3.5 bg-#ccc mr-2.5 mr-2.5"></span>
            <div class="acount flex-center">
              <svg width="20" height="20" viewBox="0 0 18.4736842 12.4736842" style="margin-top: 1px;">
                <g id="\u9875\u9762-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="\u5B66\u5458\u8BE6\u60C5" transform="translate(-300, -139)">
                    <g id="\u7F16\u7EC4-11\u5907\u4EFD" transform="translate(299, 138)">
                      <rect id="\u77E9\u5F62" x="0" y="0" width="20" height="14"></rect>
                      <rect id="\u77E9\u5F62" fill="#FF9292" x="1" y="1" width="15" height="12" rx="2"></rect>
                      <rect id="\u77E9\u5F62" fill="#FFDEDE" x="1" y="4" width="15" height="3"></rect>
                      <circle id="\u692D\u5706\u5F62\u5907\u4EFD-2" fill="#FFDD2F" cx="14.4736842" cy="8.47368421"
                        r="5">
                      </circle>
                      <path
                        d="M13.4393398,5.74867629 L14.5,6.80922969 L15.5606602,5.74867629 C15.7342265,5.57510994 16.0036509,5.55582479 16.1985191,5.69082084 L16.267767,5.74867629 C16.4630291,5.94393844 16.4630291,6.26052093 16.267767,6.45578308 L15.706,7.01622969 L16.5,7.01644325 C16.7761424,7.01644325 17,7.24030087 17,7.51644325 C17,7.79258562 16.7761424,8.01644325 16.5,8.01644325 L14.999,8.01622969 L14.999,9.01622969 L16.5,9.01644325 C16.7761424,9.01644325 17,9.24030087 17,9.51644325 C17,9.79258562 16.7761424,10.0164432 16.5,10.0164432 L14.999,10.0162297 L15,11.5164432 C15,11.7925856 14.7761424,12.0164432 14.5,12.0164432 C14.2238576,12.0164432 14,11.7925856 14,11.5164432 L13.999,10.0162297 L12.5,10.0164432 C12.2238576,10.0164432 12,9.79258562 12,9.51644325 C12,9.24030087 12.2238576,9.01644325 12.5,9.01644325 L13.999,9.01622969 L13.999,8.01622969 L12.5,8.01644325 C12.2238576,8.01644325 12,7.79258562 12,7.51644325 C12,7.24030087 12.2238576,7.01644325 12.5,7.01644325 L13.293,7.01622969 L12.732233,6.45578308 C12.5369709,6.26052093 12.5369709,5.94393844 12.732233,5.74867629 C12.9274952,5.55341415 13.2440777,5.55341415 13.4393398,5.74867629 Z"
                        id="\u5F62\u72B6\u7ED3\u5408" fill="#E7B000"></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span class="price mx-2 text-4">12233.23</span>
              <span class="text-#06f cursor-pointer text-3.5">储值
                <RightOutlined class="text-3" />
              </span>
            </div>
            <span class="flex w-0.25 h-3.5 bg-#ccc mr-2.5 mx-2.5"></span>
            <div class="phone">
              <span class="text-4">176****1636（爸爸）</span>
              <EyeInvisibleOutlined class=" cursor-pointer text-#06f text-4" />
            </div>
            <span class="flex w-0.25 h-3.5 bg-#ccc mr-2.5 mx-2.5"></span>
            <img width="18" height="18" src="https://pcsys.admin.ybc365.com//06365255-087c-423c-bf37-33a4ceab650b.png"
              alt="">
            <span class="ml-1 text-#888 text-3.5">1232</span>
          </div>
        </div>
      </div>
      <div class="desc pt-4 bg-white px6 py3">
        <a-descriptions :column="4" size="small" :contentStyle="{ color: '#888' }">
          <a-descriptions-item label="销售员">张晨</a-descriptions-item>
          <a-descriptions-item label="班主任">陈瑞生</a-descriptions-item>
          <a-descriptions-item label="意向度">中</a-descriptions-item>
          <a-descriptions-item label="来源渠道">抖音短视频</a-descriptions-item>
          <a-descriptions-item label="跟进状态">跟进中</a-descriptions-item>
          <a-descriptions-item label="微信号">11150099858</a-descriptions-item>
          <a-descriptions-item label="年级">一年级</a-descriptions-item>
          <a-descriptions-item> <span class="text-#06f cursor-pointer">查看全部资料</span> </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="tabs">
        <a-tabs v-model:activeKey="activeKey" size="large" :tabBarStyle="{
          'border-radius': '0px', 'padding-left': '24px'
        }">
          <a-tab-pane key="0" tab="报读课程（5）">
            1
          </a-tab-pane>
          <a-tab-pane key="1" tab="上课记录">
            2
          </a-tab-pane>
          <a-tab-pane key="2" tab="订单记录">
            3
          </a-tab-pane>
          <a-tab-pane key="3" tab="试听记录">
            3
          </a-tab-pane>
          <a-tab-pane key="4" tab="跟进记录">
            3
          </a-tab-pane>
          <a-tab-pane key="5" tab="康复档案">
            3
          </a-tab-pane>

          <a-tab-pane key="6" tab="评估报告">
            3
          </a-tab-pane>
          <a-tab-pane key="7" tab="康复记录">
            3
          </a-tab-pane>
          <a-tab-pane key="8" tab="作业记录">
            3
          </a-tab-pane>
          <a-tab-pane key="9" tab="交互记录">
            3
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-drawer> -->
    <student-info-drawer v-model:open="openDrawer"></student-info-drawer>
 </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined, CloseOutlined, RightOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
const openDrawer = ref(false)
const activeKey = ref('1');
const displayArray = ref(['intention', 'followStatus', 'sex', 'createPeo', 'createTime', 'intentionCourse', 'reference', 'studentStatus', 'classEndingTime', 'classStopTime'])
const dataSource = ref([{}, {}])
const allColumns = ref([
  {
    title: '学员/性别/年龄',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 160,
    required: true // 新增必选标识
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 120,
    key: 'phone',
  },
  {
    title: '家校云',
    key: 'cloud',
    dataIndex: 'cloud',
    width: 100
  },
  {
    title: '人脸采集',
    key: 'face',
    dataIndex: 'face',
    width: 100

  },
  {
    title: '学员状态',
    dataIndex: 'studentStatus',
    key: "studentStatus",
    width: 110
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    key: "createUser",
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: "createTime",
    width: 160
  },
  {
    title: '首次报读时间',
    dataIndex: 'firstEenrollmentTime',
    key: "firstEenrollmentTime",
    width: 160

  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: "channel",
    width: 100

  },
  {
    title: '生日',
    key: 'birthday',
    dataIndex: 'birthday',
    width: 110
  },
  {
    title: '微信号',
    dataIndex: 'wechatNumber',
    key: "wechatNumber",
    width: 120
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: "grade",
    width: 100
  },
  {
    title: '就读学校',
    dataIndex: 'school',
    key: "school",
    width: 140
  },
  {
    title: '家庭地址',
    dataIndex: 'address',
    key: "address",
    width: 140
  },
  {
    title: '残疾证号',
    dataIndex: 'disableID',
    key: "disableID",
    width: 140
  },
  {
    title: '身份证号',
    dataIndex: 'IDCard',
    key: "IDCard",
    width: 140
  },
  {
    title: '销售',
    key: "sale",
    dataIndex: 'sale',
    width: 100,
  },
  {
    title: '最新跟进',
    dataIndex: 'newFollow',
    key: 'newFollow',
    fixed: 'right',
    width: 160,
    required: true
  },
])
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
const handleSeeStuData = () => {
  openDrawer.value = true
}
const defaultStudentStatus = ref(1)
// 从本地存储读取已保存的列配置
const savedSelected = localStorage.getItem('studyingOrHistoryColumns');
const keysArray = allColumns.value
  .map(column => column?.key) // 可选链操作符
  .filter(key => typeof key !== 'undefined'); // 过滤未定义的值
const initialSelectedValues = savedSelected
  ? JSON.parse(savedSelected)
  : keysArray;

// 选中的列（初始化包含重要字段）
const selectedValues = ref(initialSelectedValues);
// 生成字段选择选项（排除操作列）
const columnOptions = computed(() =>
  allColumns.value
    .filter(col => col.key !== 'action')
    .map(col => ({
      id: col.key,
      value: col.title,
      disabled: col.required // 禁用必选字段
    }))
);
// 过滤后的列（自动包含必选列）
const filteredColumns = computed(() => {
  const requiredColumns = allColumns.value.filter(col => col.required);
  const optionalColumns = allColumns.value
    .filter(col =>
      selectedValues.value.includes(col.key) &&
      !col.required
    );

  // 保持固定列顺序：left -> normal -> right
  return [
    ...requiredColumns.filter(col => col.fixed === 'left'),
    ...optionalColumns,
    ...requiredColumns.filter(col => col.fixed === 'right')
  ];
});
// 强制包含必选字段的监听
watch(selectedValues, (newVal) => {
  const requiredKeys = allColumns.value
    .filter(col => col.required)
    .map(col => col.key);

  // 自动补全必选字段
  if (!requiredKeys.every(k => newVal.includes(k))) {
    selectedValues.value = Array.from(new Set([
      ...newVal.filter(v => !requiredKeys.includes(v)),
      ...requiredKeys
    ]));
  }
}, { deep: true });
// 自动保存列配置到本地存储
watch(selectedValues, (newVal) => {
  localStorage.setItem('studyingOrHistoryColumns', JSON.stringify(newVal));
}, { deep: true });
// 表格总宽度计算
const totalWidth = computed(() =>
  filteredColumns.value.reduce((acc, column) => acc + (column.width || 0), 0)
);
</script>

<style lang="less" scoped>
.total {
  position: relative;
  padding-left: 10px;
  color: #222;
  display: flex;
  align-items: center;

  &::before {
    display: inline-block;
    background: var(--pro-ant-color-primary);
    border-radius: 2px;
    content: "";
    height: 12px;
    left: 0;
    position: absolute;
    width: 4px;
  }
}

.studentStatus {

  span.dot {
    border-radius: 50%;
    display: inline-block;
    height: 6px;
    position: relative;
    vertical-align: middle;
    width: 6px;
    margin-right: 4px;
    background: var(--pro-ant-color-primary);
  }
}

.tip {
  padding: 10px 24px 10px 14px;
  background: #e6f0ff;
  color: #333;

  a {
    color: var(--pro-ant-color-primary);
  }
}

.upNew {
  position: relative;

  &::before {
    position: absolute;
    top: -12px;
    left: -22px;
    z-index: 999;
    width: 39px;
    height: 22px;
    background: url(data:image/png;base64,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);
    background-size: contain;
    content: "";
  }
}

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

.tabs {
  width: 100%;
  border-radius: 10px;

  :deep(.ant-tabs-nav) {
    background: #fff;
    margin: 0;
  }



  :deep(.ant-tabs-ink-bar) {
    text-align: center;
    height: 12px !important;
    background: transparent;
    bottom: 0px !important;

    &::after {
      position: absolute;
      top: 0;
      left: calc(50% - 12px);
      width: 24px !important;
      height: 4px !important;
      border-radius: 2px;
      background-color: var(--pro-ant-color-primary);
      content: "";
    }
  }
}
</style>
