<template>
    <div>
        <div class="memberTop">
            <el-form class="demo-form-inline" :inline="true" :model="memberInfo">
                <el-form-item label="会员id：">
                    <el-input v-model="memberInfo.memberId" placeholder="请输入会员id"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名：">
                    <el-input v-model="memberInfo.memberName" placeholder="请输入会员姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkMemberMsg">查询</el-button>
                    <el-button type="plain" @click="resetMemberMsg">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="orderList"
            border
            style="width: 100%"
            :header-cell-style="{'text-align':'center','background-color':'#F5F7FA'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column
            prop="memberId"
            label="id"
            width="180">
            </el-table-column>
            <el-table-column
            prop="openId"
            label="openId"
            width="180">
            </el-table-column>
            <el-table-column
            prop="memberPhone"
            label="电话"
            width="180">
            </el-table-column>
            <!-- <el-table-column
            prop="memberEmail"
            label="邮箱"
            width="180">
            </el-table-column> -->
            <el-table-column
            prop="memberName"
            label="昵称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="memberBirth"
            label="生日"
            width="180">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                style="height:100%">
                <template slot-scope="scope">
                    <el-button @click="checkOrderList(scope.row)" type="text" size="small">修改</el-button>
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
        title="修改会员信息"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="60%">
            <el-form :inline="true" :model="updateMemberInfo">
                <div class="updateForm">
                    <div class="halfUpdate">
                        <el-form-item label="id：" label-width="70px">
                            <el-input :disabled="true" v-model="updateMemberInfo.memberId"></el-input>
                        </el-form-item>
                        <el-form-item label="电话：" label-width="70px">
                            <el-input :disabled="true" v-model="updateMemberInfo.memberPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="生日：" label-width="70px">
                            <el-input v-model="updateMemberInfo.memberBirth"></el-input>
                        </el-form-item>
                    </div>
                    <div class="halfUpdate">
                        <el-form-item label="openId：" label-width="100px">
                            <el-input :disabled="true" v-model="updateMemberInfo.openId"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称：" label-width="100px">
                            <el-input v-model="updateMemberInfo.memberName"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间：" label-width="100px">
                            <el-input :disabled="true" v-model="updateMemberInfo.createTime"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="dialogBtn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="dialogBtn" type="primary" @click="updateMemberMsg">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import queryRequest from '@/api/api'
export default {
    data(){
        return{
            // 对话框显示/隐藏
            dialogVisible: false,
            memberInfo: {
                memberId: '',
                memberName: ''
            },
            // 会员修改信息
            updateMemberInfo: {
                memberId: '',
                openId: '',
                memberPhone: '',
                memberName: '',
                memberBirth: '',
                createTime: ''
            },
            //需要给分页组件传的信息
            pageInfo: {
                pageNo: 1,//
                pageSize: 10,//每页条数
                totalCount: 0, //总条数
                totalPages: 1 //总页数
            },
            // 表格属性字段
            orderList: [
                // {
                //     memberId: '1001',
                //     openId: '01',
                //     memberPhone: '12345678901',
                //     memberEmail: '12345678901@163.com',
                //     memberName: '小明',
                //     createTime: '2021-06-20',
                //     memberBirth: '1998-05-17',
                // },
                // {
                //     memberId: '1002',
                //     openId: '02',
                //     memberPhone: '12345678901',
                //     memberEmail: '12345678901@163.com',
                //     memberName: '小红',
                //     createTime: '2021-06-21',
                //     memberBirth: '2001-09-27',
                // }
            ]
        }
    },
    created(){
        let pojo = {
            pageNumber: 1,
            pageSize: 10
        }
        this.sendToCheck(pojo)
    },
    methods:{
        checkMemberMsg() {
            let data = {
                key: this.memberInfo.memberName,
                userId: this.memberInfo.memberId,
                pageNumber: 1,
                pageSize: 10
            }
            this.sendToCheck(data)
        },
        // 重置查询
        resetMemberMsg(){
            this.memberInfo.memberId = ''
            this.memberInfo.memberName = ''
            let data = {
                pageNumber: 1,
                pageSize: 10
            }
            this.sendToCheck(data)
        },
        // 修改会员信息
        checkOrderList(data){
            this.dialogVisible = true
            this.updateMemberInfo.memberId = data.memberId
            this.updateMemberInfo.memberPhone = data.memberPhone
            this.updateMemberInfo.memberBirth = data.memberBirth
            this.updateMemberInfo.openId = data.openId
            this.updateMemberInfo.memberName = data.memberName
            this.updateMemberInfo.createTime = data.createTime
        },
        sendToCheck(data){
            queryRequest.getUserInfo(data).then(res=>{
                console.log(res)
                if(res.data.code == 0){
                    let data = res.data.data
                    this.orderList = []
                    data.users.forEach(item=>{
                        this.orderList.push({
                            memberId: item.userId,
                            openId: item.openId,
                            memberPhone: item.phone,
                            memberName: item.userName,
                            createTime: item.creatTime,
                            memberBirth: item.birthday == null ? '' : item.birthday
                        })
                    })
                    this.pageInfo.pageNo = data.page.pageNo
                    this.pageInfo.totalPages = data.page.totalPages
                }
            })
        },
        // 提交查询
        updateMemberMsg(){
            let that = this
            queryRequest.updateUserInfo({
                openId: this.updateMemberInfo.openId,
                userName: this.updateMemberInfo.memberName,
                birthday: this.updateMemberInfo.memberBirth
            }).then(res=>{
                console.log(res)
                if(res.data.code == 0){
                    this.$alert('修改成功！','提示',{
                        confirmButtonText: '确定',
                        callback(e){
                            that.dialogVisible = false
                            that.memberInfo.memberId = ''
                            that.memberInfo.memberName = ''
                            let data = {
                                pageNumber: 1,
                                pageSize: 10
                            }
                            that.sendToCheck(data)
                        }
                    })
                }
            })
        },
        changePages(val){
            let data = {
                key: this.memberInfo.memberName,
                userId: this.memberInfo.memberId,
                pageNumber: val,
                pageSize: 10
            }
            this.sendToCheck(data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .memberTop{
        margin-bottom: 20px;
        .el-button{
            width: 100px;
        }
    }
    .updateForm{
        width: 100%;
        display: flex;
        .halfUpdate{
            width: 50%;
        }
    }
    .dialogBtn{
        width: 100px;
    }
</style>