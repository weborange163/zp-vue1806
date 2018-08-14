<template>
  <div class="page-body member_info">
    <div class="page-header">
      <div class="text-right">
        <el-button size="mini" class="light_btn" @click="$router.back()">返回</el-button>
        <el-button size="small" class="light_btn">身份设置</el-button>
        <el-button size="small" class="light_btn">权限设置</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div>
            <p class="info_title">基本信息</p>
            <el-row>
              <el-col :span="4">
                <div class="avatar" style="background:#bfa;height:217px;">
                  <img src="../assets/img/log-user.png">
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
                        <td><div class="cell">{{data1.sex}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">用户ID</div></td>
                        <td><div class="cell">{{data1.userId}}</div></td>
                        <td><div class="cell">城市</div></td>
                        <td><div class="cell">{{data1.cityId}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">手机号</div></td>
                        <td><div class="cell">{{data1.phone}}</div></td>
                        <td><div class="cell">生日</div></td>
                        <td><div class="cell">{{data1.birthday}}</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">身份证</div></td>
                        <td><div class="cell">{{data1.idCard}}</div></td>
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
                    <td><div class="cell">点赞</div></td>
                    <td><div class="cell">{{num6}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布评论</div></td>
                    <td><div class="cell">{{num3}}</div></td>
                    <td><div class="cell">跟踪</div></td>
                    <td><div class="cell">{{num7}}</div></td>
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
    
  </div>
</template>
<script>
export default {
  data() {
      return {
        idDetail:'',
        num1:0,num2:0,num3:0,num4:0,num5:0,num6:0,num7:0,
        flag1:true,
        flag2:true,
        flag3:true,
        data1:{
          nickName:'',sex:'',userId:'',cityId:'',phone:'',birthday:'',idCard:'',
          userDesc:'',createTime:'',loginTime:'',mobileModel:''
        },
        data3:{},
        activeName: 'first',
        tableData: []
      };
    },
    created(){
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
        this.$post('members/getBaseInfo',params).then(res => {
          // console.log(res.data);
          this.data1 = res.data[0];
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
      handleClick(tab, event) {
        if(tab.index == '1' && this.flag1){
          this.userData();
        }else if(tab.index == '2' && this.flag2){
          this.UserProhibit();
        }else if(tab.index == '3' && this.flag3){
          this.otherInfo();
        }
      },
      // 用户数据
      userData(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('members/getUserDate',params).then(res => {
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
        this.$post('members/getUserProhibit',params).then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.flag2 = false;
        })
      },
      //其他信息
      otherInfo(){
        var params = {
          tokenId:this.$store.state.user.tokenId,
          userId:this.idDetail
        }
        this.$post('members/getUserOtherInfo',params).then(res => {
          // console.log(res.data);
          var d = res.data
          this.data3 = d[0];
          // console.log(11111,this.data3)
          this.flag3 = false;
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
</style>
