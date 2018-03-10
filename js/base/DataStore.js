// 变量缓存，方便我们在不同的勒种访问和修改变量
export class DataStore {

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
    }

    /**
     * 类
     * @param {*} key 
     * @param {*} value 
     */
    put(key, value) {
        // 如果是类先实例化
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }

    /**
     * 获取
     * @param {*} key 
     */
    get(key) {
        return this.map.get(key);
    }

    /**
     * 销毁
     */
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}