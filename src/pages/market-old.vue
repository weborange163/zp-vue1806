<template>
	<div class="page-body news">
		<div class="page-header">
			<el-row>
				<el-col :span="3">
					<el-select size="mini" v-model="value" name="classifyType" placeholder="请选择分类" style="width:95%">
						<el-option label="全部" value="全部"></el-option>
						</el-option>
						<el-option v-for="item in classifyType" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
        <el-col :span="3">
          <el-select size="mini" v-model="value1" placeholder="请选择发布来源" style="width:95%">
						<el-option v-for="item in optionss" :key="item.value1" :label="item.label" :value="item.value1">
						</el-option>
					</el-select>
        </el-col>
				<el-col :span="3">
					<el-select size="mini" v-model="value2" placeholder="时间类型">
						<el-option v-for="item in optionsss" :key="item.value2" :label="item.label" :value="item.value2">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="8" class="padLe4">
					<el-date-picker size="mini"  v-model="value6" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-col>
				<el-col :span="5" :offset="2">
					<el-input size="mini" v-model="inputs" placeholder="标题、创建人、会员id、文章id" style="width:70%;margin-right:5%;"></el-input>
					<el-button v-if="activeTab=='first'" size="mini" class="light_btn" style="width:20%;" @click.native.prevent="getMarket()">搜索</el-button>
					<el-button v-else size="mini" class="light_btn" style="width:20%;" @click.native.prevent="creatList()">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="box">
			<el-tabs v-model="activeTab" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<div class="tab1">
						<div class="text-right marBo4">
							<router-link :to="{name:'market-add',params:{argu:{a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,h:currentPage1,i:currentPage2,j:activeTab}}}">
								<el-button class="light_btn" size="mini">添加行情</el-button>
							</router-link>
							<el-button class="light_btn" @click="publishWaitTop()" size="mini">置顶排序</el-button>
							<el-button class="light_btn" @click.native.prevent="getMarket()" size="mini">刷新</el-button>
						</div>
						<el-table :data="tableData" :row-class-name="btnTable" :header-row-class-name="btnTable" border stripe>
							<!--<el-table-column label="#" type="index"></el-table-column>-->
							<!--<el-table-column label="序号" prop="user_id" width='50'></el-table-column>-->
							<el-table-column label="序号" align="center" type="index" width="50">
							</el-table-column>
							<el-table-column label="标题" prop="title">
								<template slot-scope="scope">
									<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.top_flag == '1'"></i>
									<el-popover trigger="hover" placement="top" v-if="scope.row.link">
										<p>{{ scope.row.link }}</p>
										<div slot="reference" class="name_wrapper">
											<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
										</div>
									</el-popover>
									<span>{{ scope.row.title }}</span>
								</template>
							</el-table-column>

							<el-table-column label="所属分类" prop="classify_type_name" width="120"></el-table-column>
							<el-table-column label="创建人" prop="create_user_id" width="80"></el-table-column>
							<el-table-column label="发布状态" prop="onlineTime" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='1'" class="dshx">新建</p>
									<p v-if="scope.row.status=='5'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='6'" class="yxx">已下线</p>
								</template>
							</el-table-column>
							<el-table-column label="上线时间" prop="online_time" width="120"></el-table-column>
							<el-table-column label="发布来源" prop="publish_source" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">app</p>
								</template>

							</el-table-column>
							<el-table-column label="文章ID" prop="article_id" width="80"></el-table-column>
							<el-table-column label="操作" width="220" fixed="right">
								<template slot-scope="scope">
									<!--v-if="scope.row.isUping"-->
									<el-button type="text" v-if="scope.row.top_flag=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp(scope.$index, scope.row)"> 取消置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.status!='5'" :disabled="true" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.top_flag=='0'&& scope.row.status == '5'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="toAudit(scope.$index, scope.row)"> 提交审核 </el-button>
									<!--v-if="scope.row.status =='已上线'"-->
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag=='1' " :disabled="true" style="margin-right:8px;vertical-align:middle;">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag!='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='6'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
									<router-link :to="{name:'market-lookes',params:{id:scope.row.id}}">
										<el-button type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<!--<el-button type="text" v-if="scope.row.status =='已上线'" @click.native.prevent="recommend(scope.row)"><i class="iconfont icon-share"></i></el-button>-->
									<router-link :to="{name:'market-edit',params:{id:scope.row.id,argu:{a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,h:currentPage1,i:currentPage2,j:activeTab}}}">
										<el-button type="text" v-if="(scope.row.status=='6'||scope.row.status=='1')&&scope.row.publish_source!=3"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status!='5'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" v-else disabled  @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage1"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page1" layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange1" :total="this.total_pages1">
						</el-pagination>
					</div>
					
				</el-tab-pane>
        <el-tab-pane label="已上线" name="second">
					<div class="tab1">
						<el-table :data="newArticle" :row-class-name="btnTable" :header-row-class-name="btnTable" border stripe>
							<el-table-column label="序号" align="center" type="index" width="50">
							</el-table-column>
							<el-table-column label="标题" prop="title">
								<template slot-scope="scope">
									<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.top_flag == '1'"></i>
									<el-popover trigger="hover" placement="top" v-if="scope.row.link">
										<p>{{ scope.row.link }}</p>
										<div slot="reference" class="name_wrapper">
											<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
										</div>
									</el-popover>
									<span>{{ scope.row.title }}</span>
								</template>
							</el-table-column>
							<el-table-column label="所属分类" prop="classify_type_name" width="120"></el-table-column>
							<el-table-column label="创建人" prop="create_user_id" width="80"></el-table-column>
							<el-table-column label="发布状态" prop="onlineTime" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='1'" class="dshx">新建</p>
									<p v-if="scope.row.status=='5'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='6'" class="yxx">已下线</p>
								</template>
							</el-table-column>
							<el-table-column label="上线时间" prop="online_time" width="120"></el-table-column>
							<el-table-column label="发布来源" prop="publish_source" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">app</p>
								</template>

							</el-table-column>
							<el-table-column label="文章ID" prop="article_id" width="80"></el-table-column>
							<el-table-column label="操作" width="220" fixed="right">
								<template slot-scope="scope">
									<!--v-if="scope.row.isUping"-->
									<el-button type="text" v-if="scope.row.top_flag=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp(scope.$index, scope.row)"> 取消置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.status!='5'" :disabled="true" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.top_flag=='0'&& scope.row.status == '5'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="toAudit(scope.$index, scope.row)"> 提交审核 </el-button>
									<!--v-if="scope.row.status =='已上线'"-->
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag=='1' " :disabled="true" style="margin-right:8px;vertical-align:middle;">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag!='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='6'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
									<router-link :to="{name:'market-lookes',params:{id:scope.row.id}}">
										<el-button type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<!--<el-button type="text" v-if="scope.row.status =='已上线'" @click.native.prevent="recommend(scope.row)"><i class="iconfont icon-share"></i></el-button>-->
									<router-link :to="{name:'market-edit',params:{id:scope.row.id,argu:{a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,h:currentPage1,i:currentPage2,j:activeTab}}}">
										<el-button type="text" v-if="(scope.row.status=='6'||scope.row.status=='1')&&scope.row.publish_source!=3"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status!='5'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" v-else disabled  @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage2"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper"
              @size-change="this.per_page2" :total="this.total_pages2">
						</el-pagination>
					</div>
				</el-tab-pane>
        <el-tab-pane label="已下线" name="third">
					<div class="tab1">
						<el-table :data="newArticle" :row-class-name="btnTable" :header-row-class-name="btnTable" border stripe>
							<el-table-column label="序号" align="center" type="index" width="50">
							</el-table-column>
							<el-table-column label="标题" prop="title">
								<template slot-scope="scope">
									<i class="iconfont icon-zhiding" style="color:#A30001;" v-if="scope.row.top_flag == '1'"></i>
									<el-popover trigger="hover" placement="top" v-if="scope.row.link">
										<p>{{ scope.row.link }}</p>
										<div slot="reference" class="name_wrapper">
											<i class="iconfont icon-link" style="color:#3658A7;vertical-align: middle;" v-if="scope.row.link"></i>
										</div>
									</el-popover>
									<span>{{ scope.row.title }}</span>
								</template>
							</el-table-column>

							<el-table-column label="所属分类" prop="classify_type_name" width="120"></el-table-column>
							<el-table-column label="创建人" prop="create_user_id" width="80"></el-table-column>
							<el-table-column label="发布状态" prop="onlineTime" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='1'" class="dshx">新建</p>
									<p v-if="scope.row.status=='5'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='6'" class="yxx">已下线</p>
								</template>
							</el-table-column>
							<el-table-column label="上线时间" prop="online_time" width="120"></el-table-column>
							<el-table-column label="发布来源" prop="publish_source" width="80">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
									<p v-if="scope.row.publish_source=='3'">app</p>
								</template>

							</el-table-column>
							<el-table-column label="文章ID" prop="article_id" width="80"></el-table-column>
							<el-table-column label="操作" width="220" fixed="right">
								<template slot-scope="scope">
									<!--v-if="scope.row.isUping"-->
									<el-button type="text" v-if="scope.row.top_flag=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp(scope.$index, scope.row)"> 取消置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.status!='5'" :disabled="true" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-else-if="scope.row.top_flag=='0'&& scope.row.status == '5'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="cancelUp1(scope.$index, scope.row)"> 置顶 </el-button>
									<el-button type="text" v-if="scope.row.status=='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="toAudit(scope.$index, scope.row)"> 提交审核 </el-button>
									<!--v-if="scope.row.status =='已上线'"-->
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag=='1' " :disabled="true" style="margin-right:8px;vertical-align:middle;">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='5' && scope.row.top_flag!='1'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag1(scope.$index, scope.row)">下线</el-button>
									<el-button type="text" v-if="scope.row.status=='6'" style="margin-right:8px;vertical-align:middle;" @click.native.prevent="top_flag2(scope.$index, scope.row)">上线</el-button>
									<router-link :to="{name:'market-lookes',params:{id:scope.row.id}}">
										<el-button type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									<!--<el-button type="text" v-if="scope.row.status =='已上线'" @click.native.prevent="recommend(scope.row)"><i class="iconfont icon-share"></i></el-button>-->
									<router-link :to="{name:'market-edit',params:{id:scope.row.id,argu:{a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,h:currentPage1,i:currentPage2,j:activeTab}}}">
										<el-button type="text" v-if="(scope.row.status=='6'||scope.row.status=='1')&&scope.row.publish_source!=3"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									<el-button type="text" v-if="scope.row.status!='5'" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" v-else disabled  @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage2"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper"
              @size-change="this.per_page2" :total="this.total_pages2">
						</el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="新建" name="fourth">
					<div class="tab2">
						<div class="text-right marBo4">
							<el-button class="light_btn" @click="toAudits">批量提交审核</el-button>
							<el-button class="light_btn" @click.native.prevent="creatList()">刷新</el-button>
						</div>
						<el-table :row-class-name="miniTable" :header-row-class-name="miniTable" ref="multipleTable" :data="newArticle" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" align="center">
							</el-table-column>
							<el-table-column type="index" label="序号" width="50">
							</el-table-column>
							<el-table-column prop="title" label="标题">
							</el-table-column>
							<el-table-column prop="create_user_id" label="创建人" width="100">
							</el-table-column>
							<el-table-column label="状态" width="50">
								<template slot-scope="scope">
									<p v-if="scope.row.status=='1'" class="dshx">新建</p>
									<p v-if="scope.row.status=='5'" class="yshx">已上线</p>
									<p v-if="scope.row.status=='6'" class="yxx">已下线</p>
								</template>
							</el-table-column>
							<el-table-column label="发布来源" width="100">
								<template slot-scope="scope">
									<p v-if="scope.row.publish_source=='1'">pc后台</p>
									<p v-if="scope.row.publish_source=='3'">app</p>
									<p v-if="scope.row.publish_source=='2'">数据爬取</p>
								</template>
							</el-table-column>
							<el-table-column label="文章ID" prop="id"></el-table-column>
							<el-table-column label="操作" width="300" fixed="right">
								<template slot-scope="scope">
									<router-link v-if="newArticle" :to="{name:'market-lookes',params:{id:scope.row.id}}">
										<el-button class="marR10" type="text"><i class="iconfont icon-see"></i></el-button>
									</router-link>
									
									<!--<el-button type="text" @click="newsShow(scope.row)"><i class="iconfont icon-see"></i></el-button>-->
									<router-link v-if="newArticle" :to="{name:'market-edit',params:{id:scope.row.id,argu:{a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,h:currentPage1,i:currentPage2,j:activeTab}}}">
										<el-button class="marR10" type="text" v-if="scope.row.status!='5'"><i class="iconfont icon-edit"></i></el-button>
									</router-link>
									
									<!--<el-button type="text"><i class="iconfont icon-edit"></i></el-button>-->
									<el-button class="marR10" type="text" @click.native.prevent="deleteRow(scope.$index, scope.row)"><i class="iconfont icon-delete"></i></el-button>
									<el-button type="text" @click.native.prevent="toAudit(scope.$index, scope.row)">提交审核</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					
					<div style="margin-top:20px;">
						<el-pagination class="text-right" background @current-change="handleCurrentChange2" :current-page="currentPage2"
             :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page2" layout="total, sizes, prev, pager, next, jumper"
              @size-change="this.per_page2" :total="this.total_pages2">
						</el-pagination>
					</div>

				</el-tab-pane>
			</el-tabs>
			<el-dialog center title="设置置顶内容排序" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<el-table :data="upData" border style="width: 100%" :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading">
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column prop="name" label="操作" width="70" class="text-center">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.$index != 0" @click="changeIndex(scope.$index,upData,'isUp')">
								<i class="iconfont icon-up"></i>
							</el-button>
							<el-button type="text" v-else disabled>
								<i class="iconfont icon-up unclick"></i>
							</el-button>
							<el-button type="text" v-if="scope.$index != upDataLength" @click="changeIndex(scope.$index,upData,'isDown')">
								<i class="iconfont icon-down"></i>
							</el-button>
							<el-button type="text" v-else disabled>
								<i class="iconfont icon-down" style="cursor:not-allowed"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="toPublish()">发 布</el-button>
        </span>
			</el-dialog>
			<el-dialog title="推荐到新闻主页" :visible.sync="dialogVisible1" center width="30%" :before-close="handleClose">
				<!--<el-radio v-model="recommendRadio" label="1">推荐到banner</el-radio><br/>-->
				<el-radio v-model="recommendRadio" label="2">置顶-列表区</el-radio>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
			</el-dialog>

		</div>
	</div>
</template>
<script type="text/javascript">
	import { formatTime, parseTime } from '@/utils/index' //@ === src
	import { getToken } from '@/utils/auth' //@ === src
	export default {
		name: 'market',
		data() {
			return {
        status:'1',
				multipleSelection: [],
				newArticle: [],
				activeTab: 'first',
				recommendRadio: 1,
				dialogVisible: false,
				dialogVisible1: false,
				loading: false,
				per_page: 10, //每页显示几条
				total_pages: 100, // 总页数
				current_page: 1, // 页面默认展示的当前页码
				currentPage1: 1, // 页面默认展示的当前页码
				currentPage2: 1,
				total_pages2: 0,
				per_page1: 10,
				per_page2: 10,
				total_pages1: 0,
				classifyType: '',
				upData: [
				],
				tableData: [],
				options: [{
					value: '选项1',
					label: '全部'
				}, {
					value: '选项5',
					label: '已上线'
				}, {
					value: '选项6',
					label: '已下线'
				}],
				optionss: [
					 {
					value1: '全部',
					label: '全部'
				}
				,{
					value1: '3',
					label: 'APP'
				}, {
					value1: '1',
					label: '后台发布'
				}, {
					value1: '2',
					label: '数据爬取'
				}],
				optionsss: [
          {	value2: '全部',
          label: '全部'
          },{
					value2: '3',
					label: '上线时间'
				}, {
					value2: '1',
					label: '创建时间'
				}, {
					value2: '4',
					label: '下线时间'
				}, {
					value2: '2',
					label: '审核时间'
        }],
        argu:{},
				value6: '',
				inputs: '',
				value: '',
				value1: '',
				value2: '',
				dataList: [],
				topFlag: '',
				timeStart: '',
				timeEnd: '',
				ids:[],
			}
		},
		computed: {
			upDataLength: function() {
				return this.upData.length - 1;
			}
		},
		created() {
      //a:value,b:value1,c:value2,d:value6,e:inputs,f:per_page1,g:per_page2,
      //h:currentPage1,i:currentPage2,j:activeTab
      if(this.$route.params.argu){
        this.argu = this.$route.params.argu;
        // console.log(this.argu)
        this.value = this.argu.a;
        this.value1 = this.argu.b;
        this.value2 = this.argu.c;
        this.value6 = this.argu.d;
        this.inputs = this.argu.e;
        this.per_page1 = this.argu.f;
        this.per_page2 = this.argu.g;
        this.currentPage1 = this.argu.h;
        this.currentPage2 = this.argu.i;
        this.activeTab = this.argu.j;
      
      if(this.activeTab == 'second') {
					this.status='5';
					this.creatList();
				}else if(this.activeTab == 'third'){
	        this.status='6';
					this.creatList();
        }else if(this.activeTab == 'fourth'){
          this.status='1';
					this.creatList();
        }else if(this.activeTab == 'first'){
          this.status='';
					this.getMarket();
        }
      }else{
        this.getMarket();
      }
		},
		mounted() {
			this.$get('/industryCategory/findIndustryCategoryList', {
				tokenId: this.$store.state.user.tokenId
			}).then(res => {
				// console.log(res.data)
				this.classifyType = res.data
			})
		},
		methods: {
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

			// 置顶排序
			publishWaitTop() {
				this.dialogVisible = true;
				this.loading = true;
				this.$get('/industry/findIndustryList', {
					tokenId: this.$store.state.user.tokenId,
					status: '5',
					topFlag: '1'
				}).then(res => {
					this.loading = false;
					console.log(res)
					this.upData = res.data;
				})
			},
			
			
			//提交置顶排序(弹框点击发布)
			toPublish() {
				// console.log(this.upData)
				var newsInfos = [];
				this.upData.map((item, index) => {
					//	newsInfos.push({id:item.id,orderNum:index+1})
					newsInfos.push(item.id);
				})
				var params = {
					tokenId: this.$store.state.user.tokenId,
					// newsInfos:JSON.stringify(newsInfos)
					ids: newsInfos.join(',')
				}
				console.log(params);
				this.$post('/industry/publishOrederByIds', params).then(res => {
					this.$message({
						message: res.msg,
						type: 'success'
					});
				})
				this.dialogVisible = false
				this.getMarket()
				//				alert(111)
			},
			//列表
			getMarket() {
        var params = {
          tokenId: this.$store.state.user.tokenId,
          limit: this.per_page1,
          offset: this.currentPage1, 
          title: this.inputs,
          classifyType: this.value=='全部'?'':this.value,
					publishSource: this.value1=='全部'?'':this.value1,
          timeType: this.value2=='全部'?'':this.value2,
        }
        if(this.value6){
          params.timeStart = this.value6[0];
          params.timeEnd = this.value6[1];
        }
				this.$get('industry/list', params).then(res => {
          // console.log(res.data[0].rows)
          if(this.argu.h){
            this.currentPage2=this.argu.h;
            this.argu.h=0;
          }
					this.tableData = res.data[0].rows
					this.total_pages1 = res.data[0].total;
				})
			},
			//刷新
			
			marketShow(row) {
				console.log(row.id);
				var params = {
					tokenId: this.$store.state.user.tokenId,
					id: row.id
				}
				this.$get('industry/get', params).then(res => {
					console.log(res)
				})
			},
			miniTable(row) {
				return 'miniTable'
			},
			btnTable(row) {
				return 'btnTable'
			},
			
			handleClick(tab, event) {
        this.value='';
				this.value1='';
        this.value2='';
        this.inputs='';
        this.value6='';
				// console.log(tab, event);
				if(tab.name == 'second') {
					this.status='5';
					this.creatList();
				}else if(tab.name == 'third'){
	        this.status='6';
					this.creatList();
        }else if(tab.name == 'fourth'){
          this.status='1';
					this.creatList();
        }else if(tab.name == 'first'){
          this.status='';
					this.getMarket();
        }

			},
			//推荐到
			recommend(row) {
				this.dialogVisible1 = true;
			},
			//取消置顶
			cancelUp(index, rows) {
				this.$confirm('确定要取消置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						topFlag: '0'
					}
					this.$post('/industry/downTop', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '取消成功!'
						});
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消失败'
					});
				});
			},
			//置顶
			cancelUp1(index, rows) {
				this.$confirm('确定要置顶吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						topFlag: '1'
					}
					this.$post('/industry/onTop', params).then(res => {
						// console.log(res)
						if(res.code == '0') {
							this.$message({
								type: 'success',
								message: '置顶成功!'
							});
						}
						if(res.code == '1') {
							this.$message({
								message: res.msg,
								type: 'warning'
							});
						}
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '置顶失败'
					});
				});
			},
			//			下线
			top_flag1(index, rows) {
				this.$confirm('确定要下线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status: '6'
					}
					this.$post('/industry/onAndOffLine', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '下线成功!'
						});
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '下线失败'
					});
				});
			},
			//					上线
			top_flag2(index, rows) {
				this.$confirm('确定上线吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status: '5'
					}
					this.$post('/industry/onAndOffLine', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '上线成功!'
						});
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '上线失败'
					});
				});
			},
			//提交审核
			toAudit(index, rows) {
				this.$confirm('确定要提交审核吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id,
						status: '2'
					}
					this.$post('/industry/save', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '提交成功!'
            });
            setTimeout(() => {
						  this.getMarket();
            },500)
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '提交失败'
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
			handleCurrentChange(val) {
				this.currentPage1 = val;
				this.getMarket()
				// console.log(`当前页: ${val}`);
			},
			//新建的行情列表
			creatList() {
					//console.log(params)
					var params = {
						tokenId: this.$store.state.user.tokenId,
						limit: this.per_page2,
						offset: this.currentPage2,
            status: this.status,
            classifyType: this.value=='全部'?'':this.value,
            publishSource: this.value1=='全部'?'':this.value1,
            timeType: this.value2=='全部'?'':this.value2,
					}
				this.$post('/industry/list', params).then(res => {
          if(this.argu.i){
            this.currentPage2=this.argu.i;
            this.argu.i=0;
          }
					this.newArticle = res.data[0].rows;
					this.total_pages2 = res.data[0].total;
				})
			},
			//tab2 分页
			handleCurrentChange2(val) {
				this.currentPage2 = val;

      },
      handleSizeChange1(val){
        this.per_page1 = val;
        this.getMarket();
      },
      handleSizeChange2(val){

      },
			//删除
			deleteRow(index, rows) {
				// rows.splice(index, 1);
				this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = {
						tokenId: this.$store.state.user.tokenId,
						id: rows.id
					}
					this.$post('/industry/delete', params).then(res => {
						// console.log(res)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getMarket();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				console.log(index, rows);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
				this.ids = [];
				this.multipleSelection.map(item => {
					this.ids.push(item.id);
				})
			},

			// 批量提交审核
			toAudits() {
				if(this.ids == false) {
					this.$message({
						message: '请勾选需要提交审核的文章!',
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
						tokenId: this.$store.state.user.tokenId,
						ids: this.ids.join(','),
						 status:'2',
					}

					this.$post('/industry/toCheckByIds', params).then(res => {
						console.log(res)
						this.creatList();
						this.$message({
							type: 'success',
							message: '提交成功!'
						});
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '操作已取消'
					});
				});

			},
		
		}
	}
</script>
<style type="text/css">
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
	
	.yshx {
		color: #00C621;
	}
	
	.dshx {
		color: #FEB210;
	}
	
	.yxx {
		color: #999;
	}
	
	.el-table,
	.el-table .el-button {
		font-size: 12px;
	}
	
	.el-table th {
		font-size: 14px;
	}
	
	.el-table th {
		text-align: center;
	}
	
	.el-table_1_column_7 .iconfont {
		font-size: 20px;
		vertical-align: middle;
		margin-right: 8px;
	}
	
	.el-button.el-button--small {
		line-height: 8px;
		padding-top: 9px;
		padding-bottom: 9px;
	}
</style>