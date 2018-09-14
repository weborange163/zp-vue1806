<template>
	<div class="big">
		<p id="title-1"><a>{{nickname}}，您好！</a>
      <!-- <span>上次登录时间：2018.04.25   12:30</span> -->
    </p>
		<div class="main">
			<div class="main-1">
				<img class="img-1" src="../assets/img/y1.png" />
				<a class="main-a">注册用户总量</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd>{{totalYesterdayNum}}</dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd>{{totalNum}}</dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
			<div class="main-1">
				<img class="img-1" src="../assets/img/y2.png" />
				<a class="main-a">新增注册用户</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd>{{registerYesterdayNum}}</dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd>{{registerNum}}</dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
			<div class="main-1">
				<img class="img-1" src="../assets/img/y3.png" />
				<a class="main-a">新闻更新量</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd>{{newsYesterdayNum}}</dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd>{{newsNum}}</dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
			<div class="main-1">
				<img class="img-1" src="../assets/img/y4.png" />
				<a class="main-a">新闻点击量</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd></dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd></dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
			<div class="main-1">
				<img class="img-1" src="../assets/img/y5.png" />
				<a class="main-a">启动用户</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd></dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd></dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
			<div class="main-1">
				<img class="img-1" src="../assets/img/y6.png" />
				<a class="main-a">启动次数</a>
				<div class="main-div">
					<dl class="dl1">
						<dt>昨日</dt>
						<dd></dd>
					</dl>
					<dl class="dl2">
						<dt>今日</dt>
						<dd></dd>
					</dl>
					<p class="gap_vertical"></p>
				</div>
			</div>
		</div>
	</div>
<!--<div class="error-panel animated fadeInUp">
  <h1 class="error-code">404</h1>
  <p class="error-description">Page Not Found</p>
  <div class="error-ctrl">
    <m-button type="info" @click="$router.push({name: 'home'})" round><i class="fa fa-home"></i>&nbsp;主页</m-button>
    <m-button @click="$router.back()" round plain><i class="fa fa-arrow-left"></i>&nbsp;返回</m-button>
  </div>
  <p class="copyright">@lanyue 版权所有</p>
</div>-->
</template>
<script>
  export default {
    data() {
      return {
        nickname:this.$store.state.user.nickname,
        totalNum:0,
        totalYesterdayNum:0,
        registerNum:0,
        registerYesterdayNum:0,
        newsNum:0,
        newsYesterdayNum:0
      }
    },
    created() {
      this.getInfo();
    },
    methods: {
      getInfo(){
        this.$post('main/statistics',{tokenId:this.$store.state.user.tokenId}).then(res => {
          console.log(res)
          this.totalNum = res.data[0].totalNum;
          this.totalYesterdayNum = res.data[0].totalYesterdayNum;
          this.registerNum = res.data[0].registerNum;
          this.registerYesterdayNum = res.data[0].registerYesterdayNum;
          this.newsNum = res.data[0].newsNum;
          this.newsYesterdayNum = res.data[0].newsYesterdayNum;

        })
      }
    }
  }
</script>
<style type="text/css" scoped>
	.gap_vertical{
		width: 2px;
		height: 50px;
		background: #eff2f8;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
  .error-panel{
    position: relative;
    width: 250px;
    background: #fff;
    margin: 0 auto;
    margin-top: 150px;
    padding: 15px;
    border-radius: 4px;
    font-family: Roboto, Segoe UI, "Microsoft YaHei";
  }
  .error-panel:after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 20px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .error-panel .error-code {
    font-size: 4rem;
    font-weight: 100;
    text-align: center;
    margin: 0;
  }
  .error-panel .error-description{
    text-align: center;
    margin-bottom: 30px;
  }
  .error-panel .error-ctrl{
    text-align: center;
    margin-bottom: 30px;
  }
  .error-panel .copyright{
    text-align: center;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  .dl1{
  	float: left;
  	text-align: center;
  	width: 50%;
  }
  .dl1 dt{
  	font-size: 14px;
  	color: #999999;
  	margin-bottom: 15px;
  }
  .dl1 dd{
  	font-size: 18px;
  	color: #999999;
  	margin: 0;
  }
   .dl2{
  	float: left;
  	text-align: center;
  	width: 50%;
  }
  .dl2 dt{
  	font-size: 14px;
  	color: #999999;
  	margin-bottom: 15px;
  }
  .dl2 dd{
  	font-size: 18px;
  	color: #F76803;
  	margin: 0;
  }
  .big{
  	background: #ecf0f4 !important;min-height:700px;
  }
 #title-1{
 	margin:0;padding:14px 0 14px 27px;
 }
 #title-1 a{
 	color: #F76803;font-size: 18px;
 }
 #title-1 span{
 	color: #666666;font-size: 12px;
 }
 .main{
 	padding-left: 66px;overflow: hidden;width: 100%;
 }
 .main-1{
 	width: 28%;height: 264px;margin-bottom: 30px; float: left;background:rgba(255,255,255,1);margin-right: 30px;border-radius:4px;
box-shadow:2px 2px 7px rgba(54,88,167,0.07);
 }
 .img-1{
 	margin: 0 auto;width: 62px;height: 62px;display: block;margin-top: 40px;margin-bottom: 20px;
 }
 .main-a{
 	display: block;text-align: center;font-size: 16px;color: #333333;margin-bottom: 34px;
 }
 .main-div{
 	height: 86px;background: #F6F8FD;overflow: hidden;position: relative;
 }
</style>
