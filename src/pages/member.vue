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
              <el-date-picker size="mini" style="width:95%;"
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
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
            <el-select size="mini" placeholder="会员身份" filterable default-first-option multiple allow-create
            v-model="identityValue" style="width:220px;margin-right:2%;" @change="testVal">
              <el-option
                v-for="item in identitySelect"
                :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select size="mini" placeholder="选择省" v-model="provinceVal" style="width:150px;margin-right:2%;" @change="provinceChange">
              <el-option
                v-for="item in provinceArr"
                :key="item.areaNo" :label="item.areaName"
                :value="item.areaNo">
              </el-option>
            </el-select>
            <el-select size="mini" placeholder="选择市" v-model="cityVal" style="width:130px;">
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
              <el-button class="light_btn" size="mini" @click="showList()">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <div class="member_table">
      <div class="text-right marBo4">
        <el-upload style="display:inline-block;"
          class="upload-demo" name="usersFile"
          action=""
          :on-change="handleChange1"
          :auto-upload="false"
          :file-list="fileList1">
          <el-button size="mini" type="primary">导入活跃数据</el-button>
        </el-upload>
        <el-upload style="display:inline;"
          class="upload-demo" name="usersFile"
          action=""
          :on-change="handleChange"
          :auto-upload="false"
          :file-list="fileList">
          <el-button size="mini" type="primary">批量上传内部号</el-button>
        </el-upload>
        <el-button class="light_btn" @click="openCreate()" size="mini">创建内部号</el-button>
        <el-button class="light_btn" size="mini" @click="showList()">刷新</el-button>
      </div>
      <el-table :row-class-name="miniTable" :header-row-class-name="miniTable"
          :data="tableData" v-loading="loading" border  stripe  style="width: 100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="nickName" label="用户名"></el-table-column>
          <el-table-column prop="identity" label="身份" width="100">
             <template slot-scope="scope">
              <p v-if="scope.row.identity_code=='100001'&& scope.row.rank_code=='1001'">普通会员</p>
              <p v-if="scope.row.identity_code=='100001'&& scope.row.rank_code=='1002'">认证会员</p>
              <p v-if="scope.row.identity_code=='100002'">内部小号</p>
              <p v-if="scope.row.identity_code=='100003'">内部大号</p>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="age" width="50" label="年龄"></el-table-column>
          <el-table-column prop="addr" label="城市" width="150"></el-table-column>
          <el-table-column prop="createTime" label="注册时间" width="180"></el-table-column>
          <el-table-column prop="userCode" label="会员ID" width="110"></el-table-column>
          <el-table-column prop="loginTime" label="最后登录时间" width="180"></el-table-column>
          <el-table-column label="操作" fixed="right" width="124">
          <template slot-scope="scope">
            <div v-if="scope.row.identity_code == '100001'">
              <router-link :to="{name:'member-info',params:{id:scope.row.userId}}"><el-button type="text"  size="mini"
                >详情</el-button>
              </router-link>
              <el-button type="text" size="mini" class="marL10" @click="setPower(scope.$index, scope.row)">权限</el-button>
              <el-button type="text" size="mini" @click="setIdentity(scope.$index, scope.row)">身份</el-button>
            </div>
            <div v-else>
              <router-link :to="{name:'member-info',params:{id:scope.row.userId}}"><el-button type="text"  size="mini" 
                 >详情</el-button>
                </router-link>
                <el-button type="text"
                  size="mini" class="marL10" disabled>权限</el-button>
                <el-button type="text" @click="editInner(scope.row)" size="mini">编辑</el-button>
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
    <el-dialog title="创建内部账号" :visible.sync="innerMemDia" width="600px" center>
      <el-form :model="form" ref="form" :rules="rules" label-width="84px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="账号类型:" prop="identityCode">
              <el-select size="mini" placeholder="选择账号类型" v-model="form.identityCode">
                <el-option value="100002" label="内部小号"></el-option>
                <el-option value="100003" label="内部大号"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.phone" auto-complete="off" size="mini" placeholder="请输入4-12位数字"></el-input>
            </el-form-item>
            <el-form-item label="用户名:" prop="nickName">
              <el-input v-model.trim="form.nickName" size="mini" placeholder="请输入4-15个字"></el-input>
            </el-form-item>
            <el-form-item label="上传头像:" ref="icon" prop="icon">
              <el-upload action="" accept="image/jpeg,image/gif,image/png,image/bmp"
                :multiple="false" :limit='1'
                ref="upload" name="file"
                list-type="picture-card"
                :file-list="fileList2"
                :auto-upload="false" :on-exceed="handleExceed2"
                :on-preview="handlePictureCardPreview2"
                :on-change="fileChange2"
                :on-remove="handleRemove2">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialog" :modal='false'>
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加V:" prop="rankCode">
              <el-radio v-model="form.rankCode" label="1002">是</el-radio>
              <el-radio v-model="form.rankCode" label="1001">否</el-radio>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-radio v-model="form.sex" :label="2">女</el-radio>
              <el-radio v-model="form.sex" :label="1">男</el-radio>
            </el-form-item>
            <el-form-item label="生日:" prop="birthday">
              <el-date-picker size="mini" style="width:100%"
                v-model="form.birthday" value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择生日">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="城市:" prop="add">
              <el-select size="mini" placeholder="选择省" v-model="form.provinceId" style="width:45%;margin-right:2%;" @change="provinceChange2">
                <el-option
                  v-for="item in provinceArr"
                  :key="item.areaNo" :label="item.areaName"
                  :value="item.areaNo">
                </el-option>
              </el-select>
              <el-select size="mini" placeholder="选择市" v-model="form.cityId" style="width:45%">
                  <el-option
                  v-for="item in cityArr"
                  :key="item.areaNo" :label="item.areaName"
                  :value="item.areaNo">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="简介:" prop="userDesc">
              <el-input v-model="form.userDesc" type="textarea" size="mini" placeholder="请输入简介"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerMemDia = false;form={};$refs['form'].resetFields();" size="mini">取 消</el-button>
        <el-button type="primary" @click="createInner" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 身份弹窗 -->
    <el-dialog title="选择会员身份" :visible.sync="identityDia" width="30%" center>
      <div class="text-center">
        <el-radio v-model="radio" label="1001">普通会员</el-radio>
        <el-radio v-model="radio" label="1002">认证会员(带V身份标识）</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="identityDia = false;form={sex:1,rankCode:'1001'}" class="light_btn">取 消</el-button>
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
        isEdit:false,
        newsFile:'',
        newsFile1:'',
        formDatas:'',
        fileList:[],
        fileList1:[],
        fileList2:[],
        hasFmt:false,
        hasChangeFile:false,
        dialogImageUrl:'',
        imgDialog:false,
        radio:'100001',
        checkOp:[],
        checkList: [],
        form:{
          phone:'',
          nickName:'',
          userDesc:'',
          identityCode:'',
          rankCode:'1001',
          sex:1,
          birthday:'',
          provinceId:'',
          cityId:''
        },
        provinceArr:[],
        cityArr:[],
        provinceVal:'',
        cityVal:'',
        identityValue:[],
        identitySelect:[ {
            value: '100000',
            label: '普通会员'
          }, {
            value: '100001',
            label: '认证会员'
          },
          {
            value:'100002',
            label:'内部小号'
          },
          {
            value:'100003',
            label:'内部大号'
          }
        ],
        rules:{
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern: /^[0-9]*$/,message:'手机号只能输入数字', trigger: 'blur'},
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' },
          ],
          nickName:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' },
          ],
          identityCode:[
             { required: true, message: '请选择账号类型', trigger: 'blur' },
          ],
          userDesc:[
            // { required: true, message: '请输入简介', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ],
          rankCode:[
            { required: true, message: '请选择是否加V', trigger: 'blur' },
          ],
          sex:[
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
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
        // console.log(res)
        this.provinceArr=res.data;
      });
    },
    methods: {
      openCreate(){
        this.innerMemDia = true;
        this.isEdit=false;
        this.hasChangeFile=true;
        this.form={sex:1,rankCode:'1001',};
        this.fileList2=[];
         if(this.$refs['form']){
          this.$refs['form'].resetFields();
         }
      },
      editInner(row){
        if(this.$refs['form']){
          this.$refs['form'].resetFields();
        }
        this.isEdit=true;
        this.hasChangeFile = false;
        var params={
          tokenId:this.$store.state.user.tokenId,
          userId:row.userId
        }
        this.$post('/members/getBaseInfo',params).then(res => {
          console.log(res.data[0]);
          this.form = res.data[0];
          this.innerMemDia = true;
          if(this.form.headImgUrl){
            this.fileList2.push({url:this.form.headImgUrl});
          }else{
            this.fileList2=[];
          }
          if(this.form.provinceId){
            this.$post('/area/findCityByProvinceNo',{tokenId:this.$store.state.user.tokenId,areaNo:this.form.provinceId}).then(res => {
              this.cityArr = res.data;
              // console.log(this.cityArr)
            });
          }
        })
       
      },
      sureUpload(){
        const loading = this.$loading({
              lock: true,
              text: '上传中...',
              target:document.querySelector('.app-container'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
        this.formDatas = new FormData();
        this.formDatas.append('usersFile', this.newsFile);
        this.formDatas.append('tokenId',this.$store.state.user.tokenId);
        this.$post('/members/toExportInt',this.formDatas).then(res =>{
          if(res.code == 0){
            loading.close();
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.showList();
          }else if(res.code == 3){
            loading.close();
            let str = '';
            res.data.map(item => {
              str+='<p>'+item+'<p/>';
            })
            const h = this.$createElement;
            this.$notify.error({
              title: '错误',
              dangerouslyUseHTMLString: true,
              message: str,
              duration: 0
            });
          }else{
            loading.close();
            this.$message({
              message: res.msg?res.msg:'操作失败',
              type: 'error'
            });
          }
          this.newsFile='';
        })
      },
      sureUpload1(){
        const loading = this.$loading({
              lock: true,
              text: '上传中...',
              target:document.querySelector('.app-container'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
        this.formDatas = new FormData();
        this.formDatas.append('usersConutFile', this.newsFile1);
        this.formDatas.append('tokenId',this.$store.state.user.tokenId);
        this.$post('/members/toConutExportInt',this.formDatas).then(res =>{
          if(res.code == 0){
            loading.close();
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.showList();
          }else if(res.code == 3){
            loading.close();
            let str = '';
            res.data.map(item => {
              str+='<p>'+item+'<p/>';
            })
            const h = this.$createElement;
            this.$notify.error({
              title: '错误',
              dangerouslyUseHTMLString: true,
              message: str,
              duration: 0
            });
          }else{
            loading.close();
            this.$message({
              message: res.msg?res.msg:'操作失败',
              type: 'error'
            });
          }
          this.newsFile='';
        })
      },
      handleChange1(file, fileList){
        // console.log(file, fileList);
        this.newsFile1 = file.raw;
        this.fileList1 = fileList;
        this.$confirm('确定要上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.sureUpload1();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
      },
      handleChange(file, fileList){
        // console.log(file, fileList);
        this.newsFile = file.raw;
        this.fileList = fileList;
        this.$confirm('确定要上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.sureUpload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
      },
      testVal(val){
        console.log(val);
      },
      showList(val){
        this.loading = true;
        this.currentPage=val?val:1;
        var params = {
          tokenId: this.$store.state.user.tokenId,
          limit: this.per_page,
          offset: this.currentPage,
          // status:this.value,
          queryType:this.value,
          sex:this.value3==0?'':this.value3,
          ageStart:this.value4,
          ageEnd:this.value5,
          simpleParameter:this.value6,
          identityCode:this.identityValue.join(','),
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
              // console.log(item.province)
              item.addr = (item.province=="未填写"?'未填写':item.province) + (item.city=="未填写"?'':item.city) + (item.area=="未填写"?'':item.area);
            })
            // console.log(data);
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
          this.$post('/area/findCityByProvinceNo',{tokenId:this.$store.state.user.tokenId,areaNo:val}).then(res => {
            this.cityArr = res.data;
            // console.log(this.cityArr)
          })
        }
      },
      provinceChange2(val){
        console.log(val);
        this.form.cityId='';
        if(val){
          this.$post('/area/findCityByProvinceNo',{tokenId:this.$store.state.user.tokenId,areaNo:val}).then(res => {
            this.cityArr = res.data;
            // console.log(this.cityArr)
          })
        }
      },
      //设置身份
      setIdentity(index,row){
        this.identityDia = true;
        console.log(index,row)
        if(row.rank_code == '1002'){
          this.radio = '1002';
        }else{
          this.radio = '1001';
        }
        this.userId = row.userId;
      },
      // 确定更改身份
      changeIdentity(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          rankCode:this.radio,
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
        console.log(this.form.birthday);
        console.log(this.form);
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let param = new FormData();
            param.append('tokenId',this.$store.state.user.tokenId);
            param.append('phone',this.form.phone);
            param.append('nickName',this.form.nickName);
            param.append('userDesc',this.form.userDesc?this.form.userDesc:'');
            param.append('identityCode',this.form.identityCode);
            param.append('rankCode',this.form.rankCode);
            param.append('sex',this.form.sex);
            param.append('birthday',this.form.birthday?this.form.birthday:'');
            param.append('provinceId',this.form.provinceId?this.form.provinceId:'');
            param.append('cityId',this.form.cityId?this.form.cityId:'');
            // param.append('headImgFile',this.form.file,this.form.filename);
            var url='/members/addInnerMember';
            if(this.isEdit){
              param.append('userId',this.form.userId);
              url='/members/updateInnerMember';
              param.append('headImg',this.form.headImg);
            }
            if(this.hasChangeFile){         // 如果编辑时更换了图片或者是新建时候上传了图片
              param.append('headImgFile',this.form.file,this.form.filename);
            }else{
              param.append('headImgFile','');
            }
            this.$post(url,param).then(res=>{
              if(res.code == 0){
                this.innerMemDia = false;
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.showList();
                this.form={};
                this.dialogImageUrl='';
                // console.log(this.form)
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
        // this.currentPage = val;
        this.showList(val);
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
      },
    handlePictureCardPreview2(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.imgDialog = true;
    },
    fileChange2(file,fileList){
      this.$refs['icon'].clearValidate(); // 图片验证
      this.form.filename = file.name;
      this.hasChangeFile=true;
      this.form.file = file.raw;
      console.log(file.raw)
      if(fileList.length>0){
        // this.hasFmt = true;
      }
    },
    handleExceed2(files, fileList){
      this.$message.warning('当前限制选择 1 个文件');
    },
    handleRemove2(file, fileList) {
      this.pictureId='';
      this.hasChangeFile=true;
      // console.log(file, fileList);
      if(fileList.length == 0){
        // this.hasFmt =false;
        this.form.file='';
        this.form.filename='';
      }
    },
    }
}
</script>
<style>
  .member .member_table{
    padding: 15px;
  }
  /* .member .el-input__icon{
    line-height: 26px;
  } */
  .member .el-checkbox{
    width: 50%;
    text-align: left;
  }
  .member .el-checkbox+.el-checkbox{
    margin-left:0; 
  }
  .member .el-upload-list.el-upload-list--text{
    display: none;
  }
</style>
