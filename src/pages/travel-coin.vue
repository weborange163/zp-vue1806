<template>
    <div class="page-body travel_coin">
      <div class="page-header">
        <el-input size="mini" v-model="role_nik" placeholder="规则名称" style="width:200px;"></el-input>
        <el-button class="light_btn" @click="getList">搜索</el-button>
      </div>
      <div class="box">
         <div class="text-right marBo4">
           <el-button class="light_btn" @click="sortRules">排序</el-button>
          <el-button class="light_btn" @click="getList">刷新</el-button>
        </div>
        <el-table :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading"
          :data="tableData"
          stripe border
          style="width: 100%">
          <el-table-column label="序号" type="index" width='50'></el-table-column>
          <el-table-column prop="dict_type_name"  label="规则类别" width='120'></el-table-column>
          <el-table-column prop="dict_name"  label="规则名称" width='160'></el-table-column>
          <el-table-column prop="description"  label="参数详情"></el-table-column>
          <el-table-column label="状态" width='80'>
            <template slot-scope="scope">
              <p v-if="scope.row.is_enable=='0'" class="yxx">未启用</p>
              <p v-if="scope.row.is_enable=='1'" class="yshx">已启用</p>
            </template>
          </el-table-column>
          <el-table-column prop="update_time"  label="修改时间" width='150'></el-table-column>
          <el-table-column prop="update_user_name"  label="操作账号" width='120'></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
							<el-button type="text" @click="getRule(scope.row.rule,scope.row.id)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        	<div class="marT20">
					<el-pagination class="text-right" background @current-change="handleCurrentChange" :current-page="currentPage" 
          :page-sizes="[10, 20, 30, 40]" :page-size="this.per_page" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" :total="this.total_pages">
					</el-pagination>
				</div>
      </div>
      <el-dialog title="汇率设置" :visible.sync="dialog1" width="350px">
        <el-form :model="form1" ref="form1" label-width="80px" :rules="rules1">
          <el-form-item label="交通币" prop="jtb">
            <el-input size="mini" type="text" v-model="form1.jtb" autoComplete="off">
              <template slot="append">JTB</template>
            </el-input>
          </el-form-item>
          <el-form-item label="人民币" prop="money">
            <el-input size="mini" type="text" v-model="form1.money" :disabled="true">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form1.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog1 = false;form1={}">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form1')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="阅读文章奖励设置" :visible.sync="dialog2" width="350px">
        <el-form :model="form2" ref="form2" label-width="80px" :rules="rules2">
          <el-form-item label="阅读奖励" prop="readArticle">
            <el-input size="mini" type="text" v-model="form2.readArticle" autoComplete="off">
              <template slot="append">JTB/篇</template>
            </el-input>
          </el-form-item>
          <el-form-item label="奖励次数" prop="awardNum">
            <el-input size="mini" type="text" v-model="form2.awardNum">
             <template slot="append">次/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form2.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form2.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog2 = false;form2={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form2')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="发表评论奖励设置" :visible.sync="dialog3" width="350px">
        <el-form :model="form3" ref="form3" label-width="80px" :rules="rules3">
          <el-form-item label="发表评论" prop="issueComment">
            <el-input size="mini" type="text" v-model="form3.issueComment" autoComplete="off">
              <template slot="append">JTB/篇</template>
            </el-input>
          </el-form-item>
          <el-form-item label="奖励次数" prop="awardNum">
            <el-input size="mini" type="text" v-model="form3.awardNum">
              <template slot="append">次/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form3.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form3.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog3 = false;form3={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form3')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="发布文章奖励设置" :visible.sync="dialog4" width="350px">
        <el-form :model="form4" ref="form4" label-width="80px" :rules="rules4">
          <el-form-item label="发布文章" prop="issueArticle">
            <el-input size="mini" type="text" v-model="form4.issueArticle" autoComplete="off">
              <template slot="append">JTB/篇</template>
            </el-input>
          </el-form-item>
          <el-form-item label="奖励次数" prop="awardNum">
            <el-input size="mini" type="text" v-model="form4.awardNum">
              <template slot="append">次/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form4.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form4.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog4 = false;form4={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form4')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="邀请好友奖励设置" :visible.sync="dialog5" width="350px">
        <el-form :model="form5" ref="form5" label-width="80px" :rules="rules5">
          <el-form-item label="邀请好友" prop="inviteFriend">
            <el-input size="mini" type="text" v-model="form5.inviteFriend" autoComplete="off">
              <template slot="append">JTB/人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form5.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form5.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog5 = false;form5={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form5')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分享文章奖励设置" :visible.sync="dialog6" width="350px">
        <el-form :model="form6" ref="form6" label-width="98px" :rules="rules6">
          <el-form-item label="分享文章" prop="shareArticle">
            <el-input size="mini" type="text" v-model="form6.shareArticle" autoComplete="off">
              <template slot="append">JTB/篇</template>
            </el-input>
          </el-form-item>
          <el-form-item label="奖励次数" prop="awardNum">
            <el-input size="mini" type="text" v-model="form6.awardNum">
              <template slot="append">次/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="每篇满足" prop="readPepole">
            <el-input size="mini" type="text" v-model="form6.readPepole">
              <template slot="append">人阅读,给予奖励</template>
            </el-input>
          </el-form-item>
          <el-form-item label="文章有效时间" prop="effectTime">
            <el-input size="mini" type="text" v-model="form6.effectTime">
              <template slot="append">小时/篇</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form6.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form6.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog6 = false;form6={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form6')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="晒收入奖励设置" :visible.sync="dialog7" width="350px">
        <el-form :model="form7" ref="form7" label-width="80px" :rules="rules7">
          <el-form-item label="晒收入" prop="shareIncome">
            <el-input size="mini" type="text" v-model="form7.shareIncome" autoComplete="off">
              <template slot="append">JTB/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="满足" prop="readPepole">
            <el-input size="mini" type="text" v-model="form7.readPepole">
              <template slot="append">人阅览 给予奖励</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form7.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form7.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog7 = false;form7={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form7')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="周签到奖励设置" :visible.sync="dialog8" width="400px" :inline="true">
        <el-form :model="form8" ref="form8" label-width="80px" :rules="rules8">
          <el-form-item label="每日签到" prop="signInDay">
            <el-input size="mini" type="text" v-model="form8.signInDay" autoComplete="off">
              <template slot="append">JTB/日</template>
            </el-input>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form8.weekIsEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
          <el-row v-if="form8.weekIsEnable">
            <el-col :span="12">
              <el-form-item label="星期">
                <el-select size="mini" v-model="form8.week1" placeholder="选择周几" @change="dateChange1">
                  <el-option v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖励" prop="week1Award" ref="week1Award">
                <el-input size="mini" type="text" v-model="form8.week1Award" autoComplete="off">
                <template slot="append">倍</template>
              </el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form8.weekIsEnable">
            <el-col :span="12">
              <el-form-item label="星期">
                <el-select size="mini" v-model="form8.week2" placeholder="选择周几" @change="dateChange2">
                  <el-option  v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="奖励" prop="week2Award" ref="week2Award">
                <el-input size="mini" type="text" v-model="form8.week2Award" autoComplete="off">
                <template slot="append">倍</template>
              </el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form8.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form8.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog8 = false;form8={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form8')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="绑定第三方奖励设置" :visible.sync="dialog9" width="350px">
        <el-form :model="form9" ref="form9" label-width="98px" :rules="rules9">
          <el-form-item label="微信绑定" prop="wxBind">
            <el-input size="mini" type="text" v-model="form9.wxBind" autoComplete="off">
              <template slot="append">JTB/首次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="支付宝绑定" prop="aliBind">
            <el-input size="mini" type="text" v-model="form9.aliBind">
              <template slot="append">JTB/首次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form9.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form9.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog9 = false;form9={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form9')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="徒弟发布文章奖励设置" :visible.sync="dialog10" width="350px">
        <el-form :model="form10" ref="form10" label-width="80px" :rules="rules10">
          <el-form-item label="师傅获得" prop="master">
            <el-input size="mini" type="text" v-model="form10.master" autoComplete="off">
              <template slot="append">JTB</template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="任务分类" prop="c">
            <el-select size="mini" v-model="form10.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form10.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog10 = false;form10={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form10')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="交通币兑换设置" :visible.sync="dialog11" width="350px">
        <el-form :model="form11" ref="form11" label-width="80px" :rules="rules11">
          <el-form-item label="兑换周期">
            <el-radio-group v-model="form11.cycle">
              <el-radio label="1">日</el-radio>
              <el-radio label="7">周</el-radio>
              <el-radio label="30">月</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="兑换次数" prop="exchangeNum">
            <el-input size="mini" type="text" v-model="form11.exchangeNum">
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form11.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog11 = false;form11={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form11')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="提现设置" :visible.sync="dialog12" width="350px">
        <el-form :model="form12" ref="form12" label-width="80px" :rules="rules12">
          <el-form-item label="兑换周期">
            <el-radio-group v-model="form12.cycle">
              <el-radio label="1">日</el-radio>
              <el-radio label="7">周</el-radio>
              <el-radio label="30">月</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="提现次数" prop="withdrawNum">
            <el-input size="mini" type="text" v-model="form12.withdrawNum">
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form12.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog12 = false;form12={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form12')">确 认</el-button>
        </div>
      </el-dialog>
      <el-dialog title="绑定邀请码奖励设置" :visible.sync="dialog13" width="350px">
        <el-form :model="form13" ref="form13" label-width="98px" :rules="rules13">
          <el-form-item label="绑定邀请码" prop="bindInvite">
            <el-input size="mini" type="text" v-model="form13.bindInvite" autoComplete="off">
              <template slot="append">JTB/人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="任务分类" prop="category">
            <el-select size="mini" v-model="form13.category" placeholder="请选择">
              <el-option label="日常任务" value="1"></el-option>
              <el-option label="专属任务" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用" style="margin-bottom:0;">
            <el-switch
              v-model="form13.isEnable"
              active-color="#13ce66"
              inactive-color="#999">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialog13 = false;form13={};">取 消</el-button>
          <el-button size="mini" type="primary" @click="setRule('form13')">确 认</el-button>
        </div>
      </el-dialog>
      <!-- 规则排序 -->
      <el-dialog center title="规则排序" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        任务分类
        <el-select size="mini" v-model="sortCategory" placeholder="请选择任务类型" class="marBo4" @change="sortTypeChange">
          <el-option label="日常任务" value="1"></el-option>
          <el-option label="专属任务" value="2"></el-option>
        </el-select>
				<el-table :data="upData" border style="width: 100%" :row-class-name="btnTable" :header-row-class-name="btnTable" v-loading="loading1">
					<el-table-column prop="dictName" label="规则名称"></el-table-column>
					<el-table-column label="操作" width="80" class="text-center">
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
          <el-button size="small" type="primary" @click="sureSort()">发 布</el-button>
        </span>
			</el-dialog>
    </div>
</template>
<script>
import {btnTable} from '@/utils/table-style.js'
export default {
  data(){
    var validate1 = (rule, value, callback) => {
      if (value === ''&&this.form8.week1) {
        callback(new Error('请输入倍数'));
      }else {
        callback();
      }
    };
    var validate2 = (rule, value, callback) => {
      if (value === ''&&this.form8.week2) {
        callback(new Error('请输入倍数'));
      }else {
        callback();
      }
    };
    return{
      dialogVisible:false,upData:[],sortCategory:'1',loading1:false,
      options:[{label:'无',value:''},{label:'星期一',value:'1'},{label:'星期二',value:'2'},{label:'星期三',value:'3'},{label:'星期四',value:'4'},{label:'星期五',value:'5'},{label:'星期六',value:'6'},{label:'星期日',value:'7'}],
      // options1:[{label:'无',value:''},{label:'星期一',value:'1'},{label:'星期二',value:'2'},{label:'星期三',value:'3'},{label:'星期四',value:'4'},{label:'星期五',value:'5'},{label:'星期六',value:'6'},{label:'星期日',value:'7'}],
      // options2:[{label:'无',value:''},{label:'星期一',value:'1'},{label:'星期二',value:'2'},{label:'星期三',value:'3'},{label:'星期四',value:'4'},{label:'星期五',value:'5'},{label:'星期六',value:'6'},{label:'星期日',value:'7'}],
      options1:[],
      options2:[],
      per_page:20,currentPage:1,total_pages:0,
      dialog1:false,dialog2:false, dialog3:false,dialog4:false,
      dialog5:false,dialog6:false, dialog7:false,dialog8:false,
      dialog9:false,dialog10:false, dialog11:false,dialog12:false,dialog13:false,
      form1:{jtb:'',money:'1',isEnable:false},
      rules1:{
        jtb:[{ required: true, message: '"交通币"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        money:[{ required: true, message: '"人民币"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form2:{readArticle:'',awardNum:'',isEnable:false},
      rules2:{
        readArticle:[{ required: true, message: '"阅读文章"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        awardNum:[{ required: true, message: '"奖励次数"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form3:{issueComment:'',awardNum:'',isEnable:false},
      rules3:{
        issueComment:[{ required: true, message: '"发表评论"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        awardNum:[{ required: true, message: '"奖励次数"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form4:{issueArticle:'',awardNum:'',isEnable:false},
      rules4:{
        issueArticle:[{ required: true, message: '"发布文章"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        awardNum:[{ required: true, message: '"奖励次数"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form5:{inviteFriend:'',isEnable:false},
      rules5:{
        inviteFriend:[{ required: true, message: '"邀请好友"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
      },
      form6:{shareArticle:'',awardNum:'',isEnable:false},
      rules6:{
        shareArticle:[{ required: true, message: '"分享文章"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        awardNum:[{ required: true, message: '"奖励次"数输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        readPepole:[{ required: true, message: '"阅读人数"数输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        effectTime:[{ required: true, message: '"有效时长"数输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form7:{shareIncome:'',readPepole:'',isEnable:false},
      rules7:{
        shareIncome:[{ required: true, message: '"晒收入"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        readPepole:[{ required: true, message: '"满足"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form8:{signInDay:'',isEnable:false,weekIsEnable:true},
      rules8:{
        signInDay:[{ required: true, message: '"每日签到"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        week1Award:[{ validator: validate1, trigger: 'blur' }],
        week2Award:[{ validator: validate2, trigger: 'blur' }],
      },
      form9:{wxBind:'',aliBind:'',isEnable:false},
      rules9:{
        wxBind:[{ required: true, message: '"微信绑定"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        aliBind:[{ required: true, message: '"支付宝绑定"输入值未填写', trigger: 'blur' },
        {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }]
      },
      form10:{master:'',isEnable:false},
      rules10:{
        master:[{ required: true, message: '"师傅奖励"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
       
      },
      form11:{exchangeNum:'',isEnable:false},
      rules11:{
        exchangeNum:[{ required: true, message: '"兑换次数"输入值未填写', trigger: 'blur' },
          {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
       
      },
      form12:{withdrawNum:'',isEnable:false},
      rules12:{
        withdrawNum:[{ required: true, message: '"提现次数"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
      },
      form13:{bindInvite:'',isEnable:false},
      rules13:{
        bindInvite:[{ required: true, message: '"绑定邀请码"输入值未填写', trigger: 'blur' },
            {pattern:/^\d+$/,message:'只能输入数字',trigger:'blur' }],
        
      },
      role_nik:'',
      tableData:[],
      btnTable: btnTable,
      loading:false,
      currentId:''
     
    }
  },
  created() {
    this.getList();
  },
  methods:{
    setRule(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName=='form1'){
              let jsonExt={jtb:this.form1.jtb,money:this.form1.money}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form1.isEnable==false?'0':'1',
                rule:1,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog1=false;
            //   this.dialog1=false;
            }else if(formName =='form2'){
              let jsonExt={readArticle:this.form2.readArticle,awardNum:this.form2.awardNum}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form2.isEnable==false?'0':'1',
                rule:2,
                category:this.form2.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog2=false;
            }else if(formName =='form3'){
              let jsonExt={issueComment:this.form3.issueComment,awardNum:this.form3.awardNum}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form3.isEnable==false?'0':'1',
                rule:3,
                category:this.form3.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog3=false;
            }else if(formName =='form4'){
              let jsonExt={issueArticle:this.form4.issueArticle,awardNum:this.form4.awardNum}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form4.isEnable==false?'0':'1',
                rule:4,
                category:this.form4.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog4=false;
            }else if(formName =='form5'){
              let jsonExt={inviteFriend:this.form5.inviteFriend}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form5.isEnable==false?'0':'1',
                rule:5,
                category:this.form5.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog5=false;
            }else if(formName =='form6'){
              let jsonExt={shareArticle:this.form6.shareArticle,awardNum:this.form6.awardNum,effectTime:this.form6.effectTime,readPepole:this.form6.readPepole}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form6.isEnable==false?'0':'1',
                rule:6,
                category:this.form6.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog6=false;
            }else if(formName =='form7'){
              let jsonExt={shareIncome:this.form7.shareIncome,readPepole:this.form7.readPepole}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form7.isEnable==false?'0':'1',
                rule:7,
                category:this.form7.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog7=false;
            }else if(formName =='form8'){
              var a1='';var a2='';
              var b1='';var b2='';
              if(this.form8.week1&&this.form8.week2){
                 if(this.form8.week1<this.form8.week2){
                  a1=this.form8.week1;
                  a2=this.form8.week1Award;
                  b1=this.form8.week2;
                  b2=this.form8.week2Award;
                }else if(this.form8.week1>this.form8.week2){
                  a1=this.form8.week2;
                  a2=this.form8.week2Award;
                  b1=this.form8.week1;
                  b2=this.form8.week1Award;
                }
              }else{
                if(this.form8.week1){
                  a1=this.form8.week1;
                  a2=this.form8.week1Award;
                  b1='';
                  b2='';
                }else if(this.form8.week2){
                  a1=this.form8.week2;
                  a2=this.form8.week2Award;
                  b1='';
                  b2='';
                }else{
                  a1='';
                  a2='';
                  b1='';
                  b2='';
                }
              }
              console.log(a1+'--------'+a2+'----'+b1+'-----'+b2);
              let jsonExt={signInDay:this.form8.signInDay,week1:a1,week2:b1,week1Award:a2,week2Award:b2, weekIsEnable:this.form8.weekIsEnable==false?'0':'1'}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form8.isEnable==false?'0':'1',
                rule:8,
                // category:this.form8.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog8=false;
            }else if(formName =='form9'){
              let jsonExt={wxBind:this.form9.wxBind,aliBind:this.form9.aliBind}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form9.isEnable==false?'0':'1',
                rule:9,
                category:this.form9.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog9=false;
            }else if(formName =='form10'){
              let jsonExt={master:this.form10.master}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form10.isEnable==false?'0':'1',
                rule:10,
                // category:this.form10.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog10=false;
            }else if(formName =='form11'){
              let jsonExt={cycle:this.form11.cycle,exchangeNum:this.form11.exchangeNum}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form11.isEnable==false?'0':'1',
                rule:11,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog11=false;
            }else if(formName =='form12'){
              let jsonExt={cycle:this.form12.cycle,withdrawNum:this.form12.withdrawNum}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form12.isEnable==false?'0':'1',
                rule:12,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog12=false;
            }else if(formName =='form13'){
              let jsonExt={bindInvite:this.form13.bindInvite}
              let param = {
                tokenId: this.$store.state.user.tokenId,
                isEnable:this.form13.isEnable==false?'0':'1',
                rule:13,
                category:this.form13.category,
                id:this.currentId,
                ext:JSON.stringify(jsonExt)
              }
              this.setRuleAjax(param);
              this.dialog13=false;
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    sortTypeChange(val){
      // console.log(val);
      let params={
        tokenId: this.$store.state.user.tokenId,
        category:val
      }
      this.$post('/jtbRule/getListByCategory',params).then(res => {
        this.loading1 =false;
        this.upData = res.data[0];
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {

          done();
        })
        .catch(_ => {});
    },
    // 确认排序
    sureSort(){
      let ids=[];
      this.upData.map((item, index) => {
      //	newsInfos.push({id:item.id,orderNum:index+1})
        ids.push(item.id);
      });
      let params = {
        tokenId: this.$store.state.user.tokenId,
        ids:ids.join(',')
      }
      this.$post('/jtbRule/updateSortByIds',params).then(res => {
        if(res.code == 0){
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.dialogVisible = false;
          this.getList();
        }
      })
    },
    sortRules(){
      this.loading1 = true;
      if(!this.dialogVisible){
        this.dialogVisible = true;
      }
      let params={
        tokenId: this.$store.state.user.tokenId,
        category:this.sortCategory
      }
      this.$post('/jtbRule/getListByCategory',params).then(res => {
        this.loading1 =false;
        this.upData = res.data[0];
      });
    },
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
    dateChange0(val){
      var op=this.options;
      op.map((item,index) =>{
        if(item.value == val){
          item.disabled=true;
        }
      })
      this.options2=op;
    },
    dateChange(val){
      // console.log(val);
      var op=this.options;
      op.map((item,index) =>{
        // console.log(item,index);
        if(item.value == val){
          item.disabled=true;
        }
      })
      this.options1=op;
    },
    dateChange1(val){
      this.$refs['week1Award'].clearValidate();
      this.options2.map((item,index) =>{
        item.disabled=false;
        if(item.value == val){
          item.disabled=true;
        }
      });
      this.dateChange(this.form8.week2);
      console.log( this.options2);
      console.log( this.options1[4]);
      // this.options1.map((item,index) =>{
      //   item.disabled=false;
      //   if(item.value == this.form8.week2){
      //     item.disabled=true;
      //   }
      // });
    },
    dateChange2(val){
      this.$refs['week2Award'].clearValidate();
      this.options1.map((item,index) =>{
        item.disabled=false;
        if(item.value == val){
          item.disabled=true;
        }
      })
      this.dateChange0(this.form8.week1);
      /* this.options2.map((item,index) =>{
        item.disabled=false;
        if(item.value == this.form8.week1){
          item.disabled=true;
        }
      }); */
    },
    setRuleAjax(param){
      this.$post('/jtbRule/update',param).then(res=>{
        console.log(res);
        if(res.code==0){
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getList();
        }else{
          this.$message({
            message: res.msg?res.msg:'操作失败',
            type: 'error'
          });
        }
      });
    },
    getRule(rule,id){
      this.currentId=id;
      let param={
        tokenId: this.$store.state.user.tokenId,
        id: id,
      }
       this.$post('/jtbRule/get',param).then(res => {
        // console.log(res.data[0].maps);
        if(res.code == 0){
          let resObj=res.data[0].maps;
          // console.log(resObj);
          switch (rule)
          {
          case '1':
            this.dialog1=true;
            this.form1 = resObj;
            console.log(this.form1);
            break;
          case '2':
            this.dialog2=true;
            this.form2 = resObj;
            break;
          case '3':
            this.dialog3=true;
            this.form3 = resObj;
            break;
          case '4':
            this.dialog4=true;
            this.form4 = resObj;
            break;
          case '5':
            this.dialog5=true;
            this.form5 = resObj;
            break;
          case '6':
            this.dialog6=true;
            this.form6 = resObj;
            break;
          case '7':
            this.form7 = resObj;
            this.dialog7=true;
            break;
          case '8':
            this.form8 = resObj;
            this.dateChange(this.form8.week1);
            this.dateChange0(this.form8.week2);
            // console.log(this.form8);
            // this.form8.isEnable=resObj.isEnable=='1'?true:false;
            this.dialog8=true;
            break;
          case '9':
            this.form9 = resObj;
            this.dialog9=true;
            break;
          case '10':
            this.form10 = resObj;
            this.dialog10=true;
            break;
          case '11':
            this.form11 = resObj;
            this.dialog11=true;
            break;
          case '12':
            this.form12 = resObj;
            this.dialog12=true;
            break;
          case '13':
            this.form13 = resObj;
            this.dialog13=true;
            break;
          }

        }else{
          
        }
      })
      // console.log(name)
      
    },
    getList(){
      let param={
        tokenId: this.$store.state.user.tokenId,
        offset: this.currentPage,
        limit: this.per_page,
        queryField:this.role_nik
      }
      this.$post('/jtbRule/list',param).then(res => {
        console.log(res.data)
        if(res.code == 0){
          this.total_pages = res.data[0].total;
          this.tableData=res.data[0].rows;
        }else{
          
        }
      })
    },
    handleSizeChange(val){
      this.per_page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
  },
  computed: {
    upDataLength: function() {
      return this.upData.length - 1;
    }
  },
}
</script>
<style>
  .travel_coin .el-dialog__body{
    padding:20px 20px 0;
  }
  .travel_coin .el-table .cell{
    overflow: auto;
    white-space:normal;
  }
</style>

