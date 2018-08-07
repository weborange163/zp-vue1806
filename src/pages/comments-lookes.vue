<template>
  <div class="page-body comments_lookes">
    <div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>评论管理</el-breadcrumb-item>
				<el-breadcrumb-item>评论详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
    <div class="box">
      <div class="el-table__body-wrapper is-scrolling-none info_table">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
          <colgroup>
            <col name="el-table_1_column_1" width="25%">
            <col name="el-table_1_column_2" width="75%">
          </colgroup>
          <tbody>
            <tr class="el-table__row">
              <td><div class="cell">评论对象</div></td>
              <td><div class="cell">王小虎</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">评论ID</div></td>
              <td><div class="cell">123</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">评论内容</div></td>
              <td><div class="cell">666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶666,顶顶顶</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">评论人</div></td>
              <td><div class="cell">王大虎</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">会员ID</div></td>
              <td><div class="cell">111</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">评论时间</div></td>
              <td><div class="cell">2018-10-09</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">状态</div></td>
              <td><div class="cell">正常</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">审核人</div></td>
              <td><div class="cell">王虎</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">审核时间</div></td>
              <td><div class="cell">2018-10-09</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
   data(){
     return{
       btnTable:btnTable,
       tableData:[]
     }
   } 
}
</script>
<style>
.comments_lookes .cell{
  white-space:normal;
}
</style>

