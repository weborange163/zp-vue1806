<template>
  <div class="page-body audit_news">
    <div class="page-header">
      <el-row>
        <el-col :span="4">
          <el-select v-model="value" placeholder="发布来源">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="text-right" style="padding-right:4px;"><span style="line-height:28px;" >创建时间</span></el-col>
        <el-col :span="6">
            <el-date-picker style="width:90%;"
              v-model="timeVal"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="6" :offset="6">
            <el-input v-model="search_pra" placeholder="请输入内容" style="width:70%"></el-input>
            <el-button class="light_btn">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
            <div>
            <el-table :data="audit_all" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column label="序号" prop="num" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="type" width="80"></el-table-column>
              <el-table-column label="创建人" prop="author" width="80"></el-table-column>
              <el-table-column label="发布状态" prop="status" width="80"></el-table-column>
              <el-table-column label="发布来源" prop="source" width="100"></el-table-column>
              <el-table-column label="创建时间" prop="createTime" width="120"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div>
            <el-table :data="audit_no" border stripe :row-class-name="btnTable()" :header-row-class-name="btnTable()">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" prop="num" width='50'></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="发布到" prop="type" width="80"></el-table-column>
              <el-table-column label="创建人" prop="author" width="80"></el-table-column>
              <el-table-column label="发布状态" prop="status" width="80"></el-table-column>
              <el-table-column label="发布来源" prop="source" width="100"></el-table-column>
              <el-table-column label="创建时间" prop="createTime" width="120"></el-table-column>
              <el-table-column label="操作" width="50" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" style="margin-right:8px;vertical-align:middle;">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核中" name="third">审核中</el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth">审核通过</el-tab-pane>
        <el-tab-pane label="审核失败" name="fifth">审核失败</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      btnTable:btnTable,
      options: [{
      value: '选项1',
      label: '全部'
    }, {
      value: '选项2',
      label: '后台录入'
    }, {
      value: '选项3',
      label: 'App'
    }, {
      value: '选项4',
      label: '数据爬取'
    }],
    audit_no:[
      {
        num:'222',
        title:'我是一条新闻标题',
        type:'新闻',
        author:'运营1',
        status:'待审核',
        source:'后台',
        createTime:'2018-02-21'
      }
    ],
    audit_all:[
       {
        num:'222',
        title:'我是一条新闻标题',
        type:'新闻',
        author:'运营1',
        status:'待审核',
        source:'后台',
        createTime:'2018-02-21'
      } 
    ],
    value: '',
    timeVal:'',
    activeName: 'second',
    search_pra:''
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style>
.audit-news .el-date-editor .el-range__icon,
.audit-news .el-date-editor .el-range-separator{
    line-height: 22px;
}
</style>

