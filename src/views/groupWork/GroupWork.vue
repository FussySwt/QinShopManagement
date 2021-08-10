<template>
    <div>
        <el-row class="headBtn">
            <el-col :span='8' :offset="16">
                <el-button type="primary" size="small" @click="addNewGoods" round>新建团购</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="groupList"
            border
            style="width: 100%"
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
                prop="groupName"
                label="活动名称">
            </el-table-column>
            <!-- <el-table-column
                prop="date"
                label="活动日期">
            </el-table-column> -->
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
                    @change="groupRowStateChange(scope.row)"
                    inactive-color="#C0CCDA">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
            prop="evulateTime"
            label="操作"
            width="180">
                <template slot-scope="scope">
                    <div>
                        <el-button @click="addGoods(scope.row)" type="text" size="small">添加商品</el-button>
                        <el-button @click="editGroup(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteGroup(scope.row)" type="text" size="small">删除</el-button>
                    </div>
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
            title="新建团购"
            :visible.sync="groupListVisible"
            width="50%"
            :close-on-click-modal="false">
            <el-form label-width="100px">
                <el-form-item :inline="true" label="活动名称：">
                    <el-input v-model="groupTeam.name" style="width:250px;"></el-input>
                </el-form-item>
                <el-form-item :inline="true" label="活动时间：">
                    <el-date-picker
                        v-model="groupTeam.timeArr"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item :inline="true" label="开始时间：">
                    <el-time-select
                        @change="timeChange(data)"
                        placeholder="起始时间"
                        v-model="groupTeam.startTime"
                        style="width:250px;"
                        :picker-options="{
                        start: '00:00',
                        step: '00:01',
                        end: '24:00'
                        }">
                    </el-time-select>
                </el-form-item>
                <el-form-item :inline="true" label="结束时间：">
                    <el-time-select
                        @change="timeChange(data)"
                        placeholder="结束时间"
                        v-model="groupTeam.endTime"
                        style="width:250px;"
                        :picker-options="{
                        start: '00:00',
                        step: '00:01',
                        end: '24:00',
                        minTime: groupEdit.startTime
                        }">
                    </el-time-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCreate">取 消</el-button>
                <el-button type="primary" @click="createGroup">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑团购"
            :visible.sync="editGroupVisible"
            width="70%"
            :close-on-click-modal="false">
            <div style="height:45vh;overflow-y:scroll;">
                <div class="secInput">
                    <div style="width:100px;">活动名称：</div>
                    <el-input v-model="groupEdit.name" style="width:250px;"></el-input>
                </div>
                <div class="sessionSection">
                    <div style="width:100px;">活动时间：</div>
                    <div class="sessionItem">
                        <el-date-picker
                            v-model="groupEdit.timeArr"
                            type="datetimerange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
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
                <el-button @click="editGroupVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickSaveGroup(groupEdit)">确 定</el-button>
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
                        <el-button @click="addToGroupList(scope.row)" type="text" size="small">加入拼团</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import apiRequest from '@/api/api'
export default {
    data(){
        return {
            groupListVisible: false,
            goodsSelectVisible: false,
            // 编辑团购显示
            editGroupVisible: false,
            goodsSearch: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 86400000;
                }
            },
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
            groupList: [
                // {
                //     groupName: '测试',
                //     startTime: '10:00',
                //     endTime: '14:00',
                //     upGoodsState: true
                // }
            ],
            groupTeam: {
                name: '',
                timeArr: []
            },
            // 编辑拼团内容
            groupEdit: {
                groupId: '',
                name: '',
                timeArr: []
            },
            selectGoods: '',
            selectGroupId: ''
        }
    },
    created(){
        this.getAllGroupList(1)
    },
    methods: {
        async groupRowStateChange(data){
            let shelves = 0
            if(data.upGoodsState){
                shelves = 1
            }
            let pojo = {
                groupBuyId: data.groupId,
                shelves
            }
            try{
                await apiRequest.updateGroupBuy(pojo).then(res=>{
                    if(res.data.code != 0){
                        this.$alert('上下架失败！','提示',{
                            callback(e){
                                data.row.upGoodsState = !data.row.upGoodsState
                            }
                        })
                    }
                })
            }catch(e){
                console.log(e)
                this.$alert('上下架失败！','提示',{
                    callback(e){
                        data.row.upGoodsState = !data.row.upGoodsState
                    }
                })
            }
        },
        // 保存修改的拼团信息
        async clickSaveGroup(data){
            let that = this
            let pojo = {
                groupBuyId: data.groupId,
                groupBuyName: data.name,
                startTime: data.timeArr[0],
                endTime: data.timeArr[1]
            }
            try{
                await apiRequest.updateGroupBuy(pojo).then(res=>{
                    if(res.data.code == 0){
                        this.$alert('修改拼团成功！','提示',{
                            callback(e){
                                that.editGroupVisible = false
                                that.getAllGroupList(1)
                            }
                        })
                    }
                })
            }catch(e){
                console.log(e)
                alert('请求异常！')
            }
        },
        // 新建团购
        async createGroup(){
            let that = this
            let pojo = {
                groupBuyName: this.groupTeam.name,
                startTime: this.groupTeam.timeArr[0],
                endTime: this.groupTeam.timeArr[1]
            }
            try{
                await apiRequest.addGroupBuy(pojo).then(res=>{
                    if(res.data.code == 0){
                        this.$alert('新建成功！','提示',{
                            callback(e){
                                that.groupListVisible = false
                                that.groupTeam = {
                                    name: '',
                                    timeArr: []
                                }
                                that.getAllGroupList(1)
                            }
                        })
                    }
                })
            }catch(e){
                alert('请求异常！')
            }
        },
        async getAllGroupList(page){
            let pojo = {
                pageNumber: page,
                pageSize: 10
            }
            try{
                await apiRequest.queryGroupBuy(pojo).then(res=>{
                    if(res.data.code == 0){
                        let data = res.data.data
                        this.pageInfo.pageNo = data.page.pageNo
                        this.pageInfo.totalPages = data.page.totalPages
                        this.groupList = []
                        data.groupBuyList.forEach(item=>{
                            let upGoodsState = false
                            if(item.shelves){
                                upGoodsState = true
                            }
                            this.groupList.push({
                                groupId: item.groupBuyId,
                                groupName: item.groupBuyName,
                                startTime: item.startTime,
                                endTime: item.endTime,
                                upGoodsState
                            })
                        })
                    }
                })
            }catch(e){
                console.log(e)
                alert('请求异常')
            }
        },
        // 从团购活动中删除拼团商品
        deleteFromSeckill(data){
            let that = this
            this.$confirm('你确定要删除该商品吗？','提示',{
                type: 'warning'
            }).then(async opt=>{
                if(opt == 'confirm'){
                    let pojo = {
                        id: data.id
                    }
                    apiRequest.deleteGroupBuyAndSku(pojo).then(res=>{
                        if(res.data.code == 0){
                            this.$alert('删除成功！','提示',{
                                callback(){
                                    let pojo = {
                                        groupBuyId: data.groupBuyId
                                    }
                                    try{
                                        apiRequest.queryGroupBuyAndSku(pojo).then(res=>{
                                            if(res.data.code == 0){
                                                let dat = res.data.data
                                                that.selectGoods = []
                                                dat.forEach(item=>{
                                                    that.selectGoods.push({
                                                        id: item.id,
                                                        goodsId: item.skuId,
                                                        groupBuyId: item.groupBuyId,
                                                        url: 'http://'+item.sku.skuPicture,
                                                        goodsName: item.sku.goods.goodsName,
                                                        skuName: item.sku.skuName,
                                                        price: item.groupBuyPrice,
                                                        quantity: item.groupBuyQuantity
                                                    })
                                                })
                                            }
                                        })
                                    }catch(e){
                                        console.log(e)
                                        alert('请求异常！')
                                    }
                                }
                            })
                        }else{
                            this.$alert('删除失败！','提示')
                        }
                    })
                }
            })
        },
        cancelCreate(){
            this.groupTeam = {
                name: '',
                timeArr: []
            }
        },
        // 团购商品添加
        addGoods(data){
            this.goodsSelectVisible = true
            this.selectGroupId = data.groupId
        },
        async editGroup(data){
            this.editGroupVisible = true
            let timeArr = [data.startTime,data.endTime]
            this.groupEdit = {
                groupId: data.groupId,
                name: data.groupName,
                timeArr
            }
            let pojo = {
                groupBuyId: data.groupId
            }
            try{
                await apiRequest.queryGroupBuyAndSku(pojo).then(res=>{
                    if(res.data.code == 0){
                        let dat = res.data.data
                        this.selectGoods = []
                        dat.forEach(item=>{
                            this.selectGoods.push({
                                id: item.id,
                                goodsId: item.skuId,
                                groupBuyId: item.groupBuyId,
                                url: 'http://'+item.sku.skuPicture,
                                goodsName: item.sku.goods.goodsName,
                                skuName: item.sku.skuName,
                                price: item.groupBuyPrice,
                                quantity: item.groupBuyQuantity
                            })
                        })
                    }
                })
            }catch(e){
                console.log(e)
                alert('请求异常！')
            }
        },
        deleteGroup(data){
            let that = this
            this.$confirm('你确定要删除该拼团吗？','提示',{
                type: 'warning'
            }).then(async (opt)=>{
                if(opt == 'confirm'){
                    try{
                        let pojo = {
                            groupBuyId: data.groupId
                        }
                        await apiRequest.deleteGroupBuy(pojo).then(res=>{
                            if(res.data.code == 0){
                                that.$alert('删除成功！','提示',{
                                    callback(e){
                                        that.getAllGroupList(1)
                                    }
                                })
                            }
                        })
                    }catch(e){
                        console.log(e)
                        alert('请求异常！')
                    }
                }
            })
        },
        // 新建团购
        addNewGoods(){
            this.groupListVisible = true
        },
        timeChange(data){
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
        selectGood(data,bool){
            data.isChecked = bool
        },
        changePages(val){
            this.getAllGroupList(val)
        },
        async addToGroupList(data){
            let that = this
            try{
                let pojo = {
                    groupBuyId: this.selectGroupId,
                    skuId: data.skuId,
                    groupBuyPrice: data.price,
                    groupBuyQuantity: data.quantity
                }
                await apiRequest.addGroupBuyAndSku(pojo).then(res=>{
                    if(res.data.code == 0){
                        this.$alert('商品添加成功！','提示',{
                            callback(e){
                                let pojo = {
                                    groupBuyId: that.selectGroupId,
                                    goodsName: that.goodsSearch
                                }
                                try{
                                    apiRequest.getSkuListForGroup(pojo).then(res=>{
                                        if(res.data.code  == 0){
                                            let data = res.data.data
                                            that.goodsArr = []
                                            data.skuList.forEach(item=>{
                                                that.goodsArr.push({
                                                    skuId: item.skuId,
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
                                }catch(e){
                                    console.log(e)
                                    alert('请求异常！')
                                }
                            }
                        })
                    }
                })
            }catch(e){
                console.log(e)
                alert('请求异常！')
            }
        },
        // 选择商品搜索
        async secSearchGoods(data){
            let pojo = {
                groupBuyId: this.selectGroupId,
                goodsName: data
            }
            try{
                await apiRequest.getSkuListForGroup(pojo).then(res=>{
                    if(res.data.code  == 0){
                        let data = res.data.data
                        this.goodsArr = []
                        data.skuList.forEach(item=>{
                            this.goodsArr.push({
                                skuId: item.skuId,
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
            }catch(e){
                console.log(e)
                alert('请求异常！')
            }
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
            // width: 250px;
            height: 50px;
            align-items: center;
        }
    }
</style>
