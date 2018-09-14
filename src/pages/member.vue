<template>
  <div class="page-body member">
    <div class="page-header clearfix">
      <el-row >
        <el-col :span='14'>
          <el-row :gutter="6" style="margin-bottom:8px;">
            <el-col :span='7'>
              <el-select size="mini" v-model="value" placeholder="时间类型" @change="tofilter">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span='12'>
              <el-date-picker size="mini"  v-model="value2" type="datetimerange" 
                value-format="yyyy-MM-dd HH-mm-ss" style="width:100%" 
                start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '00:00:00']">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="6">
            <el-col :span='7'>
              <el-select size="mini" v-model="value3" placeholder="性别" @change="tofilter">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span='6'>
              <el-input size="mini" type="number" placeholder="请输入起始年龄" v-model="value4"></el-input>
            </el-col>
            <el-col :span='6'>
              <el-input size="mini" type="number" placeholder="请输入结束年龄" v-model="value5"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span='10' :offset="0">
          <el-row style="margin-bottom:8px;">
            <el-select size="mini" placeholder="会员身份" v-model="identityValue" style="width:30%;margin-right:2%;">
              <el-option
                v-for="item in identitySelect"
                :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select size="mini" placeholder="选择省" v-model="provinceVal" style="width:30%;margin-right:2%;" @change="provinceChange">
              <el-option
                v-for="item in provinceArr"
                :key="item.areaNo" :label="item.areaName"
                :value="item.areaNo">
              </el-option>
            </el-select>
            <el-select size="mini" placeholder="选择市" v-model="cityVal" style="width:30%;">
                <el-option
                v-for="item in cityArr"
                :key="item.areaNo" :label="item.areaName"
                :value="item.areaNo">
              </el-option>
            </el-select>
          </el-row>
          <el-row :gutter="6" >
            <el-col :span='18'>
              <el-input size="mini" v-model="value6" placeholder="请输入用户名/用户ID/手机号"></el-input>
            </el-col>
            <el-col :span='3'>
              <el-button class="light_btn" size="mini" @click="showList">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <div class="member_table">
      <div class="text-right marBo4">
        <el-button class="light_btn" @click="innerMemDia = true" size="mini">创建小号</el-button>
        <el-button class="light_btn" size="mini" @click="showList()">刷新</el-button>
      </div>
      <el-table :row-class-name="miniTable" :header-row-class-name="miniTable"
          :data="tableData" v-loading="loading" border  stripe  style="width: 100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column
            prop="nickName"
            label="用户名"
           >
          </el-table-column>
          <el-table-column
            prop="identity"
            label="身份"
            width="100">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号" width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别" width="80">
          </el-table-column>
          <el-table-column
            prop="age" width="50"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="城市" width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间" width="180">
          </el-table-column>
          <el-table-column
            prop="userCode"
            label="会员ID" width="110">
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="最后登录时间" width="180">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="124">
          <template slot-scope="scope">
            <div v-if="scope.row.identity != '内部小号'">
              <router-link :to="{name:'member-info',params:{id:scope.row.userId}}"><el-button type="text"  size="mini"
                >详情</el-button>
              </router-link>
              <el-button type="text"
                size="mini" class="marL10"
                @click="setPower(scope.$index, scope.row)">权限</el-button>
              <el-button type="text"
                size="mini"
                @click="setIdentity(scope.$index, scope.row)">身份</el-button>
            </div>
            <div v-else>
              <router-link :to="{name:'member-info',params:{id:scope.row.userId}}"><el-button type="text"  size="mini" 
                 >详情</el-button>
                </router-link>
                <el-button type="text"
                  size="mini" class="marL10" disabled>权限</el-button>
                <el-button type="text" disabled size="mini">身份</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="marT20">
        <el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" 
          :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" :total="this.total_pages">
				</el-pagination>
      </div>
    </div>
    <!-- 创建小号的弹窗 -->
    <el-dialog title="创建内部小号" :visible.sync="innerMemDia" width="30%" center>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="手机号:" label-width="80px" prop="tel">
          <el-input v-model="form.tel" auto-complete="off" size="mini" placeholder="请输入4-12位数字"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" label-width="80px" prop="name">
          <el-input v-model="form.name" size="mini" placeholder="请输入4-15个字"></el-input>
        </el-form-item>
        <el-form-item label="简介:" label-width="80px" prop="shortDes">
          <el-input v-model="form.shortDes" type="textarea" size="mini" placeholder="请输入简介"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerMemDia = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="createInner" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 身份弹窗 -->
    <el-dialog title="选择会员身份" :visible.sync="identityDia" width="30%" center>
      <div class="text-center">
        <el-radio v-model="radio" label="100001">普通会员</el-radio>
        <el-radio v-model="radio" label="100003">认证会员(带V身份标识）</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="identityDia = false" class="light_btn">取 消</el-button>
        <el-button type="primary" @click="changeIdentity" class="light_btn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限弹窗 -->
    <el-dialog title="修改用户权限" :visible.sync="powerDia" width="30%" center>
      <div>
        <el-checkbox-group v-model="checkList" id="checkList">
           <el-checkbox v-for="i in checkOp" :label="i.prohibitCode" :key="i.id">{{i.prohibitName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="powerDia = false" class="light_btn">取 消</el-button>
        <el-button type="primary" @click="changePower" class="light_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
      return {
        radio:'100001',
        checkOp:[],
        checkList: [],
        form:{
          tel:'',
          name:'',
          shortDes:''
        },
        provinceArr:[],
        cityArr:[],
        provinceVal:'',
        cityVal:'',
        identityValue:'',
        identitySelect:[{
          value: '0',
          label: '全部'
          }, {
            value: '100001',
            label: '普通会员'
          }, {
            value: '100003',
            label: '认证会员'
          },
          {
            value:'100002',
            label:'内部小号'
          }
        ],
        rules:{
          tel: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern: /^[0-9]*$/,message:'手机号只能输入数字', trigger: 'blur'},
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' },
          ],
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' },
          ],
          shortDes:[
            // { required: true, message: '请输入简介', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ]
        },
        innerMemDia:false,
        identityDia:false,
        powerDia:false,
        loading:false,
        per_page: 10,
        total_pages: 0,
        currentPage: 1,
        tableData: [],
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: 'registTime',
          label: '注册时间'
        }, {
          value: 'loginTime',
          label: '最后登录时间'
        }],
        options1:[{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        value: '',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        userId:''
      };
    },
    created() {
      this.showList();
      this.$post('/area/findProvince',{tokenId:this.$store.state.user.tokenId}).then(res => {
        console.log(res)
        this.provinceArr=res.data;
      });
    },
    methods: {
      showList(){
        this.loading = true;
        var params = {
          tokenId: this.$store.state.user.tokenId,
          limit: this.per_page,
          offset: this.currentPage,
          status:this.value,
          queryType:this.value,
          sex:this.value3==0?'':this.value3,
          ageStart:this.value4,
          ageEnd:this.value5,
          simpleParameter:this.value6,
          levelCode:this.identityValue=='0'?'':this.identityValue,
          provinceId:this.provinceVal=='000000'?'':this.provinceVal,
          cityId:this.cityVal
        };
        if(this.value == 0){
          params.queryType ='';
          params.startTime ='';
          params.endTime = ''
        }
        if(this.value2){
          params.startTime = this.value2[0];
          params.endTime = this.value2[1];
        }
        // console.log(this.value1)
        this.$post('members/list', params).then(res => {
          if(res.code == 0){
          //  console.log(res)
          //  console.log(res.data[0].rows);
            var data = res.data[0].rows;
            data.map(item=>{
              if(item.province == '未填写'){
                item.addr = '未填写'
              }else{
                item.addr = item.province + item.city + item.area;
              }
            })
            console.log(data);
            this.tableData = data;

            this.total_pages = res.data[0].total;
            this.loading=false;
          }
        })
      },
      provinceChange(val){
        // console.log(val);
        this.cityVal='';
        if(val){
          this.$post('/area/findCityByProvinceNo',{tokenId:this.$store.state.user.tokenId,areaNo:this.provinceVal}).then(res => {
            this.cityArr = res.data;
            console.log(this.cityArr)
          })
        }
      },
      //设置身份
      setIdentity(index,row){
        this.identityDia = true;
        console.log(index,row)
        if(row.identity == '认证会员'){
          this.radio = '100003';
        }else{
          this.radio = '100001';
        }
        this.userId = row.userId;
      },
      // 确定更改身份
      changeIdentity(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          levelCode:this.radio,
          userId:this.userId,
        };
        this.$post('members/updateLevel',params).then(res => {
          if(res.code == 0){
            this.identityDia = false;
            this.userId='';
            this.showList();
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
      },
      // 权限弹窗
      setPower(index, row) {
        // console.log(index, row);
        this.powerDia = true;
        this.userId =  row.userId;
        this.$post('members/prohibit/findList',{tokenId:this.$store.state.user.tokenId,status:'1'}).then(res => {
          // console.log(res.data)
          this.checkOp = res.data;
          var params = {
            tokenId:this.$store.state.user.tokenId,
            userId: row.userId
          }
          this.$post('members/getPermissions',params).then(res => {
            this.checkList=[];
            // console.log(res);
            if(res.data[0]){
              this.checkList= (res.data[0].prohibitCodes).split(','); // "100003,100005"
            }
              
          });
        })
      },
      // 确认设置权限
      changePower(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          prohibitCodes: this.checkList.join(','),
          userId:this.userId
        }
        this.$post('members/setPermissions',params).then(res => {
          console.log(res)
          if(res.code == 0){
            // this.powerDia = true;
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.powerDia=false;
          }else{
            this.$message({
              message: '设置失败请重试!',
              type: 'error'
            });
          }
        })
      },
      // 创建小号
      createInner(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            var params = {
              tokenId:this.$store.state.user.tokenId,
              phone:this.form.tel,
              nickName:this.form.name,
              userDesc:this.form.shortDes
            };
            this.$post('members/addInnerMember',params).then(res=>{
              if(res.code == 0){
                this.innerMemDia = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.showList();
              }else{
                this.$message({
                  message: '添加失败请重试!',
                  type: 'error'
                });
              }
            })
          }
        })
        
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.showList();
      },
      handleSizeChange(val){
        this.per_page = val;
        this.showList();
      },
      tofilter(val){
        console.log(val);
        console.log(this.value);
      },
      handleInfo(index, row) {
        console.log(index, row);

      },
      miniTable(row){
        return 'miniTable'
      }
    }
}
</script>
<style>
  .member .member_table{
    padding: 15px;
  }
  .member .el-input__icon{
    line-height: 26px;
  }
  .member .el-checkbox{
    width: 50%;
    text-align: left;
  }
  .member .el-checkbox+.el-checkbox{
    margin-left:0; 
  }
</style>
