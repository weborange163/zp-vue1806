<template>
  <div class="page-body member">
    <div class="page-header clearfix">
      <el-row >
        <el-col :span='10'>
          <el-row :gutter="6" style="margin-bottom:8px;">
            <el-col :span='7'>
              <el-select v-model="value" placeholder="请选择" @change="tofilter">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span='7'>
              <el-date-picker type="date" placeholder="选择日期" v-model="value1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span='7'>
              <el-date-picker type="date" placeholder="选择日期" v-model="value2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="6">
            <el-col :span='7'>
              <el-select v-model="value3" placeholder="请选择" @change="tofilter">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span='7'>
              <el-date-picker type="date" placeholder="选择日期" v-model="value4" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span='7'>
              <el-date-picker type="date" placeholder="选择日期" v-model="value5" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span='10' :offset="4" style="margin-top:26px;">
          <el-row :gutter="6" type="flex" justify="end">
            <el-col :span='14'>
              <el-input v-model="value6" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span='3'>
              <el-button class="light_btn">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </div>
    <div class="member_table">
      <div class="text-right">
        <el-button class="light_btn">创建小号</el-button>
        <el-button class="light_btn">刷新</el-button>
      </div>
      <el-table :row-class-name="miniTable" :header-row-class-name="miniTable"
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="{name:'member-info'}"><el-button
              size="mini"
              @click="handleInfo(scope.$index, scope.row)">详情</el-button></router-link>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
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
        }],
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '注册时间'
        }, {
          value: '选项3',
          label: '最后登录时间'
        }],
        value: '',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:''
      };
    },
    methods: {
      tofilter(val){
        console.log(val);
        console.log(this.value);
      },
      handleInfo(index, row) {
        console.log(index, row);

      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      miniTable(row){
        return 'miniTable'
      }
    }
}
</script>
<style>
  .member .el-input__inner{
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color:#999;
    border-radius: 0;
  }
  .member .member_table{
    padding: 15px;
  }
  .member .el-input__icon{
    line-height: 26px;
  }
</style>
