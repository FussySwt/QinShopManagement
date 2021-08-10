<template>
    <div class="OrderListManagement">
        <el-row class="orderListTop">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.orderNumber" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="下单时间">
                    <el-date-picker
                    v-model="formInline.orderTime"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderState" placeholder="请选择订单状态">
                    <el-option label="待付款" value="1"></el-option>
                    <el-option label="已付款" value="2"></el-option>
                    <el-option label="待发货" value="3"></el-option>
                    <el-option label="待收货" value="4"></el-option>
                    <el-option label="已完成" value="5"></el-option>
                    <el-option label="已关闭" value="6"></el-option>
                    <el-option label="已取消" value="7"></el-option>
                    <el-option label="已删除" value="8"></el-option>
                    <el-option label="已退款" value="9"></el-option>
                    <el-option label="申请退款" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="searchList">确定</el-button>
                    <el-button type="plain" @click="resetList">重置</el-button>
                </el-form-item> -->
            </el-form>
            <div style="margin:30px 0;">
                <el-row>
                    <el-col>
                        <el-button type="primary" style="width:100px;" @click="searchList">确定</el-button>
                        <el-button type="plain" style="width:100px;" @click="resetList">重置</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-row>
        <el-row>
            <el-table
                :data="orderList"
                border
                style="width: 100%"
                :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
                :cell-style="{'text-align':'center'}">
                <el-table-column
                prop="orderNo"
                label="订单号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="userId"
                label="用户id"
                width="180">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="姓名"
                width="180">
                </el-table-column>
                <!-- <el-table-column
                prop="goodsId"
                label="商品id"
                width="180">
                </el-table-column>
                <el-table-column
                prop="goodsName"
                label="商品名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="skuId"
                label="sku_id"
                width="180">
                </el-table-column>
                <el-table-column
                prop="specName"
                label="规格名称"
                width="180">
                </el-table-column> -->
                <el-table-column
                prop="orderAddress"
                label="下单地址"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderTime"
                label="下单时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="payTime"
                label="支付时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="totalPrice"
                label="总金额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="payPrice"
                label="实付金额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderState"
                label="订单状态"
                width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    style="height:100%">
                    <template slot-scope="scope">
                        <el-button @click="checkOrderList(scope)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :page-size="pageInfo.pageSize"
                :page-count="pageInfo.totalPages"
                layout="prev, pager, next"
                @current-change="changePages">
            </el-pagination>
        </el-row>
        <el-dialog
            title="订单管理"
            :visible.sync="orderListVisible"
            width="60%"
            :close-on-click-modal="false">
            <div class="dialogMiddle" v-if="singleOrderListInfo != {}">
                <el-row class="orderListTitle">
                    <el-col :span="8">
                        <h3>订单信息</h3>
                    </el-col>
                    <el-col :offset="8">
                        <div class="orderListState">
                            <span>订单状态</span>
                            <span class="stateName">{{singleOrderListInfo.orderState}}</span>
                            <el-button type="primary" v-if="singleOrderListInfo.orderState=='申请退款'" @click="returnMoney">同意</el-button>
                            <el-button type="danger" v-if="singleOrderListInfo.orderState=='申请退款'" @click="returnSend">拒绝</el-button>
                        </div>
                    </el-col>
                </el-row>
                <div class="orderListMsg">
                    <el-row>
                        <el-col :span="6">订单编号</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.orderNo}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">下单时间</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.orderTime}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">支付时间</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.payTime}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">付款金额</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.payPrice}}</el-col>
                    </el-row>
                </div>
                <el-row class="orderListTitle">
                    <el-col :span="8">
                        <h3>商品管理</h3>
                    </el-col>
                </el-row>
                <div class="goodsMsg" v-for="(data,index) in goodsList" :key="data.skuId">
                    <el-row>
                        <el-col :span="6">商品编号</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{data.goodsId}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">商品名称</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{data.goodsName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">规格编号</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{data.skuId}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">规格名称</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{data.specName}}</el-col>
                    </el-row>
                </div>
                <el-row class="orderListTitle">
                    <el-col :span="8">
                        <h3>用户信息</h3>
                    </el-col>
                </el-row>
                <div class="userMsg">
                    <el-row>
                        <el-col :span="6">用户编号</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.userId}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">姓名</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.userName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">地址</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.orderAddress}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">联系方式</el-col>
                        <el-col class="colRight" :span="16" :offset="2">{{singleOrderListInfo.contract}}</el-col>
                    </el-row>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { orderListExchange } from '@/common/exchange'
import queryRequest from '@/api/api'
export default {
    data(){
        return{
            // 订单详情对话框显示/隐藏
            orderListVisible: false,
            // 单个订单所有信息
            singleOrderListInfo: {},
            // 顶部搜索选项
            formInline: {
                orderNumber: '',
                orderTime: '',
                orderState: ''
            },
            //需要给分页组件传的信息
            pageInfo: {
                pageNo: 1,//
                pageSize: 10,//每页条数
                totalCount: 0, //总条数
                totalPages: 1 //总页数
            },
            goodsList: [],
            // 表格属性字段
            orderList: [
                // {
                //     orderNo: '1235',
                //     userId: '01',
                //     userName: '王小虎',
                //     goodsId: '1352542',
                //     goodsName: '拼夕夕手表',
                //     skuId: '4124',
                //     specName: '琥珀金',
                //     orderAddress: '上海市普陀区金沙江路 1518 弄',
                //     orderTime: '2021-06-22 15:34:46',
                //     payTime: '2021-06-22 16:12:04',
                //     totalPrice: 299,
                //     payPrice: 249,
                //     orderState: 2,
                //     contract: '1234567890'
                // },
                // {
                //     orderNo: '1235',
                //     userId: '01',
                //     userName: '王小虎',
                //     goodsId: '1352542',
                //     goodsName: '拼夕夕手表',
                //     skuId: '4124',
                //     specName: '琥珀金',
                //     orderAddress: '上海市普陀区金沙江路 1518 弄',
                //     orderTime: '2021-06-22 15:34:46',
                //     payTime: '2021-06-22 16:12:04',
                //     totalPrice: 299,
                //     payPrice: 249,
                //     orderState: 2,
                //     contract: '1234567890'
                // }
            ]
        }
    },
    created(){
        this.searchOrderList({
            pageNumber: 1,
            pageSize: 10
        })
    },
    mounted(){
        // orderListExchange(this.orderList)
    },
    methods:{
        // 按条件搜索
        searchList() {
            console.log(this.formInline.orderTime)
            let startTime = ''
            let endTime = ''
            if(this.formInline.orderTime.length > 0){
                startTime = this.moment(this.formInline.orderTime[0]).format('YYYY-MM-DD HH:mm:ss')
                endTime = this.moment(this.formInline.orderTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            let data = {
                orderNo: this.formInline.orderNumber,
                startTime: startTime,
                endTime: endTime,
                status: this.formInline.orderState,
                pageNumber: 1,
                pageSize: 10
            }
            this.searchOrderList(data)
        },
        // 重置订单信息
        resetList(){
            this.formInline.orderNumber = ''
            this.formInline.orderTime = []
            this.formInline.orderState = ''
            let data = {
                pageNumber: 1,
                pageSize: 10
            }
            this.searchOrderList(data)
        },
        // 申请退款
        returnMoney(){
            let that = this
            this.$confirm('你确定要退款吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let pojo = {
                    orderNo: that.singleOrderListInfo.orderNo,
                    total: that.singleOrderListInfo.payPrice,
                    refund: that.singleOrderListInfo.payPrice
                }
                queryRequest.refund(pojo).then(res=>{
                    if(res.data.code == 0){
                        that.$alert('退款成功','提示',{
                            confirmButtonText: '确定',
                            callback(e){
                                that.orderListVisible = false
                                that.formInline.orderNumber = ''
                                that.formInline.orderTime = []
                                that.formInline.orderState = ''
                                let data = {
                                    pageNumber: 1,
                                    pageSize: 10
                                }
                                that.searchOrderList(data)
                            }
                        })
                    }
                })
            })
        },
        returnSend(){
            console.log('拒绝')
        },
        // 查看订单信息
        checkOrderList(scope){
            this.orderListVisible = true
            this.singleOrderListInfo = scope.row
            // let str = scope.row.orderAddress.concat('')
            // this.singleOrderListInfo.orderAddress = str
            this.goodsList = []
            console.log(this.singleOrderListInfo)
            let pojo = {
                orderNo: scope.row.orderNo
            }
            queryRequest.getSingleOrderList(pojo).then(res=>{
                console.log(res)
                if(res.data.code == 0){
                    let data = res.data.data
                    data.goodsList.forEach(item=>{
                        this.goodsList.push({
                            goodsId: item.goodsId,
                            goodsName: item.goods.goodsName,
                            skuId: item.skuId,
                            specName: item.sku.skuName
                        })
                    })
                }
            })
        },
        searchOrderList(data){
            queryRequest.getOrderListInfo(data).then(res=>{
                if(res.data.code == 0){
                    this.orderList = []
                    res.data.data.orderList.forEach(item=>{
                        let arr = [item.address.addrProvince,item.address.addrCity,item.address.addrArea,item.address.consigneeAddr].join('')
                        this.orderList.push({
                            orderNo: item.orderNo,
                            userId: item.address.openId,
                            userName: item.address.consigneeName,
                            orderAddress: arr,
                            orderTime: item.placeOrderTime,
                            payTime: item.payTime == null ? '未支付' : item.payTime,
                            totalPrice: item.price,
                            payPrice: item.price,
                            orderState: item.orderStatus,
                            contract: item.address.consigneePhone
                        })
                    })
                    this.pageInfo.pageNumber = res.data.data.page.pageNo
                    this.pageInfo.totalPages = res.data.data.page.totalPages
                    orderListExchange(this.orderList)
                }
            })
        },
        changePages(val){
            let data = {
                orderNo: this.formInline.orderNumber,
                startTime: this.formInline.orderTime[0],
                endTime: this.formInline.orderTime[1],
                status: this.formInline.orderState,
                pageNumber: val,
                pageSize: 10
            }
            this.searchOrderList(data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .orderListTop{
        width: 100%;
        padding-top: 20px;
    }
    // .el-table{
    //     ::-webkit-scrollbar{
    //         height: 12px;
    //     }
    //     ::-webkit-scrollbar-thumb {
    //         /*滚动条里面小方块*/
    //         border-radius: 10px;
    //         background-color: #02adf7;
    //         background-image: -webkit-linear-gradient(45deg, #ffffff94,#409EFF,#ffffff94);
    //     }
    //     ::-webkit-scrollbar-track {
    //         /*滚动条里面轨道*/
    //         // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //     }
    // }
    .orderListState{
        display: flex;
        justify-content: center;
        .stateName{
            // margin-right: 30px;
            margin:0 30px;
        }
    }
    // 订单信息
    .orderListMsg,.goodsMsg,.userMsg{
        width: 100%;
        .el-row{
            height: 30px;
            margin: 10px;
        }
        .colRight{
            text-align: left;
        }
    }
    .goodsMsg{
        margin-bottom: 50px;
    }
    .orderListTitle{
        // height: 50px;
        display: flex;
        // justify-content: ;
        .el-col{
            line-height: 50px;
        }
    }
    .dialogMiddle{
        height: calc(120vh / 2);
        overflow-y: scroll;
        h3{
            text-align: left;
            text-indent: 2em;
        }
    }
</style>