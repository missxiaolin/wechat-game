import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

// 导演类，控制游戏逻辑
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance()
        this.moveSpeed = 2
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director()
        }
        return Director.instance;
    }

    // 创建铅笔
    createPencil() {
        const minTop = DataStore.getInstance().canvas.height / 8
        const maxTop = DataStore.getInstance().canvas.height / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    // 运行
    run() {
        this.check()
        // 判断游戏是否结束
        if (this.isGameOver) {
            // 开始按钮
            this.dataStore.get('startButton').draw();
            // 停止地板移动
            cancelAnimationFrame(this.dataStore.get('timer'))
            this.dataStore.destroy()
            // 加快触发 JavaScrpitCore Garbage Collection（垃圾回收），GC 时机是由 JavaScrpitCore 来控制的，并不能保证调用后马上触发 GC。
            wx.triggerGC()
            return;
        }
        this.dataStore.get('background').draw()
        // 铅笔
        const pencils = this.dataStore.get('pencils')

        if (pencils[0].x + pencils[0].width <= 0 &&
            pencils.length === 4) {
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore = true;
        }

        if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
            pencils.length === 2) {
            this.createPencil();
        }

        pencils.forEach(function (value, index, array) {
            value.draw()
        });
        // 地板
        this.dataStore.get('land').draw()

        // 计分器
        this.dataStore.get('score').draw()

        // 小鸟
        this.dataStore.get('birds').draw()

        let timer = requestAnimationFrame(() => this.run())
        this.dataStore.put('timer', timer)

    }

    // 小鸟上升
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] =
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.right < pencil.left ||
            bird.left > pencil.right
        ) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');

        //地板的撞击判断
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }

        //小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
            && score.isScore) {
            wx.vibrateShort({
                success: function(){
                    console.log('振动')
                }
            })
            score.isScore = false;
            score.scoreNumber++;
        }
    }
}