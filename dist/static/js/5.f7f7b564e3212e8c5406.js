webpackJsonp([5],{"1mvR":function(s,e){},Luci:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("Dd8w"),a=t.n(i),n=t("NYxO"),o={name:"login",data:function(){return{username:"Administrator",password:"123456",vercode:"1234",isLoging:!1,author:window.APP_INFO.author,version:window.APP_INFO.version,appName:window.APP_INFO.appName}},methods:a()({},Object(n.b)(["login"]),{handleLogin:function(){var s=this;if(!this.username||!this.password)return this.$message.warning("用户名和密码不能为空");this.isLoging=!0,this.login({username:this.username,password:this.password}).then(function(e){sessionStorage.setItem("isFirst",1),s.$message.success("登录成功"),s.$router.push({name:"home"}),s.isLoging=!1})}})},r={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"fullscreen"},[t("div",{staticClass:"login-box"},[t("form",{staticClass:"login-form",attrs:{action:""}},[s._m(0),s._v(" "),t("div",{staticClass:"m-list-group"},[t("div",{staticClass:"m-list-group-item"},[t("i",{staticClass:"iconfont icon-user"}),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:s.username,expression:"username"}],staticClass:"m-input",attrs:{type:"text",placeholder:"Username"},domProps:{value:s.username},on:{input:function(e){e.target.composing||(s.username=e.target.value)}}})]),s._v(" "),t("div",{staticClass:"m-list-group-item"},[t("i",{staticClass:"iconfont icon-lock"}),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],staticClass:"m-input",attrs:{type:"password",placeholder:"Password"},domProps:{value:s.password},on:{input:function(e){e.target.composing||(s.password=e.target.value)}}})]),s._v(" "),t("div",{staticClass:"m-list-group-item"},[t("i",{staticClass:"iconfont icon-key"}),s._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:s.vercode,expression:"vercode"}],staticClass:"m-input",attrs:{type:"text",placeholder:"Password"},domProps:{value:s.vercode},on:{input:function(e){e.target.composing||(s.vercode=e.target.value)}}})])]),s._v(" "),t("button",{directives:[{name:"loading",rawName:"v-loading",value:s.isLoging,expression:"isLoging"}],staticClass:"m-btn sub select-none",on:{click:function(e){e.preventDefault(),s.handleLogin(e)}}},[s._v("登录")])])])])},staticRenderFns:[function(){var s=this.$createElement,e=this._self._c||s;return e("p",{staticClass:"log_title"},[this._v("登录 "),e("span",[this._v("SING IN")])])}]};var l=t("VU/8")(o,r,!1,function(s){t("1mvR")},null,null);e.default=l.exports}});
//# sourceMappingURL=5.f7f7b564e3212e8c5406.js.map