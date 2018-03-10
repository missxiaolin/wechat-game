import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGroud } from "./js/runtime/BackGroud.js";

// 初始化整个游戏的精灵，作为游戏入口
export class Main {
    constructor () {
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        const loader = ResourceLoader.create()
        loader.onLoaded(map => this.onResourceFirstLoaded(map))
    }

    onResourceFirstLoaded (map) {
        let background = new BackGroud(this.ctx, map.get('background'))
        background.draw()
    }
 }