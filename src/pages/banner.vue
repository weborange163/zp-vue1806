<template>
    <div class="page-body banner">
        <div class="page-header clearfix">
          <el-input v-model="search_info" placeholder="请输入内容" style="width:220px;margin:0 20px;"></el-input>
          <el-button class="light_btn">搜索</el-button>
        </div>
        <div class="box">
          <div style="text-align:right;margin-bottom:4px;">
            <el-button class="light_btn">发布</el-button>
            <el-button class="light_btn">刷新</el-button>
          </div>
          <div class="banner_show">
            <el-table :data="banner_data" border stripe>
              <el-table-column label="序号" prop="num" width='50'></el-table-column>
              <el-table-column label="原文标题" prop="title"></el-table-column>
              <el-table-column label="短标语" prop="shotTitle"></el-table-column>
              <el-table-column label="发布状态" prop="status" width="80">
                <template  slot-scope="scope">
                  <p v-if="scope.row.status=='已上线'" class="yshx">{{scope.row.status}}</p>
                  <p v-if="scope.row.status=='待上线'" class="dshx">{{scope.row.status}}</p>
                  <p v-if="scope.row.status=='已下线'" class="yxx">{{scope.row.status}}</p>
                </template>
              </el-table-column>
              <el-table-column label="内容类型" prop="type" width='100'></el-table-column>
              <el-table-column label="图片" prop="picture" width='100'></el-table-column>
              <el-table-column label="上传时间" prop="upTime" width='100'></el-table-column>
              <el-table-column label="创建时间" prop="createTime" width='100'></el-table-column>
              <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" style="margin-right:8px;vertical-align:middle;" @click="deleteRow(scope.$index,scope.row)">取消置顶</el-button>
                  <el-button type="text" v-if="scope.row.status =='已上线'" style="margin-right:8px;vertical-align:middle;">下线</el-button>
                  <el-button type="text"><i class="iconfont icon-see" ></i></el-button>
                  <el-button type="text"><i class="iconfont icon-share" ></i></el-button>
                  <el-button type="text"><i class="iconfont icon-edit" ></i></el-button>
                  <el-button type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete" ></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      search_info:'',
      banner_data:[
        {num:22,
        title: '王大虎打伤了王小虎',
        shotTitle:'恶意伤人事件',
        status:'已上线',
        type:'新闻',
        picture:'图片',
        upTime:'2018-01-01',
        createTime:'2018-01-01'
        },
        {num:242,
        title: '区块链到底是什么?关于区块链最深刻的理解哈哈哈哈或或或',
        shotTitle:'带你认识区块链',
        status:'已上线',
        type:'专题',
        picture:'图片',
        upTime:'2018-08-01',
        createTime:'2018-07-01'
        },
        {num:29,
        title: '真的不知道编些啥内容了',
        shotTitle:'内容',
        status:'已上线',
        type:'新闻',
        picture:'图片',
        upTime:'2018-01-01',
        createTime:'2018-01-01'
        }
      ]
    }
  },
  methods:{
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
      },
      sort() {
        let arr = [
          {id:1},
          {id:2},
          {id:3},
          {id:4},
          {id:5},
          {id:6}
        ]

        let obj1 = arr[2];
        arr[2] = arr[3];
        arr[3] = obj1;
        console.log(arr)
      }
  }
}
</script>
<style>

</style>

