import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";

// 初始化整个游戏的精灵，作为游戏入口
export class Main {
    constructor () {
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        const loader = ResourceLoader.create()
        loader.onLoaded(map => this.onResourceFirstLoaded(map))

        let image = new Image()
        image.src = './res/background.png'

        image.onload = () => {
            this.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                image.width,
                image.height
            )
        }

        
    }

    onResourceFirstLoaded (map) {
        console.log(map)
    }
 }