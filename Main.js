import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGroud } from "./js/runtime/BackGroud.js";
import { DataStore } from "./js/base/DataStore.js";
import { Land } from "./js/runtime/Land.js";

// 初始化整个游戏的精灵，作为游戏入口
export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        // 变量缓存
        this.dataStore = DataStore.getInstance()
        this.director = Director.getInstance()
        const loader = ResourceLoader.create()
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        this.init()
    }

    init() {
        this.dataStore.put('pencils', [])
            .put('background', BackGroud)
            .put('land', Land)

        // 要在游戏运行之前先创建铅笔
        this.director.createPencil()
        this.director.run()
    }
}