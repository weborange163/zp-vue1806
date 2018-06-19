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
                        <td><div class="cell">王小虎</div></td>
                        <td><div class="cell">性别</div></td>
                        <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">用户ID</div></td>
                        <td><div class="cell">王小虎</div></td>
                        <td><div class="cell">城市</div></td>
                        <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">手机号</div></td>
                        <td><div class="cell">王小虎</div></td>
                        <td><div class="cell">生日</div></td>
                        <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">身份证</div></td>
                        <td><div class="cell">王小虎</div></td>
                        <td><div class="cell">简介</div></td>
                        <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">注册时间</div></td>
                        <td><div class="cell">王小虎</div></td>
                        <td><div class="cell">最后登录时间</div></td>
                        <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                      </tr>
                      <tr class="el-table__row">
                        <td><div class="cell">登录设备</div></td>
                        <td><div class="cell">王小虎</div></td>
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
                    <td><div class="cell">王小虎</div></td>
                    <td><div class="cell">粉丝</div></td>
                    <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布行情</div></td>
                    <td><div class="cell">王小虎</div></td>
                    <td><div class="cell">关注</div></td>
                    <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布广播</div></td>
                    <td><div class="cell">王小虎</div></td>
                    <td><div class="cell">点赞</div></td>
                    <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发布评论</div></td>
                    <td><div class="cell">王小虎</div></td>
                    <td><div class="cell">跟踪</div></td>
                    <td><div class="cell">上海市普陀区金沙江路 1518 弄</div></td>
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
                prop="date"
                label="权限"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="状态"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="原因">
              </el-table-column>
              
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="fourth">
          <div>
            <p class="info_title">其他信息</p>
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
        activeName: 'first',
         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
.info_table .el-table td{
  padding: 6px 0;
  background: #F3F3F3;
}
.info_table .el-table .cell{
  color:#333;
}
</style>
