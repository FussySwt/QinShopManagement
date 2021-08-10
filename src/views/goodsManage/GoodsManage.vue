<template>
    <div id="GoodsManage">
        <el-row class="headBtn">
            <el-col :span='8' :offset="16">
                <el-button type="primary" size="small" @click="addNewGoodsVisible = true;isFromEdit = false" round>新增商品</el-button>
                <!-- <el-button type="primary" size="small" round>添加至分类</el-button> -->
            </el-col>
        </el-row>
        <el-table
            :data="goodsArr"
            v-loading="isLoading"
            element-loading-text="加载中..."
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :cell-style="{'text-align':'center'}"
            >
            <el-table-column
                prop="goodsId"
                label="id">
            </el-table-column>
            <el-table-column
                label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.goodsPic" style="height: 50px"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="goodsTitle"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="lowPrice"
                label="最低价格">
            </el-table-column>
            <el-table-column
                prop="goodsSum"
                label="总库存">
            </el-table-column>
            <el-table-column
                prop="totalSales"
                label="总销量">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteGoods(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
            <template slot="empty">
                <div style="margin-top: 15%">
                    <!-- <img src="../../../img/icon.png" alt="暂无数据">
                    <br> -->
                    <span>暂无数据</span>
                </div>
            </template>
        </el-table>

        <el-pagination
            :page-size="pageInfo.pageSize"
            :page-count="pageInfo.totalPages"
            layout="prev, pager, next"
            @current-change="changePages">
        </el-pagination>
        <el-dialog
            :title="isFromEdit ? '编辑商品' : '新增商品'"
            :visible.sync="addNewGoodsVisible"
            :before-close="handleClose"
            width="70%"
            :close-on-click-modal="false">
            <el-form ref="goodsForm">
                <div class="dialogMiddle" v-show="!isClickNext">
                    <el-dialog
                    width="40%"
                    title="创建子分类"
                    :visible.sync="addNewGoodsInnerVisible"
                    append-to-body>
                        <el-form>
                            <el-form-item label="父分类：">
                                <el-select v-model="parentsCategory" placeholder="请选择父分类">
                                    <el-option
                                    v-for="item in parentsCategoryArr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="子分类：">
                                <el-input v-model="newCategory"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="checkCategory">确定</el-button>
                            <el-button @click="addNewGoodsInnerVisible = false">取消</el-button>
                        </span>
                    </el-dialog>
                    <!-- <el-dialog
                    width="40%"
                    title="创建父分类"
                    :visible.sync="addNewGoodsInnerPVisible"
                    append-to-body>
                        <el-form>
                            <el-form-item label="父分类：">
                                <el-input v-model="newParentCategory"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="checkPCategory">确定</el-button>
                            <el-button @click="addNewGoodsInnerPVisible = false">取消</el-button>
                        </span>
                    </el-dialog> -->
                    <el-row style="height:70px;">
                        <el-col :span="14" :offset="5">
                            <div class="goodsTitle">
                                <p>商品分类：</p>
                                <!-- <el-input
                                    placeholder="请输入标题"
                                    v-model="goodsInfo.goodsCategory">
                                </el-input> -->
                                <el-select v-model="goodsInfo.goodsCategory" @change="goodsCateGortChange(goodsInfo.goodsCategory)" :disabled="isFromEdit ? true : false" filterable placeholder="商品选择子分类后不可修改" style="width:100%;">
                                    <el-option
                                    v-for="item in goodsCategoryArr"
                                    :key="item.value"
                                    :label="item.fname+' > '+item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <!-- <el-button type="text" @click="addNewGoodsInnerPVisible = true">创建父分类</el-button> -->
                            </div>
                        </el-col>
                        <el-button type="primary" size="small" round @click="addNewGoodsInnerVisible = true">创建子分类</el-button>
                    </el-row>
                    <el-row style="height:70px;">
                        <el-col :span="14" :offset="5">
                            <div class="goodsTitle">
                                <p>商品标题：</p>
                                <el-input
                                    placeholder="请输入标题"
                                    :value="goodsInfo.goodsTitle"
                                    @input="titleInput">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14" :offset="5">
                            <div class="goodsTitle">
                                <p>商品描述：</p>
                                <el-input
                                    placeholder="请输入商品描述"
                                    :value="goodsInfo.goodsDescription"
                                    @input="descInput">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="goodsPicSection">
                        <el-col :span="4"><div>商品主图：</div><div style="font-size:12px;box-sizing:border-box;padding: 0 10px;color:red;">注：商品主图的长宽比最好为3:2，且只能上传一张图片</div></el-col>
                        <el-col :span="20" style="text-align:left;">
                            <!-- <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload> -->
                            <el-upload
                            :action="actionAddress"
                            list-type="picture-card"
                            :limit="1"
                            :on-preview="mainPicPreview"
                            :file-list="goodsMainList"
                            :http-request="chooseMainPic"
                            :before-remove="remove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="mainDialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-col>
                    </el-row>
                    <el-row class="goodsPicSection">
                        <el-col :span="4"><div>商品图片：</div><div style="font-size:12px;box-sizing:border-box;padding: 0 10px;color:red;">注：图片的展示是按照上传顺序，如果进行修改操作会将修改后的图片放在最后</div></el-col>
                        <el-col :span="20" style="text-align:left;">
                            <el-upload
                            :action="actionAddress"
                            list-type="picture-card"
                            :on-preview="picsPreview"
                            :file-list="goodsDescList"
                            :http-request="chooseDescPics"
                            :before-remove="picsRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-button @click="addItem" type="primary">添加规格</el-button>
                        <el-form
                            ref="form"
                            :inline="true"
                            :model="form"
                            label-width="80px"
                        >
                        <div class="innerSpecifications" v-for="(item, index) in form.specifications" :key="index">
                            <el-form-item class="elItemDelete">
                                <div style="width:30px;" @click="deleteSpecItem(item, index)" title="删除该规格">
                                    <i class="el-icon-delete"></i>
                                </div>
                            </el-form-item>
                            <el-form-item
                                label="规格名称："
                                label-width="100"
                            >
                                <el-autocomplete
                                class="inline-input"
                                v-model="item.specName"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入规格名称"
                                @select="selectSpecName"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item
                                label="规格值："
                                label-width="100"
                                v-for="(datas,ind) in item.specVals" :key="ind"
                            >
                                <!-- <el-input v-model="item.specVal"></el-input> -->
                                <el-autocomplete
                                class="inline-input"
                                v-model="datas.val"
                                :fetch-suggestions="specValSearch"
                                placeholder="请输入规格值"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item class="elItemDelete">
                                <div style="width:30px;" @click="addSpecItem(item, index)" title="添加规格值">
                                    <i class="el-icon-circle-plus-outline"></i>
                                </div>
                            </el-form-item>
                            <el-form-item v-if="isFromEdit">
                                <el-button v-if="item.isExist" type="primary" size="small" round @click="clickUpdateSku(item)">确定修改</el-button>
                                <el-button v-else type="primary" size="small" round @click="clickAddSku(item)">确定添加</el-button>
                            </el-form-item>
                            <el-form-item>
                                <div style="font-size:12px;box-sizing:border-box;padding: 0 10px;color:red;">注：规格值不能相同</div>
                            </el-form-item>
                        </div>
                        </el-form>
                    </el-row>
                </div>
                <div class="dialogMiddle" v-show="isClickNext">
                    <el-row>
                        <el-col style="text-align:left;height:50px;line-height:50px;">
                            <h3>SKU信息</h3>
                        </el-col>
                    </el-row>
                    <el-table
                            ref="goodsTable"
                            :data="goodsData"
                            border
                            row-key="goodsNo"
                            :header-cell-style="{'text-align':'center'}"
                            :cell-style="{'text-align':'center'}"
                            style="width: 100%">
                            <el-table-column v-for="(data,index) in newSpecArr" :key="data.title" :label="data.title" :prop="`spec${index}`" width="150">
                                <template slot-scope="scope">
                                    <el-select @change="handleChange($event, scope)" :value="goodsData[scope.$index]['spec'+index]" placeholder="请选择" v-if="!isFromEdit">
                                        <el-option
                                        v-for="(items,ind) in data['specs']"
                                        :key="items.val"
                                        :label="items.val"
                                        :value="items.val"
                                        >
                                        </el-option>
                                    </el-select>
                                    <el-select @change="handleChange($event, scope)" :value="goodsData[scope.$index]['spec'+index]" placeholder="请选择" v-else>
                                        <el-option
                                        v-for="(items,ind) in data['specs']"
                                        :key="items.val"
                                        :label="items.val"
                                        :value="items.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label='库存'
                                class-name="column-bg-color-editable">
                            <template slot-scope="scope">
                                <div class="input-box" v-if="scope.row.edit=='sum'">
                                    <el-input size="small" @blur="handleInputBlur(scope,'')" v-model="scope.row.goodsSum"></el-input>
                                </div>
                                <span @click="handleCellClick(scope,'sum')" style="width:100%;min-height:24px;display:block;" v-else>{{scope.row.goodsSum}}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                                label='价格'
                                class-name="column-bg-color-editable"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="input-box" v-if="scope.row.edit=='price'">
                                    <el-input size="small" @blur="handleInputBlur(scope,'')" v-model="scope.row.goodsPrice"></el-input>
                                </div>
                                <span @click="handleCellClick(scope,'price')" style="width:100%;min-height:24px;display:block;" v-else>{{scope.row.goodsPrice}}</span>
                            </template>
                            </el-table-column>
                            <el-table-column label="图片(规格图片只能上传一张)">
                                <template width="90" slot-scope="scope">
                                    <!-- <img class="goodsImage" style="width:80px;height:80px;border:none;" :src="scope.row.goodsImg"> -->
                                    <el-upload
                                        :action="actionAddress"
                                        list-type="picture-card"
                                        :limit="1"
                                        :class="{hide:isExistImg}"
                                        :file-list="scope.row.goodsImg"
                                        :data="{index:scope.row.goodsNo,ind:scope.row.ind}"
                                        :http-request="chooseSpecPics"
                                        :before-remove="skuRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" v-if="isFromEdit" width="150">
                                <template width="90" slot-scope="scope">
                                    <div v-if="scope.row.isAdd">
                                        <el-button type="text" @click="saveRow(scope.row)">保存</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button type="text" @click="updateSkuInfo(scope.row)">确定修改</el-button>
                                        <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col class="addNewTableRow">
                                <div @click="addNewTableRow" style="width:100%;height:100%">
                                    <i class="el-icon-circle-plus-outline"></i>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col style="text-align:left;height:50px;line-height:50px;">
                                <h3>商品详情</h3>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:50px;">
                            <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="goodsInfo.goodsIntroduce">
                            </el-input>
                        </el-row>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" round @click="toNextStep" v-show="!isClickNext">下一步</el-button>
                <el-button type="primary" round @click="toprevStep" v-show="isClickNext">上一步</el-button>
                <el-button type="primary" round v-if="!isFromEdit" @click="toFinishStep" plain v-show="isClickNext">完成</el-button>
                <el-button type="primary" round v-if="isFromEdit" @click="toUpdateGoods" plain v-show="isClickNext">修改</el-button>
                <!-- <el-button @click="addNewGoodsVisible = false">取 消</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import ajax from '../../api/ajax.js'
import apiRequest from '../../api/api.js'
import Vue from 'vue'
// import queryRequest from '../../../../client/src/api/queryRequest.js'
export default {
    data(){
        return{
            // 是否点击了下一步
            isClickNext: 0,
            // 判断弹出的对话框是从增加过来的还是编辑过来的
            isFromEdit: false,
            // 是否选中了一张图片
            isExistImg: false,
            mainDialogVisible: false,
            dialogVisible: false,
            dialogImageUrl: '',
            // 选中的父分类
            parentsCategory: '',
            parentsCategoryArr: [],
            // 新建父分类
            newParentCategory:'',
            // 商品主图
            goodsMainList: [],
            goodsDescList: [],
            form: {
                specifications: []
            },
            // 商品规格名称
            specificationNamesArr: [],
            // 商品规格值
            specificationValsArr:[],
            // 商品详情（介绍）
            // goodsIntroduce: '',
            // 特定商品分类下的商品规格
            specificationsArr: [
                // {
                //     specName: {value:'内存'},
                //     specValues: [
                //         {value:'6+64'},{value:'6+128'},{value:'6+128'},{value:'8+256'},{value:'12+256'},{value:'12+512'}
                //     ]
                // },
                // {
                //     specName: {value:'尺寸'},
                //     specValues: [
                //         {value:'xxx'},{value:'xxx'},{value:'xxx'},{value:'xxx'},{value:'xxx'},{value:'xxx'},{value:'xxx'},{value:'xxx'}
                //     ]
                // },
                // {
                //     specName: {value:'颜色'},
                //     specValues: [
                //         {value:'红色'},{value:'黄色'},{value:'橙色'},{value:'白色'},{value:'绿色'},{value:'黑色'}
                //     ]
                // }
            ],
            // 创建的新分类
            newCategory: '',
            // 新增商品弹出框
            addNewGoodsVisible: false,
            isLoading: false,
            addNewGoodsInnerVisible: false,
            addNewGoodsInnerPVisible:false,
            //需要给分页组件传的信息
            pageInfo: {
                pageNo: 1,//
                pageSize: 10,//每页条数
                totalCount: 0, //总条数
                totalPages: 1 //总页数
            },
            // 商品分类数组
            goodsCategoryArr: [
                // {
                //     value: 1001,
                //     label: '手机'
                // }
            ],
            // 新增商品属性
            goodsInfo:{
                goodsId: '',
                goodsTitle: '',
                goodsCategory: '',
                goodsMainPic: {},
                goodsPics: [],
                goodsIntroduce:'',
                goodsTypeCode:'',
                // 商品规格值
                goodsSpec: {},
                // 商品描述
                goodsDescription: ''
            },
            saveOptionList: [],
            // 商品分类表
            goodsArr:[
                // {
                //     goodsId: 'spu_id',
                //     goodsPic: 'http://218.94.150.38:8081/qinqin/icons/icon1.png',
                //     goodsTitle: '商品标题',
                //     lowPrice: 12345,
                //     goodsSum: 12345,
                //     totalSales: 12345,
                //     createTime: '2019-4-15 13:00'
                // }
            ],
            goodsNumber:0,
            goodsData: [
                {
                goodsNo: '',
                goodsSum: 0,
                goodsPrice:0,
                edit:'',
                goodsImg:[]
                }
            ],
            skuImgIndex: 0,
            // 管理员自己添加的商品规格
            newSpecArr: [],
            // actionAddress: 'http://192.168.43.35:8081/qinqin/uploadImage',
            // actionAddress: `https://www.yuzumaoyi.com:8081/qinqin/uploadImage`,
            actionAddress: '',
        }
    },
    created(){
        this.getAllGoodsInfo({pageNo: 1})
        this.actionAddress = this.$commonApi
    },
    watch:{
        addNewGoodsVisible(val){
            this.skuImgIndex = 0
            if(!this.isFromEdit){
                this.clearAllDialogMsg()
            }else{
                this.goodsInfo.goodsMainPic = {}
                this.goodsInfo.goodsPics = []
                this.goodsDescList = []
                this.goodsMainList = []
            }
            if(val){
                let that = this
                that.goodsCategoryArr = []
                this.getGoodsCategory((data)=>{
                    let arr = []
                    data.data.forEach(item=>{
                        if(item.pcode != -1){
                            that.goodsCategoryArr.push({
                                attributeList: item.attributeList,
                                value: item.typesCode,
                                label: item.typesName,
                                code: item.pcode
                            })
                        }else{
                            arr.push({
                                code: item.typesCode,
                                name: item.typesName
                            })
                        }
                    })
                    for(let i = 0; i < that.goodsCategoryArr.length; i++){
                        for(let j = 0; j < arr.length; j++){
                            if(that.goodsCategoryArr[i].code == arr[j].code){
                                that.goodsCategoryArr[i].fname = arr[j].name
                                break
                            }
                        }
                    }
                })
            }
        },
        addNewGoodsInnerVisible(val){
            if(val){
                let that = this
                that.parentsCategoryArr = []
                this.getGoodsCategory((data)=>{
                    data.data.forEach(item=>{
                        if(item.pcode == -1){
                            that.parentsCategoryArr.push({
                                value: item.typesCode,
                                label: item.typesName
                            })
                        }
                    })
                })
            }
        }
    },
    mounted() {
    //   this.specificationNamesArr = this.loadAll();
        this.specificationsArr.forEach(item=>{
            this.specificationNamesArr.push(item.specName)
        })
    },
    methods:{
        // 编辑商品
        handleEdit(row) {
            this.isFromEdit = true
            this.addNewGoodsVisible = true
            let that = this
            that.form.specifications = []
            apiRequest.getSingleGoodsInfo({
                goodsId: row.goodsId
            }).then(res=>{
                if(res.data.code == 0){
                    let goodData = res.data.data
                    that.goodsInfo.goodsId = goodData.goodsId
                    that.goodsInfo.goodsTitle = goodData.goodsName
                    that.goodsInfo.goodsCategory = goodData.typesCode
                    that.goodsInfo.goodsIntroduce = goodData.goodsInfo
                    that.goodsInfo.goodsDescription = goodData.goodsDescription
                    // this.form.specifications
                    goodData.types.attributeList.forEach((item,index)=>{
                        let arr = []
                        item.optionList.forEach(items=>{
                            arr.push({
                                id: items.optionId,
                                val: items.val
                            })
                        })
                        that.form.specifications.push({
                            specName: item.attributeName,
                            attributeId: item.attributeId,
                            specVals: arr,
                            isExist: true
                        })
                    })
                    let number = 0
                    this.goodsData = []
                    goodData.skuList.forEach((item,ind)=>{
                        number = number + 1
                        that.goodsData.push({
                            key: Math.random() * 10000,
                            optionList: item.optionList,
                            goodsNo: number,
                            skuId: item.skuId,
                            goodsSum: item.skuQuantity,
                            goodsPrice: item.skuPrice,
                            ind: ind,
                            edit: '',
                            goodsImg: [{uid:item.skuId,url:'http://'+item.skuPicture}]
                        })
                    })
                    that.goodsNumber = number
                    goodData.pictures.forEach(item=>{
                        if(item.picType == '0'){
                            this.goodsInfo.goodsMainPic.url = 'http://'+item.picUrl
                            this.goodsInfo.goodsMainPic.uid = item.picId
                            this.goodsMainList.push({
                                uid:item.picId,
                                url:'http://'+item.picUrl
                            })
                        }else{
                            this.goodsInfo.goodsPics.push({
                                url:item.picUrl,
                                uid:item.picId
                            })
                            this.goodsDescList.push({
                                uid: item.picId,
                                url: 'http://'+item.picUrl
                            })
                        }
                    })
                }
            })
        },
        // 选中商品分类
        goodsCateGortChange(data){
            this.goodsInfo.goodsTypeCode = data
            this.specificationNamesArr = []
            this.specificationsArr = []
            let list = []
            this.goodsCategoryArr.forEach(item=>{
                if(item.value == data){
                    list = item.attributeList
                }
            })
            list.forEach(item=>{
                this.specificationNamesArr.push({
                    value: item.attributeName
                })
                let obj = {
                    specName: {
                        value: item.attributeName
                    },
                    specValues: []
                }
                item.optionList.forEach(data=>{
                    obj.specValues.push({
                        value: data.val
                    })
                })
                this.specificationsArr.push(obj)
            })
        },
        // 确定添加SKU
        clickAddSku(row){
            let pojo = {
                typesCode: this.goodsInfo.goodsCategory,
                attributeName: row.specName,
                optionList: row.specVals
            }
            try{
                apiRequest.addAttributeAndOption(pojo).then(res=>{
                    if(res.data.code == 0){
                        let data = res.data.data
                        row.attributeId = data[0].attributeId
                        row.isExist = true
                        data.forEach((item,index)=>{
                            row.specVals[index].id = item.optionId
                        })
                        this.$alert('添加成功！','提示')
                    }else{
                        this.$alert('添加失败！','提示')
                    }
                })
            }catch(e){
                console.log(e)
            }
        },
        // 确定修改SKU
        clickUpdateSku(row){
            console.log(row)
            let arr = []
            row.specVals.forEach(item=>{
                if(item.id){
                    arr.push({
                        optionId: item.id,
                        val: item.val
                    })
                }else{
                    arr.push({
                        optionId: '',
                        val: item.val
                    })
                }
            })
            console.log(arr)
            let pojo = {
                attributeId: row.attributeId,
                optionList: arr
            }
            try{
                apiRequest.updateAttribute(pojo).then(res=>{
                    if(res.data.code == 0){
                        let data = res.data.data
                        for(let i = 0; i < row.specVals.length; i++){
                            for(let j = 0; j < data.length; j++){
                                if(row.specVals[i].val == data[j].val){
                                    row.specVals[i].id = data[j].optionId
                                }
                            }
                        }
                        console.log(row)
                        console.log(this.form.specifications)
                        this.$alert('修改成功！','提示')
                    }else{
                        this.$alert('修改失败！','提示')
                    }
                })
            }catch(e){
                console.log(e)
            }
        },
        handleClose(done) {
            this.isClickNext = 0
            this.clearAllDialogMsg()
            done()
        },
        // 获取商品分类
        getGoodsCategory(func){
            apiRequest.getGoodsCategory().then(res=>{
                if(res.data.code == 0){
                    func(res.data)
                }
            })
        },
        // 新建商品父分类
        checkPCategory(){
            let that = this
            apiRequest.addNewCategory({pcode:-1,typesName:that.newParentCategory}).then(res=>{
                if(res.data.code == 0){
                    that.$alert('新建成功！','提示',{
                        confirmButtonText: '确定',
                        callback(){
                            that.addNewGoodsInnerPVisible = false
                            that.goodsCategoryArr = []
                            that.getGoodsCategory((data)=>{
                                data.data.forEach(item=>{
                                    if(item.pcode != -1){
                                        that.goodsCategoryArr.push({
                                            value: item.typesCode,
                                            label: item.typesName
                                        })
                                    }
                                })
                            })
                        }
                    })
                }else if(res.data.code == 1){
                    that.$alert(res.data.msg,'提示',{
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        // 新建商品分类
        checkCategory(){
            let that = this
            apiRequest.addNewCategory({pcode:that.parentsCategory,typesName:that.newCategory}).then(res=>{
                if(res.data.code == 0){
                    that.$alert('新建分类成功！','提示',{
                        confirmButtonText:'确定',
                        callback: (action)=>{
                            that.addNewGoodsInnerVisible = false
                            that.goodsCategoryArr = []
                            that.getGoodsCategory((data)=>{
                                data.data.forEach(item=>{
                                    if(item.pcode != -1){
                                        that.goodsCategoryArr.push({
                                            attributeList: item.attributeList,
                                            value: item.typesCode,
                                            label: item.typesName
                                        })
                                    }
                                })
                            })
                        }
                    })
                }else if(res.data.code == 1){
                    that.$alert(res.data.msg,'提示',{
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        handleChange(value,scope){
            this.$set(this.goodsData[scope.$index], scope.column.property, value)
            this.$forceUpdate()
        },
        descInput(val){
            this.goodsInfo.goodsDescription = val
            this.$forceUpdate()
        },
        // 删除一行商品信息
        deleteGoods(row){
            let that = this
            this.$confirm('你确定要删除该商品吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then((opt)=>{
                if(opt == 'confirm'){
                    apiRequest.deleteSingleGood({
                        goodsId: row.goodsId
                    }).then(res=>{
                        if(res.data.code == 0){
                            that.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                            setTimeout(() => {
                                window.location.reload()
                            }, 700);
                            // that.getAllGoodsInfo({pageNo: 1})
                            // that.clearAllDialogMsg()
                        }else{
                            that.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'fail'
                            });
                        }
                    })
                }
            }).catch((err)=>{
            })
        },
        addItem () {
            this.form.specifications.push({
                specName: '',
                specVals: [{val:''}],
                attributeId: '',
                isExist: false
            })
        },
        addSpecItem(item,index){
            item.specVals.push({
                val: ''
            })
        },
        // 获取所有商品信息
        getAllGoodsInfo({pageNo = 1}){
            let that = this
            that.goodsArr = []
            this.isLoading = true
            apiRequest.getAllGoods({
                pageNumber: pageNo,
                pageSize: 10
            }).then(res=>{
                if(res.data.code == 0){
                    let list = res.data.data.goodsList
                    that.pageInfo = {
                        pageSize: res.data.data.page.pageSize,
                        totalPages: res.data.data.page.totalPages
                    }
                    list.forEach(item=>{
                        that.goodsArr.push({
                            goodsId:item.goodsId,
                            goodsPic:'http://'+item.pictures[0].picUrl,
                            goodsTitle:item.goodsName,
                            lowPrice: item.minPrice,
                            goodsSum: item.totalNumber,
                            totalSales: item.totalSales,
                            createTime: item.createMillisecond
                        })
                    })
                    that.isLoading = false
                }
            })
        },
        // 清空对话框所有数据(当新建或编辑成功时使用)
        clearAllDialogMsg(){
            this.goodsInfo = {
                goodsTitle: '',
                goodsCategory: '',
                goodsMainPic: {},
                goodsPics: [],
                goodsIntroduce:'',
                goodsTypeCode:'',
                goodsSpec: {},
            }
            this.goodsData = [
                {
                    goodsNo:0,
                    goodsSum: 0,
                    goodsPrice:0,
                    edit:'',
                    goodsImg:[]
                }
            ]
            this.specificationNamesArr = []
            this.parentsCategory = ''
            this.newCategory = ''
            this.goodsDescList = []
            this.goodsMainList = []
            this.form = {
                specifications: []
            }
            this.specificationValsArr = []
            this.isClickNext = false
        },
        // 删除一行规格信息
        deleteSpecItem (item, index) {
            if(this.isFromEdit){
                if(this.form.specifications.length <= 1){
                    alert('最少必须要有一条商品规格！')
                }else{
                    this.$confirm('你确定要删除该规格吗？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(opt=>{
                        if(opt == 'confirm'){
                            let arr = []
                            this.goodsData.forEach(items=>{
                                arr.push(items.skuId)
                            })
                            let pojo = {
                                attributeId: item.attributeId,
                                skuIds: arr
                            }
                            apiRequest.deleteGoodsSkuInfo(pojo).then(res=>{
                                if(res.data.code == 0){
                                    this.form.specifications.splice(index, 1)
                                }
                            })
                        }
                    })
                }
            }else{
                this.form.specifications.splice(index, 1)
            }
        },
        toNextStep(){
            // 下一步操作
            this.isClickNext = 1
            this.newSpecArr = []
            this.goodsData.forEach((item,inde)=>{
                this.form.specifications.forEach((items,index)=>{
                    if(this.isFromEdit){
                        item.optionList.forEach((it1,in1)=>{
                            items.specVals.forEach((it2,in2)=>{
                                if(it2.id == it1.optionId){
                                    item['spec'+index] = it2.id
                                }
                            })
                        })
                    }else{
                        item['spec'+index] = ''
                        item.ind = inde
                    }
                    this.newSpecArr[index] = {}
                    this.newSpecArr[index].title = items.specName
                    this.newSpecArr[index]['specs'] = items.specVals
                })
            })
        },
        toprevStep(){
            this.isClickNext = 0
        },
        querySearch(queryString, cb) {
            var specificationNamesArr = this.specificationNamesArr;
            var results = queryString ? specificationNamesArr.filter(this.createFilter(queryString)) : specificationNamesArr;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        // 规格值索引列表获取
        specValSearch(queryString, cb){
            var specificationValsArr = this.specificationValsArr;
            var results = queryString ? specificationValsArr.filter(this.createFilter(queryString)) : specificationValsArr;
            cb(results)
        },
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // 选择规格名称
        selectSpecName(item) {
            this.specificationsArr.forEach(items=>{
                if(items.specName.value == item.value){
                    this.specificationValsArr = items.specValues
                }
            })
        },
        mainPicPreview(file) {
            this.dialogImageUrl = file.url;
            this.mainDialogVisible = true;
        },
        picsPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 编辑商品修改SKU参数
        updateSkuInfo(data){
            let imgUrl = JSON.parse(JSON.stringify(data.goodsImg[0].url))
            if(/^http:/.test(imgUrl)){
                imgUrl = imgUrl.substring(7)
            }else if(/^https:/.test(imgUrl)){
                imgUrl = imgUrl.substring(8)
            }
            let arr = []
            for(let attr in data){
                if(/^spec/.test(attr)){
                    arr.push({
                        optionId: data[attr]
                    })
                }
            }
            let pojo = {
                goodsId: this.goodsInfo.goodsId,
                skuId: data.skuId,
                skuPicture: imgUrl,
                skuPrice: data.goodsPrice,
                skuQuantity: data.goodsSum,
                optionList: arr
            }
            apiRequest.updateSku(pojo).then(res=>{
                if(res.data.code == 0){
                    this.$alert('修改成功！','提示',{
                        confirmButtonText: '确定'
                    })
                }
            })
        },
        titleInput(val){
            this.goodsInfo.goodsTitle = val
        },
        // 保存商品行数据
        saveRow(data){
            if(data.goodsImg[0]){
                let that = this
                let arr = []
                for(let attr in data){
                    if(/^spec/.test(attr)){
                        arr.push({
                            optionId: data[attr]
                        })
                    }
                }
                let pojo = {
                    goodsId: that.goodsInfo.goodsId,
                    skuPrice: data.goodsPrice,
                    skuQuantity: data.goodsSum,
                    skuPicture: data.goodsImg[0].url,
                    optionList: arr
                }
                apiRequest.addSku(pojo).then(res=>{
                    if(res.data.code == 0){
                        this.$alert('添加成功！','提示',{
                            confirmButtonText: '确定'
                        })
                    }
                })
            }else{
                this.$alert('请先添加图片！','提示',{
                    confirmButtonText:'确定'
                })
            }
        },
        // 编辑商品删除SKU行
        deleteRow(data){
            let that = this
            this.$alert('你确定要删除吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback(e){
                    if(e == 'confirm'){
                        let pojo = {
                            skuId: data.skuId
                        }
                        apiRequest.deleteSku(pojo).then(res=>{
                            if(res.data.code == 0){
                                that.$alert('删除成功！','提示',{
                                    confirmButtonText: '确定',
                                    callback(e){
                                        if(e == 'confirm'){
                                            that.goodsData.forEach((item,index)=>{
                                                if(item.goodsNo == data.goodsNo){
                                                    that.goodsData.splice(index,1)
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        })
                        // that.goodsData.forEach((item,index)=>{
                        //     if(item.goodsNo == data.goodsNo){
                        //         that.goodsData.splice(index,1)
                        //     }
                        // })
                    }
                }
            })
        },
        // specPicPreview(file){

        // },
        // 分页器切换页数
        changePages(val){
            this.getAllGoodsInfo({
                pageNo: val
            })
        },
        //单元格点击后，显示input，并让input 获取焦点
        handleCellClick:function(scope,data){
            scope.row.edit = true
            scope.row.edit = data
        },
        //input框失去焦点事件
        handleInputBlur:function(scope,data){
            scope.row.edit = data
        },
        // 新增表格单元行
        addNewTableRow(){
            this.goodsNumber = this.goodsNumber + 1
            let newObj = {}
            this.newSpecArr.forEach((item,index)=>{
                newObj['spec'+index] = ''
            })
            newObj.ind = this.goodsData.length
            newObj.goodsNo = this.goodsNumber
            newObj.goodsSum = 0
            newObj.goodsImg = []
            newObj.goodsPrice = 0
            newObj.edit = ''
            newObj.isAdd = true
            this.goodsData.push(newObj)
        },
        // 点击添加商品
        async toFinishStep(){
            let that = this
                let pictures = []
                pictures[0] = {}
                pictures[0].picUrl = this.goodsInfo.goodsMainPic.url
                this.goodsInfo.goodsPics.forEach(item=>{
                    pictures.push({
                        picUrl:item.url
                    })
                })
                let optionList = []
                let skuList = []
                this.goodsData.forEach((item,index)=>{
                    optionList = []
                    for(let attr in this.goodsData[index]){
                        if(/^spec/.test(attr)){
                            optionList.push({
                                val:this.goodsData[index][attr]
                            })
                        }
                    }
                    skuList.push({
                        skuPrice: item.goodsPrice,
                        skuQuantity: item.goodsSum,
                        skuPicture: item.goodsImg[0],
                        optionList: optionList
                    })
                })
                let types = {}
                types.typesCode = this.goodsInfo.goodsTypeCode
                types.attributeList = []
                this.form.specifications.forEach(item=>{
                    types.attributeList.push({
                        attributeName: item.specName,
                        optionList: item.specVals
                    })
                })
                try{
                    await apiRequest.addNewGoods({
                        goodsName: this.goodsInfo.goodsTitle,
                        goodsInfo: this.goodsInfo.goodsIntroduce,
                        goodsDescription: this.goodsInfo.goodsDescription,
                        typesCode: this.goodsInfo.goodsTypeCode,
                        pictures:pictures,
                        skuList:skuList,
                        types:types
                    }).then(res=>{
                        if(res.data.code == 0){
                            that.$alert('添加商品成功！','提示',{
                                confirmButtonText:'确定',
                                callback(){
                                    that.addNewGoodsVisible = false
                                    that.goodsArr = []
                                    that.getAllGoodsInfo({pageNo: 1})
                                    that.clearAllDialogMsg()
                                }
                            })
                        }else{
                            that.$alert(res.data.msg,'提示',{
                                confirmButtonText:'确定'
                            })
                        }
                    })
                }catch(e){
                    console.log(e)
                    alert('请求异常，请查看输入参数是否有误！')
                }
            // }
        },
        // 上传商品主图
        chooseMainPic(param){
            this.uploadFile(param,0)
        },
        // 上传商品图片
        chooseDescPics(param){
            this.uploadFile(param,1)
        },
        // 上传商品规格图片
        chooseSpecPics(param){
            this.uploadFile(param,2,this.skuImgIndex)
        },
        // 删除商品主图
        remove() {
            let picUrl = this.goodsInfo.goodsMainPic.url
            if(/^http:/.test(picUrl)){
                picUrl = picUrl.substring(7)
            }
            apiRequest.deleteGoodsImg({picUrl:picUrl}).then(res=>{
                console.log(res)
            })
        },
        // 删除商品图片
        picsRemove(param){
            this.goodsInfo.goodsPics.forEach(item=>{
                if(param.uid == item.uid){
                    apiRequest.deleteGoodsImg({picUrl:item.url}).then(res=>{
                        console.log(res)
                    })
                }
            })
        },
        // 删除新增SKU商品图片
        skuRemove(param){
            this.goodsData.forEach(item=>{
                if(param.uid == item.uid){
                    apiRequest.deleteGoodsImg({picUrl:item.goodsImg[0]}).then(res=>{
                        console.log(res)
                    })
                }
            })
        },
        // 完成修改
        toUpdateGoods(){
            let that = this
            let arr = []
            arr.push({
                picUrl: this.goodsInfo.goodsMainPic.url
            })
            this.goodsInfo.goodsPics.forEach(item=>{
                arr.push({
                    picUrl: item.url
                })
            })
            let pojo = {
                goodsId: this.goodsInfo.goodsId,
                goodsName: this.goodsInfo.goodsTitle,
                goodsInfo: this.goodsInfo.goodsIntroduce,
                goodsDescription: this.goodsInfo.goodsDescription,
                pictures: arr
            }
            apiRequest.updateGoods(pojo).then(res=>{
                if(res.data.code == 0){
                    this.$alert('修改成功！','提示',{
                        confirmButtonText: '确定',
                        callback(e){
                            if(e == 'confirm'){
                                window.location.reload()
                                // that.addNewGoodsVisible = false
                                // that.getAllGoodsInfo({pageNo: 1})
                                // that.pagepageNo = 1
                            }
                        }
                    })
                }
            })
        },
        uploadFile(param,data,index){
            let fd = new FormData();
            let that = this;
            fd.append('file',param.file);//传文件
            fd.append('picType',data);
            ajax.axiosPost(
                // 'http://192.168.43.35:8081/qinqin/uploadImage', //接口地址
                `${this.$commonApi}/qinqin/uploadImage`,
                // 'http://218.94.150.38:8081/qinqin/uploadImage',
                fd,  //formdata对象参数
                res => {
                    if(res.data.code == 0){
                        switch(data){
                            case 0:
                                that.goodsInfo.goodsMainPic.url = res.data.data
                                that.goodsInfo.goodsMainPic.uid = param.file.uid
                                break   
                            case 1:
                                that.goodsInfo.goodsPics.push({url:res.data.data,uid:param.file.uid})
                                break
                            case 2:
                                if(index >= 0){
                                    if(that.isFromEdit){
                                        that.goodsData[param.data.ind].goodsImg[0] = {}
                                        that.goodsData[param.data.ind].goodsImg[0].url = res.data.data
                                    }else{
                                        that.goodsData[param.data.ind].goodsImg[0] = res.data.data
                                    }
                                    that.goodsData[param.data.ind].uid = param.file.uid
                                    that.skuImgIndex = index + 1
                                }
                                break
                        }
                    }else{
                        this.$alert('上传图片格式错误！','提示',{
                            confirmButtonText: '确定',
                            callback:(res)=>{
                                switch(data){
                                    case 0:
                                        that.goodsInfo.goodsMainPic = {}
                                        that.goodsMainList = []
                                        break
                                    case 1:
                                        this.goodsInfo.goodsPics.pop()
                                        this.goodsDescList.pop()
                                    case 2:
                                        if(index){
                                            console.log(index)
                                        }
                                        break
                                }
                            }
                        })
                    }
                }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
    .tb-edit .input-box {
        display: none;
    }
    .tb-edit .current-cell .input-box {
        display: block;
        margin-left: -15px;
    }
    .headBtn{
        width: 100%;
        height: 80px;
        line-height: 80px;
    }
    // .dialogTop{
    //     width: 100%;
    //     display: flex;
    //     justify-content: space-between;
    // }
    .goodsTitle{
        width: 100%;
        display: flex;
        p{
            flex-shrink: 0;
            align-self: center;
        }
    }
    .goodsPicSection{
        margin: 50px 0;
    }
    .dialogMiddle{
        height: calc(100vh / 2);
        overflow-y: scroll;
    }
    .elItemDelete{
        width:30px;
        cursor:pointer;
        border-radius: 5px;
    }
    .elItemDelete:hover{
        background-color: lightskyblue;
    }
    .innerSpecifications{
        margin: 30px;
        overflow-x: scroll;
        display: flex;
        // float: left;
        // flex-wrap: nowrap;
        .el-form-item{
            flex-shrink: 0;
        }
    }
    .addNewTableRow{
        height:50px;
        line-height:50px;
        font-size:25px;
        cursor:pointer;
        transition: background-color .2s;
    }
    .addNewTableRow:hover{
        background-color: rgb(199, 232, 252);
    }
</style>