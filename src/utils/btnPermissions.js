import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
 bind: function (el, binding, vnode) {
  // 获取按钮权限
  console.log(el);
  console.log(binding)
  console.log(vnode);
  // let btnPermissions =vnode.context.$route.meta?vnode.context.$route.meta.btnPermissions.split(","):'';
  if (!Vue.prototype.$_has(binding.value+'')) {
   el.parentNode.removeChild(el);
  }
 }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
 let isExist = false;
 console.log(typeof value)
 let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
 if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
  return false;
 }
 console.log(btnPermissionsStr)
 if (value.indexOf(btnPermissionsStr) > -1) {
  isExist = true;
 }
 return isExist;
};
export {has}