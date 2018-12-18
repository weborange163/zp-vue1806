<template>
    <div class="page-body rules-list">
      <div class="page-header">
        <el-input size="mini" v-model="ruleName" placeholder="规则名称" style="width:200px;"></el-input>
        <el-button class="light_btn" @click="getList">搜索</el-button>
      </div>
      <div class="box">
        <div class="text-right marBo4">
          <el-button class="light_btn" @click="getList">刷新</el-button>
        </div>
        <el-table :row-class-name="miniTable()" :header-row-class-name="miniTable()" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%;margin:0 auto;">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="dict_type_name"  label="规则分类"></el-table-column>
          <el-table-column prop="dict_name"  label="规则"></el-table-column>
          <el-table-column prop="description"  label="参数详情"></el-table-column>
          <el-table-column prop="update_time"  label="修改时间"></el-table-column>
          <el-table-column prop="update_user_name"  label="操作账号"></el-table-column>
          <el-table-column label="操作"  fixed="right" width="80">
            <template slot-scope="scope">
              <el-button v-if='scope.row.rule=="100"' size="mini" type="text" @click="setRules(scope.row.id,scope.row.rule)">设置</el-button>
              <el-button v-else size="mini" type="text" @click="jumpDetail(scope.row.id)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="marT20">
          <el-pagination class="text-right" background @current-change="handleCurrentChange" 
          :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" 
          layout="total, sizes, prev, pager, next, jumper" :total="this.total" @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="更换第三方账户周期" :visible.sync="dialog11" width="400px">
        <el-form :model="form11" ref="form11" label-width="98px" :rules="rules11">
          <el-form-item label="选择更换周期">
            <el-radio-group v-model="form11.cycle">
              <el-radio label="1">日</el-radio>
              <el-radio label="7">自然周</el-radio>
              <el-radio label="30">月(30天)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="可更换次数" prop="bindingNum">
            <el-input size="mini" type="text" v-model="form11.bindingNum">
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form11.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog11 = false;form11={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="sureChangeRule()">确 认</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {miniTable} from '@/utils/table-style.js'
export default {
  data(){
    return{
      currentId:'',
      ruleName:'',
      form11:{isEnable:false,changeNum:'',cycle:'1'},dialog11:false,
      rules11:{
        bindingNum:[{ required: true, message: '"兑换次数"输入值未填写', trigger: 'blur' },
          {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
       
      },
      loading:false,
      miniTable:miniTable,
      input:'',
      tableData:[
        {dict_type_name:'内容管理',dict_name:"栏目管理",ruleParam:'',id:'1'},
        {dict_type_name:'内容管理',dict_name:"转载来源设置",ruleParam:'',id:'2'},
        {dict_type_name:'系统设置',dict_name:"区域管理",ruleParam:'',id:'3'},
        ],
      per_page: 10,
      total: 1,
      currentPage: 1,
    }
  },
  created() {
    this.getList();
  },
  methods:{
    setRules(id,rule){
      console.log(id);
      this.currentId = id;
      this.currentRule = rule;
      this.dialog11 = true;
        let param = {
          tokenId: this.$store.state.user.tokenId,
          id:id
        }
      this.$post('/jtbRule/get',param).then(res=>{
        console.log(res);
        if(res.code==0){
         this.form11 = res.data[0].maps;
        }else{
          this.$message({
            message: res.msg?res.msg:'查询失败失败',
            type: 'error'
          });
        }
      });
    },
  getList(){
    //   /jtbRule/otherList
      let param = {
          tokenId: this.$store.state.user.tokenId,
          offset: '1',
          limit: '10',

        }
      this.$post('/jtbRule/otherList',param).then(res=>{
        console.log(res);
        this.tableData.splice(3,1,res.data[0].rows[0]);
       // this.tableData.push(res.data[0].rows[0]);
        if(res.code==0){
          this.$message({
            message: res.msg,
            type: 'success'
          });

        }else{
          this.$message({
            message: res.msg?res.msg:'操作失败',
            type: 'error'
          });
        }
      });
    },
    jumpDetail(id){
      switch (id)
          {
          case '1':
            this.$router.push({
              name: 'rules1'
            });
            break;
          case '2':
            this.$router.push({
              name: 'rules2',
            });
            break;
          case '3':
            this.$router.push({
              name: 'rules3',
            });
            break;
          }
    },
    sureChangeRule(){
      this.$refs['form11'].validate((valid) => {
        if (valid) {
          let jsonExt={cycle:this.form11.cycle,bindingNum:this.form11.bindingNum}
          let param = {
            tokenId: this.$store.state.user.tokenId,
            isEnable:this.form11.isEnable==false?'0':'1',
            rule:this.currentRule,
            id:this.currentId,
            ext:JSON.stringify(jsonExt)
          }
          // 发送请求  设置绑定周期
          this.$post('/jtbRule/update',param).then(res=>{
            if(res.code==0){
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.dialog11=false;
              this.getList();
            }
          });
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.per_page = val;
      this.getList();
    },
  }
}
</script>
<style>

</style>

