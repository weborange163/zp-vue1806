export default {
  // 验证手机号录入
  checkPhone (rule, value, callback) {
    let regex = /^0{0,1}(13[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;

    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else if (!regex.test(value)) {
      return callback(new Error('手机号码格式不正确'));
    } else {
      return callback();
    }
  },
  // 验证登陆密码录入
  checkPassword (rule, value, callback) {
    let regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (!value) {
      return callback(new Error('密码不能为空'));
    } else if (!regex.test(value)) {
      return callback(new Error('密码应为6-20字符,且同时包含字母和数字'));
    } else {
      return callback();
    }
  },
  // 新闻行情的标题控制
  checkTitle(rule,value,callback){
    if(!value){
      return callback(new Error('标题不能为空'));
    }else{
      // console.log(value)
      if(value.replace(/[^\x00-\xff]/g,"aa").length>100){
        callback(new Error('标题长度不能超过50字!'))
      }else{
        callback();
      }
    }
  }

}