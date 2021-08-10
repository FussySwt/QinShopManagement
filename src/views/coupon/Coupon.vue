<template>
    <div class="Coupon">
        <el-row class="headBtn">
            <el-col :span='8' :offset="16">
                <el-button type="primary" size="small" @click="addNewGoods" round>新增商品</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="goodsArr"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :cell-style="{'text-align':'center'}"
            >
            <el-table-column
                prop="couponId"
                label="优惠券id">
            </el-table-column>
            <el-table-column
                prop="couponName"
                label="优惠券名称">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间">
            </el-table-column>
            <el-table-column
                prop="suitAbleGoods"
                label="适用商品">
            </el-table-column>
            <el-table-column
                label="满减方式">
                <template slot-scope="scope">
                    <p>满{{scope.row.fullMinusMode.reach}}元，减{{scope.row.fullMinusMode.reduce}}元</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="couponType"
                label="优惠券类型">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteCoupon(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination
            layout="prev, pager, next"
            @current-change="changePages"
            :total="100">
        </el-pagination> -->
        <!-- 新增商品提示框 -->
        <el-dialog
        :title="isFromAdd ? '新建优惠券' : '编辑优惠券'"
        :visible.sync="insertCouponVisible"
        :close-on-click-modal="false"
        width="50%">
            <el-form :model="couponInfo">
                <el-form-item label="优惠券名称：">
                    <el-input v-model="couponInfo.name" style="width:60%;"></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型：">
                    <el-select v-model="couponInfo.selectType" placeholder="请选择">
                        <el-option
                        v-for="item in couponType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker
                        v-model="couponInfo.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker
                        v-model="couponInfo.endTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="满减方式：">
                    <span v-show="isFromAdd">满<el-input style="width:60px;margin:0 10px" v-model="couponInfo.type.reach"></el-input>元，减<el-input style="width:60px;margin:0 10px" v-model="couponInfo.type.reduce"></el-input>元</span>
                    <span v-show="!isFromAdd">满{{couponInfo.type.reach}}元，减{{couponInfo.type.reduce}}元</span>
                </el-form-item>
                <el-form-item label="选择商品：">
                    <el-button type="primary" v-show="selectGoods == ''" @click="insertGoodsVisible = true;" round>添加</el-button>
                    <p v-show="selectGoods != ''">{{selectGoods}}<span class="el-icon-delete deleteGoods" @click="deleteSelectGood"></span></p>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertCouponVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOperation(isFromAdd)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加商品对话框 -->
        <el-dialog
        title="添加商品"
        :visible.sync="insertGoodsVisible"
        :close-on-click-modal="false"
        width="30%">
            <el-form>
                <el-form-item>
                    <el-input v-model="insertValue" style="width:200px;"></el-input>
                    <el-button type="text" @click="searchGoods(insertValue)" style="margin-left:20px;">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <div class="outerSearch">
                        <p v-for="(data,index) in insertSearchGoods" :key="index" @click="changeSelectGoods(data)" :class="selectGoodsId == data.id ? 'activeGoods' : ''">{{data.name}}</p>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertGoodsVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmGoods(selectGoods)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            goodsArr: [
                {
                    couponId: '1235',
                    couponName: '手机折扣券',
                    startTime: '2021-06-23',
                    endTime: '2021-06-30',
                    suitAbleGoods: '手机',
                    fullMinusMode: {
                        reach: '199',
                        reduce: '50'
                    },
                    couponType: '满减券'
                }
            ],
            // 搜索后的商品
            insertSearchGoods:[
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        let date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        let date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            // 新建优惠券的优惠券类型
            couponType: [
                {
                    label: '满减券',
                    value: 1001,
                },
                {
                    label: '折扣券',
                    value: 1002
                },
                {
                    label: '代金券',
                    value: 1003
                }
            ],
            // 新增优惠券信息
            couponInfo: {
                name: '',
                startTime: '',
                endTime: '',
                selectType: '',
                type: {
                    reach: '99',      // 满x元
                    reduce: '30'      // 减x元
                },
                goodsName: ''
            },
            insertCouponVisible: false,
            insertGoodsVisible: false,
            insertValue: '',
            selectGoods: '',
            selectGoodsId: '',
            isFromAdd: true
        }
    },
    methods:{
        // 新增商品
        addNewGoods(){
            this.insertCouponVisible = true
            this.isFromAdd = true
            this.couponInfo = {
                name: '',
                selectType: '',
                startTime: '',
                endTime: '',
                type: {
                    reach:'',
                    reduce: ''
                },
            }
            this.selectGoods = ''
            this.selectGoodsId = ''
        },
        deleteCoupon(data){
            console.log(data)
        },
        // 选中商品
        confirmGoods(data){
            console.log(this.selectGoods)
            if(data == ''){
                this.$alert('请选择商品','提示',{
                    confirmButtonText: '确定'
                })
            }else{
                this.insertGoodsVisible = false
            }
        },
        // 编辑商品
        handleEdit(data){
            this.insertCouponVisible = true
            this.isFromAdd = false
            this.couponInfo = {
                name: data.couponName,
                selectType: data.couponType,
                startTime: data.startTime,
                endTime: data.endTime,
                type: {
                    reach:data.fullMinusMode.reach,
                    reduce: data.fullMinusMode.reduce
                },
            }
            this.selectGoods = data.suitAbleGoods
        },
        // 选中/修改商品
        changeSelectGoods(good){
            this.selectGoods = good.name
            this.selectGoodsId = good.id
        },
        // 删除选中商品
        deleteSelectGood(){
            this.selectGoods = ''
            this.selectGoodsId = ''
        },
        // 保存操作
        saveOperation(data){
            let that = this
            if(data){
                this.$alert('新建成功','提示',{
                    confirmButtonText: '确定',
                    callback(){
                        that.insertCouponVisible = false
                    }
                })
            }else{
                this.$alert('编辑成功','提示',{
                    confirmButtonText: '确定',
                    callback(){
                        that.insertCouponVisible = false
                    }
                })
            }
        },
        // 搜索商品
        searchGoods(data){
            console.log(data)
        this.insertSearchGoods = [
                {
                    id:1001,
                    name: '商品1'
                },
                {
                    id:1002,
                    name: '商品2'
                },
                {
                    id:1003,
                    name: '商品3'
                },
                {
                    id:1004,
                    name: '商品4'
                },
                {
                    id:1005,
                    name: '商品5'
                },{
                    id:1001,
                    name: '商品1'
                },
                {
                    id:1002,
                    name: '商品2'
                },
                {
                    id:1003,
                    name: '商品3'
                },
                {
                    id:1004,
                    name: '商品4'
                },
                {
                    id:1005,
                    name: '商品5'
                },{
                    id:1001,
                    name: '商品1'
                },
                {
                    id:1002,
                    name: '商品2'
                },
                {
                    id:1003,
                    name: '商品3'
                },
                {
                    id:1004,
                    name: '商品4'
                },
                {
                    id:1005,
                    name: '商品5'
                },{
                    id:1001,
                    name: '商品1'
                },
                {
                    id:1002,
                    name: '商品2'
                },
                {
                    id:1003,
                    name: '商品3'
                },
                {
                    id:1004,
                    name: '商品4'
                },
                {
                    id:1005,
                    name: '商品5'
                },{
                    id:1001,
                    name: '商品1'
                },
                {
                    id:1002,
                    name: '商品2'
                },
                {
                    id:1003,
                    name: '商品3'
                },
                {
                    id:1004,
                    name: '商品4'
                },
                {
                    id:1005,
                    name: '商品5'
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .headBtn{
        width: 100%;
        height: 80px;
        line-height: 80px;
    }
    .outerSearch{
        width: 100%;
        height: 100%;
        // border: solid 1px #909090;
        max-height: 200px;
        overflow-y: auto;
        p{
            cursor: pointer;
            transition: all .3s;
            text-align: left;
            text-indent: 2em;
        }
        p:hover{
            background-color: #909090;
            color: #FFFFFF;
        }
        .activeGoods{
            background-color: #909090;
            color: #FFFFFF;
        }
    }
    .deleteGoods{
        cursor: pointer;
        transition: all .2s;
        margin-left: 30px;
    }
    .deleteGoods:hover{
        color: #409EFF;
    }
</style>