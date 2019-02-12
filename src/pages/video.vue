<template>
	<div class="page-body video">
		<div class="page-header">
			<el-row>
        <el-col :span="3">
          <el-select clearable style="width:80%" size="mini" v-model="columnid" placeholder="选择栏目">
            <el-option v-for="item in columnIds" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
				<el-col :span="3">
					<el-select clearable v-model="value1" placeholder="发布来源" style="width:60%" size="mini">
						<el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select clearable v-model="value2" placeholder="时间类型" size="mini">
						<el-option v-for="item in optionsss" :key="item.value2" :label="item.label" :value="item.value2">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7" class="padLe4">
          <el-date-picker size="mini" style="width:95%;"
            v-model="value6"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
				</el-col>
				<el-col :span="6" :offset="1">
					<el-input size="mini" v-model="inputs" placeholder="标题、创建人、视频ID" style="width:70%;margin-right:5%;"></el-input>
					<el-button class="light_btn" style="width:20%;" size="mini" @click.native.prevent="newsList()">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="box">
			<el-tabs v-model="activeTab" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<div class="tab1">
						<div class="text-right marBo4">
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile2"
                action=""
                :on-change="handleChange2"
                :auto-upload="false"
                :file-list="fileList2">
                <el-button size="mini" type="primary">导入评论</el-button>
              </el-upload>
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile"
                action=""
                :on-change="handleChange"
                :auto-upload="false"
                :file-list="fileList">
                <el-button size="mini" type="primary">导入活跃数据</el-button>
              </el-upload>
							<router-link :to="{name:'video-add',params:{argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
								<el-button class="light_btn" size="mini"><i class="el-icon-plus" style="font-weight:600;"></i> 视频</el-button>
							</router-link>
							<el-button class="light_btn" size="mini" @click="newsList()">刷新</el-button>
						</div>
						<el-table key="tableData1" :data="tableData" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading">
							<!--<el-table-column label="#" type="index"></el-table-column>-->
							<el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
							<el-table-column label="标题" prop="title" min-width='264'>
							</el-table-column>
							<el-table-column label="栏目" prop="column_name" width="100"></el-table-column>
							<el-table-column label="发布状态" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'" >新建</p>
									<p v-if="scope.row.status=='4'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='5'" class="yxx">已下线</p>
									<p v-if="scope.row.status=='1'" class="dshx">待审核</p>
									<p v-if="scope.row.status=='3'" class="yxx">审核不通过</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">APP端</p>
								</template>
							</el-table-column>
							<el-table-column label="ID" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.article_id}}</span>
									<el-button class="light_btn f-right" @click="handleCopy(scope.row.article_id,$event)">复制</el-button>
								</template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="140"></el-table-column>
							<el-table-column label="上线时间" prop="online_time" width="140"></el-table-column>
              <el-table-column label="创建人" prop="createUser" width="100"></el-table-column>
							<el-table-column label="操作" width="240" fixed="right">
								<template slot-scope="scope">
									<el-button class="marR10" type="text" v-if="scope.row.status == '0'" @click="toAudit(scope.row)">提交审核</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='4'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'5','下线')">下线</el-button>
						      <el-button type="text" v-else style="margin-right:8px;vertical-align:middle;" disabled>下线</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='5'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'4','上线')">上线</el-button>
									<router-link :to="{name:'video-lookes',params:{id:scope.row.id}}">
										<el-button class="marR10" type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<router-link :to="{name:'video-edit',params:{id:scope.row.id,argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
										<el-button class="marR10" type="text" v-if="(scope.row.status == '0'||scope.row.status == '5') && scope.row.publish_source != '3'"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status !='4'&&scope.row.specialNewsStatus==0 " @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button class="marR10" type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="this.currentPage1"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange1" :total="this.total_pages1">
						</el-pagination>
					</div>
				</el-tab-pane>
        <el-tab-pane label="已上线" name="second">
          <div class="tab2">
            <div class="text-right marBo4">
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile2"
                action=""
                :on-change="handleChange2"
                :auto-upload="false"
                :file-list="fileList2">
                <el-button size="mini" type="primary">导入评论</el-button>
              </el-upload>
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile"
                action=""
                :on-change="handleChange"
                :auto-upload="false"
                :file-list="fileList">
                <el-button size="mini" type="primary">导入活跃数据</el-button>
              </el-upload>
							<router-link :to="{name:'video-add',params:{argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
								<el-button class="light_btn" size="mini"><i class="el-icon-plus" style="font-weight:600;"></i> 视频</el-button>
							</router-link>
							<el-button class="light_btn" size="mini" @click="newsList()">刷新</el-button>
						</div>
            <el-table key="tableData2" :data="tableData" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading">
							<el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
							<el-table-column label="标题" prop="title"  min-width='264'>
							</el-table-column>
							<el-table-column label="栏目" prop="column_name" width="100"></el-table-column>
							<el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
									<p class="yshx">已上线</p>
                </template>
							</el-table-column>
							<el-table-column label="发布来源"  width="120">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">APP端</p>
								</template>
							</el-table-column>
              <el-table-column label="ID" prop="article_id"  width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.article_id}}</span>
									<el-button class="light_btn f-right" @click="handleCopy(scope.row.article_id,$event)">复制</el-button>
								</template>
              </el-table-column>
							<el-table-column label="上线时间" prop="online_time"  width="140"></el-table-column>
							<el-table-column label="创建人" prop="createUser" width="100"></el-table-column>
							<el-table-column label="操作" width="240" fixed="right">
								<template slot-scope="scope">
									<el-button class="marR10" type="text" v-if="scope.row.status == '0'" @click="toAudit(scope.row)">提交审核</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='4'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'5','下线')">下线</el-button>
						      <el-button type="text" v-else style="margin-right:8px;vertical-align:middle;" disabled>下线</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='5'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'4','上线')">上线</el-button>
									<router-link :to="{name:'video-lookes',params:{id:scope.row.id}}">
										<el-button class="marR10" type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<router-link :to="{name:'video-edit',params:{id:scope.row.id,argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
										<el-button class="marR10" type="text" v-if="(scope.row.status == '0'||scope.row.status == '5') && scope.row.publish_source != '3'"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status !='4'&&scope.row.specialNewsStatus==0 " @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button class="marR10" type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
          </div>
          <div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="currentPage1"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange1" :total="this.total_pages1">
						</el-pagination>
					</div>
        </el-tab-pane>
        <el-tab-pane label="已下线" name="third">
          <div class="tab3">
            <div class="text-right marBo4">
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile2"
                action=""
                :on-change="handleChange2"
                :auto-upload="false"
                :file-list="fileList2">
                <el-button size="mini" type="primary">导入评论</el-button>
              </el-upload>
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile"
                action=""
                :on-change="handleChange"
                :auto-upload="false"
                :file-list="fileList">
                <el-button size="mini" type="primary">导入活跃数据</el-button>
              </el-upload>
							<router-link :to="{name:'video-add',params:{argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
								<el-button class="light_btn" size="mini"><i class="el-icon-plus" style="font-weight:600;"></i> 视频</el-button>
							</router-link>
							<el-button class="light_btn" size="mini" @click="newsList()">刷新</el-button>
						</div>
            <el-table key="tableData3" :data="tableData" border stripe :row-class-name="btnTable" :header-row-class-name="btnTable">
							<el-table-column label="序号" type="index" align="center" width='50'></el-table-column>
							<el-table-column label="标题" prop="title"  min-width='264'>
							</el-table-column>
							<el-table-column label="栏目" prop="column_name" width="100"></el-table-column>
							<el-table-column label="发布状态" width="80">
                <template slot-scope="scope">
									<p class="yxx">已下线</p>
                </template>
							</el-table-column>
							<el-table-column label="发布来源"  width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">APP端</p>
								</template>
							</el-table-column>
							<el-table-column label="ID" prop="article_id" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.article_id}}</span>
									<el-button class="light_btn f-right" @click="handleCopy(scope.row.article_id,$event)">复制</el-button>
								</template>
              </el-table-column>
							<el-table-column label="下线时间" prop="offline_time" width="140"></el-table-column>
							<el-table-column label="创建人" prop="createUser" width="100"></el-table-column>
							<el-table-column label="操作" width="160" fixed="right">
								<template slot-scope="scope">
									<el-button class="marR10" type="text" v-if="scope.row.status == '0'" @click="toAudit(scope.row)">提交审核</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='4'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'5','下线')">下线</el-button>
						      <el-button type="text" v-else style="margin-right:8px;vertical-align:middle;" disabled>下线</el-button>
									<el-button class="marR10" type="text" v-if="scope.row.status =='5'" style="margin-right:8px;vertical-align:middle;" @click="onOff(scope.row,'4','上线')">上线</el-button>
									<router-link :to="{name:'video-lookes',params:{id:scope.row.id}}">
										<el-button class="marR10" type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<router-link :to="{name:'video-edit',params:{id:scope.row.id,argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
										<el-button class="marR10" type="text" v-if="(scope.row.status == '0'||scope.row.status == '5') && scope.row.publish_source != '3'"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status !='4'&&scope.row.specialNewsStatus==0 " @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button class="marR10" type="text" v-else disabled><i class="iconfont icon-delete unclick"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
          </div>
          <div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="currentPage1"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange1" :total="this.total_pages1">
						</el-pagination>
					</div>
        </el-tab-pane>
				<el-tab-pane label="新建" name="fourth">
					<div class="tab4">
						<div class="text-right marBo4">
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile2"
                action=""
                :on-change="handleChange2"
                :auto-upload="false"
                :file-list="fileList2">
                <el-button size="mini" type="primary">导入评论</el-button>
              </el-upload>
              <el-upload style="display:inline-block;"
                class="upload-demo" name="usersFile"
                action=""
                :on-change="handleChange"
                :auto-upload="false"
                :file-list="fileList">
                <el-button size="mini" type="primary">导入活跃数据</el-button>
              </el-upload>
							<el-button class="light_btn" size="mini" @click="toAudits">批量提交审核</el-button>
              	<router-link :to="{name:'video-add',params:{argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
								<el-button class="light_btn" size="mini"><i class="el-icon-plus" style="font-weight:600;"></i> 视频</el-button>
							</router-link>
							<el-button class="light_btn" size="mini" @click="newsList()">刷新</el-button>
						</div>
						<el-table key="tableData4" :row-class-name="miniTable" :header-row-class-name="miniTable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" align="center">
							</el-table-column>
							<el-table-column type="index" label="序号" width="50">
							</el-table-column>
							<el-table-column prop="title" label="标题"  min-width='264'>
							</el-table-column>
							<el-table-column label="栏目" prop="column_name" width="100"></el-table-column>
							<el-table-column label="状态" width="50">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='0'">新建</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源"  width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">移动端</p>
								</template>
							</el-table-column>
							<el-table-column label="ID" prop="article_id" width="180">
                <template slot-scope="scope">
                  <span>{{scope.row.article_id}}</span>
									<el-button class="light_btn f-right" @click="handleCopy(scope.row.article_id,$event)">复制</el-button>
								</template>
              </el-table-column>
              <el-table-column label="创建时间" prop="create_time" width="140"></el-table-column>
							<el-table-column prop="createUser" label="创建人" width="100"></el-table-column>
							<el-table-column label="操作" width="200" fixed="right">
								<template slot-scope="scope">
									<!-- <el-button class="marR10" type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button> -->
									<router-link :to="{name:'video-lookes',params:{id:scope.row.id}}">
										<el-button class="marR10" type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
                  <router-link :to="{name:'video-edit',params:{id:scope.row.id,argu:{a:value1,b:value2,c:value6,d:inputs,e:activeTab,f:per_page1,g:currentPage1}}}">
                    <el-button class="marR10" type="text" ><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button class="marR10" type="text" v-if="scope.row.status !='4'&&scope.row.specialNewsStatus=='0'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button class="marR10" type="text" @click="toAudit(scope.row)">提交审核</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange1" :current-page="currentPage1"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange1" :total="this.total_pages1">
						</el-pagination>
					</div>
				</el-tab-pane>
			</el-tabs>
			<!-- 分页 -->
			
		</div>
	</div>
</template>
<script type="text/javascript">
	import { HTMLDecode,getBaceUrl } from '@/utils/auth'
  import clip from '@/utils/clipboard'
	export default {
    name: 'home',
		data() {
      var valiIcon = (rule, value, callback) => { // 图片验证
        if (!this.hasFmt) {
          callback(new Error('请上传图片'));
        } else {
          callback();
        }
      };
			return {
        fileList:[],
        newsFile2:'',
        fileList2:[],
				bannerForm:{
          loading:false,
					title:'',
					file:'',
					filename:'',
					title_short:'',
					articleId:'',
					type:'新闻',
					link:''
        },
        columnid:'',
				bannerRules: {
					title_short: [
            { required: true, message: '请输入短标题', trigger: 'blur' },
            {min:1,max:30,message:'短标题在30字以内', trigger:'blur'}
          ],
          icon:[
            {required:true, validator: valiIcon, trigger: 'change' }  // 图片验证
          ]
				},
				bannerDialog:false,
				loading:false,
				multipleSelection: [],
				activeTab: 'first',
				recommendRadio: '', // 推荐到banner/置顶的radio值
				recoIndex:0,	// 点击推荐到时的表格的index
				dialogVisible: false,
				dialogVisible1: false,
        dialogVisible2: false,
        status:'',
				per_page1: 10,
				total_pages1: 0,
				currentPage1: 1, // 页面默认展示的当前页码
				params:{},
				upData: [],
        tableData: [],
			optionss: [
        {
					value: '3',
					label: 'APP'
				}, {
					value: '1',
					label: '后台发布'
				}, {
					value: '2',
					label: '数据爬取'
				}],
				optionsss: [{
					value2: 'online',
					label: '上线时间'
				}, {
					value2: 'create',
					label: '创建时间'
				}, {
					value2: 'offline',
					label: '下线时间'
				}, {
					value2: 'audit',
					label: '审核时间'
				}],
				value6: '',
				inputs: '',
				value: '',
				value1:'',
				value2:'',
				dataList: [],
				ids:[],
        baceUrl:'',
        newsFile:'',
        fileList:[],
				dialogImageUrl:'',
        uploadData:{},
        hasFmt:false,
        fromparams:{},
        argu:{},
        columnIds:''
			}
		},
		created(){
      this.baceUrl = getBaceUrl();
      this.$get('/videoColumn/findColumnList',{tokenId:this.$store.state.user.tokenId,enabled:''}).then(res => {
    		// console.log(res.data)
    		this.columnIds = res.data
    	});
      // console.log(this.$route.params);
      if(this.$route.params.argu){
        this.argu = this.$route.params.argu;
        this.value1=this.argu.a;
        this.value2=this.argu.b;
        this.value6=this.argu.c;
        this.inputs=this.argu.d;
        this.activeTab=this.argu.e;
        this.per_page1=this.argu.f;
        this.currentPage1=this.argu.g;
        if(this.activeTab == 'fourth'){ 	
					this.status='0';
        }
        if(this.activeTab == 'second'){ 	
					this.status='4';
        }
        if(this.activeTab == 'third'){ 	
					this.status='5'
        }
        if(this.activeTab=='first'){
          this.status='';
        }
        // console.log(this.currentPage1);
      }
      this.newsList();
    },
		mounted() {
			// this.db();
		},
		computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
		methods: {

      // copy 功能
      handleCopy(text, event) {
        clip(text, event)
        // console.log('clicp')
      },
			//上下线操作
			onOff(row,status,type){
				this.$confirm(`确定要${type}该视频吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						status:status,
						id:row.id
					}
					this.$post('/video/isOnline',params).then(res => {
						console.log(res)
						this.newsList();
						this.$message({
							type: 'success',
							message: res.msg
						});
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
				console.log(row)
			},
			handleRemove(file, fileList) {
        console.log(file, fileList);
				if(fileList.length == 0){
					this.hasFmt =false;
				}
      },
      handlePictureCardPreview(file) {
				console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible2 = true;
			},
			getFullUrl(){
				return (this.baceUrl+'/bannerInfo/save')
			},
			
			//提交审核
			toAudit(row){
				this.$confirm('是否提交到审核列表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params={
						tokenId:this.$store.state.user.tokenId,
						ids:row.id
					}
					this.$post('video/batchWaitCheck',params).then(res => {
						if(res.code==0){
              this.newsList();
              this.$message({
                type: 'success',
                message: res.msg?res.msg:'操作成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.msg?res.msg:'操作失败!'
              });
            }
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
				
			},
			//新闻预览
			newsShow(row){
				console.log(row.id);
				var params = {
					tokenId:this.$store.state.user.tokenId,
					id:row.id
				}
				this.$get('news/show',params).then(res =>{
					
					console.log(res)
				})
			},
			//新闻列表
			newsList(val){
        this.loading=true;
				// if(!params){
          //console.log(params)
        this.currentPage1 = val?val:1;
        var params={
          // articleType:'1',
          tokenId:this.$store.state.user.tokenId,
          limit:this.per_page1,
          offset:this.currentPage1,
          status:this.status,
          publishSource:this.value1,
          timeType:this.value2,
          simpleParameter:this.inputs,
          startTime:this.value6?this.value6[0]:'',
          endTime:this.value6?this.value6[1]:'',
          columnId:this.columnid,
        }
        
      if(this.status==''){
        params.queryType = 'LineAndCreate' ;
        delete params.status;
      }else{
        params.status=this.status;
        delete params.queryType;
      }
      // console.log(params)
      this.$post('/video/list',params).then(res => {
        // console.log(res.data[0].rows)
        if(res.code == 0){
          this.loading=false;
          this.$message({
            message: '成功获取视频列表',
            type: 'success'
          });
          if(this.argu.g){
            this.currentPage1=this.argu.g;
            this.argu.g=0;
          }
          this.tableData = res.data[0].rows;
          this.total_pages1 = res.data[0].total;
        }
      });
    },
			//tab1 分页
			handleCurrentChange1(val) {
        // console.log(val);
				this.currentPage1 = val;
				// console.log(this.params)
				this.newsList(val);
      },
     cancelToban(){
        this.bannerDialog = false;
        this.fileList=[];
        this.recommendRadio='';
        this.bannerForm={};
        this.dialogImageUrl='';
        console.log(this.bannerForm);
        this.$refs['bannerForm'].resetFields();
      },
     
		//图片的验证
			fileChange(file,fileList){
				this.bannerForm.filename = file.name;
				this.bannerForm.file = file.raw;
				console.log(file.raw)
				if(fileList.length>0){
					this.hasFmt = true;
				}
			},
			// 批量提交审核
			toAudits(){
				if(this.ids == false){
					this.$message({
						message: '您没有勾选任何视频!',
						type: 'warning'
					});
					return;
				}
				this.$confirm('确定要提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						ids:this.ids.join(',')
					}
					console.log(params)
					this.$post('video/batchWaitCheck',params).then(res => {
						if(res.code==0){
              this.newsList();
              this.$message({
                type: 'success',
                message: res.msg?res.msg:'提交成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.msg?res.msg:'提交失败!'
              });
            }
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
				
      },
      handleChange2(file, fileList){
        // console.log(file, fileList);
        this.newsFile2 = file.raw;
        this.fileList2 = fileList;
        this.$confirm('确定要上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.sureUpload2();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
      },
			// 复选框操作, 获取选中的新闻的article_id
			handleSelectionChange(val) {
        console.log(val);
				this.multipleSelection = val;
				this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
			},
			// tab切换
			handleClick(tab, event) {
        // console.log(tab.name, event);
        this.currentPage1=1;
        this.value1='';
        this.value2='';
        this.inputs='';
        this.value6='';
				if(tab.name == 'fourth'){ 	
					this.status='0';
        }
        if(tab.name == 'second'){ 	
					this.status='4';
        }
        if(tab.name == 'third'){ 	
					this.status='5'
        }
        if(tab.name=='first'){
          this.status='';
        }
        this.newsList();
      },
      handleChange(file, fileList){
        // console.log(file, fileList);
        this.newsFile = file.raw;
        this.fileList = fileList;
        this.$confirm('确定要上传吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.sureUpload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });          
        });
      },
      sureUpload(){
        const loading = this.$loading({
              lock: true,
              text: '上传中...',
              target:document.querySelector('.app-container'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.6)'
            });
        this.formDatas = new FormData();
        this.formDatas.append('videoNewsFile', this.newsFile);
        this.formDatas.append('tokenId',this.$store.state.user.tokenId);
        this.$post('/newsCount/toVideoCountExceptInt',this.formDatas).then(res =>{
          if(res.code == 0){
            loading.close();
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }else if(res.code == 3){
            loading.close();
            let str = '';
            res.data.map(item => {
              str+='<p>'+item+'<p/>';
            })
            const h = this.$createElement;
            this.$notify.error({
              title: '错误',
              dangerouslyUseHTMLString: true,
              message: str,
              duration: 0
            });
          }else{
            loading.close();
            this.$message({
              message: res.msg?res.msg:'操作失败',
              type: 'error'
            });
          }
          this.newsFile='';
        })
      },
      sureUpload2(){
        const loading = this.$loading({
              lock: true,
              text: '上传中...',
              target:document.querySelector('.app-container'),
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
            });
        let formDatas = new FormData();
        formDatas.append('commentFile', this.newsFile2);
        formDatas.append('tokenId',this.$store.state.user.tokenId);
        formDatas.append('articleType','2');
        this.$post('/newsCount/toCommentExceptInt',formDatas).then(res =>{
          if(res.code == 0){
            loading.close();
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }else if(res.code == 3){
            loading.close();
            let str = '';
            res.data.map(item => {
              str+='<p>'+item+'<p/>';
            })
            const h = this.$createElement;
            this.$notify.error({
              title: '错误',
              dangerouslyUseHTMLString: true,
              message: str,
              duration: 0
            });
          }else{
            loading.close();
            this.$message({
              message: res.msg?res.msg:'操作失败',
              type: 'error'
            });
          }
          this.newsFile2='';
        })
      },
			// 确定推荐到置顶/banner
			sureReco(){
				this.bannerForm={
					title:'',
					file:'',
					filename:'',
					title_short:'',
					articleId:'',
					type:'新闻',
					link:''
        };
        
				if(this.recommendRadio == '1'){	// 新闻置顶
					// console.log(this.recoIndex)
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id: this.tableData[this.recoIndex].id,
            topData:'1',
            topType:'1'
					}
					this.handleUp(params);
        }else if (this.recommendRadio == '2'){ // 栏目置顶
          var params = {
						tokenId:this.$store.state.user.tokenId,
            columnId:this.tableData[this.recoIndex].column_id
          }
          this.$post('/news/columnTopped',params).then(res => {
            if(res.code == 0&&res.count==0){
              var params = {
                tokenId:this.$store.state.user.tokenId,
                id: this.tableData[this.recoIndex].id,
                topData:'1',
                topType:'2'
              }
              this.handleUp(params);
            }else if(res.code == '0'&&res.count==1){
              this.$confirm('此栏目下已有置顶视频,是否替换?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var params = {
                  tokenId:this.$store.state.user.tokenId,
                  id: this.tableData[this.recoIndex].id,
                  topData:'1',
                  topType:'2'
                }
                this.handleUp(params);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消置顶操作'
                });          
              });
            }
          });

        }else if(this.recommendRadio == '3'){	// 推荐到banner
          // console.log('推荐到banner');
          if(this.tableData[this.recoIndex].recommend !='0'){   // 判断是否是已经推荐到了banner列表,
            this.$message({
              message: '本条消息已经推荐到了banner,请去banner列表查看',
              type: 'warning'
            });
            this.dialogVisible1 = false;
            return;
          }
					// this.tableData[this.recoIndex].title,
					this.bannerForm.title = this.tableData[this.recoIndex].title;
					this.bannerForm.link = this.tableData[this.recoIndex].id;
					this.bannerForm.articleId = this.tableData[this.recoIndex].article_id;
					this.dialogVisible1 = false;
					this.bannerDialog =true;
        }else{
					 this.$message('请选择一项再操作');
				}
				// this.dialogVisible1 = false;
			},
			
      handleUp(params){
        this.$post('/news/top',params).then(res => {
          // console.log(res,res.code);
           if(res.code == '0'){
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            setTimeout(() => {
              this.newsList();
            }, 1000);
          }else{
            this.$message({
              message: res.msg?res.msg:'',
              type: 'warning'
            });
          }
        });
        this.dialogVisible1 = false;
      },
			//取消置顶
			cancelUp(row) {
				this.$confirm('确定要取消置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id: row.id,
            topData:'0',
            topType:'1'
					}
					console.log(params.id)
					this.$post('news/top',params).then(res => {
            if(res.code==0){
                console.log(res);
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.newsList();
            }else{
               this.$message({
                type: 'error',
                message: res.msg?res.msg:'操作失败'
              });
            }
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//实现置顶排序的方法
			changeIndex(index, rows, dir) {
				if(dir == 'isUp') {
					var a = rows[index]
					var b = rows[index - 1]
					rows.splice(index - 1, 1, a)
					rows.splice(index, 1, b)
				} else {
					var a = rows[index]
					var b = rows[index + 1]
					rows.splice(index + 1, 1, a)
					rows.splice(index, 1, b)
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {

						done();
					})
					.catch(_ => {});
			},
			guanlian(id) {
				var arr = [{
					id: 1
				}];
				let item = arr.filter((item, index) => {
					return item.id === id
				})
			},
			
			//删除新闻
			deleteRow(index, rows) {
				// rows.splice(index, 1);
				this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId:this.$store.state.user.tokenId,
						id:rows.id
					}
					this.$post('video/delete',params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.newsList();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				console.log(index, rows);
			},
			miniTable(row) {
				return 'miniTable'
			},
			btnTable(row) {
				return 'btnTable'
			},
			handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
      handleSizeChange1(val) {
        // console.log(`每页 ${val} 条`);
        this.per_page1 = val;
        this.newsList();
      },
		}
	}
</script>
<style type="text/css">
	.bannerForm .el-upload--picture-card{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
	.bannerForm .el-upload-list--picture-card .el-upload-list__item{
		width: 80px;
		height: 80px;
		line-height: 88px;
	}
	.el-range-editor.el-input__inner {
		padding: 0;
	}
	
	.el-date-editor .el-range__icon,
	.el-date-editor .el-range-separator {
		line-height: 28px;
		height: 28px;
	}
	
	.el-date-editor .el-range__icon {
		padding-left: 4px;
	}
	
	.iconfont {
		vertical-align: middle;
		cursor: pointer;
	}
	
	.name_wrapper {
		display: inline-block;
	}
	
	.el-table,
	.el-table .el-button {
		font-size: 12px;
	}
	
	.news .el-table th {
		font-size: 14px;
	}
	
	.el-table_1_column_7 .iconfont {
		font-size: 20px;
		vertical-align: middle;
		margin-right: 8px;
  }
  .news .el-table .cell{
    line-height: 26px;
  }
	
	.el-button.el-button--small {
		line-height: 8px;
		padding-top: 9px;
		padding-bottom: 9px;
  }
  body .el-table th.gutter{
    display: table-cell !important;
}
.video .marBo4 .el-upload-list__item-name{
   display: none;
}
</style>