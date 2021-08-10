<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
  // ::-webkit-scrollbar-thumb { //滑块部分
  //   border-radius: 5px;
  //   background-color: #C6C6C6;
  // }
  // ::-webkit-scrollbar-track { //轨道部分
  //   box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  //   background: #ededed;
  //   // border-radius: 5px;
  // }
  // #GoodsManage .hide .el-upload--picture-card {
  //       display: none !important;
  //   }
  ::-webkit-scrollbar{
          width: 11px;
          height: 11px;
      }
      ::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 10px;
          // background-color: #02adf7;
          background-color: #C1C1C1;
          // background-image: -webkit-linear-gradient(45deg, #C1C1C1, #ffffff7a,#C1C1C1);
      }
      ::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      }
</style>
