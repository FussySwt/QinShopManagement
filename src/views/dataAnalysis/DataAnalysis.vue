<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="16" style="text-align: right">
        <el-button style="width: 100px" type="primary" @click="savePdf"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <div id="exportPdf" ref="exportPdf">
      <el-row>
        <el-col :span="24"
          ><div class="analysisTop grid-content bg-purple-dark">
            <h4>概 述</h4>
          </div></el-col
        >
      </el-row>
      <el-row class="indexData">
        <el-col :span="10">
          <div class="indexDataLeft">
            <h3>交易日期</h3>
            <el-tabs v-model="activeLeftName">
              <el-tab-pane
                :label="data.title"
                :name="data.name"
                v-for="(data, index) in timeSelector"
                :key="index"
              >
                <!-- <h4 style="text-align: left; margin-top: 30px">评价</h4>
                <el-table
                  :data="judgeData[index]"
                  style="width: 100%"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column prop="evaluation" label="新增评价">
                  </el-table-column>
                  <el-table-column prop="badEvaluation" label="新增中差评">
                  </el-table-column>
                  <el-table-column prop="returnRate" label="总回头率">
                  </el-table-column>
                </el-table> -->
              </el-tab-pane>
              <h4 style="text-align: left">交 易</h4>
                <el-table
                  :data="tradeData"
                  style="width: 100%"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column prop="newOrder" label="新增订单">
                  </el-table-column>
                  <el-table-column prop="BeforeDelivery" label="待发货订单">
                  </el-table-column>
                  <el-table-column prop="complete" label="已完成订单">
                  </el-table-column>
                </el-table>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="indexDataRight">
            <h3>综合数据</h3>
            <el-tabs v-model="activeRightName">
              <el-tab-pane
                :label="data.title"
                :name="data.name"
                v-for="(data, index) in timeSelector"
                :key="index"
              >
              </el-tab-pane>
              <h4 style="text-align: left">顾客</h4>
                <el-table
                  :data="customerData"
                  style="width: 100%"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column prop="customer" label="交易顾客">
                  </el-table-column>
                  <el-table-column prop="newCustomer" label="新顾客">
                  </el-table-column>
                  <el-table-column prop="returningCustomer" label="回头客">
                  </el-table-column>
                </el-table>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><div class="analysisTop grid-content bg-purple-dark">
            <h4>交 易</h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="tradeSection">
            <!-- <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span> -->
            <!-- <el-date-picker
              v-model="timeValue"
              type="datetimerange"
              align="right"
              @change="dateChange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker> -->
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              @change="dateChange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <el-table
            :data="tradeVolume"
            style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="tradePrice" label="交易金额(元)">
            </el-table-column>
            <el-table-column prop="tradeNumber" label="交易笔数">
            </el-table-column>
            <el-table-column prop="unitPrice" label="笔单价(元)">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="indexData">
        <el-col :span="10">
          <div class="indexDataLeft">
            <h3>交易分布</h3>
            <el-tabs
              v-model="tradeDistribution"
              @tab-click="tradeFrom(tradeDistribution)"
            >
              <el-tab-pane
                :label="data.title"
                :name="data.name"
                v-for="(data, index) in tradeDisArr"
                :key="index"
              >
              </el-tab-pane>
              <div id="tradeFrom" style="height: 380px"></div>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="indexDataRight">
            <h3>笔单价分布</h3>
              <div style="height:40px;"></div>
              <div id="singlePriceFrom" style="height: 380px"></div>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><div class="analysisTop grid-content bg-purple-dark">
            <h4>商 品</h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="12">
              <div class="goodsBuyDate">
                  <div class="goodsBuyPrice">
                      <div class="goodsBuy">购买金额（元）</div>
                      <div class="goodsBuy">{{goodsBuyData.price}}元</div>
                  </div>
                  <div class="goodsBuyCount">
                      <div class="goodsBuy">购买数量（件）</div>
                      <div class="goodsBuy">{{goodsBuyData.count}}件</div>
                  </div>
              </div>
          </el-col>
      </el-row>
      <el-row class="indexData">
        <el-col :span="10">
          <div class="indexDataLeft">
            <h3>时间分布</h3>
            <!-- <el-tabs
              v-model="tradeDistribution"
              @tab-click="tradeFrom(tradeDistribution)"
            >
              <el-tab-pane
                :label="data.title"
                :name="data.name"
                v-for="(data, index) in tradeDisArr"
                :key="index"
              >
              </el-tab-pane>
              <div id="tradeFrom" style="height: 400px"></div>
            </el-tabs> -->
            <div style="width:100%;height:55px;"></div>
            <div id="goodsTimeCan" style="height:360px"></div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="indexDataRight">
            <h3>地理分布</h3>
            <div style="height:40px;"></div>
              <div id="locationCan" style="height: 360px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <div style="height: 1000px"></div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import apiRequest from '@/api/api'
export default {
  data() {
    return {
      timeValue: "",
      timeSelector: [
        {
          title: "今天",
          name: "0",
        },
        {
          title: "昨天",
          name: "1",
        },
        {
          title: "近7天",
          name: "2",
        },
        {
          title: "近30天",
          name: "3",
        },
      ],
      lastTrade: "1",
      goodsBuyData:{
          price: '--',
          count: '--'
      },
      tradeDisArr: [
        {
          title: "交易金额（元）",
          name: "1",
        },
        {
          title: "交易笔数",
          name: "2",
        },
        {
          title: "笔单价",
          name: "3",
        },
      ],
      // 交易日期分布
      dateArr: [],
      // 交易日期分布值
      dateVal: [],
      // 交易笔单价位置分布
      singleLocationArr: [],
      singleLocationVal:[],
      // 商品地理位置分布
      goodsLocationArr: [],
      goodsLocationLeftVal: [],
      goodsLocationRightVal: [],
      activeLeftName: "0",
      activeRightName: "0",
      tradeDistribution: "1",
      // 地理分布时间
      locationTime: 'yesterday',
      locationTimeData: 'yesterday',
      tradeData: [
        {
          newOrder: '--',
          BeforeDelivery: '--',
          complete: "--",
        }
      ],
      // 顾客量
      customerData: [
        {
          customer: '--',
          newCustomer: '--',
          returningCustomer: '--',
        }
      ],
      tradeVolume: [
        {
          tradePrice: '--',
          tradeNumber: '--',
          unitPrice: '--',
        },
        {
          tradePrice: "较上周--",
          tradeNumber: "较上周--",
          unitPrice: "较上周--",
        },
      ],
      // 时间分布购买金额
      timeFromMoneyArr: [],
      // 时间分布购买数量
      timeFromCountArr: []
    };
  },
  created(){
    apiRequest.getOrderData({
      flag: this.activeLeftName
    }).then(res=>{
      console.log(res)
      if(res.data.code == 0){
        let data = res.data.data
        this.tradeData = []
        this.tradeData.push({
          newOrder: data.newOrder,
          BeforeDelivery: data.pendingOrder,
          complete: data.completedOrder,
        })
      }
    })
    apiRequest.getUserData({
      flag: this.activeRightName
    }).then(res=>{
      if(res.data.code == 0){
        let data = res.data.data
        this.customerData = []
        this.customerData.push({
          customer: data.transferUser,
          newCustomer: data.newUser,
          returningCustomer: data.oldUser,
        })
      }
    })
    apiRequest.getTransactionData().then(res=>{
      if(res.data.code == 0){
        let data = res.data.data
        this.tradeVolume = []
        this.tradeVolume.push({
          tradePrice: data.transPrice,
          tradeNumber: data.count,
          unitPrice: data.avgPrice
        })
        this.tradeVolume.push({
          tradePrice: this.stateChange(data.transPriceStatus),
          tradeNumber: this.stateChange(data.countStatus),
          unitPrice: this.stateChange(data.avgPriceStatus)
        })
      }
    })

    this.tradeFromTab(this.tradeDistribution)
    this.singlePriceSearch()
    this.timeFromSearch()
    this.locationFromSearch()
    this.goodsInfoSearch()
  },
  watch:{
    activeLeftName(val){
      apiRequest.getOrderData({
        flag: val
      }).then(res=>{
        if(res.data.code == 0){
          let data = res.data.data
          this.tradeData = []
          this.tradeData.push({
            newOrder: data.newOrder,
            BeforeDelivery: data.pendingOrder,
            complete: data.completedOrder,
          })
          console.log(this.tradeData)
        }
      })
    },
    activeRightName(val){
      apiRequest.getUserData({
        flag: val
      }).then(res=>{
        if(res.data.code == 0){
          let data = res.data.data
          this.customerData = []
          this.customerData.push({
            customer: data.transferUser,
            newCustomer: data.newUser,
            returningCustomer: data.oldUser,
          })
        }
      })
    }
  },
  methods: {
    // 交易分布切换
    tradeFrom(data) {
      if (this.lastTrade != data) {
        this.tradeFromTab(data)
        this.lastTrade = data;
      }
    },
    // 笔单价获取数据
    singlePriceSearch(){
      let pojo = {
          startDate: '',
          endDate: ''
        }
      if(this.timeValue){
        pojo = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
      }
      apiRequest.getAvgDistribution(pojo).then(res=>{
        console.log(res)
        if(res.data.code == 0){
          let arr = res.data.data
          this.singleLocationArr = []
          this.singleLocationVal = []
          arr.forEach(item=>{
            this.singleLocationArr.push(item.province)
            this.singleLocationVal.push(item.avgPrice)
          })
          this.initCharts(
            "singlePriceFrom",
            this.singleLocationArr,
            this.singleLocationVal
          );
        }
      })
    },
    // 地理分布获取数据
    locationFromSearch(){
      let pojo = {
          startDate: '',
          endDate: ''
        }
      if(this.timeValue){
        pojo = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
      }
      apiRequest.getAreaDistribution(pojo).then(res=>{
        if(res.data.code == 0){
          let arr = res.data.data
          this.goodsLocationArr = []
          this.goodsLocationLeftVal = []
          this.goodsLocationRightVal = []
          arr.forEach(item=>{
            this.goodsLocationArr.push(item.province)
            this.goodsLocationLeftVal.push(item.sumPrice)
            this.goodsLocationRightVal.push(item.totalNumber)
          })
          console.log(this.goodsLocationLeftVal)
          console.log(this.goodsLocationRightVal)
          this.goodsCharts(
            "locationCan",
            this.goodsLocationArr,
            this.goodsLocationLeftVal,
            this.goodsLocationRightVal
          );
        }
      })
    },
    // 交易分布切换请求数据
    tradeFromTab(data){
      let pojo = {}
      if(this.timeValue){
        pojo = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
      }else{
        let time = new Date();
        let str = ''
        this.dateArr = []
        for (let i = 0; i < 7; i++) {
          str = (new Date(time.getTime() - 86400000 * i).getMonth() + 1) < 10 ? '0'+(new Date(time.getTime() - 86400000 * i).getMonth() + 1) : (new Date(time.getTime() - 86400000 * i).getMonth() + 1)
          let str2 = (new Date(time.getTime() - 86400000 * i).getDate()) < 10 ? '0'+(new Date(time.getTime() - 86400000 * i).getDate()) : (new Date(time.getTime() - 86400000 * i).getDate())
          this.dateArr.unshift(
            str + "." + str2
          );
        }
        pojo = {
          startDate: '',
          endDate: ''
        }
      }
      console.log(pojo)
      apiRequest.getTransactionDistribution(pojo).then(res=>{
        console.log(res)
        if(res.data.code == 0){
          let isExist = false
          let arr = res.data.data
          for(let i = 0; i < this.dateArr.length; i++){
            isExist = false
            for(let j = 0; j < arr.length; j++){
              if(this.dateArr[i] == arr[j].date){
                isExist = true
                switch(data){
                  case '1':
                    this.dateVal[i] = arr[j].transPrice
                    break
                  case '2':
                    this.dateVal[i] = arr[j].count
                    break
                  case '3':
                    this.dateVal[i] = arr[j].avgPrice
                    break
                }
                break
              }
            }
            if(!isExist){
              this.dateVal[i] = 0
            }
          }
          this.initCharts(
            "tradeFrom",
            this.dateArr,
            this.dateVal
          )
        }
      })
    },
    // 时间分布数据请求
    timeFromSearch(){
      let pojo = {}
      if(this.timeValue){
        pojo = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
      }else{
        let time = new Date();
        let str = ''
        this.dateArr = []
        for (let i = 0; i < 7; i++) {
          str = (new Date(time.getTime() - 86400000 * i).getMonth() + 1) < 10 ? '0'+(new Date(time.getTime() - 86400000 * i).getMonth() + 1) : (new Date(time.getTime() - 86400000 * i).getMonth() + 1)
          let str2 = (new Date(time.getTime() - 86400000 * i).getDate()) < 10 ? '0'+(new Date(time.getTime() - 86400000 * i).getDate()) : (new Date(time.getTime() - 86400000 * i).getDate())
          this.dateArr.unshift(
            str + "." + str2
          );
        }
        pojo = {
          startDate: '',
          endDate: ''
        }
      }
      apiRequest.getTimeDistribution(pojo).then(res=>{
        console.log(res)
        if(res.data.code == 0){
          let isExist = false
          let arr = res.data.data
          for(let i = 0; i < this.dateArr.length; i++){
            isExist = false
            for(let j = 0; j < arr.length; j++){
              if(this.dateArr[i] == arr[j].date){
                isExist = true
                this.timeFromMoneyArr[i] = arr[j].sumPrice
                this.timeFromCountArr[i] = arr[j].totalNumber
                break
              }
            }
            if(!isExist){
              this.timeFromMoneyArr[i] = 0
              this.timeFromCountArr[i] = 0
            }
          }
          this.goodsCharts(
            'goodsTimeCan',
            this.dateArr,
            this.timeFromMoneyArr,
            this.timeFromCountArr
          )
        }
      })
    },
    // 商品销售情况信息
    goodsInfoSearch(){
      let pojo = {}
      if(this.timeValue){
        pojo = {
          startDate: this.timeValue[0],
          endDate: this.timeValue[1]
        }
      }else{
        pojo = {
          startDate: '',
          endDate: ''
        }
      }
      apiRequest.getPriceAndCount(pojo).then(res=>{
        // console.log(res)
        if(res.data.code == 0){
          this.goodsBuyData.price = res.data.data.totalPrice
          this.goodsBuyData.count = res.data.data.totalNumber
        }
      })
    },
    // 打印成pdf
    savePdf() {
      this.$PDFSave(this.$refs.exportPdf, "数据分析");
    },
    // 交易图表
    initCharts(dom, dataRow, dataVal) {
      let tradePriceDom = document.getElementById(dom);
      let myChart = echarts.init(tradePriceDom);
      let option;
      option = {
        xAxis: {
          type: "category",
          data: dataRow,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: "value",
        },
        grid: {
            left: '20%'
        },
        dataZoom: [
          {
              show: true,
              realtime: true,
              start: 0,
              end: 100
          },
          {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 90
          }
        ],
        series: [
          {
            data: dataVal,
            type: "bar",
            name: "销量",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    // fontSize: 16
                  },
                },
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    stateChange(data){
      switch(data){
        case '0':
          return '较上周 ↓'
        case '1':
          return '较上周 ↑'
        case '2':
          return '较上周 ——'
      }
    },
    // 商品图表
    goodsCharts(dom, dataRow, dataVal1, dataVal2){
        let chartDom = document.getElementById(dom);
        let myChart = echarts.init(chartDom);
        let option;
        let colors = ['#5470C6', '#EE6666']
        option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                // right: '10%',
                left: '20%'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true,name:'时间分布图'}
                }
            },
            legend: {
                data: ['购买金额', '购买数量']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: dataRow
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '购买金额',
                    // min: 0,
                    // max: 250,
                    position: 'left',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 元'
                    }
                },
                {
                    type: 'value',
                    name: '购买数量',
                    // min: 0,
                    // max: 25,
                    position: 'right',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 件'
                    }
                }
            ],
            dataZoom: [
              {
                  show: true,
                  realtime: true,
                  start: 0,
                  end: 100
              },
              {
                  type: 'inside',
                  realtime: true,
                  start: 0,
                  end: 90
              }
            ],
            series: [
                {
                    name: '购买金额',
                    type: 'bar',
                    data: dataVal1
                },
                {
                    name: '购买数量',
                    type: 'line',
                    yAxisIndex: 1,
                    data: dataVal2
                }
            ]
        }
        option && myChart.setOption(option)
    },
    // 改变时间
    dateChange(date) {
      console.log(date)
      if (date) {
        let that = this;
        if (date[1].getTime() - date[0].getTime() > 2592000000) {
          this.$alert("查询时间范围不能超过一个月！", "提示", {
            confirmButtonText: "确定",
            callback() {
              // date = null
              that.timeValue = "";
            },
          });
        } else {
          that.dateArr = []
          let count = 0
          that.getAllDate(that.dateArr,count,date[0],date[1])   // 获取所有选中的日期
          that.tradeFromTab(that.tradeDistribution)
          that.singlePriceSearch()
          that.timeFromSearch()
          that.locationFromSearch()
          that.goodsInfoSearch()
          console.log(that.timeValue);
        }
      }
    },
    randomNum(val,valRange,valAdd){
      let newArr = []
      for(let i = 0; i < val; i++){
        newArr.push(parseInt(Math.random() * valRange) + valAdd)
      }
      return newArr
    },
    getAllDate(arr,count,beforeDate,afterDate){
      if((afterDate.getTime() - 86400000 * count) >= beforeDate.getTime()){
        let str1 = (new Date(afterDate.getTime() - 86400000 * count).getMonth()+1) < 10 ? '0'+(new Date(afterDate.getTime() - 86400000 * count).getMonth()+1) : (new Date(afterDate.getTime() - 86400000 * count).getMonth()+1)
        let str2 = (new Date(afterDate.getTime() - 86400000 * count).getDate()) < 10 ? '0'+(new Date(afterDate.getTime() - 86400000 * count).getDate()) : (new Date(afterDate.getTime() - 86400000 * count).getDate())
        arr.unshift(str1 + '.' + str2)
        count = count + 1
        // console.log(arr)
        this.getAllDate(arr,count,beforeDate,afterDate)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #f7f7f7;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.indexData {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.indexDataLeft {
  width: 100%;
  // height: ;
  .el-tabs {
    width: 100%;
    // text-align: center;
    // .el-tab-pane{
    //     height: 100px;
    // }
  }
}
.tradeSection {
  padding-top: 20px;
}
h3 {
  height: 50px;
  line-height: 50px;
}
.el-button {
  width: 80px;
  height: 80%;
}
.goodsBuyDate{
    width: 100%;
    display: flex;
    .goodsBuyPrice,.goodsBuyCount{
        width: 50%;
        .goodsBuy{
            width: 100%;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
        }
    }
}
</style>