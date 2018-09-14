<template>
	<div class="version-details">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-bottom: 8px;margin-left: 22px;">
			<el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
			<el-breadcrumb-item>版本管理</el-breadcrumb-item>
			<el-breadcrumb-item>应用详情</el-breadcrumb-item>
			<el-breadcrumb-item>插件详情</el-breadcrumb-item>
		</el-breadcrumb>
	
		<div style="margin-left: 22px;margin-right: 22px;margin-bottom: 20px;overflow: hidden;background:rgba(255,255,255,1);border-radius:4px;box-shadow:0px 0px 0px rgba(54,88,167,0.07);">
						<div style="margin-top: 20px;margin-right: 88px; text-align: right;">
              <router-link :to="{name:'version-list',params:{id:plug.appId}}">
                <el-button size="small" class="light_btn router_btn">返回</el-button>
              </router-link>
				    	<!-- <el-button size="small" @click="routeChange" class="light_btn">返回</el-button> -->
				    	<!-- <el-button size="small" class="light_btn">编辑插件</el-button> -->
				    </div>
				    	<p class="title-p">应用信息</p>
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
							<td>
								<div class="cell">插件名称</div>
							</td>
							<td>
								<div class="cell">{{plug.pluginName}}</div>
							</td>
							<td>
								<div class="cell">版本号</div>
							</td>
							<td>
								<div class="cell">{{plug.versionName}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">下载地址</div>
							</td>
							<td>
								<div class="cell">{{plug.downloadUrl}}</div>
							</td>
							<td>
								<div class="cell">code版本</div>
							</td>
							<td>
								<div class="cell">{{plug.versionCode}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">MD5</div>
							</td>
							<td>
								<div class="cell">{{plug.fileMdFive}}</div>
							</td>
							<td>
								<div class="cell">插件大小</div>
							</td>
							<td>
								<div class="cell">{{plug.fileSize}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">升级模式</div>
							</td>
							<td>
								<div class="cell" v-if="plug.upgradeMode == 0">可选升级</div>
                <div class="cell" v-else>强制升级</div>
							</td>
							<td>
								<div class="cell">所属应用包</div>
							</td>
							<td>
								<div class="cell">{{plug.appId}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">状态</div>
							</td>
							<td>
								<div class="cell" v-if="plug.status == '1'">新建</div>
                <div class="cell" v-if="plug.status == '2'">已上线</div>
                <div class="cell" v-if="plug.status == '3'">已下线</div>
							</td>
							<td rowspan="2">
								<div class="cell">版本提示</div>
							</td>
							<td rowspan="2">
								<div class="cell">{{plug.upgradeContent}}</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">延时生效</div>
							</td>
							<td>
								<div class="cell">{{plug.delayTime}}</div>
							</td>
							<!-- <td>
								<div class="cell">11111</div>
							</td>
							<td>
								<div class="cell">1111112</div>
							</td> -->
						</tr>
							<tr class="el-table__row">
							<td>
								<div class="cell">创建时间</div>
							</td>
							<td>
								<div class="cell">{{plug.createTime}}</div>
							</td>
							<td>
								<div class="cell">修改时间</div>
							</td>
							<td>
								<div class="cell">{{plug.updateTime}}</div>
							</td>
						</tr>
							<tr class="el-table__row">
							<td>
								<div class="cell">更新时间</div>
							</td>
							<td>
								<div class="cell">{{plug.onlineTime}}</div>
							</td>
							<td>
								<div class="cell">操作人</div>
							</td>
							<td>
								<div class="cell">{{plug.updateUserId}}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
				    
		</div>

	</div>
</template>
<script>
	export default{
		data(){
			return{
        idDetail:'',
				content:'111',
				editorOption:{},
				dialogImageUrl: '',
        dialogVisible: false,
				form: {
					title: '',
					content:'',
					column:'新闻资讯',
          resource: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
					desc: '',
					author:'',
					img:''
        },
        plug:{},
				rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
			}
    },
    created() {
      this.getParams();
      this.getInfo();
    },
		methods:{
			getInfo(){
				var params = {
          tokenId: this.$store.state.user.tokenId,
          id:this.idDetail
        }
        this.$post('pluginUpgrade/get',params).then(res => {
          console.log(res)
          this.plug = res.data[0].appUpgrade;
          console.log(this.plug)
        });
			},
      getParams () {
        // 取到路由带过来的参数 
				let routerParams = this.$route.params.id;
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams
				this.idDetail = routerParams;
				console.log(this.$route.params)
      },
      routeChange(){
        console.log(this.idDetail)
        this.$router.push({
            name:'version-list',
           /*  params:{
              id:this.idDetail
            } */
          }); 
      }
		}
	}
</script>
<style type="text/css">
	
	.up_form .el-input__inner{
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	.up_form .quill-editor .ql-container{
		min-height: 550px;
	}
.version-details .info_table .el-table__body,
	.info_table .el-table--border td,
	.info_table .el-table td {
		border-color: #EAEAEA;
		margin-top: 20px;
	}
	
	.el-table td {
		padding: 6px 0;
		/*background: #F3F3F3;*/
	}
	
	.info_table .el-table .cell {
		color: #333;
	}
	.version-details .title-p {
		border-left: 4px solid rgba(54, 88, 167, 1);
		padding-left: 18px;
		line-height: 24px;
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		margin-top: 6px;
  }
  .version-details td .cell{
    overflow: auto;
    white-space: normal;
  }
</style>