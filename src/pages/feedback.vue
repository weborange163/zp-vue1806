<template>
    <div class="page-body feedback">
      <div class="page-header">
          <el-date-picker style="width:210px;"
              v-model="user_msg"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-button class="light_btn">搜索</el-button>
            <el-button class="light_btn">导出</el-button>
      </div>
      <div class="box">
          用户反馈列表在此
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      user_msg:''
    }
  }
}
</script>
<style>
.feedback .el-date-editor .el-range-separator,
.feedback .el-date-editor .el-range__icon{
  line-height: 20px;
}
</style>

