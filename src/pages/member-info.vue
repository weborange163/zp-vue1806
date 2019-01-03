<template>
  <div class="page-body member_info">
    <div class="page-header">
      <div class="text-right">
        <el-button size="mini" class="light_btn" @click="$router.back()">返回</el-button>
        <el-button size="small" @click="setIdentity" class="light_btn" v-if="data1.identityCode=='100001'">身份设置</el-button>
        <el-button size="small" @click="setPower" class="light_btn" v-if="data1.identityCode=='100001'">权限设置</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div>
            <p class="info_title">基本信息</p>
            <el-row>
              <el-col :span="4">
                <div class="avatar" style="height:217px;">
                  <img :src="data1.headImgUrl" style="width:100%;height:100%" alt="暂无头像">
                </div>
              </el-col>
              <el-col :span="20">
                <div class="el-table__body-wrapper is-scrolling-none info_table">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
                    <colgroup>
                      <col name="el-table_1_column_1" width="15%">
                      <col name="el-table_1_column_2" width="35%">
                      <col name="el-table_1_column_3" width="15%">
                      <col name="el-table_1_column_4" width="35%">
                    </colgroup>
                    <tbody>
                      <tr class="el-table__row">
                        <td><div class="cell">昵称</div></td>
                        <td><div class="cell">{{data1.nickName}}</div></td>
                        <td><div class="cell">性别</div></td>
                        <td><div class="cell">{{data1.sex1}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">用户ID</div></td>
                        <td><div class="cell">{{data1.userCode}}</div></td>
                        <td><div class="cell">城市</div></td>
                        <td><div class="cell">{{data1.address}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">手机号</div></td>
                        <td><div class="cell">{{data1.phone}}</div></td>
                        <td><div class="cell">生日</div></td>
                        <td><div class="cell">{{data1.birthday}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">身份</div></td>
                        <td><div class="cell">{{data1.identityTrans}}</div></td>
                        <td><div class="cell">简介</div></td>
                        <td><div class="cell">{{data1.userDesc}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">注册时间</div></td>
                        <td><div class="cell">{{data1.createTime}}</div></td>
                        <td><div class="cell">最后登录时间</div></td>
                        <td><div class="cell">{{data1.loginTime}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">登录设备</div></td>
                        <td><div class="cell">{{data1.mobileModel}}</div></td>
                        <td><div class="cell"></div></td>
                        <td><div class="cell"></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户数据" name="second">
          <div>
            <p class="info_title">用户数据</p>
            <div class="el-table__body-wrapper is-scrolling-none info_table">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
                <colgroup>
                  <col name="el-table_1_column_1" width="15%">
                  <col name="el-table_1_column_2" width="35%">
                  <col name="el-table_1_column_3" width="15%">
                  <col name="el-table_1_column_4" width="35%">
                </colgroup>
                <tbody>
                  <tr class="el-table__row">
                    <td><div class="cell">发布文章</div></td>
                    <td><div class="cell">{{num1}}</div></td>
                    <td><div class="cell">粉丝</div></td>
                    <td><div class="cell">{{num4}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布行情</div></td>
                    <td><div class="cell">{{num2}}</div></td>
                    <td><div class="cell">关注</div></td>
                    <td><div class="cell">{{num5}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布广播</div></td>
                    <td><div class="cell">0</div></td>
                    <td><div class="cell">获赞</div></td>
                    <td><div class="cell">{{num8}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布评论</div></td>
                    <td><div class="cell">{{num3}}</div></td>
                    <td><div class="cell">喜欢收藏</div></td>
                    <td><div class="cell">{{num6}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">跟踪</div></td>
                    <td><div class="cell">{{num7}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户权限" name="third">
          <div>
            <p class="info_title">用户权限</p>
            <el-table :row-class-name="miniTable" :header-row-class-name="miniTable"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="prohibitName"
                label="用户权限"
                width="220">
              </el-table-column>
              <el-table-column
                prop="nickName"
                label="操作人"
                width="220">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="操作时间">
              </el-table-column>
              
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关联账号" name="fifth">
          <div>
            <p class="info_title">关联账号</p>
            <el-table :row-class-name="miniTable" :header-row-class-name="miniTable"
              :data="thirdAccount" 
              border
              style="width: 800px;">
              <el-table-column
                prop="name"
                label="第三方"
                width="220">
              </el-table-column>
              <el-table-column
                prop="openId"
                label="openID/UnionId/关联账号"
                >
              </el-table-column>
              <el-table-column label="状态" width="220">
                <template slot-scope="scope">
                  <p v-if="scope.row.isBinding==1" class="yshx">已绑定</p>
                  <p v-else class="yxx">未绑定</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="fourth">
          <div>
            <p class="info_title">其他信息</p>
            <div class="el-table__body-wrapper is-scrolling-none info_table">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
                <colgroup>
                  <col name="el-table_1_column_1" width="25%">
                  <col name="el-table_1_column_2" width="25%">
                  <col name="el-table_1_column_3" width="25%">
                  <col name="el-table_1_column_4" width="25%">
                </colgroup>
                <tbody>
                  <tr class="el-table__row">
                    <td><div class="cell">项目</div></td>
                    <td><div class="cell">参数</div></td>
                    <td><div class="cell">项目</div></td>
                    <td><div class="cell">参数</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">操作系统</div></td>
                    <td><div class="cell">{{data3.mobileOs}}</div></td>
                    <td><div class="cell">版本</div></td>
                    <td><div class="cell">{{data3.mobileOsVersion}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">手机型号</div></td>
                    <td><div class="cell">{{data3.mobileModel}}</div></td>
                    <td><div class="cell">DEVICEID</div></td>
                    <td><div class="cell">{{data3.deviceId}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">IMEI</div></td>
                    <td><div class="cell">{{data3.imei}}</div></td>
                    <td><div class="cell">IMSI</div></td>
                    <td><div class="cell">{{data3.imsi}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">DEVICEID</div></td>
                    <td><div class="cell">{{data3.deviceId}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
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
    <!-- 身份弹窗 -->
    <el-dialog title="选择会员身份" :visible.sync="identityDia" width="30%" center>
      <div class="text-center">
        <el-radio v-model="radio" label="1001">普通会员</el-radio>
        <el-radio v-model="radio" label="1002">认证会员(带V身份标识）</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="identityDia = false" class="light_btn">取 消</el-button>
        <el-button type="primary" @click="changeIdentity" class="light_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBaceUrl } from '@/utils/auth'
export default {
  data() {
      return {
        radio:'',
        powerDia:false,
        identityDia:false,
        checkOp:[],
        checkList: [],
        idDetail:'',
        num1:0,num2:0,num3:0,num4:0,num5:0,num6:0,num7:0,num8:0,
        flag1:true,
        flag2:true,
        flag3:true,
        flag4:true,
        data1:{
          nickName:'',sex:'',userId:'',cityId:'',phone:'',birthday:'',idCard:'',
          userDesc:'',createTime:'',loginTime:'',mobileModel:'',fullUrl:''
        },
        data3:{mobileOs:''},
        activeName: 'first',
        tableData: [],
        thirdAccount:[],
        baceUrl:''
      };
    },
    created(){
      this.baceUrl = getBaceUrl();
      this.getParams();
      this.baseInfo();
    },
    methods: {
      //基本信息
      baseInfo(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('/members/getBaseInfo',params).then(res => {
          // console.log(res.data);
          if(res.data){
            this.data1 = res.data[0];
            this.radio = this.data1.rankCode;
            // console.log(this.data1.rankCode)
            if(this.data1.sex=='2'){
              this.data1.sex1='女'
            }else if(this.data1.sex==1){
              this.data1.sex1='男'
            }else{
              this.data1.sex1='未设置'
            }
            if(this.data1.identityCode=='100002'){
              this.data1.identityTrans='内部小号'
            }else if(this.data1.identityCode=='100003'){
              this.data1.identityTrans='内部大号'
            }else if(this.data1.identityCode=='100001'){
              if(this.data1.rankCode=='1001'){
                this.data1.identityTrans='普通会员';
              }else{
                this.data1.identityTrans='认证会员';
              }
            }

            // this.data1.fullUrl = this.baceUrl + res.data[0].headImg
          }
          // console.log(this.data1)
        })
      },
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.idDetail = routerParams
        // console.log(this.$route.params)
      },
      //设置身份
      setIdentity(){
        this.identityDia = true;
        // console.log(this.radio)
      },
      // 设置权限
      setPower(){
        this.powerDia = true;
        // this.userId =  row.userId;
        this.$post('members/prohibit/findList',{tokenId:this.$store.state.user.tokenId,status:'1'}).then(res => {
          // console.log(res.data)
          this.checkOp = res.data;
          var params = {
            tokenId:this.$store.state.user.tokenId,
            userId: this.idDetail
          }
          this.$post('members/getPermissions',params).then(res => {
            // console.log(res);
            if(res.data[0]){
              this.checkList= (res.data[0].prohibitCodes).split(','); // "100003,100005"
            }
          });
        })
      },
      // 确定更改身份
      changeIdentity(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          rankCode:this.radio,
          userId:this.idDetail,
        };
        this.$post('/members/updateLevel',params).then(res => {
          if(res.code == 0){
            this.identityDia = false;
            this.userId='';
            this.baseInfo();
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
      },
      // 确认设置权限
      changePower(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          prohibitCodes: this.checkList.join(','),
          userId:this.idDetail
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
      handleClick(tab, event) {
        console.log(tab);
        if(tab.name == 'second' && this.flag1){
          this.userData();
        }else if(tab.name == 'third' && this.flag2){
          this.UserProhibit();
        }else if(tab.name == 'fourth' && this.flag3){
          this.otherInfo();
        }else if(tab.name == 'fifth' && this.flag4){
          this.getThird();
        }
      },
      // 用户数据
      userData(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('members/getUserData',params).then(res => {
          // console.log(res.data);
          (res.data).map(item => {
            if(item.title == 'news'){
              this.num1= item.num
            }else if(item.title == 'industry'){
              this.num2= item.num
            }else if(item.title == 'comment'){
              this.num3= item.num
            }else if(item.title == 'fans'){
              this.num4= item.num
            }else if(item.title == 'attentions'){
              this.num5= item.num
            }else if(item.title == 'goods'){
              this.num6= item.num
            }else if(item.title == 'follows'){
              this.num7= item.num
            }else if(item.title == 'wonGoods'){
               this.num8 = item.num
            }
          })
          this.flag1 = false;
          // console.log(this.data1)
        })
      },
      // 用户权限
      UserProhibit(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('/members/getUserProhibit',params).then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.flag2 = false;
        })
      },
      //getThird
      getThird(){
        console.log('关联账号')
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('/members/getUserThird',params).then(res => {
          console.log(res.data);
          this.thirdAccount=res.data;
          // this.tableData = res.data;
          this.flag4 = false;
        })
      },
      //其他信息
      otherInfo(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('/members/getUserOtherInfo',params).then(res => {
          if(res.data[0]){
             console.log(res.data);
          var d = res.data
          this.data3 = d[0];
          // console.log(11111,this.data3)
          this.flag3 = false;
          }else{
            
          }
         
        })
      },
      miniTable(row){
        return 'miniTable'
      }
    }
}
</script>
<style>
.member_info .el-tabs__item{
  color: #333;
  font-weight: normal;
  font-size: 16px;
}
.member_info .el-tabs__item:hover{
  color: #3658A7;
}
.member_info .el-tabs__item.is-active{
  color: #3658A7;
}
.member_info .info_title{
  font-size: 16px;
  color: #333;
  border-left: 4px solid #3658A7;
  padding-left: 6px;
  margin-bottom: 20px;
}
.info_table .el-table__body,
.info_table .el-table--border td,
.info_table .el-table td{
  border-color:#EAEAEA;
}
.member_info .info_table .el-table td{
  padding: 6px 0;
  background: #F3F3F3;
}
.info_table .el-table .cell{
  color:#333;
}
.member_info .el-checkbox {
  width: 50%;
  text-align: left;
}
.member_info .el-checkbox+.el-checkbox{
    margin-left:0; 
  }
</style>
