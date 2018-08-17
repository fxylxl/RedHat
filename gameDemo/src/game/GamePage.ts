class GamePage extends eui.Component implements  eui.UIComponent {

	public sc_cloud:eui.Scroller;
	public gp_cloud:eui.Group;
	public img_cloud1:eui.Image;
	public img_cloud2:eui.Image;
	public img_cloud3:eui.Image;
	public img_cloud4:eui.Image;
	public img_cloud5:eui.Image;
	public img_gift1:eui.Image;
	public img_gift2:eui.Image;
	public img_gift3:eui.Image;
	public img_gift4:eui.Image;
	public img_gift5:eui.Image;
	public img_face_right:eui.Image;
	public img_score:eui.Image;
	public btn_left:eui.Button;
	public btn_up:eui.Button;
	public btn_right:eui.Button;
	public btn_return:eui.Button;

	// 分数
	public score = 0;
	public whichCloud = 2;
	public cloudList = [];

	// 单例模式
    private static shared:GamePage;
    public static getInstance(){
        if( !GamePage.shared){
            GamePage.shared =  new GamePage();
        }
        return GamePage.shared;
    }

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void
	{
		super.childrenCreated();
		this.init();
	}

	// 自定义初始化函数
	private init() {
		// 云朵和 gift 缓缓向下
		var timer: egret.Timer = new egret.Timer(20, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // timer.start();

		// 新云朵
		var timerCloudGift: egret.Timer = new egret.Timer(8000, 0);
        timerCloudGift.addEventListener(egret.TimerEvent.TIMER, this.timerCloudGiftFunc, this);
        timerCloudGift.start();

		// 给每个按钮绑定点击事件
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClick,this)
		this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.leftClick,this)
		this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP,this.upClick,this)
		this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rightClick,this)

		// scroller  关闭水平方向滚动
		this.sc_cloud.scrollPolicyH = eui.ScrollPolicy.OFF;	
		// 不显示滚动条		
		this.sc_cloud.verticalScrollBar.autoVisibility = false;
		this.sc_cloud.verticalScrollBar.visible = false;

		//创建icon的group添加到scroller上
		// let group: eui.Group = new eui.Group();
		// this.gp_cloud.addChild(group);
		// group.width = 640;

		// 填充背景图
		let img_bg: eui.Image = new eui.Image("resource/assets/RedHat/bg.png");
		this.gp_cloud.addChildAt( img_bg, 0);
		// for( let i:number = 0; i < 3; i++){
		// 	let img_bg: eui.Image = new eui.Image("resource/assets/RedHat/bg.png");
		// 	img_bg.y = i * this.height ;
		// 	this.gp_cloud.addChildAt( img_bg, 0);
		// }

		//设置小红帽及所在云朵的初始位置
        // this.img_face_right.x = this.width / 2 - 30;
		// this.img_cloud1.x = this.width / 2 - 100

		// 绑定的对象发生变化时调用该方法
		// var that = this;
		var funcChange = function(): void {
			// console.log(this.source, this.y);
			// 在egretProperties.json 中添加 game，需要再执行 egret build -e
		}
		this.cross();

		// this.pauseTweens(this.img_cloud2, this.img_gift2, "face_right_png");
		egret.Tween.pauseTweens(this.img_cloud2);
	}
	// 横向移动
	private cross() {

		this.cloudList = [this.img_cloud1, this.img_cloud2, this.img_cloud3, this.img_cloud4, this.img_cloud5];

		var time1 = 2500;
		var time2 = 3500;

		for(var i = 0; i < this.cloudList.length; i ++) {
			if(i % 2 == 0) {
				egret.Tween.get(this.cloudList[i], { loop: true }).
					to({ x: (640 - this.cloudList[i].width) }, time2, egret.Ease.sineIn).
					to({ x: 0 }, time2, egret.Ease.sineIn);
				// console.log("2", this.cloudList[i].source, this.cloudList[i].width, this.cloudList[i].x)
			}else if(i % 2 == 1) {
				egret.Tween.get(this.cloudList[i], { loop: true }).
					to({ x: 0 }, time1, egret.Ease.sineIn).
					to({ x: this.cloudList[i].x }, time1, egret.Ease.sineIn);
				// console.log("1", this.cloudList[i].source, this.cloudList[i].width, this.cloudList[i].x)
			}
		}
		
	}
	// 定时器
	private timerFunc() {
		this.img_cloud1.y = this.img_cloud1.y + 0.5;
		this.img_cloud2.y = this.img_cloud2.y + 0.5;
		this.img_cloud3.y = this.img_cloud3.y + 0.5;
		this.img_cloud4.y = this.img_cloud4.y + 0.5;
		this.img_cloud5.y = this.img_cloud5.y + 0.5;
		this.img_gift1.y = this.img_gift1.y + 0.5;
		this.img_gift2.y = this.img_gift2.y + 0.5;
		this.img_gift3.y = this.img_gift3.y + 0.5;
		this.img_gift4.y = this.img_gift4.y + 0.5;
		this.img_face_right.y = this.img_face_right.y + 0.5;

		if(this.img_face_right.y + this.img_face_right.height == 1136) {
		
			// 游戏结束
			this.addChild(GameOver.getInstance());
			
			this.redHatDrop('left');
			this.redHatDrop('right');
		}
	}
	private timerCloudGiftFunc() {
		
		// this.initList();
		// this.startLoad(this.img_cloud5);

	}    
	private startLoad(cloud): void {

		// 从两个集合中分拨随机选出云朵和 gift 的样式
		var cloudSourceList = ["cloud1_png", "cloud2_png", "cloud3_png", "cloud4_png"];
		var giftSourceList = ["gift1_png", "gift2_png", "gift3_png", "", "", ""];
		var i = Math.floor(Math.random() * cloudSourceList.length);
		var j = Math.floor(Math.random() * giftSourceList.length);
		// console.log(cloudSourceList[i]);
		// console.log(giftSourceList[j]);

		cloud.x = 0;
		cloud.y = -105;
		cloud.height = 42;
		cloud.source = cloudSourceList[i];
		if(cloud.source.indexOf("1") == 5) {
			cloud.width = 176;
		}else if(cloud.source.indexOf("2") == 5) {
			cloud.width = 167;
		}else if(cloud.source.indexOf("3") == 5) {
			cloud.width = 135;
		}else if(cloud.source.indexOf("4") == 5) {
			cloud.width = 209;
		}
    }
	// public new_cloud;
    private onLoadComplete(event: egret.Event): void {
        var texture = new egret.Texture();
        texture.bitmapData = event.target.data;
        //创建 Bitmap 进行显示
		var newCloud = new egret.Bitmap(texture);
		// newCloud.y = newCloud.height;
		// console.log(newCloud.width)
		if(newCloud.width == 236) {
			this.img_cloud5.width = 176;
		}else if(newCloud.width == 196) {
			this.img_cloud5.width = 167;
		}else if(newCloud.width == 182) {
			this.img_cloud5.width = 135;
		}else if(newCloud.width == 245) {
			this.img_cloud5.width = 209;
		}
		console.log(this.img_cloud5.width)
		// this.addChild(newCloud);
		
		// egret.setTimeout(function() {
		// 	this.removeChild(new_cloud);
		// }, this, 2000);
    }
	// 返回首页
	private returnClick() {
		this.parent.removeChild(this);
	}
	// 向左移动
	private leftClick() {
		console.log(this.whichCloud)
		// this.resumeTweens(this.img_cloud2, this.img_gift2)
        if(this.img_face_right.source == "face_right_png") {
            this.img_face_right.source = "face_left_png";
            this.img_face_right.x = this.img_face_right.x - 20;
			// 小红帽左侧掉落
			this.redHatDrop('left');

			this.redHatGift("walk");
        }else {
            this.img_face_right.x = this.img_face_right.x - 20;
			// 小红帽左侧掉落
			this.redHatDrop('left');

			this.redHatGift("walk");
        }
	}
	// 向上跳起
	private upClick() {
		var face_where = this.img_face_right.source;
        this.img_face_right.source = "face_me_png";

		var cloud;
		if(this.whichCloud == 1) {
			cloud = this.img_cloud1;
		}else if(this.whichCloud == 2) {
			cloud = this.img_cloud2;
		}else if(this.whichCloud == 3) {
			cloud = this.img_cloud3;
		}else if(this.whichCloud == 4) {
			cloud = this.img_cloud4;
		}else if(this.whichCloud == 5) {
			cloud = this.img_cloud5;
		}
		this.resumeTweens(cloud, this.img_gift2)


		// this.pauseTweens(this.img_cloud2, this.img_gift2, "face_right_png");

		// 跳起及落下的动作
		egret.Tween.get(this.img_face_right).
            to({ y: this.img_face_right.y - 100 }, 700, egret.Ease.sineOut).
            to({ y: this.img_face_right.y }, 400, egret.Ease.sineOut);
			// wait(1).call(this.pauseTweens, this, [this.img_cloud3, this.img_gift3, face_where]);// 设置延时，设置回调函数及作用域，用于侦听动画完成;

		if(this.whichCloud == 1) {
			// 延时方法，在小红帽落到规定高度时暂停所在云朵的缓动动画
			egret.setTimeout(function() {
				this.pauseTweens(this.img_cloud2, this.img_gift2, face_where);
			}, this, 1100);
		}else if(this.whichCloud == 2) {
			// 延时方法，在小红帽落到规定高度时暂停所在云朵的缓动动画
			egret.setTimeout(function() {
				this.pauseTweens(this.img_cloud3, this.img_gift3, face_where);
			}, this, 1100);
		}else if(this.whichCloud == 3) {
			// 延时方法，在小红帽落到规定高度时暂停所在云朵的缓动动画
			egret.setTimeout(function() {
				this.pauseTweens(this.img_cloud4, this.img_gift4, face_where);
			}, this, 1100);
		}else if(this.whichCloud == 4) {
			// 延时方法，在小红帽落到规定高度时暂停所在云朵的缓动动画
			egret.setTimeout(function() {
				this.pauseTweens(this.img_cloud5, this.img_gift5, face_where);
			}, this, 1100);
		}else if(this.whichCloud == 5) {
			// 延时方法，在小红帽落到规定高度时暂停所在云朵的缓动动画
			egret.setTimeout(function() {
				this.pauseTweens(this.img_cloud1, this.img_gift1, face_where);
			}, this, 1100);
		}

		var verticalList = [this.img_cloud1, this.img_cloud2, this.img_cloud3, this.img_cloud4, this.img_cloud5, this.img_gift1, this.img_gift2, this.img_gift3];
		
		// 封装纵向移动的方法
		for(var i=0;i<verticalList.length;i++) {
			egret.Tween.get(verticalList[i]).
					to({ y: verticalList[i].y + 250 }, 1100, egret.Ease.sineOut).
					wait(1).call(this.changeCloudGift, this, [verticalList[i]]);// 设置延时，设置回调函数及作用域，用于侦听动画完成
		}
		this.cross();
		
		// this.pauseTweens(this.img_cloud3, this.img_gift3, face_where);
		// this.resumeTweens(this.img_cloud2, this.img_gift2)
	}
	private changeCloudGift(vertical) {
		if((vertical.y + vertical.height) > 1136 && vertical.source.indexOf("cloud") == 0) {
			// vertical.y = 0;
			// 将落到屏幕下方的云和 gift 进行替换重新在顶部出现
			this.startLoad(vertical)
		}
		// if(this.whichCloud == 2) {
		// 	if((this.img_cloud1.y + 250)> 1136) {
		// 		// 将落到屏幕下方的云和 gift 进行替换重新在顶部出现
		// 		this.startLoad(this.img_cloud1)
		// 	}
		// }
	}
	// 暂停某个对象上的全部 Tween 动画
    private pauseTweens(cloud, gift, face_where):void {
		console.log(cloud.x);
		egret.Tween.pauseTweens(cloud);
		egret.Tween.pauseTweens(gift);
		this.img_face_right.source = face_where;

		console.log(cloud.x, this.img_face_right.x + this.img_face_right.width / 2, cloud.x + cloud.width);

		// 判断小红帽是否落在云上
		if((this.img_face_right.x + this.img_face_right.width / 2) > cloud.x && (this.img_face_right.x + this.img_face_right.width / 2) < (cloud.x + cloud.width)) {
			console.log("恭喜，小红帽落在了云上！");

			if(this.whichCloud < 5) {
				this.whichCloud = this.whichCloud + 1;
			}else if(this.whichCloud = 5){
				this.whichCloud = 1;
			}

			// console.log(cloud);
			// console.log(gift);
			// console.log(face_where);
			// this.redHatGift("jump");
		}else {
			console.log("很遗憾，小红帽没落在云上！");
			this.resumeTweens(cloud, gift);

			// egret.Tween.get(this.img_face_right).
			// 	to({ rotation: 720, y: this.img_face_right.y + 750 }, 1000 ,egret.Ease.sineIn);
		
		// 	// 游戏结束
		// 	this.addChild(GameOver.getInstance());
		}
    }
	// 恢复某个对象上的全部 Tween 动画
    private resumeTweens(cloud, gift):void {
		egret.Tween.resumeTweens(cloud);
		egret.Tween.resumeTweens(gift);
    }
	// 判断小红帽和 gift 的位置关系
	private redHatGift(from) {
		// 判断小红帽是否落在云上恰好又落在了 gift 上
		if(((this.img_face_right.x + this.img_face_right.width - 10) < (this.img_gift1.x + this.img_gift1.width) && (this.img_face_right.x + this.img_face_right.width - 10) > this.img_gift1.x)
				|| ((this.img_face_right.x + 10) > this.img_gift1.x && (this.img_face_right.x + 10) < (this.img_gift1.x + this.img_gift1.width))) {
			if(from == "walk") {
				this.img_gift1.x = 0;
				this.img_gift1.width = 0;
				this.img_score.source = "score2_png";
				this.score = this.score + 15;
			}else if(from == "jump") {
				this.img_gift1.x = 0;
				this.img_gift1.width = 0;
				this.img_score.source = "score3_png";
				this.score = this.score + 20;
			}
		}else {
			if(from == "jump") {
				this.img_score.source = "score1_png";
				this.score = this.score + 5;
			}
		}

		// 加分完成，消除加分的显示
		egret.setTimeout(function() {
			this.img_score.source = "";
		}, this, 1200);
	}
	// 向右移动
	private rightClick() {
		console.log(this.whichCloud)
        if(this.img_face_right.source == "face_left_png") {
            this.img_face_right.source = "face_right_png";
            this.img_face_right.x = this.img_face_right.x + 20;
			// 小红帽右侧掉落
			this.redHatDrop('right');

			this.redHatGift("walk");
        }else {
            this.img_face_right.x = this.img_face_right.x + 20
			// 小红帽右侧掉落
			this.redHatDrop('right')

			this.redHatGift("walk");
        }
	}
	//小红帽旋转掉落
	private redHatDrop(direction):void {
		var cloud;
		if(this.whichCloud == 1) {
			cloud = this.img_cloud1;
		}else if(this.whichCloud == 2) {
			cloud = this.img_cloud2;
		}else if(this.whichCloud == 3) {
			cloud = this.img_cloud3;
		}else if(this.whichCloud == 4) {
			cloud = this.img_cloud4;
		}else if(this.whichCloud == 5) {
			cloud = this.img_cloud5;
		}
		if(direction == 'left') {
			//小红帽从左边旋转掉落
			if((this.img_face_right.x + this.img_face_right.width / 2) < cloud.x) {
				egret.Tween.get(this.img_face_right).
					// to({ y: this.img_face_right.y + 117 }, 300, egret.Ease.sineOut).
					to({ rotation: 720, y: this.img_face_right.y + 1000 }, 1200 ,egret.Ease.sineIn);
				this.addChild(GameOver.getInstance())
			
				// 通过深度值获取子对象来设置分数
				var gameOver: egret.DisplayObject = GameOver.getInstance().getChildAt(1).parent;
				gameOver.total_score.text = this.score;
            }
		}else if(direction == 'right') {
			//小红帽从右边旋转掉落
			if((this.img_face_right.x + this.img_face_right.width / 2) > (cloud.x + cloud.width)) {
				egret.Tween.get(this.img_face_right).
					// to({ y: this.img_face_right.y + 117 }, 300, egret.Ease.sineOut).
					to({ rotation: 720, y: this.img_face_right.y + 1000 }, 1200 ,egret.Ease.sineIn);
				this.addChild(GameOver.getInstance())
			
				// 通过深度值获取子对象来设置分数
				var gameOver: egret.DisplayObject = GameOver.getInstance().getChildAt(1).parent;
				gameOver.total_score.text = this.score;
            }
		}
	}
}