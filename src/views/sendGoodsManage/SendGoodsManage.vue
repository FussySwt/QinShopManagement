<template>
    <div>
        <el-row class="orderListTop">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="发货单号：">
                    <el-input v-model="invoiceNo" placeholder="请输入发货单号"></el-input>
                </el-form-item>
                <el-form-item label="发货状态：">
                    <el-select v-model="invoiceState" placeholder="请选择发货状态">
                    <el-option label="已发货" value="1"></el-option>
                    <el-option label="已完成" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="margin:30px 0;">
                <el-row>
                    <el-col>
                        <el-button type="primary" style="width:100px;" @click="searchList">确定</el-button>
                        <el-button type="plain" style="width:100px;" @click="resetList">重置</el-button>
                        <el-button type="primary" style="width:100px;" @click="createInvoice">新建</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="invoiceList"
                border
                style="width: 100%"
                :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
                :cell-style="{'text-align':'center'}">
                <el-table-column
                prop="invoiceNo"
                label="发货单号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderNo"
                label="订单编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="openId"
                label="用户ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderName"
                label="用户姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderPhone"
                label="联系方式"
                width="180">
                </el-table-column>
                <el-table-column
                prop="orderAddress"
                label="联系地址"
                width="180">
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="goodsState"
                label="发货状态"
                width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="100"
                    style="height:100%;">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button v-show="scope.row.goodsState == '已完成'" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
            :title="isEdit ? '编辑发货单' : '新建发货单'"
            :visible.sync="createVisible"
            width="60%"
            :close-on-click-modal="false">
            <div class="dialogMiddle">
                <el-row class="orderListTitle">
                    <el-col :span="8">
                        <h3>发货信息</h3>
                    </el-col>
                </el-row>
                <div class="orderListMsg">
                    <el-row class="elRow" v-if="isEdit">
                        <el-col :span="6">原发货单编号：</el-col>
                        <el-col class="colRight" :span="16">
                            <el-input v-model="createList.invoiceNo" :disabled="true"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elRow">
                        <el-col :span="6">新发货单编号：</el-col>
                        <el-col class="colRight" :span="16">
                            <el-input v-model="createList.newInvoiceNo" placeholder="请输入新发货单编号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elRow">
                        <el-col :span="6">物流公司：</el-col>
                        <el-col class="colRight" :span="16">
                            <el-input v-model="createList.company" placeholder="请输入物流公司"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elRow" v-if="!isEdit">
                        <el-col :span="6">订单编号：</el-col>
                        <el-col class="colRight" :span="16">
                            <el-input v-model="createList.orderNo" placeholder="请输入订单编号"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickCreateInvoice">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import queryRequest from '@/api/api';
import { expressListExchange } from '@/common/exchange'
export default {
    name: 'sendGoodsManage',
    data(){
        return {
            createVisible: false,
            invoiceNo: '',
            invoiceState: '',
            invoiceList: [
                // {
                //     invoiceNo: '',
                //     orderNo: '',
                //     openId: '',
                //     orderName: '',
                //     orderPhone: '',
                //     orderAddress: '',
                //     createTime: '',
                //     goodsState: ''
                // }
            ],
            createList:{
                invoiceNo: '',
                newInvoiceNo: '',
                company: '',
                orderNo: ''
            },
            isEdit: false,
            //需要给分页组件传的信息
            pageInfo: {
                pageNo: 1,//
                pageSize: 10,//每页条数
                totalCount: 0, //总条数
                totalPages: 1 //总页数
            }
        }
    },
    created(){
        let data = {
            expressNo: this.invoiceNo,
            pageNumber: 1,
            pageSize: 4,
            expressStatus: this.invoiceState
        }
        this.searchExpress(data)
    },
    methods: {
        handleEdit(data){
            this.isEdit = true
            this.createVisible = true
            this.createList.invoiceNo = data.invoiceNo
            this.createList.company = data.company
            this.createList.orderNo = data.orderNo
        },
        handleDelete(data){
            let that = this
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(123)
                let pojo = {
                    expressNo: data.invoiceNo
                }
                queryRequest.deleteExpress(pojo).then(res=>{
                    if(res.data.code == 0){
                        console.log(res)
                        that.$alert('删除成功！','提示',{
                            confirmButtonText: '确定',
                            callback(e){
                                let data = {
                                    expressNo: that.invoiceNo,
                                    pageNumber: 1,
                                    pageSize: 10,
                                    expressStatus: that.invoiceState
                                }
                                this.searchExpress(data)
                            }
                        })
                    }else{
                        that.$alert('删除失败！','提示',{
                            confirmButtonText: '确定'
                        })
                    }
                })
            })
        },
        changePages(val){
            let data = {
                expressNo: this.invoiceNo,
                pageNumber: val,
                pageSize: 10,
                expressStatus: this.invoiceState
            }
            this.searchExpress(data)
        },
        // 新建发货单
        createInvoice(){
            this.isEdit = false
            this.createVisible = true
            this.createList.invoiceNo = ''
            this.createList.newInvoiceNo = ''
            this.createList.company = ''
            this.createList.orderNo = ''
        },
        // 查询
        searchList(){
            let data = {
                expressNo: this.invoiceNo,
                pageNumber: 1,
                pageSize: 10,
                expressStatus: this.invoiceState
            }
            this.searchExpress(data)
        },
        // 重置
        resetList(){
            this.invoiceNo = ''
            this.invoiceState = ''
            let data = {
                expressNo: this.invoiceNo,
                pageNumber: 1,
                pageSize: 10,
                expressStatus: this.invoiceState
            }
            this.searchExpress(data)
        },
        // 点击新建
        async clickCreateInvoice(){
            let that = this
            if(this.isEdit){
                let data = {
                    oldExpressNo: this.createList.invoiceNo,
                    newExpressNo: this.createList.newInvoiceNo,
                    expressCompany: this.createList.company,
                    orderNo: this.createList.orderNo
                }
                try{
                    await queryRequest.updateExpress(data).then(res=>{
                        if(res.data.code == 0){
                            this.$alert('修改发货单成功！','提示',{
                                confirmButtonText: '确定',
                                callback(e){
                                    that.createVisible = false
                                    let data = {
                                        expressNo: this.invoiceNo,
                                        pageNumber: 1,
                                        pageSize: 10,
                                        expressStatus: this.invoiceState
                                    }
                                    this.searchExpress(data)
                                }
                            })
                        }else{
                            this.$alert('修改发货单失败！','提示',{
                                confirmButtonText: '确定',
                                callback(e){
                                    that.createVisible = false
                                    let data = {
                                        expressNo: this.invoiceNo,
                                        pageNumber: 1,
                                        pageSize: 10,
                                        expressStatus: this.invoiceState
                                    }
                                    this.searchExpress(data)
                                }
                            })
                        }
                    })
                }catch(e){
                    console.log(e)
                    alert('参数有误，请求失败！')
                }
            }else{
                let data = {
                    expressNo: this.createList.newInvoiceNo,
                    orderNo: this.createList.orderNo,
                    expressCompany: this.createList.company
                }
                try{
                    await queryRequest.createExpress(data).then(res=>{
                        console.log(res)
                        if(res.data.code == 0){
                            this.$alert('新建发货单成功！','提示',{
                                confirmButtonText: '确定',
                                callback(e){
                                    that.createVisible = false
                                    let pojo = {
                                        expressNo: that.invoiceNo,
                                        pageNumber: 1,
                                        pageSize: 10,
                                        status: that.invoiceState
                                    }
                                    that.searchExpress(pojo)
                                }
                            })
                        }else{
                            alert('参数有误，新建失败！')
                        }
                    })
                }catch(e){
                    console.log(e)
                    alert('参数有误，新建失败！')
                }
            }
        },
        // 查询发货单信息
        searchExpress(data){
            queryRequest.getExpress(data).then(res=>{
                if(res.data.code == 0){
                    console.log(res)
                    this.pageInfo.pageNo = res.data.data.page.pageNo
                    this.pageInfo.totalPages = res.data.data.page.totalPages
                    this.invoiceList = []
                    let list = res.data.data.expressList
                    console.log(list)
                    expressListExchange(list)
                    list.forEach(item=>{
                        let arr = [item.order.address.addrProvince,item.order.address.addrCity,item.order.address.addrArea,item.order.address.consigneeAddr].join('')
                        this.invoiceList.push({
                            invoiceNo: item.expressNo,
                            orderNo: item.orderNo,
                            openId: item.order.openId,
                            orderName: item.order.address.consigneeName,
                            orderPhone: item.order.address.consigneePhone,
                            orderAddress: arr,
                            createTime: item.order.placeOrderTime,
                            goodsState: item.expressStatus,
                            company: item.expressCompany
                        })
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .orderListTop{
        width: 100%;
        padding-top: 20px;
    }
    .dialogMiddle{
        // height: calc(120vh / 2);
        // overflow-y: scroll;
        h3{
            text-align: left;
            text-indent: 2em;
        }
    }
    .elRow{
        margin:20px 0;
        display:flex;
        align-items:center;
    }
</style>
