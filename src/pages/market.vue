<template>
  <div class="page-body news">
    <div class="page-header">
      <el-row>
        <el-col :span="7">
        	<el-select v-model="value" placeholder="分类" style="width:32%">
            <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="发布状态" style="width:32%">
            <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select  v-model="value1" placeholder="发布来源" style="width:32%">
            <el-option
              v-for="item in optionss"
              :key="item.value1"
              :label="item.label"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value2" placeholder="时间类型">
            <el-option
              v-for="item in optionsss"
              :key="item.value2"
              :label="item.label"
              :value="item.value2">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="padLe4">
          <el-date-picker style="width:90%;"
            v-model="value6"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-input v-model="inputs" placeholder="标题、发布账号、文章ID" style="width:70%;margin-right:5%;"></el-input><el-button class="light_btn" style="width:20%;">搜素</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="tab1">
            <div class="text-right marBo4">
              <router-link :to="{name:'market-add'}" ><el-button class="light_btn">添加行情</el-button></router-link>
              <el-button class="light_btn" @click="dialogVisible = true">置顶排序</el-button>
              <el-button class="light_btn">刷新</el-button>
            </div>
            <el-table :data="tableData" :row-class-name="btnTable" :header-row-class-name="btnTable" border stripe>
              <!--<el-table-column label="#" type="index"></el-table-column>-->
              <el-table-column label="序号" prop="num" width='50'></el-table-column>
              <el-table-column label="标题" prop="title">
                <template slot-scope="scope">
                  <i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.isUping"></i>
                  <el-popover trigger="hover" placement="top" v-if="scope.row.link">
                    <p>{{ scope.row.link }}</p>
                    <div slot="reference" class="name_wrapper" >
                      <i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
                    </div>
                  </el-popover>
                  <p style="display:inline-block;">{{ scope.row.title }}</p>
                </template>
              </el-table-column>
              <el-table-column label="所属分类" prop="classification" width="80"></el-table-column>
              <el-table-column label="创建人" prop="author" width="80"></el-table-column>
              <el-table-column label="发布状态" prop="status" width="80">
                <template  slot-scope="scope">
                  <p v-if="scope.row.status=='已上线'" class="yshx">{{scope.row.status}}</p>
                  <p v-if="scope.row.status=='待上线'" class="dshx">{{scope.row.status}}</p>
                  <p v-if="scope.row.status=='已下线'" class="yxx">{{scope.row.status}}</p>
                </template>
              </el-table-column>
              <el-table-column label="上线时间" prop="createDataTime" width="120"></el-table-column>
              <el-table-column label="发布来源" prop="source" width="120"></el-table-column>
              <el-table-column label="文章ID" prop="id" ></el-table-column>
              <el-table-column label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" style="margin-right:8px;vertical-align:middle;" v-if="scope.row.isUping" @click.native.prevent="cancelUp(scope.row)">取消置顶</el-button>
                  <el-button type="text" v-if="scope.row.status =='已上线'" style="margin-right:8px;vertical-align:middle;">下线</el-button>
                  
                  <el-button type="text" @click.native.prevent="recommend1(scope.row)"><i class="iconfont icon-see" ></i></el-button>
                  
                  <el-button type="text" v-if="scope.row.status =='已上线'" @click.native.prevent="recommend(scope.row)"><i class="iconfont icon-share"></i></el-button>
                 <router-link :to="{name:'market-edit'}" ><el-button type="text"><i class="iconfont icon-edit" ></i></el-button> </router-link> 
                
                  <el-button type="text" v-if="scope.row.status !='已上线'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete" ></i></el-button>
                  <el-button type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
          <el-tab-pane label="新建" name="Downline">
          <div class="tab2">
            <div class="text-right marBo4">
              <el-button class="light_btn">批量提交审核</el-button>
              <el-button class="light_btn">刷新</el-button>
            </div>
            <el-table
              ref="multipleTable"
              :data="newArticle"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
              :row-class-name="miniTable" :header-row-class-name="miniTable"
              >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="num"
                label="序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                >
              </el-table-column>
              <el-table-column
                prop="author"
                label="创建人"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
     
      
      <el-dialog center
        title="设置置顶内容排序"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-table
          :data="upData"
          border
          style="width: 100%">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="name" label="操作" width="70" class="text-center">
            <template slot-scope="scope">
              <el-button type="text"  v-if="scope.$index != 0" @click="changeIndex(scope.$index,upData,'isUp')"> 
                <i  class="iconfont icon-up" ></i>
              </el-button>
              <el-button type="text"  v-else  disabled> 
                <i  class="iconfont icon-up unclick"></i>
              </el-button>
              <el-button type="text" v-if="scope.$index != upDataLength" @click="changeIndex(scope.$index,upData,'isDown')">
                <i  class="iconfont icon-down"></i>
              </el-button>
              <el-button type="text" v-else disabled>
                <i class="iconfont icon-down" style="cursor:not-allowed"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">发 布</el-button>
        </span>
      </el-dialog>
      <el-dialog

        title="推荐到新闻主页"
        :visible.sync="dialogVisible1"
        center
        width="30%"
        :before-close="handleClose">
        <!--<el-radio v-model="recommendRadio" label="1">推荐到banner</el-radio><br/>-->
        <el-radio v-model="recommendRadio" label="2">置顶-列表区</el-radio>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      
      <!--移动端展示-->
      <el-dialog

        title="移动端展示"
        :visible.sync="apps"
        center
        width="20%"
        :before-close="handleClose">
        <h1 style="text-align: center;">打算打算打算</h1>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        <p style="text-align: center;">奥术大师大所大所大所大所大所</p>
        
        <!--<el-radio v-model="recommendRadio" label="1">推荐到banner</el-radio><br/>-->
        <!--<el-radio v-model="recommendRadio" label="2">置顶-列表区</el-radio>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="apps = false">取 消</el-button>
          <el-button type="primary" @click="apps = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
      <div style="margin-top:20px;">
        <el-pagination class="text-center"
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
<script type="text/javascript">
import { formatTime,parseTime } from '@/utils/index' //@ === src
export default {
  name: 'home',
    data() {
      return {
        multipleSelection: [],
        newArticle:[
          {
            num:1,
            title:'test7mkaiemlaoapuemske93osksks',
            author:'web',
            classification:'app'
          }
        ],
        activeTab:'first',
        recommendRadio:1,
        dialogVisible: false,
        dialogVisible1: false,
        apps:false,
        per_page:10,
        total_pages:100,
        currentPage_bidding:7, // 页面默认展示的当前页码
        upData:[
          {
            title:'1马上就要过端午节了,公司发了粽子给大家,'
          },
          {
            title:'2测试一下是否会出现省略号测试一下是否会出现省略号测试一下是否会出现省略号'
          },
          {
            title:'3测试一下是否会出现省略号测试一下是否会出现省略号测试一下是否会出现省略号'
          },
          {
            title:'4测试一下是否会出现省略号测试一下是否会出现省略号测试一下是否会出现省略号'
          }
        ],
        tableData: [{
            num: '1',
            title: '王小虎在北京开演唱会哈哈哈坎坎坷坷扩扩扩扩扩扩哈或或或',
            author: '管理员1',
            status:'已上线',
            source:'pc后台',
            isUping:true,
            id:'13823',
            link:'www.baidu.com',
            go:'app',
            gotimes:'2018',
            classification:'11111'
          },
          {
            num: '2',
            title: '北京今日高温41度',
            author: '用户1号',
            status:'已下线',
            source:'app端',
            id:'1234',
             go:'app',
            gotimes:'2018',
             classification:'11111'
          },
          {
            num: '3',
            title: '北京交通运输座谈会今日召开',
            author: '运营1号',
            status:'待上线',
            source:'app端',
            id:'120937866534',
             go:'app',
            gotimes:'2018',
             classification:'11111'
          }],
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项5',
          label: '已上线'
        }, {
          value: '选项6',
          label: '已下线'
        }],
         optionss: [{
          value1: '选项1',
          label: '全部'
        }, {
          value1: '选项2',
          label: 'APP'
        }, {
          value1: '选项3',
          label: '后台发布'
        }, {
          value1: '选项4',
          label: '数据爬取'
        }],
          optionsss: [{
          value2: '选项1',
          label: '上线时间'
        }, {
          value2: '选项2',
          label: '创建时间'
        }, {
          value2: '选项3',
          label: '下线时间'
        }, {
          value2: '选项4',
          label: '审核时间'
        }],
        value6: '',
        inputs: '',
        value: '',
        value1:'',
        value2:'',
        dataList:[],
      }
    },
    computed:{
      upDataLength:function(){
        return this.upData.length - 1;
      }
    },
    created() {
//  	this.$get('/industry/list').then(res => {
//  		console.log(res)
//  		this.tableData = res.data
//  	})
    },
    methods:{
    	miniTable(row){
      return 'miniTable'
    },
    btnTable(row){
    	return 'btnTable'
    },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //推荐到
      recommend(row){
          this.dialogVisible1 = true;
      },
      recommend1(row){
          this.apps = true;
      },
      //取消置顶
      cancelUp(row){
        this.$confirm('确定要取消置顶吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '置顶成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });          
        });
      },
      //实现置顶排序的方法
      changeIndex(index,rows,dir){
        if(dir == 'isUp'){
          var a = rows[index]
          var b = rows[index-1]
          rows.splice(index-1, 1, a)
          rows.splice(index, 1, b)
        }else{
          var a = rows[index]
          var b = rows[index+1]
          rows.splice(index+1, 1, a)
          rows.splice(index, 1, b)
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      guanlian(id) {
        var arr = [{id:1}];
        let item = arr.filter((item,index)=>{
          return item.id ===id
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      deleteRow(index, rows) {
       // rows.splice(index, 1);
       this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        console.log(index, rows);
      }
    }
  }
</script>
<style type="text/css">
  .el-range-editor.el-input__inner{
    padding:0;
  }
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height:28px;
    height:28px;
  }
  .el-date-editor .el-range__icon{
    padding-left: 4px;
  }
  .iconfont{
    vertical-align:middle;
    cursor: pointer;
  }
  .name_wrapper{
   display: inline-block; 
  }
  .yshx{
    color: #00C621;
  }
  .dshx{
    color: #FEB210;
  }
  .yxx{
    color:#999;
  }
  .el-table,
  .el-table .el-button{
    font-size: 12px;
  }
  .el-table th{
    font-size: 14px;
  }
  .el-table th{
    text-align: center;
  }
  .el-table_1_column_7 .iconfont{
    font-size: 20px;
    vertical-align: middle;
    margin-right: 8px;
  }
  .el-button.el-button--small{
    line-height: 8px;
    padding-top:9px;
    padding-bottom: 9px;
  }
</style>