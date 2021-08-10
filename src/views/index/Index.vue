<template>
    <div class="Index">
        <el-container>
            <el-header><h2>沁商城管理系统</h2></el-header>
            <el-container>
                <el-aside width="200px">
                    <el-row class="tac">
                        <el-col :span="24">
                            <el-menu
                            :default-active="activeIndex"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            @select="indexSelect"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                            <router-link to="/index/dataAnalysis">
                                <el-menu-item index="1">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">数据分析</span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/index/memberManage" active-class="noneAc">
                                <el-menu-item index="2">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">会员管理</span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/index/goodsManage">
                                <el-menu-item index="3">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">商品管理</span>
                                </el-menu-item>
                            </router-link>
                            <!-- <router-link to="/index/evaluateManage">
                                <el-menu-item index="4">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">评价管理</span>
                                </el-menu-item>
                            </router-link> -->
                            <router-link to="/index/orderListManage">
                                <el-menu-item index="5">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">订单管理</span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/index/sendGoodsManage">
                                <el-menu-item index="11">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">发货管理</span>
                                </el-menu-item>
                            </router-link>
                            <!-- <router-link to="/index/coupon">
                                <el-menu-item index="6">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">优惠券</span>
                                </el-menu-item>
                            </router-link> -->
                            <router-link to="/index/seckill">
                                <el-menu-item index="7">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">秒杀</span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/index/groupWork">
                                <el-menu-item index="8">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">拼团</span>
                                </el-menu-item>
                            </router-link>
                            <!-- <router-link to="/index/advertiseManage">
                                <el-menu-item index="9">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">广告管理</span>
                                </el-menu-item>
                            </router-link>
                            <router-link to="/index/settings">
                                <el-menu-item index="10">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">商城设置</span>
                                </el-menu-item>
                            </router-link> -->
                            <!-- <el-submenu index="2">
                                <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>导航一</span>
                                </template>
                                <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                                </el-menu-item-group>
                                <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                                </el-submenu>
                            </el-submenu> -->
                            <!-- <el-menu-item index="3">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航二</span>
                            </el-menu-item> -->
                            <!-- <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item> -->
                            <!-- <el-menu-item index="4">
                                <i class="el-icon-menu"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item> -->
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeIndex: '1'
        }
    },
    created(){
        // console.log(this.$route.path.replace('/',''))
        switch(this.$route.path){
            case '/index/dataAnalysis':
                this.activeIndex = '1'
                break
            case '/index/memberManage':
                this.activeIndex = '2'
                break
            case '/index/goodsManage':
                this.activeIndex = '3'
                break
            case '/index/evaluateManage':
                this.activeIndex = '4'
                break
            case '/index/orderListManage':
                this.activeIndex = '5'
                break
            case '/index/coupon':
                this.activeIndex = '6'
                break
            case '/index/seckill':
                this.activeIndex = '7'
                break
            case '/index/groupWork':
                this.activeIndex = '8'
                break
            case '/index/advertiseManage':
                this.activeIndex = '9'
                break
            case '/index/advertiseManage':
                this.activeIndex = '10'
                break
            case '/index/sendGoodsManage':
                this.activeIndex = '11'
                break
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      indexSelect(key,keyPath){
        //   console.log(this.activeIndex)
          console.log(key,keyPath)
      }
    }
}
</script>

<style lang="scss" scoped>
    .el-header, .el-footer {
        background-color: #c4ccda;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        .tac{
            height: calc(100vh - 60px);
            background-color: #545C64;
            overflow-y: scroll;
        }
        ::-webkit-scrollbar{
            width:0;
            height: 0;
            color: transparent;
        }
    }
    .el-main {
        // background-color: #E9EEF3;
        color: #333;
        text-align: center;
        overflow-y: scroll;
        height: calc(100vh - 60px);
        // line-height: 50px;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
