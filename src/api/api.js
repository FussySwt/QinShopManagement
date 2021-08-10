import axios from 'axios'

const http = axios.create({
    baseURL: 'https://www.yuzumaoyi.com:8081/',
    // baseURL: 'http://218.94.150.38:8081/',
    // baseURL: 'http://192.168.43.35:8081/',
    // baseURL: 'http://192.168.0.112:8081/',
    timeout: 30000,
    headers:{
        'Content-type':'application/json'
    }
})

export default{
    // 删除商品图片
    deleteGoodsImg(data){
        return http({
            url: '/qinqin/deletePicture',
            method: 'POST',
            data
        })
    },
    // 获取商品分类
    getGoodsCategory(){
        return http({
            url:'/qinqin/getTypesList',
            method:'GET'
        })
    },
    // 添加商品分类
    addNewCategory(data){
        return http({
            url:'/qinqin/addTypes',
            method:'POST',
            data
        })
    },
    // 新增商品接口
    addNewGoods(data){
        return http({
            url:'/qinqin/addGoods',
            method:'POST',
            data
        })
    },
    // 获取所有商品
    getAllGoods(data){
        return http({
            url: '/qinqin/getGoodsList',
            method: 'POST',
            data
        })
    },
    // 删除单个商品
    deleteSingleGood(data){
        return http({
            url:'/qinqin/deleteGoods',
            method: 'POST',
            data
        })
    },
    // 获取单个商品的详情信息
    getSingleGoodsInfo(data){
        return http({
            url: '/qinqin/getGoods',
            method: 'POST',
            data
        })
    },
    // 获取用户订单
    getOrderListInfo(data){
        return http({
            url: '/qinqin/getOrderListForAdmin',
            method: 'POST',
            data
        })
    },
    // 获取用户详细订单
    getSingleOrderList(data){
        return http({
            url: '/qinqin/getOrderForAdmin',
            method: 'POST',
            data
        })
    },
    // 获取用户信息
    getUserInfo(data){
        return http({
            url: '/qinqin/getUserInfoList',
            method: 'POST',
            data
        })
    },
    // 修改用户信息
    updateUserInfo(data){
        return http({
            url: '/qinqin/updateUserInfo',
            method: 'POST',
            data
        })
    },
    // 退款接口
    refund(data){
        return http({
            url: '/qinqin/refund',
            method: 'POST',
            data
        })
    },
    // 新建发货单
    createExpress(data){
        return http({
            url: '/qinqin/addExpress',
            method: 'POST',
            data
        })
    },
    // 查询发货信息
    getExpress(data){
        return http({
            url: '/qinqin/getExpressList',
            method: 'POST',
            data
        })
    },
    // 修改发货单信息
    updateExpress(data){
        return http({
            url: '/qinqin/updateExpress',
            method: 'POST',
            data
        })
    },
    // 删除发货单
    deleteExpress(data){
        return http({
            url:'/qinqin/deleteExpress',
            method: 'POST',
            data
        })
    },
    // 更新商品
    updateSku(data){
        return http({
            url: '/qinqin/updateSku',
            method: 'POST',
            data
        })
    },
    // 删除商品sku数据
    deleteSku(data){
        return http({
            url: '/qinqin/deleteSku',
            method: 'POST',
            data
        })
    },
    // 提交更新商品所有信息
    updateGoods(data){
        return http({
            url: '/qinqin/updateGoods',
            method: 'POST',
            data
        })
    },
    // 新增商品SKU信息
    addSku(data){
        return http({
            url: '/qinqin/addSku',
            method: 'POST',
            data
        })
    },
    // 数据分析交易日期
    getOrderData(data){
        return http({
            url: '/qinqin/getOrderData',
            method: 'POST',
            data
        })
    },
    // 数据分析综合数据
    getUserData(data){
        return http({
            url: '/qinqin/getUserData',
            method: 'POST',
            data
        })
    },
    // 数据分析交易数据
    getTransactionData(data){
        return http({
            url: '/qinqin/getTransactionData',
            method: 'POST',
            data
        })
    },
    // 数据分析交易分布
    getTransactionDistribution(data){
        return http({
            url: '/qinqin/getTransactionDistribution',
            method: 'POST',
            data
        })
    },
    // 数据分析笔单价分布
    getAvgDistribution(data){
        return http({
            url:'/qinqin/getAvgDistribution',
            method: 'POST',
            data
        })
    },
    // 数据分析时间分布数据
    getTimeDistribution(data){
        return http({
            url: '/qinqin/getTimeDistribution',
            method: 'POST',
            data
        })
    },
    // 数据分析地理分布
    getAreaDistribution(data){
        return http({
            url:'/qinqin/getAreaDistribution',
            method: 'POST',
            data
        })
    },
    // 数据分析商品购买情况
    getPriceAndCount(data){
        return http({
            url: '/qinqin/getPriceAndCount',
            method: 'POST',
            data
        })
    },
    // 新建秒杀
    addSecKill(data){
        return http({
            url: '/qinqin/addSecKill',
            method: 'POST',
            data
        })
    },
    // 获取所有的秒杀
    querySecKillList(data){
        return http({
            url: '/qinqin/querySecKillList',
            method: 'POST',
            data
        })
    },
    // 修改商品上下架状态
    updateSecKill(data){
        return http({
            url: '/qinqin/updateSecKill',
            method: 'POST',
            data
        })
    },
    // 删除秒杀商品
    deleteSecKill(data){
        return http({
            url: '/qinqin/deleteSecKill',
            method:'POST',
            data
        })
    },
    // 编辑秒杀商品
    updateSecKill(data){
        return http({
            url: '/qinqin/updateSecKill',
            method: 'POST',
            data
        })
    },
    // 秒杀搜索商品
    getSkuList(data){
        return http({
            url: '/qinqin/getSkuList',
            method: 'POST',
            data
        })
    },
    // 商品加入秒杀
    addSecKillAndSku(data){
        return http({
            url: '/qinqin/addSecKillAndSku',
            method: 'POST',
            data
        })
    },
    // 获取秒杀活动下加入的所有秒杀商品
    querySecKillAndSku(data){
        return http({
            url:'/qinqin/querySecKillAndSku',
            method: 'POST',
            data
        })
    },
    // 删除秒杀活动下加入的秒杀商品
    deleteSecKillAndSku(data){
        return http({
            url:'/qinqin/deleteSecKillAndSku',
            method: 'POST',
            data
        })
    },
    // 新建拼团
    addGroupBuy(data){
        return http({
            url: '/qinqin/addGroupBuy',
            method: 'POST',
            data
        })
    },
    // 获取所有拼团信息
    queryGroupBuy(data){
        return http({
            url: '/qinqin/queryGroupBuy',
            method: 'POST',
            data
        })
    },
    // 删除拼团信息
    deleteGroupBuy(data){
        return http({
            url: '/qinqin/deleteGroupBuy',
            method: 'POST',
            data
        })
    },
    // 拼团信息上下架 || 编辑拼团时间
    updateGroupBuy(data){
        return http({
            url: '/qinqin/updateGroupBuy',
            method: 'POST',
            data
        })
    },
    // 拼团模块商品模糊查询
    getSkuListForGroup(data){
        return http({
            url: '/qinqin/getSkuListForGroup',
            method: 'POST',
            data
        })
    },
    // 商品加入拼团活动
    addGroupBuyAndSku(data){
        return http({
            url: '/qinqin/addGroupBuyAndSku',
            method: 'POST',
            data
        })
    },
    // 拼团编辑
    queryGroupBuyAndSku(data){
        return http({
            url: '/qinqin/queryGroupBuyAndSku',
            method: 'POST',
            data
        })
    },
    // 删除拼团里的商品
    deleteGroupBuyAndSku(data){
        return http({
            url: '/qinqin/deleteGroupBuyAndSku',
            method: 'POST',
            data
        })
    },
    // 删除商品的规格信息
    deleteGoodsSkuInfo(data){
        return http({
            url: '/qinqin/deleteSkuAndOption',
            method: 'POST',
            data
        })
    },
    // 添加一行商品规格信息
    addAttributeAndOption(data){
        return http({
            url: '/qinqin/addAttributeAndOption',
            method: 'POST',
            data
        })
    },
    // 修改一行商品规格信息
    updateAttribute(data){
        return http({
            url: '/qinqin/updateAttribute',
            method: 'POST',
            data
        })
    },
}