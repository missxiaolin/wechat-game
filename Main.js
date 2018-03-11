import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGroud } from "./js/runtime/BackGroud.js";
import { DataStore } from "./js/base/DataStore.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";

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
        this.dataStore.canvas = this.canvas
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        this.init()
    }

    init() {
        // 判断游戏是否结束
        this.director.isGameOver = false

        this.dataStore.put('pencils', [])
            .put('background', BackGroud)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton)

        this.registerEvent()

        // 要在游戏运行之前先创建铅笔
        this.director.createPencil()
        this.director.run()
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽掉JS的事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }
}