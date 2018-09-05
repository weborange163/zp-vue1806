<template>
	<div class="page-body" style="min-width:980px;">
		<el-dialog title="审核页面" center :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" label-width="80px" :rules="rules">
				<el-form-item label="审核原因" prop="region">
					<el-select size="mini" v-model="form.region" placeholder="请选择不通过的原因" style="width:100%"  @change="selectChange">
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
            <el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off" :disabled="qita"
          placeholder="审核原因选择其他,可以填写审核信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudit()" >确 定</el-button>
			</div>
		</el-dialog>
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>行业信息</el-breadcrumb-item>
				<el-breadcrumb-item>审核文章</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="box">
			<div class="text-right">
				<el-button size="small" @click="$router.back()" class="light_btn">返回</el-button>
				<!--<el-button size="small" class="light_btn">预览</el-button>-->
				 <!--@click="toAudit()"-->
				<el-button size="small" class="light_btn" @click="dialogFormVisible = true">不通过</el-button>
				<el-button size="small" class="light_btn" @click="toAudit1()">通过</el-button>
			</div>
			<el-form ref="form2" :model="form2" label-width="84px" class="up_form">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title" required>
						<el-input :disabled="true" type="textarea" autosize v-model="form2.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor" required>
						<div id="content" class="ql-editor" v-html="form2.content" style="min-width:400px;"></div>
					</el-form-item>
						
				</div>
				<div style="width: 35%;float:left;padding:15px;min-width:420px;">
					<el-form-item label="发布到:" required>
						<el-input :disabled="true" v-model="classifyTypes"></el-input>
					</el-form-item>
					<el-form-item label="所属分类:" prop="userId" required>
					<el-select v-model="value" name="classifyType" placeholder="请选择"  style='padding-left: 6px;' :disabled="true">
						<el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					</el-form-item>
					<el-form-item label="发布账号:" v-if="form2.publishSource!='3'" prop="userId" required>
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
              <col name="el-table_1_column_1" style="width:90px;">
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
        qita:true,
        imgFullSrc:'',
				baceUrl: '',
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				classifyTypes: '行情',
        classifyType: '',
        accounts:[],
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
					img: ''
        },
        imgSrc:'',
				uploadData: {},
				value: '',
        datas: '',
        rules:{
          region:[
            {required:true}
          ]
        },
				//弹框
				dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '您发布的内容排版、错字过于混乱',
        },
        formLabelWidth: '120px',
			};
		},
		created() {
			this.baceUrl = getBaceUrl();
			// console.log(this.baceUrl)

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
        this.form2 = res.data[0].industry;
        // console.log(this.form2)
        this.status = this.form2.status;
        this.classifyType = this.form2.classifyType
        this.imgSrc = this.form2.showUrl;
				this.imgFullSrc = this.baceUrl + this.imgSrc
        let selectid = this.classifyType;
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
			})
			
		},
		methods: {
			//通过
			toAudit1() {
				var params = {
					id: this.$route.params.id,
					tokenId: this.$store.state.user.tokenId,
					status: '5',
				};
				this.$post('industry/save', params).then(res => {
					if(res.code === 0) {
						console.log(1111111, res);
					}
				});
				setTimeout(() => {
						this.$router.push({name: 'audit-market'});
						}, 1000);
//				return true;
			},
      selectChange(val){
        // console.log(val);
        if(val == '其他'){
          this.qita = false;
        }else{
          this.qita = true;
          this.form.name='';
        }
      },
			//不通过
			toAudit() {
				this.dialogFormVisible = false
				var params = {
					id: this.$route.params.id,
					tokenId: this.$store.state.user.tokenId,
					status: '4',
					checkCause:this.form.region,
         	checkMessage:this.form.name
				};
				this.$post('industry/save', params).then(res => {
					if(res.code == 0) {
						// console.log(1111111, res);
						 this.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(() => {
						this.$router.push({name: 'audit-market'});
						}, 1000);
					}else{
            this.$message({
              message: res.msg?res.msg:'失败',
              type: 'error'
            });
          }
					
				});


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
	/*.app-container .app-page-body{
		min-height: 890px !important;
	}*/
		.quill-editor .ql-toolbar.ql-snow{
		height: 60px;
	}
	.editor .el-form-item__content {
		line-height: 20px;
	}
	
	.up_form .el-input__inner{
		height: 30px;
		line-height: 30px;
		max-width: 300px;
	}
	.up_form .quill-editor .ql-container{
		min-height: 550px;
		overflow-y: auto;
	}
</style>