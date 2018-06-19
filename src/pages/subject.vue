<template>
  <div class="page-body subject">
    <div class="page-header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="subjectSelect" placeholder="请选择">
            <el-option
            v-for="item in subjects"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="line-height:28px;">
          <span>上线时间</span>
        </el-col>
        <el-col :span="6" class="padLe4">
            <el-date-picker style="width:90%;"
            v-model="timeVal"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="7" :offset="6">
          <el-input v-model="subjectSearch" style="width:70%"></el-input>
          <el-button class="light_btn">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <div class="text-right marBo4">
        <router-link :to="{name:'subject-add'}" ><el-button class="light_btn">新建专题</el-button></router-link>
        <el-button class="light_btn" @click="dialogVisible = true">置顶排序</el-button>
        <el-button class="light_btn">刷新</el-button>
      </div>
      专题表格在此....
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      timeVal:'',
      subjectSearch:'',
      subjectSelect:'',
      subjects:[{
        value:'all',
        title:'全部'
        },
        {
        value:'aa',
        title:'待上线'
        },
        {
        value:'bb',
        title:'已上线'
        }
      ]
    }
  }
}
</script>
<style>
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height: 20px;
  }
</style>

