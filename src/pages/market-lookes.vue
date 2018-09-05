<template>
	<div class="page-body" style="min-width:980px;">
		<el-dialog  center width="375px"  :visible.sync="bannerDialog" append-to-body >
			<el-form id='div1'  :data="form2"  ref="form2" label-width="110px" class="form2">
				<p id="p1" >{{form2.title }}</p>
				<p id="p2"  v-html="form2.content"></p>
			</el-form>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>行业信息</el-breadcrumb-item>
				<el-breadcrumb-item>查看行情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box">
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="bannerDialog = true;">预览</el-button>
				<el-button size="small" class="light_btn" type="text" v-if="status=='6'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="onOff('5','上线')">上线</el-button>
				<el-button size="small" class="light_btn" type="text" v-if="status=='5'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="onOff('6','下线')">下线</el-button>
				<el-button size="small" class="light_btn" type="text" v-if="status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="toAudit()">提交审核</el-button>
			</div>
			<el-form ref="form2" :model="form2" label-width="84px" class="up_form">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" required>
						<el-input type="textarea" autosize :disabled="true" v-model="form2.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor" required>
						<div id="content" class="ql-editor" v-html="form2.content"></div>
					</el-form-item>
						
				</div>
				<div style="width: 35%;float:left;padding:15px; min-width:420px;">
					<el-form-item label="发布到:" required>
						<el-input :disabled="true" v-model="classifyTypes"></el-input>
					</el-form-item>
					<el-form-item label="所属分类:" prop="userId" required>
					<el-select v-model="value" name="classifyType" placeholder="请选择"  style='padding-left: 6px;' :disabled="true">
						<el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					</el-form-item>
					<el-form-item label="发布账号:" prop="userId" required v-if="form2.publishSource!='3'">
						<el-select v-model="form2.userId" placeholder="请选择发布账号" :disabled="true">
						<el-option 
              v-for="item in accounts"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
            ></el-option>
						</el-select>
					</el-form-item>
          <el-form-item v-else label="发布账号:" required>
            <el-input size="mini" disabled v-model="form2.createUser"></el-input>
          </el-form-item>
					<el-form-item label="附加选项:" prop="imgType" required>
						<el-radio-group v-model="form2.imgType" :disabled="true">
							<el-radio label="1">上传缩略图</el-radio>
							<el-radio label="2">提取第一个图为缩略图</el-radio>
						</el-radio-group>
					</el-form-item>
					<!--上传图片-->
					<el-form-item label="封面图" v-if="form2.imgType=='1'">
						<img class="wh80" :src="imgFullSrc" alt="封面图展示" >
					</el-form-item>
					<el-form-item label="Tag标签:" >
						<el-input placeholder="用逗号隔开，单个标签少于12字节" v-model="form2.tagLabel" :disabled="true"></el-input>
					</el-form-item>
					<!--<el-form-item label="关键词:">
            <el-input placeholder="用英文 “ , ” 隔开"></el-input>
          </el-form-item>-->
          <div class="tableOverstyle">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border">
            <colgroup>
              <col name="el-table_1_column_1" width="25%">
              <col name="el-table_1_column_2" width="75%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell">发布来源</div></td>
                <td><div class="cell">
                  <span v-if="form2.publishSource == '1'">PC后台</span><span v-if="form2.publishSource == '2'">数据爬取</span><span v-if="form2.publishSource == '3'">APP端</span>
                  </div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">文章ID</div></td>
                <td><div class="cell">{{form2.articleId}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td><div class="cell">
                  <span v-if="form2.status == '1'">新建</span><span v-if="form2.status == '2'">待审核</span><span v-if="form2.status == '4'">审核不通过</span>
                  <span v-if="form2.status == '5'">已上线</span><span v-if="form2.status == '6'">已下线</span>
                  </div></td>
              </tr>
            </tbody>
          </table>
          <table cellspacing="0" cellpadding="0" border="0" class="el-table el-table__body el-table--border marT20">
            <colgroup>
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_1" >
              <col name="el-table_1_column_2" >
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td><div class="cell"></div></td>
                <td><div class="cell">时间</div></td>
                <td><div class="cell">操作账号</div></td>
                <td><div class="cell">备注</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">创建时间</div></td>
                <td><div class="cell">{{form2.createTime}}</div></td>
                <td><div class="cell">{{form2.createUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">上线时间</div></td>
                <td><div class="cell">{{form2.onlineTime}}</div></td>
                <td><div class="cell">{{form2.onlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">下线时间</div></td>
                <td><div class="cell">{{form2.offlineTime}}</div></td>
                <td><div class="cell">{{form2.offlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">修改时间</div></td>
                <td><div class="cell">{{form2.updateTime}}</div></td>
                <td><div class="cell">{{form2.updateUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">审核时间</div></td>
                <td><div class="cell">{{form2.checkTime}}</div></td>
                <td><div class="cell">{{form2.checkPerson}}</div></td>
                <td><div class="cell">{{form2.checkMessage}}</div></td>
              </tr>
            </tbody>
          </table>
          </div>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
import { getBaceUrl } from '@/utils/auth'
	export default {
		data() {
			return {
        accounts:[],
				quill: {
					width: 420,
					border: true,
					height: 150,
//					overflow-y:auto,
					content: 'wellcome ~',
					syncOutput: true,
					theme: 'snow', //bubble snow
					disabled: false,
					full: false,
					toolbar: [
						[{
							'header': 1
						}, {
							'header': 2
						}],
						['bold', 'italic', 'underline', 'strike', 'link']
					]
				},
				classifyTypes: '行情',
				status: '',
				form2: {
					title: '',
					content: '',
					userId: '1',
					imgType: '1',
					tagLabel: '',
					resource: '',
					source: '',
					type: [],
					desc: '',
					author: '',
					img: '',
					//未置顶
					topFlag: '0',
					//排序
					orderNum: '0'
				},
				bannerDialog: false,
				bannerForm: [],
				baceUrl: '',
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				classifyType: '',
				uploadData: {},
				value: '',
				imgFullSrc: '',
				imgSrc: '',
			};
		},
		created() {
			this.baceUrl = getBaceUrl();
		},
		mounted() {
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        console.log(res)
        this.accounts = res.data;
      })
			//  	修改查看
			this.$get('/industry/get', {
				tokenId: this.$store.state.user.tokenId,
				id: this.$route.params.id
			}).then(res => {
				this.form2 = res.data[0].industry
//				alert(this.form2.content)
				this.imgSrc = this.form2.showUrl
				this.status = this.form2.status;
				this.classifyType = this.form2.classifyType
				this.imgFullSrc = this.baceUrl + this.imgSrc
				let selectid = this.classifyType;
				//				alert(selectid)
				//  	下拉菜单
				this.$get('/industryCategory/findIndustryCategoryList', {
					tokenId: this.$store.state.user.tokenId
				}).then(res => {
					console.log(res.data)
					this.classifyType = res.data
					for(var i = 0; i < this.classifyType.length; i++) {
						if(selectid == this.classifyType[i].id) {
							this.value = this.classifyType[i].name
						}
					}
				})
      });
      var content =  document.getElementById('content');
			content.innerHTML=this.form2.content;

		},
		created() {
			this.baceUrl = getBaceUrl();
		},
		methods: {
			onOff(num,text){
        this.$confirm(`确定要${text}该新闻吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						status:num,
						id:this.form2.id
					}
					this.$post('industry/onAndOffLine',params).then(res => {
						console.log(res)
						setTimeout(() => {
								this.$router.push({name: 'market'});
							}, 1000);
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: res.msg
          });          
        });
      },
			//获取封面图路径
			getImgUrl() {
				this.imgFullSrc = this.baceUrl + this.imgSrc;
				console.log(this.imgSrc)
				console.log(this.imgFullSrc)
			},
			fileOver() {
				this.$message('只允许添加一张图片,如果替换请删除后再上传');
			},
			//提交审核
			toAudit() {
				this.$confirm('确定要提交审核吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: this.$route.params.id,
						status: '2'
					}
					this.$post('/industry/save', params).then(res => {
						// console.log(res)
						if(res.code == '0'){
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
              this.status='2';
            }
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '提交失败'
					});
				});
			},
			watch: {
				// 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
				'$route': 'getParams'
			},
			 
		}
	};
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
	.quill-editor .ql-toolbar.ql-snow {
		height: 60px;
	}
	
	.editor .el-form-item__content {
		line-height: 20px;
	}
	
	.up_form .el-input__inner {
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	
	.up_form .quill-editor .ql-container {
		min-height: 550px;
		overflow-y: auto;
	}
	#p1{
		text-align: center;
		font-size: 20px;
	}
	#p2{
		 margin: 0 auto; height: 500px !important;margin-top: 2px;text-indent:2em; overflow-y: auto !important;
	}
	#p2 img{
		display: block;
		margin: 0 auto;
		width: 320px !important;
		
	}
	

</style>