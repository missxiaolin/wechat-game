import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";

// 不断移动的陆地类
export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land')
        super(image, 0, 0,
            image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height);
        //地板的水平变化坐标
        this.landX = 0;
        //地板的移动速度
        this.landSpeed = Director.getInstance().moveSpeed
    }

    draw() {
        this.landX = this.landX + this.landSpeed;
        // 如果坐标大于图片宽度制0
        if (this.landX > (this.img.width - window.innerWidth)) {
            this.landX = 0;
        }
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.landX,
            this.y,
            this.width,
            this.height)
    }
}