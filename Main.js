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
        this.canvas = wx.createCanvas()
        this.ctx = this.canvas.getContext('2d')
        // // 变量缓存
        this.dataStore = DataStore.getInstance()
        this.director = Director.getInstance()
        const loader = ResourceLoader.create()
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }

    // 音乐
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext()
        bgm.autoplay = true
        bgm.loop = true
        bgm.src = './res/bgm.mp3'
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas
        this.dataStore.ctx = this.ctx
        this.dataStore.res = map
        // 音乐
        this.createBackgroundMusic()
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
        wx.onTouchStart(() => {
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }
}