<template>
  <div class="page-body version">
    <div class="page-header">
      <el-select v-model="source" placeholder="应用平台">
        <el-option
        v-for="item in sources"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-button class="light_btn">搜索</el-button>
    </div>
    <div class="box">
      <el-row class="marBo4">
        <el-col :span="2" :offset="22">
          <el-button class="light_btn text-right">上传应用</el-button>
        </el-col>
      </el-row>
      <el-table :data="versionData" :row-class-name="btnTable" :header-row-class-name="btnTable" border>
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="version" label="版本号"></el-table-column>
        <el-table-column prop="palt" label="应用平台"></el-table-column>
        <el-table-column prop="size" label="应用大小"></el-table-column>
        <el-table-column prop="pageName" label="应用包名"></el-table-column>
        <el-table-column prop="editTime" label="修改时间"></el-table-column>
        <el-table-column prop="static" label="状态"></el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            
            <el-button type="text">下载</el-button>
            <el-button type="text">下线</el-button>
            <el-button type="text">发布</el-button>
           <router-link :to="{name:'version-details'}" >  <el-button type="text">插件</el-button></router-link>
              <router-link :to="{name:'version-list'}" > <el-button type="text">查看</el-button></router-link>
                 <!--<el-button class="light_btn">添加新闻</el-button>-->
            <el-button type="text"><i class="iconfont icon-edit"></i></el-button>
            <el-button type="text"><i class="iconfont icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      	  <!-- 分页 -->
      <div style="margin-top:20px;">
        <el-pagination class="text-right"
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage_bidding"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="this.per_page"
          layout="prev, pager, next"
          :total="this.total_pages * this.per_page">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      versionData:[
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'},
        {num:1,version:1.01,palt:'ios',size:'10m',pageName:'包名一堆数字',editTime:'2018-01-01',status:'已上线',static:'已下线'}
      ],
       multipleSelection: [],
        newArticle:[
          {
            num:1,
            title:'test7mkaiemlaoapuemske93osksks',
            author:'web'
          }
        ],
        activeTab:'first',
        recommendRadio:1,
        dialogVisible: false,
        dialogVisible1: false,
        per_page:10,
        total_pages:100,
        currentPage_bidding:7, // 页面默认展示的当前页码
      source:'',
      sources:[
        {
          value:'all',
          label:'全部'
        },
        {
          value:'ios',
          label:'ios'
        },
        {
          value:'android',
          label:'android'
        },
      ] 
    }
  },
   methods:{
   	miniTable(row){
      return 'miniTable'
    },
    btnTable(row){
    	return 'btnTable'
    },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

    }
}
</script>
<style>

</style>

