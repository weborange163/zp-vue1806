<template>
	<div class="page-body" style="min-width:980px;">
		<div class="breadcrumb" style="padding:8px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">内容中心</el-breadcrumb-item>
				<el-breadcrumb-item>新闻审核</el-breadcrumb-item>
				<el-breadcrumb-item>审核{{column}}资讯</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-dialog title="审核页面" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="form" label-width="80px" :rules="rules">
				<el-form-item label="审核原因" prop="region">
					<el-select size="mini" v-model="form.region" placeholder="请选择不通过的原因" style="width:100%" @change="selectChange">
						<el-option label="您发布的内容排版、错字过于混乱" value="您发布的内容排版、错字过于混乱"></el-option>
						<el-option label="您发布的内容涉嫌敏感内容" value="您发布的内容涉嫌敏感内容"></el-option>
						<el-option label="您发布的内容无具体信息，或信息无意义" value="您发布的内容无具体信息，或信息无意义"></el-option>
						<el-option label="您发布的内容不符合栏目属性" value="您发布的内容不符合栏目属性"></el-option>
            <el-option label="其它" value="其它"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核信息">
					<el-input size="mini" type="textarea" v-model="form.name" auto-complete="off" :disabled="qita"
          placeholder="审核原因选择其它,可以填写审核信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="toAudit('3')">确 定</el-button>
			</div>
		</el-dialog>

		<div class="box">
			<div class="text-right">
				<el-button size="small" @click="fanhui" class="light_btn">返回</el-button>
				<el-button size="small" class="light_btn" @click="dialogFormVisible = true">不通过</el-button>
				<el-button size="small" class="light_btn" @click="toAudit('4')">通过</el-button>
			</div>
			<el-form ref="form1" :model="form1" label-width="84px" :rules="rules1" class="up_form clearfix">
				<div style="width: 48%;float: left;padding:15px;margin-left:2%;margin-right:5%;">
					<el-form-item label="文章标题" prop="title">
						<el-input :disabled="true" type="textarea" autosize v-model="form1.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="文章内容" prop="content" class="editor">
						<div id="content" class="ql-editor" v-html="form1.content"></div>
					</el-form-item>
				</div>
				<div style="width: 35%;float:left;padding:15px;">
					<el-form-item label="发布到:">
						<el-input :disabled="true" v-model="column"></el-input>
					</el-form-item>
					<el-form-item label="来源:" prop="sourceType">
						<el-radio-group :disabled="true" v-model="form1.sourceType" @change="test()">
							<el-radio label="1">原创</el-radio>
							<el-radio label="2">转载</el-radio>
						</el-radio-group>
						<el-select v-if="form1.sourceType == 2" :disabled="true" v-model="form1.source" placeholder="请选择来源" style="margin-left:20px;width:140px;">
							<el-option v-for="item in cities" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="作者:">
						<el-input :disabled="true" v-model="form1.author"></el-input>
					</el-form-item>
          <el-form-item label="所属分类:" prop="userId" required>
            <el-select v-model="value" name="classifyType" placeholder="暂无分类"  style='padding-left: 6px;' :disabled="true">
              <el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
					</el-form-item>
					<el-form-item label="发布账号:" v-if="form1.publishSource!='3'" prop="userId" label-width="82">
						<el-select :disabled="true" v-model="form1.userId" placeholder="请选择发布账号">
							<el-option 
                v-for="item in accounts"
                :key="item.userId"
                :label="item.nickName"
                :value="item.userId"
              ></el-option>
						</el-select>
					</el-form-item>
          <el-form-item v-else label="发布账号:" required>
            <el-input size="mini" disabled v-model="form1.createUser"></el-input>
          </el-form-item>
					<el-form-item label="附加选项:" prop="imgType" label-width="82">
						<el-radio-group :disabled="true" v-model="form1.imgType">
							<el-radio label="1">上传缩略图</el-radio>
							<el-radio label="2">提取第一个图为缩略图</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="封面图" required v-if="form1.imgType == 1">
						<img class="wh80" :src="imgSrc" alt="封面图展示">
					</el-form-item>
          <el-form-item label="视频地址:" v-if="form1.videoId">
						<a target="_blank" :href="form1.videoUrl">{{form1.videoUrl}}</a>
					</el-form-item>
          <el-form-item label="视频名称:" v-if="form1.videoId">
            <p v-text="form1.videoName"></p>
					</el-form-item>
					<el-form-item label="Tag标签:">
						<el-input :disabled="true" placeholder="用逗号隔开，单个标签少于12字节" v-model="form1.tagLabels"></el-input>
					</el-form-item>
					<!-- <el-form-item label="关键词:">
						<el-input :disabled="true" placeholder="用英文 “ , ” 隔开" v-model="form1.keyWords"></el-input>
					</el-form-item> -->
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
                  <span v-if="form1.publishSource == '1'">PC后台</span><span v-if="form1.publishSource == '2'">数据爬取</span><span v-if="form1.publishSource == '3'">APP端</span>
                  </div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">文章ID</div></td>
                <td><div class="cell">{{form1.articleId}}</div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">状态</div></td>
                <td><div class="cell">
                  <span v-if="form1.status == '0'">新建</span><span v-if="form1.status == '1'">待审核</span><span v-if="form1.status == '3'">审核中</span>
                  <span v-if="form1.status == '4'">已上线</span><span v-if="form1.status == '5'">已下线</span>
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
                <td><div class="cell">{{form1.createTime}}</div></td>
                <td><div class="cell">{{form1.createUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">上线时间</div></td>
                <td><div class="cell">{{form1.onlineTime}}</div></td>
                <td><div class="cell">{{form1.onlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">下线时间</div></td>
                <td><div class="cell">{{form1.offlineTime}}</div></td>
                <td><div class="cell">{{form1.offlineUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">修改时间</div></td>
                <td><div class="cell">{{form1.updateTime}}</div></td>
                <td><div class="cell">{{form1.updateUser}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">审核时间</div></td>
                <td><div class="cell">{{form1.checkTime}}</div></td>
                <td><div class="cell">{{form1.checkReason=='涉及敏感词'?'机审':form1.checkPerson}}</div></td>
                <td><div class="cell"><p v-if="form1.status=='3'">{{form1.checkReason=='其它'?form1.checkMessage:form1.checkReason}}</p></div></td>
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
	//import MQuillEditor from 'm-quill-editor'
	import { getBaceUrl } from '@/utils/auth'
	import axios from 'axios'
	export default {
		components: {
			//	MQuillEditor
		},
		data() {
			return {
        value:'',
        pkg: '',
        qita:true,
				quill: {
					width: 420,
					border: true,
					height: 150,
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
				uploadData: {},
				baceUrl: '',
				column: '新闻资讯',
				// content:'111',
				editorOption: {},
				dialogImageUrl: '',
				dialogVisible: false,
				form1: {
					title: '',
					content: '',
					column: '新闻资讯',
					sourceType: '1',
					source: '',
					author: '',
					userId: '1',
					imgType: '1',
					newsFile: '',
					tagLabels: '',
					keyWords: ''
        },
        rules:{
          region:[
            {required:true}
          ]
        },
				cities: [],
				idDetail:'',
				imgSrc:'',
        fileList:[],
        classifyType:'',
				//弹框
				dialogTableVisible: false,
        dialogFormVisible: false,
        accounts:'',
				form: {
					name: '',
					region: '您发布的内容排版、错字过于混乱',
				},
				formLabelWidth: '120px',
				rules1: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'change'
					}],
					sourceType: [{
						required: true,
						message: '请选择来源',
						trigger: 'change'
					}],
					userId: [{
						required: true,
						message: '请选择发布账号',
						trigger: 'change'
					}],
					imgType: [{
						required: true,
						message: '请选择图片',
						trigger: 'change'
					}],
					source: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
          }],
          argu:{}
				}
			}
		},
		created() {
			this.baceUrl = getBaceUrl();
			this.getParams();
      this.showNews();
      this.argu=this.$route.params.argu;
			// console.log(this.argu);
		},
		mounted() {
			this.$get('reprintSth/findAll', {
				tokenId: this.$store.state.user.tokenId
			}).then(res => {
				// console.log(res.data)
				this.cities = res.data
      });
      this.$post('members/findByLevel',{tokenId:this.$store.state.user.tokenId,levelCode:100002}).then(res => {
        // console.log(res)
        this.accounts = res.data;
      })
			document.getElementById('content').innerHTML=this.form1.content;
		},
		methods: {
			// 获取新闻详情
			showNews(){
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:this.idDetail
				}
				this.$get('news/show',params).then(res => {
					this.form1 = res.data[0];
          // console.log(this.form1)
          this.classifyType = this.form1.classifyType;
          if(this.form1.articleType == '1'){
            this.column='新闻'
          }else{
            this.column='行情'
          }
					this.imgSrc = this.form1.coverImgUrl;
          this.status = this.form1.status;
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
      },
      selectChange(val){
        console.log(val);
        if(val == '其它'){
          this.qita = false;
        }else{
          this.qita = true;
          this.form.name='';
        }
      },
			getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
				// this.form1 = routerParams;
				this.idDetail = routerParams;
      },
			// 富文本图片上传
			uploadImg(file, insert) {
				console.log(file)
				let params = new FormData(); // 创建form对象
				params.append('file', file, file.name);
				// params.append('name',file.name);
				console.log(file.name)

				this.$post('images/upload', params).then(res => {
					let url = this.baceUrl + res.data[0].showUrl;
					// console.log(url)
					insert(url, 'center')
					console.log(res);
				})
			},
			getFullUrl() {
				return(this.baceUrl + '/news/add')
			},
			//通过&不通过
			toAudit(num) {
        this.$confirm('是否要进行审核操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            ids: this.$route.params.id,
            tokenId: this.$store.state.user.tokenId,
            status: num,
          };
          if(num==3){
            params.checkReason= this.form.region;
            params.checkMessage= this.form.name;
          }
          this.$post('/news/check', params).then(res => {
            // console.log(res);
            if(res.code == 0){
              var backRoute='';
              if(this.column == '新闻'){
                backRoute = 'audit-news';
              }else{
                backRoute = 'audit-market';
              }
              this.$message({
                type: 'success',
                message: res.msg
              });
              // console.log(backRoute);
              setTimeout(() => {
                this.$router.push({
                  name: backRoute,
                  params:{
                    argu:this.argu
                  }
                });
              }, 1000);
            }else if(res.code == 2){
              this.$message({
                type: 'info',
                message: res.msg
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核操作'
          });          
        });
				
			},

			test() {
				console.log(this.form1.source);
			},
			// 获取富文本的内容
			onEditorBlur({
				quill,
				html,
				text
			}) {
				// console.log('editor blur!', quill, html, text)
				console.log(this.form1.content)
			},
			onEditorFocus(quill) {
				console.log('editor focus!', quill)
			},
			onEditorReady(quill) {
				console.log('editor ready!', quill)
			},
			onEditorChange(val) {
				console.log('editor change!', val)
				// this.content = html
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
      },
      fanhui(){
        var backRoute='';
        if(this.column == '新闻'){
          backRoute = 'audit-news';
        }else{
          backRoute = 'audit-market';
        }
        this.$router.push({
          name: backRoute,
          params: {
            argu: this.argu
          }
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = false;
      next();
    },
		watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
	}
</script>
<style type="text/css">
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
</style>