<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js';
  import '../../../static/ueditor/ueditor.all.js';
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js';
  import { getBaceUrl } from '@/utils/auth';
  let baceUrl=getBaceUrl();
  // console.log(baceUrl);
  UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
  UE.Editor.prototype.getActionUrl = function(action) {
    if (action == 'uploadimage' || action == 'uploadscrawl' || action=='uploadvideo') {
      return (baceUrl+'/imgUpload'); // 开发地址
        // return 'http://192.168.1.30:8080/imgUpload'; // 测试地址
        // return 'http://47.95.212.86:8080/imgUpload';   //线上地址
        //'http://localhost:8080/imgUpload';为方法imgUpload的访问地址
    } else {
        return this._bkGetActionUrl.call(this, action);
    }
  }
  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor("editor");
      this.editor = UE.getEditor('editor',this.config);
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      },
      setContent (isAppendTo) {
       return this.editor.setContent(isAppendTo)
      }

    }
  }
</script>
