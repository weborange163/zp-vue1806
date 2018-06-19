<template>
    <div class="page-body feedback">
      <div class="page-header">
        <el-input v-model="role_nik" placeholder="请输入角色名称" style="width:200px;"></el-input>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button class="light_btn">搜索</el-button>
      </div>
      <div class="box">
          角色权限列表在此
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      role_nik:'',
      value:'',
      options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '已启用'
        }, {
          value: '选项3',
          label: '已禁用'
        }]
    }
  }
}
</script>
<style>

</style>

