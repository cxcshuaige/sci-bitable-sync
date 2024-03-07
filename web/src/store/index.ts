import { configure } from 'mobx';
import globalStore from "./global"

configure({
    enforceActions: 'always'
});
const store = {
    globalStore
}

export default store;