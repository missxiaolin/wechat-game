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

    createPencil() {
        const minTop = window.innerHeight / 8
        const maxTop = window.innerHeight / 2
        const top = minTop + Math.random() * (maxTop - minTop)
        this.dataStore.get('pencils').push(new UpPencil(top))
        this.dataStore.get('pencils').push(new DownPencil(top))
    }

    // 运行
    run() {
        // 判断游戏是否结束
        if (this.isGameOver) {
            // 停止地板移动
            cancelAnimationFrame(this.dataStore.get('timer'))
            this.dataStore.destroy()
            return;
        }
        this.dataStore.get('background').draw()
        // 铅笔
        const pencils = this.dataStore.get('pencils')

        if (pencils[0].x + pencils[0].width <= 0 &&
            pencils.length === 4) {
            pencils.shift();
            pencils.shift();
        }

        if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 &&
            pencils.length === 2) {
            this.createPencil();
        }

        pencils.forEach(function (value, index, array) {
            value.draw()
        });
        // 地板
        this.dataStore.get('land').draw()

        let timer = requestAnimationFrame(() => this.run())
        this.dataStore.put('timer', timer)

    }
}