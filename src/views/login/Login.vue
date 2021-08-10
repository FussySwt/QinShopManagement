<template>
    <div class="login">
        <!-- <div class="loginPanel">
            <el-form>
            <el-form-item label="用户名：" label-width="200px">
                <input type="text" v-model="userName">
            </el-form-item>
            <el-form-item label="密码：" label-width="200px">
                <input type="password" v-model="password">
            </el-form-item>
        </el-form>
        <button @click="qinLogin">登录</button>
        </div> -->
        <div class="title">沁商城后台管理系统</div>
        <div class="loginPanel">
            <el-form status-icon  class="demo-ruleForm">
            <el-form-item label="账号：">
                <el-input v-model.number="userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" v-model="password" placeholder="请输入密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="display:flex;justify-content:center;padding-top:50px;">
                <el-button class="loginBtn" type="primary" @click="qinLogin" style="width:300px;">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return{
            userName: '',
            password: ''
        }
    },
    methods:{
        qinLogin(){
            // this.$router.push({name:'dataAnalysis'})
            // this.$router.push({path: '/index/dataAnalysis'})
            if(this.userName == 'qinAdmin' && this.password == 'qin123456'){
                localStorage.setItem("qinStoreManagementToken",this.userName)
                this.$router.push({name:'dataAnalysis'})
            }else{
                alert('账号密码错误！')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: rgb(212, 235, 243);
        background-image: linear-gradient(150deg, #c4c4c4,#eeeeee, #c4c4c4);
        .title{
            position: absolute;
            top: 50px;
            width: 300px;
            left: calc(50% - 150px);
            font-size: 30px;
        }
        .loginPanel{
            width: 30%;
            height: 50%;
            // background-color: rgb(202, 202, 202);
            background-color: #FFFFFF;
            box-shadow: 0 5px 10px gray;
            border-radius: 20px;
            padding: 50px;
            animation: breath 3s infinite;
        }
        @keyframes breath{
            0%{
                box-shadow: 0 5px 10px gray;
            }
            50%{
                box-shadow: 0 5px 40px gray;
            }
            100%{
                box-shadow: 0 5px 10px gray;
            }
        }
        .loginBtn{
            transition: all .5s;
        }
        .loginBtn:hover{
            box-shadow: 0 0 10px #409EFF;
        }
    }
</style>
