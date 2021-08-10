<template>
    <div class="seckill">
        <el-row class="headBtn">
            <el-col :span='8' :offset="16">
                <el-button type="primary" size="small" @click="addNewSeckill" round>新建秒杀</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="seckillArr"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :cell-style="{'text-align':'center'}"
            >
            <el-table-column
                prop="secName"
                label="活动名称">
            </el-table-column>
            <el-table-column
                prop="date"
                label="活动日期">
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
                label="上下架"
                style="height:100%">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.upGoodsState"
                    active-color="#13ce66"
                    @change="groupRowStateChange(scope)"
                    inactive-color="#C0CCDA">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button @click="addGoods(scope.row)" type="text" size="small">添加商品</el-button>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteSeckill(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="pageInfo.pageSize"
            :page-count="pageInfo.totalPages"
            layout="prev, pager, next"
            @current-change="changePages">
        </el-pagination>
        <el-dialog
        title="新建秒杀"
        :visible.sync="seckillVisible"
        width="50%"
        :close-on-click-modal="false">
            <div class="secInput">
                <div style="width:100px;">活动名称：</div>
                <el-input v-model="seckillInfo.secName" style="width:300px;"></el-input>
            </div>
            <div class="sessionSection">
                <div class="sessionItem" v-for="(data,index) in seckillInfo.sessionList" :key="index">
                    <el-popover
                        placement="bottom"
                        width="400"
                        trigger="click">
                        <el-form :inline="true">
                            <el-form-item label="活动日期：">
                                <el-date-picker
                                v-model="data.date"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="开始时间：">
                                <el-time-select
                                    @change="timeChange(data)"
                                    placeholder="起始时间"
                                    v-model="data.startTime"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:01',
                                    end: '24:00'
                                    }">
                                </el-time-select>
                            </el-form-item>
                            <el-form-item label="结束时间：">
                                <el-time-select
                                    @change="timeChange(data)"
                                    placeholder="结束时间"
                                    v-model="data.endTime"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:01',
                                    end: '24:00',
                                    minTime: data.startTime
                                    }">
                                </el-time-select>
                            </el-form-item>
                            <!-- <el-form-item label="选择商品：">
                                <el-button type="primary">添加</el-button>
                            </el-form-item> -->
                        </el-form>
                        <el-button slot="reference">{{data.startTime}}-{{data.endTime}}</el-button>
                    </el-popover>
                </div>
                <div class="sessionItem">
                    <el-button type="plain" @click="addSecSession"><i class="el-icon-plus"></i>&nbsp;添加场次</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="clickAddSeckill">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="编辑秒杀"
        :visible.sync="editSeckillVisible"
        width="70%"
        :close-on-click-modal="false">
            <div style="height:40vh;overflow-y:scroll;">
                <div class="secInput">
                    <div style="width:100px;">活动名称：</div>
                    <el-input v-model="selectTime.secName" style="width:300px;"></el-input>
                </div>
                <div class="sessionSection">
                    <div style="width:100px;">活动时间：</div>
                    <div class="sessionItem">
                        <el-popover
                            placement="bottom"
                            width="400"
                            trigger="click">
                            <el-form :inline="true">
                                <el-form-item label="活动日期：">
                                    <el-date-picker
                                    v-model="selectTime.date"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="开始时间：">
                                    <el-time-select
                                        @change="timeChange(data)"
                                        placeholder="起始时间"
                                        v-model="selectTime.startTime"
                                        :picker-options="{
                                        start: '00:00',
                                        step: '00:01',
                                        end: '24:00'
                                        }">
                                    </el-time-select>
                                </el-form-item>
                                <el-form-item label="结束时间：">
                                    <el-time-select
                                        @change="timeChange(data)"
                                        placeholder="结束时间"
                                        v-model="selectTime.endTime"
                                        :picker-options="{
                                        start: '00:00',
                                        step: '00:01',
                                        end: '24:00',
                                        minTime: selectTime.startTime
                                        }">
                                    </el-time-select>
                                </el-form-item>
                            </el-form>
                            <el-button slot="reference">{{selectTime.startTime}}-{{selectTime.endTime}}</el-button>
                        </el-popover>
                    </div>
                </div>
                <el-table
                    :data="selectGoods"
                    style="width: 100%"
                    border
                    :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
                    :cell-style="{'text-align':'center'}"
                    >
                    <el-table-column
                        label="商品图片">
                        <template slot-scope="scope">
                            <img height="50" :src="scope.row.url" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="goodsName"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        prop="skuName"
                        label="规格名称">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="quantity"
                        label="库存">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="deleteFromSeckill(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="primary" @click="checkEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="选择商品"
            :visible.sync="goodsSelectVisible"
            width="65%"
            :close-on-click-modal="false">
            <el-row>
                <el-col>
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input v-model="goodsSearch" style="width" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="secSearchGoods(goodsSearch)" type="primary">搜索</el-button>
                        </el-form-item>
                    </el-form>
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
                    label="商品图片">
                    <template slot-scope="scope">
                        <img height="50" :src="scope.row.url" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="skuName"
                    label="规格名称">
                </el-table-column>
                <el-table-column
                    label="价格">
                    <template slot-scope="scope">
                        <span v-show="!scope.row.isChecked">{{scope.row.price}}</span>
                        <el-input v-show="scope.row.isChecked" v-model="scope.row.price"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="库存">
                    <template slot-scope="scope">
                        <span v-show="!scope.row.isChecked">{{scope.row.quantity}}</span>
                        <el-input v-show="scope.row.isChecked" v-model="scope.row.quantity"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="selectGood(scope.row,true)" v-show="!scope.row.isChecked" type="text" size="small">选择</el-button>
                        <el-button @click="selectGood(scope.row,false)" v-show="scope.row.isChecked" type="text" size="small">取消选择</el-button>
                        <el-button @click="addToSeckill(scope.row)" type="text" size="small">加入秒杀</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import apiRequest from '@/api/api'
export default {
    data () {
        return {
            // 商品搜索名称
            goodsSearch: '',
            // 点击添加商品保存该行的秒杀id
            selectSeckillId: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 86400000;
                }
            },
            seckillArr: [
            //     {
            //     secName: '测试',
            //     secState: '12',
            //     startTime: '14:00',
            //     endTime: '16:00',
            //     date: '2021-07-22',
            //     upGoodsState: true
            // }
            ],
            selectTime:{
                secName: '',
                date: '',
                startTime: '',
                endTime: ''
            },
            selectGoods: [],
            //需要给分页组件传的信息
            pageInfo: {
                pageNo: 1,//
                pageSize: 10,//每页条数
                totalCount: 0, //总条数
                totalPages: 1 //总页数
            },
            goodsArr: [
                // {
                //     goodsId: '',
                //     url: '',
                //     goodsName: '测试',
                //     skuName: '128G',
                //     price: '6499',
                //     quantity: '3219',
                //     isChecked: false
                // }
            ],
            seckillInfo: {
                secName: '',
                sessionList: [
                    // {
                    //     date: '',
                    //     startTime: '',
                    //     endTime: '',
                    //     goodsInfo: [
                    //         {
                    //             goodsImg: '',
                    //             goodsName: '',
                    //             skuName: '',
                    //             price: '',
                    //             quantity: ''
                    //         }
                    //     ]
                    // }
                ],
            },
            seckillVisible: false,
            goodsSelectVisible: false,
            editSeckillVisible: false
        }
    },
    watch: {
        goodsSelectVisible(val){
            if(!val){
                this.goodsSearch = ''
                this.goodsArr = []
            }
        }
    },
    created(){
        this.getSeckillList(1)
    },
    methods:{
        // 新建秒杀窗口
        addNewSeckill(){
            this.seckillVisible = true
        },
        // 新建秒杀点击事件
        clickAddSeckill(){
            let that = this
            console.log(this.seckillInfo)
            if(!this.seckillInfo.secName){
                this.$alert('活动名称不能为空！','提示')
            }else if(this.seckillInfo.sessionList.length <= 0){
                this.$alert('场次不能为空！','提示')
            }else{
                let pojo = []
                this.seckillInfo.sessionList.forEach(item=>{
                    pojo.push({
                        secKillName: this.seckillInfo.secName,
                        secKillDate: item.date,
                        startTime: item.startTime,
                        endTime: item.endTime
                    })
                })
                console.log(pojo)
                apiRequest.addSecKill(pojo).then(res=>{
                    console.log(res.data)
                    if(res.data.code == 0){
                        this.$alert('添加成功！','提示',{
                            confirmButtonText: '确定',
                            callback(e){
                                that.seckillVisible = false
                                that.getSeckillList(1)
                            }
                        })
                    }
                })
            }
        },
        // 获取秒杀信息
        getSeckillList(pageNo){
            let pojo = {
                pageNumber: pageNo,
                pageSize: 10
            }
            apiRequest.querySecKillList(pojo).then(res=>{
                if(res.data.code == 0){
                    console.log(res.data)
                    let data = res.data.data
                    this.pageInfo.pageNo = data.page.pageNo
                    this.pageInfo.totalPages = data.page.totalPages
                    this.seckillArr = []
                    // seckillArr: [{
                    //     secName: '测试',
                    //     secState: '12',
                    //     startTime: '14:00',
                    //     endTime: '16:00',
                    //     date: '2021-07-22',
                    //     upGoodsState: true
                    // }],
                    data.secKillList.forEach(item=>{
                        let upGoodsState = false
                        if(item.shelves){
                            upGoodsState = true
                        }
                        this.seckillArr.push({
                            id: item.secKillId,
                            secName: item.secKillName,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            date: item.secKillDate,
                            upGoodsState
                        })
                    })
                }
            })
        },
        changePages(val){
            this.getSeckillList(val)
        },
        groupRowStateChange(data){
            // console.log(data.row)
            let shelves = 0
            if(data.row.upGoodsState){
                shelves = 1
            }
            let pojo = {
                secKillId: data.row.id,
                shelves
            }
            apiRequest.updateSecKill(pojo).then(res=>{
                console.log(res.data)
                if(res.data.code != 0){
                    this.$alert('上下架失败！','提示',{
                        callback(e){
                            data.row.upGoodsState = !data.row.upGoodsState
                        }
                    })
                }
            })
            // if(data.row.upGoodsState){
            //     data.row.upGoodsState = false
            // }else{
            //     data.row.upGoodsState = true
            // }
        },
        // 添加场次
        addSecSession(){
            this.seckillInfo.sessionList.push({
                    date: '',
                    startTime: '',
                    endTime: '',
                    goodsInfo: []
                })
        },
        addGoods(data){
            this.goodsSelectVisible = true
            this.selectSeckillId = data.id
        },
        handleEdit(data){
            this.editSeckillVisible = true
            this.selectTime = {
                id: data.id,
                secName: data.secName,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime
            }
            let pojo = {
                secKillId: data.id
            }
            apiRequest.querySecKillAndSku(pojo).then(res=>{
                if(res.data.code == 0){
                    let data = res.data.data
                    this.selectGoods = []
                    data.forEach(item=>{
                        this.selectGoods.push({
                            id: item.id,
                            goodsId: item.skuId,
                            secKillId: item.secKillId,
                            url: 'http://'+item.sku.skuPicture,
                            goodsName: item.sku.goods.goodsName,
                            skuName: item.sku.skuName,
                            price: item.secKillPrice,
                            quantity: item.secKillQuantity
                        })
                    })
                }
            })
        },
        selectGood(data,bool){
            data.isChecked = bool
        },
        // 修改秒杀时间
        checkEdit(){
            let that = this
            let pojo = {
                secKillName: this.selectTime.secName,
                secKillDate: this.selectTime.date,
                secKillId: this.selectTime.id,
                startTime: this.selectTime.startTime,
                endTime: this.selectTime.endTime
            }
            // console.log(pojo)
            apiRequest.updateSecKill(pojo).then(res=>{
                if(res.data.code == 0){
                    this.$alert('修改秒杀成功！','提示',{
                        callback(e){
                            that.editSeckillVisible = false
                            that.getSeckillList(1)
                        }
                    })
                }
            })
        },
        // 商品加入秒杀
        addToSeckill(data){
            let that = this
            let pojo = {
                secKillId: this.selectSeckillId,
                secKillPrice: data.price,
                secKillQuantity: data.quantity,
                skuId: data.goodsId
            }
            apiRequest.addSecKillAndSku(pojo).then(res=>{
                if(res.data.code == 0){
                    console.log(res.data)
                    this.$alert('商品添加成功！','提示',{
                        callback(e){
                            that.secSearchGoods(that.goodsSearch)
                        }
                    })
                }
            })
        },
        // 搜索商品
        secSearchGoods(data){
            let pojo = {
                secKillId: this.selectSeckillId,
                goodsName: data,
                pageNumber: 1,
                pageSize: 10
            }
            apiRequest.getSkuList(pojo).then(res=>{
                if(res.data.code == 0){
                    let data = res.data.data
                    this.goodsArr = []
                    data.skuList.forEach(item=>{
                        this.goodsArr.push({
                            goodsId: item.skuId,
                            url: 'http://' + item.skuPicture,
                            goodsName: item.goods.goodsName,
                            skuName: item.skuName,
                            price: item.skuPrice,
                            quantity: item.skuQuantity,
                            isChecked: false
                        })
                    })
                }
            })
        },
        deleteSeckill(data){
            let that = this
            this.$confirm('你确定要删除该秒杀吗？','提示',{
                type:'warning'
            }).then(opt=>{
                if(opt == 'confirm'){
                    let pojo = {
                        secKillId: data.id
                    }
                    apiRequest.deleteSecKill(pojo).then(res=>{
                        if(res.data.code == 0){
                            this.$alert('删除成功！','提示',{
                                callback(e){
                                    that.getSeckillList(1)
                                }
                            })
                        }
                    })
                }
            })
        },
        // 从秒杀活动中删除秒杀商品
        deleteFromSeckill(data){
            let that = this
            this.$confirm('你确定要删除该商品吗？','提示',{
                type: 'warning'
            }).then(opt=>{
                if(opt == 'confirm'){
                    let pojo = {
                        id: data.id
                    }
                    apiRequest.deleteSecKillAndSku(pojo).then(res=>{
                        if(res.data.code == 0){
                            this.$alert('删除成功！','提示',{
                                callback(){
                                    let cb = {
                                        secKillId: data.secKillId
                                    }
                                    apiRequest.querySecKillAndSku(cb).then(res=>{
                                        if(res.data.code == 0){
                                            let data = res.data.data
                                            that.selectGoods = []
                                            data.forEach(item=>{
                                                that.selectGoods.push({
                                                    id: item.id,
                                                    goodsId: item.skuId,
                                                    secKillId: item.secKillId,
                                                    url: 'http://'+item.sku.skuPicture,
                                                    goodsName: item.sku.goods.goodsName,
                                                    skuName: item.sku.skuName,
                                                    price: item.secKillPrice,
                                                    quantity: item.secKillQuantity
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        }else{
                            this.$alert('删除失败！','提示')
                        }
                    })
                }
            })
        },
        timeChange(data){
            console.log(data)
            if(!data.date){
                this.$alert('请选择日期！','提示',{
                    confirmButtonText: '确定',
                    callback(){
                        data.startTime = ''
                        data.endTime = ''
                    }
                })
            }
        },
        // 取消新建秒杀
        handleCancel(){
            this.seckillVisible = false
            this.seckillInfo.sessionList = []
        },
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
    .secInput{
        width: 100%;
        box-sizing: border-box;
        padding-left: 50px;
        display: flex;
        align-items: center;
        margin: 50px 0;
    }
    .sessionSection{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 50px 50px;
        flex-wrap: wrap;
        .sessionItem{
            display: flex;
            width: 150px;
            height: 50px;
            align-items: center;
        }
    }
</style>