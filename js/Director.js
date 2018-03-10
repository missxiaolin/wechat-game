import { DataStore } from "./base/DataStore.js";

// 导演类，控制游戏逻辑
export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance()
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    // 运行
    run() {
        this.dataStore.get('background').draw()
        this.dataStore.get('land').draw()
        let timer = requestAnimationFrame(() => this.run())
        this.dataStore.put('timer', timer)
        // 停止地板移动
        // cancelAnimationFrame(this.dataStore.get('timer'))
    }
}