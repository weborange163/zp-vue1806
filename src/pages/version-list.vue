<template>
	<div class="version-list">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-bottom: 8px;margin-left: 22px;">
			<el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
			<el-breadcrumb-item>版本管理</el-breadcrumb-item>
			<el-breadcrumb-item>应用详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-left: 22px;margin-right: 22px;margin-bottom: 20px;overflow: hidden;background:rgba(255,255,255,1);border-radius:4px;box-shadow:0px 0px 0px rgba(54,88,167,0.07);">
			<div style="margin-top: 20px;margin-right: 88px; text-align: right;">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn">上传插件</el-button>
				<el-button size="small" class="light_btn">编辑应用</el-button>
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
								<div class="cell">应用包名</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">版本号</div>
							</td>
							<td>
								<div class="cell">上海市普陀区金沙江路 1518 弄</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">下载地址</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">code版本</div>
							</td>
							<td>
								<div class="cell">上海市普陀区金沙江路 1518 弄</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">MD5</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">应用大小</div>
							</td>
							<td>
								<div class="cell">上海市普陀区金沙江路 1518 弄</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">升级模式</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">应用平台</div>
							</td>
							<td>
								<div class="cell">上海市普陀区金沙江路 1518 弄</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">状态</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td rowspan="2">
								<div class="cell">版本提示</div>
							</td>
							<td rowspan="2">
								<div class="cell">上海市普陀区金沙江路 1518 弄</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">延时生效</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">11111</div>
							</td>
							<td>
								<div class="cell">1111112</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">创建时间</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">修改时间</div>
							</td>
							<td>
								<div class="cell">22222</div>
							</td>
						</tr>
						<tr class="el-table__row">
							<td>
								<div class="cell">更新时间</div>
							</td>
							<td>
								<div class="cell">王小虎</div>
							</td>
							<td>
								<div class="cell">操作人</div>
							</td>
							<td>
								<div class="cell">33333</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="title-p">插件信息</p>
			<el-table :data="versionData" :row-class-name="btnTable" :header-row-class-name="btnTable" border >
				<el-table-column prop="version" label="版本号"></el-table-column>
				<el-table-column prop="palt" label="插件名称"></el-table-column>
				<el-table-column prop="size" label="下载地址"></el-table-column>
				<el-table-column prop="pageName" label="应用大小"></el-table-column>
				<el-table-column prop="editTime" label="修改时间"></el-table-column>
				<el-table-column prop="static" label="状态"></el-table-column>
				<el-table-column label="操作" width="300" fixed="right">
					<template slot-scope="scope">
						<router-link :to="{name:'version-details'}">
							<el-button type="text">查看</el-button>
						</router-link>
						<el-button type="text">发布</el-button>

						<router-link :to="{name:'version-list'}">
							<el-button type="text">下线</el-button>
						</router-link>
						<el-button type="text"><i class="iconfont icon-edit"></i></el-button>
						<el-button type="text"><i class="iconfont icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div style="margin-top:20px;">
				<el-pagination class="text-center" background @current-change="handleCurrentChange" :current-page="currentPage_bidding" :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="prev, pager, next" :total="this.total_pages * this.per_page">
				</el-pagination>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				multipleSelection: [],
				newArticle: [{
					num: 1,
					title: 'test7mkaiemlaoapuemske93osksks',
					author: 'web'
				}],
				activeTab: 'first',
				recommendRadio: 1,
				dialogVisible: false,
				dialogVisible1: false,
				per_page: 10,
				total_pages: 100,
				currentPage_bidding: 7, // 页面默认展示的当前页码
				versionData: [{
						num: 1,
						version: 1.01,
						palt: 'ios',
						size: '10m',
						pageName: '包名一堆数字',
						editTime: '2018-01-01',
						status: '已上线',
						static: '已下线'
					},
					{
						num: 1,
						version: 1.01,
						palt: 'ios',
						size: '10m',
						pageName: '包名一堆数字',
						editTime: '2018-01-01',
						status: '已上线',
						static: '已下线'
					},
					{
						num: 1,
						version: 1.01,
						palt: 'ios',
						size: '10m',
						pageName: '包名一堆数字',
						editTime: '2018-01-01',
						status: '已上线',
						static: '已下线'
					},
					{
						num: 1,
						version: 1.01,
						palt: 'ios',
						size: '10m',
						pageName: '包名一堆数字',
						editTime: '2018-01-01',
						status: '已上线',
						static: '已下线'
					},
					{
						num: 1,
						version: 1.01,
						palt: 'ios',
						size: '10m',
						pageName: '包名一堆数字',
						editTime: '2018-01-01',
						status: '已上线',
						static: '已下线'
					}
				],
				content: '111',
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				form: {
					title: '',
					content: '',
					column: '新闻资讯',
					resource: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					author: '',
					img: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			miniTable(row){
      return 'miniTable'
    },
    btnTable(row){
    	return 'btnTable'
    },
			test() {
				console.log(this.form.resource);
			},
			onEditorBlur(quill) {
				console.log('editor blur!', quill)
				console.log(this.content)
			},
			onEditorFocus(quill) {
				console.log('editor focus!', quill)
			},
			onEditorReady(quill) {
				console.log('editor ready!', quill)
			},
			onEditorChange({
				quill,
				html,
				text
			}) {
				console.log('editor change!', quill, html, text)
				this.content = html
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			 handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
		}
	}
</script>
<style type="text/css">
	.up_form .el-input__inner {
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	
	.up_form .quill-editor .ql-container {
		min-height: 550px;
	}
	
	.version-list .title-p {
		border-left: 4px solid rgba(54, 88, 167, 1);
		padding-left: 18px;
		line-height: 24px;
		font-size: 16px;
		font-family: MicrosoftYaHei;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 18px;
		margin-top: 16px;
	}
	
	.info_table .el-table__body,
	.info_table .el-table--border td,
	.info_table .el-table td {
		border-color: #EAEAEA;
	}
	
	.info_table .el-table td {
		padding: 6px 0;
		background: #F3F3F3;
	}
	
	.info_table .el-table .cell {
		color: #333;
	}
	
	.version-list .el-table td,
	.el-table th {
		padding: 4px 0px;
	}
</style>