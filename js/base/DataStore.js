// 变量缓存，方便我们在不同的勒种访问和修改变量
export class DataStore {
    
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
}