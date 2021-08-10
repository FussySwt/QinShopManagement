<template>
    <div>
        <el-table
            :data="evulateList"
            border
            style="width: 100%"
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :row-class-name="tableRowClassName"
            :cell-style="{'text-align':'center'}">
            <el-table-column
            prop="evulateId"
            label="评价id"
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
            <el-table-column
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
            prop="orderListId"
            label="订单id"
            width="180">
            </el-table-column>
            <el-table-column
            label="评价内容"
            width="180">
            <template slot-scope="scope">
                <el-button @click="checkEvulateContent(scope.row.evulateContent)" type="text" size="small">查看</el-button>
            </template>
            </el-table-column>
            <el-table-column
            prop="evulateTime"
            label="评价时间"
            width="180">
            </el-table-column>
            <el-table-column
                label="显示与隐藏"
                fixed="right"
                style="height:100%"
                width="100">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.sliderState"
                    active-color="#13ce66"
                    @change="tableRowStateChange(scope.row)"
                    inactive-color="#C0CCDA">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            evulateList: [
                {
                    evulateId: '12345',
                    userId: '12345',
                    userName: '12345',
                    goodsId: '12345',
                    goodsName: '商品标题',
                    orderListId: '12345',
                    evulateContent: '商品评价商品评价商品评价商品评价商品评价',
                    evulateTime: '2020-04-15 13:00:00',
                    sliderState: true
                },
                {
                    evulateId: '13456',
                    userId: '12345',
                    userName: '12345',
                    goodsId: '12345',
                    goodsName: '商品标题',
                    orderListId: '12345',
                    evulateContent: '商品评价商品评价商品评价商品评价商品评价',
                    evulateTime: '2020-04-15 13:00:00',
                    sliderState: true
                }
            ]
        }
    },
    methods:{
        checkEvulateContent(data){
            // console.log(data)
            this.$alert(data,'评价内容',{
                confirmButtonText: '确定',
                callback: (action) => {
                    // this.$message({
                    // type: 'info',
                    // message: `action: ${ action }`
                    // });
                }
            })
        },
        tableRowStateChange(row){
            console.log(row.sliderState)
        },
        tableRowClassName(scope){
            // console.log(scope)
            if(scope.row.sliderState == false){
                return 'hidden_row'
            }
            return ''
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep.el-table .hidden_row{
    td{
        div{
            visibility: hidden;
        }
    }
    td:last-child{
        div{
            visibility: visible;
        }
    }
}
</style>