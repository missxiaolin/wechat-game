import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

// 背景类
export class BackGroud extends Sprite {

    constructor() {
        const image = Sprite.getImage('background');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            window.innerWidth, window.innerHeight);
    }
}